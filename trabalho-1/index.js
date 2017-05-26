function mergeLang(l1, l2)
{
    l2.forEach(function(t, index){
        if(l1.indexOf(t) <= -1)
        {
            l1.push(t);
        }
    });

    return l1;
}

function consoleLog(msg)
{
    divConsole.innerHTML += msg + "<br/>";
}

function transition(currentState, currentChar, strip, states)
{
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
            return transition(states[currentState][currentChar], strip[1], strip.slice(1), states);
        }
    }
    else
    {
        return states[currentState]["final"];
    }
}

//afd para reconhecimento da notação {s*(,s)*} ?
var states =
{
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

var inputTexto = document.getElementById("input-texto");
var btnInserir = document.getElementById("btn-inserir");
var btnUnir = document.getElementById("btn-unir");
var btnVerificar = document.getElementById("btn-verificar");
var divListaLg = document.getElementById("lista-lg");
var divConsole = document.getElementById("console");
var btnPresufix  = document.getElementById("btn-presufix");
var inputTextoPalavra = document.getElementById("input-texto-palavra");

alpha = "abcdefghijklmnopqkrstuvxywz0123456789,}{ ";

l = []

function updateCheckbox()
{

    divListaLg.innerHTML = "";
    console.log(l);
    l.forEach(function(t, index)
    {
        divListaLg.innerHTML += "<input name='lg' type='checkbox' value='"+ index +"'/>" + t.toString() + "<br/>";
    });
}

//sufixos e prefixos
btnPresufix.addEventListener("click", function(){
    var prefix = "Prefixos:\n";
    var sufix = "Sufixos:\n";
    var subpalavra = "Subpalavras:\n";

    var text = inputTextoPalavra.value;

    for(var i = 0; i < text.length; i++){
        prefix += text.substring(0, i+1) + "\n";
        sufix += text.substring(text.length - i-1, text.length) + "\n";
    }

    //pega subpalavras
    for(var j = 1; j <= text.length; j++ ){

      for(var i = 0; i < text.length; i++){
        if(j+i > text.length)
          break;
        subpalavra += text.substring(i, i+j) + "\n";
      }
    }

    alert(prefix + sufix + subpalavra);
    console.log(prefix + sufix + subpalavra);
});

//verifica em quais liguagens esta
btnVerificar.addEventListener("click", function(){
    console.log(l);
    var text = inputTextoPalavra.value;
    var linguagens = "Linguagens:\n";
    var letraDentro = false;
    var palavraDentro = false;

    l.forEach(function(t, id){
        //compara palavra no alfabeto
        palavraDentro = true;

        for(var i = 0; i < text.length; i++){
            letraDentro = false;
                for(var h = 0; h < l[id].length; h++){
                    if(text[i] == l[id][h]){
                        letraDentro = true;
                        break;
                    }
                }
            if(!letraDentro){
                palavraDentro = false;
                break;
            }
        }

        if(palavraDentro){
            linguagens += l[id] + "\n";
        }
    });

    alert(linguagens);

});

String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

btnInserir.addEventListener("click", function()
{
    // console.log("_________");
    if ( transition(0, inputTexto.value[0], inputTexto.value, states) )
    {
        var alfabeto = inputTexto.value.replace("{", "").replace("}", "").replace(" ", "").split(",");

        var newAlfa = [];

        alfabeto.forEach(function (t, index)
        {
            if(newAlfa.indexOf(t) <= -1)
            {
              t.allReplace(" ", "");
              console.log(t.length);
              for(var k = 0; k < t.length; k++)
              {
                if(t[k] != " "){
                    newAlfa.push(t[k]);
                }
              }

            }
        });

        l.push(newAlfa);

        updateCheckbox();

    }
    else
    {
        console.log("nao reconhecido, erro de sintaxe");
        consoleLog("nao reconhecido, erro de sintaxe");
    }
});


/*
 junta dois alfabetos em um so e descarta os dois que foram unidos adicionando o total na lista
 incompleto
*/

btnUnir.addEventListener("click", function()
{
    var inputs = document.getElementsByName("lg");

    var merged = [];
    var remover = [];

    inputs.forEach(function(t, index)
    {
        if(t.checked)
        {
            //uni alfabeto ao alfabeto merged
            merged = mergeLang(merged, l[t.value]);
            //retira o alfabeto da lista global
            delete l[t.value];
        }

    });

    //
    if(merged.length > 0){
        l.push(merged);

        var nl = [];

        l.forEach(function(t, id){
            nl.push(t);
        });

        l = nl;
    }

    updateCheckbox();
});
