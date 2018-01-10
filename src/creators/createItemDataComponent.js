// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import ApolloDataWrapper from 'components/ApolloDataWrapper'

function createItemDataComponent({
  query,
  idField = '_id',
  client,
}: {
  query: any,
  idField: string,
  client?: any,
}) {
  const connectQuery = graphql(query, {
    options: (props) => {
      const id = props.variables && props.variables[idField]
      return {
        variables: {
          [idField]: id,
        },
        client,
      }
    },
  })
  function DataComponent(props: { data: any }) {
    return (
      <ApolloDataWrapper {...props} />
    )
  }
  return connectQuery(DataComponent)
}

export default createItemDataComponent
