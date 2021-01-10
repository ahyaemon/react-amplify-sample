/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoMutationVariables = {
  title: string,
  owner: string,
};

export type CreateTodoMutation = {
  createTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    owner: string,
  } | null,
};

export type UpdateTodoMutationVariables = {
  id: string,
  title: string,
};

export type UpdateTodoMutation = {
  updateTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    owner: string,
  } | null,
};

export type DeleteTodoMutationVariables = {
  id: string,
};

export type DeleteTodoMutation = {
  deleteTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    owner: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  id: string,
  age?: number | null,
  comment?: string | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    age: number | null,
    comment: string | null,
    followingUserIds: Array< string | null > | null,
    followedUserIds: Array< string | null > | null,
  } | null,
};

export type ListTodosQueryVariables = {
  count?: number | null,
  nextToken?: string | null,
};

export type ListTodosQuery = {
  listTodos:  {
    __typename: "PaginatedTodos",
    todos:  Array< {
      __typename: "Todo",
      id: string,
      title: string,
      owner: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTodoQueryVariables = {
  id: string,
};

export type GetTodoQuery = {
  getTodo:  {
    __typename: "Todo",
    id: string,
    title: string,
    owner: string,
  } | null,
};

export type AllTodosQuery = {
  allTodos:  Array< {
    __typename: "Todo",
    id: string,
    title: string,
    owner: string,
  } | null > | null,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    age: number | null,
    comment: string | null,
    followingUserIds: Array< string | null > | null,
    followedUserIds: Array< string | null > | null,
  } | null,
};
