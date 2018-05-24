"use strict";

webpackJsonp([5], { Ig5M: function Ig5M(t, s, e) {
    "use strict";
    Object.defineProperty(s, "__esModule", { value: !0 });var i = e("mvHQ"),
        a = e.n(i),
        n = e("dQe3"),
        o = { name: "nearbystore", data: function data() {
        return { pagNo: 1, pagNum: 5, dataList: [], dataFlag: !1 };
      }, created: function created() {
        this.init(), window.localStorage.setItem("shareUrl", location.href.split("#")[0]);
      }, methods: { init: function init() {
          var t = this;this.$http.NearByStore({ data: a()({ pag_no: this.pagNo, pag_num: this.pagNum }), openid: window.localStorage.getItem("openId") || window.sessionStorage.getItem("openId") }).then(function (s) {
            for (var e = 0; e < s.content.shopinfo.length; e++) {
              s.content.shopinfo[e].note_name = n.Base64.decode(s.content.shopinfo[e].note_name), s.content.shopinfo[e].distance = (parseFloat(s.content.shopinfo[e].distance) / 1e3).toFixed(2);
            }t.dataFlag = 5 === s.content.shopinfo.length, t.dataList = t.dataList.concat(s.content.shopinfo);
          });
        }, scrollFunc: function scrollFunc() {
          this.$refs.shopBox.scrollTop + document.body.clientHeight + 50 > this.$refs.shopBox.scrollHeight && this.dataFlag && (this.dataFlag = !1, this.pagNo++, this.init());
        } } },
        r = { render: function render() {
        var t = this,
            s = t.$createElement,
            e = t._self._c || s;return e("div", { staticClass: "index" }, [e("div", { directives: [{ name: "wechat-title", rawName: "v-wechat-title", value: t.$route.meta.title, expression: "$route.meta.title" }] }), t._v(" "), t._m(0), t._v(" "), e("div", { ref: "shopBox", staticClass: "indexBox", on: { scroll: t.scrollFunc } }, [e("ul", t._l(t.dataList, function (s, i) {
          return e("li", { key: i }, [e("div", { staticClass: "list_store bor-b" }, [e("div", { staticClass: "storeImg" }, [e("img", { attrs: { src: s.shop_picture, alt: "" } })]), t._v(" "), e("div", { staticClass: "storeinfro" }, [e("div", { staticClass: "storeName" }, [t._v(t._s(s.shop_name))]), t._v(" "), e("div", { staticClass: "noteContent" }, [s.note_id ? e("router-link", { attrs: { to: { path: "bystore/details", query: { note_id: s.note_id } } } }, [e("i"), e("span", [t._v(t._s(s.note_name))]), t._v(" "), e("div", { staticClass: "icon_right" })]) : t._e()], 1), t._v(" "), e("div", { staticClass: "storeDis" }, [e("span", [t._v("距您 " + t._s(s.distance) + "km")])])])]), t._v(" "), e("div", { staticClass: "list_infro" }, [e("div", { staticClass: "infrotimeaddr" }, [e("div", { staticClass: "addr" }, [e("i"), e("span", [t._v(t._s(s.shop_address))])]), t._v(" "), t._m(1, !0)]), t._v(" "), e("a", { staticClass: "bor-l", attrs: { href: "tel:" + s.shop_mobile } })])]);
        }))]), t._v(" "), e("router-view")], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            s = this._self._c || t;return s("div", { staticClass: "cityName bor-b" }, [s("span", [this._v("当前查看城市："), s("span", { staticClass: "city" }, [this._v("嘉善")])])]);
      }, function () {
        var t = this.$createElement,
            s = this._self._c || t;return s("div", { staticClass: "time" }, [s("i"), s("span", [this._v("周一至周日8:00-19:00")])]);
      }] };var c = e("VU/8")(o, r, !1, function (t) {
      e("YKav");
    }, "data-v-c46c0264", null);s.default = c.exports;
  }, YKav: function YKav(t, s) {} });