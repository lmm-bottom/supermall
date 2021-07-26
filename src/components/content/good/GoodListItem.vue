<template>
  <div class="goods-item" @click="goodClick">
    <img v-lazy="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p >{{goodItem.title}}</p>
      <span class="price">{{ goodItem.price}}</span>
      <!-- 收藏数量 -->
      <span class="collect">{{goodItem.cfav}}</span>
    </div>
  </div>

</template>

<script>
  import bus from "./mitt"
    export default {
        name: "GoodListItem",
        props:{
            goodItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed:{
showImg(){
  return this.goodItem.image||this.goodItem.show.img
}
        },
        methods: {
          imgLoad(){
            // 通过事件总线把事件发出去 非父子组件间的通信
          //  console.log(this.$bus)
          // if(this.$route.path.includes('/home')){
          //               this.$bus.emit('homeItemImageLoad')

          // }else if(this.$route.path.includes('/detail'))
          //   this.$bus.emit('detailItemImageLoad')
              this.$bus.emit('itemImageLoad')  
          },
          goodClick(){
this.$router.push('/detail/'+this.goodItem.iid)
          }
        },

    }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    border:3px solid var(--color-tint);
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }

</style>
