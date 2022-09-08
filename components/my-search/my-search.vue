<template>
	<!--my-searc展示搜索组件，用于首页和分类页面顶部，真正具有搜索功能的组件是分包里的search组件-->
	<view class="my-search-container" 
	:style="{ 'background-color':bgcolor}"
	@click="searchBoxHandler">
		<view class="my-search-box" :style="{ 'border-radius': radius + 'px'}">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			//页面样式等待外界传入，无传入则用默认数值
			bgcolor:{
				type:String,
				default:'#C00000'
			},
			radius:{
				type:Number,
				default:18
			}
		},
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			//相应父组件（home）的click事件
			searchBoxHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	/* background-color: #C00000; */
	display: flex;
	align-items: center;
	padding: 0 10px;
	
	.my-search-box{
		height: 36px;
		background-color: #ffffff;
		/* border-radius: 18px; */
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>