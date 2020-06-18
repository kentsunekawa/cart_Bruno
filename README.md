# cart_Bruno
DEMO : [cart_Bruno](https://about.kentsunekawa.com/works/carts/bruno/?cartData=nhs005,,ten-green-01,ten-konbutya-01,nhs18007aa-main2)
## Introduction
cart_Bruno は楽天市場の商品を扱うためののUIコンポーネント。  
ランディングページなどにiframeで埋め込むことを想定している。
商品の情報をjsonファイルとして特定の場所に格納し、ファイル名をパラメータで渡すことで、どの商品を表示するかを指定できる。  
楽天GOLDサーバー配下に格納する前提で作られている。
## Directory
主なディレクトリとファイル  

    /
    └ cart/
        └ bruno/
            index.html    [カートのHTML（ここのURLをiframeで読み込む）]
            package-lock.json
            package.json
            webpack.config.js
            └ css/
            └ img/
            └ js
                └ cart_bruno.js    [コンパイル後のJS]
                └ src/
                    bruno/
                        └ cart_bruno.js    [コンパイル前のJS]
        └ js/
            └ execCart.js    [カートを実行するためのJS]
    └ info/
        └ cartData/
            └ bruno/
                └ itemCode.json    [商品の情報を記述したjsonファイル]

## Tecnology
- JavaScript
    - jQuery
    - ES6(2015)
    - JSON
- CSS
    - scss
- Others
    - webpack
    - babel
    
## Usage
#### カートの設定ファイルを作成する
カート情報を記載した json ファイルを作成し下記ディレクトリに格納する。  

    /
    └ info/
        └ cartData/
            └ bruno/
                └ itemCode.json  [カートの設定データ]
[sample](info/cartData/bruno/nhs005.json)

#### カートを表示させたいページの該当箇所に iframe で埋め込む
```html
<iframe src="https://www.rakuten.ne.jp/gold/shopName/cart/bruno/?cartData=itemCode"></iframe>
```
-  扱うカートデータの指定はパラメータ cartData の値にカートデータの拡張子を除いた文字で指定する
- 複数のカートデータを渡す場合はカンマで区切る
```
https://www.rakuten.ne.jp/gold/shopName/cart/bruno/?cartData=itemCode,itemCode2,itemCode3
```
