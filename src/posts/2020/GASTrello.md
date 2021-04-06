---
titel: GASでGoogleForm to Trello
date: 2020-09-20
description: GoogleFormで得た情報をSpreadSheetを介してTrelloのリストにカードを生成する。
sidebar: auto
author: Jabelic
img: ../assets/GAS.png
num: 8
settings:
  category: GAS
  tags:
    - Google App Script
    - Trello
    - REST API
    - 自動化
---


# GASでGoogleForm to Trello
GoogleFormから得た情報をTrelloボードに反映させた。
GoogleFormに記入された情報はSpreadSheetに反映される。回答の欄からSpreadSheetのマークをポチるとSheetが作成されるのでこれをはじめにやっておくこと。このシートに紐付けされたGASを起動するにはツール→スクリプトエディタ、でおk。


## GASをローカルで管理

GASを使うときは、マスターアカウントでログインしなければならない。

いつも使っているアカウントと違うアカウントでの作成をしたい場合は、Chromeだと右上のアイコンから

>「他のユーザー」から「追加」

を選択して、新しいタブを開く際に追加したユーザーをあてがう。新しいユーザー追加する際は、今回使いたいアカウントでログインすること。


### claspを使う
- `$ npm install -g @google/clasp`

- [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)にアクセス。Google App Script API　をオンにしておく

- `$ clasp login`

     _マスターアカウントでログインする。_

<span style="font-size: 1.3rem;">:warning:</span>既にスクリプトを作成している場合はスクリプトのURL　`https://script.google.com/d/<ScriptID>`の/d/以降のurlがScriptIDであるので, 


::: warning 
現在は
`https://script.google.com/home/projects/<ScriptID>/edit`
となっているみたいです。
:::

これをCopyして

- `$ clasp clone <ScriptID>`

とすれば良い

そうすると、ローカルに`.clasp.json`, `appsscript.json`, `コード.js`が生成される。

## SpreadSheet -> Trello

### 要件
- ボードのidを取得
- 該当のリストのIDを取得
- SpreadSheetから情報を取得
- Cardをpostする

### TrelloのAPIkeyとTokenを取得

- [https://trello.com/1/appKey/generate](https://trello.com/1/appKey/generate)にアクセス
 
- 取得したAPIkeyを次に当てはめてアクセス
`https://trello.com/1/authorize?key=<APIKey>&name=&expiration=never&response_type=token&scope=read,write`

- Tokenを取得

### GASでの環境変数の設定取得方法

- ファイル→プロジェクトのプロパティ→ スクリプトのプロパティ
    - プロパティに変数を、値にAPIKeyなどを入れる

### 環境変数の取得


```js
 const scriptProp =  PropertiesService.getScriptProperties().getProperties();
 const trelloKey = scriptProp.TRELLO_API_KEY;
 const trelloToken = scriptProp.TRELLO_TOKEN;
 const username = scriptProp.TRELLO_USERNAME;
 const trelloBaseURL = scriptProp.TRELLO_BASE_URL;
 const webhookURL = scriptProp.webhookURL;
```


### Trelloの情報を取得

Trelloボードのidを取得

```js
 function getBoardList(){
   const url = 'https://api.trello.com/1/members/' + username + '/boards?key=' + trelloKey + '&token=' + trelloToken + '&fields=name';
   var options = {
     'method' : 'get',
     'muteHttpExceptions' : true
   }
   Logger.log(UrlFetchApp.fetch(url, options));
 }
```

JSON形式で返ってくるので、該当のボードのidを控えておく。

ボード内のリストのidを取得
 boardIdに該当のボードidを入れる

```js
 function addList(){//顧客にlistを作る
   const boardId = '<Board ID>';
   const url = 'https://api.trello.com/1/boards/' + boardId + '/lists/?key=' + trelloKey + '&token=' + trelloToken;
   var options = {
     'method' : 'post',
     'muteHttpExceptions' : true,
     'payload' : {
       'name' : 'Test List',
       'pos' : 'top'
     }
   }
   Logger.log(UrlFetchApp.fetch(url, options));
 }
```


JSON形式で返ってくるので、カードを投げたいリストのidを控えておく。


リストにカードを投げる
 先ほど得られたリストのidを`listId`に入れる。

```js
 function addCard(customer){
   const listId = '<list ID>';
   const url = 'https://api.trello.com/1/cards/?key=' + trelloKey + '&token=' + trelloToken;
   var options = {
     'payload' : {
       'name'      : customer.name + '様: ' + customer.menu,
       'desc'      : customer.mail + '\n' + customer.contract + '\n'
       + 'menu: '+ customer.menu + '\n'
       + '人数：' + customer.personNum + '\n'
       + 'size: ' + customer.size + '\n'
       + '画像形式: ' + customer.pngjpg + '\n'
       + '背景: ' + customer.background + '：' + customer.bgImage + '\n'
       + 'アングル: ' + customer.angle + '：' + customer.angleImage + '\n'
       + 'ポーズ: ' + customer.pause + '：' + customer.pauseImage + '\n'
       + '説明: ' + customer.description,
       'due'       : '',
       'idList'    : listId,
       'urlSource' : ''
     }
   }
   Logger.log(UrlFetchApp.fetch(url, options));
 }
```

オブジェクトを引数に取り、カードを作ります。

```js
 function getValue(){  
   var notifySheet = SpreadsheetApp.getActiveSpreadsheet();
   var active_sheet = SpreadsheetApp.getActiveSheet();
   var my_cell = active_sheet.getActiveCell();
   var active_sheet_column = my_cell.getColumn();
   var rowNum = my_cell.getRow();
   console.log(rowNum);
   var customer = {
       // rowNum=2とすると, B2の値を取得.
       mail: notifySheet.getRange('B' + rowNum).getValue(),
       name: notifySheet.getRange('C' + rowNum).getValue(),
       menu: notifySheet.getRange('D' + rowNum).getValue(),
       contract: notifySheet.getRange('E' + rowNum).getValue(),
       personNum: notifySheet.getRange('R' + rowNum).getValue(),
       size: notifySheet.getRange('S' + rowNum).getValue(),
       pngjpg: notifySheet.getRange('T' + rowNum).getValue(),
       background: notifySheet.getRange('U' + rowNum).getValue(),
       bgImage: notifySheet.getRange('V' + rowNum).getValue(),
       illust:  notifySheet.getRange('W' + rowNum).getValue(),
       illustImage: notifySheet.getRange('X' + rowNum).getValue(),
       angle: notifySheet.getRange('Y' + rowNum).getValue(),
       angleImage: notifySheet.getRange('Z' + rowNum).getValue(),
       pause: notifySheet.getRange('AA' + rowNum).getValue(),
       pauseImage: notifySheet.getRange('AB' + rowNum).getValue(),
       description: notifySheet.getRange('AC' + rowNum).getValue()
     }
   console.log(customer);
   addCard(customer);
 }
```

`rowNum`で最終行の行数を取得
`notifySheet.getRange('B' + rowNum).getValue`で該当のセルの値を得る。

これでトリガーを設定しておくと、任意のタイミングで関数が実行されてSpreadSheetからTrelloに情報が渡ると思う。


