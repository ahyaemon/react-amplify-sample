# react amplify sample

- amplify を使ってみたサンプル
- 認証付きの TODO リストを作る
- サーバーレスでやってみる
- 最初は amplify の cli を使って aws resource を作ってたけど、使いづらい（よくわからないことが多い）から terraform に移行 

## architecture
### frontend
- aws resources
    - route53
    - cloudfront
    - s3
    - cognito

- application
    - github
        - branch
            - main
                - ここにマージされたらデプロイ
            - develop
                - default ブランチ
            - feature
                - ここで開発して develop にマージ
    - tech
        - react
        - react-router
        - amplify
            - cognito との連携
            - appsync 叩く

### backend
- aws resources
    - appsync
    - dynamodb

## todo
- repository 作成
    - github に repository を作成
    - todo を ISSUES に移す
    - ブランチ作成
        - main
        - develop
            - デフォルトブランチに指定

- react アプリをデプロイ
    - 認証は無し
    - ドメインは無し
    - terraform
        - cloudfront
        - s3
    - application
        - 画面に hello, world を出すだけ
        - CD

- username/password 認証を追加
    - terraform
        - cognito
    - application
        - ページを追加
            - top ページ
                - 未サインイン時は、Sign In ボタンを出す
                - サインイン時は、Sign Out ボタンを出す
                - サインイン時は、名前を出す
            - sign up ページ
            - sign in ページ

- google 認証を追加
    - terraform
        - cognito
    - application
        - sign in ページに、Google Sign In ボタンを出す

- TODO 機能を追加する
    - terraform
        - dynamodb
        - appsync
    - application
        - todo ページを追加
            - 新たな todo を追加できる
            - backend から todo を取ってきて一覧表示する
