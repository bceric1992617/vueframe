import { showToast,showImagePreview } from 'vant';
import useClipboard from 'vue-clipboard3'
import Fingerprint2 from '@/utils/Fingerprint2.js'
import messages from '@/assets/language/languageImport.js'
import store from '@/store'

const common = {
    unitTransfer(val) {
        val = val.toString();
        if(val.length > 3) {
            val = val.substr(0, val.length - 3) + 'K';
        } 
        return val;
    },

    floatTransfer(val) {
        if(typeof val != 'number'){
            val = parseFloat(val)
        }

        if(!val) {
            return 0;
        }

        return Math.floor(val * 100) / 100;
    },

    reverseString(str) { //字符串反转
        // Step 1. Use the split() method to return a new array
        var splitString = str.split(""); // var splitString = "hello".split("");
        // ["h", "e", "l", "l", "o"]
     
        // Step 2. Use the reverse() method to reverse the new created array
        var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
        // ["o", "l", "l", "e", "h"]
     
        // Step 3. Use the join() method to join all elements of the array into a string
        var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
        // "olleh"
        
        //Step 4. Return the reversed string
        return joinArray; // "olleh"
    },

    simplifiedStr : (str, number, skip = true) => {
        if(!str) {
            // showToast('text is empty!');
            return
        }

        if(str.length > number) {
            let str2 = str.substring(0, number - 3);
            str = str2 + '...'
            
        }
        return str;

    },


    // currentTime: (time = 0) => {
    //     let date = null;
    //     if(time) {
    //         date = new Date(time * 1000);
    //     } else {
    //         date = new Date();
    //     }
    //     return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // },
    currentTime: (time = 0) => {

        let date = new Date(time * 1000);  // 参数需要毫秒数，所以这里将秒数乘于 1000
 
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0'+(date.getHours()+1) : (date.getHours()+1)) + ':';
        let m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        let s = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds();

        return Y+M+D+h+m+s;
    },

    copy: (text) => {
        if(!text) {
            showToast('text is empty!');
            return
        }
        const { toClipboard } = useClipboard()
        try {
            toClipboard(text)
            showToast('success')
        } catch (e) {
            showToast('failed')
        }
    },

    isEmpty(data) {
       
        if(
            data === 0 || 
            data === '0' ||
            data === 0.0 || 
            data === '0.0' || 
            data === undefined || 
            data === "undefined" || 
            data === null || 
            data === '' || 
            data === false ||
            JSON.stringify(data) == '{}' ||
            JSON.stringify(data) == '[]'
        ) {
            return true;
        } else {
            return false;
        }
    },
    // isMobile : () => {
    //     return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    // },
    getUserInfo() {
        if(localStorage.getItem('yydgUserInfo')) {
            return JSON.parse(localStorage.getItem('yydgUserInfo'));
        } else {
            return [];
        }
    },
    removeUserInfo() {
        localStorage.setItem('yydgUserInfo','');
        // showToast('success')
    },

    verifyParams(params) {

        if(common.isEmpty(params)) {
            showToast('Please input frist!'); 
            throw SyntaxError();
        }

        for(let index in params) {
            if(common.isEmpty(params[index])) {
                showToast(index + ' is empty!');
                throw SyntaxError();
            }
        }
    },

    setUserInfo(arr) {
        let arr3 = {};
        if(common.isEmpty(localStorage.getItem('yydgUserInfo'))) {
            arr3 = {...arr};
        } else {
            let arr2 = JSON.parse(localStorage.getItem('yydgUserInfo'));
            arr3 = {...arr2,...arr};
        }
        
        localStorage.setItem('yydgUserInfo', JSON.stringify(arr3));

    },
    

    async getUserId(ip = '') {

  
        if(this.isEmpty(common.getUserInfo().wallet_addr)) {
            const options = {
                excludes: {
                    userAgent: true,
                    audio: true,
                    enumerateDevices: true,
                    fonts: true,
                    fontsFlash: true,
                    webgl: true,
                    canvas: true,
                },
            }
     
            Fingerprint2.get(options, (components) => {
                components.push({
                    key:'ip',
                    value: ip //用户ip，防止同机型生成相同指纹
                });

                // 参数
                const values = components.map((component) => {
                    return component.value
                });



                // 指纹
                common.setUserInfo({
                    wallet_addr : Fingerprint2.x64hash128(values.join(''), 31)
                    // wallet_addr : '7fa2354c966f6c27979c7399347b6f59'
                });
                store.state.userInfo = common.getUserInfo();

            });

        } else {
            store.state.userInfo = common.getUserInfo();
            common.setUserInfo(store.state.userInfo);

        } 


    },

    checkIsLogin() {
        
        if(common.isEmpty(common.getUserInfo().uid)) {
            showToast(messages[localStorage.getItem('yydgLanguage')]['home']['请先登录']);
            throw SyntaxError();
        }
    },
    isAndroid: () => {
        let u = navigator.userAgent;
        return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
    },
    async transferToEth(amount = 0.1) {

        // let url = "/data-api/v3/tools/price-conversion?amount=1&convert_id=2781&id=1027";
        // return Axios.get(url).then(res => {
        //     return (amount / res.data.data.quote[0].price).toFixed(6)
        // })

        return 0.000051
 
    }


}

export default common;