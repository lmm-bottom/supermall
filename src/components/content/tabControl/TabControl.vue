<template>
  <div class="tab-control">
    <!--只是文字不一样所以并没有使用插槽-->
    <div v-for="(item, index) in titles"
         :key="item"
         class="tab-control-item"
         @click="tabItemClick(index)"
    >
      <span :class="{active:index === currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles:{
        type:Array,
        default() {
            return []
        }
      }
    },
    data() {
      return {
          currentIndex:0
      }
    },
    methods:{
      tabItemClick(index) {
        this.currentIndex = index
          this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 60px;
    line-height: 40px;
    background: #fff;
  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    border-bottom: 2px solid var(--color-tint);
    color: var(--color-high-text);
  }

</style>
