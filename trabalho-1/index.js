
function isFromLang(palavra, linguagem)
{

}

function updateLangList()
{
    
}

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
var divListaLg = document.getElementById("lista-lg");
var divConsole = document.getElementById("console");

alpha = "abcdefghijklmnopkrstuvxywz0123456789,}{ ";

l = []

function updateCheckbox()
{

    divListaLg.innerHTML = "";

    l.forEach(function(t, index)
    {            
        divListaLg.innerHTML += "<input name='lg' type='checkbox' value='"+ index +"'/>" + t.toString() + "<br/>";
    });
}

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
                newAlfa.push(t);
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

    inputs.forEach(function(t, index)
    {
        if(t.checked)
        {
            console.log("aaa");
            merged = mergeLang(merged, l[t.value]);
        }
        console.log(l[t.value]);
    });
    console.log(merged);
    l.push(merged);
});
