resource "aws_cognito_user_pool" "user_pool" {
  name = "user_pool"

  auto_verified_attributes = ["email"]
  password_policy {
    minimum_length = 8
    require_lowercase = false
    require_numbers = false
    require_symbols = false
    require_uppercase = false
    temporary_password_validity_days = 7
  }

  alias_attributes = ["email"]

  schema {
    attribute_data_type = "String"
    developer_only_attribute = false
    mutable = false
    name = "email"
    required = true

    string_attribute_constraints {
      max_length = "2048"
      min_length = "0"
    }
  }
}

resource "aws_cognito_user_pool_client" "user_pool_client" {
  name = "frontend_application"
  user_pool_id = aws_cognito_user_pool.user_pool.id

  allowed_oauth_flows = ["code"]
  allowed_oauth_flows_user_pool_client = true
  allowed_oauth_scopes = ["email", "openid", "aws.cognito.signin.user.admin"]
  callback_urls = ["http://localhost:3000/"]
  logout_urls = ["http://localhost:3000/"]

  prevent_user_existence_errors = "LEGACY"
  refresh_token_validity = 30
  supported_identity_providers = ["COGNITO"]

  explicit_auth_flows = ["ALLOW_CUSTOM_AUTH", "ALLOW_REFRESH_TOKEN_AUTH", "ALLOW_USER_SRP_AUTH"]
  generate_secret = false
}

resource "aws_cognito_user_pool_domain" "domain" {
  domain = "ahyaemon-amplify-sample"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
