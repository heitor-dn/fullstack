let canvas4 = document.getElementById("nuvem");
let ctx4 = canvas4.getContext("2d");
let hover = false

function raio() {
    ctx4.beginPath();
    ctx4.fillStyle = "yellow";
    ctx4.strokeStyle = "yellow";
    ctx4.moveTo(59, 75);
    ctx4.lineTo(90, 75);
    ctx4.lineTo(78, 100);
    ctx4.lineTo(98, 100);
    ctx4.lineTo(63, 140);
    ctx4.lineTo(67, 112);
    ctx4.lineTo(50, 112);
    ctx4.lineTo(59, 75);
    ctx4.stroke();
    ctx4.fill();
}
function desenhar() {
    ctx4.beginPath();
    if (hover) {
        ctx4.fillStyle = "rgb(107, 101, 101)"
    }
    else {
        ctx4.fillStyle = "rgb(0, 154, 196)"
    }
    ctx4.rectStyle = "rgb(0, 154, 196)"
    ctx4.strokeStyle = "rgb(0, 154, 196)"
    ctx4.arc(18.25, 56.25, 18.25, 1.5 * Math.PI, 0.5 * Math.PI, true);
    ctx4.moveTo(131.75, 56.25);
    ctx4.arc(131.75, 56.25, 18.25, 1.5 * Math.PI, 0.5 * Math.PI);
    ctx4.rect(18, 37.75, 114, 36.75);
    ctx4.moveTo(37.5, 37.5);
    ctx4.arc(37.5, 37.5, 20, 0.9 * Math.PI, 0.5 * Math.PI);
    ctx4.moveTo(73, 23);
    ctx4.arc(73, 23, 22, 1 * Math.PI, 0 * Math.PI)
    ctx4.moveTo(109, 37.5);
    ctx4.arc(109, 37.5, 20, 1.25 * Math.PI, 0.5 * Math.PI);
    ctx4.moveTo(37.5, 23);
    ctx4.rect(37.5, 23, 71.5, 15);
    ctx4.fill();
}
function escrever() {
    ctx4.beginPath();
    ctx4.lineWidth = 1
    ctx4.fillStyle = "white";
    ctx4.font = "20px Arial";
    ctx4.textAlign = "center";
    ctx4.fillText("Menu", 75, 50.5);
}
function rede() {
    ctx4.clearRect(0, 0, 150, 200);
    if (hover){
        desenhar();
        escrever();
        raio(); 
    }
    else{
        desenhar();
        escrever();
    }
}

canvas4.addEventListener("mousemove", function (ev) {
    const rect = canvas4.getBoundingClientRect();
    const X = ev.clientX - rect.left;
    const Y = ev.clientY - rect.top;

    desenhar();

    if (ctx4.isPointInPath(X, Y)) {
        hover = true
        canvas4.style.cursor = "pointer";
        
    } else {
        hover = false
        canvas4.style.cursor = "default";
    }

    rede(); 
});

canvas4.addEventListener("click", function (ev) {
    const rect = canvas4.getBoundingClientRect();
    const X = ev.clientX - rect.left;
    const Y = ev.clientY - rect.top;

    desenhar();

    if (ctx4.isPointInPath(X, Y)) {
        window.location.href = "https://moodle.fei.edu.br/course/view.php?id=146"
    }

    rede();
});

canvas4.addEventListener("mouseleave", function () {
    hover = false;

    canvas4.style.cursor = "default";

    rede();
});

rede();










