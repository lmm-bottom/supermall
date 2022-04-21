<template>
    <h2>关于我</h2>
</template>

<script>
    export default {
        name: "Me",
         created() {
    console.log(this.$route.params.jum)
    console.log(this.$route.params.id)
  }
    }
    
</script>

<style scoped>

</style>
