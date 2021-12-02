import Axios from "axios";

const { useState, useEffect } = require("react");
const { Woo } = require("../API");

export const useMall = (id, sort = "custom_menu_order") => {
  const [state, setState] = useState({
    data: null,
    loading: true,
    error: "",
  });

  let source = Axios.CancelToken.source();

  const fetchData = async () => {
    try {
      const { data: response } = await Woo.get(`mall/category/${id}`, {
        cancelToken: source.token,
        params: {
          sortby: sort,
        },
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
  }, [id]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
  };
};

// import Axios from "axios";

// const { useState, useEffect } = require("react");
// const { Woo } = require("../API");

// export const useMall = (id) => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   let source = Axios.CancelToken.source();

//   const fetchData = async () => {
//     // setLoading(true);

//     try {
//       const { data: response } = await Woo.get(`products?category=${id}`, {
//         cancelToken: source.token,
//       });

//       setData(response);
//       setLoading(false);
//       setError(null);
//       // console.log("a");
//     } catch (e) {
//       if (Axios.isCancel(e)) {
//         console.log("cancel");
//       } else {
//         setError(e);
//         setLoading(false);
//         setData([]);
//       }
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     return () => {
//       source.cancel();
//     };
//   }, [id]);

//   return {
//     data,
//     loading,
//     error,
//   };
// };
