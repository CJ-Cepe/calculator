

//self invoked function
(function(){
    
    mainContainer = document.querySelector('main')
    let expression = []
    let operatorFlag = true
    
    mainContainer.onclick = function (e){
        if(e.target.id === 'clear'){
            //clear 
            console.log(e.target.id)
            expression = []
            display()
        } else if(e.target.id === 'backspace'){
            //pop
            console.log(e.target.id)
            expression.pop()
            display()
        } else if(e.target.id === 'panel'){
            //do nothing nothing
        } else if(['zero','one','two','three','four','five','six','seven','eight','nine'].includes(e.target.id)){
            console.log(e.target.id)
            expression.push(e.target.textContent)
            
            operatorFlag = true
            console.log(operatorFlag)
            display()
        } else if(['add','subtract','multiply','divide','modulo','equal'].includes(e.target.id) && operatorFlag && expression.length != 0){ // to prevent be
            //if equals solve
            console.log(e.target.id)
            expression.push(e.target.textContent)

            operatorFlag = false
            console.log(operatorFlag)
            display()
        }
        d()
    }

    function d(){
        //put numbers in a s
        let tempExpression = []
        let tempValue = ''
        //loop through array
        expression.forEach((value) => {
            if(['+', '-', '*', '/', '%', '='].includes(value)){
                tempExpression.push(tempValue)
                tempValue = ''
                tempExpression.push(value)
            } else {
                tempValue += value
            }
            }
        )
        console.log(tempExpression)
            //if number - concatenate all
            //if encounter - operator - push number on new list as well the new operator    
    }


    function toString(){
        return expression.join('')
    }

    function display(){
        //concatenate them
        let tempExpression = toString()
        document.querySelector('#panel').textContent = tempExpression
    }

    function addition(firstAddend, secondAddend){
        return firstAddend + secondAddend
    }
    
    function subtraction(minued, subtrahend){
        return minued - subtrahend
    }
    
    function multiplication(multiplicand, multiplier){
        return multiplicand * multiplier
    }
    
    function division(dividend, divisor){
        return dividend / divisor
    }
    
    function modulo(dividend, divisor){
        return dividend % divisor
    }
    
    function operate(operand1, operand2, operator){
        switch(operator){
            case `+` :
                return addition(operand1, operand2)
            case `-` :
                return subtraction(operand1, operand2)
            case `*` :
                return multiplication(operand1, operand2)
            case `/` :
                return division(operand1, operand2)
            case `%` :
                return modulo(operand1, operand2)
            default :
                console.log('invalid operator')
        }
    }





})(); //self invoking function






