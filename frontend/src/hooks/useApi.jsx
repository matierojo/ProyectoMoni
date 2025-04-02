import { useState, useCallback } from "react";
import axios from "axios";

const useApi = (baseUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const request = useCallback(async (method, endpoint, data = null, config = {}) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    
    try {
        const response = await axios({
            method,
            url: `${baseUrl}${endpoint}`,
            data,
            ...config,
        });
        setMessage(response.data.message)
        return response.data;
    } catch (err) {
        if (err.response && err.response.data && err.response.data.error) {
            setError(err.response.data.error);
            console.log(err.response.data.error)
        } else if (err.data && err.data.error) {
            setError(err.data.error);
            console.log(err.data.error);
        } else {
            setError("Ha ocurrido un error desconocido");
        }
    } finally {
        setLoading(false);
    }
  }, [baseUrl]);

  const get = useCallback((endpoint, config) => request("get", endpoint, null, config), [request]);
  const post = useCallback((endpoint, data, config) => request("post", endpoint, data, config), [request]);
  const put = useCallback((endpoint, data, config) => request("put", endpoint, data, config), [request]);
  const del = useCallback((endpoint, config) => request("delete", endpoint, null, config), [request]);
  const patch = useCallback((endpoint, config) => request("patch", endpoint, null, config), [request]);

  return { get, post, put, del, patch, loading, error, message };
};

export default useApi;