// 推荐信息的展示
<template>
  <div class="home-recommend">
    <div class="home-recommend-item" v-for="item in filter(recommends)" :key="item.url">
      <a :href="item.url">
        <img :src="item.image" alt="">
      </a>
    </div>
  </div>


</template>

<script>
    export default {
        name: "HRecommend",
        props:{
            recommends:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        methods:{
            filter() {
                return this.recommends.slice(0,4)
            }
        }
    }
</script>

<style scoped>
  .home-recommend{
    display: flex;
    width: 100%;
    text-align: center;
    padding: 5px;
    border-bottom: 10px solid #eee;
  }

  .home-recommend-item{
    flex: 1;
  }

  .home-recommend-item img{
    width: 70px;
    height: 65px;
    border-radius: 100%;

  }
</style>
