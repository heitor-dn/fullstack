let canvas = document.getElementById("donkey");
let ctx = canvas.getContext("2d");

ctx.imageSmoothingEnabled = false; //deixar a imagem com pixels mais definitos, mais pixelada

let cenaAtual = "DONKEY_KONG"
let frameX = 0; //vou usar muito essa variavel pois ela serve para eu identificar o frame nas animações, todas as spritesheets usadas nesse projeto funcionam como um rolo de filme, tendo apenas uma linha.
let tempoAnimação = 0; // essa variavel é um contador para a animação funcionar e resetar caso necessario
const velocidadeAnimação = 10;//essa variavel em especifico eu usei apenas para o personagem principal, porem eu posso mudar esse valor caso queira algo mais rapido ou devagar.

const imgEscada = new Image(); //todas as imagens desse projeto seguem esse padrão de geração
imgEscada.src = "escada.png";

const imgViga = new Image();
imgViga.src = "viga.png"

//função para fazer as plataformas do donkey kong e as escadas, no arquivo de texto (desenhos.txt), eu deixei as coordenadas que usei
//pois como eu inseri as pixel arts para ambas as plataformas e as escadas, no fim eu precisava apenas do hitbox mesmo.
function desenhar() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();

    escadas.forEach(esc => {
        desenharEscada(esc.x, esc.y, esc.largura, esc.altura)
    });

    plataformas.forEach(plat => {
        desenharViga(plat.x1, plat.y1, plat.x2, plat.y2, 32);
    });

}


//função para a hitbox das vigas/plataformas
function desenharViga(x1, y1, x2, y2, larguraViga) {
    let dx = x2 - x1;// posso chamar essas variaveis de deltaX e deltaY, equivalem aos catetos
    let dy = y2 - y1;
    let distancia = Math.sqrt(dx * dx + dy * dy);//teorema de pitagoras para encontrar a inclinação, que no caso equivale a hipotenusa
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

    for (let i = 0; i < altura; i += tamanhoSpriteEscada) {
        ctx.drawImage(
            imgEscada,
            x, (y + i) - 0.5,
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
    noChao: false,
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
        let offsetY = (alturaVisual - this.altura) / 2.9;

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

const imgDk = new Image();
imgDk.src = "donkeykongANIMADO.png";

let donkeykong = {
    x: 15,
    y: 25,
    largura: 160,
    altura: 160,
    frameX: 0,
    tempoAnimacao: 0,
    framesTotais: 12,
    frameDeSoltar: 9,
    desenha: function () {
        let larguraFrame = imgDk.width / this.framesTotais;

        this.tempoAnimacao++;
        if (this.tempoAnimacao >= 30) {

            this.frameX = (this.frameX + 1) % this.framesTotais;
            this.tempoAnimacao = 0;

            if (this.frameX === this.frameDeSoltar) {
                gerarBarril();
            }
        }

        ctx.drawImage(
            imgDk,
            this.frameX * larguraFrame, 0,
            larguraFrame, imgDk.height,
            this.x, this.y,
            this.largura, this.altura
        );
    }
}

let jogoAtivo = true;

gravidade = 0.8;

// noChao = true

const sprites = {
    parado: new Image(),
    andandoDireita: new Image(),
    andandoEsquerda: new Image(),
    pulando: new Image(),
    pulandoEsquerda: new Image(),
    subindoEscada: new Image(),
    atirandodireitaparado: new Image(),
    atirandodireitacorrendo: new Image()
}
sprites.parado.src = "mario parado-1.png.png";
sprites.andandoDireita.src = "mariocorrendodireita.png";
sprites.andandoEsquerda.src = "mariocorrendoesquerda.png";
sprites.pulando.src = "mario pulando-1.png.png";
sprites.pulandoEsquerda.src = "mariopulandoesquerda-1.png.png";
sprites.subindoEscada.src = "mariosubindoescada.png";
sprites.atirandodireitacorrendo.src = "mariocorrendodireitaatirando.png";
sprites.atirandodireitaparado.src = "mario parado atirando.png";

let marioRN = "parado";

const teclas = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowUp: false,
    ArrowDown: false,
    z: false,
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
const imgbarril = new Image()
imgbarril.src = "barril.png"
const framesBarrilTotais = 8;
const velocidadeAnimacaoBarril = 8;

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
        direcao: 1,
        frameX: 0,
        tempoAnimacao: 0
    };

    barris.push(novoBarril);
}

function faseDK() {
    marioRN = "parado"

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
        mario.noChao = true;
    }
    if (teclas.ArrowLeft) {
        mario.x -= 2.5;
        marioRN = "andandoEsquerda";
    }
    if (teclas.ArrowRight) {
        mario.x += 2.5;
        marioRN = "andandoDireita";
    }
    if (teclas.ArrowUp && mario.noChao) {
        mario.velocidadeY = -20;
        mario.noChao = false
    }
    if (!mario.noChao && !mario.naEscada) {
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

    donkeykong.desenha();

    // barris.forEach((barril, index) => {

    //     let chaoBarril = calcularChao(barril);

    //     barril.velocidadeY += gravidade;
    //     barril.y += barril.velocidadeY;
    //     barril.x += barril.velocidadeX * barril.direcao;

    //     if (barril.y + barril.altura >= chaoBarril) {

    //         if (barril.velocidadeY > 5) {
    //             barril.direcao *= -1;
    //         }
    //         barril.y = chaoBarril - barril.altura;
    //         barril.velocidadeY = 0;
    //     }

    //     barril.tempoAnimacao++;
    //     if (barril.tempoAnimacao >= velocidadeAnimacaoBarril) {
    //         barril.frameX = (barril.frameX + 1) % framesBarrilTotais;
    //         barril.tempoAnimacao = 0;
    //     }

    //     let larguraFrame = imgbarril.width / framesBarrilTotais;

    //     ctx.save();

    //     ctx.translate(barril.x + barril.largura / 2, barril.y + barril.altura / 2);

    //     ctx.scale(barril.direcao, 1);

    //     ctx.drawImage(
    //         imgbarril,
    //         barril.frameX * larguraFrame, 0,
    //         larguraFrame, imgbarril.height,
    //         -barril.largura / 2, -barril.altura / 2,
    //         barril.largura, barril.altura
    //     );
    //     ctx.restore();


    //     // <---checar a hitbox--->

    //     // ctx.strokeStyle = "lime"; 
    //     // ctx.lineWidth = 2;        
    //     // ctx.strokeRect(barril.x, barril.y, barril.largura, barril.altura);

    //     // <---checar a hitbox--->


    //     if (barril.y > canvas.height) {
    //         barris.splice(index, 1);
    //     }

    //     if (detectaColisao(mario, barril)) {
    //         jogoAtivo = false;
    //     }

    // });

    mario.desenha();
}

// <---variaveis do portal--->
const portal = { x: 300, y: 20, largura: 50, altura: 40 };
let portalAtivo = false;
const animarPortal = new Image();
animarPortal.src = "portalAtivo.png";
let frameTransicao = 0;
let contadorFrames = 0;
const totalFramesTransicao = 25;
const velocidadeTransicao = 5;
// <---variaveis do portal--->

// <---variaveis da cutscene-->
let frameCutscene = 0;
let contadorCutscene = 0;
const Cutscene = new Image();
Cutscene.src = "cutscene1.png";
const totalFramesCutscene = 40;
// <---variaveis da cutscene-->

function detectaColisao(mario, barril) {
    return mario.x < barril.x + barril.largura &&
        mario.x + mario.largura > barril.x &&
        mario.y < barril.y + barril.altura &&
        mario.y + mario.altura > barril.y;
}
// <---função para a cutscene--->
function animarcutscene() {
    let larguraFrame = Cutscene.width / totalFramesCutscene;
    let alturaUtil = 60;

    ctx.drawImage(
        Cutscene,
        frameCutscene * larguraFrame, 0,
        larguraFrame, alturaUtil,
        0, 0,
        canvas.width, canvas.height
    );

    contadorCutscene++;
    if (contadorCutscene >= 2) {  //<----------------------------------------------------VELOCIDADE DA CUTSCENE

        frameCutscene++;
        contadorCutscene = 0;
    }
    if (frameCutscene >= totalFramesCutscene) {
        cenaAtual = "BOSS_DB";
        mario.x = 0;
        mario.y = 150 - mario.altura;
        mario.velocidadeY = 0;
    }
}
// <---função para a cutscene--->

function animacao() {
    if (!jogoAtivo) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (cenaAtual === "DONKEY_KONG") {
        faseDK();
        if (mario.x < portal.x + portal.largura &&
            mario.x + mario.largura > portal.x &&
            mario.y < portal.y + portal.altura &&
            mario.y + mario.altura > portal.y) {

            cenaAtual = "TRANSICAO_PORTAL";
            frameTransicao = 0;
        }
    }
    else if (cenaAtual == "TRANSICAO_PORTAL") {
        desenhar();
        donkeykong.desenha();

        let larguraFrame = animarPortal.width / totalFramesTransicao;

        ctx.drawImage(
            animarPortal,
            frameTransicao * larguraFrame, 0,
            larguraFrame, animarPortal.height,
            portal.x, portal.y - 2,
            50, 60
        );

        contadorFrames++;
        if (contadorFrames >= velocidadeTransicao) {
            frameTransicao++;
            contadorFrames = 0;
        }

        if (frameTransicao >= totalFramesTransicao) {
            cenaAtual = "CUTSCENE";
            frameCutscene = 0;

            canvas.width = 1000;
            canvas.height = 600;

            ctx.imageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
        }

    }
    else if (cenaAtual == "CUTSCENE") {
        animarcutscene();
    }
    else if (cenaAtual == "BOSS_DB") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenharTabela();
        AvisoDeAtaque();

        logicaAtaqueBoss();
        atirarMario();
        gerenciarProjeteisMario();

        plinio.desenha();
        barravidaboss.desenha();
        mario.desenha();
        movimentomarioboss();
    }

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


