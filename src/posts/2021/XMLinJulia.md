---
title: Juliaで気象庁のXMLデータの整形/表示
date: 2021-05-16
description: EzXML.jlを使って，XMLデータを解析(表示だけ)．
sidebar: auto
author: Jabelic
img: ../assets/Julia.jpeg
num: 202102
tags:
  - 技術ブログ
  - Julia
  - XML
  - REST
category: 技術
---

# Julia で気象庁の XML データの整形/表示

## Motivation

大学の Database の授業で REST で XML データを取得しよう，という課題があったため．

## Overview

- `HTTP.jl`を使って気象庁から XML 形式の Atom フィードを取得する．
- `EzXML.jl`を使って XML データを示す．

## Main

### データの中身

今回使うデータの一部．ちょっと長いので畳みます．

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

<br>

### 使用する Package を読み込む

```Julia
import Pkg
using Pkg
Pkg.add("HTTP");using HTTP
Pkg.add("EzXML");using EzXML
```

この類は実行に時間がかかります．Jupyter を使用している場合には一回読み込ませればあとは`using XXX`をする必要はありません．`.jl`を書いて，terminal からの実行でデバッグをする際は，セッションが毎度切り替わるためにその都度 package のロードが行われて，実行毎にゲンナリすることになります．解決方法としては[PackageCompiler.jl](https://github.com/JuliaLang/PackageCompiler.jl)を利用する方法があるようです．

参考:
[PackageCompiler.jl で Plots の呼び出しを高速化する 2020 年 7 月版 - Qiita](https://qiita.com/cometscome_phys/items/85150cca4e4ff7c1d568)  
[PackageCompiler.jl で Makie.jl の呼び出しを速くする - Qiita](https://qiita.com/SatoshiTerasaki/items/478f29cf4343364a136f)

<br>

### HTTP Request を送って Atom フィードを取得する

`HTTP.jl`を使う.

```Julia
req = HTTP.request("GET", "http://www.data.jma.go.jp/developer/xml/feed/regular_l.xml")
# status code
println(req.status)
# 中身
println(String(req.body))
```

### EzXML.jl を使って XML データを解析(表示)

  <!-- TODO: EzXML.jlの使い方 -->

- <span class="heighlight-str">XML データの読み込み</span>

  | データの形式 | syntax                                 |
  | ------------ | -------------------------------------- |
  | XML file     | `readxml(your_xml_file)`               |
  | XML 文字列   | `parsexml(""" <feed xmlns=" .... """)` |

  ```Julia{1}
  doc = parsexml(String(req.body))
  primates = root(doc)
  ```

- <span class="heighlight-str">EzXML.jl の型</span>  
  EzXML.jl では型は主に `EzXML.Document` と `EzXML.Node` のみ．

- <span class="heighlight-str">XML データの root を取る</span>

  ```Julia{2}
  doc = parsexml(String(req.body))
  primates = root(doc)
  ```

  `doc`の型は`EzXML.Document`である. `root(doc)`とするとその型は`EzXML.Node`であるので，中身を解析することが出来るようになる．

- <span class="heighlight-str">Node の解析</span>  
  上で取得した root の`EzXML.Node`を`eachelement(primates)`とすることで`EzXML.ChildElementIterator`を取得できるのでこれを for で回すと，root の一つしたの階層の Node が取れる．

  ```Julia
  for genus in eachelement(primates)
    println(genus)
    # Get an attribute value by name.
  end
  ```

  とすると,

  ```XML
  <title>高頻度（定時）</title>
  <subtitle>JMAXML publishing feed</subtitle>
  <updated>2021-06-03T02:12:07+09:00</updated>
  <id>http://www.data.jma.go.jp/developer/xml/feed/regular.xml#short_1622653927</id>
  <link rel="related" href="http://www.jma.go.jp/"/>
  <link rel="self" href="http://www.data.jma.go.jp/developer/xml/feed/regular.xml"/>
  <link rel="hub" href="http://alert-hub.appspot.com/"/>
  <rights type="html"><![CDATA[
  <a href="http://www.jma.go.jp/jma/kishou/info/coment.html">利用規約</a>,
  <a href="http://www.jma.go.jp/jma/en/copyright.html">Terms of Use</a>
  ]]></rights>
  <entry>
    <title>大雨危険度通知</title>
    <id>http://www.data.jma.go.jp/developer/xml/data/20210602171020_0_VPRN50_010000.xml</id>
    <updated>2021-06-02T17:09:44Z</updated>
    <author>
      <name>気象庁</name>
    </author>
    <link type="application/xml" href="http://www.data.jma.go.jp/developer/xml/data/20210602171020_0_VPRN50_010000.xml"/>
    <content type="text">【大雨危険度通知】</content>
  </entry>
  ...
  ```

  `genus`以下の階層が中身が全部出力される．

  - <span class="heighlight-str">Node の中身を整形して表示</span>  
    `entry`の中の`title`や`id`, `updated`などの階層を調べるには for でネストさせれば良い.
    特に Node name だけを出力したい場合は以下のように`.name`を使う.

    ```XML
    <title>大雨危険度通知</title>
    ```

    なら

    ```Julia
    primates = root(parsexml("""<title>大雨危険度通知</title>"""))
    println(primates.name ,":", primates.content)
    # > title:大雨危険度通知
    ```

    となる

    <details><summary>例: </summary><div>

    ```Julia
    for genus in eachelement(primates)
        # Get an attribute value by name.
        if genus.name != "entry"
            println("--- ", genus.name, ": ", genus.content)
        end
        for species in eachelement(genus)
        println(" └-- ", species.name, ": ", species.content, "")
        end
        println("---------------------------------------")
    end
    ```

    ```bash
        --- title: 高頻度（定時）
        ---------------------------------------
        --- subtitle: JMAXML publishing feed
        ---------------------------------------
        --- updated: 2021-06-03T02:22:06+09:00
        ---------------------------------------
        --- id: http://www.data.jma.go.jp/developer/xml/feed/regular.xml#short_1622654526
        ---------------------------------------
        --- link:
        ---------------------------------------
        --- link:
        ---------------------------------------
        --- link:
        ---------------------------------------
        --- rights:
        <a href="http://www.jma.go.jp/jma/kishou/info/coment.html">利用規約</a>,
        <a href="http://www.jma.go.jp/jma/en/copyright.html">Terms of Use</a>

        ---------------------------------------
        └-- title: 大雨危険度通知
        └-- id: http://www.data.jma.go.jp/developer/xml/data/20210602172011_0_VPRN50_010000.xml
        └-- updated: 2021-06-02T17:19:42Z
        └-- author:
            気象庁

        └-- link:
        └-- content: 【大雨危険度通知】
        ...
    ```

    </div></details>

  - <span class="heighlight-str">Node の href 属性などを表示</span>  
    このままでは`link`の`href`属性などが取れていないので寂しい．`href`などの属性は`genus["href"]`などとすれば文字列として取得することが出来る．

    ```XML
    ...
    <link type="application/xml" href="http://www.data.jma.go.jp/developer/xml/data/20210602171020_0_VPRN50_010000.xml"/>
    ...
    ```

    なら

    ```Julia
    primates = root(parsexml("""<link type="application/xml" href="http://www.data.jma.go.jp/developer/xml/data/20210602171020_0_VPRN50_010000.xml"/>"""))
    println(primates["href"])

    # > http://www.data.jma.go.jp/developer/xml/data/20210602171020_0_VPRN50_010000.xml
    ```

    みたいな感じ

    <details><summary>例: </summary><div>

    ```Julia
        for genus in eachelement(primates)
            # Get an attribute value by name.
            if genus.name != "entry" && genus.name != "link"
                println("--- ", genus.name, ": ", genus.content)
            elseif genus.name == "link"
                println("--- ", genus.name, ": ", genus["href"])
            end
            for species in eachelement(genus)
                if species.name == "link"
                    println("--- ", species.name, ": ", species["href"])
                else
                    println(" └-- ", species.name, ": ", species.content, "")
                end
            end
            println("---------------------------------------")
        end
    ```

    ```bash
        ...
        --- id: http://www.data.jma.go.jp/developer/xml/feed/regular.xml#short_1622655067
        ---------------------------------------
        --- link: http://www.jma.go.jp/
        ---------------------------------------
        --- link: http://www.data.jma.go.jp/developer/xml/feed/regular.xml
        ---------------------------------------
        --- link: http://alert-hub.appspot.com/
        ---------------------------------------
        ...

        ---------------------------------------
        └-- title: 大雨危険度通知
        └-- id: http://www.data.jma.go.jp/developer/xml/data/20210602173000_0_VPRN50_010000.xml
        └-- updated: 2021-06-02T17:29:38Z
        └-- author:
            気象庁

        --- link: http://www.data.jma.go.jp/developer/xml/data/20210602173000_0_VPRN50_010000.xml
        └-- content: 【大雨危険度通知】
        ---------------------------------------
        ...
    ```

    </div></details>

あとは子ノードを持つかどうかを判定する`hasnode(node)`, 文字列であるかどうかを判定する`istext(node)`などがある．

<br>

まとめると

```Julia
import Pkg;using Pkg
Pkg.add("HTTP");using HTTP
Pkg.add("EzXML");using EzXML

req = HTTP.request("GET", "http://www.data.jma.go.jp/developer/xml/feed/regular_l.xml")
doc = parsexml(String(req.body))
primates = root(doc)

id_name = ""
id_content = ""
println("\n\n\n\n===== XML =====")

for genus in eachelement(primates)
    # Get an attribute value by name.
    if genus.name != "entry" && genus.name != "link"
        println("--- ", genus.name, ": ", genus.content)
    elseif genus.name == "link"
        println("--- ", genus.name, ": ", genus["href"])
    end
    for species in eachelement(genus)
        if species.content != "" && species.name != "id"
            println(" └-- ", species.name, ": ", species.content, "")
        elseif species.name == "id"
            global id_name = deepcopy(species.name)
            global id_content = deepcopy(species.content)
        end
    end
    if id_name != ""
        println(" └-- ", id_name, ": ", id_content, "")
        global id_name = ""
        global id_content = ""
    end
    println("---------------------------------------")
end

```

output:

```bash

===== XML =====
--- title: 高頻度（定時）
---------------------------------------
--- subtitle: JMAXML publishing feed
---------------------------------------
--- updated: 2021-06-03T03:02:07+09:00
---------------------------------------
--- id: http://www.data.jma.go.jp/developer/xml/feed/regular.xml#short_1622656927
---------------------------------------
--- link: http://www.jma.go.jp/
---------------------------------------
--- link: http://www.data.jma.go.jp/developer/xml/feed/regular.xml
---------------------------------------
--- link: http://alert-hub.appspot.com/
---------------------------------------
--- rights:
<a href="http://www.jma.go.jp/jma/kishou/info/coment.html">利用規約</a>,
<a href="http://www.jma.go.jp/jma/en/copyright.html">Terms of Use</a>

---------------------------------------
 └-- title: 大雨危険度通知
 └-- updated: 2021-06-02T17:59:40Z
 └-- author:
      気象庁

 └-- content: 【大雨危険度通知】
 └-- id: http://www.data.jma.go.jp/developer/xml/data/20210602180010_0_VPRN50_010000.xml
  --- title: 高頻度（定時）
  --- subtitle: JMAXML publishing feed
  --- updated: 2021-06-03T03:02:07+09:00
  --- id: http://www.data.jma.go.jp/developer/xml/feed/regular.xml#short_1622656927
---------------------------------------
 └-- title: 大雨危険度通知
 └-- updated: 2021-06-02T17:49:37Z
 └-- author:
      気象庁

 └-- id: http://www.data.jma.go.jp/developer/xml/data/20210602175001_0_VPRN50_010000.xml
  --- title: 高頻度（定時）
  --- subtitle: JMAXML publishing feed
  --- updated: 2021-06-03T03:02:07+09:00
  --- id: http://www.data.jma.go.jp/developer/xml/feed/regular.xml#short_1622656927
---------------------------------------
...
```

## Reference

[JuliaIO/EzXML.jl - github](https://github.com/JuliaIO/EzXML.jl)
[EzXML.jl を作った話 - りんごがでている - hatenablog](http://bicycle1885.hatenablog.com/entry/2016/12/15/084937)  
[PackageCompiler.jl で Plots の呼び出しを高速化する 2020 年 7 月版 - Qiita](https://qiita.com/cometscome_phys/items/85150cca4e4ff7c1d568)  
[PackageCompiler.jl で Makie.jl の呼び出しを速くする - Qiita](https://qiita.com/SatoshiTerasaki/items/478f29cf4343364a136f)

<style type="text/css">
.heighlight-str {
  font-weight   : bold;                /* 太字 */
  /* font-size     : 100%;    文字を大きくする */
  text-shadow: 1px 1px 3px #ffd700, 0px -1px 3px #0f0;
}
</style>

<div class="twitter">
  <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size='large'>Tweet</a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
