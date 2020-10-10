const configure = {
    "aws_project_region": "ap-northeast-1",

    "aws_cognito_region": "ap-northeast-1",
    "aws_user_pools_id": process.env.REACT_APP_USER_POOL_ID,
    "aws_user_pools_web_client_id": process.env.REACT_APP_USER_POOLS_WEB_CLIENT_ID,
};


export default configure;
