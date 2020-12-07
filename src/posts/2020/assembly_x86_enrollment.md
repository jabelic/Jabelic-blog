---
titel: アセンブラいろはのい～
date: 2019-12-08
description: NCC Advent Calendar 2020 8日目
sidebar: auto
author: Jabelic
img: ../assets/meiji_adobe_1.jpg
num: 12
settings:
  category: 技術
  tags:
    - x86_64
    - アセンブラ
---

# アセンブラいろはのい～

こんにちは。本稿は[NCC Advent Calendar 2020](https://qiita.com/advent-calendar/2020/ncc)の8日目の記事です。


突然ですが、アセンブラを書いてみよう。コンパイルはCCがやってくれます。

## 環境

- OSX Catalina
- CPUアーキテクチャはCISC, x86_64のCPUで動作可能。intex記法で書く。
- ubuntuの場合は`_main -> main`としてください。

## コード

```
 .intel_syntax noprefix
 .globl _main
 _main:
         mov rax, 3    # RAXレジスタに3を代入する
         add rax, 4    # RAXレジスタに4を足す 
         ret           # 呼び出し元に戻る
```


一行目に`.intel_syntax noprefix`を書くことでintel記法であることを定めています。

`rax`とは汎用レジスタのうちの一つで、RAXのAはaccumulatorからきています。和算差算の結果、乗算の結果の下位64bit、除算の商が格納されます。

## 実行

実行ファイルを`-o`オプションを用いて`tmp`と指定する。

`$ cc -o tmp tmp.s`

`$ ./tmp`

`$ echo $?`

`> 7 `

終了コードを呼び出すと、実行結果が格納されているのが確認できます。


## おわりに

どうですか。完全に理解できましたか？できましたか！よかったです！明日の担当は未定です！お楽しみに！


## 参考

[Assembly Programming on x86-64 Linux (04)](https://www.mztn.org/lxasm64/amd04.html)