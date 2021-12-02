import axios from "axios";
import qs from "qs";
const md5 = require("md5");

const AxiosInstance = axios.create({
  baseURL: "https://tomato.com.mm",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

const SECRET_KEY = "029ae6395837bd58f0c72ca7187e2dce";
const HOST = "https://tomato.com.mm";
const COINS_AND_POINTS_ENDPOINT = "/tomato-coins";

export const POINT_TYPE = {
  coins: "mycred_default",
  points: "tomato_pointx",
};

export const Query = {
  // for remotely fetching coins and points
  RemoteGet: (account, point_type) => {
    return new Promise((resolve, reject) => {
      const param = {
        action: "GET",
        account,
        type: point_type,
        host: HOST,
      };
      const token = md5(param.host + param.action + SECRET_KEY);

      AxiosInstance.post(COINS_AND_POINTS_ENDPOINT,
        qs.stringify({
          ...param,
          token,
        })
      )
      .then(({data}) => { resolve(data) })
      .catch(e => { reject(e); });
    });
  },

  // for remotely adding coins and points
  RemoteCredit: (account, amount, point_type, entry) => {
    return new Promise((resolve, reject) => {
      const param = {
        action: "CREDIT",
        account,
        amount,
        ref: "reference",
        ref_id: 0,
        entry,
        type: point_type,
        host: HOST,
      };
      const token = md5(param.host + param.action + param.amount + SECRET_KEY);

      AxiosInstance.post(COINS_AND_POINTS_ENDPOINT,
        qs.stringify({
          ...param,
          token,
        })
      )
      .then(({data}) => { resolve(data) })
      .catch(e => { reject(e); });
    });
  },

  // for remotely reducing coins and points
  RemoteDebit: (account, amount, point_type, entry ) => {
    return new Promise((resolve, reject) => {
      const param = {
        action: "DEBIT",
        account,
        amount,
        ref: "reference",
        ref_id: 0,
        entry,
        type: point_type,
        host: HOST,
      };
      const token = md5(param.host + param.action + param.amount + SECRET_KEY);

      AxiosInstance.post(COINS_AND_POINTS_ENDPOINT,
        qs.stringify({
          ...param,
          token,
        })
      )
      .then(({data}) => { resolve(data); })
      .catch(e => { reject(e); });
    });
  }
};
