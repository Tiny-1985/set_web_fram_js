
let JC_WEB_COMMON_FU = {};

/**
 * 设置css方法单个class
 * @param {Object} targetObj 创建标签
 * @param {Object} cssObj    css样式对象
 * creater:宁鑫
 */
JC_WEB_COMMON_FU.cssNX = function(targetObj, cssObj) {
    var str = targetObj.getAttribute("style") ? targetObj.getAttribute("style") : "";
    for(var i in cssObj) {
        str += i + ":" + cssObj[i] + ";";
    }
    targetObj.style.cssText = str;
}

/**
 * 生成style内部链接css(多个class类名一起生成)
 * @param {Object} cssObj 出入数组需要加入的样式，“类名{}”==》》
 *                                styleNX([refreshModal, refAllCla, circleCla, refSize]);==》
 *                                var refreshModal = "#refreshModal {
 *                                        position: absolute;top: 0;bottom: 0;left: 0;right: 0;background-color: rgba(0,0,0,0.3);
 *                                        }"
 * creator 宁鑫
 * 2017-05-13
 */
JC_WEB_COMMON_FU.styleNX = function(cssJson) {
    var style = document.createElement('style');
    cssJson.cssId ? style.id = cssJson.cssId : style.id = "";
    //style.id = "styleId";
    style.type = 'text/css';
    var str = "\n";
    for(var i in cssJson.cssObj) {
        if(cssJson.cssObj.hasOwnProperty(i)) {
            str += cssJson.cssObj[i] + "\n";
        }
    }
    style.innerHTML = str;
    document.getElementsByTagName("head").item(0).appendChild(style);
}

/**
 * [description]:判断传入的参数是否是dom对象，是返回true，false
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
JC_WEB_COMMON_FU.isDOM = ( typeof HTMLElement === 'object' ) ? (obj) =>{
                    return obj instanceof HTMLElement;
                } : (obj) => {
                    return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
                }


/**
 * [description]判断传入的参数是否是数组类型
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
JC_WEB_COMMON_FU.judgeArray = function(arr) {
    if(typeof Array.isArray === "function") {
        return Array.isArray(arr);
    } else {
        return Object.prototype.toString.call(arr) === "[object Array]";
    }    
}

/**
 * [description]禁止使用鼠标右键和F12
 * @return {[type]} [description]
 */
const tabooKey = function() {
    const click = (e) => {
        if(document.all) {
            if(event.button == 2 || event.button == 3) {
                alert("👊");
                oncontextmenu = 'return false';
            }
        }
        if(document.layers) {
            if(e.which == 3) {
                oncontextmenu = 'return false';
            }
        }
    }
    if(document.layers) {
        document.captureEvents(Event.MOUSEDOWN);
    }
    document.onmousedown = click;
    document.oncontextmenu = new Function("return false;");
    document.onkeydown = document.onkeyup = document.onkeypress = () => {
        if(window.event.keyCode == 123) {
            window.event.returnValue = false;
            return(false);
        }
    }
}

let JC_WEB_COMMON_FU_PROXY = new Proxy(JC_WEB_COMMON_FU,{
    get(traget,key) {
        return Reflect.get(traget,key);
    },
    ownKeys(target) {
        return [];
    },
    defineProperty(traget,key,des){
        throw new Error("辛苦了，但抱歉不能扩展🤷");
        return false
    },
    deleteProperty(traget,delPro) {
        throw new Error("不能删除o，你太淘气了。。。👊");
        return true;
    }
})

export {
    JC_WEB_COMMON_FU_PROXY as jc_web_com
}