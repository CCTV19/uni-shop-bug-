<template>
	<!--购物车页面底部结算组件-->
	<view class="my-settle-container">
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		
		<view class="amount-box">
			合计：<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		
		<view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations,mapState} from 'vuex'
	
	export default {
		name:"my-settle",
		data() {
			return {
				seconds:3,
				timer:null
			};
		},
		methods:{
			...mapMutations('m_cart',['updateAllGoodsState']),
			...mapMutations('m_user',['updateRedirectInfo']),
			//全选/全不选功能，同时也影响了isFullCheck，间接控制radio勾选
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			//结算按钮：判断是否选中商品/是否已选择收货地址
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				//如果没有token(未登录)执行delayNavigate
				if(!this.token) return this.delayNavigate()
			},
			//延迟后跳转到登录页面
			delayNavigate(){
				this.seconds = 3
				
				this.showTips(this.seconds)
				
				this.timer = setInterval(() => {
					this.seconds-- 
					
					if(this.seconds <= 0){
						clearInterval(this.timer)
						
						uni.switchTab({
							url:'/pages/my/my',
							success:()=>{
								//将跳转信息存储到vuex中
								this.updateRedirectInfo({
									openType:'switchTab',
									//从哪个页面跳转的
									from:'/pages/cart/cart'
								})
							}
						})
						
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			//展示提示信息
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后再结算！' + n + '秒后自动跳转到登录页',
					mask:true,
					duration:1500
				})
			}
		},
		computed:{
			//从cart和user的vuex中映射对应数据
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			//判断是否全选，由此函数控制radio勾选与否
			isFullCheck(){
				//根据总数判定是否全选，返回true/false
				return this.total === this.checkedCount
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #C00000;
			font-weight: bold;
		}
	}
	.btn-settle{
		background-color: #C00000;
		height: 50px;
		color: white;
		line-height: 50px;
		padding: 0 10px;
		min-width: 100px;
		text-align: center;
	}
}
</style>