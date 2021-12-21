//ARRAY QUE CONTEM A ORDEM DAS CORES DO GAME
let order = [];
//ARRAY QUE CONTEM A ORDEM DOS NOSSOS CLIQUES
let clickedOrder = [];
//VARIÁVEL QUE ARMAZENA OS PONTOS
let score = 0;

//A LÓGICA POR TRAZ É BASEADA EM NÚMEROS QUE
//CORRESPONDEM A CADA COR
//0 - GREEN        1 - RED
//2 - YELLOW       3 - BLUE

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//FUNÇÃO RESPONSÁVEL POR GERAR A ORDEM DAS CORES
//ORDEM SERÁ FEITA DE FORMA RANDÔMICA DE 0 A 3
let shuffleOrder = () => {
    //SORTEIA UM NÚMERO DE 0 A 3
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    //ACENDE A COR QUE CORRESPONDE AO NÚMERO SORTEADO
    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//FUNÇÃO QUE ACENDERÁ A COR SORTEADA
let lightColor = (element, number) => {
    number = number * 500;
    //EXECUTA O CÓDIGO DENTRO DO TEMPO DETERMINADO
    //OU SEJA, "ACENDE A COR"
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    //REMOVE A CLASSE DENTRO DO MESMO TEMPO
    //OU SEJA, "APAGA A COR"
    setTimeout(() => {
        element.classList.remove('selected');
    }, number + 250);
}

//COMPARA A ORDEM SELECIONADA COM A ORDEM GERADA
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            //ERROU A ORDEM E PERDEU
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação atual: ${score}\nVocê acertou! Vamos a próxima rodada!`);
        nextLevel();
    }
}

//FUNÇÃO DE CLIQUE DO PLAYER
//IRÁ PEGAR A COR CLICADA PELO JOGADOR E COMPARAR
//SE A MESMA É IGUAL A COR QUE FOI GERADA NO JOGO
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

//FUNÇÃO RESPONSÁVEL POR RETORNAR A COR DE ACORDO
//COM O NÚMERO
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//FUNÇÃO QUE AUMENTA OS PONTOS QUANDO PASSA PARA
//PRÓXIMA FASE E GERA NOVA ORDEM
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//QUANDO O PLAYER PERDER O JOGO SERÁ FINALIZADO
//E REINICIARÁ O JOGO
let gameOver = () => {
    score--; //POIS É CONTABILIZADO 1 PONTO QUANDO COMEÇA, MESMO SEM JOGAR
    alert(`Você perdeu!!\nSua Pontuação Final: ${score}!\nClique em OK para novo jogo`);
    
    order = [];
    clickedOrder = [];

    playGame();
}

//FUNÇÃO QUE INICIA O JOGO
let playGame = () => {
    alert('Bem vindo(a) ao Gênesis! Está pronto para jogar?\nClique em OK para começar!');
    score = 0;

    nextLevel();
}

//EVENTOS DE CLIQUES PARA AS CORES
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);


//INICIA O JOGO
playGame();