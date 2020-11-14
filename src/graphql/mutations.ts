/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo($title: String!, $owner: String!) {
    createTodo(title: $title, owner: $owner) {
      id
      title
      owner
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo($id: ID!, $title: String!) {
    updateTodo(id: $id, title: $title) {
      id
      title
      owner
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      title
      owner
    }
  }
`;
