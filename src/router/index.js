import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Me = () => import('views/me/Me')
const Detail = () => import('views/detail/Detail')
const test = () => import('views/detail/test')

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home/:jum/:id',
    
    // 指定的组件
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/cart',
    component:Cart
  },
  {
    path: '/me/:jum/:id',
    params:{
      jum:'你好',
      id:'nh'
    },
    component:Me
  },
  {
    path: '/detail/:iid',
    component:Detail
  },
  
  // {
  //   path: '/detail/:iid',
  //   component:test
  // },
]
const router = new VueRouter({
  routes,
  // url模式
  mode:'history'
})

export default router
