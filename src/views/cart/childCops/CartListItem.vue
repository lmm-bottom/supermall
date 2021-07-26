<template>
  <div id="shop-item">
    <div class="item-selector"> 
      <!-- native自定义的监听组件点击事件 -->
        <check-button :is-checked="cartItem.isChecked" @click.native="CheckedClick"></check-button>  
     </div> 
    <div class="item-img">
      <img :src="cartItem.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{cartItem.title}}</div>
      <div class="item-desc">{{cartItem.desc}}</div>
      <div class="item-bottom">
        <div class="item-price left">{{cartItem.price}} </div>
       <div class="item-count right">×{{cartItem.count}} </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton'

export default {
  name: "CartListItem",
  props:{
   cartItem:{
    type:Object,
     default(){
      return {}
    }
}
  },
  components:{
  CheckButton
  },

  computed:{},
  methods: {
    CheckedClick(){
      return this.cartItem.isChecked =! this.cartItem.isChecked
    }
  },
}
</script>

<style scoped>
#shop-item{
  width: 100%;
  /* 弹性布局 */
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  /* align-items定义项目在交叉轴上如何对齐 */
  align-items:center;
}
.item-title, .item-desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img{
  padding: 5px;
}
.item-img img{
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info{
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}
.item-info .item-desc{
  font-size: 14px;
  color:#666;
  margin-top: 15px;
}
.info-bottom{
margin-top: 10px;
position: absolute;
bottom: 10px;
left: 10px;
right: 10px;
}
.info-bottom .item-price{
  color: orangered;
}
</style>