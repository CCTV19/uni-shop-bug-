<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		
		<view class="nav-list">
			<view class="nav-item" v-for="(item ,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<view class="left-img-box">
						<image :src="item.product_list[0].image_src" :style="{width:
						item.product_list[0].image_width + 'rpx'}" 
						mode="widthFix"></image>
					</view>
					<view class="right-img-box">
						<view class="right-img-item" 
						v-for="(item2,i2) in item.product_list" :key="i2" 
						v-if="i2 !== 0">
							<image :src="item2.image_src" 
							:style="{width:item2.image_width + 'rpx'}" 
							mode="widthFix"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList(){
				const { data : res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavList(){
				const {data : res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			async getFloorList(){
				const {data : res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200) return uni.$showMsg()
				this.floorList = res.message
			},
			navClickHandler(item){
				if(item.name === '分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 330rpx;
		.swiper-item,
		image{
			width: 100%;
			height: 100%;
		}
	}
	.nav-list{
		display: flex;
		justify-content: space-around;
		margin: 15px 0 ;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-title{
		width: 100%;
		height: 60rpx;
	}
	.right-img-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		padding-left: 8rpx;
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
	}
</style>
