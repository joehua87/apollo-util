// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import pick from 'lodash.pick'
import ApolloDataWrapper from 'components/ApolloDataWrapper'

function createListDataComponent({
  query,
  whitelist = [],
  client,
}: {
  query: any,
  whitelist?: string[],
  client?: any,
}) {
  const connectQuery = graphql(query, {
    options: (props) => {
      const variables = pick(props.variables || {}, [
        'page',
        'limit',
        'total',
        'sort',
        ...whitelist,
      ])
      return {
        variables,
        client,
      }
    },
  })
  function ListDataComponent(props: { data: any }) {
    return <ApolloDataWrapper {...props} />
  }
  return connectQuery(ListDataComponent)
}

export default createListDataComponent
