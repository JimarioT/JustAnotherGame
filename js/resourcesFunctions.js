function generateResources() {				
	var farmsBuilt = 0;
	var woodProdMod = 0;
	var quarryProdMod = 0;
	
	woodProdMod = resourceProdMod('woodHuts');
	quarryProdMod = resourceProdMod('quarry');
	farmProdMod = resourceProdMod('farms');
	
<<<<<<< HEAD
	//var goldIncrease = resources.villagers * 1;
=======
	var goldIncrease = resources.villagers * 1;
>>>>>>> origin/master

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
<<<<<<< HEAD
		
		if(resources.wood < resources.woodStorage) {
			resources.wood = resources.wood + woodIncrease;
			canWoodIncrease = true;
			if(resources.wood >= resources.woodStorage) {
				woodLost = resources.wood - resources.woodStorage;
				resources.wood = resources.woodStorage;
				canWoodIncrease = false;
			}
		}
		if(resources.stone < resources.stoneStorage) {
			resources.stone = resources.stone + stoneIncrease;
			canStoneIncrease = true;
			if(resources.stone >= resources.stoneStorage) {
				stoneLost = resources.stone - resources.stoneStorage;
				resources.stone = resources.stoneStorage;
				canStoneIncrease = false;
			}
		}
		if(resources.food < resources.foodStorage) {
			resources.food = resources.food + foodIncrease;
			if(resources.food >= resources.foodStorage) {
				foodLost = resources.food - resources.foodStorage;
				resources.food = resources.foodStorage;
			}
		}		

		if(!canStoneIncrease) {
			var stoneIncreaseMod = stoneIncrease - stoneLost;
			stoneIncrease = 0;
		}
		else {
			stoneIncreaseMod = stoneIncrease;			
		}

		if(!canWoodIncrease) {
			var woodIncreaseMod = woodIncrease - woodLost;
			woodIncrease = 0;
		}
		else {
			woodIncreaseMod = woodIncrease;			
		}


		totalResources += stoneIncreaseMod + woodIncreaseMod;
		woodLost = 0;
		stoneLost = 0;		

			if(totalResources >= 100) {
			  	goldMultiplier = 0;
			  	totalResourcesRemainder = totalResources % 100;
			  	totalResources -= totalResourcesRemainder;
			  	goldMultiplier = totalResources / 100;
			  	resources.gold += (10 * goldMultiplier);
			  	totalResources = totalResourcesRemainder;
			 	console.log(totalResources + ' ' + totalResourcesRemainder + ' ' + goldMultiplier);
			}
			if(resources.gold >= resources.goldStorage)	{
				resources.gold = resources.goldStorage;
			}
		

		$('.playersGold').text(resources.gold + ' / ' + resources.goldStorage);
		$('.playersWood').text(resources.wood + ' / ' + resources.woodStorage);
		$('.playersStone').text(resources.stone + ' / ' + resources.stoneStorage);
		$('.playersFood').text(resources.food + ' / ' + resources.foodStorage);
		$('.playersVillagers').text(resources.villagers);
		
	}, 2000);
	//}, 500);	
=======

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
>>>>>>> origin/master
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
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/master
