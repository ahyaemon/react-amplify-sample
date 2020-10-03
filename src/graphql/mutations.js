/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      priority
      createdAt
      updatedAt
    }
  }
`;
export const createCat = /* GraphQL */ `
  mutation CreateCat(
    $input: CreateCatInput!
    $condition: ModelCatConditionInput
  ) {
    createCat(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateCat = /* GraphQL */ `
  mutation UpdateCat(
    $input: UpdateCatInput!
    $condition: ModelCatConditionInput
  ) {
    updateCat(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteCat = /* GraphQL */ `
  mutation DeleteCat(
    $input: DeleteCatInput!
    $condition: ModelCatConditionInput
  ) {
    deleteCat(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
