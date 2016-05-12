function createBuilding(building) {				
	//Check how many buildings of that kind are built
	var buildingsBuilt = buildingsObj[building].built;
	
	//Maximum allowed buildings
	var maxBuildingssAllowed = buildingsObj[building].maxNumber;

	//Set the Level requirement variable (for cleared code)
	var lvlRequirement = buildingsObj[building].buildingInfo.levelRequirements[0];

	if (buildingsBuilt < maxBuildingssAllowed ) {

		//Check if the stored materials are sufficient for the procedure
		var sufficientGold = resources.gold >= lvlRequirement.gold;
		var sufficientWood = resources.wood >= lvlRequirement.wood;
		var sufficientStone = resources.stone >= lvlRequirement.stone;

		//If the materials are sufficient then proceed to create the building and reduce the total materials
		if ( sufficientGold && sufficientWood && sufficientStone ) {			
			checkWhichBuilding(building);
		}

		//Notify the user that he needs more resources
		else {
			alert('Insufficient Resources');
		}
	}

	//Notify the user that he can't have any more identical buildings
	else {
		alert("You can't have more buildings of that kind");
	}
}

function checkWhichBuilding(building) {
	clearInterval(intervalCarrier);
	addBuildingToList(building);
}

function addBuildingToList(building) {
	var buildingName = "", jobName = "", storageType = "", workers = 0;
	workforce = sumTotalWorkforce();	
	if (building == 'woodHuts') {
		buildingName = "Wood Hut"; 
		jobName = "woodCutter";
		storageType = "woodStorage";
		resourcesBuildings(building, "woodStorage", "woodWorkforce");		
	}
	else if(building == 'quarry') {			
		buildingName = 'Quarry';
		jobName = "stoneCutter";
		storageType = "stoneStorage";
		resourcesBuildings(building, "stoneStorage", "stoneWorkforce");		
	}
	else if(building == 'farms') {
		buildingName = 'Farm';
		jobName = "farmer";
		storageType = "foodStorage";
		resourcesBuildings(building, "foodStorage", "foodWorkforce");		
	}
	else if(building == 'hovels') {
		buildingName = "Hovel";
		jobName = "";
		nonResourcesBuildings(building);
	}
	else if(building == 'barracks') {
		buildingName = 'Barracks';
		jobName = "";
		nonResourcesBuildings(building);
	}
	else if(building == 'warehouse') {
		buildingName = 'Warehouse';
		jobName = "";
		nonResourcesBuildings(building);		
	}

	if(canBuilt) {
		var totalBuildings = buildingsObj[building].buildingInfo.builtStatus;
		var lvlRequirement = buildingsObj[building].buildingInfo.levelRequirements[0];				

		resources.gold = resources.gold - lvlRequirement.gold;
		resources.wood = resources.wood - lvlRequirement.wood;
		resources.stone = resources.stone - lvlRequirement.stone;

		buildingsObj[building].built = buildingsObj[building].built + 1;

		if(building == 'woodHuts' || building == 'quarry' || building == 'farms') {
			workers = workersNeeded;
		}

		var cleanedBuildingName = buildingName.replace(" ", "") + totalBuildings.length;		
	
		var item = '<div class="col-xs-6 text-center" data-building="' + cleanedBuildingName + '" data-workers="' + workers + '" data-maxWorkers="' + maxWorkers + '" data-level="1">' +
						'<a>' + buildingName + '<span class="' + building + 'Lvl"> LvL 1</span></a>' +
						'<div class="workersModify text-center">' +				
							'<i class="fa fa-minus foodMinus" onclick="removeWorkforce(\'' + jobName + '\', this)"></i>' +
							'<span id="" class="'+ jobName +'Workforce">' + workers + '</span>' +
							'<i class="fa fa-plus foodPlus" onclick="calculateWorkforce(\'' + jobName + '\', this)"></i>' +	
						'</div>' +
					'</div>';		

		var itemPreparing = '<div class="col-xs-6 text-center ' + buildingName.replace(" ", "") + 'UnderConstrution">' +
								'<div>' + buildingName + ' under construction</div>' +
								'<div class="progress text-center">' + 
									'<div class="' + cleanedBuildingName + '-progress-bar progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">' + 								
									'</div>' + 
								'</div>' +
							'</div>';

		var prod = buildingsObj[building].buildingInfo.levelBonus[0].productionBonus;
		var index = {'level': 1, 'productionBonus': prod, 'currentlyWorking': 0, 'maxAllowedWorkers': maxWorkers};

		var timeRequired = buildingsObj[building].buildingInfo.levelBonus[0].timeRquired;
		var percentageSteps = 100 / timeRequired;				
		var timePassed = 0;
		var percentageTotal = 0;
		
		if(building == 'woodHuts' || building == 'quarry' || building == 'farms' || building == 'warehouse') {
			$('.prodBuildsCont').slideDown();
			$('.prodBuilds').append(itemPreparing);
		}
		else if(building == 'hovels') {
			$('.comBuildsCont').slideDown();
			$('.comBuilds').append(itemPreparing);
		}
		else {
			$('.milDefBuildsCont').slideDown();
			$('.milDefBuilds').append(itemPreparing);
		}
		

		buildingQuota[buildingName.trim()] = setInterval(function() {
			var divToRemove =  buildingName.replace(" ", "") + 'UnderConstrution';
			var workersNeeded = buildingsObj[building].buildingInfo.levelRequirements[0].buildersNeeded;
			if(timePassed < timeRequired) {
				timePassed++;
				percentageTotal += percentageSteps;
				$('.' + cleanedBuildingName + '-progress-bar').css('width', parseInt(percentageTotal) + '%');
				$('.' + cleanedBuildingName + '-progress-bar').attr('aria-valuenow', parseInt(percentageTotal));
			}
			else {
				clearInterval(buildingQuota[buildingName.trim()]);
				delete buildingQuota[buildingName.trim()];				
				$('.' + divToRemove).remove();
				totalBuildings.push(index);
				
				if(building == 'woodHuts' || building == 'quarry' || building == 'farms') {
					resourcesBuildsFinish(item, building, storageType);
				}
				else if (building == 'hovels') {
					communityBuildsFinish(item, cleanedBuildingName)
				}
				else {
					militaryBuildsFinish(item, cleanedBuildingName)					
				}
			}
						
		}, 1000);

		$('.playersGold').text(resources.gold + ' / ' + resources.goldStorage);
		$('.playersWood').text(resources.wood + ' / ' + resources.woodStorage);
		$('.playersStone').text(resources.stone + ' / ' + resources.stoneStorage);
		$('.playersFood').text(resources.food + ' / ' + resources.foodStorage);
		$('.playersVillagers').text(resources.villagers);
		generateResources();		
	}
	else {
		alert('More available villagers are needed to built this building.', generateResources());
	}
}

function resourcesBuildsFinish(a, b, c) {
	$('.prodBuilds').append(a);
	builders -= workersNeeded;
	extraStorage = buildingsObj[b].buildingInfo.levelBonus[0].extraStorage;					
	resources[c] += extraStorage;
	if(b == "warehouse") {
		resources.woodStorage = resources.woodStorage + buildingsObj[b].buildingInfo.levelBonus[0].extraWoodStorage;
		resources.stoneStorage = resources.stoneStorage + buildingsObj[b].buildingInfo.levelBonus[0].extraStoneStorage;
		resources.foodStorage = resources.foodStorage + buildingsObj[b].buildingInfo.levelBonus[0].extraFoodStorage
		resources.goldStorage = resources.goldStorage + buildingsObj[b].buildingInfo.levelBonus[0].extraGoldStorage
	}
	refreshResources();
	clearInterval(intervalCarrier);
	generateResources();

}

function communityBuildsFinish(a, b) {
	$('.comBuilds').append(a);
	builders -= workersNeeded;
	resources.villagers = resources.villagers + 5;
	$('div[data-building=' + b + '] > div.workersModify').remove();
	$('.playersVillagers').text(resources.villagers);
	clearInterval(intervalCarrier);
	generateResources();

}

function militaryBuildsFinish(a, b) {
	$('.milDefBuilds').append(a);
	builders -= workersNeeded;		
	$('div[data-building=' + b + '] > div.workersModify').remove();
	refreshResources();
	clearInterval(intervalCarrier);
	generateResources();
}

function refreshResources() {
	$('.playersWood').text(resources.wood + ' / ' + resources.woodStorage);
	$('.playersStone').text(resources.stone + ' / ' + resources.stoneStorage);
	$('.playersFood').text(resources.food + ' / ' + resources.foodStorage);		
} 

function nonResourcesBuildings(a) {	
	availableWorkers = resources.villagers - workforce;
	workersNeeded = buildingsObj[a].buildingInfo.levelRequirements[0].buildersNeeded;
	if(availableWorkers >= workersNeeded) {
		canBuilt = true;
		builders += workersNeeded;
	}
	else {
		canBuilt = false;
	}	
}

function resourcesBuildings(a, b, c) {	
	maxWorkers = buildingsObj[a].buildingInfo.levelBonus[0].maxAllowedWorkers;
	workersNeeded = buildingsObj[a].buildingInfo.levelRequirements[0].buildersNeeded;
	if(parseFloat($('.' + c).text()) != 0) {
		if(parseFloat($('.' + c).text()) >= workersNeeded) {
			builders += workersNeeded;
			var remainingVillagers = parseFloat($('.' + c).text()) - workersNeeded;
			$('.' + c).text(remainingVillagers);
			canBuilt = true;
		}
		else {			
			if(workforce < resources.villagers) {
				var freeVillagers = resources.villagers - workforce;				
				var collectors = parseFloat($('.' + c).text());				
				if((freeVillagers + collectors) >= workersNeeded) {
					builders += workersNeeded;
					$('.' + c).text(0);
					canBuilt = true;
				}
				else {
					canBuilt = false;
				}
			}
			else {
				canBuilt = false;
			}
		}
	}
	else if (parseFloat($('.' + c).text()) == 0){
		if(workforce < resources.villagers) {
			var freeVillagers = resources.villagers - workforce;			
			if(freeVillagers >= workersNeeded) {
				builders += workersNeeded;
				canBuilt = true;
			}
			else {
				canBuilt = false;
			}
		}
		else {
			canBuilt = false;
		}		
	}
}

function showBuildingCosts() {
	var buildingNames = ['Barracks', 'Hovel', 'WoodHut', 'Quarry', 'Farm', 'Warehouse'];
	var buildingObjects = ['barracks', 'hovels', 'woodHuts', 'quarry', 'farms', 'warehouse'];
	for (var i = 0; i < buildingNames.length; i++) {
		var minifiedValue = buildingsObj[buildingObjects[i]].buildingInfo.levelRequirements[0];
		var setInfo = 	'<span class"spn' + buildingNames[i] +'">' + buildingNames[i] + '</span><br/>' + 
						'<span class"spn' + buildingNames[i] + 'gold"> Gold: ' + minifiedValue.gold + '</span><br/>' +
						'<span class"spn' + buildingNames[i] + 'wood"> Wood: ' + minifiedValue.wood + '</span><br/>' +
						'<span class"spn' + buildingNames[i] + 'stone"> Stone: ' + minifiedValue.stone + '</span><br/>';
		$('.btn' + buildingNames[i]).append(setInfo);
	}
}