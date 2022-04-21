<template>
    <div>
      <MainTarBar></MainTarBar>
    </div>
</template>

<script>
  import MainTarBar from 'components/contents/maintabbar/MainTabBar'
  export default {
      name: "Home",
               created() {
    console.log(this.$route.params.jum)
    console.log(this.$route.params.id)
  },
      components: {
          MainTabBar
      }
  }
</script>

<style scoped>

</style>
