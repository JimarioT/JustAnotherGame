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
	/*if (building == 'barracks') {
		var buildingStatsctive = campaignInfo.baseInfo.buildings[building].buildingInfo.buildingStats.active;
		if(buildingStatsctive == true) {
			$('.btnBarracks').css('display','block');
		}
	}*/
}

function addBuildingToList(building) {
	var buildingName = "", jobName = "";
	if(building == 'hovels') {
		buildingName = "Hovel";
		jobName = "";
		availableWorkers = workforce - resources.villagers;
		if(availableWorkers >= 2) {			
			canBuilt = true;
			resources.villagers = resources.villagers + 5;
		}
		else {
			canBuilt = false;
		}
	}
	else if(building == 'woodHuts') {
		buildingName = "Wood Hut"; 
		jobName = "woodCutter";
		maxWorkers = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].maxAllowedWorkers;
		extraStorage = campaignInfo.baseInfo.buildings.woodHuts.buildingInfo.levelBonus[0].extraStorage;
		resources.woodStorage += extraStorage;
		//var woodSetup = {'buildingName':'Wood Hut','jobName':'woodCutter','storage':'woodStorage'};
		//buildingName = woodSetup.buildingName;
		//jobName = woodSetup.jobName;
		//extraStorage = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].extraStorage;
		//resources[woodSetup.storage] += extraStorage;
		if($('.woodWorkforce').text() != 0) {
			if($('.woodWorkforce').text() >= 2) {				
				builders = parseFloat($('.woodWorkforce').text());
				var remainingVillagers = builders - 2;
				$('.woodWorkforce').text(remainingVillagers);
				canBuilt = true;
			}
			else {
				var workforce = parseFloat($('.woodWorkforce').text()) + parseFloat($('.stoneWorkforce').text()) + parseFloat($('.foodWorkforce').text());
				if(workforce < resources.villagers) {
					builders = parseFloat($('.woodWorkforce').text());
					var remainingVillagers = builders - 2;
					$('.woodWorkforce').text(remainingVillagers);
					canBuilt = true;
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
		resources.stoneStorage += extraStorage;
		//var quarrySetup = {'buildingName':'Quarry','jobName':'stoneCutter','storage':'stoneStorage'};
		//buildingName = quarrySetup.buildingName;
		//jobName = quarrySetup.jobName;
		//extraStorage = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].extraStorage;
		//resources[quarrySetup.storage] += extraStorage;		
		if($('.stoneWorkfocre').text() != 0) {
			if($('.stoneWorkfocre').text() >= 2) {				
				builders = parseFloat($('.stoneWorkfocre').text());
				var remainingVillagers = builders - 2;
				$('.stoneWorkfocre').text(remainingVillagers);
				canBuilt = true;
			}
			else {
				var workforce = parseFloat($('.woodWorkforce').text()) + parseFloat($('.stoneWorkforce').text()) + parseFloat($('.foodWorkforce').text());
				if(workforce < resources.villagers) {
					builders = parseFloat($('.stoneWorkfocre').text());
					var remainingVillagers = builders - 2;
					$('.stoneWorkfocre').text(remainingVillagers);
					canBuilt = true;
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
		resources.foodStorage += extraStorage;
		//var farmSetup = {'buildingName':'Farm','jobName':'farmer','storage':'foodStorage'};
		//buildingName = farmSetup.buildingName;
		//jobName = farmSetup.jobName;
		//extraStorage = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].extraStorage;
		//resources[farmSetup.storage] += extraStorage;		
		if($('.foodWorkforce').text() != 0) {
			if($('.foodWorkforce').text() >= 2) {				
				builders = parseFloat($('.foodWorkforce').text());
				var remainingVillagers = builders - 2;
				$('.foodWorkforce').text(remainingVillagers);
				canBuilt = true;
			}
			else {
				var workforce = parseFloat($('.woodWorkforce').text()) + parseFloat($('.stoneWorkforce').text()) + parseFloat($('.foodWorkforce').text());
				if(workforce < resources.villagers) {
					builders = parseFloat($('.foodWorkforce').text());
					var remainingVillagers = builders - 2;
					$('.foodWorkforce').text(remainingVillagers);
					canBuilt = true;
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
		availableWorkers = workforce - resources.villagers;		
		if(availableWorkers >= 2) {			
			canBuilt = true;			
		}
		else {
			canBuilt = false;
		}
	}

	if(canBuilt) {
		var totalBuildings = campaignInfo.baseInfo.buildings[building].buildingInfo.builtStatus;
	
		var item = '<div data-building="' + buildingName.replace(" ", "") + totalBuildings.length + '" data-workers="0" data-maxWorkers="' + maxWorkers + '" data-level="1">' +
						'<a>' + buildingName + '<span class="' + building + 'Lvl"> LvL 1</span></a>' +
						'<div>' +				
							'<i class="fa fa-minus foodMinus" onclick="removeWorkforce(\'' + jobName + '\', this)"></i>' +
							'<span id="" class="'+ jobName +'Workforce">' + builders + '</span>' +
							'<i class="fa fa-plus foodPlus" onclick="calculateWorkforce(\'' + jobName + '\', this)"></i>' +	
						'</div>' +
					'</div>';

		var itemPreparingInfo = '<div>' + buildingName + ' under construction</div>';

		var itemPreparing = '<div class="progress">' + 
								'<div class="' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">' + 								
								'</div>' + 
							'</div>';

		var prod = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].productionBonus;
		var index = {'level': 1, 'productionBonus': prod, 'currentlyWorking': 0, 'maxAllowedWorkers': maxWorkers};

		var timeRequired = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].timeRquired;
		var percentageSteps = 100 / timeRequired;
		$('.hovelList').append(itemPreparingInfo);
		$('.hovelList').append(itemPreparing);
		var timePassed = 0;
		var percentageTotal = 0;
		
		var buildInterval = setInterval(function() {
			if(timePassed < timeRequired) {
				timePassed++;
				percentageTotal += percentageSteps;			
				$('.' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar').css('width', parseInt(percentageTotal) + '%');
				$('.' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar').attr('aria-valuenow', parseInt(percentageTotal));
				//$('.' + buildingName.replace(" ", "") + totalBuildings.length + '-progress-bar').text(parseInt(percentageTotal) + '%');			
			}
			else {
				clearInterval(buildInterval);
				$('.hovelList').empty();
				totalBuildings.push(index);
				$('.hovelList').append(item);
				builders = 0;
				if(building == 'woodHuts' || building == 'quarry' || building == 'farms') {
					//generateResources();
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