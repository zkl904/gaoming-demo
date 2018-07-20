<template>
<div class="my-content">
	这是我的页面
	<div class="money">{{money|fetchBit(false, 2)}}</div>
	<div class="wd-per-25 bg-secondary radius-5 text-center mb-25" @click="writeCookie">
		存储cookie
	</div>
	<div class="wd-per-25 bg-secondary radius-5" @click="removeCookie">
		删除cookie
	</div>
	<input type="text" v-model="mobile">
	<div class="wd-per-25 bg-secondary radius-5" @click="testMobile">
		验证手机号码
	</div>
</div>
</template>

<script type="text/ecmascript-6">
  import {Toast} from 'mint-ui'
	export default {
    name: 'My',
	  data () {
	    return {
				money: '1000',
        mobile: ''
	    }
	  },
		created () {
      // window.cookieStore.write('currentRoute', JSON.stringify(this.$getCurrentRoute()))
      // window.cookieStore.
      Toast({
        message: '可提现金额为0元',
        duration: 1000,
        position: 'middle'
      })
		},
		methods: {
      writeCookie () {
         console.log(111)
         window.cookieStore.write('name', '小王')
      },
      removeCookie () {
        window.cookieStore.remove('name')
      },
      testMobile () {
				console.log(this.$validate)
      }
		},
		components: {
      [Toast.name]: Toast
		}

	}
</script>

<style >

</style>
