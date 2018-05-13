import {jc_web_com} from './jc_web_common.js'

let JC_WEB_COMP = {},
	style = jc_web_com.styleNX,
	isDOM = jc_web_com.isDOM,
	juderArray = jc_web_com.juderArray;


/**
 * [tree_dom description]树结构
 * @param  {[type]} treeJson [description] 
 *
 *							{
 *								domId: "",
 *								content: [
 *									{
 *										name: "",//第一层
 *										font: ["*或者-",span],//-符号代表list必须有值
 *										addAtt: {
 *											nameAtt:{//给name添加的属性
 *												 "class": "",
 *											     "@click": ""
 *											},
 *											fontAtt:{//添加属性==>只是给font[0],添加的属性
 *											    "class": "",
 *											    "@click": ""
 *										     }
 *										},
 *										list: [//如果没有值就赋值0
 *											{
 *												name: "",//第二层
 *												font: ["*或者-",span],//-符号代表list必须有值
 *										        addAtt: {
 *											        nameAtt:{//给name添加的属性
 *												        "class": "",
 *											            "@click": ""
 *											        },
 *											        fontAtt:{//添加属性==>只是给font[0],添加的属性
 *											        	
 *											            "class": "",
 *											            "@click": ""
 *										             }
 *										        },
 *												list: [
 *													。//继续上层模式
 *													。
 *													。
 *												]
 *											}
 *										]
 *									}
 *									。
 *									。
 *									。
 *								]
 *								
 *							}
 * 
 * @return {[type]}          [description]
 */
JC_WEB_COMP.tree_dom = function(treeJson,callBack) {
	if(typeof treeJson == "undefined") {
		throw new Error("没有传参数");
	}
	if(document.getElementsByTagName("head").item(0).querySelector("#treeDomId") == null) {
		const ulStyle = `#${treeJson.domId} ul {
			list-style: none;
		}`,
			  spanStyle = `#${treeJson.domId} ul > li > span {
			cursor: pointer;
		}`,

		      disNode = `#${treeJson.domId} .tree_dis_none {
			 	overflow: hidden;
			 	animation: tree_animation_none 500ms ease-out;
			 	height: 0px;
		}`,
			  disBlock = `#${treeJson.domId} .tree_dis_block {
			display: block;
			animation: tree_animation_block 0.5s ease-in-out both;
		}`,
	
			  unfoldSign = `#${treeJson.domId} .tree_unfold_sign {
			font-size: 20px;
			margin-right: 10px;
		}`,
			  modalAnimationBlock = `@keyframes tree_animation_block {
			0% {transform: translateY(-50%);opacity:0;}
			50% {opacity:0.5;}
			100% {transform: translateY(0);opacity: 1;}
	    }`,
	          modalAnimationNone = `@keyframes tree_animation_none {
			0% {height: 100%; opacity: 1;transform: translateY(0%);}
			50% {height:50%; opacity: 0.5;transform: translateY(-25%);}
			100% {height: 0; opacity: 0;transform: translateY(-50%);}
	    }`;
		style({
			"cssId": "treeDomId",
			"cssObj": [ulStyle,spanStyle,disNode,disBlock,unfoldSign,modalAnimationBlock,modalAnimationNone]
		})
	}
	const insertDom = document.getElementById(treeJson.domId);
	let createUlFu = (arr) => {
		if(!arr) {
			return '';
		}
		const createUl = document.createElement("ul");		

		arr.forEach((val,index) => {
			const createLi = document.createElement("li");
			if(typeof val.font == "undefined") {
				val.font = ["*",""];
			} else if(typeof val.font == "string") {
				val.font = [val.font,""];
			}
			if(val.font.length < 2) {
				val.font.push("");
			}
			const createSpan = document.createElement("span");
			if(val.font[0] == "-" || val.font[0] == "+") {
				createSpan.innerHTML = val.font[0];
				createSpan.classList.add("tree_unfold_sign");
			}

			if(typeof val.addAtt == "object") {
				for(let key of Object.keys(val.addAtt)) {
					if(Object.is("fontAtt",key)) {						
						for(let fontKey of Object.keys(val.addAtt.fontAtt)) {
							createSpan.setAttribute(fontKey,val.addAtt.fontAtt[fontKey]);
						}
					}
				}
			}

			//当需要展开下级菜单时
			createSpan.onclick = function() {				
				if(createSpan.parentNode.lastChild.classList.length > 0) {
					createSpan.parentNode.lastChild.classList.forEach((data) => {
						if(data == "tree_dis_none") {
							createSpan.parentNode.lastChild.classList.remove(data);
							createSpan.parentNode.lastChild.classList.add("tree_dis_block");
							if(createSpan.innerHTML == "+") {
								createSpan.innerHTML = "-";
							}

						} else if (data == "tree_dis_block") {
							createSpan.parentNode.lastChild.classList.remove(data);
							createSpan.parentNode.lastChild.classList.add("tree_dis_none");
							if(createSpan.innerHTML == "-") {
								createSpan.innerHTML = "+";
							}
						}
					})
				} else {
					createSpan.parentNode.lastChild.classList.add("tree_dis_none");
					if(createSpan.innerHTML == "-") {
						createSpan.innerHTML = "+";
					}
				}			
				
			}

			createLi.appendChild(createSpan);
			if(isDOM(val.font[1])) {
				createLi.appendChild(val.font[1]);
			}
			const createSpanName = document.createElement("span");
			createSpanName.innerHTML = val.name;
			
			//当点击项目时，回调数据
			createSpanName.onclick = function() {
				console.log(val.list);
				if(callBack && typeof callBack === "function") {
					callBack(val.list);
				}
			}

			if(typeof val.addAtt == "object") {
				for(let key of Object.keys(val.addAtt)) {
					if(Object.is("nameAtt",key)) {						
						for(let nameKey of Object.keys(val.addAtt.nameAtt)) {
							createSpan.setAttribute(nameKey,val.addAtt.fontAtt[nameKey]);
						}
					}
				}
			}			

			createLi.appendChild(createSpanName);
			if(typeof val.list == "object") {
				createLi.appendChild(createUlFu(val.list));
			}
			createUl.appendChild(createLi);
			if(val.font[0] == "+") {
				createSpan.parentNode.lastChild.classList.add("tree_dis_none");					
			}
			
		})

		return createUl;
	}
	insertDom.appendChild(createUlFu(treeJson.content));
	return insertDom;
}

/**
 * [description]生成按钮
 * @param  {[type]} butJson [description]font_size==>设置字体大小（默认14px）,width==>设置按钮宽(默认auto，传入参数是string类型==》100px、100%)，height==>设置按钮高（默认30px，传入参数是int类型）
 * @return {[type]}         [description]content==>按钮内容
 */
JC_WEB_COMP.module_button = function(butJson) {
	
	if(typeof butJson == "undefined") {
		butJson = {};
	}
	const button = document.createElement('button');

    let but_content = butJson.content ? butJson.content : "确定",but_style_id;

    if(document.getElementsByTagName("head").item(0).querySelector("#butId") == null) {
		let but_font_size = butJson.font_size ? butJson.font_size : 14,
			 but_width_num = butJson.width ? `${butJson.width}` : "auto",
			 but_height_num = butJson.height ? butJson.width : 30;
		
		let but_primary = `.but_primary {
			width:${but_width_num}px;
			height:${but_height_num}px;
		}`,
			but_cancle = `.but_cancle {
			color: #333333;
			background-color: #ffffff;
			border: 1px solid #CCCCCC;
		}`,
			but_save = `.but_save {
			color: #FFFFFF;
			background-color: #337ab7;
			border: 1px solid #2e6da4;
		}`,
		    but_css = `.but_css {
			display: inline-block;
			padding: 6px 12px;
			font-size: ${but_font_size}px;
			font-weight: 400;
			line-height: 1.42857143;
			text-align: center;
			white-space: nowrap;
			vertical-align: middle;
			user-select: none;
			background-image: none;
			border-radius: 4px;
			touch-action: manipulation;
			cursor: pointer;
		}`,
	        button_cancle_hove = `.but_cancle:hover {
			background-color: #e6e6e6;
			border: 1px solid #adadad;
		}`,
			button_save_have = `.but_save:hover{
			background-color: #286090;
			border: 1px solid #204d74;
		}`;
	    style({
	    			"cssId": `butId`,
	    			"cssObj":[but_primary,but_css,but_cancle,but_save,button_save_have,button_cancle_hove]
	    		});    	
    }

    if(but_content == "关闭" || but_content == "取消") {
    	button.className = `but_primary but_css but_cancle`;
    } else {
    	button.className = `but_primary but_css but_save`;
    }
    button.innerText = but_content;
    return button;
}

/**
 * [description]生成input框
 * @param  {[type]} inputJson [description]width==>input宽(默认auto)，height==>input高(默认34px),font_size==>字体大小(默认14px)
 * @return {[type]}           [description]type ==> input类型(默认text)，hint==>框内提示语(有默认值)
 */
JC_WEB_COMP.module_input = function(inputJson) {
	if(typeof inputJson == "undefined") {
		inputJson = {};
	}
	const input = document.createElement("input");

	if(document.getElementsByTagName("head").item(0).querySelector("#inputId") == null) {
		let input_width = inputJson.width ? `${inputJson.width}` : "auto";
		let input_height = inputJson.height ? inputJson.height : 34;
		let input_font_size = inputJson.font_size ? inputJson.font_size : 14;

		let input_css = `.input_css {
			width: ${input_width};
			height: ${input_height}px;
			display: inline-block;
			padding: 6px 12px;
		    font-size: ${input_font_size}px;
		    line-height: 1.42857143;
		    color: #555;
		    background-color: #fff;
		    background-image: none;
		    border: 1px solid #ccc;
		    border-radius: 4px;
		}`;
		style({
	    			"cssId": "inputId",
	    			"cssObj":[input_css]
	    		});		
	}							

	input.className = "input_css";
	input.placeholder = inputJson.hint ? inputJson.hint : "请认真填写";
	input.type = inputJson.type ? inputJson.type : "text";
	return input;
}

/**
 * [description]生成下拉框
 * @param  {[type]} selectJson [description]width==>宽度(默认auto)，height==>高度在(默认34，int类型)
 * @return {[type]}            [description]optionArr==>下拉框中的值[]数组类型
 */
JC_WEB_COMP.module_select = function(selectJson) {
	if(typeof selectJson == "undefined") {
		selectJson = {};
	}
	const select = document.createElement("select"),
		  option = document.createElement("option");

	if(document.getElementsByTagName("head").item(0).querySelector("#selectId") == null) {

		let select_width = selectJson.width ? `${selectJson.width}` : "auto",
			select_height = selectJson.height ? selectJson.height : 34;

		let input_sm = `.input_sm {
			text-transform: none;
			font-family: inherit;
			transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
			box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
			box-sizing: border-box;
		}`;
		let select_css = `.select_css {
			display: block;
		    width: ${select_width};
		    height: ${select_height}px;
		    padding: 6px 12px;
		    font-size: 14px;
		    line-height: 1.42857143;
		    color: #555;
		    background-color: #fff;
		    background-image: none;
		    border: 1px solid #ccc;
		    border-radius: 4px;
		}`;

		let option_css = `.option_css {
				
		}`;

		let option_hover = `.option_css:hover{
			cursor: pointer;
		}`;
		style({
			"cssId": "selectId",
	    	"cssObj":[select_css,input_sm,option_css,option_hover]
		})
	}

	select.className = "select_css input_sm";
	option.value = "0";
	option.innerText = "请选择";
	option.className = "option_css";
	select.appendChild(option);
	if(typeof selectJson.optionArr == "undefined") {
		selectJson.optionArr = [];
	}
	if(selectJson.optionArr.length > 0) {
		selectJson.optionArr.forEach((optionTag) => {
			let optiones = document.createElement("option");
			optiones.value = optionTag.value;
			optiones.innerText = optionTag.text;
			optiones.className = "option_css";
			select.appendChild(optiones);
		});
	}
	return select;
}

/**
 * [description]生成table表格
 * @param  {[type]} tableJson [description]
 *                           {
 *                           	theadTrTitle: {
 *                           		content: ["标题1"，"标题2"],
 *                           		attArrTd: [
 *                           			{
 *                           				attribute: {
	 *                           				class: "添加属性==》列"
	 *                           			}
	 *                           			attSite: 1 //位置
 *                           			}
 *                           			↓
 *                           			。。。
 *                           		],
 *                           		attArrTr: {
 *                           			class: "添加属性==》行"
 *                           		}
 *                           	}，
 *                           	tbodyTrContent: {
 *                           		handleBut: [],//是否有操作列，修改，删除按钮等，下标顺序对应列
 *                           		content: [],//表格内容
 *                           		tdFieldOrder: [],//如果不用插件，请认真填写，如果不用插件，也没有填写此项，那就默认content内的顺序
 *                           		useADT: true/false,//是否使用插件，默认为true
 *                           		attArrTd: [
 *                           			{
 *                           				attribute: {
	 *                           				class: "添加属性==》列"
	 *                           			},
	 *                           			attSite: 1 //位置,如果值为-1就是所有赋值
 *                           			}
 *                           			↓
 *                           			。。。
 *                           		],
 *                           		attArrTr: [
 *                           			{
 *                           				attribute: {
	 *                           				class: "添加属性==》列"
	 *                           			},
	 *                           			attSite: 1 //位置,如果值为-1就是所有赋值
 *                           			}
 *                           			↓
 *                           			。。。
 *                           		]
	 *                           		
 *                           		
 *                           	}
 *                           }
 * @return {[type]}           [description]
 */
JC_WEB_COMP.module_table = function(tableJson) {
	const table = document.createElement("table"),
		thead = document.createElement("thead"),
		tbody = document.createElement("tbody");
	let tabelTdLen,tableBodyLen;
	if(document.getElementsByTagName("head").item(0).querySelector("#tableId") == null) {
		const tab_width_100 = `.tab_width_100{
			width: 100%;
			text-align: center;
		}`;
		style({
			"cssId": "tableId",
	    	"cssObj":[tab_width_100]
		});
	}

	table.setAttribute("cellpadding",0);
	table.setAttribute("cellspacing",0);
	table.setAttribute("border", "1");
	table.className = "tab_width_100";
	

	if(tableJson.theadTrTitle) {
		const headTr = document.createElement("tr");
			  tabelTdLen = tableJson.theadTrTitle.content.length;
		if(tabelTdLen > 0) {
			let tabelTdArr = tableJson.theadTrTitle.content;
			tabelTdArr.forEach( (headContent, hIndex) => {
				let headTd = document.createElement("td");
				if(tableJson.theadTrTitle.attArrTd) {
					let attArr = tableJson.theadTrTitle.attArrTd;
					attArr.forEach((attObj,attIndex) => {
						let att = attObj.attribute,
							site = attObj.attSite;

						if(site == -1) {
							for(let key of Object.keys(att)){
								if(key == "class") {
									headTd.classList.add(att[key]);
								} else {
									headTd.setAttribute(key, att[key]);
								}
							}
						} else {
							if(hIndex == site) {
								for(let key of Object.keys(att)){
									if(headTd.className) {
										if(key == "class") {
											headTd.classList.add(att[key]);
										} else {
											headTd.setAttribute(key, att[key]);
										}
									} else {
										headTd.setAttribute(key, att[key]);
									}									
								}
							}
						}

					});
				}
				headTd.innerText = headContent;
				headTr.appendChild(headTd);
			});
			
			if(tableJson.theadTrTitle.attArrTr) {
				let attArrTr = tableJson.theadTrTitle.attArrTr;
				for(let key of Object.keys(attArrTr)) {
					headTr.setAttribute(key, attArrTr[key]);
				}
			}
			
			thead.appendChild(headTr);			
			table.appendChild(thead);
		} else {
			// console.error("很遗憾，没有设置标题内容数组🤷");
			throw new Error("很遗憾，没有设置标题内容数组🤷");
		}
	} else {
		// console.error("表格没有设置表头标题🤷");
		throw new Error("表格没有设置表头标题🤷");
	}

	if(tableJson.tbodyTrContent && tableJson.tbodyTrContent.content) {
		
		// if(tableJson.tbodyTrContent.handleBut && tableJson.tbodyTrContent.handleBut.length > 0) {
			tableBodyLen = tableJson.tbodyTrContent.content.length + tableJson.tbodyTrContent.handleBut ? tableJson.tbodyTrContent.handleBut.length : 0;
			if(tableBodyLen < tabelTdLen) {
				throw new Error("很遗憾，表格内容少于表头内容");
			}
			if(tableBodyLen > tabelTdLen) {
				throw new Error("很遗憾，表格内容大于表头内容");
			}



			const bodyCon = tableJson.tbodyTrContent.content,
				  hadleCont = tableJson.tbodyTrContent.handleBut ? tableJson.tbodyTrContent.handleBut : [];

			for(let key of Object.keys(tableJson.tbodyTrContent)) {
				if(Object.is("useADT",key) === false) {
					tableJson.tbodyTrContent.useADT = true;
				};
				if(Object.is("tdFieldOrder",key) === false){
					tableJson.tbodyTrContent.tdFieldOrder = [];
					if(judgeArray(bodyCon[0]) === false) {
						for(let key of Object.keys(bodyCon[0])) {
							tableJson.tbodyTrContent.tdFieldOrder.push(key);
						}
					}
					
				}
			}

			if(tableJson.tbodyTrContent.useADT) {//使用插件映射数值	
				const bodyTr = document.createElement("tr");
				for(let val of Object.keys(tableJson.tbodyTrContent.attArrTr)) {
					bodyTr.setAttribute(val,tableJson.tbodyTrContent.attArrTr[val]);
				}

				for(let i = 0; i < tabelTdLen; i++) {
					const bodyTd = document.createElement("td");

					if(i < hadleCont.length) {
						bodyTd.appendChild(hadleCont[i]);
					} else {
						let tdIndex = i - hadleCont.length;
						if(tdIndex < 0) {
							tdIndex = 0;
						}
						if(tableJson.tbodyTrContent.attArrTd && tableJson.tbodyTrContent.attArrTd.length < 1) {
							throw new Error("您没有合理的添加插件属性名称");							
						}

						tableJson.tbodyTrContent.attArrTd.forEach(function(att){
							if(att.attSite == -1) {
								for(let key of Object.keys(att.attribute)) {
									bodyTd.setAttribute(key,att.attribute[key]);
								}
							} else if(att.attsite > -1) {
								if(att.attSite === i) {
									for(let key of Object.keys(att.attribute)) {
										if(bodyTd.className) {
											if(key == "class") {
												bodyTd.classList.add(att.attribute[key]);
											} else {
												bodyTd.setAttribute(key,att.attribute[key]);
											}
										} else {
											bodyTd.setAttribute(key,att.attribute[key]);
										}
										
									}
								}
							}
						})
					}

					bodyTr.appendChild(bodyTd);
				}						
				tbody.appendChild(bodyTr);				

			} else {//不用插件赋值，原生js
				let tempSiteTrIndex = 0;			
				bodyCon.forEach((objTr,objIndex) => {
					const bodyTr = document.createElement("tr");
					let tempObjTr = tableJson.tbodyTrContent.attArrTr[objIndex];
					if(tempObjTr != "undefined") {
						if(tempObjTr.attSite === -1) {
							tempSiteTrIndex = objIndex;
							for(let key of Object.keys(tempObjTr.attribute)) {
								if(key == "class") {
									bodyTr.classList.add(attribute[key]);
								} else {
									bodyTr.setAttribute(key,tempObjTr.attribute[key]);
								}
								
							}
						} else {
							if(objIndex === tempObjTr.attSite) {
								for(let key of Object.keys(tempObjTr.attribute)) {
									if(bodyTr.className) {
										bodyTr.classList.add(attribute[key]);
									} else {
										bodyTr.setAttribute(key,tempObjTr.attribute[key]);										
									}
								}
							}
						}
					} else {
						for(let key of Object.keys(tableJson.tbodyTrContent.attArrTr[tempSiteTrIndex].attribute)) {
							if(bodyTr.className) {
								bodyTr.classList.add(tableJson.tbodyTrContent.attArrTr[tempSiteTrIndex].attribute[key]);
							} else {
								bodyTr.setAttribute(key,tableJson.tbodyTrContent.attArrTr[tempSiteTrIndex].attribute[key]);								
							}
						}
					}

					for(let i = 0; i < tabelTdLen; i++) {
						const bodyTd = document.createElement("td");
						if(i < hadleCont.length) {
							bodyTd.appendChild(hadleCont[i]);
						} else {
							let tempIndex = i - hadleCont.length;
							if(tempIndex < 0) {
								tempIndex = 0;
							}
							if(judgeArray(objTr[tempIndex])) {
								bodyTd.innerHTML = objTr[objIndex][tempIndex];
							} else {
								bodyTd.innerHTML = objTr[tableJson.tbodyTrContent.tdFieldOrder[tempIndex]];								
							}

							let tempObj = tableJson.tbodyTrContent.attArrTd[tempIndex],
								tempSiteIndex = 0;
							if(tempObj != "undefined") {
								if(tempObj.attSite == -1) {
									tempSiteIndex = tempIndex;
									for(let key of Object.keys(tempObj.attribute)) {
										if(bodyTd.className) {
											bodyTd.classList.add(tempObj.attribute[key]);											
										} else {
											bodyTd.setAttribute(key,tempObj.attribute[key]);
										}
									}
								} else {
									if(i === tempObj.attSite) {
										for(let key of Object.keys(tempObj.attribute)) {
											if(bodyTd.className) {
												bodyTd.classList.add(tempObj.attribute[key]);											
											} else {
												bodyTd.setAttribute(key,tempObj.attribute[key]);
											}
										}
									}
								}
							} else {
								if(tableJson.tbodyTrContent.attArrTd[tempSiteIndex].attSite == -1) {
									for(let key of Object.keys(tableJson.tbodyTrContent.attArrTd[tempSiteIndex].attribute)) {
										if(bodyTd.className) {
											bodyTd.classList.add(tableJson.tbodyTrContent.attArrTd[tempSiteIndex].attribute[key]);
										} else {
											bodyTd.setAttribute(key,tableJson.tbodyTrContent.attArrTd[tempSiteIndex].attribute[key]);											
										}
									}
								}
							}

							/*tableJson.tbodyTrContent.attArrTd.forEach(function(att){
								if(att.attSite == -1) {
									for(let key of Object.keys(att.attArrTd)) {
										bodyTd.setAttribute(key,att.attArrTd[key]);
									}
								} else if(att.attsite > -1) {
									if(att.attSite === i) {
										for(let key of Object.keys(att.attArrTd)) {
											bodyTd.setAttribute(key,att.attArrTd[key]);
										}
									}
								}
							})*/
						}
					}
				})

			}

		/*} else {
			tableBodyLen = tableJson.tbodyTrContent.content.length;
			if(tableBodyLen < tabelTdLen) {
				throw new Error("很遗憾，表格内容少于表头内容");
			}
			if(tableBodyLen > tabelTdLen) {
				throw new Error("很遗憾，表格内容大于表头内容");
			}

		}*/

	}

	return table;

}

let JC_WEB_COMP_PROXY = new Proxy(JC_WEB_COMP,{
	get(traget,key) {
		if(key == "button") {
			return Reflect.get(traget,"module_button");
		} else if(key == "input") {
			return Reflect.get(traget,"module_input");
		} else if(key == "select") {
			return Reflect.get(traget,"module_select");
		} else if(key == "table") {
			return Reflect.get(traget,"module_table");
		} else if(key == "tree_dom") {
			return Reflect.get(traget, "tree_dom");
		}
	},
	deleteProperty(traget,delPro) {
		throw new Error("不能删除o，你太淘气了。。。👊");
		return true;
	},
	defineProperty(traget,key,des) {
		throw new Error("辛苦了，但抱歉不能扩展🤷");
		return false;
	},
	ownKeys(traget) {
		return [];
	}
})

export {
	/*module_button as button,
	module_input as input,
	module_select as select,
	module_table as table*/
	JC_WEB_COMP_PROXY as jc_web_comp
}