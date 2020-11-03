/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listTodos = /* GraphQL */ `
  query ListTodos($count: Int, $nextToken: String) {
    listTodos(count: $count, nextToken: $nextToken) {
      todos {
        id
        title
        owner
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      title
      owner
    }
  }
`;
export const allTodos = /* GraphQL */ `
  query AllTodos {
    allTodos {
      id
      title
      owner
    }
  }
`;
