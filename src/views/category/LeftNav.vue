<template>
  <div class="leftNav">
      <div class="menu-list-item"
      v-for="(item,index) in categories" :key="index" @click="itemClick(index)" :class="{active:index === currentIndex}">
{{item.title}}
      </div>
  </div>
</template>

<script>
export default {
  name:"leftNav",
  components: {},
  props:{
      categories:Array
  },
  data() {
    return {
           currentIndex:0
    };
  },
  methods: {
       itemClick(index) {
        this.currentIndex = index
          this.$emit('leftNavClick', index)
      }
  },
};
</script>
<style scoped>
.leftNav{
    display: grid;
    grid-template-rows: repeat(16,6.25%);
    justify-items:center;
    align-items:center;
    background-color: #f6f6f6;
}
 .menu-list-item {
    height: 100%;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }

  .menu-list-item.active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 2px solid var(--color-high-text);
  }
</style>