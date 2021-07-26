<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">蘑菇街</div>
    </nav-bar>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="TabClick"
      ref="tabControl1"
      v-show="isTabFixed"/>

    <!-- probe-type对应scroll.vue，3会被当做字符串，加：当做Number类型 -->
    <scroller
      class="home-scroller"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <h-recommend :recommends="lrecommands" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="TabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroller>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import bus from "components/content/good/mitt";

import { getHomeMultiData, getGoodsData } from "network/home";
import { debounce } from "common/untils";
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper"; // 轮播图
import HRecommend from "./childComps/HRecommend";
import FeatureView from "./childComps/HFeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/good/GoodsList";
import Scroller from "components/common/scroller/Scroll";
import BackTop from "components/content/backTop/BackTop";

import {isShowBackTop} from 'common/mixin' //导入混入中的代码

export default {
  name: "Home",
  meta:{
    keepAlive:true
  }
  ,
  components: {
    NavBar,

    HomeSwiper,
    HRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroller,
    BackTop
  },
  // 存储请求过来的数据
  data() {
    return {
      banners: [],
      lrecommands: [],
      goods: {
        pop: { page: 0, list: [] }, //流行,默认第0页，无数据
        new: { page: 0, list: [] }, //新款
        sell: { page: 0, list: [] } //精选
      },
      currentType: "pop",
    
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY:0
    };
  },
    mixins:[isShowBackTop],

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
destroyed() {

},
//保持home离开前的状态
activated() {
this.$refs.scroll.refresh();
this.$refs.scroll.scrollTo(0,this.saveY,0)

},

deactivated() {
 
this.saveY = this.$refs.scroll.scroll.y
 
},
  // 组件创建完发送网络请求
  created() {
    this.getHomeData();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1、图片加载完成的事件监听
    // debounce防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.on("homeItemImageLoad", () => {
      refresh();
    });
  },
  methods: {
    /**
事件监听相关的方法
*/
    // 下拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.refresh();
    },
    // TabControl吸顶
    swiperImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // console.log( this.$refs.tabControl2.$el)
    },
    contentScroll(position) {
      // 判断backTop是否显示
      this.isShowBackTop = -position.y > 1000;
      // 2.决定tabControl是否吸顶(position: fixed)

      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    getHomeData() {
      getHomeMultiData().then(res => {
        //  console.log(res)
        this.banners = res.data.banner.list;
        this.lrecommands = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;

      getGoodsData(type, page).then(res => {
        // console.log(res.data.list)
        // ...语法，将数据一个一个推进list

        this.goods[type].list.push(...res.data.list);
        // console.log(this.goods)
        this.goods[type].page += 1;

        this.$refs.scroll.scroll.finishPullUp();
        // 刷新scroll
      });
    },

    //  流行、新款、精选切换数据
    TabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    }
  }
};
</script>

<!-- scope作用域 加了之后该样式只对当前组件有效-->
<style scope>
#home {
  /* padding-top: 44px; */
  /* vh视口高度 */
  height: 100vh;
  position: relative;
}
.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9; */
}
.tab-control {
  /*两个要混合使用*/
  position: relative;
  /* top: 44px; */
  z-index: 9;
}
.home-scroller {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>