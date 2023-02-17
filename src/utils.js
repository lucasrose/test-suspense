const API_KEY = process.env.API_KEY;

const request = (url, params = {}, method = "GET") => {
  const options = {
    method,
    headers: { "X-Api-Key": API_KEY },
  };
  if ("GET" === method) {
    url += "?" + new URLSearchParams(params).toString();
  } else {
    options.body = JSON.stringify(params);
  }

  return fetch(url, options).then((response) => response.json());
};
const get = (url, params) => request(url, params, "GET");
const post = (url, params) => request(url, params, "POST");

export const req = { get, post };


export function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    },
  };
}