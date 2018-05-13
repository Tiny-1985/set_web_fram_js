import {JC_WEB_TIER,JC_WEB_ADD} from './jc_web_frame.js'

import {jc_web_comp} from './jc_web_componet.js'

import {jc_web_com} from './jc_web_common.js'

let style = jc_web_com.styleNX,
	isDOM = jc_web_com.isDOM,
	input = jc_web_comp.input,
	select = jc_web_comp.select;


/**
 * [description]生成带字段名称的input
 * @param  {[type]} textInputJson [description] text==>input框前的名字字段，addInput ==> 引入一个input对象，width==>整个中间件的宽度(默认为50%)
 * @return {[type]}               [description]
 */
const module_text_input = (textInputJson) => {
	if(typeof textInputJson == "undefined") {
		textInputJson = {};
	}

	let tiText = textInputJson.text ? textInputJson.text : "",
		tiInput = isDOM(textInputJson.addInput) ? textInputJson.addInput : input(),
		tiWidth = textInputJson.width ? textInputJson.width : "50%";



	if(document.getElementsByTagName("head").item(0).querySelector("#textInputId") == null) {
		const textInputDialog = `.ti_dialog{
			display: flex;
			justify-content: start;
			box-sizing: border-box;
			width: ${tiWidth}
		}`,
			   tiVerticalCenter = `.ti_vertical_center{
			display: flex;
			justify-content: flex-end;
			align-items: center;
			flex: 2;
	    }`,
	    	    tiTextAlign = `.ti_text_align{
			text-align: left;
	    }`,
			inputVerticalCenter = `.input_vertical_center{
				display:flex;
				justify-content: flex-start;
				align-items: center;
				flex: 4;
			}`;

		style({
			"cssId": "textInputId",
			"cssObj": [textInputDialog,tiVerticalCenter,inputVerticalCenter]
		});
	
	}
		
	return JC_WEB_TIER.div({
		"class": "ti_dialog"
	},JC_WEB_TIER.div({
		"class": "ti_vertical_center"
	  },tiText),
	  JC_WEB_TIER.div({
	  	"class": "ti_text_align input_vertical_center"
	  },tiInput));
}


/**
 * [description]组件中间件组合带标题的input框内容
 * @param  {[type]} groupInputJson [description]
 * @return {[type]}                [description]
 */
const module_group_inputs = (groupInputJson) => {
	//inputs==>inputs对象和input个数及对应的标签属性数组
	//console.log("inputs:",groupInputJson.inputs,"selects:",groupInputJson.selects);	
	if(document.getElementsByTagName("head").item(0).querySelector("#groupInputId") == null) {
		const giFlex = `.gi_flex{
			display: flex;
			flex-wrap: wrap;
		}`;

		style({
			"cssId": "groupInputId",
			"cssObj": [giFlex]
		})		
	}

	let dialogDiv = JC_WEB_TIER.div({"class": "gi_flex"});

	if(groupInputJson.inputs) {
		let inputsObj = groupInputJson.inputs,
			inputsNum = inputsObj.inputsNum,
			inputsContentLen = inputsObj.inputsContent.length;
		if(inputsNum == inputsContentLen && inputsNum != 0) {
			for(let i = 0; i < inputsNum; i++) {
				let inputTemp = input({
					width: inputsObj.inputsContent[i].inputWidth ? inputsObj.inputsContent[i].inputWidth : "",
					heigth: inputsObj.inputsContent[i].inputHeight ? inputsObj.inputsContent[i].inputHeight : "",
					font_size: inputsObj.inputsContent[i].inputFontSize ? inputsObj.inputsContent[i].inputFontSize : "",
					type: inputsObj.inputsContent[i].inputType ? inputsObj.inputsContent[i].inputType : "",
					hint: inputsObj.inputsContent[i].inputHint ? inputsObj.inputsContent[i].inputHint : ""
				});	

				if(inputsObj.inputsContent[i].inputAtt) {
					let tempInputAtt = inputsObj.inputsContent[i].inputAtt;
					
					for(let key of Object.keys(tempInputAtt)) {
						inputTemp.setAttribute(key, tempInputAtt[key]);
					}
				}

				let inputsTemp = module_text_input({
					text: inputsObj.inputsContent[i].inputsText ? inputsObj.inputsContent[i].inputsText : "",
					width: inputsObj.inputsContent[i].inputsWidth ? inputsObj.inputsContent[i].inputsWidth : "",
					addInput: inputTemp
				})
				
				if(inputsObj.inputsContent[i].inputsAtt) {
					let tempInputsAtt = inputsObj.inputsContent[i].inputsAtt;
					
					for(let key of Object.keys(tempInputsAtt)) {
						inputsTemp.setAttribute(key, tempInputsAtt[key]);
					}
					
				}
				dialogDiv.appendChild(inputsTemp);				
			}	
		} else if(inputsNum == 0 || inputsContentLen == 0) {
			console.error(`对象inputsNum或者inputsContentLen不能为0`);
		}
	}

	if(groupInputJson.selects) {
		let selectObj = groupInputJson.selects,
			selectNum = selectObj.selectsNum,
			selectsContentLen = selectObj.selectsContent.length;

		if(selectNum == selectsContentLen && selectNum != 0) {
			for(let i = 0; i < selectNum; i++) {
				let selectTemp = select({
					width: selectObj.selectsContent[i].selectWidth ? selectObj.selectsContent[i].selectWidth : "",
					height:selectObj.selectsContent[i].selectHeight ? selectObj.selectsContent[i].selectHeight : "",
					optionArr: selectObj.selectsContent[i].selectOptionArr
				});

				if(selectObj.selectsContent[i].selectAtt) {
					let selectAttObj = selectObj.selectsContent[i].selectAtt;
					for(let key of Object.keys(selectAttObj)) {
						selectTemp.setAttribute(key,selectAttObj[key]);
					}
				}

				let selectsTemp = module_text_input({
					text: selectObj.selectsContent[i].selectsText ? selectObj.selectsContent[i].selectsText : "",
					width: selectObj.selectsContent[i].selectsWidth ? selectObj.selectsContent[i].selectsWidth : "",
					addInput: selectTemp
				})
				if(selectObj.selectsContent[i].selectsAtt) {
					let selectsAttObj = selectObj.selectsContent[i].selectsAtt;
					for(let key of Object.keys(selectsAttObj)) {
						selectsTemp.setAttribute(key, selectsAttObj[key]);
					}
				}
				if(selectObj.selectsContent[i].selectSite) {
					JC_WEB_ADD.before(dialogDiv,selectsTemp,selectObj.selectsContent[i].selectSite-1);
				}
				
			}
		}

	}

	if(groupInputJson.tables) {

	}

	return dialogDiv;
}

export {
	module_text_input as inputs,
	module_group_inputs as group_inputs
}