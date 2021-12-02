import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import { CategoryAccordion } from "../../components";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { FetchCategories } from "../../redux/actions/CategoriesAction";
import {
  Placeholder,
  Fade,
  PlaceholderLine,
  PlaceholderMedia,
} from "rn-placeholder";
import { useFocusEffect } from "@react-navigation/native";
import { hp } from "../../constants";

const { height, width } = Dimensions.get("screen");

const CategoriesPlaceholder = () => {
  let categories = [];
  for (let i = 0; i < 20; i++) {
    categories.push(
      <PlaceholderLine
        key={i}
        height={100}
        style={{
          marginBottom: 10,
          borderRadius: 0,
        }}
      />
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          backgroundColor: THEME.background,
        }}
      >
        <View
          style={{
            width: (width * 30) / 100,
          }}
        >
          <Placeholder>
            <PlaceholderMedia
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </Placeholder>
        </View>
        <View style={{ flex: 1 }}>
          <Placeholder Animation={Fade}>{categories}</Placeholder>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Category({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchCategories());
  }, []);

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });

  const { categories } = useSelector((state) => state, shallowEqual);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    if (categories.data.length) {
      if (!selectedId) {
        let _tmpCategories = [];
        categories.data.forEach((tmp) => {
          if (tmp.sub_categories.length) {
            _tmpCategories.push(tmp);
          }
        });
        setSelectedId(_tmpCategories[0].id);
      }
    }
  }, [categories]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      <View style={[styles.container]}>
        {/* <View style={[styles.absoluteCircle]}></View> */}
        {/* <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...TYPO.h1,
            color: THEME.primary,
          }}
        >
          Shop by Category
        </Text>
      </View> */}
        {categories.data.length ? (
          // <FlatList
          //   horizontal={false}
          //   showsVerticalScrollIndicator={false}
          //   data={categories.data}
          //   extraData={selectedId}
          //   keyExtractor={(item, index) => item.id.toString()}
          //   contentContainerStyle={{
          //     width: width - 16,
          //   }}
          //   renderItem={({ item }) => (
          //     <CategoryAccordion
          //       props={{ Category: item, selectedId, setSelectedId, navigation }}
          //     />
          //   )}
          // />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
            }}
          >
            {/* left side */}
            <View
              style={{
                width: (width * 30) / 100,
              }}
            >
              <FlatList
                showsVerticalScrollIndicator={false}
                data={categories.data}
                extraData={selectedId}
                keyExtractor={(_, index) => index.toString()}
                initialNumToRender={20}
                renderItem={({ item }) => {
                  if (item.id == 2762 || item.id == 206 || item.id == 205) {
                    return;
                  }
                  return item.sub_categories.length ? (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedId(item.id);
                      }}
                    >
                      <View
                        style={{
                          paddingVertical: 16,
                          paddingHorizontal: 8,
                          alignItems: "center",
                          backgroundColor:
                            item.id === selectedId ? THEME.card : "#e4e7ec",
                        }}
                      >
                        {item.image ? (
                          <View
                            style={{
                              height: (width * 10) / 100,
                              width: (width * 10) / 100,
                            }}
                          >
                            <Image
                              source={{ uri: item.image }}
                              style={{
                                height: "100%",
                                width: "100%",
                                resizeMode: "contain",
                              }}
                            />
                          </View>
                        ) : (
                          <></>
                        )}
                        <Text
                          style={{
                            textAlign: "center",
                            fontFamily: "Roboto-Medium",
                            color:
                              item.id === selectedId ? THEME.primary : "#666",
                          }}
                        >
                          {item.name.replace("&amp;", "&")}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <></>
                  );
                }}
              />
            </View>

            {/* right side */}
            <View
              style={{
                flex: 1,
                backgroundColor: THEME.card,
                paddingHorizontal: 8,
              }}
            >
              <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}
                showsVerticalScrollIndicator={false}
              >
                {categories.data.map((item) => {
                  return item.id === selectedId ? (
                    item.sub_categories.length ? (
                      <CategoryAccordion
                        key={item.id}
                        props={{
                          Category: item.sub_categories,
                          selectedId,
                          setSelectedId,
                          navigation,
                        }}
                      />
                    ) : (
                      <View key={item.id}></View>
                    )
                  ) : null;
                })}
              </ScrollView>
            </View>
          </View>
        ) : (
          <CategoriesPlaceholder />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
    // paddingTop: Platform.OS === "ios" ? 16 : 0,
  },
  absoluteCircle: {
    position: "absolute",
    height,
    width: width * 2,
    backgroundColor: THEME.primary,
    transform: [{ translateY: -height / 2 }, { rotateZ: "30deg" }],
  },
});
