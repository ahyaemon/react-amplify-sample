resource "aws_ssm_parameter" "user_pool_id" {
  name  = "/cognito/USER_POOL_ID"
  type  = "SecureString"
  value = aws_cognito_user_pool.user_pool.id
}

resource "aws_ssm_parameter" "user_pools_web_client_id" {
  name  = "/cognito/USER_POOLS_WEB_CLIENT_ID"
  type  = "SecureString"
  value = aws_cognito_user_pool_client.user_pool_client.id
}
