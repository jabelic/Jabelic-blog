---
titel: GASでGoogleForm to Trello
date: 2020-09-20
description: GoogleFormで得た情報をSpreadSheetを介してTrelloのリストにカードを生成する。
sidebar: auto
author: Jabelic
img: ../assets/GAS.png
num: 8
tags:
  - Google App Script
  - Trello
  - REST API
  - 自動化
settings:
  category: GAS
---

# GAS で GoogleForm to Trello

GoogleForm から得た情報を Trello ボードに反映させた。
GoogleForm に記入された情報は SpreadSheet に反映される。回答の欄から SpreadSheet のマークをポチると Sheet が作成されるのでこれをはじめにやっておくこと。このシートに紐付けされた GAS を起動するにはツール → スクリプトエディタ、でお k。

## GAS をローカルで管理

GAS を使うときは、マスターアカウントでログインしなければならない。

いつも使っているアカウントと違うアカウントでの作成をしたい場合は、Chrome だと右上のアイコンから

> 「他のユーザー」から「追加」

を選択して、新しいタブを開く際に追加したユーザーをあてがう。新しいユーザー追加する際は、今回使いたいアカウントでログインすること。

### clasp を使う

- `$ npm install -g @google/clasp`

- [https://script.google.com/home/usersettings](https://script.google.com/home/usersettings)にアクセス。Google App Script API 　をオンにしておく

- `$ clasp login`

  _マスターアカウントでログインする。_

<span style="font-size: 1.3rem;">:warning:</span>既にスクリプトを作成している場合はスクリプトの URL 　`https://script.google.com/d/<ScriptID>`の/d/以降の url が ScriptID であるので,

::: warning
現在は
`https://script.google.com/home/projects/<ScriptID>/edit`
となっているみたいです。
:::

これを Copy して

- `$ clasp clone <ScriptID>`

とすれば良い

そうすると、ローカルに`.clasp.json`, `appsscript.json`, `コード.js`が生成される。

## SpreadSheet -> Trello

### 要件

- ボードの id を取得
- 該当のリストの ID を取得
- SpreadSheet から情報を取得
- Card を post する

### Trello の APIkey と Token を取得

- [https://trello.com/1/appKey/generate](https://trello.com/1/appKey/generate)にアクセス

- 取得した APIkey を次に当てはめてアクセス
  `https://trello.com/1/authorize?key=<APIKey>&name=&expiration=never&response_type=token&scope=read,write`

- Token を取得

### GAS での環境変数の設定取得方法

- ファイル → プロジェクトのプロパティ → スクリプトのプロパティ
  - プロパティに変数を、値に APIKey などを入れる

### 環境変数の取得

```js
const scriptProp = PropertiesService.getScriptProperties().getProperties();
const trelloKey = scriptProp.TRELLO_API_KEY;
const trelloToken = scriptProp.TRELLO_TOKEN;
const username = scriptProp.TRELLO_USERNAME;
const trelloBaseURL = scriptProp.TRELLO_BASE_URL;
const webhookURL = scriptProp.webhookURL;
```

### Trello の情報を取得

Trello ボードの id を取得

```js
function getBoardList() {
  const url =
    "https://api.trello.com/1/members/" +
    username +
    "/boards?key=" +
    trelloKey +
    "&token=" +
    trelloToken +
    "&fields=name";
  var options = {
    method: "get",
    muteHttpExceptions: true,
  };
  Logger.log(UrlFetchApp.fetch(url, options));
}
```

JSON 形式で返ってくるので、該当のボードの id を控えておく。

ボード内のリストの id を取得
boardId に該当のボード id を入れる

```js
function addList() {
  //顧客にlistを作る
  const boardId = "<Board ID>";
  const url =
    "https://api.trello.com/1/boards/" +
    boardId +
    "/lists/?key=" +
    trelloKey +
    "&token=" +
    trelloToken;
  var options = {
    method: "post",
    muteHttpExceptions: true,
    payload: {
      name: "Test List",
      pos: "top",
    },
  };
  Logger.log(UrlFetchApp.fetch(url, options));
}
```

JSON 形式で返ってくるので、カードを投げたいリストの id を控えておく。

リストにカードを投げる
先ほど得られたリストの id を`listId`に入れる。

```js
function addCard(customer) {
  const listId = "<list ID>";
  const url =
    "https://api.trello.com/1/cards/?key=" +
    trelloKey +
    "&token=" +
    trelloToken;
  var options = {
    payload: {
      name: customer.name + "様: " + customer.menu,
      desc:
        customer.mail +
        "\n" +
        customer.contract +
        "\n" +
        "menu: " +
        customer.menu +
        "\n" +
        "人数：" +
        customer.personNum +
        "\n" +
        "size: " +
        customer.size +
        "\n" +
        "画像形式: " +
        customer.pngjpg +
        "\n" +
        "背景: " +
        customer.background +
        "：" +
        customer.bgImage +
        "\n" +
        "アングル: " +
        customer.angle +
        "：" +
        customer.angleImage +
        "\n" +
        "ポーズ: " +
        customer.pause +
        "：" +
        customer.pauseImage +
        "\n" +
        "説明: " +
        customer.description,
      due: "",
      idList: listId,
      urlSource: "",
    },
  };
  Logger.log(UrlFetchApp.fetch(url, options));
}
```

オブジェクトを引数に取り、カードを作ります。

```js
function getValue() {
  var notifySheet = SpreadsheetApp.getActiveSpreadsheet();
  var active_sheet = SpreadsheetApp.getActiveSheet();
  var my_cell = active_sheet.getActiveCell();
  var active_sheet_column = my_cell.getColumn();
  var rowNum = my_cell.getRow();
  console.log(rowNum);
  var customer = {
    // rowNum=2とすると, B2の値を取得.
    mail: notifySheet.getRange("B" + rowNum).getValue(),
    name: notifySheet.getRange("C" + rowNum).getValue(),
    menu: notifySheet.getRange("D" + rowNum).getValue(),
    contract: notifySheet.getRange("E" + rowNum).getValue(),
    personNum: notifySheet.getRange("R" + rowNum).getValue(),
    size: notifySheet.getRange("S" + rowNum).getValue(),
    pngjpg: notifySheet.getRange("T" + rowNum).getValue(),
    background: notifySheet.getRange("U" + rowNum).getValue(),
    bgImage: notifySheet.getRange("V" + rowNum).getValue(),
    illust: notifySheet.getRange("W" + rowNum).getValue(),
    illustImage: notifySheet.getRange("X" + rowNum).getValue(),
    angle: notifySheet.getRange("Y" + rowNum).getValue(),
    angleImage: notifySheet.getRange("Z" + rowNum).getValue(),
    pause: notifySheet.getRange("AA" + rowNum).getValue(),
    pauseImage: notifySheet.getRange("AB" + rowNum).getValue(),
    description: notifySheet.getRange("AC" + rowNum).getValue(),
  };
  console.log(customer);
  addCard(customer);
}
```

`rowNum`で最終行の行数を取得
`notifySheet.getRange('B' + rowNum).getValue`で該当のセルの値を得る。

これでトリガーを設定しておくと、任意のタイミングで関数が実行されて SpreadSheet から Trello に情報が渡ると思う。
