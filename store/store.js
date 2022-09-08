import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js'

Vue.use(Vuex)
//注册两个模块cart和user
const store = new Vuex.Store({
	modules:{
		'm_cart':moduleCart,
		'm_user':moduleUser
	}
})

export default store