import { createStore } from 'vuex'



var store= createStore({
    state(){
     return{
        userId:'',
        userInfo:{

        },
        popStatusList: {
            isBingoPopShow: false,
            isNoBingoPopShow: false,
            isRulePopShow: false,
            isSharePopShow: false,
            isPayPopShow: false,
            isWalletPopShow: false,
        }
     }
    },
    mutations:{

    }
})

export default store