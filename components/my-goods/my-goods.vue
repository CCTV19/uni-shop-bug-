<template>
	<view class="goods-item">
		<!-- 左侧 -->
		<view class="goods-item-left">
			<radio :checked="goods.goods_state" color="#c00000" v-if="showRadio" @click="radioClickHandler"></radio>
			<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<!-- 右侧 -->
		<view class="goods-item-right">
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
				<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
				type:Object,//传出属性等待外界赋值
				default:{},
			},
			showRadio:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
		},
		name:"my-goods",
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pic/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			//radio组件的点击事件处理函数
			radioClickHandler(){
				this.$emit('radio-change',{
					//把这两个作为e参数传入父组件的radioChangeHandler
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			//监听numberbox 组件数量变化的事件
			numChangeHandler(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count: +val //+是用来转换为数字的
				})
			}
		}
	}
</script>

<style lang="scss">
.goods-item{
	width: 750rpx;
	box-sizing: border-box;
	display: flex;
	padding: 10px 10px;
	border-bottom: 1px solid #f0f0f0;
	
	.goods-item-left{
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			flex:1;
			justify-content: space-between;
			align-items: center;
			
			.goods-price{
				color: #C00000;
				font-size: 16px;
			}
		}
	}
}
</style>