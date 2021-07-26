// 混入的用法，当多个组件要使用一个类的内容时使用混入
import { debounce } from 'common/untils.js'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500) 
        this.itemImgListener = () => {
            //当图片加载玩生成后刷新页面
            this.newRefresh()
        }
        this.$bus.on('itemImgLoad', this.itemImgListener) //这里监听goodslistitem中发出的itemImgLoad这个事件
         

    }
}
// 如果在引用mixins的同时，在组件中重复定义相同的方法，则mixins中的方法会被覆盖。
// data中相同变量也会被覆盖
export const isShowBackTop = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backTopClick() {
            this.$refs.scroll.scrollTo(0, 0) //获取DOM中的scroll组件中的scrollTo方法确定点击事件发生后，页面滚动的位置以及事件
        },
    },
}