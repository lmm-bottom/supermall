<template>
  <swiper class="home-swiper">
    <swiper-item v-for="item in banners" :key="item.background">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper';
    export default {
        name: "HpmeSwiper",
        props: {
            banners:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        data() {
          return {
            isLoad:false
          }
        },
        components:{
            Swiper,SwiperItem
        },
        methods: {
          imgLoad(){
            // 只需要监听到一张轮播图的高度加载完成就可以了
            if(!this.isLoad){
            this.$emit('swiperImgLoad')
            this.isLoad=true
         } }
        },
    }
</script>

<style scoped>


</style>
