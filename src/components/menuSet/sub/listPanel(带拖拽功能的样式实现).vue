<template>
	<div class="list-panel" :class="mobileColorStyle">
		<section class="banner swiper-container" :class="[mobileActive==='listbanner'?'active':'']" id="Swiper2"
		@click.left="setUpModule('','listbanner')">
      <ul class="swiper-wrapper">
          <li class="swiper-slide" v-for="(item, index) in listPanelList.banner" :key="index">
        		<img :src="imgBaseUrl + item.img" v-show="item.img">
        		<p>
        			<span>{{ item.title }}</span>
        		</p>
          </li>
      </ul>
      <div class="swiper-pagination" id="SPagination_2"></div>
		</section>
		<section class="detail">
			<ul >

				<draggable class="list-group" v-model="panelList" :move="onMove" @start="isDragging=true" @end="isDragging=false">
      		<transition-group type="transition" :name="'flip-list'">
		
						<li v-for="(item, index) in panelList" :key="index" 
						:class="[mobileActive==='contentlist'+index?'active':'']"
						@click.left="setUpModule(item.link,'contentlist'+index)">
							<type-a v-if="item.imglist.length===3" :content="item" :colorStyle="mobileColorStyle"></type-a>
							<type-b v-else :content="item" :colorStyle="mobileColorStyle"></type-b>
						</li>


     			</transition-group>
				</draggable>

				
			</ul>
		</section>
		<section class="mask" v-show="!homePanelList.button[1].display"></section>

	</div>
</template>

<script>

import draggable from 'vuedraggable'


import '../../../../static/plugin/swiper.min.css'
import '../../../../static/plugin/swiper.min.js'

import typeA from '@/components/list/typeA'
import typeB from '@/components/list/typeB'


import { mapState, mapMutations } from 'vuex'
import {__getListPanel} from 'service/getData.js'
import {imageBaseUrl} from 'config/env.js'
import {jsonParse} from 'config/mUtils'

// 模拟手机首页配置数据 
// import { mobileListCfg } from '../../../../static/data/mobileListCfg.js'

const totalHeight = ''

export default {

  name: 'listPanel',
  components: {

  	draggable,

  	typeA,
  	typeB,
  },
  data () {
    return {
			mobileCfg:'',    //手机配置,
    	imgBaseUrl: imageBaseUrl,

    	isDragging: false,
    	panelList: [{"title":"321","imglist":["/fileresource/imgs/USERjAOu9UQV/1513322314474.png","/fileresource/imgs/USERjAOu9UQV/1513322317671.png","/fileresource/imgs/USERjAOu9UQV/1513322316012.png"],"time":"2017-12-15 15:18","link":"ARTIp8YZ9yMx","linkType":1},{"title":"在拉萨，如果只剩10块钱，你可以……","imglist":["/fileresource/imgs/system/banner/neir7.png","/fileresource/imgs/system/banner/neir6.png","/fileresource/imgs/system/banner/neir1.png"],"time":"2017-12-15 16:26","link":"morenW4S68uKn","linkType":0},{"title":"四次进藏的点滴记事","imglist":["/fileresource/imgs/system/banner/neir2.png"],"time":"2017-12-15 15:18","link":"morenW4S68uKn","linkType":0},{"title":"天上西藏云山林芝","imglist":["/fileresource/imgs/system/banner/neir3.png"],"time":"2016-09-30 09:15","link":"morenW4S68uKn","linkType":0},{"title":"仰望星空，青春之旅","imglist":["/fileresource/imgs/system/banner/neir4.png"],"time":"2016-09-30 09:30","link":"morenW4S68uKn","linkType":0}],
    }
  },
  computed: {
  	...mapState([
  			'mobileColorStyle','mobileActive','listPanelList','userInfo','homePanelList'
  		]),



  },
  watch : {
  	isDragging (newValue) {
      if (newValue){
        this.delayedDragging= true
        return
      }
      this.$nextTick( () =>{
           this.delayedDragging =false
      })
    }
  },
  created () {
  	// 这里加了判定避免重复请求，不知道需不需要
  	if(!this.listPanelList) {
  		__getListPanel({...this.userInfo})
  		.then( res => {
  			if (!res.result) {
  				alert(res.message)
  				return false
  			}
	  			let jres = jsonParse(res.data)
  			this.SAVE_LISTPANELLIST(jres)
  		})
  	}
  },
  mounted () {

		// 初始化轮播 
  	new Swiper('#Swiper2', {
        pagination: '#SPagination_2',
        loop: true,
        autoplay: 3000,
        paginationClickable: true,  //点击分页器
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
   			observeParents:true,//修改swiper的父元素时，自动初始化swiper
   			onSlideChangeEnd: function(swiper){ 	//下面都是为了动态swiper的重初始化
					swiper.update();  
					swiper.startAutoplay();
					swiper.reLoop();  
				}
    })
    this.$nextTick( function() {
  		
	  	let mask = document.querySelector('.mask')
	  	let banner = document.querySelector('.banner')
	  	let detail = document.querySelector('.detail')
	  	// console.log('mounted...')
	  	mask.style.height = banner.scrollHeight + detail.scrollHeight  -4 +'px'
    })

  },
  updated () {
  	this.$nextTick( function() {
  		// console.log('list updated...')
  		// console.log(this._isDestroyed)
  		if( document.querySelector('.banner') && document.querySelector('.detail')) {
  			let mask = document.querySelector('.mask')
		  	let banner = document.querySelector('.banner')
		  	let detail = document.querySelector('.detail')
		  	// console.log('updated...','mask:',mask,'banner:',banner,'detail:',detail)
		  	mask.style.height = banner.scrollHeight + detail.scrollHeight  -4 +'px'
  		}
    })
  },
  destroyed () {
  	// console.log('list destroyed...')
  	// console.log(this._isDestroyed)
  },
  methods: {
  	...mapMutations([
  			'SET_MOBILE_ACTIVE','UPDATE_FORMCFG','SAVE_LISTPANELLIST'
  		]),
  	onMove ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    },
  	setUpModule (link, dom) {
  		// 改变激活状态
  		this.SET_MOBILE_ACTIVE(dom)
  		// 配置轮播表单
  		if (dom === 'listbanner') {
  			//  重组数组
  			let bannerPicArr = []
  			let bannerTitleArr = []
  			let bannerLinkArr = []
  			let bannerLinkTypeArr = []
  			for (let elem of this.listPanelList.banner) {
  				bannerPicArr.push(elem.img)
  				bannerTitleArr.push(elem.title)
  				bannerLinkArr.push(elem.link)
  				bannerLinkTypeArr.push(elem.linkType)
  			}
  			
  			// for (let elem of this.listPanelList.banner) {
  			// }
  			// for (let elem of this.listPanelList.banner) {
  			// }
  			let option = {
  				formFor:'listbanner',    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: 'banner配置',		//表单标题
					formSubTitle: '(最多可配置6张图片，请上传jpg/png格式，小于300k，建议尺寸720*320)',
					removeMenu: false,		//删除按钮
					addMenu: false,		//添加按钮
					inputList:[
						{
							type:'setMultiPicUploader',
							key:'listbanner',
							imglist:bannerPicArr,
						},
						{
							type:'setName',
							key:'listbanner', 
							value: bannerTitleArr,
						},
						{
							type:'setLink', 
							key:'listbanner', 
							value: bannerLinkArr,
						},
						{
							type:'setLinkType', 
							key:'listbanner', 
							value: bannerLinkTypeArr,
						},
					],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
					pickFromLib: true,
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  		else if (dom.substring(0,11) === 'contentlist') {
  			let domIndex = dom.substring(11)			//获取每个索引
  			let option = {
  				formFor:'contentlist',    //配置表单选项的唯一标识，负责配置唯一的数据
					formTitle: '二级菜单配置',		//表单标题
					formSubTitle: '',
					listIndex: domIndex,				//给列表的索引
					removeMenu: true,		//删除按钮
					addMenu: true,		//添加按钮
					inputList:[
						{
							type:'setName',
							key:dom, 
							value: this.listPanelList.content[domIndex].title,
						},
						{
							type:'setListPicUploader',
							key:dom,
							imglist: this.listPanelList.content[domIndex].imglist,
						},
						{
							type:'setLink', 
							key:dom, 
							value: this.listPanelList.content[domIndex].link,
						},
						{
							type:'setLinkType', 
							key:dom, 
							value: this.listPanelList.content[domIndex].linkType,
						},
					],		//输入框列表   依次为 菜单名称 菜单图标  页面地址 标题  摘要
					pickFromLib: true,
  			}
  			this.UPDATE_FORMCFG(option)
  		}
  	},
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/variety.less';

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}


::-webkit-scrollbar {
	width: 6px;
	height: 16px;  
  background-color: #F5F5F5;  
}
//滚动条背景
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px;  
    background-color: #F5F5F5;  
}  
  
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
    background-color: @borderActiveGrey;  
} 
.list-panel {
	height: 448px;
	overflow-y: auto;
	overflow-x: hidden;
	position: relative;
}
.mask {
	width: 100%;
	height: 100%;
	background: rgba(255, 255, 255, 0.6);
	position: absolute;
	top: 0;
	left: 0;
	z-index: 10;
	// display: block;
}
.banner {
	width: 310px;
	height: 140px;
	background: #eeeeee;
	cursor: pointer;
	position: relative;
	&.active:after {
		content: '';
		width: 100%;
		height: 100%;
		border: 1px solid @lightBlue;
		box-sizing: border-box;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.swiper-slide {
		position: relative;
		img {
			width: 100%;
			height: 100%;
		}
		p {
			color: #ffffff;
			font-size: 14px;
			width: 100%;
			height: 26px;
			line-height: 26px;
			position: absolute;
			bottom: 0;
			left: 0;
			text-indent: 6px;
			overflow: hidden;
			background: rgba(0, 0, 0, 0.5);
			span {
				display: inline-block;
				width: 240px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
	}
	.swiper-pagination {
		text-align: right;
		bottom: 4px;
	}
}
.detail li {
	// border-top: 1px solid @borderGrey;
	border-bottom: 1px solid @borderGrey;
	cursor: pointer;
	position: relative;
	&.active:after {
		content: '';
		width: 100%;
		height: 100%;
		border: 1px solid @lightBlue;
		box-sizing: border-box;
		display: block;
		position: absolute;
		top: 0;
		left: 0;
	}
	&:last-of-type {
		border-bottom: none;
	}
}

.dark {
	background: @dark_back;
	.banner.active:after {
		border-color: @dark_lightFont;
	}
	.detail li {
		// border-top-color: @dark_border;
		border-bottom-color: @dark_border;
		&.active:after {
			border-color: @dark_lightFont;
		}
	}
} 
.green {
	.banner.active:after {
		border-color: @green_font;
	}
	.detail li {
		&.active:after {
			border-color: @green_font;
		}
	}
} 
</style>