function generateResources() {				
	var farmsBuilt = 0;
	var woodProdMod = 0;
	var quarryProdMod = 0;
	
	woodProdMod = resourceProdMod('woodHuts');
	quarryProdMod = resourceProdMod('quarry');
	farmProdMod = resourceProdMod('farms');
	
	var goldIncrease = resources.villagers * 1;

	var woodHutBuilt = campaignInfo.baseInfo.buildings.woodHuts.buildingInfo.builtStatus;
	var quarryBuilt = campaignInfo.baseInfo.buildings.quarry.buildingInfo.builtStatus;
	var farmBuilt = campaignInfo.baseInfo.buildings.farms.buildingInfo.builtStatus;

	if(woodHutBuilt == 0) {
		var woodIncrease = (10 * parseFloat($('.woodWorkforce').text())) * 0.5;
	}
	else {
		var woodIncrease = (10 * parseFloat($('.woodCutterWorkforce').text()) * woodProdMod) + (10 * parseFloat($('.woodWorkforce').text()) * 0.5);
	}

	if(quarryBuilt == 0) {
		var stoneIncrease = (10 * parseFloat($('.stoneWorkforce').text())) * 0.5;
	}
	else {
		var stoneIncrease = (10 * parseFloat($('.stoneCutterWorkforce').text()) * quarryProdMod) + (10 * parseFloat($('.woodWorkforce').text()) * 0.5);
	}
	
	if(farmBuilt == 0) {
		var foodIncrease = (10 * parseFloat($('.foodWorkforce').text())) * 0.5;
	}
	else {
		var foodIncrease = (10 * parseFloat($('.farmerWorkforce').text()) * farmProdMod) + (10 * parseFloat($('.foodWorkforce').text()) * 0.5);
	}
	
	intervalCarrier = setInterval(function() {

		resources.gold = resources.gold + goldIncrease;
		resources.wood = resources.wood + woodIncrease;
		resources.stone = resources.stone + stoneIncrease;
		resources.food = resources.food + foodIncrease;

		$('.playersGold').text(resources.gold);
		$('.playersWood').text(resources.wood);
		$('.playersStone').text(resources.stone);
		$('.playersFood').text(resources.food);
		$('.playersVillagers').text(resources.villagers);
		
	//}, 5000);
	}, 500);
}			

function resourceProdMod(building) {
	var buildingBuilt = campaignInfo.baseInfo.buildings[building].built;
	if (buildingBuilt == 1) {
		buildingProdMod = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].productionBonus;
	}
	else if (buildingBuilt == 2) {
		buildingProdModA = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].productionBonus;
		buildingProdModB = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].productionBonus;
		buildingProdMod = buildingProdModA + buildingProdModB;
	}	
	return buildingProdMod;
}