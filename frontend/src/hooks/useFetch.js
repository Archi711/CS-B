
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ERROR_CODES_MESSAGES } from '../utils/errorMaker'
export default function useFetch(url, method, reqBody = null) {
  const [status, setStatus] = useState('idle')
  const [data, setData] = useState(null)
  const [error, setError] = useState(ERROR_CODES_MESSAGES[0])
  const [body, setBody] = useState(reqBody)


  useEffect(() => {
    const fetch = async () => {
      setStatus('loading')
      axios[method](`http://${process.env.REACT_APP_API_ADDRESS}${url}`, body)
        .then(res => setData(res.data))
        .catch(err => setError(ERROR_CODES_MESSAGES[err.response.status]))
        .finally(() => error !== ERROR_CODES_MESSAGES[0] ? setStatus('error') : setStatus('idle'))

    }
    if (body) fetch()
  }, [url, method, body, error])

  return { status, data, error, setBody }

}