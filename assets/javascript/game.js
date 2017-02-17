$(document).ready(function(){
	//variables
	var death = new Audio('assets/javascript/gameover.mp3');
	var double = new Audio('assets/javascript/doublekill.mp3');
	var hover = new Audio('assets/javascript/hover.mp3');
	var select = new Audio('assets/javascript/select.mp3');
	var selectedCharacter;
	var selectedCharacter2;
	var selected = false;
	var enemiesFought = [];
	var isEmpty = true;

		//my character objects
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

	var attackButton = $(".attack"); //attack button stored in variable
	$(".visible").hide(); //hide how much you attacked for until attacked button is pressed
	attackButton.hide();//hide attack button until characters selected
	$(".restart-button").hide(); //hide restart button until game ends

	$(".character").on("mouseenter", function(){
		hover.play();
	});

		//when character is selected, the character to battle arena
		$(".character").on("click", function(){
			select.play();
				//store object into selected character variable	
			if(selected == false){ //if player is not selected run this code 
				selectedCharacter = eval($(this).data("obj"));
				$(".player-name").html(selectedCharacter.name); //player name is retrieved
				$("#player").html('<img src="' + selectedCharacter.gifPath + '" class="character-fight" data-obj="' + selectedCharacter.name + '">');
				$(this).detach();//remove player from character list
				$(".hpValue").html(selectedCharacter.hp); //display hp of player in stats area
				$(".attackValue").html(selectedCharacter.attackPower);//display attack power of player in stats area
				selected = true;//if player is selected then give selected to true
			}else if(selected == true){//if player is selected, then pick enmey character
				selectedCharacter2 = eval($(this).data("obj")); //gets the character 
				if(isEmpty === false){ //if enemy character is occupied, unbind click
					$(selectedCharacter2).unbind("click");
				}else { //if enemey character is not occupied, you can select a enemy
					$(".enemy-name").html(selectedCharacter2.name);
					$("#enemy").html('<img src="' + selectedCharacter2.gifPath + '" class="character-fight" data-obj="' + selectedCharacter2.name + '">');
					$(this).detach(); //detach enemy character from character list
					$(".my-enemy").show();//show enemy character into the battle area
					$("#enemy").show();
					attackButton.show();//attack button pops up when enemy selected
					$(".hpValue2").html(selectedCharacter2.hp);
					$(".attackValue2").html(selectedCharacter2.attackPower);
					isEmpty = false;//isEmpty is gets false and you cant' select another character until curren enemy is defeated
					enemiesFought.push(selectedCharacter2); //add enemy selected to empty array
				}//end else statement
			}//end else if 
			
	});//end click function

	$(".attack").on("click", function(){
		//if enemy character is not empty run the else code to alert player to select a character to fight
		if(isEmpty == false){
			$(".visible").show(); //displays how much you attacked and enemy attacked
			
			playerDisplay(); //runs function to display player attack power
			enemyDisplay();	//runs function to display enemy attack power
			enemyStats(); //runs function enemy stats
			playerStats(); //runs function for player stats
			
			//if player is defeated run the following code
			if(selectedCharacter.hp <= 0) {
				$(".win-message").text("You Lose!"); 
				$(".gameOver-message").text("Game Over!");
				death.play(); //audio clip plays
				$('#player').hide(); //player is removed from the screen
				$(".player-name").html(""); //player name removed from screen
				attackButton.unbind("click");//unbinds the attack button to prevent attacking
				$(".restart-button").show();//restart button shows up
				resetGame(); //function to reset the game
			}
			//if enemy is defeated run the following code
			if(selectedCharacter2.hp <= 0){
				isEmpty = true; //empty character is set to true to select another enemy
				$('#enemy').hide();//enemy is removed from the screen
				$(".enemy-name").html(""); //enemy name removed from screen
				$(".my-enemy").hide();//enemy removed from screen

				if(enemiesFought.length == 2){
					double.play();//if player defeats two enemies in a row, play clip
				}
				//if all three enemy characters defeated, run the following code
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
			alert("Pick another Character to fight");//when enemy battle area is empty
		}
	});//end attack click function

//FUNCTIONS

	//function that updates player stats and after every attack, attackPower is increased by itself
	function playerStats() {
		selectedCharacter.hp = selectedCharacter.hp - selectedCharacter2.attackPower;
		$(".hpValue").html(selectedCharacter.hp);
		selectedCharacter.attackPower += selectedCharacter.increasedAttack;
		$(".attackValue").html(selectedCharacter.attackPower);
	}

	//function that updates enemy stats after every attack
	function enemyStats() {
		selectedCharacter2.hp = selectedCharacter2.hp - selectedCharacter.attackPower;
		$(".hpValue2").html(selectedCharacter2.hp);
		$(".attackValue2").html(selectedCharacter2.attackPower);
	}

	//function that resets the game to play again
	function resetGame() {
		$(".restart-button").on("click", function() {
			location.reload();
		});
	}

	//function that updates player's attack power
	function playerDisplay() {
		$(".display").html(selectedCharacter.attackPower);
	}

	//function that displays enemy attack power
	function enemyDisplay() {
		$(".display2").html(selectedCharacter2.attackPower);
	}

});//end of document ready function
