<template>
   <div class="cart-list">
     <cart-list-item v-for="(item,index) in cartList" :key="index" :cart-item="item"></cart-list-item>
   </div>
          
   
</template>

<script>
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'; 
export default {
  name: "CartList",
  created() {},
  data() {
    return {};
  },
  components:{
    CartListItem
  },
  props: {},
  computed:{
  ...mapGetters(['cartList'])
  },
  methods: {},
};
</script>

<style  scoped>
.cart-list{
  height:100%
}
</style>