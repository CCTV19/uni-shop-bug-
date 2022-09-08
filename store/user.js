export default{
	namespaced:true,
	//用来存储用户的信息（地址，token，用户信息）
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address') || '{}'),
		token:uni.getStorageSync('token') || '',
		userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
		//用于重定向my页面跳转回cart的{openType，from}
		redirectInfo:null
	}),
	//更改 Vuex 的 store 中的状态的唯一方法是提交 mutation
	mutations:{
		//触发该函数更改state的address
		updateAddress(state,address){
			state.address = address
			//触发saveAddressToStorage这个事件
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			//将state中的address写入本地存储
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		//触发该函数更改state的userinfo
		updateUserInfo(state,userinfo){
			state.userinfo = userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		//将state中的userinfo写入本地存储
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		//触发该函数更改state的token
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		//将state中的token写入本地存储
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		//触发该函数更改state的redirectInfo
		updateRedirectInfo(state,info){
			state.redirectInfo = info
		}
	},
	
	getters:{
		//判断是否有省名，无则弹出，有则返回一个字符串拼接的用户地址
		addstr(state){
			if(!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}