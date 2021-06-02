---
title: pyenv & pipenvで環境構築
date: 2020-11-28
description: NCC AdventCalendar 2020 3日目
sidebar: auto
author: Jabelic
img: ../assets/
num: 11
tags:
  - python
  - 開発環境
  - 技術ブログ
settings:
  category: 技術
---

<!--div v-if="new Date('2020/12/03 07:00').getTime() <= new Date().getTime()"-->

# pyenv & pipenv で環境構築

こんにちは, Jabelic です. 本稿は[NCC Advent Calendar 2020](https://qiita.com/advent-calendar/2020/ncc)3 日目の記事です. いやぁ, 枠が埋まらなくて大変ですね...

今回は自分が使っている python の開発環境のメモを紹介します. 現象数理学科の授業では Anaconda を推奨するアナウンスがされていますが, Anaconda には様々な副作用があることが報告されています.

簡単に Anaconda を卒業するなら system に直接 python3.x を install すれば良いですが, まぁ念のため仮想環境でも使っておこうと言う話.

## 環境

OS: Catalina 10.15.6

CPU: Intel Core i5

メモリ: 16GB

## pyenv とは

python のバージョンをスイッチできるライブラリ.

`$ brew install pyenv`

`$ sudo nano ~/.zshrc`

以下を追加.

```bash
 export PYENV_ROOT="$HOME/.pyenv"
 export PATH="$PYENV_ROOT/bin:$PATH"
 eval "$(pyenv init -)"
```

`$ source ~/.zshrc` 忘れない.

### 使い方

pytenv での python の install 可能バージョン一覧

`$ pyenv install --list`

例えば 3.8.0 を install するなら

`$ pyenv install 3.8.0`

現在のディレクトリのみで 3.8.0 を使う場合

`$ pyenv local 3.8.0`

グローバルで変えるなら

`$ pyenv global 3.8.0`

`$ pyenv versions`

```bash
   system
   3.8.4
 * 3.8.6 (set by /Users/xxxxxxx/stock/tmppy/.python-version)
```

## pipenv とは

パッケージ毎のライブラリの管理をしてくれる仮想環境.

`$ brew install pipenv`

### 使い方

`$ mkdir hogeDev && cd hogeDev`

`$ pipenv install`

`$ pipenv install numpy`

Pipfile と言うファイルに設定が記述される. このファイルを共有することでチームで環境を揃えることができる.

```bash
 [[source]]
 url = "https://pypi.org/simple"
 verify_ssl = true
 name = "pypi"

 [packages]
 numpy = "*"

 [dev-packages]

 [requires]
 python_version = "3.8"
```

Pipfile.lock と言うファイルがここで生成されるが, これは実際に install されたパッケージのバージョンが記述されている.

仮想環境に入る

`$ pipenv shell`

仮想環境内で無理やり **pyenv で指定したバージョンを利用** するには

`$ source ~/.zshrc`

仮想環境を消す

`$ pipenv --rm`

仮想環境内でライブラリを追加, 実行

`hoge > pipenv install jupyterLab`

`hoge > pipenv run jupyter lab`

Pipfile.lock を参照して環境を build するなら

`$ pipenv sync --dev`

## WSL で pipenv

### pyenv を入れる

`$ sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev`

`$ git clone https://github.com/yyuu/pyenv.git ~/.pyenv`

`$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc`

`$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc`

`$ echo 'eval "$(pyenv init -)"' >> ~/.bashrc`

`$ source ~/.bashrc`

`$ pyenv install --list`

### pip 入れる

`$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`

`$ sudo apt install python3-disutils`

`$ python get-pip.py --user`

`$ python -m pip install --upgrade pip`

`$ echo 'export PATH="$HOME/.pyenv/shims:$PATH"' >> ~/.bashrc`

`$ source ~/.bashrc`

### pipenv 入れる

`$ python -m pip install --user pipenv`

`$ echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc`

こんな感じ.

`$ which python`

`>/home/xxxxxx/.pyenv/shims/python`

`$ python -m pipenv install xxxxx`

## 参考

[Python のパッケージ周りのベストプラクティスを理解する](https://www.m3tech.blog/entry/python-packaging)

[WSL に pipenv を導入するまで](https://qiita.com/mashita1023/items/10239f5621ef2fc8acb9)

[Pipfile.lock で固定された依存関係を再現するなら pipenv sync コマンドを使おう](https://dev.classmethod.jp/articles/pipenv-sync-is-useful/)

<!--/div-->
