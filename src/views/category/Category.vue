<template>
<div class="cate">
  <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
  
  <div class="cateContent">

  <left-nav class="left-nav"
  :categories="categories"
  :leftNavClick="leftNavClick"
  >
  </left-nav>
 
  <div class="right">
    <scroller> 
    
      </scroller>
    </div></div>
   </div>
  
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import LeftNav from './LeftNav'
import Scroller from "components/common/scroller/Scroll";

  import {getCategory, getSubCategory, getCategoryDetail} from "network/leftNav";
    export default {
        name: "Category",
        components:{
          LeftNav,
          NavBar,
          Scroller
        },
        data() {
          return {
            categories:[],
            categoryData: {
        },
        currentIndex: -1
          }
        },
        created() {
          // 请求左侧导航栏数据
          this.LgetCategory()
        },
        computed:{

        },
        methods: {
          LgetCategory(){
getCategory().then(res=>{
  // console.log(res)
  this.categories=res.data.category.list
  for(let i=0;i<this.categories.length;i++){
    this.categoryData[i]={
subcategories:{},
 categoryDetail: {
                'pop': [],
                'new': [],
                'sell': []
              }
    }
  }
            this.LgetSubcategories(0)

})
          },
          // 请求大的分类数据：上衣，裤子
LgetSubcategories(index){
   this.currentIndex = index;
   console.log('Sub'+this.currentIndex)
		    const mailKey = this.categories[index].maitKey;
        getSubCategory(mailKey).then(res => {
          console.log(res.data)
          this.categoryData[index].subcategories = res.data
          this.categoryData = {...this.categoryData}
          // 大的分类再分为综合，新品。销量
          // this.LgetCategoryDetail(POP)
          // this.LgetCategoryDetail(SELL)
          // this.LgetCategoryDetail(NEW)
        })
},
LgetCategoryDetail(type){
  console.log('迷你'+this.categories[this.currentIndex])
  console.log(this.currentIndex)
const miniWallKey=this.categories[this.currentIndex].miniWallKey;
getCategoryDetail(miniWallKey,type).then(res=>{
  this.categories[this.currentIndex].categoryDetail[type]=res
   this.categoryData = {...this.categoryData}
})
},
          leftNavClick(index){
        this.LgetSubcategories(index)

          }
        },
    }
</script>

<style scoped>
.cate{
 height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
.cateContent{
  top:44px;
    bottom: 49px;
/* grid-template-rows: 100vh; */
 
  display: flex;
  /* grid-template-columns: 30% 70%; */
 position: absolute;

}
/* .con{
   height:822px;

      background-color: green;
} */
.cate{
   

}
.left-nav{
}
.right{
    background-color: pink;

}
</style>
