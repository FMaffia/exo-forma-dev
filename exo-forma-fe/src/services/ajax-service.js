import { CANCEL } from "@redux-saga/core";
import axios from "axios";
import { replace } from "connected-react-router";
import { store } from "../store/store";

/* istanbul ignore next */
class AjaxService {
  constructor(
    onRequestConfig,
    onRequestConfigError,
    onResponse,
    onResponseError,
    onNoServerResponse
  ) {
    this.onRequestConfig =
      onRequestConfig && typeof onRequestConfig === "function"
        ? onRequestConfig
        : () => {};
    this.onRequestConfigError =
      onRequestConfigError && typeof onRequestConfigError === "function"
        ? onRequestConfigError
        : () => {};
    this.onResponse =
      onRequestConfig && typeof onResponse === "function"
        ? onResponse
        : () => {};
    this.onResponseError =
      onResponseError && typeof onResponseError === "function"
        ? onResponseError
        : () => {};
    this.onNoServerResponse =
      onNoServerResponse && typeof onNoServerResponse === "function"
        ? onNoServerResponse
        : () => {};
  }

  doAjaxNoLoading(method, path) {
    return this.doAjax(method, path, null, null, false);
  }

  // chiamare a 3 parametri per loading generale, a 4 con false per loading personalizzato
  doAjaxNoParam(method, path, callback, showLoading) {
    return this.doAjax(method, path, null, callback, showLoading);
  }

  callAjax(method, path, data) {
    return this.doAjax(method, path, data, undefined, false);
  }

  doAjax(method, path, data, callback, showLoading = true) {
    const source = axios.CancelToken.source();

    const basePath = "";
    const apiPath = "";
    let uri = `${basePath}${apiPath}${path}?v=${Date.now()}`;
    if (method === "GET" && data) {
      data.v = Date.now();
      const params = new URLSearchParams(data);
      uri = `${basePath}${apiPath}${path}?${params}`;
    }

    const config = {
      method: method,
      url: uri,
      withCredentials: true,
      data: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
      },
      cancelToken: source.token,
    };

    this.onRequestConfig(config);
    const requestBase = axios(config);

    const request = requestBase
      .then((response) => {
        this.onResponse(response);
        callback && callback(response);
        return { success: true, result: response.data };
      })
      .catch((error) => {
        if (showLoading === undefined || showLoading) {
        }

        if (error.response) {
          this.onResponseError(error);
          if (error.response.status === 500) {
            const currentRoute = store.getState().router.location;
            store.dispatch(
              replace(currentRoute.pathname, {
                errorCode: 500,
              })
            );
            return;
          }
          return {
            success: false,
            result: error.response.data,
            errorCode: error.response.status,
          };
        } else if (error.request) {
          this.onNoServerResponse(error);
          console.debug(
            `no response received ${uri} - error ${JSON.stringify(
              error.request
            )}`
          );
          return { success: false };
        } else if (axios.isCancel(error)) {
          // nn loggiamo nulla
        } else {
          this.onRequestConfigError(error);
          console.debug(
            `request config error ${uri} - error ${JSON.stringify(
              error.message
            )}`
          );
          return { success: false };
        }
      });
    request[CANCEL] = () => source.cancel();
    return request;
  }

  doAjaxBlob(method, path, data) {
    const source = axios.CancelToken.source();

    const apiPath = "/api";
    let uri = `${apiPath}${path}?v=${Date.now()}`;
    if (method === "GET" && data) {
      data.v = Date.now();
      const params = new URLSearchParams(data);
      uri = `${apiPath}${path}?${params}`;
    }

    const config = {
      method: method,
      url: uri,
      withCredentials: true,
      data: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
      cancelToken: source.token,
    };

    this.onRequestConfig(config);

    const requestBase = axios(config);

    const request = requestBase
      .then((response) => {
        this.onResponse(response);
        return { success: true, result: response };
      })
      .catch((error) => {
        if (error.response) {
          this.onResponseError(error);
          return { success: false, result: error.response.data };
        }
      });
    request[CANCEL] = () => source.cancel();
    return request;
  }

  callAjaxBlob(method, path, data, addTimestamp = true) {
    const source = axios.CancelToken.source();

    const apiPath = "";
    let uri = `${apiPath}${path}?v=${Date.now()}`;
    if (!addTimestamp) {
      uri = `${apiPath}${path}`;
    }
    if (method === "GET" && data) {
      data.v = Date.now();
      const params = new URLSearchParams(data);
      uri = `${apiPath}${path}?${params}`;
    }

    const config = {
      method: method,
      url: uri,
      withCredentials: true,
      data: data ? JSON.stringify(data) : null,
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
      cancelToken: source.token,
    };

    this.onRequestConfig(config);

    const requestBase = axios(config);

    const request = requestBase
      .then((response) => {
        this.onResponse(response);
        return {
          success: true,
          result: response.data,
          headers: response.headers,
        };
      })
      .catch((error) => {
        if (error.response) {
          this.onResponseError(error);
          return {
            success: false,
            result: error.response.data,
            errorCode: error.response.status,
          };
        }
      });
    request[CANCEL] = () => source.cancel();
    return request;
  }
}

export default AjaxService;
