import Axios from "axios";

const { useState, useEffect } = require("react");
const { Woo } = require("../API");

export const tagId = "3868";

export const useLiveSale = (brand_id) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  let source = Axios.CancelToken.source();

  const fetchData = async () => {
    try {
      const { data: response } = await Woo.get(`temp/${tagId}/${brand_id}`, {
        cancelToken: source.token,
      });

      setState({
        data: response,
        loading: false,
        error: null,
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
  }, [brand_id]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
};