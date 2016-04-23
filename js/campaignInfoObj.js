var campaignInfo = {
	'playerName': '',
	'playerAttr': {
		'health': 100,
		'atk': 5,
		'def': 5
	},
	'baseInfo': {
		'buildings': {
			'hovels': {
				'built' : 0,
				'maxNumber': 5,
				'buildingInfo': {
					'buildingStats': {
						'active': false,
						'level': 0,
						'productionBonus': 0,
						'highestLvlUnit': 0
					},								
					'levelRequirements': [
						{'gold': 100, 'wood': 50, 'stone': 0},
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
					'buildingStats': {
						'active': false,
						'level': 0,
						'productionBonus': 0,
						'highestLvlUnit': 0
					},								
					'levelRequirements': [
						{'gold': 100, 'wood': 50, 'stone': 50},
						{'gold': 1000, 'wood': 500, 'stone': 500}
					],
					'levelBonus': [
						{'productionBonus': 0, 'highestLvlUnit': 0},
						{'productionBonus': 0.2, 'highestLvlUnit': 1},
						{'productionBonus': 0.5, 'highestLvlUnit': 2}
					]
				}
			},
			'woodHuts': {
				'built' : 0,
				'maxNumber': 2,
				'buildingInfo': {
					'buildingStats': {
						'active': false,
						'level': 0,
						'productionBonus': 0,
						'highestLvlUnit': 0
					},								
					'levelRequirements': [
						{'gold': 100, 'wood': 50, 'stone': 0},
						{'gold': 200, 'wood': 250, 'stone': 100},
						{'gold': 400, 'wood': 1250, 'stone': 200},
						{'gold': 800, 'wood': 6250, 'stone': 400},
						{'gold': 1600, 'wood': 32250, 'stone': 800}
					],
					'levelBonus': [
<<<<<<< HEAD
						{'productionBonus': 1, 'maxAllowedWorkers': 2, 'extraStorage': 200},
						{'productionBonus': 1.3, 'maxAllowedWorkers': 4, 'extraStorage': 400},
						{'productionBonus': 1.6, 'maxAllowedWorkers': 6, 'extraStorage': 800},
=======
						{'productionBonus': 1, 'maxAllowedWorkers': 2},
						{'productionBonus': 1.3, 'maxAllowedWorkers': 4},
						{'productionBonus': 1.6, 'maxAllowedWorkers': 6},
>>>>>>> origin/master
					],
					'builtStatus': [									
					]
				}
			},
			'quarry': {
				'built' : 0,
				'maxNumber': 2,
				'buildingInfo': {
					'buildingStats': {
						'active': false,
						'level': 0,
						'productionBonus': 0,
						'highestLvlUnit': 0
					},								
					'levelRequirements': [
						{'gold': 100, 'wood': 100, 'stone': 0},
						{'gold': 200, 'wood': 500, 'stone': 100},
						{'gold': 400, 'wood': 1000, 'stone': 200},
						{'gold': 800, 'wood': 2000, 'stone': 400},
						{'gold': 1600, 'wood': 4000, 'stone': 800}
					],
					'levelBonus': [
<<<<<<< HEAD
						{'productionBonus': 1, 'maxAllowedWorkers': 2, 'extraStorage': 200},
						{'productionBonus': 1.3, 'maxAllowedWorkers': 4, 'extraStorage': 400},
						{'productionBonus': 1.6, 'maxAllowedWorkers': 6, 'extraStorage': 800},
=======
						{'productionBonus': 1, 'maxAllowedWorkers': 2},
						{'productionBonus': 1.3, 'maxAllowedWorkers': 4},
						{'productionBonus': 1.6, 'maxAllowedWorkers': 6},
>>>>>>> origin/master
					],
					'builtStatus': [									
					]
				}
			},
			'farms': {
				'built' : 0,
				'maxNumber': 2,
				'buildingInfo': {
					'buildingStats': {
						'active': false,
						'level': 0,
						'productionBonus': 0,
						'highestLvlUnit': 0
					},								
					'levelRequirements': [
						{'gold': 100, 'wood': 100, 'stone': 0},
						{'gold': 200, 'wood': 500, 'stone': 100},
						{'gold': 400, 'wood': 1000, 'stone': 200},
						{'gold': 800, 'wood': 2000, 'stone': 400},
						{'gold': 1600, 'wood': 4000, 'stone': 800}
					],
					'levelBonus': [
<<<<<<< HEAD
						{'productionBonus': 1, 'maxAllowedWorkers': 2, 'extraStorage': 200},
						{'productionBonus': 1.3, 'maxAllowedWorkers': 4, 'extraStorage': 400},
						{'productionBonus': 1.6, 'maxAllowedWorkers': 6, 'extraStorage': 800},
=======
						{'productionBonus': 1, 'maxAllowedWorkers': 2},
						{'productionBonus': 1.3, 'maxAllowedWorkers': 4},
						{'productionBonus': 1.6, 'maxAllowedWorkers': 6},
>>>>>>> origin/master
					],
					'builtStatus': [									
					]
				}
			}
		},
		'units': {
			'villager': {
				'health': 10,
				'atk': 2,
				'def': 2
			}
		},
		'jobs': {
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
		}
	}
}