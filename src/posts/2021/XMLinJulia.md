---
title: Juliaで気象庁のXMLデータの解析
date: 2021-05-16
description: EzXML.jlを使って，XMLデータを解析．
sidebar: auto
author: Jabelic
img: ../assets/
num: 202102
settings:
  category: 技術
  tags:
    - 技術ブログ
    - Julia
    - XML
    - REST
---

# Julia で気象庁の XML データの解析

## Motivation

## Overview

## データの中身

<details><summary>XMLデータの中身</summary><div>

```xml
<feed xmlns="http://www.w3.org/2005/Atom" lang="ja">
<title>長期（定時）</title>
<subtitle>JMAXML publishing feed</subtitle>
<updated>2021-05-15T23:12:06+09:00</updated>
<id>http://www.data.jma.go.jp/developer/xml/feed/regular.xml#long_1621087926</id>
<link rel="related" href="http://www.jma.go.jp/"/>
<link rel="self" href="http://www.data.jma.go.jp/developer/xml/feed/regular.xml"/>
<link rel="hub" href="http://alert-hub.appspot.com/"/>
<rights type="html">
<![CDATA[ <a href="http://www.jma.go.jp/jma/kishou/info/coment.html">利用規約</a>, <a href="http://www.jma.go.jp/jma/en/copyright.html">Terms of Use</a> ]]>
</rights>
<entry>
    <title>大雨危険度通知</title>
    <id>http://www.data.jma.go.jp/developer/xml/data/20210515141010_0_VPRN50_010000.xml</id>
    <updated>2021-05-15T14:09:42Z</updated>
    <author>
        <name>気象庁</name>
    </author>
    <link type="application/xml" href="http://www.data.jma.go.jp/developer/xml/data/20210515141010_0_VPRN50_010000.xml"/>
    <content type="text">【大雨危険度通知】</content>
    </entry>
<entry>
    <title>地上実況図</title>
    <id>http://www.data.jma.go.jp/developer/xml/data/20210515140100_0_VZSA50_010000.xml</id>
    <updated>2021-05-15T14:00:49Z</updated>
    <author>
        <name>気象庁</name>
    </author>
    <link type="application/xml" href="http://www.data.jma.go.jp/developer/xml/data/20210515140100_0_VZSA50_010000.xml"/>
    <content type="text">【地上実況図】</content>
</entry>
<entry>
...

```

</div></details>

## 使用する Package を読み込む

```Julia
import Pkg
using Pkg
Pkg.add("HTTP");using HTTP
Pkg.add("EzXML");using EzXML
```

## 解析

### HTTP package の使い方

### EzXML package の使い方

まとめると

```Julia
req = HTTP.request("GET", "http://www.data.jma.go.jp/developer/xml/feed/regular_l.xml")
doc = parsexml(String(req.body))
primates = root(doc)

id_name = ""
id_content = ""
for genus in eachelement(primates)
    # Get an attribute value by name.
    if genus.name != "entry"
        println("--- ", genus.name, ": ", genus.content)
    end
    id_name = ""
    id_content = ""
    for species in eachelement(genus)
        if species.content != ""
            println(" └-- ", species.name, ": ", species.content, "")
        elseif species.name == "author"
            println(" └-- ", species.name, ": ", species.content, "")
        elseif species.name == "link"
            println(" └-- ", species.name,": ", species["href"])
        elseif species.name == "id"
            global id_name = deepcopy(species.name)
            global id_content = deepcopy(species.content)
        end
    end
    if id_name != ""
        println(" └-- ", id_name, ": ", id_content, "")
    end
    println("---------------------------------------")
end
println()
```

- huga
