---
titel: first commit
date: 2020-07-15
description: このブログについて.
sidebar: auto
author: Jabelic
img: ../assets/profile.png
num: 1
tags:
  - Vuejs
  - VuePress
  - 自己紹介
  - 技術ブログ
meta:
  - name: first article
    content: 自己紹介とか.
settings:
  category: 雑記
---

# Vue.js + VuePress + Netlify でブログを作った話

### 僕

Jabelic です. 2020 年現在, 明治大学総合数理学部現象数理学科 3 年です.

## :information_desk_person:このブログについて

特に何も決めていませんが, 技術系の記事が多くなると思います.
Qiita や note でも良いと思いましたし今までも少しだけ投稿していたことがありますが, もっと気軽に書ける場所が欲しかったのでブログを開設するに至りました.
もちろん, Vue.js で何か作ってみたかったというのもあります.

メモ感覚でどんどん書いていきたいお気持ち:muscle::muscle:

### 使用技術

#### フレームワーク

- Vue.js

- Vuepress 1.x
  - markdown で書いて, それをレンダリングしてほしかったので.　更新頻度が落ちないようにするせめてもの工夫.

##### プラグイン

- [`@vuepress/plugin-google-analytics`](https://vuepress.vuejs.org/plugin/official/plugin-google-analytics.html)
- [`vuepress-plugin-seo`](https://www.npmjs.com/package/vuepress-plugin-seo)
- [`vuepress-plugin-sitemap`](https://github.com/ekoeryanto/vuepress-plugin-sitemap)
  - うまく導入できてるかな？

#### デプロイ

- Netlify
  - 無料枠が大きい.

### 画面構成

- HOME 画面
  - 記事を表示するカードは[Vuepress でブログカードが作りたい | 民主主義に乾杯](https://python.ms/web-card/)を参考にしました.
- Budge
  - MacBook にシールをペタペタ貼る感覚でつけちゃいました. [shields.io](https://shields.io/)

## :information_desk_person:Trouble shooting

- katex
  - `align`環境をサポートしていなかった. `aligned`はサポートされているのでこれを使う.
    - [#issues 1007](https://github.com/KaTeX/KaTeX/issues/1007)

## :information_desk_person:TODO

- PWA 化
  - した！ついでに UpdatePopup も追加した。
    - 追加できてなくね？ありゃ？
    - できた.
- Google Search Console がうんたらかんたら. ようわからん.
  - した！[Google Search Console を Hugo ブログ+Netlify の環境に設定する方法](https://cloudlance-motio.work/post/netlify-google-search-console/)の通りに行なった. "Jabelic blog"で最上位に出てきた. やったぜ.
  - build コマンドを実行しないと PWA のホップアップが出てこないこともわかった(PC だと+ボタン).
- KaTeX を使えるようにする. プラグインがあったはず.
  - できた. `align`をサポートしてなくて, `aligned`を使わなければならない.
- テーマカラーを変えたいかな. Vuetify の導入にはあまり前向きでない.
- Footer をつける
- Tag を表示
- Tag 別一覧表示
- last-updated を導入

---

<div class="twitter">
  <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false" data-size='large'>Tweet</a>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>
