webpackJsonp([3],{"81OW":function(t,a){},FlBR:function(t,a){},L8Y5:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("mvHQ"),s=e.n(i),n=e("Dd8w"),l=e.n(n),o=e("9rMa"),A={props:{list:{type:Array,required:!0},column:{type:Number,default:2},height:{type:Number,default:800}},data:function(){return{itemWidth:0,columnData:[]}},watch:{list:function(t){var a=this;this.renderList(),setTimeout(function(){a.renderList()},500)}},mounted:function(){var t=this;this.renderList(),setTimeout(function(){t.renderList()},500)},methods:{renderList:function(){var t=this;this.row||(this.columnData=[],this.$nextTick(function(){for(var a=t.$refs.container.getElementsByClassName("column-item"),e=0;e<a.length;e++)t.setElementStyle(a[e],t.list[e],e)}))},setElementStyle:function(t,a,e){var i=this;setTimeout(function(){e<i.column?(t.style.left=e*(100/i.column)+"%",t.style.top="0px",i.$nextTick(function(){i.columnData[e]=i.$refs.container.getElementsByClassName("column-item")[e].offsetHeight+10})):i.columnData[0]<i.columnData[1]?(t.style.left="0",t.style.top=i.columnData[0]+"px",i.$nextTick(function(){i.columnData[0]+=i.$refs.container.getElementsByClassName("column-item")[e].offsetHeight+10})):(t.style.left=100/i.column+"%",t.style.top=i.columnData[1]+"px",i.$nextTick(function(){i.columnData[1]+=i.$refs.container.getElementsByClassName("column-item")[e].offsetHeight+10}))},0)}}},c={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{ref:"container",staticClass:"waterfall-wrap"},[t._l(t.list,function(a,s){return i("div",{key:s,staticClass:"column-item"},[i("router-link",{attrs:{to:{path:"/stroll/details",query:{note_id:a.note_id}}}},[i("img",{attrs:{src:a.picture_url,alt:""}}),t._v(" "),i("div",{staticClass:"item-title boxOrent"},[t._v(t._s(a.note_name))]),t._v(" "),i("div",{staticClass:"item-content boxOrent"},[t._v(t._s(a.note_desc))]),t._v(" "),i("div",{staticClass:"item-slef"},[i("img",{staticClass:"imgSelf",attrs:{src:a.customer_picture,alt:""}}),t._v(" "),i("span",{staticClass:"selfName"},[t._v(t._s(a.customer_name))]),t._v(" "),i("img",{staticClass:"imgZan",attrs:{src:e("eEZJ"),alt:""}}),t._v(" "),i("span",{staticClass:"selfCount"},[t._v(t._s(a.note_like_total))])])])],1)})],2)},staticRenderFns:[]};var r={name:"index",data:function(){return{pagNo:1,openId:"",tableFlag:!0,hotData:Object,listTotalNum:"",listData:[],listDataState:!1,listDataflag:!1}},components:{WaterFall:e("VU/8")(A,c,!1,function(t){e("FlBR")},"data-v-1cebec1b",null).exports},created:function(){this.LoadingingStatus(!0);var t=this;t.$http.Wxlogin({code:this.$route.query.code||""}).then(function(a){t.openId=a.content.pub_openid,window.localStorage.setItem("openId",a.content.pub_openid)}).then(function(){t.$http.HotNote({openid:t.openId}).then(function(a){t.hotData=a.content}),t.NewDataFunc(!1)})},mounted:function(){},methods:l()({},Object(o.b)(["LoginingStatus","LoadingingStatus"]),{NewDataFunc:function(t){var a=this;if(this.LoadingingStatus(!0),t&&this.tableFlag)return!1;this.pagNo=this.tableFlag?this.pagNo:1,this.listData=this.tableFlag?this.listData:[],this.tableFlag=!0,this.$http.NewNote({data:s()({city_code:"",customer_id:"",pag_no:this.pagNo,pag_num:8}),openid:this.openId}).then(function(t){a.LoadingingStatus(!1),t.content.noteinfo.map(function(t,a){var e=t.picture_url.lastIndexOf("/")+1;t.picture_url=t.picture_url.substring(0,e)+"2x_"+t.picture_url.slice(e)}),a.listData=a.listData.concat(t.content.noteinfo),a.listTotalNum=t.content.note_sum.note_sum,a.listDataflag=!1,a.listData.length>=a.listTotalNum&&(a.listDataState=!0)})},LatestDataFunc:function(t){var a=this;if(this.LoadingingStatus(!0),t&&!this.tableFlag)return!1;this.pagNo=this.tableFlag?1:this.pagNo,this.listData=this.tableFlag?[]:this.listData,this.tableFlag=!1,this.$http.LateNote({data:s()({city_code:"",customer_id:"",pag_no:this.pagNo,pag_num:8}),openid:this.openId}).then(function(t){a.LoadingingStatus(!1),a.listData=a.listData.concat(t.content.noteinfo),a.listTotalNum=t.content.note_sum.note_sum,a.listDataflag=!1,a.listData.length>=a.listTotalNum&&(a.listDataState=!0)})},scrollFunc:function(){this.$refs.indexBox.scrollTop+document.body.clientHeight+50>this.$refs.indexBox.scrollHeight&&!this.listDataState&&!this.listDataflag&&(this.pagNo++,this.listDataflag=!0,this.tableFlag?this.NewDataFunc(!1):this.LatestDataFunc(!1))}}),watch:{$route:function(t,a){}}},u={render:function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("div",{staticClass:"index"},[i("div",{ref:"indexBox",staticClass:"indexContent",on:{scroll:function(a){return a.stopPropagation(),a.preventDefault(),t.scrollFunc(a)}}},[i("div",{attrs:{id:"header"}},[i("div",{staticClass:"manInfo"},[i("img",{attrs:{src:t.hotData.customer_picture,alt:""}}),t._v(" "),i("span",[t._v(t._s(t.hotData.customer_name))])]),t._v(" "),i("img",{staticClass:"hotImg",attrs:{src:e("ohMp"),alt:""}})]),t._v(" "),i("div",{attrs:{id:"main"}},[t.hotData.notePictureMap?i("ul",t._l(t.hotData.notePictureMap.notepicture,function(t,a){return i("li",{key:a},[i("router-link",{attrs:{to:{path:"/stroll/details",query:{note_id:t.note_id}}}},[i("img",{attrs:{src:t.picture_url,alt:""}})])],1)})):t._e(),t._v(" "),i("div",{staticClass:"hotProduct"},[i("div",{staticClass:"proTitle"},[i("span",[t._v(t._s(t.hotData.note_name))])]),t._v(" "),i("div",{staticClass:"proContent boxOrent"},[i("span",[t._v(t._s(t.hotData.note_desc))])])])]),t._v(" "),i("div",{attrs:{id:"content"}},[i("ul",{staticClass:"contTop"},[i("li",{on:{click:function(a){t.NewDataFunc(!0)}}},[i("span",{class:{active:t.tableFlag}},[t._v("最新的")])]),t._v(" "),i("li",{on:{click:function(a){t.LatestDataFunc(!0)}}},[i("span",{class:{active:!t.tableFlag}},[t._v("附近的")])])]),t._v(" "),i("div",{staticClass:"listTotal"},[t.listTotalNum?i("span",[t._v("全部"+t._s(t.listTotalNum)+"篇笔记")]):t._e(),t._v(" "),i("img",{staticClass:"imgRefresh",attrs:{src:e("z2sD"),alt:""}})]),t._v(" "),t.listData?i("div",{staticClass:"options"},[i("WaterFall",{attrs:{list:t.listData}})],1):t._e()])]),t._v(" "),i("router-view")],1)},staticRenderFns:[]};var g=e("VU/8")(r,u,!1,function(t){e("81OW")},"data-v-eaf4bbb6",null);a.default=g.exports},ohMp:function(t,a){t.exports="data:image/png;base64,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"},z2sD:function(t,a){t.exports="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABHAAD/4QMtaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0EyQ0UxRTIyQThGMTFFOEIzQjJCNUY5QjQyMDEwOTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0EyQ0UxRTMyQThGMTFFOEIzQjJCNUY5QjQyMDEwOTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjBCNkJFMTJBOEMxMUU4QjNCMkI1RjlCNDIwMTA5NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNjBCNkJFMjJBOEMxMUU4QjNCMkI1RjlCNDIwMTA5NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv/uAA5BZG9iZQBkwAAAAAH/2wCEAAQDAwMDAwQDAwQGBAMEBgYFBAQFBgcGBgYGBgcKBwgICAgHCgoLDAwMCwoMDAwMDAwRERERERMTExMTExMTExMBBAQECAcIDgoKDhQODg4UFBMTExMUExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTExMTE//AABEIAB4AIAMBEQACEQEDEQH/xABtAAACAgMAAAAAAAAAAAAAAAABBQYHAAIIAQEBAQAAAAAAAAAAAAAAAAAAAQIQAAICAQQBAgQGAwAAAAAAAAECAwQFABESBiFRgUGhMhMxYXEiFQdiIxQRAQEBAQAAAAAAAAAAAAAAAAARASH/2gAMAwEAAhEDEQA/AOt7HfFvU6kHXazT57IvNFBTn2X/AJ/ssUeWfiTso23A3863WY3i/r+C+Pv9ryFnM3H8uhleCsh+IjjiK7D39hpCsk6DDjwZ+qZGziLi+Uj+689Vz6SRyltx7+2rCmHWew2Mk9nE5iEVOw48gW4FP+uRG+maIn8Vb5aZoTj+saP8zeyy5O3XS7I8jV6jCvsJG5shcbkry87DbUhU5UBVCjcgADckk+PUnWkHQIchg55uzYrsFN0jNZJ619W3DTV5F3RRsPPF/PnUilcVpuvd2tVrzlcZ2FYpaMrk8EtwqI3i3PgFxsR7DUEy1pAYEqQp2Yg7HbfY+u2gpy/kOyU88b8Gbs5fG4Sav/LSoogrF5ZQjQpFESrEKf3emsNLI7YvXWw0q9nZUxpZQHPLmsh+kxcAW5D/ABHy31rUwkpU+8Ua8ZwuSr5XGsAYFzEM8FpE+ALAKxP5uBqdAv0+63qsjZ7JQYrFKpNiPDwzz2Xj+I5EMw/VAdA96oOvLhYF6wyPiwSFZN+RcfUZOYDcvXkPlq4P/9k="}});
//# sourceMappingURL=3.67f34951ed1272d2162a.js.map