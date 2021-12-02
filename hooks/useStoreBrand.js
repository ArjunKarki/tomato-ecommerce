import Axios from "axios";

const { useState, useEffect } = require("react");
const { Woo } = require("../API");

export const useStoreBrand = (brandId) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: "",
  });

  let source = Axios.CancelToken.source();

  const fetchData = async () => {
    try {
      const { data: response } = await Woo.get(`vendor/brand/${brandId}`, {
        cancelToken: source.token,
      });
      setState({
        data: response,
        loading: false,
        error: "",
      });
    } catch (e) {
      if (Axios.isCancel(e)) {
      } else {
        setState({
          error: e,
          loading: false,
          data: [],
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      source.cancel();
    };
  }, [brandId]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
};
