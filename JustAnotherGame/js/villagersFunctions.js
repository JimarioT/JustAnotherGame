var boredVillagers = [
	"*Hey boss, it's a tad boring over here! Let me help!*",
	"*It's nice, not doing anything! But how will I pay my taxes with no job?*",
	"*Psit ... Boss ... Hey ... You forgot about me?*",
	"**Singing in the rain Tune* ... I'm scraaatching over here!*",
	"*We need to add a WiFi antenna for when we are doing NOTHING*",
	"It's a nice day today, for not doing anything"
];

function calculateWorkforce(job, a) {
	var workforce = sumTotalWorkforce();				
	if (workforce < resources.villagers) {
		addWorkforce(job, a);
	}
}

function sumTotalWorkforce() {
	var workforce = parseFloat($('.woodWorkforce').text()) + parseFloat($('.stoneWorkforce').text()) + parseFloat($('.foodWorkforce').text()) + builders;
	
	if($('div[data-building="WoodHut0"]').length > 0) {					
		workforce = workforce + parseFloat($('div[data-building="WoodHut0"]').attr('data-workers'));					
	}

	if($('div[data-building="Quarry0"]').length > 0) {					
		workforce = workforce + parseFloat($('div[data-building="Quarry0"]').attr('data-workers'));
	}

	if($('div[data-building="Farm0"]').length > 0) {					
		workforce = workforce + parseFloat($('div[data-building="Farm0"]').attr('data-workers'));					
	}

	return workforce;
}

function addWorkforce(job, a) {	
	var workforce;
	if (job == 'wood') {
		addGenericWorkforce('woodWorkforce');
	}
	if (job == 'stone') {
		addGenericWorkforce('stoneWorkforce');
	}
	if (job == 'food') {
		addGenericWorkforce('foodWorkforce');
	}
	if (job == 'woodCutter') {
		addBuildingWorkForce('woodCutterWorkforce', a);
	}
	if (job == 'stoneCutter') {
		addBuildingWorkForce('stoneCutterWorkforce', a);
	}
	if (job == 'farmer') {
		addBuildingWorkForce('farmerWorkforce', a);
	}

	clearInterval(intervalCarrier);
	generateResources();
}

function addGenericWorkforce(genericWorkforce) {
	workforce = $('.' + genericWorkforce).text();					
	workforce ++;					
	$('.' + genericWorkforce).text(workforce);
}

function addBuildingWorkForce(buildingWorkforce, a) {
	var workers = $(a).parent().parent().attr('data-workers');
	var maxAllowed = $(a).parent().parent().attr('data-maxworkers');					
	if(workers < maxAllowed) {
		$(a).parent().parent().attr('data-workers', parseFloat(workers) + 1);
	}
	workers = $(a).parent().parent().attr('data-workers');
	$('.' + buildingWorkforce).text(workers);
}

function removeWorkforce(job, a) {
	var workforce;
	if (job == 'wood') {
		removeGenericWorkforce('woodWorkforce');
	}
	if (job == 'stone') {
		removeGenericWorkforce('stoneWorkforce');
	}
	if (job == 'food') {
		removeGenericWorkforce('foodWorkforce');
	}
	if (job == 'woodCutter') {
		removeBuildingWorkForce('woodCutterWorkforce', a);
	}
	if (job == 'stoneCutter') {
		removeBuildingWorkForce('stoneCutterWorkforce', a);
	}
	if (job == 'farmer') {
		removeBuildingWorkForce('farmerWorkforce', a);
	}
	clearInterval(intervalCarrier);
	generateResources();
}

function removeGenericWorkforce(genericWorkforce) {
	workforce = $('.' + genericWorkforce).text();
	if(workforce > 0) {
		workforce --;
		$('.' + genericWorkforce).text(workforce);
	}
}

function removeBuildingWorkForce(buildingWorkforce, a) {
	workforce = parseFloat($('.' + buildingWorkforce).text());
	if(workforce > 0) {
		workforce --;						
		$('.' + buildingWorkforce).text(workforce);
		$(a).parent().parent().attr('data-workers', workforce);
	}
}

function villagersFeedback() {				
	var repeats = 0;
	
	setInterval(function() {
		var workforce = sumTotalWorkforce();

		if(workforce < resources.villagers) {
			var boredCase = Math.floor(((Math.random() * 10) + 1) / 2);						
			boredText = boredText + boredVillagers[boredCase] + '\n';
			$('textarea').val(boredText);
			repeats ++;						
		}
		else if (workforce == resources.villagers){
			var emptyString = "";
			$('textarea').val(emptyString);
		}
		if(repeats == 10) {
			boredText = "";
			$('textarea').val(boredText);
			repeats = 0;
		}
	}, 10000);				
}