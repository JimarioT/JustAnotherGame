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
		resources.villagers = resources.villagers + 5;
	}
	else if(building == 'woodHuts') {
		buildingName = "Wood Hut"; 
		jobName = "woodCutter";
	}
	else if(building == 'quarry') {
		buildingName = 'Quarry';
		jobName = "stoneCutter";
	}
	else if(building == 'farms') {
		buildingName = 'Farm';
		jobName = "farmer";
	}
	var totalBuildings = campaignInfo.baseInfo.buildings[building].buildingInfo.builtStatus;
	var item = '<div data-building="' + buildingName.replace(" ", "") + totalBuildings.length + '" data-workers="0">' +
				'<a>' + buildingName + '<span class="' + building + 'Lvl"> LvL 1</span></a>' +
				
					'<i class="fa fa-minus foodMinus" onclick="removeWorkforce(\'' + jobName + '\', this)"></i>' +
					'<span id="" class="'+ jobName +'Workforce"> 0 </span>' +
					'<i class="fa fa-plus foodPlus" onclick="calculateWorkforce(\'' + jobName + '\', this)"></i>' +	
				'</div>';
	var prod = campaignInfo.baseInfo.buildings[building].buildingInfo.levelBonus[0].productionBonus;
	var index = {'level': 1, 'productionBonus': prod, 'currentlyWorking': 0};
	totalBuildings.push(index);
	$('.hovelList').append(item);				
	generateResources();
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