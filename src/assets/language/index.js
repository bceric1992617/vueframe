import { createI18n } from 'vue-i18n'
import messages from './languageImport.js'


let langDefault = '';

if(window.location.host.indexOf("--------") > -1) { //简体 
  langDefault = 'zh';
  
} else if(window.location.host.indexOf("tw.lazadam1.com") > -1) { //繁体
  langDefault = 'zhf';
  
} else if(window.location.host.indexOf("en.lazadam1.com") > -1) { //英文
  langDefault = 'en';
  
} else if(window.location.host.indexOf("ma.lazadam1.com") > -1) { //马来
  langDefault = 'ma';
  
} else if(window.location.host.indexOf("id.lazadam1.com") > -1) { //印尼
  langDefault = 'id';
  
} else if(window.location.host.indexOf("vn.lazadam1.com") > -1) { //越南
  langDefault = 'vn';
  
}  else if(window.location.host.indexOf("th.lazadam1.com") > -1) { //越南
  langDefault = 'th';
  
} else {
  langDefault = 'zhf';
  // langDefault = 'ma';
  // langDefault = 'en';
  // langDefault = 'id';
  // langDefault = 'vn';
  // langDefault = 'th';
  
}

localStorage.setItem('yydgLanguage',langDefault)

// 默认语言
const i18n = createI18n({
  locale: langDefault,		//默认显示的语言 
  messages
})

export default i18n;