// @flow

import pick from 'lodash.pick'

export function createConnectCreateConfig({
  mutationName,
  listQuery,
  getVariables,
}: {
  mutationName: string,
  listQuery?: any,
  getVariables?: Function,
}): any {
  return {
    props({ mutate, ownProps }) {
      const variables = getVariables ? getVariables(ownProps) : {}
      return {
        submitCreate(payload) {
          return mutate({
            variables: payload,
            update: (store, newData) => {
              // Read the data from our cache for this query.
              if (!listQuery) return
              const data = store.readQuery({ query: listQuery, variables })
              // Add our result to data
              // TODO Add pagingInfo
              data.result.entities.push(newData.data[mutationName].result)
              // Write our data back to the cache.
              store.writeQuery({ query: listQuery, data, variables })
            },
          })
        },
      }
    },
  }
}

export function createConnectEditConfig(
  submitFnName?: string = 'submitEdit',
): any {
  return {
    props({ mutate }) {
      return {
        [submitFnName](payload) {
          return mutate({
            variables: payload,
          })
        },
      }
    },
  }
}

export function createConnectRemoveConfig({
  mutationName,
  listQuery,
  getVariables,
}: {
  mutationName: string,
  listQuery?: any,
  getVariables?: Function,
}): any {
  return {
    props({ mutate, ownProps }) {
      const variables = getVariables ? getVariables(ownProps) : {}
      return {
        submitRemove(_id) {
          return mutate({
            variables: { _id },
            update: (store, newData) => {
              if (!listQuery) return
              // Read the data from our cache for this query.
              const data = store.readQuery({ query: listQuery, variables })
              // Add our result to data
              // TODO: Add pagingInfo
              // TODO: Improve performance here
              data.result.entities = data.result.entities.filter(
                x => x._id !== newData.data[mutationName].result._id,
              )
              // Write our data back to the cache.
              store.writeQuery({ query: listQuery, data, variables })
            },
          })
        },
      }
    },
  }
}
