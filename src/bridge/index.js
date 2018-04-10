import WxJSBridge from './WxJSBridge'

class Bridge {
  constructor () {
    return new WxJSBridge()
  }
}
const bridge = new Bridge()
export default bridge
