var $orderNumBetween = [-3, 3];			// 点菜数量区间(与人数差异)
var $isOrderSoup = 1;					// 是否要点汤
var $perPersonCostOffset = 3;			// 人均餐具费用
var $tryGenerateCntMax = 100;			// 最大尝试生成次数
var $tryPickupCntMax = 10;				// 最大选菜次数
var $policyType = 0;					// 策略类型, 目前还没有对应的算法, 暂时设置无效!

var $orderList = 
[
	// ----------------- 荤菜-1
	{
		name: 		"炒老蛏",			// 菜名
		percent:	0,	                // 权重, 1为必点, 0为正常, -1为必不点
		type:		0,	                // 类型, 0为荤菜, 1为半荤半素, 2为素菜, 3为汤
		cost:		28,	                // 价格	
		reject:		["海蛏煎蛋"],       // 与某个菜互斥
	},
	{
		name: 		"爽口小鱿鱼",
		percent:	0,	
		type:		0,	
		cost:		25,	
		reject:		[],
	},
    {
		name: 		"醋肉",
		percent:	0,	
		type:		0,	
		cost:		20,	
		reject:		[],
	},
	{
		name: 		"海蛏煎蛋",
		percent:	0,	
		type:		0,	
		cost:		25,	
		reject:		["海蛎煎", "青口炒蛋", "凉拌皮蛋"],
	},
	{
		name: 		"海蛎煎",
		percent:	0,	
		type:		0,	
		cost:		25,	
		reject:		["海蛏煎蛋", "炒老蛏"],
	},
	{
		name: 		"水煮肉片",
		percent:	0,	
		type:		0,	
		cost:		25,	
		reject:		[],
	},
	
	// ----------------- 半荤半素-1
	{
		name: 		"特价三丝焗海虾",	
		percent:	1,					
		type:		1,					
		cost:		9,					
		reject:		[],					
	},
	{
		name: 		"紫菜海蛎煲",
		percent:	0,	
		type:		1,	
		cost:		26,	
		reject:		[],
	},
	{
		name: 		"青口炒蛋",
		percent:	0,	
		type:		1,	
		cost:		22,	
		reject:		["凉拌皮蛋", "海蛏煎蛋"],
	},
	{
		name: 		"鱼香肉丝",
		percent:	0,	
		type:		1,	
		cost:		18,	
		reject:		[],
	},
	
	// ----------------- 素菜-2
	{
		name: 		"凉拌皮蛋",		
		percent:	0,				
		type:		2,				
		cost:		16,				
		reject:		["青口炒蛋", "海蛏煎蛋"],				
	},
	{
		name: 		"长豆烧茄子",
		percent:	0,	
		type:		2,	
		cost:		16,	
		reject:		[],
	},
	{
		name: 		"干锅包菜",
		percent:	0,	
		type:		2,	
		cost:		10,	
		reject:		[],
	},
	{
		name: 		"干锅千叶豆腐",
		percent:	0,	
		type:		2,	
		cost:		18,	
		reject:		[],
	},
	{
		name: 		"酱烧茼蒿",
		percent:	0,	
		type:		2,	
		cost:		18,	
		reject:		[],
	},
	{
		name: 		"炒生菜",
		percent:	0,	
		type:		2,	
		cost:		10,	
		reject:		[],
	},
	{
		name: 		"炒地瓜叶",
		percent:	0,	
		type:		2,	
		cost:		10,	
		reject:		[],
	},
	{
		name: 		"炒莴笋叶",
		percent:	0,	
		type:		2,	
		cost:		10,	
		reject:		[],
	},
	
	// ------------------- 汤-3
	{
		name: 		"西红柿蛋汤",	
		percent:	0,	            
		type:		3,	            
		cost:		16,	            
		reject:		[],             
	},
	{
		name: 		"紫菜蛋汤",		
		percent:	0,	            
		type:		3,	            
		cost:		16,	            
		reject:		[],             
	},
	
];