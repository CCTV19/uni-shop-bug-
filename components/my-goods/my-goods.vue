<template>
	<view class="goods-item">
		<!--根据传入组件的信息，进行定制化的显示-->
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
	//此组件用于购物车预览和商品列表预览
	export default {
		//定义属性等待外界传值
		props:{
			//商品信息：对象
			goods:{
				type:Object,
				default:{},
			},
			//通过是否传入showRadio的值进行页面的判断显示(购物车)
			showRadio:{
				type:Boolean,
				default:false
			},
			//通过是否传入showNum的值进行页面的判断显示(购物车)
			showNum:{
				type:Boolean,
				default:false
			}
		},
		name:"my-goods",
		data() {
			return {
				//当请求回来的数据没有goods.goods_small_logo时，选择该链接作为默认显示图片
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pic/movie/celebrity-default-medium.png'
			};
		},
		//通过过滤器可以进行处理成自己想要展示出来的格式，由“管道”符号 | 指示
		filters:{
			//将goods.goods_price处理为小数点后两位显示到页面上
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			//radio组件的点击事件处理函数
			radioClickHandler(){
				//向父组件（cart）的radio-change事件传参
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			//numberbox组件数量变化的事件
			numChangeHandler(val){
				//向父组件（cart）的num-change事件传参
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