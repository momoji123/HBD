var question = [
"The quote at the beginning of the letter that you should have read is a quote from a book. What is the title of the book?",
"<h1>Math riddle!</h1> My twin lives at the reverse of my house number. The difference between our house numbers ends in two. What are the lowest possible numbers of our house? (put only one of them)",
"quetion3",
"quetion4",
"question5"
];

var answer = [
"on the ends of good and evil",
["91","19"],
"answer3",
"answer4",
"answer5"
];

var rightAnswer = [
false,
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
var reqBtn = document.querySelector(".tab_btn#locked3");

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
		if(typeof answer[i] === 'string'){
			if(input == answer[i]){
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
		}else{
			
			console.log("Answer is a list")
			let check = false;
			for(let j=0;j<answer[i].length;j++){
				if(input == answer[i][j]){
					resElmnt.id="right";
					rightAnswer[i] = true;
					scoring()
					showScore();
					check = true;
					console.log(ansElmnt.value);
					console.log("true");
				}else if (!check && j==answer[i].length-1){
					resElmnt.id="wrong";
					console.log(ansElmnt.value);
					console.log("false");
				}
			}
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
	score = Math.ceil(right/rightAnswer.length * 100);
	console.log(score);
	
	if (score==100){
		reqBtn.id="tb3";
		reqBtn.setAttribute('onclick',"openRequest()");
	}
	return score;
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
	qElmnt.innerHTML = question[i];
}