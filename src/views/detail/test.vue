<template>
  <div class="">
          <div class="box">
          </div>
        <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import BackTop from "components/content/backTop/BackTop";

import {isShowBackTop} from '@/common/mixin' //导入混入中的代码

export default {
  name:"",
  components: {
      BackTop,
  },
  data() {
    return {
    };
  },
//   混入
  mixins:[isShowBackTop],
   mounted() {
    //    监听下拉条滚动
        window.addEventListener('scroll', this.handleScroll)
 },
 methods: {
        handleScroll() {
    this.isShowBackTop=true;
        }
 }

};
</script>
<style scoped>
.box{
    height: 600px;
    width: 100%;
    /* background-color: green; */
}
</style>