<template>
  <div>
    <nav-bar class="nav-bar" >
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item, index) in titles" :key="index" 
                                          class="title-item"
                                          @click="itemClick(index)">
        <span :class="{active:currentIndex===index}">{{item}}</span>
          
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
export default {
  name: "DetailNavBar",
  created() {},
  data() {
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0,
      
    };
  },
  props: {},
  components:{
   NavBar
  },
  methods: {
    itemClick(index){
      this.currentIndex=index
      this.$emit('titleClick',index)
    },
    backClick(){
      this.$router.back()  //点击返回上一层
    }
  },
};
</script>

<style  scoped>
.nav-bar{
    display: flex;
    background-color: #fff;
    line-height: 44px;
    height: 44px;
}
.back{
  margin-left: 10px;
  width: 66px;
}
.back img{
 margin-top: 12px;
}
.title{
  display: flex;
color: black;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color:#ff8198;
  border-bottom: 2px solid #ff8198;
}
</style>