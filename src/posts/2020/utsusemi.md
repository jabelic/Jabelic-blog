---
titel: 絵画工房 空蝉
date: 2020-09-02
description: ポートフォリオサイトの構築について。
sidebar: auto
author: Jabelic
img: ../assets/utsusemi.png
num: 6
tags:
  - Vuejs
  - Vuetify
  - 技術ブログ
settings:
  category: 技術
---

# ポートフォリオサイト構築案件

絵師さんのポートフォリオサイトと注文システムを構築した。

[絵画工房 空蝉](https://utsusemi.netlify.app/)

開発依頼の動機はメールボックスのメールが反乱状態にあったこと、将来的にサイトが必要になるであろうという希望的な予測、それから受注に際して聞いておかなければならない条件があって見積もりまでのメールの往復回数が顧客によってバラバラになってしまって対応が大変であったことが挙げられる。特に最後のメールの件に関しては、顧客のメールアドレスからきたすべてのメールの内容を確認しなければならず、手動で顧客情報をいちいちまとめていては追いつかず、メールの往復回数が増えれば増えるほど返信、情報の管理、条件の確認等手間が増えるという状況であった。

こういった状況を打破するにはポートフォリオサイトからの受注の一本化が必要であった。

## 技術

- Vue.js
- Vuetify
  - デザインテンプレートの流用。
- webpack
- Google font
  - 日本語フォントへの対応。
- Netlify
- TrelloAPI
- GAS(Google Form, SpreadSheet)
- Discordbot

## ポートフォリオサイト本体

冒頭でも書いたようにメール対応がスパゲッティになっており返信漏れなどが頻繁に発生していたため、至急サイトを構築し速やかに新たな受注システムに移行する必要があり、デザインテンプレートを流用し 1,2 日での構築を実現した。

[Vuetify Parallax Starter](https://parallax-theme-free.johnleider.com/?ref=vuetifyjs.com)

### webpack.config.js に書き加えたいけどファイルがない。

Vue.js を`vue create hogehogeapp`で生成すると、`vue.config.js`が`webpack.config.js`を内包している。以下のように書く。

```JavaScript
module.exports = {
  configureWebpack: {
    plugins:[
      ......
    ]
  }
}
```

### 日本語フォントの適用

GoogleFonts を導入するにはまず

```HTML
<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Serif+JP");
#app {
/* Google fontsで導入したいfontsからfont-familyを取ってくる */
  font-family: 'Noto Serif JP', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
```

とし、さらに Vuetify の`Typography`を無効にする。(`class="display-3"`などを消す。)

- [CSS Text and Typography helpers — Vuetify.js](https://vuetifyjs.com/ja/styles/text-and-typography/)

### ヒーロー画面の文字背景の設定

背景の顔と被ってタイトルが見づらいという問題。
p タグで囲ってクラスを付与すると文字を最前面にすることができる。

```HTML
<template>
<p class="haikei">
<span
 style="font-weight:bold;"
 class=""
 >
女の子のイラスト承ります。
</span>
<br>
<span
 class=""
 style="font-weight:bold; font-size:70px;"
 >
絵画工房 空蝉
</span>
</p>
</template>


<style>
.haikei{
  background: rgba(104, 232, 255, 0.3);
}
</style>
```

ここで`span`タグに直接クラスを付与してしまうと最前面に文字背景が来てしまう。さらに、文字背景として半透明な色を使おうとして CSS で`opacity`としてしまうと、文字も含めてボケてしまうので必ず`rgba`を使うこと。

- [css で背景だけを透過する方法(文字列は透過しない) - Qiita](https://qiita.com/ritukiii/items/6568875a3eaaf0c0bde9)

## デプロイ

一番簡単な Netlify。

### 真っ白で表示されない問題

Vue.js では`npm run serve`とすると`/public/index.html`に build されるようになっているが、`npm run build`では`/dist/index.html`に build されるようになっている。ところがなぜかデフォルトで`.gitignore`に`/dist`となっているのでこれを削除。Netlify の build settings で public folder を`dist`とする。そうすると生成される。ちなみに Vuepress は`/src/.vuepress/dist`である。

### favicon が更新されない

`manifest.json`内の`icons`の参照先(`src`)を`dist`内`img/icons/hoge.png`としても変更されず、`index.html`内のタグを直接いじっても変わらず、favicon のみ`public/img/icons`を参照しているので、こちらの画像を変えたところ反映された。

### title タグ内の変更

検索画面で表示される大事な title である。仮の名前のままではなんのサイトかわからないので必ず変更しておく。

```javascript
mounted() {
    document.title = `絵画工房 空蝉`
    document.querySelector('meta[name="description"]').setAttribute('content', '絵画工房 空蝉')
  },
```

とし、`dist/index.html`の title タグも一応変えておく。

### Google Search Console

#### インデックス登録

- プロパティを追加 > URL プレフィックスに URL を入力。
- Google Search Console のページの一番上に登録したいサイトの URL を入力。
- インデックス登録をリクエスト。
  みたいな手順だった気がする。

#### サイトマップ登録

`$ npm install sitemap-webpack-plugin --save-dev`

```javascript
const SitemapPlugin = require("sitemap-webpack-plugin").default;
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: "0.8",
    changefreq: "hourly",
  },
];
module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin("https://utsusemi.netlify.app", paths, {
        filename: "sitemap.xml",
        lastmod: true,
        changefreq: "hourly",
        priority: "0.8",
      }),
    ],
  },
};
```

とし、Google Search Console のサイトマップ> 新しいサイトマップの追加から`sitemap.xml`と入力し、送信しておく。すぐに繁栄はされず、ステータスは失敗のままだが、しばらく待つと「成功しました」となっている。気長に待つ。

## 受注システム

GAS(GoogleAppScript)により GoogleForm から注文を受けて SpreadSheet に行が追加された時に、最終行の情報を Trello ボードにその情報を反映し、Discordbot と別のメールアドレスに受注のアラートが飛ぶようにした。
ただ現在ではこれで完結せず、メールのやり取りが発生している。GoogleForm の改装が急務である。

## 課題

- メールでのやり取りに慣れていないお客さんの対応。

- Scrapbox での情報管理

  - Scrapbox で手動での顧客情報管理。あくまで'Wiki'や議事録としての用途を想定している Web サービスなので、情報管理には使いたくないというのが本音。スマホや iPad での編集がしづらいという点もある。現在では Trello を顧客情報管理の DB として使っている。

- works のページ
  - ポートフォリオサイトと名を打って置きながら、現在は背景のみに作品のイラストを使用している。今後作品が増えていけば works ページを作って一覧できた方が良い。さらに、`v-carousel`の導入も検討している。

## 参考

- [第一話　 Scrapbox ってなあに？](https://scrapbox.io/wakaba-manga/%E7%AC%AC1%E8%A9%B1_Scrapbox%E3%81%A3%E3%81%A6%E3%81%AA%E3%81%82%E3%81%AB%EF%BC%9F)

<div class="twitter">
  <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size='large'>Tweet</a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
