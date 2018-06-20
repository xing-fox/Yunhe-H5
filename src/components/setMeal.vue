<template>
  <div class="page">
    <div class="pageContent" :class="{fadeInUp: animalClassfadeIn,animated: animalClassfadeIn,animated: animalClassfadeOut,fadeOutDown: animalClassfadeOut}">
      <!-- <scroll-view scroll-y class="mealContent"> -->
      <div class="mealContent">
        <div class="product bor-1px-b">
          <img class="proImg" :src="proList.goodPictures[0].picture_url">
          <div class="proIntro">
            <div class="Name">{{ proList.product_name }}</div>
            <div class="content"></div>
            <div class="price">¥{{ proList.price_new }} <span>{{ proList.price_old }}</span> </div>
          </div>
        </div>
        <div class="specList" v-if="dataList.colorinfo[0]">
          <div class="listTitle">颜色：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.colorinfo" :key="index" class="categoryList" :class="{active: colorIndex === index}" @click="specFunc(1, index, item.color_id)">{{ item.color_name }}</div>
          </div>
        </div>
        <div class="specList" v-if="dataList.memoryinfo[0]">
          <div class="listTitle">容量：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.memoryinfo" :key="index" class="categoryList" :class="{active: memoryIndex === index}" @click="specFunc(2, index, item.memory_id)">{{ item.memory_name }}</div>
          </div>
        </div>
        <div class="specList" v-if="dataList.supplierinfo[0]">
          <div class="listTitle">供应商：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.supplierinfo" :key="index" class="categoryList" :class="{active: supplierIndex === index}" @click="specFunc(3, index, item.supplier_id)">{{ item.supplier_name }}</div>
          </div>
        </div>
        <div class="specList" v-if="dataList.contractinfo[0]">
          <div class="listTitle">套餐：</div>
          <div class="listCategory">
            <div v-for="(item, index) in dataList.contractinfo" :key="index" class="categoryList" :class="{active: contractIndex === index}" @click="specFunc(4, index, item.contract_id)">{{ item.contract_name }}</div>
          </div>
        </div>
        <div class="choiseCount">
          <span class="countTitle">选择数量：</span>
          <div class="countContent">
            <span class="contIcon iconMinus" @click="minusFunc"></span>
            <span class="contNum">{{ totalCount }}</span>
            <span class="contIcon iconPlus" @click="plusFunc"></span>
          </div>
        </div>
      </div>
      <!-- </scroll-view> -->
      <div class="submit" @click="submitFunc">
        <span>确定</span>
      </div>
    </div>
    <div class="zzc" @click="pageFunc"></div>
  </div>
</template>
<script>
export default {
  props: {
    typeIndex: {
      type: [Number, String],
      default: 0
    },
    dataList: {
      type: Object
    },
    proList: {
      type: Object
    },
    contId: {
      type: [String, Number],
      default: ''
    },
    detailId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      openId: '',
      colorIndex: 0,
      memoryIndex: 0,
      supplierIndex: 0,
      contractIndex: 0,
      totalCount: 1,
      contractId: '',
      animalClassfadeIn: true,
      animalClassfadeOut: false,
      telState: false
    }
  },
  methods: {
    specFunc (cate, index, id) {
      if (cate === 1) {
        this.colorIndex = index
      }
      if (cate === 2) {
        this.memoryIndex = index
      }
      if (cate === 3) {
        this.supplierIndex = index
      }
      if (cate === 4) {
        this.contractId = id
        this.contractIndex = index
      }
      this.$emit('changeSpec', {
        id: id,
        cate: cate
      })
    },
    pageFunc (e) {
      this.animalClassfadeIn = false
      setTimeout(() => {
        this.animalClassfadeOut = true
      }, 0)
      setTimeout(() => {
        this.$emit('changeState')
      }, 300)
    },
    minusFunc () {
      if (this.totalCount === 1) {
        return this.$toast('商品数量不能小于1', {
          icon: 'none',
          duration: 2000,
          mask: true
        })
      } else {
        this.totalCount--
      }
    },
    plusFunc () {
      this.totalCount++
    },
    submitFunc () {
      let self = this
      self.openId = 'o4FLT1Qmvvw7sWpGlvx-2jYALS1Y'
      if (self.typeIndex === 0) {
        window.location.href = '/pages/confirm/main?proNum=' + self.totalCount + '&detailId=' + self.detailId + '&contractId=' + self.contractId
      }
      if (self.typeIndex === 1) {
        self.$http.addCart({
          data: JSON.stringify({
            product_detail_id: self.detailId,
            product_number: self.totalCount,
            product_price: self.proList.price_new,
            contract_id: self.contractId
          }),
          'openid': self.openId
        }).then(res => {
          if (res.code === 'E00000') {
            self.pageFunc()
            return this.$toast(res.content, {
              icon: 'none',
              duration: 1000,
              mask: true
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .page{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    .pageContent{
      width: 100%;
      height: 4.2rem;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 10;
      .mealContent{
        width: 100%;
        height: 3.6rem;
        padding: 0 0 .1rem 0;
        background: #fff;
        position: absolute;
        bottom: .5rem;
        left: 0;
        right: 0;
        top: 0;
        overflow:scroll;
        overflow-y:auto;
        .product{
          padding: .2rem 0;
          margin: 0 0 0 .12rem;
          display: flex;
          border-bottom: 1px solid #ccc;
          .proImg{
            width: .8rem;
            height: .8rem;
            border: 1px solid #ccc;
            box-sizing: border-box;
          }
          .proIntro{
            flex: 1;
            margin: 0 .05rem 0 .12rem;
            .Name{
              color: #333;
              font-size: .16rem;
            }
            .content{
              color: #777;
              font-size: .12rem;
              height: .32rem;
              line-height: .16rem;
              margin: 0 0 .02rem 0;
            }
            .price{
              color: #ff5959;
              font-size: .16rem;
              span{
                color: #999;
                font-size: .1rem;
                text-decoration:line-through;
              }
            }
          }
        }
        .specList{
          font-size: 0;
          margin: 0 .12rem 0 .12rem;
          display: flex;
          .listTitle{
            color: #777;
            font-size: .13rem;
            width: .55rem;
            line-height: .25rem;
            text-align: center;
            margin: .2rem 0 0 0;
          }
          .listCategory{
            flex: 1;
            .categoryList{
              display: inline-block;
              color: #333;
              font-size: .13rem;
              padding: 0 .18rem;
              margin: .2rem 0 0 .2rem;
              background: #eee;
              border-radius: 4px;
              height: .25rem;
              line-height: .25rem;
              &.active{
                color: #333;
                background: #ffda44;
              }
            }
          }
        }
        .choiseCount{
          margin: .2rem .12rem 0 .12rem;
          display: flex;
          .countTitle{
            flex: 1;
            color: #777;
            font-size: .13rem;
            height: .3rem;
            line-height: .3rem;
          }
          .countContent{
            text-align: center;
            border-radius: 3px;
            overflow: hidden;
            margin-top: -.52rem;
            .contIcon{
              display: inline-block;
              width: .3rem;
              height: .3rem;
              background: #f5f5f5;
              vertical-align: middle;
              &.iconMinus{
                background-image: url('../images/icon/icon_minus.png');
                background-size: 40% 40%;
                background-repeat: no-repeat;
                background-position: center center;
              }
              &.iconPlus{
                background-image: url('../images/icon/icon_add.png');
                background-size: 40% 40%;
                background-repeat: no-repeat;
                background-position: center center;
              }
            }
            .contNum{
              display: inline-block;
              min-width: .3rem;
              height: .3rem;
              line-height: .3rem;
              color: #999;
              font-size: .13rem;
              margin: 0 -.22rem;
              background: #f5f5f5;
              vertical-align: middle;
            }
          }
        }
      }
      .submit{
        color: #222;
        font-size: .16rem;
        width: 100%;
        height: .5rem;
        line-height: .5rem;
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #ffda44;
      }
    }
    .zzc{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 1;
      background-color: rgba(0,0,0, .5);
    }
  }
</style>
