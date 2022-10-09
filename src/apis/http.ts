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
  url: string
  params?: unknown
  showProgress?: boolean
}

type ResData = {
  code: number
  data: unknown
  msg: string
  status: boolean
  timestamp: string
}

export const get = async ({ url, params, showProgress }: HttpConfig) => {
  if (showProgress) {
    NProgress.start()
  }
  try {
    const { data, status } = await axios.get<ResData>(url, { params })
    switch (status) {
      case 200:
        return data
      default:
        return data
    }
  } finally {
    if (showProgress) {
      NProgress.done()
    }
  }
}

export const post = async ({ url, params, showProgress }: HttpConfig) => {
  if (showProgress) {
    NProgress.start()
  }
  try {
    const { data, status } = await axios.post<ResData>(url, params)
    switch (status) {
      case 200:
        return data
      default:
        return data
    }
  } finally {
    if (showProgress) {
      NProgress.done()
    }
  }
}
