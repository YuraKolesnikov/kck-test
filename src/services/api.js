import qs from 'qs'
import { Axios } from './axios'

export const api = (url, queryParams = null) => {
  const config = {
    params: queryParams,
    paramsSerializer: params => qs.stringify(params)
  }

  return {
    post: data => Axios.post(url, data, config)
      .then(res => res)
      .catch(e => console.error(e)),

    get: () => Axios.get(url, config)
      .then(res => res)
      .catch(e => console.error(e)),

    put: data => Axios.put(url, data, config)
      .then(res => res)
      .catch(e => console.error(e)),

    delete: () => Axios.delete(url, config)
      .then(res => res)
      .catch(e => console.error(e))
  }
}
