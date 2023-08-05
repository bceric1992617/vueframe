<template>
<div @click="testWallet">123123123123123</div>

</template>

<script setup>
import { ethers  } from 'ethers'
import { reactive, toRefs, onMounted, onUnmounted, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { getMemberInfo, getYydgIndex, paySubmit } from '@/api/index.js';
import { mapState, useStore } from "vuex";
const { proxy } = getCurrentInstance();
const $router = useRouter();
const store = useStore();
const data = reactive({
  indexInfo:{
    goods_list: {},
  },
  timerbox: null,
  noticeList: [],
  lotteryList: [],
  // finished: false,
  refreshing: false,
  wallet_addr : '',
})


const testWallet = () => {
  // console.log(ethereum,33333)

  // const from = await ethereum.request({ method: 'eth_requestAccounts' });
  const payload = {
    // method: 'eth_sendTransaction',
    method: 'eth_signTransaction',
    // method: 'eth_sign',
    params: [{

      from: data.wallet_addr, 
      // from: this.accounts,
      // from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
      gas: '0x5208', // 30400
      gasPrice: '0x4a817c808', // 10000000000000
      value: '0x9184e72a', // 2441406250
      // to: '0x3535353535353535353535353535353535353535',
      to: "0x3535353535353535353535353535353535353535",
      chainId: 1,
      nonce: '1',
    }],
  }

  window.ethereum.request(payload);
}


onUnmounted(() => {
  clearInterval(data.timerbox)

})

onMounted(async () => {

  document.body.style.backgroundColor = '#F8F8F8'; 
  
  // let ethersObj = new ethers.providers.Web3Provider(window.ethereum);
  // ethersObj.send("eth_requestAccounts", []).then((res) => {
  //   if(res[0]) {
  //     console.log(res[0])
      
  //   }
  // })

  window.ethereum.request({method: 'eth_requestAccounts'}).then(res => {
    data.wallet_addr = res[0]
  })

})

const { bingoList, noticeList, indexInfo, lotteryList,refreshing } = toRefs(data)
</script>

<style lang="scss" scoped>
.divContent {
  position: absolute;
  top: 70%;
  background: none;
}


.body {
  background-image: url("@/assets/img/indexBg.png");
  background-repeat:no-repeat;
  background-size: 100% 1400px;
  
  // height:100vh
}


.notice{

  &-swipe {
    height: 40px;
    line-height: 15px;
    color:#fff;
    font-size: 0.7rem;
  }

  &-noticeRowStyle {
    height:40px;
    line-height:15px;
    width:100%;
    white-space:normal;
    word-break:break-word;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  ::v-deep .van-notice-bar__left-icon {
    color:#fff
  }
  ::v-deep .van-notice-bar {
    height:40px
  }
}

.rule {
  position: absolute;
  right:-5%;
  top:20%;
  color:#fff;
  font-size: 0.8rem;
  padding:7px 15px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  background:linear-gradient(to right, #F9826B, #F75362)
}

.lotteryBg {
  background-image: url("@/assets/img/lotteryBg.png");
  background-repeat:no-repeat;
  background-size: 100% 100%;
  width:85%;
  height:305px;

  padding: 17px;

}

.userBingoInfo {
  // min-height: 50px;
  max-height: 370px;
  overflow: auto;
}

.lottery {
  background-image: url("@/assets/img/box.png");
  background-repeat:no-repeat;
  background-size: 100% 100%;
  height:530px;
}


::v-deep .prize__item  span {
  display: block;
  height:20px;
  line-height:12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  
}
</style>