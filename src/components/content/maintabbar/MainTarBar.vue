<template>

    <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/首页.png" alt />
        <img slot="item-icon-active" src="~assets/img/tabbar/首页 (1).png"/>

        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/分类.png" alt />
                <img slot="item-icon-active" src="~assets/img/tabbar/类目 品类 分类 类别.png"/>

        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/购物车 (1).png" alt />
                        <img slot="item-icon-active" src="~assets/img/tabbar/购物车.png"/>

        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/我的 (1).png" alt />
                        <img slot="item-icon-active" src="~assets/img/tabbar/我的 (2).png"/>

        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
 
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style>
@import "~assets/css/base.css";
</style>
