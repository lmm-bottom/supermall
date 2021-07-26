<template>
  <div class="toast" v-show="isshow">
{{message}}
  </div>
</template>

<script>
export default {
  name:"",
  components: {},
 props:{
      message:{
        type:String,
default:''
      },
       isshow:{
      type:Boolean,
      default:false
    }
    
  },
  methods: {
    
  },
};
</script>
<style scoped>
.toast{
  opacity: 1;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color:red ;
  background-color: rgba(0, 0, 0, .75);
}
</style>