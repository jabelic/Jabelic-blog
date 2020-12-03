---
titel: pyenv & pipenvで環境構築
date: 2019-11-28
description: NCC AdventCalendar 2020
sidebar: auto
author: Jabelic
img: ../assets/
num: 11
settings:
  category: 技術
  tags:
    - python
    - 開発環境
    - 技術ブログ
---

<div v-if="new Date('2020/12/03 07:00').getTime() > new Date().getTime()">
2020/12/03 07:00に公開されます。
</div>
<!--div v-if="new Date('2020/12/03 07:00').getTime() <= new Date().getTime()"-->

# pyenv & pipenvで環境構築

こんにちは, Jabelicです. 本稿は[NCC Advent Calendar 2020](https://qiita.com/advent-calendar/2020/ncc)3日目の記事です. いやぁ, 枠が埋まらなくて大変ですね...

今回は自分が使っているpythonの開発環境のメモを紹介します. 現象数理学科の授業ではAnacondaを推奨するアナウンスがされていますが, Anacondaには様々な副作用があることが報告されています.

簡単にAnacondaを卒業するならsystemに直接python3.xをinstallすれば良いですが, まぁ念のため仮想環境でも使っておこうと言う話.

## 環境

OS: Catalina 10.15.6

CPU: Intel Core i5

メモリ: 16GB


## pyenvとは
pythonのバージョンをスイッチできるライブラリ.

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
pytenvでのpythonのinstall可能バージョン一覧

`$ pyenv install --list`

例えば3.8.0をinstallするなら

`$ pyenv install 3.8.0`

現在のディレクトリのみで3.8.0を使う場合

`$ pyenv local 3.8.0`

グローバルで変えるなら

`$ pyenv global 3.8.0`


`$ pyenv versions`

```bash
   system
   3.8.4
 * 3.8.6 (set by /Users/xxxxxxx/stock/tmppy/.python-version)
```


## pipenvとは

パッケージ毎のライブラリの管理をしてくれる仮想環境.

`$ brew install pipenv`

### 使い方

`$ mkdir hogeDev && cd hogeDev`

`$ pipenv install`

`$ pipenv install numpy`

Pipfileと言うファイルに設定が記述される. このファイルを共有することでチームで環境を揃えることができる.

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

Pipfile.lockと言うファイルがここで生成されるが, これは実際にinstallされたパッケージのバージョンが記述されている.



仮想環境に入る

`$ pipenv shell`

仮想環境内で無理やり __pyenvで指定したバージョンを利用__ するには

`$ source ~/.zshrc`

仮想環境を消す

`$ pipenv --rm`

仮想環境内でライブラリを追加, 実行

`hoge > pipenv install jupyterLab`

`hoge > pipenv run jupyter lab`

Pipfile.lockを参照して環境をbuildするなら

`$ pipenv sync --dev`


## WSLでpipenv


### pyenvを入れる
`$ sudo apt install -y make build-essential libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev`

`$ git clone https://github.com/yyuu/pyenv.git ~/.pyenv`

`$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc`

`$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc`

`$ echo 'eval "$(pyenv init -)"' >> ~/.bashrc`

`$ source ~/.bashrc`

`$ pyenv install --list`

### pip入れる

`$ curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`

`$ sudo apt install python3-disutils`

`$ python get-pip.py --user`

`$ python -m pip install --upgrade pip`


`$ echo 'export PATH="$HOME/.pyenv/shims:$PATH"' >> ~/.bashrc`

`$ source ~/.bashrc`

### pipenv入れる

`$ python -m pip install --user pipenv`

`$ echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc`

こんな感じ. 

`$ which python`

`>/home/xxxxxx/.pyenv/shims/python`

`$ python -m pipenv install xxxxx`



## 参考

[Pythonのパッケージ周りのベストプラクティスを理解する](https://www.m3tech.blog/entry/python-packaging)

[WSLにpipenvを導入するまで](https://qiita.com/mashita1023/items/10239f5621ef2fc8acb9)

[Pipfile.lockで固定された依存関係を再現するならpipenv syncコマンドを使おう](https://dev.classmethod.jp/articles/pipenv-sync-is-useful/)



<!--/div-->