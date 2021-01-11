var question = [
"quetion1",
"quetion2",
"quetion3",
"quetion4"
];

var answer = [
"answer1",
"answer2",
"answer3",
"answer4"
];

var rightAnswer = [
false,
false,
false,
false
]

let i = 0;
let score = 0;


/*
<div class="question"></div>
<input type="text" class="text" id="hide"/>
*/

var qElmnt = document.querySelector(".question");
var ansElmnt = document.querySelector("input#answer");
var resElmnt = document.querySelector(".result");
var prevBtn = document.querySelector(".previous");
var nextBtn = document.querySelector(".next");
var scrBtn = document.querySelector(".score#score");

prvNxtStat(); 
resetAnsField();
showQ();
showScore();

ansElmnt.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        // Do work
		submit()
    }
});

function submit(){
	if (!rightAnswer[i]){
		let input = ansElmnt.value.toLocaleLowerCase();
		input = cleanInput(input)
		console.log("cleaned input: ", input);
		if(input === answer[i]){
			resElmnt.id="right";
			rightAnswer[i] = true;
			scoring()
			showScore();
			console.log(ansElmnt.value);
			console.log("true");
		}else{
			resElmnt.id="wrong";
			console.log(ansElmnt.value);
			console.log("false");
		}
	}
}



function scoring(result){
	let right = 0;
	
	for(let j=0;j<rightAnswer.length;j++){
		if (rightAnswer[j]){
			right++;
		}
	}
	score = right/rightAnswer.length * 100;
	return score
}

function showScore(){
	scrBtn.textContent=score.toString();
}

function cleanInput(input){ //lower case all chars and eleminate space at the end
	input = input.toLocaleLowerCase();
	let split=input.split("");
	
	input = "";
	while(true){
		if (split[split.length-1]!=" "){
			
			for(let j=0; j<split.length;j++){
				input += split[j];
			}
			return input;
		}else{
			split.pop();
			console.log("popped!");
		}
	}
}

function prvNxtStat(){ //Update next or previous buttons (lock or unlock)
	if (i==0){ //if the index at the first question --> lock prev button
		prevBtn.id="locked";
		prevBtn.setAttribute('onclick',"");
		nextBtn.id="";
		nextBtn.setAttribute('onclick',"nextQ()");
	}else if (i==question.length-1){//if the index at the last question --> lock next button
		nextBtn.id="locked";
		nextBtn.setAttribute('onclick',"");
		prevBtn.id="";
		prevBtn.setAttribute('onclick',"prevQ()");
	}else{
		prevBtn.id="";
		prevBtn.setAttribute('onclick',"prevQ()");
		nextBtn.id="";
		nextBtn.setAttribute('onclick',"nextQ()");
	}
}

function nextQ(){
	i++;
	showQ();
	resetAnsField();
	prvNxtStat();
	
	if (rightAnswer[i]){
		resElmnt.id="right";
		ansElmnt.value=answer[i]
	} else{
		resElmnt.textContent = ""
		resElmnt.id="hide";
	}

}

function prevQ(){
	i--;
	showQ();
	resetAnsField();
	prvNxtStat();
	
	if (rightAnswer[i]){
		resElmnt.id="right";
		ansElmnt.value=answer[i]
	} else{
		resElmnt.textContent = ""
		resElmnt.id="hide";
	}
}

function resetAnsField(){
	ansElmnt.value = "";
}

function showQ(){
	qElmnt.textContent = question[i];
}