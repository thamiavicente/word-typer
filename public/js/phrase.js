$("#button-change").click (randomPhrase); //selecionando o botao de mudar a frase para executar uma funcao
$("#button-choose").click (searchPhrase); //selecionando o botao de escolher a frase para executar uma funcao

function randomPhrase() {
    $("#spinner").show(); //mostra a barra de carregamento
    $(".phrase-to-type").hide(); //esconde a frase a ser digitada

    $.get("http://localhost:3000/phrases", changePhrase) //puxa os dados da api no servidor e executa uma funcao
    .fail(function(){ //caso falhe...
        $("#error").show(); //mostra a mensagem de erro
        setTimeout(function(){ 
            $("#error").hide(); //e esconde a mensagem de erro...
        },2500); //2,5 segundos depois
    })
    .always(function(){ //depois sempre...
        $("#spinner").hide(); //esconda a barra de carregamento
        $(".phrase-to-type").show(); //e mostre a frase a ser digitada
    });
}

function changePhrase(data) {
    var phraseToType = $(".phrase-to-type"); //puxa a frase a ser digitada
    var randomNumber = Math.floor(Math.random() * data.length); //cria um numero aleatorio onde o maximo eh o tamanho dos dados
    phraseToType.text(data[randomNumber].textPhrase); //puxa o texto da frase a ser digitada e troca pelo texto da frase com id aleatorio

    updatePhraseSize(); //atualiza o tamanho da frase no jogo
    updateInitialTime(data[randomNumber].time); //atualiza o tempo de digitacao no jogo
}

function updateMaxField(data) {
    //essa funcao serve para que o maximo na caixa de selecao do id da frase (pelas setas) seja o tamanho do array de frases
    $.get("http://localhost:3000/phrases", function(data){ //puxa o conteudo da api
        var field = $("#phrase-id-field"); //puxa o campo de selecao
        field.attr("max", data.length-1); //insere como atributo max o tamanho do array -1 ja que a contagem comeca em 0
    });
}

function searchPhrase() {
    $("#spinner").show(); //mostra a barra de carregamento
    $(".phrase-to-type").hide(); //esconde a frase a ser digitada

    var idPhrase = $("#phrase-id-field").val(); //puxa o conteudo do campo de selecao da frase
    var data = {id: idPhrase}; //cria um parametro a ser encontrado na api

    $.get("http://localhost:3000/phrases", data, changePhraseChosen) //puxa o conteudo da api envia um parametro e executa uma funcao
    .fail(function(){ //caso falhe...
        $("#error").show(); //mostra a mensagem de erro
        setTimeout(function(){
            $("#error").hide(); //esconde a mensagem de erro...
        },2500); //depois de 2,5 segundos
    })
    .always(function(){ // depois sempre...
        $("#spinner").hide(); //esconda a barra de carregamento
        $(".phrase-to-type").show(); //e mostre a frase a ser executada
    });
}

function changePhraseChosen(data) {
    var phraseToType = $(".phrase-to-type"); //puxa a frase a ser digitada
    phraseToType.text(data.textPhrase); //puxa o conteudo de texto da frase a ser digitada e troca pelo da frase escolhida

    updatePhraseSize(); //atualiza o tamanho da frase no jogo
    updateInitialTime(data.time); //atualiza o tempo de digitacao no jogo com o tempo da api
}