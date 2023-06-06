

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
        } else if(['add','subtract','multiply','divide','modulo'].includes(e.target.id) && operatorFlag && expression.length != 0){ // to prevent be
            //if equals solve
            console.log(e.target.id)
            expression.push(e.target.textContent)

            operatorFlag = false
            console.log(operatorFlag)
            display()
        } else if(e.target.id == 'equal' && operatorFlag && expression.length != 0){
            console.log(e.target.id)
            //dont append
            expression.push(e.target.textContent)

            operatorFlag = false
            console.log(operatorFlag)
            
            let result = solve()
            //removing equals in the display array because it was included first to set as flag for the compact function - this is lesser code
            expression.pop() 
            //temporary to display only
            expression.push(`=${result}`)

            display()
            //!!!!!!
            //clear array
            //add only the latest result as initial valueS
            //put the old as history
        }
        
    }

    function solve(){
        let compactExpression = compact()
        if(compactExpression.length == 1) {
            return compactExpression[0]
        }
        let accumulator = 0

        //!!!!!!
        //set to handle pemdas

        //solves the expression left to right
        //every loop, the first 3 values from the array are evaluated separately from the rest
        //then removed from the array, and the accumulator is added
        for(let i = compactExpression.length; i > 1; i = i - 2){
            console.log(`${i} = ${compactExpression}`)
            let operand1 = +compactExpression[0]
            let operator = compactExpression[1] //consecutive
            let operand2 = +compactExpression[2] //2nd consective
            console.log(`operand 1 = ${operand1}, operator 2 = ${operator}, operand 3 = ${operand2}`)
            accumulator = operate(operand1, operand2, operator)
            compactExpression=compactExpression.slice(3)
            compactExpression.splice(0, 0, accumulator)
        }

        return accumulator
    }

    function compact(){
        //compacts the original array to a managaeable array
        let tempExpression = []
        let tempValue = ''
        //combines consecutive numbers till an operator is met
        expression.forEach((value) => {
                if(['+', '-', '*', '/', '%'].includes(value)){
                    // operator is included being push
                    tempExpression.push(tempValue)
                    tempValue = ''
                    tempExpression.push(value)
                } else if (value == '='){
                    // the = operator is not included being push
                    tempExpression.push(tempValue)
                    tempValue = ''
                } else {
                    // concatenates number
                    tempValue += value
                }
            }
        )
        console.log(`Compacted = ${tempExpression}`)
        return tempExpression
    }


    function toString(){
        return expression.join('')
    }

    function display(){
        //to dislay current values in the panel
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






