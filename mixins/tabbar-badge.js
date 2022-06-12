import {mapGetters} from 'vuex'


export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		total(){
			this.setBadge()
		}
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				index:2,
				text:this.total + '' //需要是字符串不能是数字 所以加''转换
			})
		}
	}
}