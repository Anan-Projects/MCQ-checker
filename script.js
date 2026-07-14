const quesNumT = document.getElementById("quesNumT");
const confirmNum = document.getElementById("confirmNum");
const omrPageCont = document.getElementById("omrPageCont");
const instext = document.getElementById("instext");
const mainCont = document.getElementById("mainCont");
const buttonCont = document.createElement("div");
const submitAnsCrt = document.createElement("button");
const resetAllAns = document.createElement("button");
const timerBtn = document.getElementById("timerBtn");
const timerCont = document.getElementById("timerCont");
const timerNum = document.getElementById("timerNum");
const descriptionCont = document.getElementById("descriptionCont");
const infoBtn = document.getElementById("infoBtn");
let totalQuestionNum = 0;
let isAnswering = false;
let correctAnswers = [];
let userAnswers = [];
let areCorrect = [];
let correctNum = 0;
let skippedNum = 0;


confirmNum.onclick = function(){
  
  if(quesNumT.value === "" || quesNumT.value === " " || Number(quesNumT.value) <= 0) return;
  
  omrPageCont.innerHTML = "";
  instext.textContent = "Please fill up the OMR with correct answers first.";
  totalQuestionNum = Number(quesNumT.value);
  
  let quesNum = 1;
  while(quesNum <= totalQuestionNum){
    
    const omrCont = document.createElement("div");
    omrCont.classList.add("omrContStyle");
    const quesNumText = document.createElement("span");
    quesNumText.textContent = `Q.${quesNum}`;
    quesNumText.id = "quesNumText";
    omrCont.append(quesNumText);
    
    const omrOptA = document.createElement("input");
    const labelA = document.createElement("p");
    omrOptA.type = "radio";
    omrOptA.value = "A";
    omrOptA.name = `ques${quesNum}`;
    omrOptA.id = `ques${quesNum}omrOptA`;
    labelA.for = `ques${quesNum}omrOptA`;
    labelA.textContent = "A.";
    
    const omrOptB = document.createElement("input");
    const labelB = document.createElement("p");
    omrOptB.type = "radio";
    omrOptB.value = "B";
    omrOptB.name = `ques${quesNum}`;
    omrOptB.id = `ques${quesNum}omrOptB`;
    labelB.for = `ques${quesNum}omrOptB`;
    labelB.textContent = "B.";
    
    const omrOptC = document.createElement("input");
    const labelC = document.createElement("p");
    omrOptC.type = "radio";
    omrOptC.value = "C";
    omrOptC.name = `ques${quesNum}`;
    omrOptC.id = `ques${quesNum}omrOptC`;
    labelC.for = `ques${quesNum}omrOptC`;
    labelC.textContent = "C.";
    
    const omrOptD = document.createElement("input");
    const labelD = document.createElement("p");
    omrOptD.type = "radio";
    omrOptD.value = "D";
    omrOptD.name = `ques${quesNum}`;
    omrOptD.id = `ques${quesNum}omrOptD`;
    labelD.for = `ques${quesNum}omrOptD`;
    labelD.textContent = "D.";
    
    omrCont.append(labelA);
    omrCont.append(omrOptA);
    omrCont.append(labelB);
    omrCont.append(omrOptB);
    omrCont.append(labelC);
    omrCont.append(omrOptC);
    omrCont.append(labelD);
    omrCont.append(omrOptD);
    
    omrPageCont.append(omrCont);
    quesNum++;
  }
  
  buttonCont.id = "buttonCont";
  mainCont.append(buttonCont);
  
  submitAnsCrt.textContent = "Submit";
  submitAnsCrt.id = "submitAnsCrt";
  submitAnsCrt.classList.add("submitAnsStyle");
  buttonCont.append(submitAnsCrt);
  
  resetAllAns.textContent = "Reset";
  resetAllAns.id = "resetAllAns";
  resetAllAns.classList.add("resetAllAnsStyle");
  buttonCont.append(resetAllAns);
}

submitAnsCrt.onclick = function(){
  
  if(hasTimer && !isAnswering){
      start();
      decreaseTime();
  }
  
  const checkedNumber = document.querySelectorAll('input[type="radio"]:checked').length;
  
  if(!isAnswering){
    
    if(checkedNumber !== totalQuestionNum){
    let notChecked = totalQuestionNum - checkedNumber;
    window.alert(`You still have not provided the answers to ${notChecked} questions.`);
    } else{
    
    submit();
    instext.textContent = "Answers recorded. Now you can start answering the questions.";
    
    document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
    isAnswering = true;
    }
  }
  else{ 
    submit2();
    reset();
  }
}

function submit(){
  
  for(let j = 1; j <= totalQuestionNum; j++){
      
      takeCorrectAns(correctAnswers, `ques${j}`);
    }
}

function submit2(){
  userAnswers = [];
  correctNum = 0;
  for(let k = 1; k <= totalQuestionNum; k++){
      
      takeCorrectAns(userAnswers, `ques${k}`);
    }
    checkAnswer(correctAnswers, userAnswers);
    for(let l = 0; l < totalQuestionNum; l++){
      
      let radioGroup = document.querySelectorAll(`input[name = ques${l + 1}]`);
      
      radioGroup.forEach(radio => {
      
      radio.classList.remove("correctAns", "wrongAns");
      radio.parentElement.classList.remove("correctAnsCont", "wrongAnsCont", "skipAnsCont");
      if(areCorrect[l] === true){
        radio.classList.add("correctAns");
        if(radio.checked){
          correctNum++;
        }
        radio.parentElement.classList.add("correctAnsCont");
      }
      else if(areCorrect[l] === false){
        radio.classList.add("wrongAns");
        radio.parentElement.classList.add("wrongAnsCont");
      }
      else if(areCorrect[l] === undefined){
        radio.parentElement.classList.add("skipAnsCont");
          skippedNum++;
      }
      
      radio.addEventListener("click", (event) => {
        
        event.preventDefault();
      });
     }); 
    }
    instext.textContent = `You scored ${correctNum} out of ${totalQuestionNum} i.e. ${(((correctNum)/totalQuestionNum)*100).toFixed(2)}% Skipped: ${skippedNum/4}`;
    isAnswering = false;
    resetAllAns.textContent = "Reset All";
}

function takeCorrectAns(arrayName,optName){
  
  let correctAns = document.querySelector(`input[name = "${optName}"]:checked`);
  if(correctAns){
    arrayName.push(correctAns.value);
  }
  else{
    arrayName.push("skip");
  }
}

function checkAnswer(arr1, arr2){
  
  areCorrect = arr1.map((val,index) => { 
    
    if(arr2[index] === "skip"){
      return undefined;
    }
    else{
      return val === arr2[index];
    }
  });
}

let hasInfo = false;


infoBtn.onclick = function(){
  if(!hasInfo){
    descriptionCont.classList.remove("descriptionContHide");
    descriptionCont.classList.add("descriptionContShow");
    hasInfo = true;
  }
  else{
    descriptionCont.classList.add("descriptionContHide");
    descriptionCont.classList.remove("descriptionContShow");
    hasInfo = false;
  }
}

//timer
const timerHour = document.getElementById("timerHour");
const timerMin = document.getElementById("timerMin");
const timerSec = document.getElementById("timerSec");

let hasTimer = false;
let hour = 0;
let min = 0;
let sec = 0;
let totalSec = 0;
let isOn = false;
let isResetable = false;
let timerInterval = null;

timerSec.classList.remove("timeLow");
timerSec.classList.remove("timeVeryLow");

timerBtn.onclick = function(){
  if(!hasTimer){
    timerCont.classList.remove("hide");
    timerCont.classList.add("show");
    hasTimer = true;
  }
  else{
    timerCont.classList.add("hide");
    timerCont.classList.remove("show");
    hasTimer = false;
  }
}

function start(){
  
  if(!isOn && (timerHour.value !== "" || timerMin.value !== "" || timerSec.value !== "")){
  
  hour = Number(timerHour.value);
  min = Number(timerMin.value);
  sec = Number(timerSec.value);
  
  totalSec = (hour * 3600) + (min * 60) + sec;
  
  if(totalSec > 0){
    
    if(min >= 60){
      
      min -= 60;
      hour += 1;
    }
    if(sec >= 60){
      
      sec -= 60;
      min += 1;
    }
    
  }
  timerInterval = setInterval(decreaseTime, 1000);
  isOn = true;
  isResetable = true;
  timerHour.setAttribute("readonly", "");
  timerMin.setAttribute("readonly", "");
  timerSec.setAttribute("readonly", "");
  }
}

function decreaseTime(){
  
  if(!isAnswering) return;
 
  if(totalSec === 0){
    isOn = false;
    clearInterval(timerInterval);
    reset();
    submit();
    submit2();
    isAnswering = false;
    resetAllAns.textContent = "Reset All";
    console.log(areCorrect);
  }
  else{
  totalSec--;
  hour = String(Math.floor(totalSec / 3600)).padStart(2, 0);
  min = String(Math.floor((totalSec % 3600) / 60)).padStart(2,0);
  sec = String(Math.floor(totalSec % 60)).padStart(2,0);
  timerHour.value = hour;
  timerMin.value = min;
  timerSec.value = sec;
  if(totalSec < 60 && totalSec > 10){
    timerSec.classList.add("timeLow");
    timerSec.classList.remove("timeVeryLow");

  }
  else if(totalSec <= 10){
    timerSec.classList.add("timeVeryLow");
    timerSec.classList.remove("timeLow");
  }
  }
}

function stop(){
  
  if(isOn){
    clearInterval(timerInterval);
    isOn = false;
  }
}

function reset(){
  
  if(isResetable){
  isOn = false;
  hour = 0;
  min = 0;
  sec = 0;
  timerHour.value = "";
  timerMin.value = "";
  timerSec.value = "";
  isResetable = false;
  clearInterval(timerInterval);
  timerSec.classList.remove("timeLow");
  timerSec.classList.remove("timeVeryLow");
  timerHour.removeAttribute("readonly", "");
  timerMin.removeAttribute("readonly", "");
  timerSec.removeAttribute("readonly", "");
  }
}


//all Reset
resetAllAns.onclick = function(){
  
  document.querySelectorAll('input[type="radio"]').forEach(radio => radio.checked = false);
  
  
  if(resetAllAns.textContent === "Reset All"){
    resetAllAns.textContent = "Reset";
    correctAnswers = [];
    userAnswers = [];
    areCorrect = [];
    correctNum = 0;
    skippedNum = 0;
    isAnswering = false;
    totalQuestionNum = 0;
    quesNum = 1;
    quesNumT.value = "";
    reset();
    document.querySelectorAll('input[type="radio"]').forEach((radio) => radio.parentElement.classList.remove("correctAnsCont", "wrongAnsCont", "skipAnsCont"));
    omrPageCont.innerHTML = "";
    buttonCont.innerHTML = "";
    instext.textContent = "";
  }
}