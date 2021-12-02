import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  StyleSheet
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Woo } from '../../API'
import {
  ProductGrid,
  ProductGridPlaceholder,
  ProductRow,
  ProductRowPlaceholder,
  Title
} from '../../components'
import { CONFIG, hp } from '../../constants'
import { THEME } from '../../DynamicStyle/style'
import { useStoreTag } from '../../hooks/useStoreTag'
import { useStoreBrand } from '../../hooks/useStoreBrand'
import { useStoreMultiTag } from '../../hooks/useStoreMultiTag'
import { useStoreMultiBrand } from '../../hooks/useStoreMultiBrand'
const WIDTH = CONFIG.width
const cat_width = WIDTH > 700 ? 10 : 5
const category = hp.getStoresCatIcons()

const tagIds = {
  rowOne: 3070
}

const brandId = 1147

const banners = [
  'https://tomato.com.mm/wp-content/uploads/2020/06/1st-Banner-2000x878-5-1024x450.jpg',
  'https://tomato.com.mm/wp-content/uploads/2020/06/2000-x-878-1-6-2-1024x450.jpg',
  'https://tomato.com.mm/wp-content/uploads/2020/07/2000-x-878-1-22-1024x450.jpg',
  'https://tomato.com.mm/wp-content/uploads/2020/07/4th-Banner-2000x878-1-1024x450.jpg'
]

const Loreal = ({ navigation, route }) => {
  const storeId = route.params.id
  let scrollViewRef = useRef(null)
  const [layouts, setLayouts] = useState([])

  const toCategory = index => {
    if (layouts[index]) {
      scrollViewRef.current.scrollTo({
        x: 0,
        y: layouts[index] - 10, //reduce header size as header is blocking the section
        animated: true
      })
    }
  }

  const addLayoutAxis = (y, i) => {
    let _newArr = [...layouts]
    _newArr[i] = y
    setLayouts(_newArr)
  }

  const rowOne = useStoreTag(storeId, tagIds.rowOne)
  const brand = useStoreBrand(brandId)

  return (
    <SafeAreaView>
      <ScrollView ref={scrollViewRef}>
        <View style={styles.catContainer}>
          {category.map((item, index) => (
            <TouchableOpacity
              onPress={() => toCategory(index)}
              key={index}
              style={styles.cat_btn}
            >
              <View style={styles.cat_view}>
                <Image
                  source={item.logo}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode='contain'
                />
              </View>
              <Text numberOfLines={2} style={styles.cat_text}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {rowOne.loading ? (
          <ProductRowPlaceholder />
        ) : (
          rowOne.data &&
          rowOne.data.length > 0 && (
            <View>
              <ProductRow products={rowOne.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={[styles.banner_wrapper]}
            source={{
              uri: banners[0]
            }}
          />
        </TouchableNativeFeedback>
        {brand.loading ? (
          <ProductRowPlaceholder />
        ) : (
          brand.data &&
          brand.data.length > 0 && (
            <View>
              <ProductRow products={brand.data} />
            </View>
          )
        )}
        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners[1]
            }}
          />
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners[2]
            }}
          />
        </TouchableNativeFeedback>

        <TouchableNativeFeedback>
          <Image
            style={styles.banner_wrapper}
            source={{
              uri: banners[3]
            }}
          />
        </TouchableNativeFeedback>
        {brand.loading ? (
          <ProductGridPlaceholder />
        ) : (
          brand.data &&
          brand.data.length > 0 && (
            <View style={{ paddingHorizontal: 8 }}>
              <Title name='Popular Products' />
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap'
                }}
              >
                {brand.data.map((item, index) => (
                  <ProductGrid key={index} product={item} index={index} />
                ))}
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Loreal

const styles = StyleSheet.create({
  catContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: THEME.card,
    paddingTop: 20,
    paddingBottom: 10
    // marginBottom: 10
  },
  banner_wrapper: {
    width: '100%',
    height: 200,
    marginBottom: 10
  },
  cat_btn: {
    width: WIDTH / cat_width - 20,
    marginBottom: 5,
    alignItems: 'center',
    marginHorizontal: 10
  },
  cat_view: {
    // borderWidth: 0.5,
    overflow: 'hidden',
    // backgroundColor: THEME.card,
    // borderColor: THEME.secondary,
    borderRadius: 10,
    width: WIDTH / cat_width - 24,
    height: 50
    // justifyContent: "center",
    // alignItems: "center",
  },
  cat_text: {
    textAlign: 'center',
    fontSize: 10,
    color: THEME.text_secondary,
    marginTop: 5
  }
})
