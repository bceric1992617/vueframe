import messages from '@/assets/language/languageImport.js'


const globalValue = {
    bgColor: '#F4F4F4',
    // imgHost : 'http://192.168.190.126:82', //图片地址
    imgHost : 'https://admincontrol.fenghuangsys.com', //图片地址


    //付款状态 1处理中 2已付款 3未付款'
    paystatuscode: {
        processing :1,
        paid :2,
        unpaid :3,
    },

    //是否中奖
    isBingoStatusCode: {
        yes :1,
        no :2,
    },

    LangTYPE: { //header 参数转换
        'zh' : 'zh',
        'en' :'en',
        'vn' :'vitnan',
        'zhf' :'fanZh',
        'IndonesiaName' :'IndonesiaName',
        'jp' :'japan',
        'ma' :'malay',
        'thailand' :'thailand',
        'ko' :'ko',
        'id' : 'id',

    },

    chainList: {
        "0x1" : { chainId: 1,chain: 'erc'},
        "0x38" : { chainId: 56,chain: 'bsc'}
    },
    chainIdList: {
        "1" : { chainCode: "0x1",chain: 'erc'},
        "56" : { chainCode: "0x38",chain: 'bsc'}
    },
    chainNameList: {
        "erc" : { chainCode: "0x1"},
        "bsc" : { chainCode: "0x38"},
    },

    bizhongSymbolList: {
        'vnd': { symbol: '₫', text: 'VND'},
        'usd': { symbol: '$', text: 'USD'},
        'myr': { symbol: '$', text: 'MYR'},
        'idr': { symbol: 'Rp', text: 'IDR'},
        'cny': { symbol: '¥', text: 'CNY'},
        'twd': { symbol: 'NT$', text: 'TWD'}
    },
    defaultBizhong: 'usdt',
    limit:10,
}

export default globalValue;
