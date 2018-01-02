// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import pick from 'lodash.pick'
import ApolloDataWrapper from 'components/ApolloDataWrapper'

function createListDataComponent(query: any, whitelist: string[] = ['page', 'limit', 'total', 'sort']) {
  const connectQuery = graphql(query, {
    options: (props) => {
      const variables = pick(props.variables || {}, whitelist)
      return {
        variables,
      }
    },
  })
  function ListDataComponent(props: { data: any }) {
    return (
      <ApolloDataWrapper {...props} />
    )
  }
  return connectQuery(ListDataComponent)
}

export default createListDataComponent
