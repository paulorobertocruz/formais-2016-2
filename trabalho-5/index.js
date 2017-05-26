

function criaAutomato(alfabeto, qtEstados, inicial, finais){

    finais = finais.split(",");
    console.log("finais:" + finais);
    var states = {}

    states["inicial"] = inicial;


    for(var i = 0; i < qtEstados; i++)
    {

        var alf = {};

        for(var sim = 0; sim < alfabeto.length; sim++)
        {
            alf[alfabeto[sim]] = i;
        }

        alf["final"] = false;

        states[i] = alf;
    }

    for(f in finais)
    {
        states[parseInt(finais[f])]["final"] = true;
        console.log(finais[f]);
    }
    return states;
}


alpha = "abcdefghijklmnopqkrstuvxywz0123456789,}{ ";

function transitionNotacao(currentState, currentChar, strip, states)
{
    // console.log("state:"+currentState);
    // console.log("Char:"+currentChar);
    if( typeof currentChar != "undefined")
    {
        if(alpha.indexOf(currentChar) <= -1 )
        {
            return false;
        }

        if(",{} ".indexOf(currentChar) <= -1)
        {
            currentChar = "S";
        }

        if(strip.length >= 1)
        {
            return transitionNotacao(states[currentState][currentChar], strip[1], strip.slice(1), states);
        }
    }
    else
    {
        return states[currentState]["final"];
    }
}


function getAlfabeto(entrada){

    var automatoNotacao =
    {
        "inicial":0,
        0:{
            " ": 0,
            "{": 1,
            "}": 4,
            ",": 4,
            "S": 4,
            "final": false,
        },
        1:{
            " ": 1,
            "{": 4,
            "}": 4,
            ",": 4,
            "S": 2,
            "final": false,
        },

        2:{
            " ": 2,
            "{": 4,
            "}": 3,
            ",": 1,
            "S": 4,
            "final": false,
        },
        3:{
            " ": 3,
            "{": 4,
            "}": 4,
            ",": 4,
            "S": 4,
            "final": true,
        },
        4:{
            " ": 4,
            "{": 4,
            "}": 4,
            ",": 4,
            "S": 4,
            "final": false,
        }

    }

    //se linguagem for reconhecida esta tudo certo é alfabeto valido
    if ( transitionNotacao(automatoNotacao["inicial"], entrada[0], entrada, automatoNotacao) )
    {
        var alfabeto = entrada.replace("{", "").replace("}", "").replace(" ", "").split(",");

        var newAlfa = [];

        alfabeto.forEach(function (t, index)
        {
            if(newAlfa.indexOf(t) <= -1)
            {
                newAlfa.push(t);
            }
        });

        return newAlfa;
    }
    else
    {
        console.log("notacao:nao reconhecido, erro de sintaxe");
        return false;
    }
}




var btnCarregar = document.getElementById("btn-carregar");
var btnCarregarAutomato = document.getElementById("btn-carregar-automato");
var btnExecutar = document.getElementById("btn-executar");

var inputAlfabeto = document.getElementById("input-alfabeto");
var inputQtEstado = document.getElementById("input-qtEstado");
var inputEstadoInicial = document.getElementById("input-estadoInicial");
var inputEstadosFinais = document.getElementById("input-estadosFinais");
var inputEntrada = document.getElementById("input-entrada");

var tableHeader = document.getElementById("tb_header");
var tableBody = document.getElementById("tb_body");

var estadosFinais;
var estadoInicial;
var alfabeto;
var qtEstado;
var automato;

//gera tabela html para adicionar os estados do automato
btnCarregar.addEventListener("click", function(){
    estadosFinais = inputEstadosFinais.value;
    estadoInicial = inputEstadoInicial.value;
    alfabeto = getAlfabeto(inputAlfabeto.value);
    qtEstado = parseInt(inputQtEstado.value);
    automato = criaAutomato(alfabeto, qtEstado, estadoInicial, estadosFinais);

    // console.log("tabela:" + qtEstado + "X" + alfabeto.length);
    // console.log(alfabeto);
    // console.log(automato);

    //update cabeçalho da tabela
    var str = "<th>#</th>";
    tableHeader.innerHTML = str;

    for(a in alfabeto){
        str = "<th>"+ alfabeto[a] +"</th>";
        tableHeader.innerHTML += str;
    }

    //atualiza inputs
    tableBody.innerHTML = "";
    for(var i =0; i< qtEstado; i++){
        str = "<tr>";


        if(automato["inicial"] == i)
        {
            //se inicial

            if(automato[i]["final"] == true)
            {
                str += "<td>*i->"+ i +"</td>";
            }else{
                str += "<td>i->"+ i +"</td>";
            }
        }
        else if(automato[i]["final"] == true)
        {
            // se final
            str += "<td>*"+ i +"</td>";
        }
        else
        {
            //outros
            str += "<td>"+ i +"</td>";
        }


        for(a in alfabeto){
            str += "<th><input class='max_length input_estados' name='"+ i +"_"+ alfabeto[a] +"'></th>";
        }
        str += "</tr>";
        tableBody.innerHTML += str;

    }

});


// var estadosFinais;
// var estadoInicial;
// var alfabeto;
// var qtEstado;
// var automato;

function updateAutomato(estado, simbolo, valor){
    automato[estado][simbolo] = valor;
}

//carregar
btnCarregarAutomato.addEventListener("click",function(){
    var inputs = document.getElementsByClassName("input_estados");
    var name;
    var info;
    for(var i = 0; i < inputs.length; i++){
        name = inputs[i].getAttribute("name");

        info = name.split("_");

        updateAutomato(info[0], info[1], parseInt(inputs[i].value) );

        // console.log(name);

    }

    console.log(automato);

});

btnExecutar.addEventListener("click", function(){

    var resultado = transition(automato["inicial"], inputEntrada.value[0], inputEntrada.value, automato);
    console.log(resultado);
    if(resultado){
        alert("reconhecida");
    }else {
        alert("não reconhecida");
    }

});


function transition(currentState, currentChar, strip, automato)
{
    // console.log("state:"+currentState);
    // console.log("Char:"+currentChar);

    if( typeof currentChar != "undefined")
    {
        //não faz parte do alfabeto
        if( alfabeto.indexOf(currentChar) == -1){
            console.log("not alfabeto");
            return false;
        }

        if(strip.length >= 1)
        {
            return transition(automato[currentState][currentChar], strip[1], strip.slice(1), automato);
        }
        else{
            return automato[currentState]["final"];
        }
    }
    else
    {
        return automato[currentState]["final"];
    }
}








//
