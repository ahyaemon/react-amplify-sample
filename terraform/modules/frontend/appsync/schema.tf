variable "user_pool_id" {}

resource "aws_appsync_graphql_api" "todos_api" {
  authentication_type = "AMAZON_COGNITO_USER_POOLS"
  name                = "todos_api"
  schema              = <<EOF
schema {
    query: Query
    mutation: Mutation
}
type Mutation {
    createTodo(title: String!, owner: String!): Todo
    updateTodo(id: ID!, title: String!): Todo
    deleteTodo(id: ID!): Todo
}
type Query {
    listTodos(count: Int, nextToken: String): PaginatedTodos
    getTodo(id: ID!): Todo
    allTodos: [Todo]
}
type Todo {
    id: ID!
    title: String!
    owner: String!
}
type PaginatedTodos {
    todos: [Todo]
    nextToken: String
}
EOF

  user_pool_config {
    aws_region     = "ap-northeast-1"
    default_action = "ALLOW"
    user_pool_id   = var.user_pool_id
  }
}

output "api_id" {
  value = aws_appsync_graphql_api.todos_api.id
}
