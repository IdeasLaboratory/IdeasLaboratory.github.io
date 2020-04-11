function check_answer() {
	if (current_question <= nb_questions) {
		color_region("animation-correct", region_to_find.id);

		if (this.getAttribute("id") == region_to_find.id) {
			increment_score();
		} else {
			color_region("animation-bad", this.getAttribute("id"));
		}

		remove_animation(region_to_find.id, this.getAttribute("id"));

		if (current_question == nb_questions) {
			current_question++;
			sleep(1000).then(() => {
				game_over();
			});
		} else {
			increment_question();
			find_region();
		}

	}
}

async function remove_animation(tofind, choice) {
	sleep(500).then(() => {
		document.getElementById(tofind).classList.remove("animation-correct");
		document.getElementById(choice).classList.remove("animation-bad");
	});
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function color_region(animation_class, region) {
	document.getElementById(region).classList.add(animation_class);
}

function increment_score() {
	score++;
	document.getElementById("score").innerHTML = "Score : " + score;
}

function reset_score() {
	score = 0;
	document.getElementById("score").innerHTML = "Score : " + score;
}

function increment_question() {
	current_question++;
	document.getElementById("question").innerHTML = current_question + " / " + nb_questions;
}

function reset_question() {
	current_question = 1;
	document.getElementById("question").innerHTML = current_question + " / " + nb_questions;
}

function find_region() {
	var j = Math.floor(Math.random() * region_list.length);
	region_to_find = region_list[j];
	document.getElementById("to_find").innerHTML = region_to_find.libelle;
	region_list.splice(j,1);
}

function new_game() {
	document.getElementById("header").style.display = "block";
	document.getElementById("france_region").style.display = "block";
	document.getElementById("over").style.display = "none";
	reset_score();
	reset_question();
	find_region();
}

function game_over() {
	document.getElementById("header").style.display = "none";
	document.getElementById("france_region").style.display = "none";
	document.getElementById("over").style.display = "block";
	document.getElementById("over_score").innerHTML = "Score : " + score;
}

function init() {
	fetch("./manifest.json")
		.then(function(resp){
			return resp.json();
		})
		.then(function(data){
			nb_questions = data.settings.nb_questions;
			region_list = data.regions;
			total_regions = regions.length;

			for (var i = 0; i < total_regions; i++) {
				regions[i].addEventListener('click', check_answer);
				regions[i].classList.remove("animation-correct");
				regions[i].classList.remove("animation-bad");
			}

			new_game();
		});
}

var nb_questions;
var region_list;
var current_question = 0;
var score = 0;
var region_to_find = "";
var regions = document.getElementsByClassName("region");
var total_regions = 0;

init();
