<template>
	<div class="box" :class="colorStyle">
		<p class="title">{{ content.title }}</p>
		<div class="imglist" >
			<img :src="imgBaseUrl+item" v-for="item in content.imglist">
		</div>
		<p class="time">{{ content.time }}</p>
	</div>
</template>

<script>
import {imageBaseUrl} from 'config/env.js'

export default {

  name: 'typeA',

  data () {
    return {
    	imgBaseUrl: imageBaseUrl,

    }
  },
  props: ['content','colorStyle']
}
</script>

<style lang="less" scoped>
@import '../../style/variety.less';
@import '../../style/common.less';

.box {
	padding: 0 6px;
}
.title {
	height: 32px;
	line-height: 32px;
	.ellipsis()
}
.imglist {
	display: flex;
	justify-content: space-between;
	img {
		display: block;
		width: 94px;
		height: 70px;
	}
}
.time {
	font-size: 12px;
	color: #999999;
	line-height: 24px;
}
.dark {
	background: @dark_back;
	.title {
		color: @dark_lightFont;
	}
	.time {
		color: @dark_font;
	}
}
</style>