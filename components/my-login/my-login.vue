<template>
	<!--该组件为用户未登录显示页面-->
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				//自定义给定一个token
				token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
			};
		},
		computed:{
			//引入state的映射
			...mapState('m_user',['redirectInfo']),
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
		  //登录操作
		  getUserProfile() {
			//获取用户信息。每次请求都会弹出授权窗口，用户同意后返回 userInfo
			uni.getUserProfile({
				  desc: '你的授权信息',
				  success: (res) => {
					// 将信息存到 vuex 中
					this.updateUserInfo(res.userInfo)
					this.getToken(res)
				  },
				  fail: (res) => {
					return uni.$showMsg('您取消了登录授权')
				  }
				})
			},
			//登录，获取token，跳转
			async getToken(info){
				const [err,res] = await uni.login().catch(err => err)
				this.updateToken(this.token)
				console.log(111)
				//解决登录后不跳转的bug：如果写在最后，因为if不是异步操作，if判断时就已经return了
				this.navigateBack()
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg('登录失败')
				else return uni.$showMsg('登录成功')
				
				//准备参数,为了发给服务器请求token
				/* const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature
				}
				console.log(query)
				const {data:loginResult} = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败')
				uni.$showMsg('登录成功') */
				/* this.updateToken(loginResult.message.token) */
				
				
			},
			//根据redirectInfo中的数据进行跳转(用于从登录页返回cart页面)
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						//需要跳转的 tabBar 页面的路径，是my-settle组件传入的数据
						url:this.redirectInfo.from,
						//导航完成后把redirectInfo对象重置为null
						complete:() => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #C00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>