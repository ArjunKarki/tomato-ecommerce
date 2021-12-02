import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Woo } from '../API'

export const useStoreMultiTag = (vendorId, tagIdArr) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: ''
  })

  const source = Axios.CancelToken.source()

  const fetchData = async tagId => {
    await Woo.get(`/stores/${vendorId}/products?tag=${tagId}`, {
      cancelToken: source.token
    })
      .then(({ data }) => {
        setState(preState => ({
          ...preState,
          data: preState.data.concat(data),
          loading: false
        }))
      })
      .catch(e => {
        if (Axios.isCancel(e)) {
        } else {
          setState({
            ...state,
            loading: false,
            error: e
          })
        }
      })
  }

  const asyncForEach = async (arr, callback) => {
    for (let i = 0; i < arr.length; i++) {
      await callback(arr[i])
    }
  }

  useEffect(() => {
    asyncForEach(tagIdArr, fetchData)

    return () => {
      source.cancel()
    }
  }, [])

  return state
}
