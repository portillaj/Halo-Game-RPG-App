var death = new Audio('assets/javascript/gameover.mp3');
var selectedCharacter;
var enemySelected;
var selected = false;
var enemiesFought = [];
var isEmpty = false;

	var card = masterChief.getHtml();

	var masterChief = {
		name: "masterChief",
		hp: 180,
		attackPower: 7,
		increasedAttack: 7,
		counterAttack: 10,
		gifPath: "assets/images/master-chief.gif",
		getHtml: function(){
			var rank = $("<span>")
			.append($("<p>CSR<p>"))
			.addClass("rank");
			
			var h2 = $('<h2>')
			.append(rank)
			.attr("id", "characterHp")
			.text(this.name);
			
			var img = $("<img>")
			.attr("src", this.gifPath)
			.attr("data-obj", this.name)
			.addClass("character");
			


			var outputDiv = $("<div>")
			.addClass("col-md-3 col-lg-3 player-card");
			outputDiv.append(img);
			outputDiv.append(h2);

			return outputDiv; 
		}
	};

	var cortana = {
		name: "cortana",
		hp: 300,
		attackPower: 3,
		increasedAttack: 3,
		counterAttack: 35,
		gifPath: "assets/images/cortana.gif"
	};

	var elite = {
		name: "elite",
		hp: 220,
		attackPower: 5,
		increasedAttack: 5,
		counterAttack: 15,
		gifPath: "assets/images/elite.gif"
	};

	var sentinel = {
		name: "sentinel",
		hp: 135,
		attackPower: 4,
		increasedAttack: 7,
		counterAttack: 20,
		gifPath: "assets/images/sentinel.gif"
	};

var attackButton = $(".attack");
attackButton.hide();

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
		//checks if enemy is defeated
	if(isEmpty == false){
		attackButton.on('click', true);
		enemyStats();
		playerStats();

		if(selectedCharacter.hp <= 0) {
			$(".win-message").text("You Lose!");
			$(".gameOver-message").text("Game Over!");
		}

		if(selectedCharacter2.hp <= 0){
			isEmpty = true;
			$('#enemy').empty();
			$(".enemy-name").html("");
			$(".my-enemy").hide();

			if(enemiesFought.length == 3){
				//death.play();
				$(".win-message").text("You Win!");
				$(".gameOver-message").text("Game Over!");
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

