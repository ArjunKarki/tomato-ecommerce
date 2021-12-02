import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Woo } from '../API'

export const useStoreMultiBrand = brandIdArr => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: ''
  })

  const source = Axios.CancelToken.source()

  const fetchData = async brandId => {
    await Woo.get(`vendor/brand/${brandId}`, {
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
    asyncForEach(brandIdArr, fetchData)

    return () => {
      source.cancel()
    }
  }, [])

  return state
}
