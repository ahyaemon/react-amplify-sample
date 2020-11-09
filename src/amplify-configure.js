export const configure = {
    "aws_project_region": "ap-northeast-1",
    "aws_appsync_graphqlEndpoint": process.env.REACT_APP_GRAPHQL_ENDPOINT,
    "aws_appsync_region": "ap-northeast-1",
    "aws_appsync_authenticationType": process.env.REACT_APP_AUTHENTICATION_TYPE,
    "aws_cognito_region": "ap-northeast-1",
    "oauth": {
        "domain": process.env.REACT_APP_OAUTH_DOMAIN,
        "scope": [
            "email",
            "openid",
            "profile"
        ],
        "redirectSignIn": process.env.REACT_APP_OAUTH_REDIRECT_SIGN_IN,
        "redirectSignOut": process.env.REACT_APP_OAUTH_REDIRECT_SIGN_OUT,
        "responseType": "code"
    },
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
}
