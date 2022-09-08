<template>
	<view>
		<view class="search-box">
			<uni-search-bar 
			@input="input"
			:radius="100"
			cancelButton="none"></uni-search-bar>
		</view>
		
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i"
			@click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//定时器
				timer:null,
				//搜索关键词
				kw:"",
				//搜索结果
				searchResults:[],
				//历史记录列表
				historyList:[],
				
			};
		},
		onLoad() {
			//从本地存储中取出
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]' ) 
		},
		methods:{
			//一输入关键词则执行此方法
			input(e){
				//防抖 连续触发这个事件 只会等到最后一次触发后的500ms之后才执行
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				//判断输入是否为空 用于删除关键词后回到初始页面
				if(this.kw.length=== 0){
					this.searchResults = []
					return
				}
				
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{ query:this.kw })
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				
				this.saveSearchHistory()
			},
			//点击对应商品跳转到商品详情页面
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id
				})
			},
			//保存历史搜索关键词
			saveSearchHistory(){
				//this.historyList.push(this.kw)
				//Set 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用
				const set = new Set(this.historyList)
				//先删除原有的值再追加新值 达到新添加的在最后的目的
				set.delete(this.kw)
				set.add(this.kw)
				//from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组 将对象转数组
				this.historyList = Array.from(set)
				//写入本地存储
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			//清除历史记录
			clean(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			//点击对应历史记录关键词跳转到商品列表页面
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query=' + kw
				})
			}
		},
		computed:{
			//因为是通过push方法在数组末尾添加，所以展示是需要反转数组进行展示
			histories(){
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	position: sticky;
	top: 0;
	z-index: 999;
}
.sugg-list{
	padding: 0 5px;
	.sugg-item{
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		
		.goods-name{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
.history-box{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		
		.uni-tag{
			display: block;
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
