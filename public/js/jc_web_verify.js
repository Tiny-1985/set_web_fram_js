import {jc_web_com} from './jc_web_common.js'

const isDOM = jc_web_com.isDOM;

/**
 * [JC_WEB_REGEXP description] 验证框架
 * @type {Object}
 */
/*JC_WEB_REGEXP = {}

JC_WEB_REGEXP.nx_el = function(el) {
	const verifyDom = document.querySelectorAll(el);
	return verifyDom;
}*/

/*class JC_WEB_REGEXP {
	constructor(property,proData) {
		this.property = property;
		this.proData = proData;
	}



}*/

/**
 * [jc_web_regExp description]
 * @param  {[type]} verifyJson [description]
 *                      ↓
 *                  {
 *                  	el: "id",//最外层div的id
 *                  	
 *                  }
 * @return {[type]}            [description]
 */
/*function jc_web_regExp(verifyJson) {
	if(typeof verifyJson === "undefined") {
		throw new Error("验证框架方法必须传入参数");
	}

	if(typeof verifyJson.el === "undefined") {
		throw new Error("您没有定义作用域，请填写el属性值");
	}

	const scopeDom = document.getElementById(verifyJson.el);
	if(isDOM(scopeDom)) {

				

	} else {
		throw new Error("您定义的作用域无效，请认真定义el");
	}

}*/



/**
 * [description]
 * @param  {[type]} options.get(target,property) {		if(property [description]
 *                                               {
 *                                               	el: "",//作用域
 *                                               	
 *                                               }
 * @return {[type]}                              [description]
 */
const JC_WEB_REGEXP = new Proxy({},{
	get(target,property) {
		if(property === "_regExp") {
			return (arr = {el: ""}) => {
				if(!arr.el) {
					throw new Error("您的_regExp方法必须要设置el属性");
				}
				const scopeDom = document.getElementById(arr.el);
				if(isDOM(scopeDom)) {

					//TODO:2.18-05-05
					

				} else {
					throw new Error("您填写的作用域el不成立，请认真填写");
				}
				return true;
			}			
		} else {
			throw new Error("您调用的是验证框架，请调用_regExp()方法");
		}
	}
});



export {
	JC_WEB_REGEXP
}
