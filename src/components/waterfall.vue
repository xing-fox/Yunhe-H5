<template>
<div class="waterfall-wrap" ref="container">
    <template>
      <div v-for="(item, index) of list"
        :key="index"
        class="column-item">
        <router-link :to="{ path: 'stroll/details', query:{'note_id': item.note_id}}">
          <div class="itemImg">
            <img :src="item.picture_url" alt="">
            <div v-if="item.video_flag == '1'" :class="{imgVedio: item.video_flag == '1'}">
              <img src="../images/icon/play.png" alt="">
            </div>
          </div>
          <div class='item-title boxOrent'>{{ item.note_name }}</div>
          <div class='item-content boxOrent'>{{ item.note_desc }}</div>
          <div class='item-slef'>
            <img class='imgSelf' :src="item.customer_picture" alt="">
            <span class='selfName'>{{ item.customer_name }}</span>
            <div class='zan'>
              <img class='imgZan' @click.stop.prevent="zanFunc(index)" v-if="item.note_like_flag == '1'" src="../images/icon/admire.png" alt="">
              <img class='imgZan' @click.stop.prevent="zanFunc(index)" v-else src="../images/icon/admire_1.png" alt="">
              <span class='selfCount'>{{ item.note_like_total }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </template>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    column: {
      type: Number,
      default: 2
    },
    height: {
      type: Number,
      default: 800
    }
  },
  data () {
    return {
      imgWidth: window.innerWidth * (174 / 375),
      itemWidth: 0,
      columnData: []
    }
  },
  watch: {
    list (val) {
      setTimeout(() => {
        this.renderList()
      }, 0)
    }
  },
  methods: {
    renderList () {
      if (!this.row) {
        this.columnData = []
        const boxes = this.$refs.container.getElementsByClassName('column-item')
        const heightes = this.$refs.container.getElementsByClassName('itemImg')
        for (let i = 0; i < boxes.length; i++) {
          // heightes[i].style.height = `${this.imgWidth * this.list[i].image_info.height / this.list[i].image_info.width}px`
          heightes[i].style.height = `${this.imgWidth / this.list[i].aspect_ratio}px`
          this.setElementStyle(boxes[i], this.list[i], i)
        }
      }
    },
    setElementStyle (element, img, index) {
      if (index < this.column) {
        element.style.left = `${index * (100 / this.column)}%`
        element.style.top = `0px`
        this.columnData[index] = this.$refs.container.getElementsByClassName('column-item')[index].offsetHeight + 10
      } else {
        if (this.columnData[0] < this.columnData[1]) {
          element.style.left = `0`
          element.style.top = `${this.columnData[0]}px`
          this.columnData[0] += this.$refs.container.getElementsByClassName('column-item')[index].offsetHeight + 10
        } else {
          element.style.left = `${(100 / this.column)}%`
          element.style.top = `${this.columnData[1]}px`
          this.columnData[1] += this.$refs.container.getElementsByClassName('column-item')[index].offsetHeight + 10
        }
      }
    },
    zanFunc (arg) {
      if (this.list[arg].note_like_flag === '1') {
        this.list[arg].note_like_flag = '-1'
        this.list[arg].note_like_total = parseInt(this.list[arg].note_like_total) + 1
      } else {
        this.list[arg].note_like_flag = '1'
        this.list[arg].note_like_total = parseInt(this.list[arg].note_like_total) - 1
      }
      this.$http.zanNewNote({
        data: JSON.stringify({
          parameter_id: this.list[arg].note_id,
          operate: 2
        }),
        openid: window.localStorage.getItem('openId')
      }).then(response => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.waterfall-wrap {
  margin: 0 .065rem;
  position: relative;
  .column-item {
    width: 1.74rem;
    position: absolute;
    margin: 0 .035rem;
    font-size: 0;
    background: #fff;
    border-radius: .05rem;
    overflow: hidden;
    box-sizing: border-box;
    transition: all 0.3s ease;
    border: 1px solid #ddd;
    .itemImg{
      width: 100%;
      position: relative;
      img {
        width: 100%;
      }
      .imgVedio{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.6);
        img{
          width: 30%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto auto;
        }
      }
    }
    .item-title{
      color: #222;
      font-size: .14rem;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: .11rem .02rem .05rem .08rem;
    }
    .item-content{
      color: #999;
      font-size: .12rem;
      line-height: .17rem;
      display: -webkit-box;
      word-break: break-all;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin: 0 .03rem .1rem .08rem;
    }
    .item-slef{
      width: 100%;
      line-height: .2rem;
      margin: .2rem 0;
      position: relative;
      display: flex;
      .imgSelf{
        width: .2rem;
        height: .2rem;
        margin: 0 .04rem 0 .05rem;
        border-radius: .1rem;
      }
      .zan{
        flex: 1;
        text-align: right;
        margin: 0 .1rem 0 0;
        .imgZan{
          display: inline-block;
          width: .15rem;
          height: .16rem;
          vertical-align: middle;
        }
        .selfCount{
          display: inline-block;
          color: #999;
          font-size: .12rem;
          margin: 0 0 0 .05rem;
          vertical-align: middle;
        }
      }
      .selfName{
        color: #222;
        font-size: .1rem;
        width: .8rem;
        height: .2rem;
        display: -webkit-box;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
