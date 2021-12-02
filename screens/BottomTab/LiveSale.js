import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { THEME, TYPO } from "../../DynamicStyle/style";
import {
  Container,
  ProductRowPlaceholder,
  ProductRow,
  ProductGridPlaceholder,
  ProductGrid,
  LiveProductsRow,
} from "../../components";
import { CONFIG } from "../../constants";
import { Feather } from "@expo/vector-icons";
import Animated, { Easing } from "react-native-reanimated";
import { Woo } from "../../API";
import { useLiveSale, tagId } from "../../hooks/useLiveSale";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { WebView } from "react-native-webview";
import { FetchLiveVideos } from "../../redux/actions/LiveVideosAction";
import axios from "axios";
import { UPDATE_LIVE_VIDEOS, UPDATE_IS_LIVE } from "../../redux/constants";
import { StackActions, useFocusEffect } from "@react-navigation/native";
import { hp } from "../../constants/hp";
import CImage from "../../components/CImage";
import YoutubeIframe from "react-native-youtube-iframe";

const cancelToken = axios.CancelToken;
const source = cancelToken.source();

const { height, width } = CONFIG;
const hori_width = width > 700 ? 4.5 : 2.5;

const LiveSale = ({ navigation }) => {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const dispatch = useDispatch();
  let tracingInterval = null;

  useEffect(() => {
    dispatch(FetchLiveVideos());

    return () => {
      if (tracingInterval) {
        clearInterval(tracingInterval);
      }
    };
  }, []);

  const { liveVideos } = useSelector((state) => state, shallowEqual);

  useEffect(() => {
    liveVideos.data.forEach((item) => {
      if (item.live) {
        dispatch({ type: UPDATE_IS_LIVE, payload: true });
      }
    });
  }, [liveVideos.data]);

  const webViewRef = useRef((ref) => ref);

  const [state, setState] = useState({
    isProductFetching: false,
    tracingInterval: null,
    liveActiveItemIndex: null,
  });

  const TraceInterval = useCallback(
    (id) => {
      const _tmpInterval = setInterval(() => {
        try {
          Woo.get(`/live-promos/${id}`, {
            cancelToken: source.token,
          }).then(({ data }) => {
            let _tmpActiveItem = data.products.length
              ? data.products.filter((item) => item.active)[0]
              : null;
            let _tmpIndex = null;

            if (_tmpActiveItem) {
              _tmpIndex = data.products
                .map((item) => item.id)
                .indexOf(_tmpActiveItem.id);
            }

            setState({
              ...state,
              isProductFetching: false,
              liveActiveItemIndex: _tmpIndex,
            });
            console.log("Tracing completed!");
          });
        } catch (err) {
          console.log("Error in updaing live products => ", err);
        }
      }, 5000);
      return _tmpInterval;
    },
    [liveVideos.data]
  );

  const onViewAbleChange = useRef(({ changed }) => {
    if (state.isProductFetching) {
      source.cancel();
    }

    setActiveVideoId(null);

    const tmpC = changed[0];
    if (tmpC.item.video_type.Facebook == "Facebook") {
      //facebook videos
      if (tmpC.isViewable && tmpC.item.live) {
        // set interval
        tracingInterval = TraceInterval(tmpC.item.live_id);
        setState({
          ...state,
          isProductFetching: true,
        });
      } else {
        // clear interval
        if (tracingInterval) {
          clearInterval(tracingInterval);
          tracingInterval = null;
          console.log("Interval Cleared!");
        }
      }
    } else {
      // youtube videos
      if(tmpC.isViewable) {
        if(tmpC.item.auto_play) {
          setActiveVideoId(tmpC.item.live_id);
        }
      }
    }
  });

  const ViewableConfig = useRef({
    waitForInteraction: true,
    minimumViewTime: 1000,
    // itemVisiblePercentThreshold: 100,
    viewAreaCoveragePercentThreshold: 100,
  });

  useFocusEffect(() => {
    hp.setStatusBarToNormal(StatusBar);
  });
  const [currentLiveId, setCurrentLiveId] = useState(null);

  if (liveVideos.loading) {
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
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: THEME.background,
          }}
        >
          <ActivityIndicator color={THEME.primary} />
        </View>
      </SafeAreaView>
    );
  }

  const jsCode = `window.ReactNativeWebView.postMessage("window.ReactNativeWebView");`;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Platform.OS === "android" ? "transparent" : THEME.primary,
      }}
    >
      {/* WebView */}
      {liveVideos.data.length ? (
        <View
          style={{
            backgroundColor: THEME.background,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={liveVideos.data}
            extraData={liveVideos}
            keyExtractor={(_, index) => index.toString()}
            onViewableItemsChanged={onViewAbleChange.current}
            viewabilityConfig={ViewableConfig.current}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    backgroundColor: THEME.card,
                    marginBottom: 16,
                  }}
                >
                  {/* video */}
                  {item.video_type.Facebook == "Facebook" ? (
                    <WebView
                      ref={webViewRef}
                      scalesPageToFit={true}
                      bounces={false}
                      javaScriptEnabled
                      // injectedJavaScript={jsCode}
                      onMessage={({ nativeEvent }) => {
                        console.log("from on message => ", nativeEvent);
                      }}
                      style={{
                        marginBottom: 10,
                        height: (width * 9) / 16,
                      }}
                      allowsFullscreenVideo={true}
                      source={{
                        html: `
                        <!DOCTYPE html>
                        <html>
                          <head>
                          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
                          </head>
                          <body>
                          <div class="embed-responsive embed-responsive-16by9">
                          <iframe id="iframePlayer" src="${item.video_code}" class="embed-responsive-item" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>
                          </div>
                          </body>
                        </html>
                      `,
                      }}
                    />
                  ) : (
                    <YoutubeIframe videoId={item.video_code} play={item.live_id == activeVideoId ? (item.auto_play ? true : false) : false} height={width * 9 / 16} />
                  )}

                  {/* products row */}
                  <View
                    style={{
                      paddingBottom: 10,
                    }}
                  >
                    <LiveProductsRow
                      products={item.products}
                      activeIndex={null}
                    />
                  </View>
                </View>
              );
            }}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: THEME.background,
          }}
        >
          <Feather
            name="camera-off"
            color="#ddd"
            size={30}
            style={{ marginBottom: 20 }}
          />
          <Text style={{ ...TYPO.h5 }}>Currently, no video is available.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    backgroundColor: THEME.primary,
    padding: 8,
    fontFamily: "Roboto-Medium",
    color: "#fff",
  },
});

export default LiveSale;
