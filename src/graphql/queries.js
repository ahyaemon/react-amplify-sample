/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        priority
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCat = /* GraphQL */ `
  query GetCat($id: ID!) {
    getCat(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listCats = /* GraphQL */ `
  query ListCats(
    $filter: ModelCatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
