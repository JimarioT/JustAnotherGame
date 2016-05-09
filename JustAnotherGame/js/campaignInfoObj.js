var campaignInfo = {
	'playerName': '',
	'playerAttr': {
		'health': 100,
		'atk': 5,
		'def': 5
	},
	'baseInfo': {		
		'units': {
			'villager': {
				'health': 10,
				'atk': 2,
				'def': 2
			}
		}
	}
}

var resources = {
	'gold' : 100 ,
	'wood': 0 ,
	'stone': 0,
	'food': 100,
	'goldStorage' : 200 ,
	'woodStorage': 200 ,
	'stoneStorage': 200,
	'foodStorage': 200,
	'foodRations': 1,
	'villagers': 5
};

var buildingsObj = {
	'hovels': {
		'built' : 0,
		'maxNumber': 5,
		'buildingInfo': {								
			'levelRequirements': [
				{'gold': 10, 'wood': 50, 'stone': 0, 'buildersNeeded': 2},
				{'gold': 400, 'wood': 200, 'stone': 40},
				{'gold': 800, 'wood': 400, 'stone': 80},
				{'gold': 1600, 'wood': 800, 'stone': 160},
				{'gold': 3200, 'wood': 1600, 'stone': 320}
			],
			'levelBonus': [
				{'villagers': 5},
				{'villagers': 7},
				{'villagers': 10}
			],
			'builtStatus': [
			]
		}
	},
	'barracks': {
		'built' : 0,
		'maxNumber': 2,
		'buildingInfo': {			
			'levelRequirements': [
				{'gold': 100, 'wood': 200, 'stone': 200, 'buildersNeeded': 2},
				{'gold': 1000, 'wood': 500, 'stone': 500}
			],
			'levelBonus': [
				{'productionBonus': 0, 'highestLvlUnit': 0, 'timeRquired': 60, 'workersRequired': 4},
				{'productionBonus': 0.2, 'highestLvlUnit': 1},
				{'productionBonus': 0.5, 'highestLvlUnit': 2}
			],
			'builtStatus': [
			]
		}
	},
	'woodHuts': {
		'built' : 0,
		'maxNumber': 2,
		'buildingInfo': {					
			'levelRequirements': [
				{'gold': 10, 'wood': 50, 'stone': 0, 'buildersNeeded': 2},
				{'gold': 200, 'wood': 250, 'stone': 100},
				{'gold': 400, 'wood': 1250, 'stone': 200},
				{'gold': 800, 'wood': 6250, 'stone': 400},
				{'gold': 1600, 'wood': 32250, 'stone': 800}
			],
			'levelBonus': [
				{'productionBonus': 1, 'maxAllowedWorkers': 2, 'extraStorage': 200, 'timeRquired': 60, 'workersRequired': 2},
				{'productionBonus': 1.3, 'maxAllowedWorkers': 4, 'extraStorage': 400},
				{'productionBonus': 1.6, 'maxAllowedWorkers': 6, 'extraStorage': 800},
			],
			'builtStatus': [									
			]
		}
	},
	'quarry': {
		'built' : 0,
		'maxNumber': 2,
		'buildingInfo': {					
			'levelRequirements': [
				{'gold': 10, 'wood': 100, 'stone': 0, 'buildersNeeded': 2},
				{'gold': 200, 'wood': 500, 'stone': 100},
				{'gold': 400, 'wood': 1000, 'stone': 200},
				{'gold': 800, 'wood': 2000, 'stone': 400},
				{'gold': 1600, 'wood': 4000, 'stone': 800}
			],
			'levelBonus': [
				{'productionBonus': 1, 'maxAllowedWorkers': 2, 'extraStorage': 200, 'timeRquired': 60, 'workersRequired': 2},
				{'productionBonus': 1.3, 'maxAllowedWorkers': 4, 'extraStorage': 400},
				{'productionBonus': 1.6, 'maxAllowedWorkers': 6, 'extraStorage': 800},
			],
			'builtStatus': [									
			]
		}
	},
	'farms': {
		'built' : 0,
		'maxNumber': 2,
		'buildingInfo': {					
			'levelRequirements': [
				{'gold': 10, 'wood': 100, 'stone': 0, 'buildersNeeded': 2},
				{'gold': 200, 'wood': 500, 'stone': 100},
				{'gold': 400, 'wood': 1000, 'stone': 200},
				{'gold': 800, 'wood': 2000, 'stone': 400},
				{'gold': 1600, 'wood': 4000, 'stone': 800}
			],
			'levelBonus': [
				{'productionBonus': 1, 'maxAllowedWorkers': 2, 'extraStorage': 200, 'timeRquired': 60, 'workersRequired': 2},
				{'productionBonus': 1.3, 'maxAllowedWorkers': 4, 'extraStorage': 400},
				{'productionBonus': 1.6, 'maxAllowedWorkers': 6, 'extraStorage': 800},
			],
			'builtStatus': [									
			]
		}
	},
	'warehouse': {
		'built' : 0,
		'maxNumber': 1,
		'buildingInfo': {					
			'levelRequirements': [
				{'gold': 10, 'wood': 300, 'stone': 300, 'buildersNeeded': 2},
				{'gold': 200, 'wood': 500, 'stone': 100},
				{'gold': 400, 'wood': 1000, 'stone': 200},
				{'gold': 800, 'wood': 2000, 'stone': 400},
				{'gold': 1600, 'wood': 4000, 'stone': 800}
			],
			'levelBonus': [
				{'productionBonus': 0, 'maxAllowedWorkers': 2, 'extraGoldStorage': 200, 'extraWoodStorage': 1000, 'extraStoneStorage': 1000, 'extraFoodStorage': 1000, 'timeRquired': 60, 'workersRequired': 2},
				{'productionBonus': 0, 'maxAllowedWorkers': 4, 'extraStorage': 400},
				{'productionBonus': 0, 'maxAllowedWorkers': 6, 'extraStorage': 800},
			],
			'builtStatus': [									
			]
		}
	}
};

var jobsObj = {
	'woodcutter': {
		'healthMod': 1.8,
		'atkMod': 1.8,
		'defMod': 1.8
	},
	'stonecutter': {
		'healthMod': 1.7,
		'atkMod': 1.7,
		'defMod': 1.7
	},
	'farmer': {
		'healthMod': 1.5,
		'atkMod': 1.5,
		'defMod': 1.5
	},
	'military': {
		'healthMod': 2,
		'atkMod': 2,
		'defMod': 2
	},
	'villager': {
		'healthMod': 1,
		'atkMod': 1,
		'defMod': 1
	}
};