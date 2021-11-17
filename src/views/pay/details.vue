<template>
  <basic-container>
    <div class="container">
      <div class="layout">
        <div class="title">支付</div>
        <div class="nav">
          <span>确认订单</span>
          <span>选择支付方式</span>
          <span>支付成功</span>
        </div>
        <div class="order">
          <div class="tit">支付{{orderNum}}笔订单</div>
          <div class="message">
            <div class="orderCode">
              订单<span id="orderNo">{{orderNo}}</span>
            </div>
            <div class="orderDetail">
              青鸟云报修产品 云服务版，数量1套，时长1年
            </div>
            <div class="orderPay">
              应付 : <span id="money">￥{{ totalMoney }}</span>
            </div>
          </div>
        </div>
        <div class="payway">
          <div class="tit">支付方式</div>
          <div class="way" style="padding-bottom: 7px">
            <div
              class="weyItem"
              :class="{ check: payWay == 1 }"
              @click="choosePayWay(1)"
            >
              <i></i><span>聚合支付</span>
            </div>
          </div>
        </div>
        <div class="paymoney">
          支付 ：￥<span id="trueMoney">{{ totalMoney }}</span>
        </div>
        <div class="buying" @click="handleNextBtn">确认支付</div>
      </div>
    </div>
  </basic-container>
</template>
<script>
export default {
  data() {
    return {
      payWay: 1, // 1: 聚合支付
      totalMoney: 0,
      orderNum: 1,
      orderNo: 48517961454
    };
  },
  created() {
    this.totalMoney = this.$route.query.totalMoney;
  },
  methods: {
    choosePayWay(type) {
      this.payWay = type;
    },
    handleNextBtn() {
      this.$router.push({
        path: "/pay/pay",
        query: { totalMoney: this.totalMoney },
      });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
  height: 715px;
  position: relative;
  overflow: hidden;
}
.layout {
  width: 100%;
  height: auto;
}

.title {
  height: 36px;
  line-height: 36px;
  font-size: 36px;
  border-left: 4px solid #339999;
  color: #339999;
  padding-left: 5px;
}

.nav {
  width: 100%;
  height: 55px;
  background: #f5f5f7;
  display: flex;
}

.nav > span {
  display: block;
  float: left;
  line-height: 40px;
  font-size: 12px;
  text-align: center;
  margin-right: 6px;
  width: 393px;
  margin-top: 10px;
  color: #fff;
  position: relative;
}

.nav > span:last-child {
  color: #989999;
  background: #ebeded;
  margin-right: 0;
  z-index: 2;
}

.nav > span:nth-child(2) {
  background: #00c1df;
  z-index: 3;
}

.nav > span:nth-child(1) {
  background: #32cde5;
  z-index: 4;
}

.nav > span:nth-child(1)::after,
.nav > span:nth-child(2)::after {
  display: block;
  content: "";
  position: absolute;
  right: -40px;
  top: 0;
  border: 20px solid transparent;
}

.nav > span:nth-child(2)::before,
.nav > span:last-child::before {
  display: block;
  content: "";
  position: absolute;
  left: 0px;
  top: 0;
  border: 20px solid transparent;
  border-left-color: #f5f5f7;
}

.nav > span:nth-child(1)::after {
  border-left-color: #32cde5;
}

.nav > span:last-child::before {
  border-right-color: #ebeded;
}

.nav > span:nth-child(2)::after {
  border-left-color: #00c1df;
}

.order,
.payway {
  width: 100%;
  padding: 4px 18px;
  border: 1px solid #ccc7c7;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
}

.order {
  height: 140px;
  margin: 20px 0 40px 0;
}

.tit {
  font-size: 18px;
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid #ccc7c7;
  font-weight: 700;
  margin-bottom: 8px;
}

.orderCode {
  color: #686666;
  line-height: 32px;
}

.orderDetail {
  color: #323232;
  line-height: 32px;
}

.orderPay {
  position: absolute;
  top: 14px;
  right: 36px;
  color: #323232;
  font-size: 18px;
  font-weight: 700;
}

#money {
  color: #ff6604;
  font-size: 24px;
}

.payway .weyItem {
  cursor: pointer;
}

.payway .weyItem i {
  width: 14px;
  height: 14px;
  background: url("../../../public/img/radio/radioBtn.png") left center;
  background-size: 32px 14px;
  display: inline-block;
  margin: 10px 8px 0 0;
}

.payway .weyItem.check {
  color: #169bd6;
}

.payway .weyItem.check i {
  background-position: right;
}

.paymoney {
  text-align: right;
  margin-top: 30px;
  font-size: 24px;
  font-weight: 700;
  color: #323232;
}

#trueMoney {
  font-size: 20px;
  color: #ff9900;
}

.buying {
  width: 157px;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  color: #fff;
  background: #169bd5;
  border-radius: 4px;
  text-align: center;
  float: right;
  margin-top: 50px;
  cursor: pointer;
}

.grey {
  color: #323232;
  background: #787878;
}
</style>
