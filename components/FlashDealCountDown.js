import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import CountDown from "react-native-countdown-component";
import { SetFlashDeals } from "../redux/actions/productAction";

const FlashDealCountDown = ({
  until,
  onChange,
  textColor,
  backgroundColor,
  size,
  separatorColor,
}) => {
  const dispatch = useDispatch();
  const { flashDeals } = useSelector((state) => state.product, shallowEqual);

  const [state, setState] = useState({
    initial: true,
    until: until,
    countDownId: flashDeals.expired_date,
    currentCD: null,
    expired_date: Math.floor(
      (new Date(flashDeals.expired_date) - new Date()) / 1000
    )
      ? Math.floor((new Date(flashDeals.expired_date) - new Date()) / 1000)
      : 0,
  });

  useEffect(() => {
    if (state.initial) {
      setState({
        ...state,
        initial: false,
      });
    } else {
      setState((previousState) => ({
        ...previousState,
        countDownId: flashDeals.expired_date,
        expired_date: Math.floor(
          (new Date(flashDeals.expired_date) - new Date()) / 1000
        )
          ? Math.floor((new Date(flashDeals.expired_date) - new Date()) / 1000)
          : 0,
      }));
    }
  }, [flashDeals.expired_date]);

  const onFlashDealsFinished = () => {
    if (state.until) {
      setState((previousState) => ({
        ...previousState,
        until: null,
      }));
    }
    let _tmp = new Date(
      new Date().setHours(new Date().getHours() + 10)
    ).toString();
    dispatch(
      SetFlashDeals({
        data: [...flashDeals.data],
        expired_date: _tmp,
      })
    );
  };

  return (
    <CountDown
      id={state.countDownId?.replace(/\s/g, "_")}
      size={size}
      until={state.until ? state.until : state.expired_date}
      onFinish={onFlashDealsFinished}
      onChange={onChange ? onChange : () => {}}
      digitStyle={{ backgroundColor }}
      digitTxtStyle={{ color: textColor ? textColor : "#fff" }}
      separatorStyle={{ color: separatorColor ? separatorColor : "#fff" }}
      timeToShow={["H", "M", "S"]}
      timeLabels={{ m: null, s: null }}
      showSeparator
    />
  );
};

export default FlashDealCountDown;
