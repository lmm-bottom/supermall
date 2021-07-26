<template>
    <div class="good-list">
      <good-list-item v-for="item in goods" :key="item.img" :good-item="item"/>
    </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";

 
  export default {
    name: "GoodsList",
    props:{
        goods:{
            type:Array,
            default() {
                return []
            }
        }
    },
    components:{
      GoodListItem
    }
  }
  
</script>

<style scoped>
  .good-list {
    display: flex;
    
    flex-wrap: wrap;
    justify-content: space-around;
    background-color: var(--color-background);

    padding: 2px;
  }
/* .good-list{
  margin: 20px;
        width: 100px;
        border: 1px solid red;
        position: absolute;
        box-sizing: border-box;
            background-color: var(--color-background);
} */
</style>
