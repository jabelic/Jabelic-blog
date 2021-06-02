---
titel: New MacBookPro 環境構築云々
date: 2020-10-20
description: 新しく導入したMacBook Proの環境構築
sidebar: auto
author: Jabelic
img: ../assets/mac.jpg
num: 9
tags:
  - macbookpro
  - 技術ブログ
settings:
  category: 技術
---

# 環境設定

新しい MacBookPro を買ったので一から環境設定をした. 多分これから何回も同じように環境設定をすることがあるやもしれんので, まとめておく.

## 環境

MacBook Pro (13-inch, 2020, Two Thunderbolt 3 ports)
プロセッサ　 1.4 GHz クアッドコア Intel Core i5
メモリ　 16 GB 2133 MHz LPDDR3

## デフォルト設定の変更

- Dock を好みの設定に変更
  - サイズ, 拡大サイズ, 「Dock を自動的に表示/非表示」チェック
- Safari から Chrome を install
- スクリーンセーバ OFF
- 充電, 百分率表示

## install application

- [Shift-it](https://github.com/fikovnik/ShiftIt/releases)
  - スクリーン分割のショートカットキーの割当を行ってくれる.
- [Karabiner-Eleme¡nt](https://github.com/pqrs-org/Karabiner-Elements)
  - command-key に英数切り替えの割り当てをしてくれる.
  - [Karabiner-Elements の本家が「英数/かな」の切り替えに対応したみたい](https://qiita.com/emonuh/items/ba5f12ef459f3a34f83e)を参照のこと.
- Google Chrome
- VSCode
- DeepL
- Gyazo
- Xcode
- Docker for mac

## install packages

- X-code commandline tool
  - [Mavericks で Command Line Tools for Xcode をインストールする](https://qiita.com/3yatsu/items/47470091277d46f3fde2)
- Homebrew

  - [MacOS で Command line tools for Xcode と Homebrew のインストール](https://qiita.com/royroy/items/338362362de73a94fc0c)

- pyenv & pipenv
- Julia

## その他

- git login

  - [github command](https://github.com/jabelic/TIL/blob/master/github/command.md)

  ```bash
  git config --global user.name "Your Name"

  git config --global user.email your.email@example.com

  git config --global push.default matching

  git config --global alias.co checkout
  ```

## 参考

[【全部入り】Web エンジニアの Mac 初期設定](https://qiita.com/kyohei_ai/items/80164665e7e83ec7a669)

<a href="https://twitter.com/share?ref_src=twsrc%5Etfw" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
