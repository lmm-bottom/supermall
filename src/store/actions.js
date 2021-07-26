export default {
    //异步操作或者复杂逻辑要放到action中进行
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                
                context.commit('addCount', oldProduct)
            //  返回一个弹窗
            resolve('商品数量加1')
            } else {
                payload.count = 1
                context.commit('addCart', payload)
                resolve('添加至购物车')
            }

        })
    }

}