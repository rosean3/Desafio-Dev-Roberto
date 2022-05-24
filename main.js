// criando variáveis equivalentes ao personagem do html: à imagem (character) e ao contâiner da imagem
const character = document.getElementsByClassName("character")[0];
const containerCharacter = document.getElementsByClassName("container-character")[0];

// definindo a constante da velocidade (vulgo, quantos pixels a personagem se move a cada aperto de botão)
const VELOCITY = 10;

// definindo as constantes de tamanho da tela
const SCREEN_WIDTH = screen.width;
const SCREEN_HEIGHT = screen.height;


// definindo as posições x e y iniciais da personagem
let xPosition = 500;
let yPosition = 300;

// criando arrays para guardar as teclas desejadas e o nome das classes de estilização baseadas na direção
const keysAvaiable = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
const directions = ["turnUp", "turnLeft", "turnRight", "turnDown"];

/* rodando um event listener na tela inteira, que "escutará" eventos do tipo keydown
(de teclas clicadas)*/
window.addEventListener("keydown", (event) => {
    // recebendo a tecla que foi apertada
    const key  = event.key;
    
    /* se alguma das teclas desejadas foi pressionada, keyPressedAvailable será verdadeiro.
    Do contrário, será falso*/
    const keyPressedAvaiable =  keysAvaiable.some((currentKey) => {
        return currentKey === key;
    })

    /* se nenhuma das teclas desejadas foi pressionada (o que se descobre a partir do resultado da
        constante keyPressedAvaiable), retorna-se undefined e se dá um "break" na função do Event Listener,
        já que não vale a pena continuar, visto que não nenhuma ação vai ser realizada*/
    if(!keyPressedAvaiable) return;

    // remove todas as classes de estilização da personagem que são baseadas na direção
    directions.forEach((direction) => {
        if(character.classList.contains(direction)) character.classList.remove(direction);
    })

    /* modificação minha: defini novas screen width e height dessa vez usando as .innerWidth e .innerHeight ao invés de só
    .width e .height como é usado nas linhas (9 e 10) para que o limite da tela também fosse corretamente considerado
    ao se diminuir a janela e/ou ao se dar um zoom in ou zoom out
    
    Decidi colocar essa declaração e inicialização dentro do Event Listener, para que ela seja calculada a cada evento
    que aconteça na tela, não só quando se recarrega a página (o que faria com que o tamanho da tela considerado fosse
    o da tela maior, mesmo quando se diminui a janela)*/
    const screen_width = window.innerWidth;
    const screen_height = window.innerHeight;

    /*O que eu adicionei: se a posição y atual da personagem menos o próximo passo dela (a velocidade) for maior do que 0,
    que é o limite superior da tela, ela pode andar para cima. Esse cálculo não leva em conta o tamanho
    da própria personagem, porque a coordenada de posição y é colocada no topo da caixa que a contém (linha 105)*/

    /*O que já era feito: se a seta pressionada for a para cima, a personagem vai se mover negativamente pelo
    eixo y (já que a origem das coordenadas da tela está na extremidade superior esquerda) */
    if(key === "ArrowUp" && (yPosition-VELOCITY>0)){
        /* andar para cima significa mudar a estilização da personagem para "turnUp" (o que é feito ao se adicionar
        a classe "turnUp" já estilizada no CSS ao html da personagem) e subtrair da sua posição no eixo y*/
        character.classList.add("turnUp");
        yPosition -= VELOCITY;
    }

    /*O que eu adicionei: se a posição y atual da personagem somada ao próximo passo dela (a velocidade) e ao seu tamanho
    (100px) for menor do que a screen_height, que é o limite inferior da tela, ela pode andar para baixo. */
    
    /*O que já era feito: se a seta pressionada for a para baixo, a personagem vai se mover positivamente pelo
    eixo y (já que a origem das coordenadas da tela está na extremidade superior esquerda) */
    if(key === "ArrowDown" && (yPosition + VELOCITY +100)< screen_height){
        /* andar para baixo significa mudar a estilização da personagem para "turnDown" (o que é feito ao se adicionar
        a classe "turnDown" já estilizada no CSS ao html da personagem) e adicionar à sua posição no eixo y*/
        character.classList.add("turnDown");
        yPosition += VELOCITY;
    }

    /*O que eu adicionei: se a posição x atual da personagem menos o próximo passo dela (a velocidade) for maior do que 0,
    que é o limite esquerdo da tela, ela pode andar para a esquerda. Esse cálculo não leva em conta o tamanho
    da própria personagem, porque a coordenada de posição x é colocada na esquerda da caixa que a contém (linha 106)*/
    
    /*O que já era feito: se a seta pressionada for a para a esquerda, a personagem vai se mover negativamente pelo
    eixo x (já que a origem das coordenadas da tela está na extremidade superior esquerda) */
    if(key === "ArrowLeft" && xPosition-VELOCITY >0){
        /* andar para a esquerda significa mudar a estilização da personagem para "turnLeft" (o que é feito ao se
        adicionar a classe "turnLeft" já estilizada no CSS ao html da personagem) e subtrair da sua posição no eixo x*/
        character.classList.add("turnLeft");
        xPosition -= VELOCITY;
    }

    /*O que eu adicionei: se a posição x atual da personagem somada ao próximo passo dela (a velocidade) e ao seu tamanho
    (100px) for menor do que a screen_width, que é o limite direito da tela, ela pode andar para a direita. */
    
    /*O que já era feito: se a seta pressionada for a para a direita, a personagem vai se mover positivamente pelo
    eixo x (já que a origem das coordenadas da tela está na extremidade superior esquerda) */
    if(key === "ArrowRight" && (xPosition + VELOCITY +100)< screen_width){
        /* andar para a direita significa mudar a estilização da personagem para "turnRight" (o que é feito ao se adicionar
        a classe "turnRight" já estilizada no CSS ao html da personagem) e adicionar à sua posição no eixo x*/
        character.classList.add("turnRight");
        xPosition += VELOCITY;
    }

    /* definindo as coordenadas X e Y que a personagem terá nesse "frame". O ponto que recebe essas
    posições é o superior esquerdo da caixa que contém a personagem*/
    containerCharacter.style.top = `${yPosition}px`;
    containerCharacter.style.left = `${xPosition}px`
});