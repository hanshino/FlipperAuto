# FlipperAuto

彈射世界的自動腳本，基於[自動精靈](http://zdjl.org/)程式，而實作出來的腳本。

所有更新紀錄將會記錄在[歷史紀錄](CHANGELOG.md)中。

此腳本部分源自於 [蕩然無存](https://home.gamer.com.tw/homeindex.php?owner=visual800307)
大大的創作，以下將會以 **蕩然大** 的名稱作為稱呼。

## 腳本

目前包含了以下腳本
| 腳本名稱         | 說明                                                                          |
| :--------------- | :---------------------------------------------------------------------------- |
| 自動轉蛋         | 活動中的轉蛋獎勵，會自動重置庫存，將獎勵全部轉出。                            |
| 返回房間自動點版 | 魔改於蕩然大的返回房間腳本，在開場時會進行點版，並且可以判定過久退出房間。    |
| 蹭體自動點版     | 魔改於蕩然大的蹭體腳本，功能與返回房間類似                                    |
| 鈴鐺自選+素材V5  | 由[AllenChen](https://home.gamer.com.tw/home.php?owner=GH5654412)大開發的腳本 |

## 使用方式
可參考 蕩然大的文章
https://home.gamer.com.tw/creationDetail.php?sn=5169536

## 下載

所有腳本皆可在[release](https://github.com/hanshino/FlipperAuto/releases)中下載。

## 開發工具
此份專案還包含了打包工具，方便提供既有腳本進入此專案進行版本控管。

1. 首先將此專案`clone`至電腦中，並且安裝套件
```bash
$ git clone https://github.com/hanshino/FlipperAuto.git
$ cd FlipperAuto
$ yarn install
```

2. 將`.zjs`複製到專案目錄下的`腳本`資料夾中
3. 執行指令將腳本解析成`.json`檔案，將檔案納入版本控管中

```bash
$ yarn export
```
4. 解析後的`.json`檔案將會分別儲存在`變數宣告`、`介面宣告`、`腳本內容`三個資料夾中。

## 使用問題
如果有任何疑問，或是建議，歡迎至本專案的 [issues](https://github.com/hanshino/FlipperAuto/issues) 反饋。

## 協作
歡迎以任何形式加入協作，可以透過以下方式幫忙

- fork本專案，利用[開發工具](#開發工具)將你開發完的腳本納入版本控管中，並且發起一個 pull request。
- 加入我的 Discord 罕罕#9527 ，將腳本直接傳送給我