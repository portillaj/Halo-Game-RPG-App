$(document).ready(function(){
	var death = new Audio('assets/javascript/gameover.mp3');
	var double = new Audio('assets/javascript/doublekill.mp3');

	var selectedCharacter;
	var selectedCharacter2;
	var selected = false;
	var enemiesFought = [];
	var isEmpty = false;

		var masterChief = {
			name: "MasterChief",
			hp: 220,
			attackPower: 18,
			increasedAttack: 7,
			gifPath: "assets/images/master-chief.gif",
		};

		var cortana = {
			name: "Cortana",
			hp: 300,
			attackPower: 8,
			increasedAttack: 3,
			gifPath: "assets/images/cortana.gif"
		};

		var elite = {
			name: "Elite",
			hp: 220,
			attackPower: 17,
			increasedAttack: 5,
			gifPath: "assets/images/elite.gif"
		};

		var sentinel = {
			name: "Sentinel",
			hp: 135,
			attackPower: 20,
			increasedAttack: 7,
			gifPath: "assets/images/sentinel.gif"
		};

	var attackButton = $(".attack");
	$(".visible").hide();
	attackButton.hide();
	$(".restart-button").hide();

		//when character is selected, the character to battle arena
		$(".character").on("click", function(){
				//store object into selected character variable	
			if(selected == false){
				selectedCharacter = eval($(this).data("obj"));
				$(".player-name").html(selectedCharacter.name);
				$("#player").html('<img src="' + selectedCharacter.gifPath + '" class="character-fight" data-obj="' + selectedCharacter.name + '">');
				$(this).detach();
				$(".hpValue").html(selectedCharacter.hp);
				$(".attackValue").html(selectedCharacter.attackPower);
				selected = true;
			}else if(selected == true){
				selectedCharacter2 = eval($(this).data("obj"));
				$(".enemy-name").html(selectedCharacter2.name);
				$("#enemy").html('<img src="' + selectedCharacter2.gifPath + '" class="character-fight" data-obj="' + selectedCharacter2.name + '">');
				$(this).detach();
				$(".my-enemy").show();
				attackButton.show();
				$(".hpValue2").html(selectedCharacter2.hp);
				$(".attackValue2").html(selectedCharacter2.attackPower);
				isEmpty = false;
				enemiesFought.push(selectedCharacter2);
				console.log(enemiesFought);
			}
	});//end click function

	$(".attack").on("click", function(){
		//if enemy character is not empty run the code if so alert player to select a
		if(isEmpty == false){
			$(".visible").show();
			attackButton.on('click', true);
			playerDisplay();
			enemyDisplay();
			enemyStats();
			playerStats();
			

			if(selectedCharacter.hp <= 0) {
				$(".win-message").text("You Lose!");
				$(".gameOver-message").text("Game Over!");
				death.play();
				$('#player').empty();
				attackButton.unbind("click");
				$(".restart-button").show();
				resetGame();
			}

			if(selectedCharacter2.hp <= 0){
				isEmpty = true;
				$('#enemy').empty();
				$(".enemy-name").html("");
				$(".my-enemy").hide();

				if(enemiesFought.length == 2){
					double.play();
				}

				if(enemiesFought.length == 3){
					death.play();
					$(".win-message").text("You Win!");
					$(".gameOver-message").text("Game Over!");
					attackButton.unbind("click");
					$(".restart-button").show();
					resetGame();
				}
			}
		}else{
			alert("Pick another Character to fight");
		}
	});//end attack click function



	function playerStats() {
		selectedCharacter.hp = selectedCharacter.hp - selectedCharacter2.attackPower;
		$(".hpValue").html(selectedCharacter.hp);
		selectedCharacter.attackPower += selectedCharacter.increasedAttack;
		$(".attackValue").html(selectedCharacter.attackPower);
	}

	function enemyStats() {
		selectedCharacter2.hp = selectedCharacter2.hp - selectedCharacter.attackPower;
		$(".hpValue2").html(selectedCharacter2.hp);
	}

	function resetGame() {
		$(".restart-button").on("click", function() {
			location.reload();
		});
	}

	function playerDisplay() {
		$(".display").html(selectedCharacter.attackPower);
	}

	function enemyDisplay() {
		$(".display2").html(selectedCharacter2.attackPower);
	}
});
