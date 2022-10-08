import NProgress from 'nprogress'

axios.defaults.baseURL = import.meta.env.APP_BASE_URL
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)

interface HttpConfig {
  showProgress?: boolean
}

export const get = async (url: string, params: unknown, config: HttpConfig) => {
  if (config.showProgress) {
    NProgress.start()
  }
  try {
    return await axios.get(url, { params })
  } finally {
    if (config.showProgress) {
      NProgress.done()
    }
  }
}

export const post = async (url: string, params: unknown, config: HttpConfig) => {
  if (config.showProgress) {
    NProgress.start()
  }
  try {
    return await axios.post(url, params)
  } finally {
    if (config.showProgress) {
      NProgress.done()
    }
  }
}
