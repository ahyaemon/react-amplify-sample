const configure = {
    "aws_project_region": "ap-northeast-1",

    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,

    "oauth": {
        "domain": "ahyaemon-amplify-sample.auth.ap-northeast-1.amazoncognito.com",
        "scope": [
            // "phone",
            "email",
            "openid",
            "profile",
            // "aws.cognito.signin.user.admin"
        ],
        "redirectSignIn": "http://localhost:3000/",
        "redirectSignOut": "http://localhost:3000/",
        "responseType": "code"
    },
};

export default configure;
