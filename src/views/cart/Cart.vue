<template>
  <div class="cart">
     <nav-bar class="cart-bar">
      <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
      <scroll class="content" ref="scroll">
      <cart-list ></cart-list>
      </scroll>
    <cart-buttom-bar></cart-buttom-bar>

  </div>
</template>

<script>
  // 导入子组件
import CartList from './childCops/CartList.vue'
import CartButtomBar from './childCops/CartButtomBar.vue'

// 导入公共组件
import Scroll from 'components/common/scroller/Scroll'
import navBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex';   //mapGetters vuex自带属性
export default {
  name: "Cart",
  components:{
  navBar,
  Scroll,
  CartList,
  CartButtomBar
  },
  data() {
    return { 
    };
  },
  computed:{
...mapGetters(['cartLength'])  },
  props: {},
  methods: {},
  activated() {   //当购物车中添加数据后，刷新可滚动区域
    this.$refs.scroll.refresh()
  },
};

</script>

<style  scoped>
.cart{
  position: relative;
  left: 0;
  height: 100vh;
}
.cart-bar{
  height: 44px;
  background-color: #ff8198;
  color: #fff;
  text-align: center;
  line-height: 44px;
}
.content{

height: calc(100% - 44px - 49px - 40px);
background-color:#fff;
overflow: hidden;

}
</style>