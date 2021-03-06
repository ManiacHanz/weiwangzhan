// 配置mutations

import Vue from 'vue'

import {
	SAVE_USERINFO,
	SWITCH_MENUTYPE,
	SET_LOGO,
	SET_AVATAR,
	SAVE_MOBILECFG,
	SET_SHOWPANEL,
	SET_MOBILE_COLOR,
	SET_MOBILE_ACTIVE,
	SET_MENUBTN_STYLE,
	UPDATE_FORMCFG,
	CLEAR_FORMCFG,
	OPEN_MODAL,
	CLOSE_MODAL,
	SET_MODALCFG,
	OPEN_NOTIFICATION,
	CLOSE_NOTIFICATION,
	SET_LOADING,
	SET_EDITORCONTENT,
	SAVE_HOMEPANELLIST,
	SAVE_LISTPANELLIST,
	SAVE_USERPANELLIST,
	SAVE_TEMPORARYLIST,
	TOGGLE_LISTDATAUPDATE,
	SET_SHOWREDDOT,
	TOGGLE_GUIDER,
} from './mutation-types.js'

export default {
	//保存uid,token
	[SAVE_USERINFO] (state, obj) {
		state.userInfo = Object.assign({}, obj)
	},
	// 改变右边内容展示的板块
	[SWITCH_MENUTYPE] (state, payload) {
		state.showRightContent = payload.str
		state.showLeftIndex = payload.index
	},
	//设置LOGO
	[SET_LOGO] (state, value) {
		state.logoUrl = value
	},
	//设置头像
	[SET_AVATAR] (state, value) {
		state.avatarUrl = value
	},
	// 设置面板菜单按钮的样式 
	[SET_MENUBTN_STYLE] (state) {
		if(state.homePanelList.button.length==4){
    	state.menubtnStyle = 'type1'
    }
    else if (state.homePanelList.button.length==5) {
    	// console.log(state.homePanelList.button[2].title=='')
    	if(state.homePanelList.button[2].title=='' && state.homePanelList.button[1].title=='') {
				state.menubtnStyle = 'type2'
    	}
    	else {
    		state.menubtnStyle = 'type3'
    	}
    }
	},
	// 保存3个面板的数据，用于渲染
	[SAVE_HOMEPANELLIST] (state, obj) {
		// console.log(obj)
		state.homePanelList = ''
		state.homePanelList = Object.assign({}, obj)
	},
	[SAVE_LISTPANELLIST] (state, obj) {
		state.listPanelList = ''
		state.listPanelList = Object.assign({}, obj)
	},
	[SAVE_USERPANELLIST] (state, obj) {
		state.userPanelList = ''
		state.userPanelList = Object.assign({}, obj)
	},
	// 保存临时数据，用于模态框确认的方法 发送给哪个接口，发送什么数据
	[SAVE_TEMPORARYLIST] (state, {_interface, obj}) {
		state.temporaryPanelList = ''
		if(_interface === 'home') {
			state.temporaryPanelList = Object.assign({}, state.homePanelList, obj)
		 // console.log(obj)
		}
		if(_interface === 'list') {
			state.temporaryPanelList = Object.assign({}, state.listPanelList, obj)
		}
		if(_interface === 'user') {
			state.temporaryPanelList = Object.assign({}, state.userPanelList, obj)
		}
	},
	//保存手机配置信息
	[SAVE_MOBILECFG] (state, mobileCfg) {
		state.mobileCfg = mobileCfg
	},
	//设置手机的menu按钮的切换作用
	[SET_SHOWPANEL] (state, panelName) {
		if (!panelName) {
			return
		}
		state.showPanel = panelName
	},
	// 设置手机主题的切换
	[SET_MOBILE_COLOR] (state, color) {
		state.mobileColorStyle = color
		// console.log(state.mobileColorStyle)
	},
	// 更新手机配置表单的属性
	[UPDATE_FORMCFG] (state, obj) {
		state.formCfg = Object.assign({}, state.formCfg, obj)
	},
	// 清空表单配置
	[CLEAR_FORMCFG] (state) {
		state.formCfg.formFor = ''
		state.formCfg.inputList = null
		//state.formCfg = null
	},
	//设置手机激活模块
	[SET_MOBILE_ACTIVE] (state,module) {
		state.mobileActive = module
	},
	// 打开 关闭弹出框
	[OPEN_MODAL] (state) {
		state.isShowModal = true
	},
	[CLOSE_MODAL] (state) {
		state.isShowModal = false
	},
	[SET_MODALCFG] (state, obj) {
		state.modalCfg = Object.assign({}, state.modalCfg, obj)
	},
	//打开 发布成功 这个提示
	[OPEN_NOTIFICATION] (state, text) {
		state.isShowNotification = true
		if(text){
			state.showNotificationText = text
		} 
		else {
			state.showNotificationText = '发布成功'
		}
	},
	//关闭 发布成功 这个提示
	[CLOSE_NOTIFICATION] (state) {
		state.isShowNotification = false
	},
	//打开关闭 loading
	[SET_LOADING] (state, text) {
		state.isShowLoading = !state.isShowLoading
		text? state.loadingText = text : state.loadingText = ''
	},
	// 设置富文本的内容
	[SET_EDITORCONTENT] (state, str) {
		state.editorContent = str
	},
	// 控制是否文章管理需要更新
	[TOGGLE_LISTDATAUPDATE] (state) {
		state.shouldListUpdate = !state.shouldListUpdate
	},
	// 控制是否显示最后更新的红色圆点
	[SET_SHOWREDDOT] (state, bool) {
		if(!bool) {
			state.showRedDot = true
		}
		else {
			state.showRedDot = false
		}
	},
	// 控制引导页开关
	[TOGGLE_GUIDER] (state) {
		state.isShowGuider = !state.isShowGuider
	}
}