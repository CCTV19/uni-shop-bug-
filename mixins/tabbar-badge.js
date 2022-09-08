//为 tabBar 某一项的右上角添加文本
import {mapGetters} from 'vuex'


export default {
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		total:{
			handler(newVal){ 
				this.setBadge() 
			}, 
			immediate:true
		}
	},
	//onLoad和onShow的主要区别：从二级页面返回该页面时，onLoad不会再次加载，onshow会重新加载
	//例：1.如果加载列表页，二级页面对一级的列表页面内容有修改，则以及列表函数应该在onShow中加载，否则可以选择onLoad。
	//2.如果从一个页面携带参数跳转到另外一个页面，在另一个页面获取参数的方式：onLoad(options){ console.log(options.xxx) },这些参数都挂在在options.
	//总结一下1：在一些数据变化较少的时候我们用onload 2：像这些order订单列表数据变化即时性我们用的是onshow;
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
				//设置tabbar的第二项显示
				index:2,
				text:this.total + '' //需要是字符串不能是数字 所以加''转换
			})
		}
	}
}