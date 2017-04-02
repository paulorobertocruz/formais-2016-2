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


function console_log(msg)
{
    divConsole.innerHTML += msg + "<br/>";
}

function transition(currentState, currentChar, strip, states)
{        
    // console.log("strip:",strip);
    // console.log("currentChar:",currentChar);

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

btnInserir.addEventListener("click", function()
{
    console.log("_________");    
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

        
        divListaLg.innerHTML = "";
        l.forEach(function(t, index)
        {            
            divListaLg.innerHTML += "<input name='lg' type='checkbox' value='"+ index +"'/>" + t.toString() + "<br/>";
        });
    }
    else
    {
        console.log("nao reconhecido, erro de sintaxe");
        console_log("nao reconhecido, erro de sintaxe");
    }
});

btnUnir.addEventListener("click", function()
{
    var inputs = document.getElementsByName("lg");

    inputs.forEach(function(t, index)
    {
        if(t.checked)
        {
            console.log("aaa");
        }
        console.log(l[t.value]);
    });
});

