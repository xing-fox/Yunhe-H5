export default class dataBase {
  get (key) {
    return window.localStorage.getItem(key).parseJSON()
  }
  set (key, value) {
    let obj = value.constructor === Object ? JSON.parse(value) : value
    return window.localStorage.setItem(key, obj)
  }
}
