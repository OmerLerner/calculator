
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
    operatorChosen=true;
    savedNumber=handleOperation(savedNumber, screenNumber, operator);
    document.getElementById('output').value=savedNumber;
}
function handleOperation(num1,num2,operator)
{
    if (operator=='+')
        return +num1 + +num2;
    else if (operator=='-')
        return num1-num2;
    else if (operator=="*")
        return num1*num2;
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
        if (input=='all-clear')
            handleClear();
        if (input=='=')
            handleEqual();
    }
    else
    {
        if (operatorChosen==true)
        {
            
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
let buttons = calculator.querySelectorAll('button'),screenNumber=0,operator, savedNumber=0,operatorChosen=false, pointInNumber=false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        calculate(button.value);
    });
  });