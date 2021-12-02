import { View, Text } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { Vendor } from '../../API'
import { FlatList } from 'react-native-gesture-handler'

import { CONFIG } from '../../constants'

const AllStores = () => {
  const [stores, setStores] = useState([])
  useEffect(() => {
    Vendor.get('stores?per_page=100').then(res => setStores(res.data))
  }, [])
  return (
    <View style={{ flex: 1, paddingHorizontal: 8 }}>
      {/* <FlatList
        data={stores}
        numColumns={2}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: CONFIG.width / 2 - 10,

                marginRight: 10
              }}
            >
              <Text>{item.store_name}</Text>
            </View>
          )
        }}
      /> */}
    </View>
  )
}

export default AllStores
