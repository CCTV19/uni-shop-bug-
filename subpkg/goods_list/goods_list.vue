<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodsList:[],
				total:0,
				isLoading:false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods:{
			//获取商品列表数据的方法
			async getGoodsList(cb){
				this.isLoading = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				this.isLoading = false
				cb && cb()
				if(res.meta.status !== 200) return uni.$showMsg()
				
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
				})
			}
		},
		onReachBottom(){
			if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) 
				return uni.$showMsg('数据加载完毕')
			if(this.isLoading) return
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh(){
			//重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isLoading = false
			this.goodsList=[]
			
			this.getGoodsList(()=> uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>