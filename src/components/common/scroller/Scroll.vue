<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "scroll",
        data() {
            return {
                scroll:{
                    type:Object,
                    default() {
                        return {}
                    }
                }
            }
        },
        //接收父组件来的值
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:true
            }
        },
        mounted() {

            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType:this.probeType,
                click: true, 
                 mouseWheel: true,
                  observeDOM: true,
                  pullUpLoad:this.pullUpLoad,
                  //一般情况下，我们请求图片数据还没有到达，可滚动尺寸却被确定了，此时可滚动尺寸小于实际的高度，
                  //需要刷新可滚动尺寸,下面这个有（有防抖功能）
                //   observeImage: true //better-scroll 2.0
            })
// 监听到scroll事件，监听滚动的位置
if(this.probeType===2||this.probeType===3){
            this.scroll.on('scroll', (postion) => {
                //console.log(postion);
                this.$emit('scroll', postion) //子组件将scroll事件传出去
            })}
            // 3、监听scroll滚动到底部
            if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
                                this.$emit('pullingUp') //子组件将scroll事件传出去

            })}

        },
        methods:{
            scrollTo(x, y, time) {
                this.scroll&&this.scroll.scrollTo&&this.scroll.scrollTo(x, y, time)
            },
            refresh() {
this.scroll&&this.scroll.refresh() 
            },
            getscrollY(){
return this.scroll?this.scroll.y:0}


        }
    }
</script>

<style scoped>

</style>
