var question = [
"<h1>Let's see how literate you're :P</h1> The quote at the beginning of the letter that you should have read before is a quote from a book. What is the title of the book?",
"<h1>Math riddle!</h1> My twin lives at the reverse of my house number. The difference between our house numbers ends in two. What are the lowest possible numbers of our house? (put only one of them)",
"<h1>Hide and Seek in the Music!</h1> Find the only German song in my playlist! The title is the answer ofcourse.",
"<h1>Let's see how high tech you're!</h1> It's not even a question.. Just find the answer no matter how!! (Hint: can't find the answer with mobile devices)",
"<h1>The easiest one!</h1> What is my favorite bread?"  
];

var answer = [
"On the ends of good and evil",
["91","19"],
"Irgendwie, Irgendwo, Irgendwann",
"find me please!",
"croissant"
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
		input = cleanAll(input);
		if(typeof answer[i] === 'string'){
			let cleanAnswer = cleanAll(answer[i]);
			if(input == cleanAnswer){
				resElmnt.id="right";
				rightAnswer[i] = true;
				scoring()
				showScore();
			}else{
				resElmnt.id="wrong";
			}
		}else{
			let check = false;
			for(let j=0;j<answer[i].length;j++){
				let cleanAnswer = cleanAll(answer[i][j]);
				if(input == cleanAnswer){
					resElmnt.id="right";
					rightAnswer[i] = true;
					scoring()
					showScore();
					check = true;
				}else if (!check && j==answer[i].length-1){
					resElmnt.id="wrong";
				}
			}
		}
		if (i==3){
			console.log(answer[i]);
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
	
	if (score==100){
		reqBtn.id="tb3";
		reqBtn.setAttribute('onclick',"openRequest()");
	}
	return score;
}

function showScore(){
	scrBtn.textContent=score.toString()
	if(score==100){
			scrBtn.textContent += " Congrats! Request button unlocked!";
	}
}

function cleanAll(input){
	let split = input.split(" ");
	input="";
	while(true){
		if(split[split.length-1]==""){
			split.pop();
		}else{
			break;
		}
	}
	while (split.length!=0){
		input += split.shift().toLocaleLowerCase();
	}
	return input;
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