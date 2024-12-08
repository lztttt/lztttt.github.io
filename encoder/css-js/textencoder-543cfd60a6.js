const md5Hist={};"zh-CN"!=lang&&(document.title=i18n[lang].textEncoder+i18n[lang].titleSuffix,document.getElementsByClassName("mui-title")[0].innerText=i18n[lang].textEncoder,document.getElementById("encodeButton").innerText=i18n[lang].encode,document.getElementById("decodeButton").innerText=i18n[lang].decode);function decodeUnicode(a){const b=a.replaceAll(-1==a.indexOf("\\u")?"\\":"\\u","%u"),c=unescape(b);return c==b?a:c}function encodeUnicode(a){let b="";for(let c,d=0;d<a.length;d++)c=a.charCodeAt(d).toString(16),4>c.length&&(c=addZero(c,4)),b+="\\u"+c;return b}function openFile(a){if(!(102400>a.size))showDialog(i18n[lang].fileCannotLargerThan.replace("{$size}","100 KB"),{ok:null});else if(a.type){const b=new FileReader,c=showToast();c.show(i18n[lang].loading),b.onload=function(){c.close(),document.getElementsByTagName("textarea")[0].value=this.result},b.readAsDataURL(a)}else showDialog(i18n[lang].unableOpenThisFileType,{ok:null})}document.getElementById("encodeButton").onclick=()=>{const a=document.getElementsByTagName("textarea")[0].value,b=document.getElementsByTagName("select")[0].value||(a?"base64":"dataurl");if(a||"dataurl"==b)switch(b){case"binary":let c="";if(isOnly(numRegExp,a))c=(1*a).toString(2);else for(let b=0;b<a.length;b++)c+=a.charCodeAt(b).toString(2)+" ";document.getElementsByTagName("textarea")[0].value=c;break;case"morse":document.getElementsByTagName("textarea")[0].value=xmorse.encode(a);break;case"qrcode":showQrCode(a);break;case"base64":try{document.getElementsByTagName("textarea")[0].value=btoa(a)}catch(b){document.getElementsByTagName("textarea")[0].value=btoa(unescape(encodeURIComponent(a)))}break;case"dataurl":openDialog();break;case"md5":const d=MD5(a);md5Hist[d]=a,document.getElementsByTagName("textarea")[0].value=d;break;case"unicode":document.getElementsByTagName("textarea")[0].value=encodeUnicode(a);break;case"uricomponent":document.getElementsByTagName("textarea")[0].value=encodeURIComponent(a);}},document.getElementById("decodeButton").onclick=()=>{if(document.getElementsByTagName("textarea")[0].value){let a=document.getElementsByTagName("textarea")[0].value,b=!0;try{if(a.startsWith("data:"))-1==a.indexOf("image/")?a=atob(a.split("base64,")[1]):showImage(a,i18n[lang].decodedImage);else if(-1==a.indexOf(" "))md5Hist[a]?(a=md5Hist[a],showToast(i18n[lang].md5UsuallyCannotBeDecoded)):isOnly(/0|1/,a)?a=parseInt(a,2):isOnly(numRegExp,a)&&decrypt(a)?(b=!1,showPrompt({callback:b=>{const c=decrypt(a,b);c==a?showDialog(i18n[lang].incorrectPassword,{ok:null}):document.getElementsByTagName("textarea")[0].value=c},text:i18n[lang].enterPassword,type:"password"})):isOnly(/\.|-|\//,a)&&xmorse.decode(a)?a=xmorse.decode(a):-1==a.indexOf("%u")?-1==a.indexOf("%")?-1!=a.indexOf("\\u")||-1!=a.indexOf("\\")?a=decodeUnicode(a):a=decodeURIComponent(escape(atob(a))):a=decodeURIComponent(a):a=unescape(a);else if(isOnly(/0|1|\s/,a)){const b=a.trim().split(" ");let c="";for(let a=0;a<b.length;a++)c+=String.fromCharCode(parseInt(b[a],2));a=c}}catch(a){showDialog(a.message,{ok:null})}b&&(document.getElementsByTagName("textarea")[0].value=a)}},document.getElementsByTagName("select")[0].options.add(new Option(i18n[lang].select,"")),document.getElementsByTagName("select")[0].options.add(new Option(i18n[lang].binary,"binary")),document.getElementsByTagName("select")[0].options.add(new Option(i18n[lang].qrCode,"qrcode")),document.getElementsByTagName("select")[0].options.add(new Option(i18n[lang].morseCode,"morse")),document.getElementsByTagName("select")[0].options.add(new Option("Base64","base64")),document.getElementsByTagName("select")[0].options.add(new Option("Data URL","dataurl")),document.getElementsByTagName("select")[0].options.add(new Option("MD5","md5")),document.getElementsByTagName("select")[0].options.add(new Option("Unicode","unicode")),document.getElementsByTagName("select")[0].options.add(new Option("URI Component","uricomponent")),isMobile||document.getElementsByTagName("textarea")[0].focus(),initTextHist(),addEventListener("load",()=>{loadWaves(),loadJs("md5","qrcode","xmorse")});