---
title: tl;drの管理ツール
date: 2021-02-19
description: slackとTrelloにtl;drを投げるChrome Extention
sidebar: auto
author: Jabelic
img: ../assets/
num: 202101
settings:
  category: 技術
  tags:
    - tl;dr
    - ChromeExtension
    - JavaScript
    - 技術ブログ
---

# tl;drの管理ツール

## はじめに

tl;drとは、"Too Long, Didin't Read"の略で、「長すぎるので読まない」という意味から転じて、「後で読む」もしくは「要約」みたいな使い方をするインターネットスラングです。

たとえば、ドキュメントをslackなどでシェアするときに添える要約の先頭にtl;drと書いたり、ちょっと長くて今すぐには読めない技術記事などを"tl;dr"と呼んだりします。

（あくまでインターネットスラングなので、基本的にはフォーマルな場では使わないほうが良いみたい。）


そんなtl;drな技術記事はTwitterのTLから流れてきたものや開発中にググって出てきたもの、はたまた他人の技術ブログの参考先など、多分に、タイミングを問わず現れます。

そんな後で読みたい技術記事などは、とりあえずTabを残して、放置することが常習的でした。

それが重なり気づいたらFaviconだらけでどの記事がどのあたりにあるかがわかりにくくなり、更には消し忘れのTabなのか後で読もうと思って残しておいたTabなのかおぼろげで、まあいいやと消してしまう。そしてこれがすごくもったいないことだと感じるようになりました。

__今回はこの、「後で読む」tl;drな技術記事やジャーナルを管理する解決策として、Chromeの拡張機能を作りました。__ 保存される記事情報はSlackとTrelloに送信され、タスクとして蓄積されます。


### TL;DR(要約)

TL;DR情報をslackとTrelloに保存するChrome Extensionを作った。<br>
使用した技術は

- [TrelloAPI](https://developer.atlassian.com/cloud/trello/rest/api-group-actions/)
- [Slack Incoming Webhook](https://slack.com/intl/ja-jp/help/articles/115005265063-Slack-%E3%81%A7%E3%81%AE-Incoming-Webhook-%E3%81%AE%E5%88%A9%E7%94%A8)
- [Chrome Extension API](https://developer.chrome.com/docs/extensions/reference/)

の３つ。

## 下準備

### TrelloAPI

#### API key, Tokenを取得


- 【APIkey】[https://trello.com/1/appKey/generate](https://trello.com/1/appKey/generate) にアクセスして<span style="color:#5555ff;">Key</span>を取得

  同じく、

  > Token:
  > Most developers will need to ask each user to authorize your application. If you are looking to build an application for yourself, or are doing local testing, you can manually generate a [Token].

  とあるので
- 【APIToken】'Token'をクリック。許可(Allow)を押すと<span style="color:#5555ff;">APIToken</span>が表示されるので控えておく。
    
::: tip
key, tokenはダブルクリックして、コピーしたほうが良さそう。カーソル当ててビーッと引っ張って選択するやり方だとしくる可能性がある(らしい)。
:::

#### Trelloのusername, Board, Listの情報を取得する。

<span style="font-size: 80%; color: gray;">Scriptを書いてプログラムから取得する方法が一般的みたいだけど、各種idをとってくるだけなのでChromeから普通にアクセスしたほうがノントラブルでできそう（私はそうしました）。</span>

- あらかじめtl;drの情報を投稿したいBoardとListを作っておく。

- 先程取得した<span style="color:#5555ff;">APIkey</span>と<span style="color:#5555ff;">APIToken</span>を以下のURLに当てはめてアクセス。
  `https://api.trello.com/1/members/me/?key=<APIKey>&token=<APIToken>`
  
  JSON形式のデータが表示されます。

    - <span style="color:#5555ff;">username</span>を取得<br>
    `"url":"https://trello.com/xxxxxx"`
       `xxxxxx`がusername
       もしくはTrello右上、Profile and Visibility, Activity, Cards, Settingsのどれかをクリック
          上部、@マークの後ろに続く文字列がusername


  - <span style="color:#5555ff;">Board</span>のidを取得<br>
    `https://trello.com/1/members/<USERNAME>/boards?key=<APIKey>&token=<APIToken>&fields=name`

    >`[{"name":"BOARDNAME","id":"hogehugapiyopiyo"}]`

  - <span style="color:#5555ff;">List</span>のidを取得<br>
    `https://trello.com/1/boards/<BOARDid>/lists?key=<APIKey>&token=<APIToken>&fields=name`
    
    >`[{"id":"hogehugapiyo555","name":"THELISTNAME"}]`


<!-- <hr style="height:5px;  background-color:#9999ff;"> -->

### Slack Incoming Webhook

incoming Webhookを使います。
- [https://jabelic.slack.com/apps](https://jabelic.slack.com/apps) にアクセス
  - 右上、ワークスペースがあっているか確認して、`incoming webhook`を検索
  - 設定（Add conficuretion）クリック
  - チャンネルを選んで、<span style="color:#5555ff;">__Webhook URL__</span> を取得。


<!-- <hr style="height:5px;  background-color:#9999ff;"> -->

## Chrome Extension

ここまでで、Trelloのusername, Boardのid, Listのid, Slack Incoming WebhookのURLを取得しました。これを使って開発します。

Chrome Extensionの開発はAPIを使って行います。<br>
ファイルの構成は

```bash
 manifest.json
 index.js
```

だけです。

manifest.json
```json
 {
     "manifest_version": 2,
     "version": "1.0.0",
     "name": "tldr",
     "background": {
         "scripts": ["index.js" ],
         "persistent": false
     },
     "permissions": [
         "tabs",
         "bookmarks",
         "activeTab"
     ],
     "browser_action": {
         "name": "tl;dr"
     },
     "content_scripts": [{
         "matches": [ "http://*/*", "https://*/*" ],
         "js": [ "index.js" ]
     }]
 }
```

index.js
```js
 const trelloKey="KEY"
 const trelloToken = "TOKEN"
 const username="USER"
 const webhook = "https://hooks.slack.com/services/xxxxxxxxxxxxx/pppppppppppp"
 
 function addCard(item){
     const listId = "hogehugapiyo555ppp";
     const url = "https://trello.com/1/cards?key=" + trelloKey + "&token=" + trelloToken + "&idList=" + listId + "&name=" + item.title + "&urlSource=" + item.url;
     var payload = {
         "text": item.title + "  " + item.url,
         "username": "TL;DR",
         "channel": "#tldr",
     }
     // trello post
     console.log(fetch(url,{
         method: 'POST',}))
     // slack post
     console.log(fetch(webhook,{
         method: 'POST',
         body: JSON.stringify(payload)}))
 }
 chrome.browserAction.onClicked.addListener(function(tab){
     console.log(tab.url, tab.title)
     addCard({url: tab.url, title: tab.title})
 })
```

#### 解説

- `addCard`ではtrelloのAPIとSlackのAPIを叩いています。
- `chrome.browserAction.onClicked.addListener(function(args){})`はchromeの拡張機能のアイコンをクリックすると動作するコードです。
    このようにChrome ExtensionにはAPIが用意されています。詳しくは:[API ReferenceGoogle Developers](https://developer.chrome.com/docs/extensions/reference/)



### Chromeに反映

- Chrome, windowの右上のパズルのマーク
- 「拡張機能を管理」
- 「パッケージ化されていない拡張機能を読み込む」
  - 該当のフォルダを選択肢、反映。

ファイルの変更をしたら必ず"読み込み<i class="material-icons" style="position: relative;top:5px">refresh</i>"をしてください。


<hr style="height:5px;  background-color:#9999ff;">

これでTrelloとSlackにWebページのurlとtitleが送信されます。TrelloのCardにはOGP(imageとdescription)も反映されるので、見た目的にも良いです。

<img  src="../../.vuepress/assets/trello-tldr.png" width=50%>

## 参考

[Chrome拡張でとっても役立つAPIのまとめ - Qiita](https://qiita.com/Yuta_Fujiwara/items/daf41429f95caec82982)

<style  type="text/css">
body{background-color: #f5f5f5;}
</style>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">