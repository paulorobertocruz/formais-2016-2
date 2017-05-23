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



function transitionNotacao(currentState, currentChar, strip, states)
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
