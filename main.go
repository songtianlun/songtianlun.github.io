package main

import (
	"crypto/hmac"
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"
)

// DogeCloudAPI 调用 DogeCloud 的 API
// apiPath：是调用的 API 接口地址，包含 URL 请求参数 QueryString，例如：/console/vfetch/add.json?url=xxx&a=1&b=2
// data：POST 的数据，对象，例如 {a: 1, b: 2}，传递此参数表示不是 GET 请求而是 POST 请求
// jsonMode：数据 data 是否以 JSON 格式请求，默认为 false 则使用表单形式（a=1&b=2）
// 返回值 ret 是一个 map[string]，其中 ret["code"] 为 200 表示 api 请求成功
func DogeCloudAPI(apiPath string, data map[string]interface{}, jsonMode bool) (ret map[string]interface{}) {

	// 这里替换为你的 DogeCloud 永久 AccessKey 和 SecretKey，可在用户中心 - 密钥管理中查看
	AccessKey := "f16fe1e46bdfb004"
	SecretKey := "9edec3898fc9d3d0fd9c6ea7e4e1c8bb"

	body := ""
	mime := ""
	if jsonMode {
		_body, err := json.Marshal(data)
		if err != nil {
			log.Fatalln(err)
		}
		body = string(_body)
		mime = "application/json"
	} else {
		values := url.Values{}
		for k, v := range data {
			values.Set(k, v.(string))
		}
		body = values.Encode()
		mime = "application/x-www-form-urlencoded"
	}

	signStr := apiPath + "\n" + body
	hmacObj := hmac.New(sha1.New, []byte(SecretKey))
	hmacObj.Write([]byte(signStr))
	sign := hex.EncodeToString(hmacObj.Sum(nil))
	Authorization := "TOKEN " + AccessKey + ":" + sign

	req, err := http.NewRequest("POST", "https://api.dogecloud.com"+apiPath, strings.NewReader(body))
	req.Header.Add("Content-Type", mime)
	req.Header.Add("Authorization", Authorization)
	client := http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatalln(err)
	} // 网络错误
	defer resp.Body.Close()
	r, err := ioutil.ReadAll(resp.Body)

	json.Unmarshal([]byte(r), &ret)

	// Debug，正式使用时可以注释掉
	fmt.Printf("[DogeCloudAPI] code: %d, msg: %s, data: %s\n", int(ret["code"].(float64)), ret["msg"], ret["data"])
	return
}

func main() {

	uploader := initUploader()
	wg := sync.WaitGroup{}
	c := make(chan int, 64)

	var files []string
	files, _ = GetAllFile("./public")
	for i := 0; i < len(files); i++ {
		wg.Add(1)
		fmt.Println("upload file: ", files[i])
		c <- 1
		i := i
		go func() {
			k := strings.Replace(files[i], "./public/", "./", -1)
			upload(uploader, files[i], k)
			wg.Done()
			<-c
		}()
	}
	wg.Wait()

	fmt.Println("Success!")
}

// GetAllFile 递归获取指定目录下的所有文件名
func GetAllFile(pathname string) ([]string, error) {
	result := []string{}

	fis, err := ioutil.ReadDir(pathname)
	if err != nil {
		fmt.Printf("读取文件目录失败，pathname=%v, err=%v \n", pathname, err)
		return result, err
	}

	// 所有文件/文件夹
	for _, fi := range fis {
		fullname := pathname + "/" + fi.Name()
		// 是文件夹则递归进入获取;是文件，则压入数组
		if fi.IsDir() {
			temp, err := GetAllFile(fullname)
			if err != nil {
				fmt.Printf("读取文件目录失败,fullname=%v, err=%v", fullname, err)
				return result, err
			}
			result = append(result, temp...)
		} else {
			result = append(result, fullname)
		}
	}

	return result, nil
}

func initUploader() *s3manager.Uploader {
	prof := make(map[string]interface{})
	prof["channel"] = "OSS_FULL"
	prof["scopes"] = "*"
	r := DogeCloudAPI("/auth/tmp_token.json", prof, true)
	data := r["data"].(map[string]interface{})
	creds := data["Credentials"].(map[string]interface{})

	s3Config := &aws.Config{
		Credentials: credentials.NewStaticCredentials(creds["accessKeyId"].(string), creds["secretAccessKey"].(string), creds["sessionToken"].(string)),
		Region:      aws.String("automatic"),
		Endpoint:    aws.String("https://cos.ap-guangzhou.myqcloud.com"), // 修改为 DogeCloud 控制台存储空间 SDK 参数中的 s3Endpoint
	}

	newSession := session.New(s3Config)

	s3Client := s3.New(newSession)

	return s3manager.NewUploaderWithClient(s3Client)
}

func upload(uploader *s3manager.Uploader, f string, k string) {

	file, _ := os.Open(f)

	_, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String("s-gz-3197-frytea-com-1258813047"), // 替换为 DogeCloud 控制台存储空间 SDK 参数中的 s3Bucket
		Key:    aws.String(k),
		Body:   file,
	})
	// 如果需要追踪上传进度，需要将 Body 参数替换为一个自定义的 Reader，并为该 Reader 实现 readAt 方法并统计进度
	// 案例参考：https://github.com/aws/aws-sdk-go/blob/master/example/service/s3/putObjectWithProcess/putObjWithProcess.go

	if err != nil {
		log.Fatalln("上传失败", err)
	}
}
