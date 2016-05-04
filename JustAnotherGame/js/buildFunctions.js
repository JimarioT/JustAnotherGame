function createBuilding(building) {				
	//Check how many buildings of that kind are built
	var buildingsBuilt = campaignInfo.baseInfo.buildings[building].built;
	
	//Maximum allowed buildings
	var maxBuildingssAllowed = campaignInfo.baseInfo.buildings[building].maxNumber;

	//Set the Level requirement variable (for cleared code)
	var lvlRequirement = campaignInfo.baseInfo.buildings[building].buildingInfo.levelRequirements[0];

	if (buildingsBuilt < maxBuildingssAllowed ) {

		//Check if the stored materials are sufficient for the procedure
		var sufficientGold = resources.gold >= lvlRequirement.gold;
		var sufficientWood = resources.wood >= lvlRequirement.wood;
		var sufficientStone = resources.stone >= lvlRequirement.stone;

		//If the materials are sufficient then proceed to create the building and reduce the total materials
		if ( sufficientGold && sufficientWood && sufficientStone ) {
			var buildingVar = campaignInfo.baseInfo.buildings[building].buildingInfo.buildingStats;

			buildingVar.active = true;
			buildingVar.level = 1;

			resources.gold = resources.gold - lvlRequirement.gold;
			resources.wood = resources.wood - lvlRequirement.wood;
			resources.stone = resources.stone - lvlRequirement.stone;

			campaignInfo.baseInfo.buildings[building].built = campaignInfo.baseInfo.buildings[building].built + 1;
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
	var buildingName = "", jobName = "", workers = 0;

	var workforce = sumTotalWorkforce();

	/*var workforce = parseFloat($('.woodWorkforce').text()) + parseFloat($('.stoneWorkforce').text()) + parseFloat($('.foodWorkforce').text());				

	if($('div[data-building="WoodHut0"]').length > 0) {					
		workforce = workforce + parseFloat($('div[data-building="WoodHut0"]').attr('data-workers'));					
	}

	if($('div[data-building="Quarry0"]').length > 0) {					
		workforce = workforce + parseFloat($('div[data-building="Quarry0"]').attr('data-workers'));					
	}

	if($('div[data-building="Farm0"]').length > 0) {					
		workforce = workforce + parseFloat($('div[data-building="Farm0"]').attr('data-workers'));					
	}*/

	if(building == 'hovels') {
		nonResourcesBuildings("Hovel", " ", building);
		console.log(buildingName);
		/*buildingName = "Hovel";
		jobName = "";
		availableWorkers = resources.villagers - workforce;
		workersNeeded = campaignInfo.baseInfo.buildings.hovels.buildingInfo.levelRequirements[0].buildersNeeded;
		if(availableWorkers >= workersNeeded) {
			canBuilt = true;
			builders += workersNeeded;			
		}
		else {
			canBuilt = false;
		}*/
	}
	else if(building == 'woodHuts') {
		buildingName = "Wood Hut"; 
		jobName = "woodCutter";
		maxWorkers = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].maxAllowedWorkers;
		extraStorage = campaignInfo.baseInfo.buildings.woodHuts.buildingInfo.levelBonus[0].extraStorage;
		workersNeeded = campaignInfo.baseInfo.buildings.woodHuts.buildingInfo.levelRequirements[0].buildersNeeded;
		resources.woodStorage += extraStorage;		
		if(parseFloat($('.woodWorkforce').text()) != 0) {
			if(parseFloat($('.woodWorkforce').text()) >= workersNeeded) {
				builders += workersNeeded;
				var remainingVillagers = parseFloat($('.woodWorkforce').text()) - workersNeeded;
				$('.woodWorkforce').text(remainingVillagers);
				canBuilt = true;
			}
			else {
				
				if(workforce < resources.villagers) {
					var freeVillagers = resources.villagers - workforce;
					var woodCollectors = parseFloat($('.woodWorkforce').text());
					if((freeVillagers + woodCollectors) == workersNeeded) {
						builders = workersNeeded;
						$('.woodWorkforce').text(0);
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
	}
	else if(building == 'quarry') {			
		buildingName = 'Quarry';
		jobName = "stoneCutter";
		maxWorkers = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].maxAllowedWorkers;
		extraStorage = campaignInfo.baseInfo.buildings.quarry.buildingInfo.levelBonus[0].extraStorage;
		workersNeeded = campaignInfo.baseInfo.buildings.quarry.buildingInfo.levelRequirements[0].buildersNeeded;
		resources.stoneStorage += extraStorage;
		if(parseFloat($('.stoneWorkforce').text()) != 0) {
			if(parseFloat($('.stoneWorkforce').text()) >= workersNeeded) {
				builders += workersNeeded;
				var remainingVillagers = parseFloat($('.stoneWorkforce').text()) - workersNeeded;
				$('.stoneWorkforce').text(remainingVillagers);
				canBuilt = true;
			}
			else {				
				if(workforce < resources.villagers) {
					var freeVillagers = resources.villagers - workforce;
					var stoneCollectors = parseFloat($('.stoneWorkforce').text());
					if((freeVillagers + stoneCollectors) >= workersNeeded) {
						builders = workersNeeded;
						$('.stoneWorkforce').text(0);
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
	}
	else if(building == 'farms') {
		buildingName = 'Farm';
		jobName = "farmer";
		maxWorkers = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].maxAllowedWorkers;
		extraStorage = campaignInfo.baseInfo.buildings.farms.buildingInfo.levelBonus[0].extraStorage;
		workersNeeded = campaignInfo.baseInfo.buildings.farms.buildingInfo.levelRequirements[0].buildersNeeded;		
		resources.foodStorage += extraStorage;		
		if(parseFloat($('.foodWorkforce').text()) != 0) {
			if(parseFloat($('.foodWorkforce').text()) >= workersNeeded) {
				builders += workersNeeded;
				var remainingVillagers = parseFloat($('.foodWorkforce').text()) - workersNeeded;
				$('.foodWorkforce').text(remainingVillagers);
				canBuilt = true;
			}
			else {				
				if(workforce < resources.villagers) {					
					var freeVillagers = resources.villagers - workforce;
					var foodCollectors = parseFloat($('.foodWorkforce').text());
					if((freeVillagers + foodCollectors) >= workersNeeded) {
						builders = workersNeeded;
						$('.foodWorkforce').text(0);
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
	}
	else if(building == 'barracks') {
		buildingName = 'Barracks';
		jobName = "";		
		availableWorkers = resources.villagers - workforce;
		workersNeeded = campaignInfo.baseInfo.buildings.barracks.buildingInfo.levelRequirements[0].buildersNeeded;
		if(availableWorkers >= workersNeeded) {
			canBuilt = true;
			builders += workersNeeded;			
		}
		else {
			canBuilt = false;
		}
	}
	else if(building == 'warehouse') {
		buildingName = 'Warehouse';
		jobName = "";		
		availableWorkers = resources.villagers - workforce;
		workersNeeded = campaignInfo.baseInfo.buildings.barracks.buildingInfo.levelRequirements[0].buildersNeeded;
		if(availableWorkers >= workersNeeded) {
			canBuilt = true;
			builders += workersNeeded;			
		}
		else {
			canBuilt = false;
		}
	}

	if(canBuilt) {
		var totalBuildings = campaignInfo.baseInfo.buildings[building].buildingInfo.builtStatus;

		if(building == 'woodHuts' || building == 'quarry' || building == 'farms') {
			workers = workersNeeded;
		}

		var checkForWorkersModify = buildingName.replace(" ", "") + totalBuildings.length;		
	
		var item = '<div data-building="' + buildingName.replace(" ", "") + totalBuildings.length + '" data-workers="' + workers + '" data-maxWorkers="' + maxWorkers + '" data-level="1">' +
						'<a>' + buildingName + '<span class="' + building + 'Lvl"> LvL 1</span></a>' +
						'<div class="workersModify">' +				
							'<i class="fa fa-minus foodMinus" onclick="removeWorkforce(\'' + jobName + '\', this)"></i>' +
							'<span id="" class="'+ jobName +'Workforce">' + workers + '</span>' +
							'<i class="fa fa-plus foodPlus" onclick="calculateWorkforce(\'' + jobName + '\', this)"></i>' +	
						'</div>' +
					'</div>';		

		var itemPreparing = '<div class="' + buildingName.replace(" ", "") + 'UnderConstrution">' +
								'<div>' + buildingName + ' under construction</div>' +
								'<div class="progress">' + 
									'<div class="' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">' + 								
									'</div>' + 
								'</div>' +
							'</div>';

		var prod = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].productionBonus;
		var index = {'level': 1, 'productionBonus': prod, 'currentlyWorking': 0, 'maxAllowedWorkers': maxWorkers};

		var timeRequired = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].timeRquired;
		var percentageSteps = 100 / timeRequired;		
		$('.hovelList').append(itemPreparing);
		var timePassed = 0;
		var percentageTotal = 0;
		
		buildingQuota[buildingName.trim()] = setInterval(function() {
			var divToRemove =  buildingName.replace(" ", "") + 'UnderConstrution';
			var workersNeeded = campaignInfo.baseInfo.buildings[building].buildingInfo.levelRequirements[0].buildersNeeded;
			if(timePassed < timeRequired) {
				timePassed++;
				percentageTotal += percentageSteps;
				$('.' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar').css('width', parseInt(percentageTotal) + '%');
				$('.' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar').attr('aria-valuenow', parseInt(percentageTotal));
			}
			else {
				clearInterval(buildingQuota[buildingName.trim()]);
				delete buildingQuota[buildingName.trim()];				
				$('.' + divToRemove).remove();
				totalBuildings.push(index);
				$('.hovelList').append(item);				
				builders -= workersNeeded;				
				if(building == 'woodHuts' || building == 'quarry' || building == 'farms') {
					clearInterval(intervalCarrier);
					generateResources();
				}
				else if (building == 'hovels') {
					resources.villagers = resources.villagers + 5;
					$('div[data-building=' + checkForWorkersModify + '] > div.workersModify').remove();
					clearInterval(intervalCarrier);
					generateResources();
				}
				else {
					$('div[data-building=' + checkForWorkersModify + '] > div.workersModify').remove();
					clearInterval(intervalCarrier);
					generateResources();
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
		alert('More available villagers are needed to built this building.');
	}
}

function nonResourcesBuildings(a, b, c) {
	buildingName = a;	
	jobName = b;
	availableWorkers = resources.villagers - workforce;
	workersNeeded = campaignInfo.baseInfo.buildings[c].buildingInfo.levelRequirements[0].buildersNeeded;
	if(availableWorkers >= workersNeeded) {
		canBuilt = true;
		builders += workersNeeded;
	}
	else {
		canBuilt = false;
	}

	return buildingName;
}

function showBuildingCosts() {
	var buildingNames = ['Barracks', 'Hovel', 'WoodHut', 'Quarry', 'Farm'];
	var buildingObjects = ['barracks', 'hovels', 'woodHuts', 'quarry', 'farms'];
	for (var i = 0; i < buildingNames.length; i++) {
		var minifiedValue = campaignInfo.baseInfo.buildings[buildingObjects[i]].buildingInfo.levelRequirements[0];
		var setInfo = 	'<span class"spn' + buildingNames[i] +'">' + buildingNames[i] + '</span><br/>' + 
						'<span class"spn' + buildingNames[i] + 'gold"> Gold: ' + minifiedValue.gold + '</span><br/>' +
						'<span class"spn' + buildingNames[i] + 'wood"> Wood: ' + minifiedValue.wood + '</span><br/>' +
						'<span class"spn' + buildingNames[i] + 'stone"> Stone: ' + minifiedValue.stone + '</span><br/>';
		$('.btn' + buildingNames[i]).append(setInfo);
	}
}