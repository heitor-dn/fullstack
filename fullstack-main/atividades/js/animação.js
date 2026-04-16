let canvas = document.getElementById("anima");
let ctx = canvas.getContext("2d");


ctx.beginPath();
ctx.fillStyle = "white";
ctx.strokeStyle = "white";
ctx.lineWidth = 5;
ctx.moveTo(15, 250);
ctx.lineTo(15, 100);
ctx.lineTo(285, 100);
ctx.stroke();
ctx.closePath();

let messi = {
    x: 0,
    y: 10,
    altura: 50,
    largura: 50,
    img: new Image(),
    desenha: function () {

        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.moveTo(30, 300);
        ctx.lineTo(30, 200);
        ctx.lineTo(270, 200);
        ctx.lineTo(270, 300);
        ctx.moveTo(80,300);
        ctx.lineTo(80, 260);
        ctx.lineTo(220, 260);
        ctx.lineTo(220, 300);
        ctx.stroke();
        ctx.closePath();
        
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.arc(150,233,3,0*Math.PI, 2*Math.PI);
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.arc(150,233,57, 1.20*Math.PI, 1.80*Math.PI);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.moveTo(110,300);
        ctx.lineTo(110,290);
        ctx.lineTo(190,290);
        ctx.lineTo(190,300);
        ctx.stroke();
        ctx.closePath();

        this.img.src = "imagens/messi.webp";
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
        ctx.closePath();

        

    }
};
function animação() {
    ctx.clearRect(0, 0, 300, 300);
    messi.desenha();
    requestAnimationFrame(animação)
};
document.addEventListener("mousemove", function (evento) {
    let rect = canvas.getBoundingClientRect();
    let xmouse = evento.clientX - rect.left - messi.largura / 2;
    let ymouse = evento.clientY - rect.top - messi.altura / 2;
    if (xmouse < 0) {
        xmouse = 0
    }
    else if (xmouse > 250) {
        xmouse = 250
    };

    if (ymouse < 0) {
        ymouse = 0
    }
    else if (ymouse > 250) {
        ymouse = 250
    }

    messi.x = xmouse;
    messi.y = ymouse;
})
animação();

