resource "aws_dynamodb_table" "todos_table" {
  name           = "Todos"
  hash_key       = "id"
  billing_mode = "PAY_PER_REQUEST"

  attribute {
    name = "id"
    type = "S"
  }
}

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
    user_pool_id   = aws_cognito_user_pool.user_pool.id
  }
}

resource "aws_iam_role" "appsync_arn" {
  name = "appsync_arn"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "appsync.amazonaws.com"
      },
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "appsync_policy" {
  name = "appsync_polidy"
  role = aws_iam_role.appsync_arn.id

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "dynamodb:*"
      ],
      "Effect": "Allow",
      "Resource": [
        "${aws_dynamodb_table.todos_table.arn}"
      ]
    }
  ]
}
EOF
}

resource "aws_appsync_datasource" "todo_datasource" {
  api_id           = aws_appsync_graphql_api.todos_api.id
  name             = "todo_datasource"
  service_role_arn = aws_iam_role.appsync_arn.arn
  type             = "AMAZON_DYNAMODB"

  dynamodb_config {
    table_name = aws_dynamodb_table.todos_table.name
  }
}

resource "aws_appsync_resolver" "createTodo" {
  api_id           = aws_appsync_graphql_api.todos_api.id
  field            = "createTodo"
  type             = "Mutation"
  data_source      = aws_appsync_datasource.todo_datasource.name
  request_template = <<EOF
{
    "version" : "2017-02-28",
    "operation" : "PutItem",
    "key" : {
        "id": $util.dynamodb.toDynamoDBJson($util.autoId()),
    },
    "attributeValues" : $util.dynamodb.toMapValuesJson($ctx.args)
}
EOF
  response_template = <<EOF
$util.toJson($ctx.result)
EOF
}

resource "aws_appsync_resolver" "getTodo" {
  api_id           = aws_appsync_graphql_api.todos_api.id
  field            = "getTodo"
  type             = "Query"
  data_source      = aws_appsync_datasource.todo_datasource.name
  request_template = <<EOF
{
    "version": "2017-02-28",
    "operation": "GetItem",
    "key": {
        "id": $util.dynamodb.toDynamoDBJson($ctx.args.id),
    }
}
EOF
  response_template = <<EOF
$util.toJson($ctx.result)
EOF
}

resource "aws_appsync_resolver" "listTodos" {
  api_id           = aws_appsync_graphql_api.todos_api.id
  field            = "listTodos"
  type             = "Query"
  data_source      = aws_appsync_datasource.todo_datasource.name
  request_template = <<EOF
{
    "version" : "2017-02-28",
    "operation" : "Scan"
    #if( $ctx.args.count )
        ,"limit": $ctx.args.count
    #end
    #if( $ctx.args.nextToken )
        ,"nextToken": "$ctx.args.nextToken"
    #end
}
EOF
  response_template = <<EOF
{
    #set($myResults = [])
    #foreach($item in $ctx.result.items)
        #if($item.owner == $ctx.identity.username)
            #set($added = $myResults.add($item))
        #end
    #end

    "todos": $utils.toJson($myResults)
    #if( $ctx.result.nextToken )
        ,"nextToken": "$ctx.result.nextToken"
    #end
}
EOF
}

resource "aws_appsync_resolver" "allTodos" {
  api_id           = aws_appsync_graphql_api.todos_api.id
  field            = "allTodos"
  type             = "Query"
  data_source      = aws_appsync_datasource.todo_datasource.name
  request_template = <<EOF
{
    "version" : "2017-02-28",
    "operation" : "Scan"
}
EOF
  response_template = <<EOF
{
    $util.toJson($ctx.result.items)
}
EOF
}
