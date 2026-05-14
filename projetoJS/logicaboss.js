const professorbd = {
    bdparado: new Image(),
    select: new Image(),
    drop: new Image(),
    insert: new Image(),
    derrotabd: new Image()
}
professorbd.bdparado.src = "bd.parado.png";
professorbd.select.src = "select.png";
professorbd.drop.src = "drop.png";
professorbd.insert.src = "insert.png";
professorbd.derrotabd.src = "derrotaplinio.png"

let professorRN = "bdparado";

const configAnimacoes = {
    "bdparado": { totalFrames: 4, velocidade: 10 },
    "select": { totalFrames: 17, velocidade: 10 },
    "insert": { totalFrames: 20, velocidade: 10 },
    "drop": { totalFrames: 16, velocidade: 10 },
    "derrotabd": { totalFrames: 11, velocidade: 7 }
};

let plinio = {
    x: 0,
    y: 0,
    tempoAnimacaoBoss: 0,
    frameXBoss: 0,
    largura: 1000,
    altura: 600,
    totalFramesBoss: 4,
    desenha: function () {
        let img = professorbd[professorRN];
        if (!img || !img.complete) return;


        let config = configAnimacoes[professorRN];
        let totalFrames = config.totalFrames;
        let velocidade = config.velocidade;


        let larguraFrame = img.width / totalFrames;



        this.tempoAnimacaoBoss++;
        if (this.tempoAnimacaoBoss >= velocidade) {
            this.frameXBoss = (this.frameXBoss + 1) % totalFrames;
            this.tempoAnimacaoBoss = 0;
        }


        ctx.drawImage(
            img,
            (this.frameXBoss * larguraFrame), 0,
            larguraFrame, img.height,
            this.x, this.y,
            this.largura, this.altura
        );
    }

}


const tabelaConfig = {
    linhas: 6,
    colunas: 4,
    larguraCelular: 150,
    alturaLinha: 60,
    passoy: 60,
};

function desenharTabela() {
    const nomesColunas = ["RA", "NOME", "NOTA", "MATRICULA", "CURSO"];
    ctx.fillStyle = "#2f2e2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#8B0000";
    ctx.fillRect(0, 90, 601, 60);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#8B0000";
    ctx.font = "16px monospace";
    ctx.textAlign = "center";


    for (let i = 0; i < tabelaConfig.colunas; i++) {
        ctx.fillStyle = "white";
        ctx.fillText(nomesColunas[i], (i * 150) + (150 / 2), 120);

        for (let j = 0; j < tabelaConfig.linhas; j++) {

            let x = i * 150;
            let y = 150 + (j * 60);


            ctx.strokeRect(x, y, 150, 60);
        }
    }
}

function verificarTabela(mario, tabelaConfig) {
    if (cenaAtual !== "BOSS_DB") return;


    if (mario.y > 600) {
        mario.y = 150;
        mario.velocidadeY = 0;
    }

    mario.noChao = false;

    for (let i = 0; i < tabelaConfig.colunas; i++) {
        for (let j = 0; j < tabelaConfig.linhas; j++) {
            let platX = i * 150;
            let platY = 150 + (j * 60) + 60;
            let platW = 150;

            let peDoMario = mario.y + mario.altura;

            if (mario.velocidadeY >= 0 &&
                mario.x + mario.largura > platX &&
                mario.x < platX + platW &&
                peDoMario <= platY + 15 &&
                peDoMario + mario.velocidadeY >= platY) {

                if (!teclas.ArrowDown) {
                    mario.y = platY - mario.altura;
                    mario.velocidadeY = 0;
                    mario.noChao = true;
                    return;
                }
            }
        }
    }
}

function movimentomarioboss() {

    mario.velocidadeY += gravidade;
    mario.y += mario.velocidadeY;

    verificarTabela(mario, tabelaConfig);

    marioRN = "parado"

    if (teclas.ArrowLeft) {
        mario.x -= 3;
        marioRN = "andandoEsquerda";
    } else if (teclas.ArrowRight) {
        mario.x += 3;
        marioRN = "andandoDireita";
    }
    if (teclas.ArrowUp && mario.noChao) {
        mario.velocidadeY = -10;
        mario.noChao = false;
    }
    if (!mario.noChao) {
        marioRN = teclas.ArrowLeft ? "pulandoEsquerda" : "pulando";
    }
    if (mario.x >= 600 - mario.largura) mario.x = 600 - mario.largura;
    if (mario.x <= 0) mario.x = 0;
}

// <------logica dos ataques------>

let projetilmario = [];
const velocidadeprojetil = 7;
let vidaboss = 125;
let supermario = [];
let barravidaboss = {
    x: 800,
    y: 480,
    largura: 125,
    altura: 25,
    desenha: function () {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}
let derrotado = false

function atirarMario() {

    if (teclas["z"] && cenaAtual == "BOSS_DB") {

        if (!mario.podeAtirar && (vidaboss > 50 || vidaboss < 50)) {
            mario.podeAtirar = true;

            projetilmario.push({
                x: mario.x + mario.largura,
                y: mario.y + (mario.altura / 2),
                largura: 60,
                altura: 20,
                texto: "INSERT",
                cor: "#00FF00"
            });


            setTimeout(() => { mario.podeAtirar = false; }, 500);
        }
    }
    if (teclas["z"] && vidaboss == 50 && mario.podeAtirar && cenaAtual == "BOSS_DB") {

        supermario.push({
            x: mario.x + mario.largura,
            y: mario.y + (mario.altura / 2),
            largura: 240,
            altura: 80,
            texto: "DELETE",
            cor: "#00eeff"
        });
        vidaboss -= 25
        setTimeout(() => { mario.podeAtirar = false; }, 500);
    }
}

function gerenciarProjeteisMario() {
    supermario.forEach((sup, index) => {

        sup.x += velocidadeprojetil;

        ctx.fillStyle = sup.cor;
        ctx.font = "bold 50px monospace";
        ctx.fillText(sup.texto, sup.x, sup.y);

        if (sup.x < 950 &&
            sup.x + sup.largura > 780 &&
            sup.y < 600 &&
            sup.y + sup.altura > 100) {

            supermario.splice(index, 1);

            vidaboss -= 25
            barravidaboss.largura -= 25
            console.log(vidaboss)
        }



        if (sup.x > 1000) {
            supermario.splice(index, 1);
        }
    });
    projetilmario.forEach((proj, index) => {

        proj.x += velocidadeprojetil;

        ctx.fillStyle = proj.cor;
        ctx.font = "bold 18px monospace";
        ctx.fillText(proj.texto, proj.x, proj.y);

        if (proj.x < 950 &&
            proj.x + proj.largura > 780 &&
            proj.y < 600 &&
            proj.y + proj.altura > 100) {

            projetilmario.splice(index, 1);

            vidaboss -= 100 //<-----------------------------------------------------DANO
            barravidaboss.largura -= 1
            console.log(vidaboss)
            if (vidaboss <= 0) {
                professorRN = "derrotabd"
                derrotado = true
                frameTransicao = 0;
                contadorFrames = 0;
                cenaAtual = "TRANSICAO_PORTAL2"
            }
        }


        if (proj.x > 1000) {
            projetilmario.splice(index, 1);
        }
    });

}

let bossAtaqueAtual = null;
let bossTimer = 0;
let celulasAfetadas = [];

function logicaAtaqueBoss() {
    if (derrotado) { return }

    bossTimer++;

    if (bossTimer >= 200) {
        bossTimer = 0;
        let sorteio = Math.random();

        if (sorteio < 0.33) {
            bossAtaqueAtual = "DROP";
            professorRN = "drop";

            celulasAfetadas = [Math.floor(Math.random() * 4)];
        }
        else if (sorteio < 0.66) {
            bossAtaqueAtual = "SELECT";
            professorRN = "select";

            let colunaSegura = Math.floor(Math.random() * 4);
            celulasAfetadas = [0, 1, 2, 3].filter(c => c !== colunaSegura);
        }
        else {
            bossAtaqueAtual = "INSERT";
            professorRN = "insert";

            celulasAfetadas = [];
            let quantidadeDeCelulas = 6;

            for (let i = 0; i < quantidadeDeCelulas; i++) {

                let novaCelula = [
                    Math.floor(Math.random() * 4),
                    Math.floor(Math.random() * 6)
                ];


                celulasAfetadas.push(novaCelula);
            }
        }
    }
    executarDanoBoss();
}

const TEMPO_AVISO = 90;



function AvisoDeAtaque() {
    ctx.save();

    if (bossTimer > TEMPO_AVISO - 30) {
        ctx.globalAlpha = 1;
    } else {
        ctx.globalAlpha = 0.5;
    }

    if (bossAtaqueAtual === "SELECT") {
        ctx.fillStyle = "darkred";
        celulasAfetadas.forEach(col => {

            ctx.fillRect(col * 150, 150, 150, 360);
        });
    }
    else if (bossAtaqueAtual === "INSERT") {
        ctx.fillStyle = "rgba(139, 0, 0, 0.6)";

        celulasAfetadas.forEach(celula => {
            let [col, lin] = celula;
            ctx.fillRect(col * 150, 150 + (lin * 60), 150, 60);
        });
    }
    else if (bossAtaqueAtual === "DROP") {
        ctx.fillStyle = "black";
        ctx.fillRect(celulasAfetadas[0] * 150, 150, 150, 360);
    }

    ctx.restore();
}

function executarDanoBoss() {
    if (!bossAtaqueAtual || bossTimer < TEMPO_AVISO) return;

    let colMario = Math.floor(mario.x / 150);
    let linMario = Math.floor((mario.y - 150) / 60);

    if (bossAtaqueAtual === "SELECT") {
        if (celulasAfetadas.includes(colMario)) {
            jogoAtivo = false;
        }
    }
    else if (bossAtaqueAtual === "INSERT") {
        let colisao = celulasAfetadas.some(celula => {
            let [colAlvo, linAlvo] = celula;
            return colMario === colAlvo && linMario === linAlvo;
        });
        if (colisao) {
            jogoAtivo = false;
        }
    }
    else if (bossAtaqueAtual === "DROP") {
        if (colMario === celulasAfetadas[0] && mario.noChao) {
            jogoAtivo = false;
        }
    }
}
// <----- portal para ultima fase ----->
function animarPortal2() {
    let larguraFrame = animarPortal.width / totalFramesTransicao;

    ctx.drawImage(
        animarPortal,
        frameTransicao * larguraFrame, 0,
        larguraFrame, animarPortal.height,
        mario.x, mario.y,
        50, 60
    );

    contadorFrames++;
    if (contadorFrames >= velocidadeTransicao) {
        frameTransicao++;
        contadorFrames = 0;
    }

    if (frameTransicao >= totalFramesTransicao) {
        cenaAtual = "BOSSFINAL";
        frameCutscene = 0;

        canvas.width = 1000;
        canvas.height = 600;

        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
    }
}


