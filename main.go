package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"github.com/algolia/algoliasearch-client-go/v3/algolia/search"
)

func main() {
	// Get your Algolia Application ID and (admin) API key from the dashboard: https://www.algolia.com/account/api-keys
	// and choose a name for your index. Add these environment variables to a `.env` file:
	appID, apiKey, indexName, indexFile := os.Getenv("ALGOLIA_APP_ID"), os.Getenv("ALGOLIA_ADMIN_KEY"), os.Getenv("ALGOLIA_INDEX_NAME"), os.Getenv("ALGOLIA_INDEX_FILE")

	fmt.Println("Save index to ", indexName, " From ", indexFile)
	// fmt.Println("appID:", appID, "apiKey:", apiKey)

	// Start the API client
	// https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/
	client := search.NewClient(appID, apiKey)

	// Create an index (or connect to it, if an index with the name `ALGOLIA_INDEX_NAME` already exists)
	// https://www.algolia.com/doc/api-client/getting-started/instantiate-client-index/#initialize-an-index
	index := client.InitIndex(indexName)

	// read index json file
	algoliaFile, _ := ioutil.ReadFile(indexFile)
	var data interface{}
	err := json.Unmarshal(algoliaFile, &data)
	if err != nil {
		fmt.Println("jsonUnmarshell", err)
		os.Exit(1)
	}

	// Add new objects to the index
	// https://www.algolia.com/doc/api-reference/api-methods/add-objects/
	resSave, err := index.SaveObjects(data)
	if err != nil {
		fmt.Println("indexSave", err)
		os.Exit(1)
	}

	// Wait for the indexing task to complete
	// https://www.algolia.com/doc/api-reference/api-methods/wait-task/
	err = resSave.Wait()
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	fmt.Println("Success!")
}
