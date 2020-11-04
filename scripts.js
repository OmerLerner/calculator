
function handleDecimal()
{
    if (equalsChosen==false)
    {
        if (operatorChosen==true && decimalInNumber==false)
        {
            savedNumber=screenNumber;
            operatorChosen=false;
            screenNumber=0;
            decimalFirst=true;
            decimalInNumber=true;
        }
        else if (decimalInNumber==false)
        {
                decimalInNumber=true;
                if (screenNumber==0)
                {
                    decimalFirst=true;
                }
                screenNumber+=".";
                document.getElementById('output').value=screenNumber;
        }
    }  
}
function handleClear()
{
    allowBackspace=true;
    screenNumber=0;
    operator="";
    savedNumber=0;
    operatorChosen=false;
    decimalInNumber=false;
    decimalFirst=false;
    document.getElementById('output').value=screenNumber;
}
function handleEqual()
{
    if (savedNumber!=0 && operator!="")
    {
        operatorChosen=true;
        equalsChosen=true; //If this is true, it means the last operator chosen was "equals"
        allowBackspace=false;
        decimalInNumber=false;
        savedNumber=handleOperation(savedNumber, screenNumber, operator);
        document.getElementById('output').value=savedNumber;
    }
}
function handleBackspace()
{
    if (allowBackspace==true)
    {
        let numberString=screenNumber.toString();
        numberString=numberString.slice(0, -1);
        screenNumber=parseFloat(numberString);
        document.getElementById('output').value=screenNumber;
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
function handleContinuationOfOperators()
{
    if (savedNumber!=0 && operator!="")
    {
        operatorChosen=true;
        allowBackspace=false;
        decimalInNumber=false;
        savedNumber=handleOperation(savedNumber, screenNumber, operator);
        document.getElementById('output').value=savedNumber;
    }
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
        else if (input=='backspace')
            handleBackspace();
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
        decimalInNumber=false;
        }
        else
        {
            handleContinuationOfOperators();
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
        if (equalsChosen==true)
        {

        }
        else
        {
            allowBackspace=true;
            if (operatorChosen==true)
            {
                operatorChosen=false;
                decimalInNumber=false;
                screenNumber=0;
            }
            if (screenNumber==0)
            {
                if (decimalFirst==true)
                {
                    screenNumber=input/10;
                    decimalFirst=false;
                }
                else
                {
                    screenNumber=input;
                }
                document.getElementById('output').value=screenNumber;
            }
            else
            {
                screenNumber+=input;
                document.getElementById('output').value=screenNumber;  
            }   
        } 
    }
}





let calculator = document.querySelector('.calculator');
let buttons = calculator.querySelectorAll('button'),screenNumber=0,operator, savedNumber=0,operatorChosen=false, decimalInNumber=false, equalsChosen=false, allowBackspace=true, decimalFirst=false;
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        calculate(button.value);
    });
  });