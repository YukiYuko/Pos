<style lang="less" scoped>
  .left-nav{
    color:#fff;
    font-size:10px;
    height:100%;
    background-color: #1D8ce0;
    position: absolute;left: 0;top: 0;
    width:60px;
    ul{
      padding:0px;
      margin: 0px;
      li{
        list-style: none;  text-align: center;  border-bottom:1px solid #20a0ff;
        padding:10px;cursor: pointer;
        &:hover,&.active{ background-color: rgba(255,255,255,0.63);color: #20a0ff;border-color: rgba(255,255,255,0.63)}
      }
    }
  }
  .iconfont{
    font-size:24px;
  }
</style>
<template>
    <div class="left-nav">
      <ul>
        <li :class="{active:$route.name=='pos'}" @click="go(['pos'])">
          <i class="icon iconfont icon-shouyin"></i>
          <div>收银</div>
        </li>

        <li :class="{active:$route.name=='hotel'}" @click="go(['hotel'])">
          <i class="icon iconfont icon-dianpu"></i>
          <div>店铺</div>
        </li>

        <li>
          <i class="icon iconfont icon-shangpin"></i>
          <div>商品</div>
        </li>

        <li>
          <i class="icon iconfont icon-huiyuan"></i>
          <div>会员</div>
        </li>


        <li>
          <i class="icon iconfont icon-app-tongji"></i>
          <div>统计</div>
        </li>
      </ul>
    </div>
</template>

<script type="es6">
    import {go} from '../../action'
    export default{
        name: 'leftNav',
        data(){
            return{

            }
        },
        components: {

        },
        methods:{
            go
        },
        created(){
            console.log(this.$route.name)
        }
    }
</script>
