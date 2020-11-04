
function handleDecimal()
{
    if (pointInNumber==false)
        {
        pointInNumber=true;
        screenNumber+=".";
        document.getElementById('output').value=screenNumber;
        }   
}
function handleClear()
{
    screenNumber=0;
    operator="";
    savedNumber=0;
    operatorChosen=false;
    pointInNumber=false;
    document.getElementById('output').value=screenNumber;
}
function handleEqual()
{
    if (savedNumber!=0 && operator!="")
    {
        operatorChosen=true;
        equalsChosen=true; //If this is true, it means the last operator chosen was "equals"
        savedNumber=handleOperation(savedNumber, screenNumber, operator);
        document.getElementById('output').value=savedNumber;
    }
}
function handleOperation(num1,num2,operator)
{
    if (operator=='+')
        return +num1 + +num2;
    else if (operator=='-')
        return num1-num2;
    else if (operator=="*")
        return num1*num2;
    else if (operator=="/" && num2==0)
    {
        window.alert("Yeah, nah, don't divide by 0.");
        handleClear();
        return 0;
    }
    else
        return num1/num2;
        
}


function notAnOperator(input) //Return true if input is not a basic operator
{
    return (input!="+" && input!='-' && input!='*' && input!='/')
}
function notANumber(input)
{
    if (notAnOperator(input))
    {
        if (input=='.')
            handleDecimal();
        else if (input=='all-clear')
            handleClear();
        else if (input=='=')
            handleEqual();
    }
    else
    {
        if (operatorChosen==true)
        {
            if (equalsChosen=true)
            {
                operator=input;
                equalsChosen=false;
            }
        }
        else if (savedNumber==0)
        {
        operator=input;
        savedNumber=screenNumber;
        operatorChosen=true;
        }
        else
        {
            handleEqual();
            operator=input;
        }
    }
}
function calculate(input)
{
    if (isNaN(input))
    {
        notANumber(input);
    }
    else
    {
        if (operatorChosen==true)
        {
            operatorChosen=false;
            screenNumber=0;
        }
        if (screenNumber==0)
        {
            screenNumber=input;
            document.getElementById('output').value=screenNumber;
        }
        else
        {
            screenNumber+=input;
            document.getElementById('output').value=screenNumber;  
        }    
        
    }
}





let calculator = document.querySelector('.calculator');
let buttons = calculator.querySelectorAll('button'),screenNumber=0,operator, savedNumber=0,operatorChosen=false, pointInNumber=false, equalsChosen=false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        calculate(button.value);
    });
  });