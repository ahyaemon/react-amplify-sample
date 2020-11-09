module "frontend" {
  source = "../../../modules/frontend/"
  graphql_endpoint = module.frontend_appsync.graphql_endpoint
  callback_url = "https://${module.frontend.cloudfront_domain_name}"
}

module "frontend_appsync" {
  source = "../../../modules/frontend/appsync/"

  user_pool_id = module.frontend.user_pool_id
}

module "frontend_appsync_resolvers" {
  source = "../../../modules/frontend/appsync/resolvers"

  api_id = module.frontend_appsync.api_id
  datasource_name = module.frontend_appsync.datasource_name
}
