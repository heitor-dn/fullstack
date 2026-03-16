const x = Math.floor(Math.random()*100)
console.log(x)
const umchute=(document.getElementById("num"))
const botao=(document.getElementById("guess"))
const botao2=(document.getElementById("home"))
botao.onclick = () =>{
    const chute = Number(umchute.value);
    if (chute===x){
    document.getElementById("num").style.setProperty("background-color", "green")
    document.getElementById("resultado").innerHTML = "<img src='acertou.png' alt='n ta funcionando' width='200' height='200'>"
    document.getElementById("avisar").innerText = "To play again, refresh the page."
    // const botao3 = (document.getElementById("bot").innerHTML = "<button>Ok</button>")
} 
    else if(chute>x){
    document.getElementById("num").style.setProperty("background-color", "red")
    document.getElementById("resultado").innerHTML = "<img src='errou.png' alt='n ta funcionando' width='200' height='200'>"
    document.getElementById("avisar").innerText = "Too high, try again."
}   
    
    else{
    document.getElementById("num").style.setProperty("background-color", "red")
    document.getElementById("resultado").innerHTML = "<img src='errou.png' alt='n ta funcionando' width='200' height='200'>"
    document.getElementById("avisar").innerText = "Too low, try again."
} 
    
};


