$("#button-score").click(showScore); //puxa o botao de mostrar placar
$("#button-sync").click(syncScore); //puxa o botao de sincronizacao

function insertScore() {
    var bodyTable = $(".score").find("tbody"); //puxa o corpo da tabela do html
    var user = $("#users").val(); //adiciona um usuario
    var nWords = $("#words-counter").text(); //puxa o numero de palavras

    var newScore = addScore(user, nWords); //cria uma nova linha no placar a partir dos parametros
    newScore.find(".button-remove").click(removeScore); //adiciona um evento de clique ao botao

    bodyTable.prepend(newScore); //adiciona o novo placar no inicio da tabela de placar

    $(".score").slideDown(500); //adiciona uma animacao no placar para deslizar em meio segundo
    scrollScore(); //chama a funcao para descer a pagina
}

function addScore(user, nWords) {
    var row = $("<tr>"); //cria uma nova linha
    var userCol = $("<td>").text(user); //cria a coluna de usuario
    var scoreCol = $("<td>").text(nWords); //cria a coluna de numero de palavras
    var removeCol = $("<td>"); //cria a coluna de botao remover
    
    var link = $("<a>").addClass("button-remove").attr("href", "#"); //cria o link para usarmos a funcao remover
    var icon = $("<i>").addClass("small").addClass("material-icons").text("delete"); //coloca um icone no botao remover

    link.append(icon); //coloca o icone dentro do link de remover
    removeCol.append(link); //coloca o link de remover dentro da coluna remover
    row.append(userCol); //coloca a coluna de usuario dentro do corpo da tabela
    row.append(scoreCol); //coloca a coluna de numero de palavras dentro do corpo da tabela
    row.append(removeCol); //coloca a coluna de remover dentro do corpo da tabela

    return row; //retorna a linha da tabela
}

function removeScore(event) {
   event.preventDefault(); //retira o comportamento padrao do click de jogar a janela pro inicio do site
   var score = $(this).parent().parent(); //puxa o avo do elemento selecionado
   score.fadeOut(1000); //adiciona um efeito de fadeout no elemento
   setTimeout(function(){ //remove o elemento depois que o fadeout eh executado
       score.remove();
   },1000); //aqui vai o mesmo tempo do fadeout
}

function showScore() {
    $(".score").stop().slideToggle(500); //escode ou mostra o score com efeito de slide
}

function scrollScore() { //nao ta funcionando kkkk
    var scorePosition = $(".score").offset().top; //era pra puxar o valor do top do placar

    $("body").animate( //era pra animar para descer a pagina ate o placar
        {
            scrollTop: scorePosition + "px" //precisa do px pra indicar que eh pixel
        }, 1000); //tempo de 1 segundo
}

function syncScore() {
    var score = []; //cria um array
    var rows = $("tbody>tr"); //puxa os tr que sao filhos diretos do tbody

    rows.each(function(){ //para cada linha do tbody
        var user = $(this).find("td:nth-child(1)").text(); //puxa o texto da primeira linha e chama de usuario...
        var words = $(this).find("td:nth-child(2)").text(); //puxa o texto da segunda linha e chama de palavras

        var userScore = { //criando um objeto
                usuario: user, //o usuario recebe o valor de user
                pontos: words //os pontos recebem o valor de words
        };

        score.push(userScore); //inserir o objeto dentro do array
    });

    var data = { //criando um objeto para usar como parametro
        placar: score //placar receb o valor de score
    };
    
    $.post("http://localhost:3000/placar", data, function(){ //envia o objeto para o servidor
        console.log("Score updated"); //e imprimi uma mensagem no servidor para mostrar que funcionou
        $(".tooltip").tooltipster("open");
    })
    .fail(function(){ //caso falhe...
        $(".tooltip").tooltipster("open").tooltipster("content", "Failed to sync"); //mostre uma mensagem de erro
    })
    .always(function(){ //sempre...
        setTimeout(function() { //durente um determinado tempo...
            $(".tooltip").tooltipster("close"); // feche a mensagem que foi exibida
        }, 1200);
    })
    
}

function updateScore() {
    $.get("http://localhost:3000/placar", function(data){ //puxa os dados da api
        $(data).each(function(){ //para cada linha da api
            var row = addScore(this.usuario, this.pontos); //cria uma tr com o usuario e nome
            row.find(".button-remove").click(removeScore); //adiciona um evento de clique ao botao
            $("tbody").append(row); //adiciona as linhas na tabela
        });
    })
}