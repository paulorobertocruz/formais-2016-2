

function criaAutomato(alfabeto, qtEstados, inicial){

  var states = {}

  states["inicial"] = inicial;

  var alf = {};

  for(var sim = 0; sim < alfabeto.length; sim++)
  {
    alf[alfabeto[sim]] = i;
  }

  alf["final"] = false;

  for(var i = 0; i < qtEstados; i++)
  {
    states[i] = alf;
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
      console.log("nao reconhecido, erro de sintaxe");
      return false;
  }
}




var btnCarregar = document.getElementById("btn-carregar");

var inputAlfabeto = document.getElementById("input-alfabeto");
var inputQtEstado = document.getElementById("input-qtEstado");
var inputEstadoInicial = document.getElementById("input-estadoInicial");
var inputEntrada = document.getElementById("input-entrada");

var tableHeader = document.getElementById("tb_header");
var tableBody = document.getElementById("tb_body");

//gera tabela html para adicionar os estados do automato
btnCarregar.addEventListener("click", function(){

  var alfabeto = getAlfabeto(inputAlfabeto.value);
  var qtEstado = parseInt(inputQtEstado.value);

  console.log("tabela:" + qtEstado + "X" + alfabeto.length);
  console.log(alfabeto);

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
    str += "<td>"+ i +"</td>";
    for(a in alfabeto){
      str += "<th><input class='max_length' name='"+ i +"_"+ alfabeto[a] +"'></th>";
    }
    str += "</tr>";
    tableBody.innerHTML += str;

  }

});
















//
