<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="content" 
           ref="scroll" 
           @scroll="contentScroll" 
           :probe-type="3">
           
     <detail-swiper :top-images="topImages"></detail-swiper>
     <detail-base-info :goods="goods"></detail-base-info> 
        <detail-shop :shop="shop"></detail-shop> 
               <detail-goods-info :detail-info="detailInfo"  @imgLoad="imageLoad"></detail-goods-info>

         <detail-param-info :param-info="paramInfo" ref="params" ></detail-param-info>
  
    

      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
<goods-list :goods="recommends" ref="recommends"/>

</scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />

<detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
<toast :message="message" :isshow="isShow" ref="toast"></toast>
  </div>
</template>

<script>
import DetailNavBar from './childCops/DetailNavBar';  //详情页导航栏组件
import DetailSwiper from './childCops/DetailSwiper';

import DetailBaseInfo from './childCops/DetailBaseInfo'
import DetailShop from  './childCops/DetailShopInfo'
import DetailGoodsInfo from './childCops/DetailGoodsInfo.vue'
import DetailParamInfo from './childCops/DetailParamInfo';

import DetailCommentInfo from './childCops/DetailCommentInfo';
import GoodsList from "components/content/good/GoodsList";
import DetailBottomBar from './childCops/DetailBottomBar';
import BackTop from "components/content/backTop/BackTop";
import Toast from "components/common/toast/Toast"

import Scroll from 'components/common/scroller/Scroll'
import {getDetail, Goods , Shop, getRecommend} from 'network/detail';//获取详情页网络请求
import { debounce } from "common/untils";
import {itemListenerMixin,isShowBackTop} from '@/common/mixin' //导入混入中的代码


export default {
  name:"",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShop,
    Scroll,
    DetailGoodsInfo,
      DetailParamInfo,
    DetailCommentInfo,
   
  GoodsList, 
  DetailBottomBar,
  BackTop,
  Toast
  },
  mixins:[itemListenerMixin,isShowBackTop],
  data() {
    return {
      iid:null,
      topImages:[],
        goods:{},
     shop:{},
     detailInfo:{},
     paramInfo:{},
     commentInfo:{},
     recommends:[],
     themeTopys:[],
     getThemeTopY:null,
     currentIndex:0,
    message:'',
    isShow:false
    };
  },
  created() {
    this.iid=this.$route.params.iid
    getDetail(this.iid).then(res=>{
// console.log(res.result)
      const data = res.result
      // 轮播图图片信息
      this.topImages=data.itemInfo.topImages
    
          this.itemInfo = data.itemInfo
      // 商品信息
      this.goods =new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 店铺信息
      this.shop =new Shop(data.shopInfo)
      // 商品详情数据
      this.detailInfo=data.detailInfo
   
    // 商品参数
      this.paramInfo=data.itemParams  


      // 获取评论信息  
      if(data.rate.cRate !=0){
        this.commentInfo=data.rate.list[0]
      
      }
      // 顶部导航定位
    this.getThemeTopY=debounce(()=>{
     this.themeTopys=[]
      this.themeTopys.push(0)
      this.themeTopys.push(this.$refs.params.$el.offsetTop)
      this.themeTopys.push(this.$refs.comment.$el.offsetTop)
      this.themeTopys.push(this.$refs.recommends.$el.offsetTop)
            this.themeTopys.push(Number.MAX_VALUE)  //js中可以输出的最大值

      // console.log(this.themeTopys)
      },500)
  
  }) 
  getRecommend().then(res=>{
    // console.log(res)
    this.recommends=res.data.list
   })
  },
    mounted() {
    // 1、图片加载完成的事件监听
    // debounce防抖函数
    // const refresh = debounce(this.$refs.scroll.refresh, 50);
    // this.$bus.on("detailItemImageLoad", () => {
    //   refresh();
    // });
        
  },
    destroyed(){
       //离开页面,取消全局鉴定组件取消全局监听事件
this.$bus.off('itemImgLoad',this.itemImgListener) 
  },
  methods: {
    //滚动到哪对应相应标题
     contentScroll(position){
    // this.isShowBackTop=position.y<-500;
   const positionY = -position.y
   let length = this.themeTopys.length
   for(let i=0;i<length-1;i++){
     if(this.currentIndex !== i&&(positionY >=this.themeTopys[i]&&positionY<this.themeTopys[i+1])){
      this.currentIndex= i
      this.$refs.detailNav.currentIndex=this.currentIndex
     }
   }
    this.isShowBackTop=position.y<-1000;
  },
  titleClick(index){ 
   
 this.$refs.scroll.scrollTo(0,-this.themeTopys[index],500)
  },
      imageLoad(){
        console.log(this)
     this.newRefresh()
      //3、第三次获取
      // this.$nextTick(()=>{    //this.$nextTick,当页面加载完成后进行回调
      //根据最新数据，Dom已经加载完了，但图片还没有加载完成
      // 等图片全部加载完再推进数组
      this.getThemeTopY() 
  },
  // 获取商品信息
   addCart(){
    const product={}
    product.image = this.topImages[0];
    product.title = this.goods.title;
    product.desc =this.goods.desc;
    product.iid=this.iid;
    product.price=this.goods.realPrice
    // console.log(this.$store);
// this.$store.commit('addCart',product)
    this.$store.dispatch('addCart',product).then(res=>{

     
      this.message = res
      this.isShow = true
      setTimeout(()=>{
        this.message = ''
      this.isShow = false
      // this.$refs.toast.$el.addClass('fadeIn')
      console.log(this.$refs.toast.$el)
      },2000)
      // console.log(res);
    })  //调用store中的action方法
  
// this.$store.dispatch('addCart',product)
   }
  }
}

</script>
<style scoped>
.detail{
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
   overflow: hidden;
  
}
.detail-nav{
  position: relative;
  top: 0;
  z-index: 9;
 background-color: #fff;

}
 .content{
  background-color: #fff;
   height: calc(100% - 44px - 49px);
   overflow: hidden;
  
}
</style>