<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
        <img :src="item" alt="">   <!--向获取item src前面要带： -->
      </swiper-item>
    </swiper>

  </div>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper';
export default {
  name: "DetailSwiper",
  created() {},
  data() {
    return {};
  },
  props: {
    topImages:{
      type:Array,
      defaule(){
        return []
      }
    }
  },
  components:{
Swiper,
SwiperItem
  },
  methods: {},
};
</script>

<style scoped>
.swiper-item{
  height: 500px;
  overflow: hidden;
}

  </style>