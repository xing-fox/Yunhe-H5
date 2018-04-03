import WxJSBridge from './WxJSBridge'

class Bridge {
  constructor () {
    let ua = navigator.userAgent.toLowerCase()
    if (/micromessenger/.test(ua)) {
      return new WxJSBridge()
    }
  }
}
const bridge = new Bridge()
export default bridge
