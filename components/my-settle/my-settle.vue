<template>
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
			
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择要结算的商品')
				
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				
				if(!this.token) return this.delayNavigate()
			},
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
								this.updateRedirectInfo({
									openType:'switchTab',
									from:'/pages/cart/cart'
								})
							}
						})
						
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
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
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			...mapGetters('m_user',['addstr']),
			...mapState('m_user',['token']),
			isFullCheck(){
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