var timeStart = $("#time-to-type").text(); //puxa o conteudo de texto do cronometro

var typingField = $(".typing-field"); //puxa o campo de digitacao

var buttonRestart = $("#button-restart"); //puxa o botao de reinicio

$(function(){ //essa funcao eh para executarmos todas as funcoes quando a pagina abre
    updatePhraseSize();
    startChronometer();
    startCounter();
    verifyPhrase();
    updateMaxField();
    buttonRestart.click(restartGame);
    updateScore();
    $('#users').selectize({
        create: true,
        sortField: 'text'
    });
    $(".tooltip").tooltipster({
        trigger: "custom"
    });
});

function updatePhraseSize(){
    var phraseToType = $(".phrase-to-type").text(); //puxa o conteudo de texto da frase a ser digitada
    var numberWordsPhrase = phraseToType.split(/\s+/).length -1;
    //quebra a frase em espacos para contar as palavras
    // /\s+/ eh uma expressao regular que acha os espacos em branco (espaco, tab, enter, etc)
    var sentenceSize = $("#sentence-size"); //puxa o conteudo de texto do numero de palavras da frase

    sentenceSize.text(numberWordsPhrase); //insere o numero de palavras no span do contador
}

function startCounter() {
    typingField.on("input", function(){ //associa um evento de input ao campo de digitacao
        var content = typingField.val(); //puxa o conteudo digitado no campo de digitacao
        
        var numberWordsTyped = content.split(/\s+/).length -1; //quebra o que foi digitado pelos espacos
        $("#words-counter").text(numberWordsTyped); //insere a quantidade de palavras contadas no contador de palavras
        
        var numberCharactersTyped = content.length; //puxa o tamanho do conteudo digitado
        $("#characters-counter").text(numberCharactersTyped); //insere o tamanho do conteudo digitado no contador de caracteres
    });
}

function startChronometer() {
    var timeLeft = $("#time-to-type").text(); //puxa o tempo de digitacao

    typingField.one("focus", function(){
    //associa um evento de foco para detectar que o campo foi ativado
    //usando one ao inves de on, ele executa a funcao somente 1 vez
    
    buttonRestart.attr("disabled", false); //desabilita o botao de restart

    var chronometerID = setInterval(function(){ //insere a repeticao por intervalo de tempo e puxa o ID dela
    timeLeft--; //decrescendo o numero do cronometro de 1 em 1s
    $("#time-to-type").text(timeLeft); //insere o decrescimento de tempo na li de cronometro
    
    if(timeLeft < 1){
        clearInterval(chronometerID); //para o setInterval a partir do seu ID
        endGame();
    }
  }, 1000); //contagem de 1 em 1 segundo   
});
}

function endGame() {
    buttonRestart.attr("disabled", false); //habilita o botao de restart
    typingField.attr("disabled", true); //desabilita o campo de digitacao quando o tempo chega a 0
    typingField.addClass("disabled-field"); //adiciona uma classe para trocar o estilo do campo de digitacao quando o tempo acaba
    insertScore(); //chama a funcao que insere o placar
}

function restartGame() {
    typingField.attr("disabled", false); //habilita o campo de digitacao
    typingField.val(""); //limpa o campo de digitacao
    $("#time-to-type").text(timeStart); //reinicia o tempo inicial
    $("#characters-counter").text("0"); //zera o contador de caracteres
    $("#words-counter").text("0"); //zdera o contador de palavras
    startChronometer(); //reinicia o cronometro
    typingField.removeClass("disabled-field"); //remove o CSS de campo desabilitado
    //typingField.toggleClass("disabled-field"); //se tiver a classe ele tira e se nao tiver ele coloca
    typingField.removeClass("right-phrase"); //remove as classes de verificacao do jogo aqui
    typingField.removeClass("wrong-phrase"); // e aqui
}

function verifyPhrase() {
    //verifica se a frase digitada esta certa
    typingField.on("input", function(){ //quando o campo de digitacao esta em foco...
    
    var phraseToType = $(".phrase-to-type").text(); //puxa a frase do html
    var typed = typingField.val(); //puxa o valor digitado
    var matching = phraseToType.substr(0, typed.length); //puxa a frase a ser digitada, considerando o quanto foi digitado

    var match = (typed == matching); // verifica se o que foi digitado e a frase do jogo sao iguais

    typingField.toggleClass("right-phrase", match); //se ta certo, inclui uma borda verde
    typingField.toggleClass("wrong-phrase", !match); //se ta errado, inclui uma borda vermelha

    /*if (typed == matching){ //outra forma de verificar eh com o if
        typingField.addClass("right-phrase"); //se sao iguais adiciona a borda vermelha
        typingField.removeClass("wrong-phrase"); //remove a borda verde
    }else{
        typingField.addClass("wrong-phrase"); //caso nao
        typingField.removeClass("right-phrase"); //o contrario acontece
    }*/

    /*if( phraseToType.startsWith(typed)) { //caso o navegador tenha suporte para ECMA Script6 podemos fazer dessa forma
        typingField.addClass("right-phrase"); 
       } else {
        typingField.addClass("wrong-phrase");
       }*/
})
}

function updateInitialTime(time) {
    $("#time-to-type").text(time); //atualiza o tempo de digitacao a partir do parametro time
}