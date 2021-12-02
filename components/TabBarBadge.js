import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { THEME } from "../DynamicStyle/style";
import Animated, { Easing } from "react-native-reanimated";

const {
  Value,
  Clock,
  timing,
  set,
  cond,
  block,
  startClock,
  stopClock,
  interpolate,
  eq,
} = Animated;

const TabBarBadge = () => {
  const clock = new Clock();
  const config = {
    toValue: new Value(0.5),
    duration: 700,
    easing: Easing.ease,
  };

  const [state, setState] = useState({
    opacity: new Value(1),
  });

  const RunOpacity = (clock, config) => {
    const animatedState = {
      finished: new Value(0),
      position: new Value(1),
      frameTime: new Value(0),
      time: new Value(0),
    };
    return block([
      cond(
        animatedState.finished,
        [
          stopClock(clock),
          set(animatedState.finished, 0),
          set(animatedState.position, config.toValue),
          set(animatedState.frameTime, 0),
          set(animatedState.time, 0),
          set(config.toValue, cond(eq(config.toValue, 0.5), 1, 0.5)),
          startClock(clock),
        ],
        [startClock(clock)]
      ),
      timing(clock, animatedState, config),
      animatedState.position,
    ]);
  };

  useEffect(() => {
    setState({
      opacity: RunOpacity(clock, config),
    });
  }, []);

  return (
    <View style={styles.badeWrapper}>
      <Animated.View style={[styles.badge, { opacity: state.opacity }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  badeWrapper: {
    position: "absolute",
    left: -3,
    top: -2,
    height: 11,
    width: 11,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  badge: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: THEME.primary,
  },
});

export default TabBarBadge;
