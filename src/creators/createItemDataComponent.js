// @flow

import React from 'react'
import { graphql } from 'react-apollo'
import ApolloDataWrapper from 'components/ApolloDataWrapper'

function createItemDataComponent(query: any, idField: string = '_id') {
  const connectQuery = graphql(query, {
    options: (props) => {
      const id = props.variables && props.variables[idField]
      return {
        variables: {
          [idField]: id,
        },
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
