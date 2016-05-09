var introStory = [
	"You live in a world where names are not important, only actions, and thus you strive all your life to be something. After years of training, injuries, stubbornness, and faith, you manage to become one of the greatest generals in your country. For a few months you enjoy the results of your hard work until a messenger arrives. He handles you a letter and leaves. You open the letter and you read your first assignment. Join your fellow countrymen in battle and help them win. Your country was always rich with resources, something that made your neighbors jealous, everyone knew that ... War wasn't far. And now, is the time to fight.",
	"You get your battalion and march, with first target your outpost just behind the battlefield. When you reach the outpost you see something inconceivable . . . Everyone is dead!! You command your troops to be ready for everything and move forward with a bad feeling lingering in your guts. 'DEATH TO OUR ENEMIES' yelled a voice and it was the last thing you remember.",
	"You wake up 1 week later inside a hut, and the first thing you see is a villager watching over you. He sees that you are awake and rushes to check up on you while yelling to someone that you are awake. Five people come in the hut. You try to speak while being totally dizzy but when you try to move your jaw pain runs through your spine. One of the villagers speaks with haste explaining you what happened one week ago. Double-cross, someone has betrayed our country and allowed to the enemy to get in our outpost. When you arrived there you were the first to get attacked by some freakishly fast warrior who broke your jaw. You fell on the ground and your battalion's soldiers who fought back were either killed or captured by the enemy. After the attack, the enemy, destroyed and then  abandoned the outpost moving closer to your capital. A few captured villagers who were imprisoned in the outpost and left for dead, managed to escape and found you in bad shape, but alive. They kept you alive and nursed you back to 'health'. 'There are many wondering countrymen of ours and they are hiding from our enemies.",
	"We need you to fix this. You HAVE to fix this."
];

function readTheMainStorySecondVersion() {				
	if($('.storyInfo').css('display') == "none") {
		$('.storyInfo').slideDown();				
		$('.storyInfo').append('<p class="p' + storyPart + '">');					
		var p = "";
		var letterIndex = 0;
		var pInterval = setInterval(function(){
			p += introStory[storyPart][letterIndex];					
			$('.p' + storyPart).html(p);
			letterIndex++;
			if(letterIndex == introStory[storyPart].length) {						
				$('.storyInfo').append('<div class="pBtns" style="display:none;">' + '<button class="btn btnClose">Close</button>' + '<button class="btn btnP">Continue</button>' + '</div>');
				$('.btnP').attr('onclick','readTheMainStorySecondVersion()');
				$('.btnClose').attr('onclick','closeStoryInfo()');
				$('.pBtns').slideDown();
				clearInterval(pInterval);
			}
		//}, 50);
		}, 10);
	}
	else {
		storyPart++;					
		$('.btnP').attr('onclick','');
		$('.btnClose').attr('onclick','');
		$('<p class="p' + storyPart + '">').insertBefore(".pBtns");
		var p = "";
		var letterIndex = 0;
		var pInterval = setInterval(function(){
			p += introStory[storyPart][letterIndex];
			$('.p' + storyPart).html(p);
			letterIndex++;
			if(letterIndex == introStory[storyPart].length) {
				$('.btnP').attr('onclick','readTheMainStorySecondVersion()');
				$('.btnClose').attr('onclick','closeStoryInfo()');
				clearInterval(pInterval);
			}
		}, 10);						
	}
	if(storyPart == 3) {
		$('.btnP').remove();
	}
}

function closeStoryInfo() {
	$('.storyInfo').css('height', '0px');
	setTimeout(function() {
		$('.storyInfo').hide().empty();
		$('.storyInfo').css('height', '800px');
		storyPart = 0;
	}, 2000);								
}