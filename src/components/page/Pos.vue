<style lang="less" scoped>
  .order-list-left{ border-right: 1px solid #e7e7e7;}
  .count{ height: 40px;line-height: 40px;text-align: center;background-color: #fff;
    border-bottom: 1px solid #e7e7e7}
  .order-dell{ margin-top: 20px;}
  .title{  height: 21px;  border-bottom:1px solid #D3DCE6;  background-color: #F9FAFC;
    padding:10px;
  }
  .often-goods-list{
    padding: 20px 0;
    ul{ overflow: hidden;}
    li{ list-style: none;  float:left;cursor: pointer;
      border:1px solid #E5E9F2;  padding:10px;  margin:5px;  background-color:#fff;
      .o-price{  color:#58B7FF;  }
    }
  }
  .cookList{
    li{  list-style: none;  width:23%;  border:1px solid #E5E9F2;
      height: auto;  overflow: hidden;  background-color:#fff;
      padding: 2px;  float:left;  margin: 2px;cursor: pointer;
      span{  display: block;text-align: left}
      .foodImg{  width: 40%;  float:left; }
      .foodName{  font-size: 18px; color:brown; margin-left: 45% }
      .foodPrice{  font-size: 16px; padding-top:10px; margin-left: 45% }
    }
  }

</style>
<template>
    <div class="pos">
      <el-row>
        <el-col class="order-list-left" :span='7'>
          <el-tabs>
            <el-tab-pane label="点餐">
              <!--点餐列表-->
              <el-table :data="tableData" border  style="width: 100%" >
                <el-table-column prop="goodsName" label="商品"></el-table-column>
                <el-table-column prop="count" label="量" width="70"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column  label="操作" width="100" fixed="right">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--合计-->
              <div class="count">
                  总计数量： {{totalNum}} , 总计价格:  {{totalMoney}}  元
              </div>
              <!--点餐操作-->
              <div class="order-dell">
                <el-button type="warning" >挂单</el-button>
                <el-button type="danger" @click="delAllGoods">删除</el-button>
                <el-button type="success" @click="checkout">结账</el-button>
              </div>

            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖a
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col class="order-list-right" :span="17">
          <!--常用商品********************-->
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>

                <li v-for="(item,index) in oftenGoods" :key="index" @click="addOrderList(item)">
                  <span>{{item.goodsName}}</span>
                  <span class="o-price">￥{{item.price}}元</span>
                </li>

              </ul>
            </div>
          </div>
          <!--商品分类**********-->
          <div class="goods-type">

            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class='cookList'>
                  <li v-for="(goods,index) in type0Goods" :key="index">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="(goods,index) in type1Goods" :key="index">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="(goods,index) in type2Goods" :key="index">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="(goods,index) in type3Goods" :key="index">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>

            </el-tabs>
          </div>

        </el-col>
      </el-row>
    </div>
</template>

<script type="es6">
    import axios from 'axios'
    import { Loading } from 'element-ui';

    export default{
        name: 'Pos',
        data(){
            return{
              totalNum:0,
              totalMoney:0,
              tableData: [],
              oftenGoods:[],
              type0Goods:[],
              type1Goods:[],
              type2Goods:[],
              type3Goods:[],
            }
        },
        components: {

        },
        methods:{
            //添加订单列表的方法
          addOrderList(goods){
            let isHave=false;
            //判断是否这个商品已经存在于订单列表
            for (let i=0; i<this.tableData.length;i++){
              console.log(this.tableData[i].goodsId);
              if(this.tableData[i].goodsId==goods.goodsId){
                isHave=true; //存在
              }
            }
            //根据isHave的值判断订单列表中是否已经有此商品
            if(isHave){
              //存在就进行数量添加
              let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
              arr[0].count++;
            }else{
              //不存在就推入数组
              let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
              console.log(newGoods);
              this.tableData.push(newGoods);
            }
            this.total();

          },
          total(){
              this.totalNum=0; //汇总数量清0
              this.totalMoney=0;
              if (this.tableData.length>0){
                this.tableData.forEach((o)=>{
                  this.totalNum+=o.count;
                  this.totalMoney = this.totalMoney +(o.count*o.price);
                })
              }
          },
          //删除单个
          delSingleGoods(goods){
            this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.tableData=this.tableData.filter(o => o.goodsId !=goods.goodsId);  //找出ID 不相等的重新赋值
              this.total();
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //删除所有商品
          delAllGoods() {
            this.$confirm('此操作将删除所有订单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.tableData = [];
              this.totalNum = 0;
              this.totalMoney = 0;
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
          },
          //结账
          checkout() {
            if (this.totalNum!=0) {
              this.$confirm(`一共消费 ${this.totalMoney}，确定结账吗`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.tableData = [];
                this.totalNum = 0;
                this.totalMoney = 0;
                this.$message({
                  message: '结账成功，感谢你又为店里出了一份力!',
                  type: 'success'
                });
              })
            }else{
              this.$message.error('不能空结。老板了解你急切的心情！');
            }

          }
        },
        mounted:function(){
          let orderHeight=document.body.clientHeight;
          document.querySelector(".order-list-left").style.height=orderHeight+'px';
          document.querySelector(".order-list-right").style.height=orderHeight+'px';
        },
        created(){
            let loadingInstance = Loading.service({ fullscreen: true });
            // 获取常用
            axios.get('http://jspang.com/DemoApi/oftenGoods.php')
            .then(response=>{
              console.log(response);
              this.oftenGoods=response.data;
              loadingInstance.close();
            })
            .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
            });
            //获取类型
            axios.get('http://jspang.com/DemoApi/typeGoods.php')
            .then(response=>{
              console.log(response);
              //this.oftenGoods=response.data;
              this.type0Goods=response.data[0];
              this.type1Goods=response.data[1];
              this.type2Goods=response.data[2];
              this.type3Goods=response.data[3];

            })
            .catch(error=>{
              console.log(error);
              alert('网络错误，不能访问');
            })
        }
    }
</script>
