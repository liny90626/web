var $orders = [null, null, null, null];
var $orderColors = ["", "blue", "green", "yellow"];

function isObjEmpty(obj) {
	if (obj == '' || obj == null || obj == undefined) {
		return true;
	}
	return false;
}

function clearTips() {
	$("#outputs_tips").html("");
}

function showTipsErr(str) {
	$("#outputs_tips").html("<span style=\"color: red;\">" + str + "</span>");
}

function showTipsOrders(curOrderList, personNum) {
	var $cost = 0;
	var $order0Num = 0;
	var $order1Num = 0;
	var $order2Num = 0;
	var $order3Num = 0;
	
	$.each(curOrderList, function(i, order) {
		switch (order.type) {
			case (0):
				$order0Num++;
				$cost += order.cost;
			break;
			
			case (1):
				$order1Num++;
				$cost += order.cost;
			break;
			
			case (2):
				$order2Num++;
				$cost += order.cost;
			break;
			
			case (3):
				$order3Num++;
				$cost += order.cost;
			break;
			
			default:
			break;
		}	
	});
	
	var $orderSum = $order0Num + $order1Num + $order2Num + $order3Num;
	$("#outputs_tips").html("共计" + "<span style=\"color: red;\">" + $orderSum + "</span>道菜, 其中<br/>");
	$("#outputs_tips").append("荤菜" + "<span style=\"color: red;\">" + $order0Num + "</span>道<br/>");
	$("#outputs_tips").append("半荤半素" + "<span style=\"color: red;\">" + $order1Num + "</span>道<br/>");
	$("#outputs_tips").append("素菜" + "<span style=\"color: red;\">" + $order2Num + "</span>道<br/>");
	$("#outputs_tips").append("汤" + "<span style=\"color: red;\">" + $order3Num + "</span>份<br/>");
	$("#outputs_tips").append("人均消费" + "<span style=\"color: red;\">" 
		+ ($cost/personNum + $perPersonCostOffset) + "</span>元");
}

function loadOrderList() {
	for (var i = 0; i < $orders.length; ++i) {
		$orders[i] = [];
		clearOrderList($orders[i], i);
	}
	$orderMust = [];
	clearOrderList($orderMust[i], "mustorder");
	
	$.each($orderList, function(i, order) {
		$orders[order.type].push(order);
		appendOrderList(order, order.type);
		if (1 == order.percent) {
			$orderMust.push(order);
			appendOrderList(order, "mustorder");
		}
	});
}

function clearOrderList(order, orderSuffix) {
	$("#list_content_" + orderSuffix).html("");
}

function appendOrderList(order, orderSuffix) {
	$("#list_content_" + orderSuffix).append("<ul class=\"" 
		+ $orderColors[order.type] + "\"><li><a href=\"#\">" 
		+ order.name + "<span>" + order.cost + "</span></a></li></ul>")
}

function showOutputOrder(curOrderList) {
	$.each(curOrderList, function(i, order) {
		$("#outputs_order_list").append("<ul class=\"" 
		+ $orderColors[order.type] + "\"><li><a href=\"#\">" 
		+ order.name + "<span>" + order.cost + "</span></a></li></ul>")
	});
}

function getPersonNum() {
	return $("#input_person_num").val();
}

function getAvgCost() {
	return $("#input_avg_cost").val();
}

function getMustOrder() {
	var $orderReturn = new Array();
	$.each($orderMust, function(i, order) {
		$orderReturn.push(order);
	});
	
	return $orderReturn;
}

function getOrderCost(curOrderList) {
	var $cost = 0;
	$.each(curOrderList, function(i, order) {
		$cost += order.cost;
	});
	
	return $cost;
}

function checkOrderIsExisted(curOrder, orderOutput) {
	var checkRes = false;
	$.each(orderOutput, function(i, order) {
		if ($.trim(curOrder.name) == $.trim(order.name)) {
			checkRes = true;
			return false;
		} else {
			for (var i = 0; i < order.reject.length; ++i) {
				if ($.trim(order.reject[i]) == $.trim(curOrder.name)) {
					checkRes = true;
					return false;
				}
			}
		}
	});
	
	return checkRes;
}

function checkOrderCanbePickup(curOrder, orderOutput) {
	if (curOrder.percent == -1 || curOrder.percent == 1) {
		// 必点菜已经被挑走了, 这里不用重复挑. 必不点菜直接过滤
		return false;
	}
	
	if (checkOrderIsExisted(curOrder, orderOutput)) {
		// 已经点过了, 不用再点
		return false;
	}
	
	if (curOrder.percent * 0.5 + Math.random() > 0.5) {
		return true;
	}
	
	return false;
}

function pickupOneOrder(curOrderList, orderOutput) {
	var curOrder = null;
	$.each(curOrderList, function(i, order) {
		if (checkOrderCanbePickup(order, orderOutput)) {
			curOrder = order;
			return false;
		}
	});
	
	return curOrder;
}

function doGenerate(personNum, costAvg) {
	var $costMaxSum = personNum * costAvg;
	var $costSum = $perPersonCostOffset * personNum ;
	
	
	var $orderOutput = getMustOrder();
	$costSum += getOrderCost($orderOutput);
	if ($costSum > $costMaxSum) {
		// 必点菜金额已经超过了预算
		return -1;
	} else if ($costSum == $costMaxSum) {
		// 满足要求
		showOutputOrder($orderOutput);
		showTipsOrders($orderOutput, personNum);
		return 0;
	}
	
	var $curOrder = null;
	var $isAlreadyOrderSoup = false;
	for (var i = 0; i < $tryPickupCntMax; ++i) {
		if ($isOrderSoup && !$isAlreadyOrderSoup) {
			$curOrder = pickupOneOrder($orders[3], $orderOutput);
			if (!isObjEmpty($curOrder) && $costSum + $curOrder.cost < $costMaxSum) {
				$isAlreadyOrderSoup = true;
				$costSum += $curOrder.cost;
				$orderOutput.push($curOrder);
			}
		}
		
		for (var j = 0; j < $orders.length - 1; ++j) {
			$curOrder = pickupOneOrder($orders[j], $orderOutput);
			if (isObjEmpty($curOrder)) {
				continue;
			}
			
			if ($costSum + $curOrder.cost < $costMaxSum) {
				$costSum += $curOrder.cost;
				$orderOutput.push($curOrder);
			}
		}
	}
	
	if ($orderOutput.length - personNum  >= $orderNumBetween[0] 
		&& $orderOutput.length - personNum  <= $orderNumBetween[1]) {
		// 满足要求
		showOutputOrder($orderOutput);
		showTipsOrders($orderOutput, personNum);
		return 0;
	}
	
	return -1;
}

function resetWihtoutInputs() {
	loadOrderList();
	clearTips();
	$("#outputs_order_list").html("");
}

// init
$(function() {
	resetWihtoutInputs();
	
	$("#btn_generate").click(function() {
		resetWihtoutInputs()
		
		var $personNum = getPersonNum();
		var $costAvg = getAvgCost();
			
		if (isObjEmpty($personNum) || isObjEmpty($costAvg)) {
			showTipsErr("输入非法!");
			return;
		}
		
		for (var i = 0; i < $tryGenerateCntMax; ++i) {
			if (0 == doGenerate($personNum, $costAvg)) {
				return;
			}
		}
		
		showTipsErr("无法生成满足要求的菜单");
		return;
	});
	
	$("#btn_reset").click(function() {
		$("#input_person_num").val("");
		$("#input_avg_cost").val("");
		resetWihtoutInputs();
	});
	
});



