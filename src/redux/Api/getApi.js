import { ACCESS_TOKEN, API_URL } from "@common/config";
import axios from "axios";

async function authMiddleWare(serviceDefinition, serviceOptions) {
  // This will be printed everytime you call a service
  return {
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + ACCESS_TOKEN,
    },
  };
}

const getDataService = {
  // getData: function (url, method, token) {

  //     return new Promise((resolve, reject) => {
  //         fetch(API_URL + url + '/' + ACCESS_TOKEN)
  //             .then((response) => response.json())
  //             .then((json) => resolve(json))
  //             .catch((error) => console.error(error))
  //     });
  // },
  getDataCoupon: async (method) => {
    try {
      const response = await axios.get(API_URL + method);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getData: (method) => {
    return new Promise((resolve, reject) => {
      fetch(`${API_URL}${method}`)
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((error) => reject(error));
    });
  },

  postData: async (url) => {
    let header = {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };
    // if (token != null) {
    // header = {
    //   Accept: "application/json",
    //   "Content-Type": "multipart/form-data",
    //   "X-Auth-Token": ACCESS_TOKEN,
    // };

    //}

    return fetch(API_URL + url, {
      method: "POST",
      headers: header,
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  jsonpostData: async (url, data) => {
    // await axios
    //   .post(API_URL + url, data)
    //   .then((responseJson) => {
    //     console.log("response json*************: ", responseJson.data.data);
    //     return responseJson.data.data;
    //   })
    //   .catch((error) => {
    //     return error;
    //   });
    try {
      const response = await axios.post(API_URL + url, data);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};
export default getDataService;
