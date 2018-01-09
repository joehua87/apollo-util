# Apollo Util

## ApolloDataWrapper
* Reuse in ItemData & ListData
* Use as render props Component

```js
type ApolloDataWrapperProps = {
  data: {
    error?: any,
    loading: boolean,
  },
  dataField?: string,
  renderLoading?: () => any,
  renderGlobalError?: (error: any) => any,
  renderError?: (error: any) => any,
  renderData?: (result: any) => any,
  children?: (result: any) => any,
}
```

### Props
#### `data`
`data` passed from apollo

#### `dataField`
Root data name, default to result, assume that we have request only 1. For example
```graphql
{
  result: post {
    error
    entity {
      _id
      name
    }
  }
}
```

#### `getAll`
If provided, get `data` return from graphql instead of `data.result`. Useful when query multiple field

#### `renderLoading`: () => Component | string
Custom render loading state

#### `renderGlobalError`: () => Component | string
Custom render global error state, ussually wrong syntax or network errors.

#### renderData?: (result: any) => Component | string
Custom render data

#### children
Use as custom render data

### Example
```js
import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
query ($id: String) {
  result: post(id: $id) {
    error
    entity {
      _id
      name
    }
  }
}
`

// Note that data is passed from Apollo
const PostDetail = ({ data }) => (
  <ApolloData data={data}>
  ({ error, entity }) => (
    <div>{entity.name}</div>
  )
  </ApolloData>
)
export default graphql(query)(PostDetail)
```
## `configureApollo({ uri }: { uri: string })`
A simple function to create you Apollo Client by only provide an url endpoint

## `createItemData(query: any, idField: string = '_id')`
Example Usage:
```js
// @flow

import React from 'react'
import { createItemDataComponent } from 'apollo-util'

const query = gql`
query ($_id: String) {
  result: post(_id: $_id) {
    error
    entity {
      _id
      name
    }
  }
}
`

const ItemData = createItemDataComponent(query)

function Post({ _id }: { _id: string }) {
  return (
    <ItemData variables={{ _id }}>
      {({ entity }) => (
        <div>
          <h1>{entity.name}</h1>
        </div>
        )}
    </ItemData>
  )
}

export default Post
```

## `createListData(query: any, whitelist: string[] = ['page', 'limit', 'total', 'sort'])`
```js
// @flow

import React from 'react'
import { createItemDataComponent } from 'apollo-util'
import detailQuery from 'queries/route/detail.gql'

const ItemData = createItemDataComponent(detailQuery)

function Posts({ page, limit, sort }: any) {
  return (
    <ItemData variables={{ page, limit, sort }}>
      {({ entities }) => (
        <div>
          {entities.map(item => (
            <div key={item._id}>{item.name}</div>
          ))}
        </div>
        )}
    </ItemData>
  )
}

export default Posts
```

## createConnectCreateConfig
Use to get the result data & merge it into Apollo cache
```js
createConnectCreateConfig({
  mutationName,
  listQuery,
  getVariables,
}: {
  mutationName: string,
  listQuery?: any,
  getVariables?: (props) => any,
}
```
* mutationName
Example:
```graphql
mutation ($name: String!) {
  createPost(name: $name) {
    ...
  }
}
```
In this case, mutationName must be createPost

* Apollo cache query by a query & variables that provided to it. `listQuery` & `getVariables` is for that purpose

## `createConnectEditConfig(submitFnName?: string = 'submitEdit')`
It will pass a submitEdit function to your component

## createConnectRemoveConfig
Use to get the result data & remove it into Apollo cache
```js
createConnectRemoveConfig({
  mutationName,
  listQuery,
  getVariables,
}: {
  mutationName: string,
  listQuery?: any,
  getVariables?: (props) => any,
})
```
Usage: same as createConnectCreateConfig

## TODO
* [ ] Tests
