<template>
<div class="all">
  <div class="content">
      <div class="business">
          <div class="title">
              <p>常见问题</p>
          </div>
          <div class="qustion">
            <ul class="showlist" >
              <li v-for="(item, index) in datalist" :key="index">
                  <span  @click="show(item)" >{{ item.question }}</span>
                  <div class='back' v-show="item.id == activeIndex">
                    <span>{{ item.answer }}</span>
                  </div>
              </li>
            </ul>
           </div>
      </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Talk',
  data () {
    return {
      activeIndex: 0,
      datalist: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    show (item) {
      this.activeIndex = item.id
    },
    init () {
      let that = this
      this.$http.questionlist({
        data: JSON.stringify({
          'question': null
        })
      }).then(res => {
        if (res.success && res.content) {
          // 所有问题
          that.datalist = res.content
        }
      })
    }
  }
}
</script>
<style  lang='less' scoped>
.active{
  color:blue;
}
.all{
  background: #FFFFFF;
  margin:0;
  padding:0;
  width:100%;
  height:100%;
  .title p{
    font-size: .16rem;
    color: #222222;
    margin: 0 .1rem .1rem;
    padding: 0.1rem 0;
    border-bottom:1px solid #DDDDDD;
  }
  .showlist{
      background: #FFFFFF;
  }
  .showlist h4{
      font-size: .14rem;
      margin: 0;
      color: #333333;
  }
  .showlist li{
      list-sytle-type: none;
      display:block;
      border-bottom-width: 0;
  }
  .showlist li {
      display:block;
      text-decoration:none;
      padding: .1rem;
  }
  .back{
      background: #F5F5F5;
      border-radius: .04rem;
      padding: .1rem;
      margin: .1rem;
  }
  .showlist li  span{
      display: -webkit-box;
      font-size: .13rem;
      color: #5A5A5A;
      line-height: .22rem;
      margin: .01rem;
  }
  .qustion{
      overflow:scroll;
      overflow-y:auto;
      height:600px;
  }
}
</style>
