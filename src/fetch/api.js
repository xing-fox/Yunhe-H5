import axios from 'axios'

// axios 配置
axios.defaults.timeout = 50000

const env = process.env.NODE_ENV
if (env === 'development') {
  axios.defaults.baseURL = 'http://118.25.13.116:8981/mrsyg'
  axios.defaults.withCredentials = true
}

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
      // 401 跳转到登录页面
      // alert(error.response.data.message)
        console.log('error')
    }
  }
  return Promise.resolve(error.response)
})

const buildGetUrl = function (url, params) {
  var result = Object.params(params, true)
  if (result) return url + '?' + result
  return url
}

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios.get(buildGetUrl(url, params)).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

export function post (url, params) {
  let searchParams = new URLSearchParams()
  for (let key in params) {
    searchParams.append(key, params[key])
  }
  return new Promise((resolve, reject) => {
    axios.post(url, searchParams, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default {
  /* ==================== 所有接口信息 ==================== */
  /* 开发环境免登陆接口 */
  LoginInfo () {
    return post('/kquser/Login.form')
  },
  /* 逛逛-每日红人 */
  RecommendAssistant () {
    return post('/kqgoods/RecommendAssistant.form')
  },
  /* 笔记详情页,基本信息，推荐商品 */
  NoteInfoDetails (params) {
    return post('/kqgoods/NoteInfo.form', params)
  },
  /* 逛逛-爱达人-最近笔记 */
  LateNote (params) {
    return post('/kqgoods/LoveNote.form', params)
  },
  /* 逛逛-爱达人-最新笔记 */
  NewNote (params) {
    return post('/kqgoods/NewNote.form', params)
  }
  /* 微信登录认证权限获取接口 */
  // urlPath (params) {
  //   return post('http://xclerk.natappvip.cc/yunhe/uac/wxpubLogin', params)
  // }
}
