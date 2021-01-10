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
                - default ブランチ
                - ここにマージされたらデプロイ
            - feature
                - ここで開発して main にマージ
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
