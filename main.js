function getdiff(target){
	let Hday = Date.parse(target);
    let now = Date.now();
    
    return Hday - now
}


function update(){
	countdown("Jan 12 2021, 00:00:00");
}

var loopCount = setInterval(update,1000);

function timeFormat(time){
    let unit = ["s","Minute(s)","Hour(s)","Day(s)"];
    let index = 0;
    let time_lo = 0;
    
    //get biggest time
    if (time>=1000) {
        time /= 1000;
        
        if (time >= 60){
            time /= 60;
            index ++;
            
            if(time>=60){
                time /= 60;
                index ++;
                
                if (time>=24){
                    time /= 24;
                    index ++;
                }
            }           
        }else{
			time = Math.floor(time);
		}
        
    }else{
        time = 0;
		time_lo = 0;
    }
    
    //get the lower level unit of time
    if (index > 0){
        time_lo = time - Math.floor(time);
        time = Math.floor(time);
        switch(index){
            case 1: //if unit is minutes convert to second
                time_lo *= 60;
                time_lo = Math.floor(time_lo);
                break;
            case 2: //if unit is Hours convert to Minutes
                time_lo *= 60;
                time_lo = Math.floor(time_lo);
                break;
            case 3: //if unit is days convert to hours
                time_lo *= 24;
                time_lo = Math.floor(time_lo);
                break;
        }
    }
    
	if (index!=0){
		return time.toString() + " " + unit[index] + " " + time_lo.toString() + " " + unit[index-1];
	}else{
		return time.toString() + " " + unit[index];
	}
    
}

function countdown(target){
    let diff = getdiff(target);
    let timeLeft = timeFormat(diff);
    let descElement = document.querySelector(".counter_desc");
    let counterElement = document.querySelector(".counter");
    counterElement.textContent = timeLeft;
	
	if (diff <= 0){
		clearInterval(loopCount);
		counterElement.id = "fade";
		descElement.id = "fade";
		runAnimation();
	}
}

function runAnimation(){
	let staticWord = document.querySelector(".counter_desc");
	let changingWord = document.querySelector(".counter");
	
	document.querySelector(".gift_button").id = "unlocked";
	document.querySelector(".gift_button").textContent = "Open the gift!";
	document.querySelector(".gift_button").setAttribute('onclick',"giftButtonClick()");
	
	let words = [
	"My Kikai",
	"My Darling",
	"The Smartest",
	"The Most Beautiful",
	"The Manja Person",
	"Manusia Sombong",
	"My Cat Lover",
	"My everything!"];
	let index = 0;
	let wordsLoop = setInterval(updateWords,1500);
	
	function updateWords (){
		
		if(changingWord.id == "fade"){
			changingWord.textContent = words[index];
			changingWord.id = "flip";
			if (staticWord.id == "fade"){
				staticWord.textContent = "Happy Birthday to";
				staticWord.id = "flip";
			}
			index++;
		}else{
			changingWord.id = "fade";
		}

		
		if(index == words.length){
			index = 0;
		}
	}

}


function giftButtonClick(){
	document.querySelector(".gift_button").id="clicked";
	document.querySelector(".tab").id = "flip";
	let buttons = document.querySelectorAll(".tab_btn");
	for(let i=0;i<buttons.length;i++){
		let id = buttons[i].getAttribute("id");
		switch(id){
			case "tb1":
				buttons[i].setAttribute('onclick',"openLetter()");
				break;
			case "tb2":
				buttons[i].setAttribute('onclick',"openQuiz()");
				break;
			case "tb3":
				//buttons[i].setAttribute('onclick',"openRequest()");
				buttons[i].setAttribute('onclick',"");
				break;
		}
	}
}

function openLetter(){
	if(document.querySelector(".letter").id != "flip"){
		closeQuiz();
		closeRequest();
		openContainer();
		document.querySelector(".letter").id="flip";
		document.querySelector(".tab_btn#tb1").id="clicked";
	}
}

function openQuiz(){
	if(document.querySelector(".quiz").id != "flip"){
		closeLetter();
		closeRequest();
		openContainer();
		document.querySelector(".quiz").id = "flip";
		document.querySelector(".tab_btn#tb2").id="clicked";
	}
}

function openRequest(){
	if(document.querySelector(".request").id != "flip"){
		closeQuiz();
		closeLetter();
		openContainer();
		document.querySelector(".request").id = "flip";
		document.querySelector(".tab_btn#tb3").id="clicked"; 
	}
}

function closeLetter(){
	if(document.querySelector(".letter").id == "flip"){
		document.querySelector(".letter").id = "hide";
		document.querySelector(".tab_btn#clicked").id="tb1";
	}
}

function closeQuiz(){
	if(document.querySelector(".quiz").id == "flip"){
		document.querySelector(".quiz").id = "hide";
		document.querySelector(".tab_btn#clicked").id="tb2";
	}
}

function closeRequest(){
	if(document.querySelector(".request").id == "flip"){
		document.querySelector(".request").id = "hide";
		document.querySelector(".tab_btn#clicked").id="tb3";
	}
}

function openContainer(){
	document.querySelector(".content").id = "flip";
}




