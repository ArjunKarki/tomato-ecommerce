import { Woo } from "../../API";

export const getFeaturedBrands = (callback, setState) => {
  Woo.get("/brands?featured=true")
    .then((res) => {
      callback(res.data, false, setState);
    })
    .catch((e) => {
      callback(e, true, setState);
    });
};

export const getWhatsNew = (callback, setState) => {
  Woo.get("/tag/4994")
    .then((res) => {
      callback(res.data, false, setState);
    })
    .catch((e) => callback(e, true, setState));
};

export const getBestSeller = (callback, setState) => {
  Woo.get("/tag/4995")
    .then((res) => {
      callback(res.data, false, setState);
    })
    .catch((e) => callback(e, true, setState));
};
