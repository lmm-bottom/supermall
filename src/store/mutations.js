export default {
    // 1、mutation的唯一作用就是修改state状态
    //  2、mutation中每个方法尽可能完成的事件比较单一

    addCount(state, oldPayload) {
        oldPayload.count++
        console.log(oldPayload.count)
    },
    addCart(state, payload) {
        // 给商品加个选中属性
        payload.isChecked = true 
        state.cartList.push(payload)

    }

}