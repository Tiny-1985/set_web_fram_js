
import { jc_web_com } from './jc_web_common.js'

let isDOM = jc_web_com.isDOM;


/**
 * [description]方法引用后点html标签名称一层一层画页面，obj.div({“属性名称”：“属性值”}，“添加的内容”，obj.a({}在这个div下添加a标签，一直循环使用))
 * @param  {Object}    options.get(target,property) {		return    (arr [description]
 * @param  {...[type]} children                     [description]
 * @return {[type]}                                 [description]
 */
const JC_WEB_TIER = new Proxy({},{
	get(target,property) {
		return (arr={},...children) => {
			const el = document.createElement(property);
			if(isDOM(el)) {
				for(let key of Object.keys(arr)) {
					el.setAttribute(key,arr[key]);
				}
				for(let child of children) {
					if(typeof child == 'string') {
						child = document.createTextNode(child);
					} 
					el.appendChild(child);
				}
				return el;				
			} else {
				// console.error(`很遗憾，"${property}"不是html标签`);
				throw new Error(`很遗憾，"${property}"不是html标签`);
				return;
			}
		}
	}
})

/**
 * [description]添加html标签
 * @param  {[type]} {	get(target,porperty) {		return    (standardDom,handleDom,...children) [description]
 * @return {[type]}                         [description] .after==>插入后面 (标准标签，插入标签)，
 *                                                        .before==>插入前面(标准标签，插入标签，插入到标准标签子标签下标第几个前面，int类型)
 *                                                        .body ==>添加到body标签里，第一个位置，只需要把要传的dom参数，这是最好一部
 */
const JC_WEB_ADD = new Proxy({},{
	get(target,porperty) {
		return (standardDom,handleDom,...children) => {
			const add_fu = () => {
				if(jc_web_com.isDOM(standardDom)) {
					if(isDOM(handleDom)) {
						if(children.length > 0) {
							if(typeof children[0] == "number") {
								standardDom.insertBefore(handleDom,standardDom.children[children[0]]);
							} else {
								console.error(`${children[0]}必须是number下标类型`);
							}
						} else {
							let parentDom = standardDom.parentNode;
							if(parentDom.lastChild == standardDom) {
								standardDom.appendChild(handleDom);							
							} else {
								parentDom.insertBefore(handleDom,standardDom.nextSibling);
							}
						}
					} else {
						// console.error(`很遗憾，"${handleDom}"不是DOM对象`);
						throw new Error(`很遗憾，"${handleDom}"不是DOM对象`);
					}
				} else {
					// console.error(`很遗憾，"${standardDom}"不是DOM对象`);
					throw new Error(`很遗憾，"${standardDom}"不是DOM对象`);
				}
			}

			if(porperty == "before") {
				add_fu();
			} else if(porperty == "after") {
				add_fu();
			} else if(porperty == "body") {
				if(typeof handleDom == "number") {
					if(handleDom == -1) {
						document.querySelector('body').insertBefore(standardDom,document.querySelector('body').querySelector("script"));
					} else {
						document.querySelector('body').insertBefore(standardDom,document.querySelector('body').children[handleDom]);						
					}
				} else {
					document.querySelector('body').insertBefore(standardDom,document.querySelector('body').children[0]);					
				}
			}

			return standardDom;			
		}
	}
})

export {
    JC_WEB_TIER,
    JC_WEB_ADD    
}
