
import axios from 'axios'
import { useEffect, useState, useRef, useReducer } from 'react'
import { ERROR_CODES_MESSAGES } from '../utils/errorMaker'

const initialState = {
  status: 'idle',
  data: null,
  error: ERROR_CODES_MESSAGES[0]
}
export default function useFetch(
  url,
  method,
  headers,
  reqBody = null,
  OUTSIDE = false
) {
  const [body, setBody] = useState(reqBody);
  const reqUrl = OUTSIDE
    ? OUTSIDE
    : `http://${process.env.REACT_APP_API_ADDRESS}${url}`;
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'request':
        return { ...initialState, status: 'loading' };
      case 'success':
        return { ...initialState, status: 'success', data: action.payload };
      case 'failure':
        return { ...initialState, status: 'error', error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);
  const cancelReq = useRef(false);
  const cache = useRef([]);
  useEffect(() => {
    const fetch = async () => {
      dispatch({ type: 'request' });
      if (cache.current[url]) {
        dispatch({ type: 'success', payload: cache.current[url] });
      }
      try {
        const response = await axios({
          method: method,
          url: reqUrl,
          data: body,
          headers: headers,
        });
        cache.current[url] = response.data;
        dispatch({ type: 'success', payload: cache.current[url] });
        if (cancelReq.current) return;
      } catch (err) {
        dispatch({
          type: 'failure',
          payload:
            ERROR_CODES_MESSAGES[
              err.response?.status ? err.response.status : 503
            ],
        });
        if (cancelReq.current) return;
      }
    };
    if (body) fetch();
    return () => {
      cancelReq.current = true;
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, body]);

  // useEffect(() => {
  //   console.log(state)
  // }, [state])

  return { state, setBody };
}
