import Axios from "axios";

const { useState, useEffect } = require("react");
const { Woo } = require("../API");

export const useProductCategory = (categoryId) => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

  let source = Axios.CancelToken.source();

  const fetchData = async () => {
    try {
      const { data } = await Woo.get(`products?category=${categoryId}`, {
        cancelToken: source.token,
      });
      setState({
        data,
        loading: false,
        error: "",
      });
    } catch (e) {
      if (Axios.isCancel(e)) {
      } else {
        setState({
          error: e,
          loading: false,
          data: null,
        });
      }
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      source.cancel();
    };
  }, [categoryId]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
};
