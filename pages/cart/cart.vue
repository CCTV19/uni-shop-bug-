<template>
	<!--通过判断cart.length的值选择展示哪个组件-->
	<view class="cart-container" v-if="cart.length !== 0">
		<my-address></my-address>
		
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<uni-swipe-action>
			<block v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item 
				:right-options="options" 
				@click="swipeItemClickHandler(goods)">
					<my-goods :goods="goods"
					:showRadio="true" 
					:showNum="true" 
					@radio-change="radioChangeHandler"
					@num-change="numberChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>	
		</uni-swipe-action>
		
		<my-settle></my-settle>
	</view>
	
	<view class="empty-cart" v-else>
		<image src="/static/empty.jpeg" class="empty-img"></image>
		<text class="tip-text">空空如也</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {mapState,mapMutations} from 'vuex'
	
	export default {
		mixins:[badgeMix],
		computed:{
			...mapState('m_cart',['cart'])//拿到store中的cart数组进行使用
		},
		data() {
			return {
				//为右滑删除选项做准备
				options:[{
					text:"删除",
					style:{
						backgroundColor:'#C00000'
					}
				}]
			};
		},
		methods:{
			...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
			//勾选改变vuex中state的状态
			radioChangeHandler(e){
				this.updateGoodsState(e)
			},
			//改变vuex中goodscount的值
			numberChangeHandler(e){
				this.updateGoodsCount(e)
			},
			//从vuex中根据goods_id删除对应的商品
			swipeItemClickHandler(goods){
				console.log(goods)
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
.cart-container{
	padding-bottom: 50px;	
}
.cart-title{
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	
	.cart-title-text{
		font-size: 14px;
		margin-left: 10px;
	}
}

.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	
	
	.empty-img{
		width: 400px;
		height: 500px;
	}
	.tip-text{
		font-size: 20px;
		color: gray;
		
	}
}
</style>
