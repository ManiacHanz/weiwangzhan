<template>
  <div id="app">
    <!-- <div class="loading-box" v-if="isShowLoading">
      <loading>
        <p v-if="loadingText">{{loadingText}}</p>
      </loading>
    </div> -->
    <div class="guider" v-show="isShowGuider">
      <guider></guider>
    </div>
    <div style="background:#fff;border-bottom: 1px solid #dddddd" v-show="!isShowGuider">
      <div class="myhead">
        <my-header></my-header>
      </div>
    </div>
    <div class="mybody" v-show="!isShowGuider">
      <transition name="notify-fade" mode="out-in">
        <div class="notification" v-show="isShowNotification===true">
          <success-notify>
            <span v-if="showNotificationText">{{showNotificationText}}</span>
          </success-notify>
        </div>
      </transition>
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="!$route.meta.noKeepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
          <router-view v-if="$route.meta.noKeepAlive"></router-view>
      </transition>
    </div>
    <modal></modal>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {setStore, getStore} from 'config/mUtils.js'
import {imageBaseUrl} from 'config/env'

import Header from './components/common/Header'
import modal from './components/common/modal'
import successNotify from './components/notification/successNotify'
import loading from './components/loading/loading'
import guider from './components/guider/guider'

export default {
  name: 'app',
  data: function() {
    return {
      uid: '',
      token: '',
      firstLogin: '',    // 第一次登录为0 后面为1
      imgBaseUrl: imageBaseUrl,
    }
  },
  components: {
    'my-header': Header,
    modal,
    successNotify,
    loading,
    guider,
  },
  computed: {
    ...mapState([
        'isShowNotification','isShowLoading','loadingText','showNotificationText','isShowGuider'
      ]),
  },
  created () {
    // setStore('uid', 'USERDGcfrI6i')
    // setStore('token', 'b6ba57161d5f69514ac1829315e0b740')
    // setStore('name','测试微网站名称') 

    this.uid = getStore('uid')
    this.token = getStore('token')
    this.firstLogin = getStore('state')
    if(this.firstLogin == 0) {
      this.TOGGLE_GUIDER()
    }
    this.SAVE_USERINFO({uid:this.uid, token: this.token})
    
    this.SET_LOGO(getStore('logo'))
    this.SET_AVATAR(getStore('headimg'))
  },
  mounted () {
    
  },
  methods: {
    ...mapMutations([
        'SAVE_USERINFO','SET_LOGO','SET_AVATAR','TOGGLE_GUIDER'
      ])
  }
}
</script>

<style>

#app {
  font-family: '微软雅黑', Helvetica, Arial, sans-serif;
  background: #e8e9ef;
  min-height: 100%;
  /*解决滚动条出现的滚动闪烁*/
}
.mybody, .myhead {
  padding-left: calc( 100vw - 100% );
}
.mybody {
  border-top: 1px solid transparent;
  position: relative;
}
.notification {
  width: 280px;
  margin: 0 auto;
  position: fixed;
  top: 0px;
  left: calc( 50vw - 140px );
  z-index: 11;
}
.guider {
 /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index:999;*/
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index:999;
  /*background: rgba(0,0,0,0.82);*/
}
/*transition的动画*/
.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}

.notify-fade-enter-active, .notify-fade-leave-active {
  transition: all .3s ease;
}
.notify-fade-enter, .notify-fade-leave-to {
  transform: translateY(-70px);
  opacity: 0;
}
.loading-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  z-index: 99999;
}
</style>
