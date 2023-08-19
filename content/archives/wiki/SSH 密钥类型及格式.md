---
title: 'SSH 密钥类型及格式'
date: '2023-06-26T02:07:27.083Z'
tags: ['SSH', 'Linux']
created: '2023-06-26T01:41:11.695Z'
creator: 'songtianlun'
modifier: 'songtianlun'
revision: '11'
bag: 'default'
---

<!-- Exported from TiddlyWiki at 17:06, 22nd 七月 2023 -->

# SSH 密钥类型及格式

在使用 `ssh-keygen` 命令生成密钥对时，有这几个参数需要被注意：

```bash
# 对密钥对的注释，会追加在公钥最后
-C comment
             Provides a new comment.
# 密钥长度，详细请看描述
-b bits
             Specifies the number of bits in the key to create.  For RSA keys, the minimum size is 1024 bits and the default is 2048 bits.  Generally, 2048 bits
             is considered sufficient.  DSA keys must be exactly 1024 bits as specified by FIPS 186-2.  For ECDSA keys, the -b flag determines the key length by
             selecting from one of three elliptic curve sizes: 256, 384 or 521 bits.  Attempting to use bit lengths other than these three values for ECDSA keys
             will fail.  Ed25519 keys have a fixed length and the -b flag will be ignored.
# 密钥对名称，如果使用 test 则生成 test 和 test.pub 这对密钥
-f filename
             Specifies the filename of the key file.
# 密钥类型
-t dsa | ecdsa | ed25519 | rsa | rsa1
             Specifies the type of key to create.  The possible values are “rsa1” for protocol version 1 and “dsa”, “ecdsa”, “ed25519”, or “rsa” for protocol ver‐
             sion 2.
# 密钥格式
-m key_format
             Specify a key format for the -i (import) or -e (export) conversion options.  The supported key formats are: “RFC4716” (RFC 4716/SSH2 public or pri‐
             vate key), “PKCS8” (PEM PKCS8 public key) or “PEM” (PEM public key).  The default conversion format is “RFC4716”.
```

以上内容来自 `man ssh-keygen`，下面注重讨论一下密钥类型和密钥格式。

## SSH 密钥对类型

根据上文的描述，  SSH 密钥的几种类型特点及使用场景如下表：

|     类型    |                                                                       描述                                                                      |                          场景                          |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
|   `rsa1`  | 对应于SSH协议版本1的RSA算法。这是一种基于大数因子分解难题的算法，RSA是一个被广泛使用的公钥加密系统。                                                                                       | 当使用SSH协议版本1时，可以选择此类型。但是需要注意，SSH协议版本1已被视为不安全，因此不推荐使用。 |
|   `rsa`   | 对应于SSH协议版本2的RSA算法。对于RSA，建议密钥大小至少为2048位；4096位更好。随着对因子分解技术的显著进步，RSA正在变得过时。建议选择不同的算法。在可预见的未来，RSA算法可能会变得实际可破解。所有SSH客户端都支持此算法。                     | 当需要与所有SSH客户端兼容时可以选择此类型。但是需要注意，随着技术的进步，此类型的安全性可能会降低。  |
|   `dsa`   | 对应于SSH协议版本2的DSA算法。DSA是一种基于计算离散对数难题的US政府数字签名算法。通常与它一起使用的密钥大小为1024。不再推荐使用其原始形式的DSA。                                                             | 不推荐在新的场景中使用此类型，因为其已经被认为过时。                           |
|  `ecdsa`  | 对应于SSH协议版本2的ECDSA算法。ECDSA是一种使用椭圆曲线的新型数字签名算法。只支持三种密钥大小：256，384和521（有点奇怪！）位。我们建议始终使用521位，因为即使密钥仍然很小，也可能比较小的密钥更安全（尽管它们应该也是安全的）。大多数SSH客户端现在支持此算法。 | 当需要在新的场景中使用更安全的密钥时，可以选择此类型。                          |
| `ed25519` |                                  对应于SSH协议版本2的ED25519算法。这是在OpenSSH中添加的新算法。客户端对它的支持还不是普遍的。因此，它在通用应用中的使用可能尚不可取。                                  | 在客户端普遍支持ed25519的场景中，可以考虑使用此类型。                       |

## 格式

下面是对`ssh-keygen`命令的`-m key_format`参数支持的几种类型的解释及其适用场景：

|     类型    |                                  描述                                  |                  场景                  |
|-----------|----------------------------------------------------------------------|--------------------------------------|
| `RFC4716` | RFC4716格式，对应于RFC 4716/SSH2的公钥或私钥。这是SSH2的公钥格式，它被许多SSH实现所使用，包括OpenSSH。 | 当需要与SSH2兼容或与其他使用该格式的系统进行交互时，可以选择此格式。 |
|  `PKCS8`  |                           PKCS8格式，对应于PEM PKCS8的公钥。这是一种用于存储私钥信息的通用格式。 |   当需要以一种标准和广泛接受的方式存储公钥信息时，可以选择此格式。   |
|   `PEM`   |                  PEM格式，对应于PEM的公钥。这是一种用于存储公钥、私钥和证书的旧式格式，它最初被设计用于邮件加密。 |    当需要与使用PEM格式的老旧系统进行交互时，可以选择此格式。    |

需要注意的是，这些格式主要用于在不同系统或应用之间交换和存储公钥和私钥。具体使用哪种格式可能取决于目标系统或应用支持哪种格式。