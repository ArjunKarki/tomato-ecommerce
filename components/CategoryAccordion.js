import React, { useCallback, useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
} from "react-native";
import { THEME, TYPO } from "../DynamicStyle/style";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CONFIG } from "../constants";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { FetchCategoryProducts } from "../redux/actions/CategoryProductsAction";
import { ActivityIndicator } from "react-native";
import CImage from "./CImage";
import { Image } from "react-native-expo-image-cache";

export default function CategoryAccordion({ props }) {
  const { Category, selectedId, setSelectedId, navigation } = props;
  // const _cat_name = Category.name.replace("&amp;", "&");

  // const ShowSubCategories = useCallback(
  //   (id) => {
  //     if (id != selectedId) {
  //       setSelectedId(id);
  //     } else {
  //       setSelectedId(null);
  //     }
  //   },
  //   [selectedId]
  // );

  const { width, height } = CONFIG;

  const [page, setPage] = useState(1);
  const [openedId, setOpenedId] = useState(null);
  const [cachedId, setCachedId] = useState(null);

  const dispatch = useDispatch();

  const ShowProducts = (id) => {
    if (id != openedId) {
      setOpenedId(id);
    } else {
      setOpenedId(null);
    }
  };

  const { categoryProducts } = useSelector((state) => state, shallowEqual);

  useEffect(() => {
    if (openedId) {
      dispatch(FetchCategoryProducts(openedId, page));
    }
  }, [openedId]);

  return (
    // <TouchableOpacity
    //   onPress={() => {
    //     ShowSubCategories(Category.id);
    //   }}
    // >
    //   <View
    //     style={{
    //       marginBottom: 8,
    //       backgroundColor: THEME.card,
    //       borderRadius: 8,
    //     }}
    //   >
    //     <View
    //       style={{
    //         padding: 16,
    //         flexDirection: "row",
    //         alignItems: "center",
    //         marginBottom: Category.id === selectedId ? 8 : 0,
    //         borderColor:
    //           Category.id === selectedId ? THEME.background : "rgba(0,0,0,0)",
    //         borderWidth: 2,
    //         borderStyle: "solid",
    //         borderTopLeftRadius: 8,
    //         borderTopRightRadius: 8,
    //         backgroundColor:
    //           Category.id === selectedId ? THEME.primary : "rgba(0,0,0,0)",
    //       }}
    //     >
    //       <View
    //         style={{
    //           flex: 1,
    //         }}
    //       >
    //         <Text
    //           style={{
    //             ...TYPO.h3,
    //             color: Category.id === selectedId ? "#fff" : THEME.text_primary,
    //           }}
    //         >
    //           {_cat_name}
    //         </Text>
    //       </View>
    //       <View
    //         style={{
    //           marginTop: -5,
    //         }}
    //       >
    //         <AntDesign
    //           name={Category.id === selectedId ? "minuscircle" : "pluscircle"}
    //           size={20}
    //           color={Category.id === selectedId ? "#fff" : THEME.primary}
    //         />
    //       </View>
    //     </View>

    //     <FlatList
    //       data={Category.sub_categories.map((subC) => ({
    //         ...subC,
    //         labelledBy: Category.id,
    //       }))}
    //       keyExtractor={(item, index) => index.toString()}
    //       renderItem={({ item }) => {
    //         const _sub_name = item.name.replace("&amp;", "&");
    //         return (
    //           <View
    //             style={{
    //               backgroundColor: "#fff",
    //               paddingHorizontal: item.labelledBy === selectedId ? 8 : 0,
    //               paddingBottom: item.labelledBy === selectedId ? 8 : 0,
    //               height: item.labelledBy === selectedId ? "auto" : 0,
    //             }}
    //           >
    //             <TouchableOpacity
    //               onPress={() => {
    //                 navigation.navigate({
    //                   name: "CategoryDetail",
    //                   params: { SCategory: { id: item.id, name: _sub_name } },
    //                 });
    //               }}
    //             >
    //               <View
    //                 style={{
    //                   padding: 8,
    //                   backgroundColor: "#f4f5f7",
    //                 }}
    //               >
    //                 <Text
    //                   style={{
    //                     ...TYPO.h5,
    //                     color: THEME.text_primary,
    //                   }}
    //                 >
    //                   {_sub_name}
    //                 </Text>
    //               </View>
    //             </TouchableOpacity>
    //           </View>
    //         );
    //       }}
    //     />
    //   </View>
    // </TouchableOpacity>
    <ScrollView
      horizontal={true}
      scrollEnabled={false}
      contentContainerStyle={{
        width: "100%",
      }}
    >
      <FlatList
        horizontal={false}
        scrollEnabled={false}
        data={Category}
        keyExtractor={(_, index) => index.toString()}
        // numColumns={width > 700 ? 3 : 2} // ********** to enable this code when the corresponding images are available **********
        renderItem={({ item, index }) => {
          const _sub_name = item.name.replace("&amp;", "&");
          return (
            // ********** to enable this code when the corresponding images are available **********
            // <TouchableOpacity
            //   onPress={() => {
            //     navigation.navigate({
            //       name: "CategoryDetail",
            //       params: { SCategory: { id: item.id, name: _sub_name } },
            //     });
            //   }}
            //   style={{
            //     width: width > 700 ? "33.333333%" : "50%",
            //     borderBottomWidth:
            //       Category.length % 2 === 0
            //         ? index + 1 < Category.length - 1
            //           ? 1
            //           : 0
            //         : index + 1 < Category.length
            //         ? 1
            //         : 0,
            //     borderStyle: "solid",
            //     borderColor: "#eee",
            //   }}
            // >
            //   <View style={[styles.wrapper]}>
            //     <View style={[styles.imageWrapper]}>
            //       <CImage imgUrl={item.image ? [item.image] : []} />
            //     </View>

            //     <View style={{
            //       flex: 1,
            //       justifyContent: "flex-start",
            //       paddingBottom: 10,
            //     }}>
            //       <Text style={[styles.title]}>
            //         {item.name.replace("&amp;", "&")}
            //       </Text>
            //     </View>
            //   </View>
            // </TouchableOpacity>

            // tem code for the time being while images are not available
            <TouchableOpacity
              style={{
                width: "100%",
                paddingLeft: 8,
                paddingVertical: 16,
                borderBottomWidth: index + 1 < Category.length ? 1 : 0,
                borderBottomColor: "#eee",
                borderStyle: "solid",
              }}
              onPress={() => {
                navigation.navigate({
                  name: "CategoryDetail",
                  params: { SCategory: { id: item.id, name: _sub_name } },
                });
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text style={{
                    fontFamily: "Roboto-Regular",
                    textTransform: "capitalize",
                  }}>{item.name.replace("&amp;", "&")}</Text>
                </View>

                <View
                  style={{
                    width: 20,
                  }}
                >
                  <AntDesign name="right" />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 8,
    backgroundColor: THEME.card,
    height: "auto",
  },
  imageWrapper: {
    height: 100,
    width: "100%",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
});
