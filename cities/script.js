function check_answer() {
	if (current_question <= nb_questions) {
		color_element("animation-correct", element_to_find.id);

		if (this.getAttribute("id") == element_to_find.id) {
			increment_score();
		} else {
			color_element("animation-bad", this.getAttribute("id"));
		}

		remove_animation(element_to_find.id, this.getAttribute("id"));

		if (current_question == nb_questions) {
			current_question++;
			sleep(1000).then(() => {
				game_over();
			});
		} else {
			increment_question();
			find_element();
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

function color_element(animation_class, element) {
	document.getElementById(element).classList.add(animation_class);
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

function find_element() {
	var j = Math.floor(Math.random() * element_list.length);
	element_to_find = element_list[j];
	document.getElementById("to_find").innerHTML = element_to_find.libelle;
	element_list.splice(j,1);
}

function new_game() {
	document.getElementById("header").style.display = "block";
	document.getElementById("map").style.display = "block";
	document.getElementById("over").style.display = "none";
	reset_score();
	reset_question();
	find_element();
}

function game_over() {
	document.getElementById("header").style.display = "none";
	document.getElementById("map").style.display = "none";
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
			element_list = data.elements;
			total_elements = elements.length;

			for (var i = 0; i < total_elements; i++) {
				elements[i].addEventListener('click', check_answer);
				elements[i].classList.remove("animation-correct");
				elements[i].classList.remove("animation-bad");
			}

			new_game();
		});
}

var nb_questions;
var element_list;
var current_question = 0;
var score = 0;
var element_to_find = "";
var elements = document.getElementsByClassName("element");
var total_elements = 0;

init();
