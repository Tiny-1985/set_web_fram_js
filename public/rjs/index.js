import {JC_WEB_TIER,JC_WEB_ADD} from '../js/jc_web_frame.js';

import {jc_web_comp} from '../js/jc_web_componet.js';

import {jc_web_com} from '../js/jc_web_common.js';

import {jc_web_framework} from '../js/jc_web_framework.js';

import {inputs,group_inputs} from '../js/jc_web_middleware.js';

import {JC_WEB_REGEXP} from '../js/jc_web_verify.js';



let button = jc_web_comp.button,
	input = jc_web_comp.input,
	select = jc_web_comp.select,
	table = jc_web_comp.table,
	alter = jc_web_framework.modal_alter,
	treeFrom = jc_web_comp.tree_dom;



let buttonDiv = button({
	content: "取消"
});
let buttonDiv2 = button({
});

let inputDiv = input({
});
inputDiv.classList.add("aaa");
buttonDiv.classList.add("aaa");

let selectDiv = select({
	optionArr: [{"value": "1", "text": "aaa"},{"value": "2", "text": "bbb"},{"value": "3", "text": "ccc"}]
})

let selectDiv2 = select({
	optionArr: [{"value": "1", "text": "hhh"},{"value": "2", "text": "iii"},{"value": "3", "text": "jjj"}]
})


let appDiv = JC_WEB_TIER.div({"id":"app","v-text":"aaa"},"我就是以恶搞",
								JC_WEB_TIER.div({"id":"app2","v-onclick":"bbb"}),selectDiv2);
//document.querySelector('body').appendChild(appDiv);
JC_WEB_ADD.body(appDiv,3);
let appDiv2 = JC_WEB_TIER.div({"id":"ad"});
JC_WEB_ADD.before(appDiv,buttonDiv,1);
JC_WEB_ADD.before(appDiv,buttonDiv2,1);
JC_WEB_ADD.before(appDiv,selectDiv,1);
JC_WEB_ADD.before(appDiv,inputDiv,0);
let alter_body = JC_WEB_TIER.div({},input(),input(),select());
let alter_body2 = inputs({
	text: "单位名称：",
	addInput: selectDiv2
});

let group = group_inputs({
	inputs:{
		inputsNum: 3,
		inputsContent: [
			{
				inputsText: "我是第一个:",
				inputsAtt:{
					"v-if":"aaa"
				},
				inputHint: "我就是以恶之恶",
				inputAtt: {
					"v-text": "bbb"
				}
			},{
				inputsText: "我是第二个:",
				inputsAtt:{
					"v-if":"ccc"
				},
				inputHint: "我就是2以恶之恶",
				inputAtt: {
					"v-text": "ddd"
				}
			},{
				inputsText: "我是第三个:",
				inputsAtt:{
					"v-if":"eee"
				},
				inputHint: "我就是3以恶之恶",
				inputAtt: {
					"v-text": "fff"
				}
			},
		]
	},
	selects: {
		selectsNum: 2,
		selectsContent: [
			{
				selectsText: "我是第一个select:",
				selectOptionArr: ["HHH","MMM","DDD"],
				selectAtt:{
					"v-onclick":"ggg"
				},
				selectSite:2
			},
			{
				selectsText: "我是第二个select:",
				selectOptionArr: ["WWW","NNN","ZZZ"],
				selectAtt:{
					"v-onchange":"ggg"
				},
				selectSite:6
			}
		]
	}
})

group.id = "newId";

alter({
	modalMiddleContent: group,
	saveCallBack: (result) => {
		console.log("第一层");
		if(result) {
			alter({
				saveCallBack: (result) => {
					console.log("第二层");
					alter({
						modalMiddleContent: "第三层",
						showDialog: false
					})
				},
				cancelCallback: (result) => {
					console.log(result);
				}
			});
		}
	},
	cancelCallback: (result) => {
		//console.log(result);
	}
});



let tableDiv = table({
	"theadTrTitle": {
		"content":["操作","提示","新增","修改"],
		"attArrTd": [
			{
				"attribute": {
					"class": "aaa",
					"v-text": "sss"
				},
				"attSite": -1

			},
			{
				"attribute": {
					"class": "bbb",
				},
				"attSite": 0
			}
		]
	}
})

//console.log(Object.is(Object.is("bbbb","bbb"),false));

// console.log(regExp.nx_el("a"));	
JC_WEB_REGEXP._regExp({el:"newId"});
//console.log(tableDiv);
let addtab = JC_WEB_ADD.before(appDiv,tableDiv,0);

let treeDom = JC_WEB_TIER.div({"id":"tree"});

//console.log(treeFrom);
JC_WEB_ADD.before(appDiv,treeDom,0);
let treeDiv = treeFrom({
	domId: "tree",
	content: [
		{
			name: "系统",
			font: ["+","<span></span>"],
			list: [
				{
					name: "c",
					font: ["*",""],
					list: 0
				},
				{
					name: "d",
					font: [""],
					list: 0
				}
			]
		},
		{
			name: "左面",
			font: ["+","<span></span>"],
			list: [
				{
					name: "APP",
					font: ["+",""],
					list: [
						{
							name: "家庭",
							font: ["+","<span></span>"],
							list: [
								{
									name: "动物",
									font: ["*",""],
									list: 0
								},
								{
									name: "成员",
									font: [""],
									list: 0
								}
							]
						}
					]
				},
				{
					name: "css",
					font: [""],
					list: 0
				}
			]
		}
	]
},function(data) {
	console.log("ddd",data);
	alter({
		modalMiddleContent: data.toString(),
		showDialog: false
	})
});


