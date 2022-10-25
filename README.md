[![CodeQL](https://github.com/htnabe/SUEP/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/htnabe/SUEP/actions/workflows/codeql-analysis.yml)
<img src="https://img.shields.io/badge/Javascript-276DC3.svg?logo=javascript&style=flat">
<img src="https://img.shields.io/badge/-React Native-555.svg?logo=react&style=flat">
<img src="https://img.shields.io/badge/-Expo-333.svg?logo=expo&style=flat">

## SUEP：島根大学生に関わるイベント情報などを表示するAndroidアプリ

公式サイトは[こちら](https://suep.netlify.app/)

### 主な機能
1. 学内外の様々なコミュニティが予定しているイベントの情報をTwitterから自動で取得・表示します。
2. 島大の講義情報を自動取得・表示します。
3. ユーザー毎に自由な時間割表を作成でき、各講義のスケジュール管理もできます。

### 仕様
- インストール要件：推奨バージョン Android 5.0 (Lollipop) 以上

### 開発環境・使用ライブラリ
- 開発言語/フレームワーク JavaScript/React Native & Expo
- 開発環境 PowerShell
- 使用ライブラリは[こちら](https://github.com/htnabe/SUEP/blob/main/screens/otherScreens/assets/license.json)

### ライセンス
© 2022 Hiroshi TANABE<br>
特定のライセンスには基づきませんが、以下の事項に従って下さい。
- 意図的/偶発的に関わらず、APIキーを悪用しサーバーへ負荷をかける行為
- 商用利用を禁止
- ソースコードまたはビルドデータの二次配布を禁止

### コントリビュート
このレポジトリでは、下記3つのブランチで管理しています。
- `main`: 本番環境
- `feature/xxxx-yyyy`: 機能開発、バグの修正 etc.
