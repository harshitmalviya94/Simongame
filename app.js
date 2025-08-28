let gameseq=[];
let userseq=[];
let h2=document.querySelector("h2");
let btns=["red","purple","green","yellow"];
let highScore = localStorage.getItem("simonHighScore") || 0;

let start=false;
let level=0;
h2.innerHTML = `Press any key to start<br>High Score: <b>${highScore}</b>`;

document.addEventListener("keypress",function(){
    if(start==false){
        console.log("game is start")
        start=true;
        levelUp()
    }});

function gameFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250);
    };

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
    btn.classList.remove("userFlash");
    },250);
    };

function levelUp(){
    userseq=[];
    level++;
    h2.innerText=`level ${level}`;

    let randIdx=Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn=document.querySelector(`.${randColor}`);
    // console.log(randIdx);
    // console.log(randBtn);
    // console.log(randColor);
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randBtn);

}

function checkAns(idx){
    //  console.log("curr level",level)

    //  let idx = level - 1;
     if(userseq[idx]===gameseq[idx]){
        if(userseq.length==gameseq.length){
         setTimeout(levelUp,1000);
        // console.log("same value");
     }}else{
        if(level > highScore) {
            highScore = level;
            localStorage.setItem("simonHighScore", highScore);
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>
                       High Score: <b>${highScore}</b><br>
                       Press Any Key to start.`;
        reset();
     }
}

function btnPress(){
    console.log(this);
    let btn=this;
    userFlash(btn);

    userColor =btn.getAttribute("id");
    // console.log(userColor);
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    level=0;
    gameseq=[];
    userseq=[];
    start=false;
     h2.innerHTML = `Press any key to start<br>High Score: <b>${highScore}</b>`;
}