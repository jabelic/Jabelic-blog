(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{469:function(t,a,e){"use strict";e.r(a);var _=e(22),r=Object(_.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"アセンブラいろはのい～"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#アセンブラいろはのい～"}},[t._v("#")]),t._v(" アセンブラいろはのい～")]),t._v(" "),e("p",[t._v("こんにちは。本稿は"),e("a",{attrs:{href:"https://qiita.com/advent-calendar/2020/ncc",target:"_blank",rel:"noopener noreferrer"}},[t._v("NCC Advent Calendar 2020"),e("OutboundLink")],1),t._v("の8日目の記事です。")]),t._v(" "),e("p",[t._v("突然ですが、アセンブラを書いてみよう。コンパイルはCCがやってくれます。")]),t._v(" "),e("h2",{attrs:{id:"環境"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#環境"}},[t._v("#")]),t._v(" 環境")]),t._v(" "),e("ul",[e("li",[t._v("OSX Catalina")]),t._v(" "),e("li",[t._v("CPUアーキテクチャはCISC, x86_64のCPUで動作可能。intex記法で書く。")]),t._v(" "),e("li",[t._v("ubuntuの場合は"),e("code",[t._v("_main -> main")]),t._v("としてください。")])]),t._v(" "),e("h2",{attrs:{id:"コード"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#コード"}},[t._v("#")]),t._v(" コード")]),t._v(" "),e("div",{staticClass:"language-tmp.s extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[t._v(" .intel_syntax noprefix\n .globl _main\n _main:\n         mov rax, 3    # raxレジスタに3を代入する\n         add rax, 4    # raxレジスタに4を足す \n         ret           # 呼び出し元に戻る\n")])])]),e("p",[t._v("一行目に"),e("code",[t._v(".intel_syntax noprefix")]),t._v("を書くことでintel記法であることを定めている。")]),t._v(" "),e("h2",{attrs:{id:"実行"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#実行"}},[t._v("#")]),t._v(" 実行")]),t._v(" "),e("p",[t._v("実行ファイルを"),e("code",[t._v("-o")]),t._v("オプションを用いて"),e("code",[t._v("tmp")]),t._v("と指定する。")]),t._v(" "),e("p",[e("code",[t._v("$ cc -o tmp tmp.s")]),t._v(" "),e("code",[t._v("$ ./tmp")]),t._v(" "),e("code",[t._v("$ echo $?")]),t._v(" "),e("code",[t._v("> 7")])]),t._v(" "),e("p",[t._v("終了コードを呼び出すと、実行結果が格納されているのが確認できます。")])])}),[],!1,null,null,null);a.default=r.exports}}]);