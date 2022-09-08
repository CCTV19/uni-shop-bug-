export default{
	namespaced:true,
	
	state:()=>({
		//从本地缓存中同步获取指定 key 对应的内容
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	//提交到state
	mutations:{
		//将单个商品加入到state里的cart列表
		addToCart(state,goods){
			//找到当前的state.cart里是否有传入的该商品
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			//判断如果无该商品就加入cart里，有则将该商品的数量+1
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			//触发saveToStorage
			this.commit('m_cart/saveToStorage')
		},
		//写入本地缓存
		saveToStorage(state){
			//将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容(这是一个同步的接口)
			//将数据作为字符串写入本地缓存
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		//更新购物车中商品的勾选状态
		updateGoodsState(state,goods){
			//找到当前的state.cart里是否有传入的该商品
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			//判断有则将该商品的勾选状态改为现在传入的商品勾选状态
			if(findResult){
				findResult.goods_state = goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		},
		//更新购物车中商品的数量
		updateGoodsCount(state,goods){
			//找到当前的state.cart里是否有传入的该商品
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			//判断有则将该商品的数量改为现在传入的商品的数量
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		//根据传过来的goods_id删除对应商品
		removeGoodsById(state,goods_id){
			//将当前cart中不为此id的商品变成一个新数组赋值给cart
			state.cart = state.cart.filter(x => x.goods_id !== goods_id)
			
			this.commit('m_cart/saveToStorage')
		},
		//改变当前所有cart里商品的状态(全选/全不选功能)
		updateAllGoodsState(state,newState){
			//将cart里每一个商品的状态都改为传入的新态
			state.cart.forEach(x => x.goods_state = newState)
			
			this.commit('m_cart/saveToStorage')
		}
	},
	
	getters:{
		
		//计算商品总数量
		total(state){
			/* let c = 0
			state.cart.forEach(x => c+=x.goods_count)
			return c */
			//reduce()方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值
			//0为初始值
			return state.cart.reduce((total,item) => total += item.goods_count,0)
		},
		//计算被选中的商品数量
		checkedCount(state){
			//先把被选中的商品过滤出来，然后对数量进行累加
			return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count,0)
		},
		//已选中商品的总价格
		checkedGoodsAmount(state){
			//先把被选中的商品过滤出来，然后对数量和价格相乘之后进行累加并取小数点后两位
			return state.cart.filter(x => x.goods_state).reduce((total,item)=> total += item.goods_count * item.goods_price,0).toFixed(2)
		}
	}
}