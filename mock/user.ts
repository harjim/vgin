import { MockMethod } from 'vite-plugin-mock'
import Mock, { Random } from 'mockjs'

export default [
  {
    url: '/api/user/login',
    method: 'get',
    response: ({ query: { username } }) => {
      if (username === 'admin') {
        return {
          code: 200,
          data: 'vgin',
          msg: 'ok',
          status: true,
          timestamp: Random.date('T')
        }
      }
      return {
        code: 400,
        data: undefined,
        msg: 'username is error',
        status: false,
        timestamp: Random.date('T')
      }
    }
  },
  {
    url: '/api/createUser',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: Mock.mock({
          'list|4': [
            {
              id: '@id',
              name: '@cname',
              age: Random.integer(1, 100),
              address: '@county',
              city: '@city',
              province: '@province',
              email: Random.email(),
              phone: /^1[0-9]{10}$/,
              regin: '@region',
              url: '@url',
              date: Random.date('yyyy-MM-dd')
            }
          ]
        })
      }
    }
  }
] as MockMethod[]
