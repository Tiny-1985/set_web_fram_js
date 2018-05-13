import {JC_WEB_TIER,JC_WEB_ADD} from './jc_web_frame.js';

import {jc_web_com} from './jc_web_common.js';

import {jc_web_comp} from './jc_web_componet.js';

let style = jc_web_com.styleNX,
	isDOM = jc_web_com.isDOM,
	button = jc_web_comp.button,
	JC_WEB_FRAMEWORK = {};


/**
 * [description]生成alter模态框
 * @param  {[type]} alterJson [description]
 *                      ↓
 *                   {
 *                   	modalTitleContent："标题名称",//模态框标题==》可以不传，默认为==》操作提示：
 *                   	modalMiddleContent: group,//group是一个dom，传入模态框中间dom部分，如果是提示框那填写string类型，也可以不传，默认为==》确定删除吗？
						saveCallBack: (result) => {//左边按钮回调==》返回true
							console.log(result);
						},
						cancelCallback: (result) => {//右边按钮回调==》返回false
							console.log(result);
						},
						showDialog: true,//选择是否显示遮罩,Boolean值，默认为true
						showTime: 3000//如果是小的提示框，设置显示时间,默认为2000
 *                   
 *                   }
 * @param  {[type]}           [description]
 * @return {[type]}           [description]
 */
JC_WEB_FRAMEWORK.modal_alter = (alterJson,) => {	
	if(typeof alterJson == "undefined") {
		alterJson = {"showDialog": true};
	}
	if(document.getElementsByTagName("head").item(0).querySelector("#alterId") == null) {
		/*let title_text_align,alter_width,alter_top;
		if(isDOM(alterJson.modalMiddleContent)) {
			title_text_align = "center";
			alter_width = "15%";
			alter_top = "5%";
		} else {
			title_text_align = "left";
			alter_width = "40%";
			alter_top = "28%";
		}*/
		

		const modalDialog = `.modal_dialog {
			position: fixed;
	        left: 0;
	        right: 0;
	        top: 0;
	        bottom: 0;
	        background: #000000;
	        overflow: hidden;
	        filter: alpha(opacity=50);
	        -moz-opacity: 0.5;
	        -khtml-opacity: 0.5;
	        opacity: 0.5;
		}`,
			  modalBody = `.model_body {
			position: fixed;
	        border-radius: 6px;
	        margin: 0 auto;
	        background-color: #FFFFFF;
	        font-size: 16px;
	        box-shadow: 0 5px 15px rgba(0,0,0,.5);
	        z-index: 9999;
	        transition: transform 13s ease-out;
	        animation: an_height 1s ease-out both;
		}`,
			   modalBodyWHA = `.modal_body_wha{
	        left: 15%;
	        right: 15%;
	        top: 5%;
	    }`,
	    	   modalBodyWHI = `.modal_body_whi{
	        left: 40%;
	        right: 40%;
	        top: 28%;
	    }`,
	    	   modalBodyWHMIN = `.modal_body_wh_min{
	        left: 40%;
	        right: 40%;
	        top: 28%;
	    }`,
			   modalTitle = `.modal_title {
			color: #000;
	        font-family: inherit;
	        padding: 10px;
	        font-size: 14px;
	        border-bottom: 1px solid #e5e5e5;
	        letter-spacing: 2px;
		}`,
			    modalTitleTAC = `.modal_title_tac {			
	        text-align: center;
	    }`,
			    modalTitleTAL = `.modal_title_tal {			
	        text-align: left;
	    }`,
			    modalTitleNO = `.modal_title_tal_no {			
	        display: none;
	    }`,
			    modalMiddle = `.modal_middle {
			text-align: center;
	        letter-spacing: 2px;
	        padding: 30px;
	        font-family: inherit;
	        font-size: 18px;
	        margin: 0px;
	        line-height: 1.1;
	        color: inherit;
		}`,
			    modalFoot = `.modal_foot {
			display: flex;
	        border-top: 1px solid #e5e5e5;
	        border-radius: 10px;
	        padding: 15px;
	        justify-content: center;
		}`,
				modalMarRig = `.modal_mar_rig_10 {
			margin-right: 10px
		}`,
				modalWid90 = `.modal_wid_90 {
			width: 90px;
		}`,
			    modalAnimation = `@keyframes an_height {
					0% {transform: translateY(-200%);opacity:0;}
					50% {opacity:0;}
					100% {transform: translateY(0);}
			    }`;

		style({
			"cssId": "alterId",
			"cssObj": [modalDialog,modalBody,modalAnimation,modalTitle,modalMiddle,modalFoot,modalMarRig,modalWid90,modalBodyWHA,modalBodyWHI,modalTitleTAC,modalTitleTAL,modalBodyWHMIN,modalTitleNO]
		})
	}

	let saveBut = button(),
		cancelBut = button({content: "取消"});
	saveBut.classList.add("modal_mar_rig_10","modal_wid_90");
	cancelBut.classList.add("modal_wid_90");

	let titleDom = JC_WEB_TIER.div({
							"class":"modal_title"
						  },alterJson.modalTitleContent?alterJson.modalTitleContent:"操作提示："),
		bodyDom = JC_WEB_TIER.div({
						  	"class": "modal_middle"
						  },alterJson.modalMiddleContent?alterJson.modalMiddleContent:"确定删除吗？"),
		footDom = JC_WEB_TIER.div({
						  	"class":"modal_foot"
						  },saveBut,cancelBut),
	    modalDialogAdd = JC_WEB_TIER.div({"class":"modal_dialog"}),
		modalBodyAdd = JC_WEB_TIER.div({
							"class":"model_body"
						},titleDom,
						  bodyDom,
						  footDom);
	if(alterJson.showDialog === false) {
		modalDialogAdd.classList.add("modal_title_tal_no");
	}
	if(isDOM(alterJson.modalMiddleContent)) {
		titleDom.classList.add("modal_title_tac");
		modalBodyAdd.classList.add("modal_body_wha");
	} else {
		if(alterJson.saveCallBack && alterJson.cancelCallback) {
			titleDom.classList.add("modal_title_tal");
			modalBodyAdd.classList.add("modal_body_whi");
		} else {
			titleDom.classList.add("modal_title_tal_no");
			modalBodyAdd.classList.add("modal_body_wh_min");
			footDom.classList.add("modal_title_tal_no");
			setTimeout(()=>{
				removeAlter();
			},alterJson.showTime ? alterJson.showTime : 2000);
		}
	}

	JC_WEB_ADD.body(modalDialogAdd,-1);
	JC_WEB_ADD.body(modalBodyAdd,-1);

	let removeAlter = () => {
		modalDialogAdd.parentNode.removeChild(modalDialogAdd);
		modalBodyAdd.parentNode.removeChild(modalBodyAdd);
	}

	saveBut.onclick = () => {
		if(alterJson.saveCallBack && typeof alterJson.saveCallBack == "function") {
			removeAlter();
			alterJson.saveCallBack(true);
		}		
	}
	
	cancelBut.onclick = () => {
		if(alterJson.cancelCallback && typeof alterJson.cancelCallback == "function") {
			removeAlter();
			alterJson.cancelCallback(false);
		}		
	}


} 


const JC_WEB_FRAMEWORK_PROXY = new Proxy(JC_WEB_FRAMEWORK,{
	deleteProperty(traget,delPro) {
		throw new Error("不能删除o，你太淘气了。。。👊");
		return true;
	},
	ownKeys(traget) {
		throw new Error("辛苦了，但抱歉不能扩展🤷");
		return false;
	},
	defineProperty(traget,key,dis) {
		return [];
	}
})

export {
	JC_WEB_FRAMEWORK_PROXY as jc_web_framework
}