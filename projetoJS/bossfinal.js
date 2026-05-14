// <-----imagem de vitoria----->
const imagemvitoria = new Image();
imagemvitoria.src = "mariovenceu.png";
let winwin = imagemvitoria;
// <-----imagem de vitoria----->

function iniciarBossFinal() {
    mario.x = 50;
    // mario.y = 600 - mario.altura;

    celulasAfetadas = [];
    projetilmario = [];
    supermario = [];
}
// <----preparando o chão e os movimentos---->
const chao = 640 - mario.altura;

function movimentomariobossfinal() {


    mario.velocidadeY += gravidade;
    mario.y += mario.velocidadeY;


    marioRN = "parado"
    if (mario.y + mario.altura >= chao) {
        mario.y = chao - mario.altura;
        mario.velocidadeY = 0;
        mario.noChao = true;
    } else {
        mario.noChao = false
    }
    if (teclas.ArrowLeft) {
        mario.x -= 3;
        marioRN = "andandoEsquerda";
    } else if (teclas.ArrowRight) {
        mario.x += 3;
        marioRN = "andandoDireita";
    }
    if (teclas.ArrowUp && mario.noChao) {
        mario.velocidadeY = -12;
        mario.noChao = false;
    }
    if (!mario.noChao) {
        marioRN = teclas.ArrowLeft ? "pulandoEsquerda" : "pulando";
    }
    if (mario.x >= 700 - mario.largura) mario.x = 700 - mario.largura;
    if (mario.x <= 0) mario.x = 0;
}

// <---variaveis para o boss--->
let vidabossfinal = 50;
let vareladerrotado = false;
const varela = {
    varelaparado: new Image(),
    ataquevarela: new Image(),
    prisaovarela: new Image(),
}
varela.varelaparado.src = "varelaparado1.png";
varela.ataquevarela.src = "ataquevarela1.png";
varela.prisaovarela.src = "prisaodovarela.png";

let varelaRN = "varelaparado"

const configAnimacoesfinal = {
    "varelaparado": { totalFrames: 1, velocidade: 10 },
    "ataquevarela": { totalFrames: 4, velocidade: 10 },
    "prisaovarela": { totalFrames: 13, velocidade: 17 },
};

let bossfin = {
    x: 0,
    y: 0,
    tempoAnimacaoBoss: 0,
    frameXBoss: 0,
    largura: 1000,
    altura: 600,
    totalFramesBoss: 1,
    desenha: function () {
        let img = varela[varelaRN];
        if (!img || !img.complete) return;


        let config = configAnimacoesfinal[varelaRN];
        let totalFrames = config.totalFrames;
        let velocidade = config.velocidade;


        let larguraFrame = img.width / totalFrames;



        this.tempoAnimacaoBoss++;

        if (this.tempoAnimacaoBoss >= velocidade) {

            if (this.frameXBoss < totalFrames - 1) {
                this.frameXBoss++;
            }

            else if (this.varelaRN === "prisaovarela") {

                this.animacaoFinalizada = true;
            }

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


const projetilspan = []
let framecontSpan = 0;

function gerenciarSpans() {
    framecontSpan++;

    if (framecontSpan % 100 === 0) {
        projetilspan.push({
            x: 530,
            y: 500,
            vx: -4,
            largura: 50,
            altura: 30
        });
        console.log("spangerado")
    }

    projetilspan.forEach((s, index) => {
        s.x += s.vx;


        ctx.fillStyle = "#8B0000";
        ctx.fillRect(s.x, s.y, s.largura, s.altura);
        ctx.font = "14px Arial"
        ctx.fillStyle = "white";
        ctx.fillText("<span>", s.x + 5, s.y + 20);


        if (mario.x < s.x + s.largura &&
            mario.x + mario.largura > s.x &&
            mario.y < s.y + s.altura &&
            mario.y + mario.altura > s.y) {
            jogoAtivo = false
            console.log("foi o span")
        }

        if (s.x + s.largura < 0) {
            projetilspan.splice(index, 1);
        }
    });
}

const projetilspan2 = []
let framecontSpan2 = 50;

function gerenciarSpans2() {
    framecontSpan2++;

    if (framecontSpan2 % 100 === 0) {
        projetilspan2.push({
            x: 530,
            y: 570,
            vx: -4,
            largura: 50,
            altura: 40
        });

    }

    projetilspan2.forEach((s, index) => {
        s.x += s.vx;

        ctx.fillStyle = "#1aa102";
        ctx.fillRect(s.x, s.y, s.largura, s.altura);
        ctx.font = "14px Arial"
        ctx.fillStyle = "white";
        ctx.fillText("<span>", s.x + 5, s.y + 20);

        if (mario.x < s.x + s.largura &&
            mario.x + mario.largura > s.x &&
            mario.y < s.y + s.altura &&
            mario.y + mario.altura > s.y) {
            jogoAtivo = false;
            console.log("foi o span");
        }

        if (s.x + s.largura < 0) projetilspan2.splice(index, 1);
    });
}

let colunasDiv = [];
let tempoAtaqueDiv = 200;

function gerenciarDivs() {
    tempoAtaqueDiv--;

    if (tempoAtaqueDiv <= 0) {
        const xAleatorio = Math.floor(Math.random() * 5) * 100;

        colunasDiv.push({
            x: xAleatorio,
            y: 100,
            largura: 125,
            altura: 100,
            velocidade: 8,
            timeralerta: 60,
            alerta: true
        });
        varelaRN = "ataquevarela"
        tempoAtaqueDiv = 120 + Math.random() * 120;
    }

    colunasDiv.forEach((d, index) => {


        d.y += d.velocidade;

        ctx.fillStyle = "black";
        ctx.fillRect(d.x, d.y, d.largura, d.altura);
        ctx.strokeStyle = "red";
        ctx.strokeRect(d.x, d.y, d.largura, d.altura);
        ctx.fillStyle = "red";
        ctx.font = "bold 20px Arial";
        ctx.fillText("<div>", d.x + 35, d.y + 60)

        if (mario.x < d.x + d.largura &&
            mario.x + mario.largura > d.x &&
            mario.y < d.y + d.altura &&
            mario.y + mario.altura > d.y) {
            jogoAtivo = false;
            console.log("foi a div");
        }




        if (d.y > canvas.height) colunasDiv.splice(index, 1);
    });
}
// <-----projeteis do personagem---->
const projetilflex = []

function atirarMariofinal() {

    if (teclas["z"] && cenaAtual == "BOSSFINAL") {

        if (!mario.podeAtirarnoboss && (vidabossfinal > 0)) {
            mario.podeAtirarnoboss = true;

            projetilflex.push({
                x: mario.x + mario.largura,
                y: mario.y + (mario.altura / 2),
                largura: 60,
                altura: 20,
                texto: "FLEX",
                cor: "#0b00d2"
            });


            setTimeout(() => { mario.podeAtirarnoboss = false; }, 500);
        }
    }
}

let framevarela = 0;
let contadorvarela = 0;

function varelaprisao() {
    varelaRN = "prisaovarela"
    contadorvarela++;
    if (contadorvarela >= 17) {  //<--------------------VELOCIDADE DA CUTSCENE

        framevarela++;
        contadorvarela = 0;
    }
    if (framevarela >= configAnimacoesfinal.prisaovarela.totalFrames) {
        cenaAtual = "ULTIMA";
    }
}

function gerenciartirosfinais() {
    projetilflex.forEach((proj, index) => {

        proj.x += velocidadeprojetil;

        ctx.fillStyle = proj.cor;
        ctx.font = "bold 20px monospace";
        ctx.fillText(proj.texto, proj.x, proj.y);

        if (proj.x < 950 &&
            proj.x + proj.largura > 680 &&
            proj.y < 600 &&
            proj.y + proj.altura > 100) {

            projetilflex.splice(index, 1);

            vidabossfinal -= 100

            console.log(vidabossfinal)
        }

        if (vidabossfinal <= 0 && !vareladerrotado) {
            vareladerrotado = true
            contadorFramesCUTSCENE = 0;

        }
    });
}
// <-----desenhar o mario paraado------>
function ultimomario() {
    contadorFramesCUTSCENE++
    if (contadorFrames < 60) {
        ctx.drawImage(
            sprites.parado,
            15, 270,
            40, 60
        )
    } else {
        cenaAtual = "ULTIMA";
    }
}

// <------cutscenes finais----->
let frameCutscenefinal = 0;
let contadorCutscenefinal = 0;
const Cutscenefinal = new Image();
Cutscenefinal.src = "cutscenefinal.png";
const totalFramesCutscenefinal = 24;

function desenharcutscene1() {
    let larguraFrame = Cutscenefinal.width / totalFramesCutscenefinal;


    ctx.drawImage(
        Cutscenefinal,
        frameCutscenefinal * larguraFrame, 0,
        larguraFrame, canvas.height,
        0, 0,
        canvas.width, canvas.height
    );

    contadorCutscenefinal++;
    if (contadorCutscenefinal >= 10) {  //<----------------------------------------------------VELOCIDADE DA CUTSCENE

        frameCutscenefinal++;
        contadorCutscenefinal = 0;
    }
    if (frameCutscenefinal >= totalFramesCutscenefinal) {
        cenaAtual = "CENAFINALMESMO";

    }

}

let framecenafinal = 0;
let contadorcenafinal = 0;
const cenafinal = new Image();
cenafinal.src = "cenafinalmesmo.png";
const totalFramescenafinal = 9;
let opacidade = 0;

function desenharcenafinal() {
    let larguraFrame = cenafinal.width / totalFramescenafinal;


    ctx.drawImage(
        cenafinal,
        framecenafinal * larguraFrame, 0,
        larguraFrame, cenafinal.height,
        0, 0,
        canvas.width, canvas.height
    );

    if (framecenafinal < totalFramescenafinal - 1) {
        contadorcenafinal++;
        if (contadorcenafinal >= 5) {
            framecenafinal++;
            contadorcenafinal = 0;
        }
    } else {

        contadorcenafinal++;

        if (contadorcenafinal > 20) {
            if (opacidade < 1) {
                opacidade += 0.01;
            }
            ctx.globalAlpha = Math.min(1, opacidade);
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.globalAlpha = 1.0;
        }
    }

    if (opacidade >= 1) {
        cenaAtual = "WINNER";
        contadorFrames = 0
    }

}

// <----------desenhar tela de vencedor--------->


function winner() {

    ctx.fillStyle = "yellow";
    ctx.font = "bold 40px 'Courier New', monospace";
    ctx.textAlign = "center";


    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillText("VOCÊ VENCEU!!", 503, 203); 

    ctx.fillStyle = "white"; 
    ctx.fillText("VOCÊ VENCEU!!", 500, 200);

    ctx.drawImage(
        winwin, 450, 250, 100, 100
    )

}



