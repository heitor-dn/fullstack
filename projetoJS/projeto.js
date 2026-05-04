let canvas = document.getElementById("donkey");
let ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false;

let frameX = 0;
let tempoAnimação = 0;
const velocidadeAnimação = 10;

const imgEscada = new Image();
imgEscada.src = "escada.png";

const imgViga = new Image();
imgViga.src = "viga.png"

function desenhar() {

    // ctx.beginPath();
    // ctx.fillStyle = "lightblue";
    // ctx.fillRect(480, 650, 40, 120);
    // ctx.fillRect(80, 530, 40, 120);
    // ctx.fillRect(480, 410, 40, 120);
    // ctx.fillRect(80, 290, 40, 120);
    // ctx.fillRect(480, 170, 40, 120);
    // ctx.fillRect(250, 70, 40, 115)
    // ctx.closePath();

    escadas.forEach(esc => {
        desenharEscada(esc.x, esc.y, esc.largura, esc.altura)
    });

    plataformas.forEach(plat => {
        desenharViga(plat.x1, plat.y1, plat.x2, plat.y2, 35);
    });

    // ctx.beginPath();
    // ctx.save();
    // ctx.strokeStyle = "red";
    // ctx.fillRect(0, 770, 300, 800);

    // ctx.moveTo(300, 770);
    // ctx.lineTo(600, 740);
    // ctx.lineTo(600, 770);
    // ctx.lineTo(300, 800);

    // ctx.moveTo(540, 680);
    // ctx.lineTo(0, 650);
    // ctx.lineTo(0, 620);
    // ctx.lineTo(540, 650);

    // ctx.moveTo(60, 560);
    // ctx.lineTo(600, 530);
    // ctx.lineTo(600, 500);
    // ctx.lineTo(60, 530);

    // ctx.moveTo(540, 440);
    // ctx.lineTo(0, 410);
    // ctx.lineTo(0, 380);
    // ctx.lineTo(540, 410);

    // ctx.moveTo(60, 320);
    // ctx.lineTo(600, 290);
    // ctx.lineTo(600, 260);
    // ctx.lineTo(60, 290);

    // ctx.moveTo(540, 200);
    // ctx.lineTo(350, 190);
    // ctx.lineTo(350, 160);
    // ctx.lineTo(540, 170);

    // ctx.fillRect(0, 160, 350, 30);
    // ctx.fillRect(250, 60, 100, 30);
    // ctx.fill();
    // ctx.stroke();
    // ctx.closePath();
}

function desenharViga(x1, y1, x2, y2, larguraViga) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let distancia = Math.sqrt(dx * dx + dy * dy);
    let angulo = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate(x1, y1);
    ctx.rotate(angulo);

    
    let tamanhoSprite = 30; 
    for (let i = 0; i < distancia; i += tamanhoSprite) {
        ctx.drawImage(
            imgViga, 
            i, 0, 
            tamanhoSprite + 3, larguraViga 
        );
    }

    ctx.restore();
}
function desenharEscada(x, y, largura, altura) {
    const tamanhoSpriteEscada = 32;
    
    ctx.save();

    for (let i = 0; i < altura; i+= tamanhoSpriteEscada) {
        ctx.drawImage(
            imgEscada,
            x, (y + i)-0.5,
            largura,
            tamanhoSpriteEscada
        );
    }
}
let mario = {
    x: 30,
    y: 720,
    altura: 40,
    largura: 25,
    velocidadeY: 0.5,
    desenha: function () {
        let imgAtual = sprites[marioRN];

        if (!imgAtual.complete) {
            ctx.fillStyle = "blue";
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
            return;
        }

        let Framestotais = imgAtual.width > 32 ? 5 : 1;
        let larguraFrame = imgAtual.width / Framestotais;

        if (Framestotais > 1) {
            tempoAnimação++;
            if (tempoAnimação >= velocidadeAnimação) {
                frameX = (frameX + 1) % Framestotais;
                tempoAnimação = 0
            }
        } else {
            frameX = 0;
        }

        let larguraVisual = 35 * 1.5; 
        let alturaVisual = 50 * 1.3;

        let offsetX = (larguraVisual - this.largura) / 1.8;
        let offsetY = (alturaVisual - this.altura)/2.9;

        ctx.drawImage(
            imgAtual,
            frameX * larguraFrame, 0,
            larguraFrame, imgAtual.height,
            this.x - offsetX, this.y - offsetY,
            35 * 1.5, 50 * 1.3
        );

        // ctx.strokeStyle = "rgba(255, 0, 0, 0.5)"; <------confirmar a hitbox------>
        // ctx.strokeRect(this.x, this.y, this.largura, this.altura); <------confirmar a hitbox------>
    }
}

let jogoAtivo = true;

gravidade = 0.8;

noChao = true

const sprites = {
    parado: new Image(),
    andandoDireita: new Image(),
    andandoEsquerda: new Image(),
    pulando: new Image(),
    pulandoEsquerda: new Image(),
    subindoEscada: new Image()
}
sprites.parado.src = "mario parado-1.png.png";
sprites.andandoDireita.src = "mariocorrendodireita.png";
sprites.andandoEsquerda.src = "mariocorrendoesquerda.png";
sprites.pulando.src = "mario pulando-1.png.png";
sprites.pulandoEsquerda.src = "mariopulandoesquerda-1.png.png";
sprites.subindoEscada.src = "mariosubindoescada.png";

let marioRN = "parado";

const teclas = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
};

const plataformas = [
    { x1: 0, y1: 770, x2: 300, y2: 770 },
    { x1: 300, y1: 770, x2: 600, y2: 740 },
    { x1: 0, y1: 620, x2: 540, y2: 650 },
    { x1: 60, y1: 530, x2: 600, y2: 500 },
    { x1: 0, y1: 380, x2: 540, y2: 410 },
    { x1: 60, y1: 290, x2: 600, y2: 260 },
    { x1: 350, y1: 160, x2: 540, y2: 170 },
    { x1: 0, y1: 160, x2: 350, y2: 160 },
    { x1: 250, y1: 60, x2: 350, y2: 60 }
];

const escadas = [
    { x: 480, y: 650, largura: 40, altura: 120 },
    { x: 80, y: 530, largura: 40, altura: 120 },
    { x: 480, y: 410, largura: 40, altura: 120 },
    { x: 80, y: 290, largura: 40, altura: 120 },
    { x: 480, y: 170, largura: 40, altura: 120 },
    { x: 250, y: 60, largura: 40, altura: 100 }
];

let barris = [];
let framescont = 0;

window.addEventListener("keydown", (evento) => {
    if (evento.key in teclas) {
        teclas[evento.key] = true;
    }
});

window.addEventListener("keyup", (evento) => {
    if (evento.key in teclas) {
        teclas[evento.key] = false;
    }
});

function calcularChao(entidade) {

    let chaoEncontrado = 2000;

    plataformas.forEach(plat => {
        

        if (entidade.x + entidade.largura > plat.x1 && entidade.x < plat.x2) {

            let yNaRampa = plat.y1 + (plat.y2 - plat.y1) * ((entidade.x - plat.x1) / (plat.x2 - plat.x1));

            if (entidade.y + entidade.altura <= yNaRampa + 20 &&
                entidade.y + entidade.altura >= yNaRampa - 20) {
                chaoEncontrado = yNaRampa;
            }
        }
    });

    return chaoEncontrado;
}

function gerarBarril() {

    let novoBarril = {
        x: 130,
        y: 130,
        largura: 35,
        altura: 35,
        velocidadeX: 3,
        velocidadeY: 0,
        direcao: 1
    };

    barris.push(novoBarril);
}

function detectaColisao(mario, barril) {
    return mario.x < barril.x + barril.largura &&
        mario.x + mario.largura > barril.x &&
        mario.y < barril.y + barril.altura &&
        mario.y + mario.altura > barril.y;
}

function animacao() {
    if (!jogoAtivo) return;

    marioRN = "parado"

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    framescont++;
    if (framescont >= 180) {
        gerarBarril();
        framescont = 0;
    }

    let chaoMario = calcularChao(mario);

    let tocandoEscada = false;
    escadas.forEach(esc => {
        if (mario.x + mario.largura > esc.x &&
            mario.x < esc.x + esc.largura &&
            mario.y + mario.altura > esc.y &&
            mario.y < esc.y + esc.altura) {
            tocandoEscada = true;
        }
    });

    if (tocandoEscada && (teclas.ArrowUp || teclas.ArrowDown)) {
        mario.naEscada = true;
        mario.velocidadeY = 0;
        marioRN = "subindoEscada";
    }
    if (mario.naEscada) {
        if (teclas.ArrowUp) { mario.y -= 2 };
        if (teclas.ArrowDown) { mario.y += 2 };
        if (!tocandoEscada) { mario.naEscada = false };
    } else {
        mario.velocidadeY += gravidade;
        mario.y += mario.velocidadeY;
    }

    if (mario.y + mario.altura >= chaoMario) {
        mario.y = chaoMario - mario.altura;
        mario.velocidadeY = 0;
        noChao = true;
    }
    if (teclas.ArrowLeft) {
        mario.x -= 2.5;
        marioRN = "andandoEsquerda";
    }
    if (teclas.ArrowRight) {
        mario.x += 2.5;
        marioRN = "andandoDireita";
    }
    if (teclas.ArrowUp && noChao) {
        mario.velocidadeY = -10;
        noChao = false
    }
    if (!noChao && !mario.naEscada) {
        if (teclas.ArrowLeft) {
            marioRN = "pulandoEsquerda";
        } else {
            marioRN = "pulando";
        }
    }
    if (mario.x >= 600 - mario.largura) {
        mario.x = 600 - mario.largura
    }
    if (mario.x <= 0) {
        mario.x = 0
    }

    desenhar();

    barris.forEach((barril, index) => {

        let chaoBarril = calcularChao(barril);

        barril.velocidadeY += gravidade;
        barril.y += barril.velocidadeY;
        barril.x += barril.velocidadeX * barril.direcao;

        if (barril.y + barril.altura >= chaoBarril) {

            if (barril.velocidadeY > 5) {
                barril.direcao *= -1;
            }
            barril.y = chaoBarril - barril.altura;
            barril.velocidadeY = 0;
        }

        ctx.fillStyle = "brown";
        ctx.beginPath();
        let centroX = barril.x + barril.largura / 2;
        let centroY = barril.y + barril.altura / 2;
        let raio = barril.largura / 2;

        ctx.arc(centroX, centroY, raio, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();


        if (barril.y > canvas.height) {
            barris.splice(index, 1);
        }

        if (detectaColisao(mario, barril)) {
            jogoAtivo = false;
        }

    });

    mario.desenha();

    if (!jogoAtivo) {
        ctx.beginPath();
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.closePath();

        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.font = "90px times new roman";
        ctx.textAlign = "center"
        ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        ctx.closePath();

        document.getElementById("reiniciar").innerHTML = "<button id='bot2' onClick='window.location.reload()'>tentar novamente</button>"

    }

    requestAnimationFrame(animacao);
}
animacao();


