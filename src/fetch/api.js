import axios from 'axios'

// axios 配置
axios.defaults.timeout = 50000

const env = process.env.NODE_ENV
if (env === 'development') {
  // axios.defaults.baseURL = 'http://118.25.13.116:8981/mrsyg' // 本地测试
  // axios.defaults.baseURL = 'http://www.xclerk.com' // 生产服务器
  axios.defaults.baseURL = 'http://test.xclerk.com' // 测试服务器
  // axios.defaults.baseURL = 'http://xclerk.natappvip.cc' // 本机测试
  // axios.defaults.baseURL = 'http://localhost:8080/xclerk' // 本地测试
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
  /* 接口登录 */
  Wxlogin (params) {
    return post('/yunhe/wechat/login/wxpublogin', params)
  },
  /* 微信分享获取注入信息 */
  WxgetJs (params) {
    return post('/yunhe/wechat/getJsAuthority', params)
  },
  /* 最热笔记 */
  HotNote (params) {
    return post('/yunhe/wechat/note/hotNote', params)
  },
  /* 笔记详情页,基本信息，推荐商品 */
  NoteInfoDetails (params) {
    return post('/yunhe/wechat/note/noteDetail', params)
  },
  /* 笔记详情页,评论详情 */
  commentDetail (params) {
    return post('/yunhe/wechat/note/commentDetail', params)
  },
  /* 笔记进行点赞,打赏,收藏过该笔记的人 */
  NoteOperator (params) {
    return post('/yunhe/wechat/note/noteOperator', params)
  },
  /* 逛逛-爱达人-最近笔记 */
  LateNote (params) {
    return post('/yunhe/wechat/note/loveNote', params)
  },
  /* 逛逛-爱达人-最新笔记 */
  NewNote (params) {
    return post('/yunhe/wechat/note/newNote', params)
  },
  /* 逛逛-爱达人-点赞笔记 */
  zanNewNote (params) {
    return post('/yunhe/wechat/like/like', params)
  },
  /* 逛逛-爱达人-点赞笔记评论 */
  zanCommitNewNote (params) {
    return post('/yunhe/wechat/like/commentlike', params)
  },
  /* 逛逛-爱达人-收藏笔记 */
  storeNewNote (params) {
    return post('/yunhe/wechat/collection/collectionNote', params)
  },
  /* 逛逛-爱达人-打赏笔记 */
  rewardNewNote (params) {
    return post('/yunhe/wechat/reward/givereward', params)
  },
  /* 逛逛-爱达人-打赏笔记确定 */
  rewardSureNewNote (params) {
    return post('/yunhe/wechat/reward/surereward', params)
  },
  /* 我的优惠券 */
  MyCoupon (params) {
    return post('/yunhe/wechat/customer/mycoupon', params)
  },
  /* 附近门店 */
  NearByStore (params) {
    return post('/yunhe/wechat/shop/goodShop', params)
  },
  /* 微信手机号绑定 */
  bindPhone (params) {
    return post('/yunhe/wechat/login/registerwxpub', params)
  },
  /* 手机验证码 */
  getIdentifyCode (params) {
    return post('/yunhe/wechat/login/getIdentifyCode', params)
  },
  /* 发表评论 */
  publishcomment (params) {
    return post('/yunhe/wechat/comment/publishcomment', params)
  },
  /* 我的页面 */
  customerInfo (params) {
    return post('/yunhe/wechat/customer/customerinfo', params)
  },
  /* 微聊 */
  talklist (params) {
    return post('/talk/default/gueryTalkDefaultlist', params)
  },
  /* 常见问题 */
  questionlist (params) {
    return post('/talk/gueryTalkDefaultlist', params)
  },
  /** 移动业务 */
  mobileContractlist (params) {
    return post('yunhe/wechat/mobileContract/queryMobileContractByCityCode', params)
  },
  /** 充值 */
  getMoneylist (params) {
    return post('yunhe/wechat/order/rechargeList', params)
  },
  /** 判断运营商 */
  judgePhoneNum (params) {
    return post('yunhe/wechat/order/phoneList', params)
  },
  /** 根据openid获取手机号 */
  getPhoneNumByOpenid (params) {
    return post('yunhe/wechat/customer/customerinfocheck', params)
  },
  /** 创建订单 */
  createOrder (params) {
    return post('yunhe/wechat/order/addrechargeorder', params)
  },
  /** 支付 */
  pay (params) {
    return post('yunhe/wechat/payment/paymyorder', params)
  },
  /* 所有商品详情 */
  Goodsinfo (params) {
    return post('/yunhe/wechat/good/goodinfo', params)
  },
  /* 商品详情图文介绍 */
  Goodsdescribe (params) {
    return post('/yunhe/wechat/good/goodsdescribe', params)
  },
  /* 商品详情产品规格 */
  Selectparameter (params) {
    return post('/yunhe/wechat/good/selectparameter', params)
  },
  /* 商品详情产品规格选择 */
  Productdetail (params) {
    return post('/yunhe/wechat/good/productdetail', params)
  },
  /* 商品详情参数描述 */
  Goodsparameter (params) {
    return post('/yunhe/wechat/good/goodsparameter', params)
  },
  /* 添加购物车 */
  addCart (params) {
    return post('/yunhe/wechat/cart/addCart', params)
  }
}
