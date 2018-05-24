<template>
  <div class='praise' @scroll.stop.prevent="scrollFunc" ref="rewardBox">
    <ul>
      <li class="bor-b" v-for="(item, index) in operatorData" :key="index">
        <div class="listImg">
          <img :src="item.customer_picture" alt="">
        </div>
        <div class="listCont">
            <div class="contName">
                <span>{{ item. customer_name}}</span>
            </div>
            <div class="contTime">
              <span>{{ item.created_at }}</span>
              <span v-if="item.operate_type == 'a'">给笔记点了赞</span>
              <span v-if="item.operate_type == 'b'">收藏了该笔记</span>
              <span v-if="item.operate_type == 'd'">打赏了该笔记</span>
            </div>
        </div>
      </li>
    </ul>
    <div class="noMore" v-if="showNoMore">
      <span>小猿数据加载完啦</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Praise',
  data () {
    return {
      operatorData: [],
      flag: true,
      pagNo: 1,
      showNoMore: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'LoadingingStatus'
    ]),
    init () {
      this.LoadingingStatus(true)
      this.$http.NoteOperator({
        data: JSON.stringify({
          'note_id': this.$route.query.note_id,
          'pag_no': this.pagNo,
          'pag_num': 15
        }),
        openid: window.localStorage.getItem('openId') || window.sessionStorage.getItem('openId')
      }).then(response => {
        this.LoadingingStatus(false)
        this.operatorData = this.operatorData.concat(response.content.data)
        if (response.content.data.length < 15) {
          [this.flag, this.showNoMore] = [false, true]
        }
      })
    },
    scrollFunc () {
      if (this.$refs.rewardBox.scrollTop + document.body.clientHeight + 50 > this.$refs.rewardBox.scrollHeight && this.flag) {
        this.pagNo++
        this.commentFlag = false
        this.init()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
  .praise{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 10;
    overflow: scroll;
    left: 0;
    background: #f4f6fa;
    ul{
      font-size: 0;
      width: 100%;
      margin: .09rem 0 0 0;
      background: #fff;
      li{
        padding: .15rem .12rem .15rem 0;
        margin: 0 0 0 .12rem;
        display: flex;
        .listImg{
          width: .35rem;
          height: .35rem;
          border-radius: .18rem;
          overflow: hidden;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .listCont{
          flex: 1;
          margin: 0 0 0 .08rem;
          .contName{
            color: #333;
            font-size: .13rem;
            line-height: .175rem;
          }
          .contTime{
            color: #777;
            font-size: .12rem;
            line-height: .2rem;
            span{
              margin: 0 .05rem 0 0;
            }
          }
        }
        &:nth-last-child(1):after{
          content: none;
        }
      }
    }
    .noMore{
      color: #333;
      font-size: .14rem;
      line-height: .4rem;
      width: 100%;
      text-align: center;
    }
  }
</style>
