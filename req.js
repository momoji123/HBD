//a0a68d08-e315-4544-a055-e43913850765


let rest = document.querySelector(".reqRest");
let slctElement = document.querySelector("#slctReq");
let areaElement = document.querySelector(".specific");
let submitBtn = document.querySelector(".submit#request");


let j = 3;
function sendRequest(){
	if(j>0){
		disableBtn(submitBtn);
		submitBtn.textContent = "Wait...";
		
		let request=slctElement.options[slctElement.selectedIndex].text;
		let specification = areaElement.value;
		let split = specification.split("");
		specification="";
		
		for(let k=0;k<split.length;k++){
			if (split[k]==="\n"){
				split[k] = "<br/>";
			}
			specification += split[k];
		}
		
		Email.send({
			SecureToken : "a0a68d08-e315-4544-a055-e43913850765",
			To : 'me@momoji123.com',
			From : "request@momoji123.com",
			Subject : "test request",
			Body : `request : <br/>${request} <br/> <hr/> The specification : <br/>${specification}`
		}).then(
		  message => alert(message)
		);

		j--;
		rest.textContent = j;
		setTimeout(() => {enableBtn(submitBtn);areaElement.value="";},2000);
		
	}
	
	if(j==0){
		disableBtn(submitBtn);
	}
}

function disableBtn(btn){
	btn.setAttribute('onclick',"");
	btn.id="clicked";
}

function enableBtn(btn){
	btn.setAttribute('onclick',"sendRequest()");
	btn.id="request";
	btn.textContent = "Submit";
}

