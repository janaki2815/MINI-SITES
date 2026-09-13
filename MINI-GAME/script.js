let form =document.getElementById("form");
let input=document.getElementById("number");
const button=document.getElementById("btn");
const message=document.getElementById("message");
const attempt=document.getElementById("attempt");
let restart=document.getElementById("restart");
 let attempts=0;
 let secretNumber=Math.floor(Math.random() * 100) + 1;
 console.log(secretNumber);
 let gameOver=false;
form.addEventListener("submit",function(event){
    event.preventDefault();
    if(gameOver){
        return;
    }
    if(input.value === ""){
        message.textContent="Please enter a number! 🔢";
        return;
    }
    console.log(input.value);
   
   
    let guess=Number(input.value);
    if(guess === secretNumber){
        console.log("correct");
        message.textContent="yes your guess is correct!! the number is ✔️🔥" + secretNumber;
         gameOver = true;
       
    }else if(guess > secretNumber){
        console.log("number is too high");
        message.textContent="your number is too high , let another guess😂";
    }
    else{
        console.log("number is too low");
        message.textContent="your number is too low 👋";
    }
     input.value="";

     attempts++;
     attempt.textContent=" ATTEMPTS : " + attempts;
    
})
restart.addEventListener("click",function(event){
        event.preventDefault();
        attempts=0;
        secretNumber=Math.floor(Math.random() * 100) + 1;
        console.log(secretNumber);
        gameOver=false;
        message.textContent="Make your first guess!";
        attempt.textContent = "ATTEMPTS : " + attempts;
        input.value = "";
     })