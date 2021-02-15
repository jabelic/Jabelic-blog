---
titel: NCC 2days speed hackathon 2020 summer
date: 2020-09-20
description: 温泉合宿代替案件、NCC初のオンラインハッカソン開催。
sidebar: auto
author: Jabelic
img: ../assets/NCChackathon20summer.png
num: 7
settings:
  category: 技術
  tags:
    - hackathon
    - 技術ブログ
---



# NCC 2days speed hackathon 2020 summer


9/18,19に所属するNCC内でオンラインでハッカソンを開催した。今回は企画係である自分が運営を務めた。得た教訓とかその辺を記録として残しておく。

## NCCとは

明治大学中野キャンパスで主に活動する公認サークル。知見共有や勉強会、作業会などをする。名称は Nakano Computer Club の略。

[Nakano Computer Club](https://meiji-ncc.tech/)


## オンラインハッカソン企画のTips
- コンセプト、ルール策定

  コンセプトは中止になってしまった夏の温泉開発合宿の代替。夏の思い出として記録に残りそうなものをやるという趣旨でした。

- アンケートフォーム

  参加者募集、各参加者の技術領域、コミット時間を調べるためにアンケートをとった。割と直前での募集になってしまったのでDMで宣伝しまくったらそれなりに集まった。

- チーム分け、メンターさん募集

  メンターさんはかなり早く見つかった。自ら声を上げてくださった先輩もいて、本当に助かりました。チーム分けは技術領域、コミット時間を考慮して分けた。フルコミット出来なくても参加できるところがオンラインハッカソンの良いところ。「フルコミット出来なくても参加できるよ」ということを参加者募集の時点でアナウンスしていたことが結果的によかった（そういう参加者が多数いた）。

## 当日のスケジュール
### １日目(9/18)
11:00 ~ 12:00　開会式、LT大会

12:00 ~ 12:30　チームビルディング

12:30 ~ 14:00　休憩（ランチ、ディナーは適時摂ってね！）

14:00 ~ 18:00　作業


残りは自由時間

### ２日目(9/19)

11:00 ~ 17:00　作業

18:00 ~ 19:00　閉会式

この時間以上にコミットを求めない、というグループもあったので、作業時間を決めといてよかった。


## プロダクトについて
### アイデア

現在多くの大学ではCOVID-19の影響でオンライン講義を行なっている。大学の講義はオンラインであろうがオフラインであろうが100分(ないしは90分)の授業時間の元で授業を行なっている。例えば講義動画60分+演習問題40分や講義動画100分一本勝負などである。しかし、例えば講義動画100分間流しっぱなしでは、途中で動画を止めてノートを取るなどしなければならない。普段の授業では複数黒板がある教室では過去情報をしばらく参照できるので授業のスピードに追いついていけるが、オンライン講義では過去の情報が画面に表示されない。これが足かせにもなっていて集中力が途切れる。
今回のハッカソンは2daysなので簡単に仕上がるプロダクトで、チーム内の技術領域を考慮したものでなければならない。自分の他2人はprocessing, unity, Houdiniが弄れるということだったのでprocessingで頑張ってもらうこととした。自分はPython, JavaScript等でサポートすることになった。
プロダクトの具体的なコア機能としては、授業時間のタイマーとすることにした。webアプリケーションにprocessingを組み込むにはアニメーションを表示するものが良いと考え、アイデアソン当初はprocessing.jsを採用することにしていた。モチベーションとしてツイートでシェアをしてもらえるように、Widget buttonをつけた。

### 要件

タイマー画面
- p5.js

home画面, 講義終了画面


### 技術
- p5.js
    - タイマー部分の描画
- Bootstrap4
- Flask
    - Webフレームワーク
- gunicorn
    - WSGIサーバー
- heroku

参考：[Flask を触ってみる + Heroku で動かす](https://qiita.com/sqrtxx/items/2ae41d5685e07c16eda5)

### ディレクトリ構成

```bash
 .
 ├── Procfile
 ├── README.md
 ├── app.py
 ├── requirements.txt
 ├── runtime.txt
 ├── static
 │   ├── main.css
 │   ├── main.js
 │   ├── processing.js
 │   ├── processing.min.js
 │   └── sample.pde
 └── templates
     ├── 100.html
     ├── 90.html
     ├── index.html
     └── share.html
```


### デプロイ
heroku CLIを使っている。

```bash
$ git init
$ heroku login
$ heroku create
$ git add .
$ git commit -m "add all"
$ git remote
    master
    heroku
$ git push heroku master
$ git open
```

## プロダクト：今後の課題
nuxt.jsへの移行
- SPA, PWA化

vuetifyの導入

[講義Timer for online class](https://fast-woodland-70792.herokuapp.com/)

[Github](https://github.com/jabelic/processing-flask)


## 企画：今後の課題

参加者全員のKTPより

### Keep
- オンライン開催良い。
- 初めて触る言語、技術に挑戦する機会:+1:
### Problem
- 運営の動き出しが遅かった
- 環境構築に時間が取られた（Windows10ユーザー）
    - Linux環境に移行しましょう...
- Githubもっと使えるといいね。
### Try
- 夏休みイベントは夏休み前告知
- 環境構築は先に終わらせておこう
- 温泉、足湯いきたい


## 終わりに
企画も参加も初めてのオンラインハッカソン、大きな問題は起きずに終えることができた。

温泉行きたいね...



