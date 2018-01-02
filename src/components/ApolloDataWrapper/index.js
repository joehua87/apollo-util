// @flow

import React from 'react'

const Loader = () => (
  <div>Loading...</div>
)

function ApolloDataWrapper({
  data,
  dataField = 'result',
  renderLoading = () => (<Loader />),
  renderGlobalError = () => (<div>Global Error Occur</div>),
  renderError = () => (<div>Query Error Occur</div>),
  renderData,
  children,
}: {
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
}) {
  const { loading, error: globalError } = data
  if (globalError) {
    return renderGlobalError(globalError)
  }
  if (loading) {
    return renderLoading()
  }

  const result = data[dataField]

  if (result.error) {
    return renderError(result.error)
  }

  const renderChildren = renderData || children
  if (!renderChildren) {
    throw new Error('renderData or children (render props) must be provided')
  }

  return renderChildren(result)
}

ApolloDataWrapper.defaultProps = {
  dataField: 'result',
  renderLoading: () => (<Loader />),
  renderGlobalError: () => (<div>Global Error Occur</div>),
  renderError: () => (<div>Query Error Occur</div>),
}

export default ApolloDataWrapper
