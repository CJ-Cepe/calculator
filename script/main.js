
//self invoked function
(function(){
    
    mainContainer = document.querySelector('main')
    let expression = []     // hold the current expression per individual char
    let history = []    // hold the history of equations
    let operatorFlag = true
    let result
    
    mainContainer.onclick = function(e){
        if(e.target.id === 'clear'){
            result = null
            expression = []
            history = []
            display()
            updateHistory()
        } else if(e.target.id === 'backspace'){
            if(result){
                updateHistory()
                result = null
            }
            
            //pop
            expression.pop()

            if(!isNaN(+expression[expression.length - 1])){
                operatorFlag =  true
            } else {
                operatorFlag = false
            }

            display()
        } else if(e.target.id === 'panel'){
            //do nothing nothing
        } else if(['zero','one','two','three','four','five','six','seven','eight','nine'].includes(e.target.id)){
            //behaviour - so that when there is result, and a number is type instead of an operator - reset stuff
            if(result){
                result = null
                expression = []
                updateHistory()
            }

            expression.push(e.target.textContent)
            operatorFlag = true
            display()
        } else if(['add','subtract','multiply','divide','modulo'].includes(e.target.id) && operatorFlag && expression.length != 0){ // to prevent be
            if(result){
                updateHistory()
                result = null
            }

            //if equals solve
            expression.push(e.target.textContent)
            operatorFlag = false
            display()
        } else if(e.target.id == 'equal' && operatorFlag && expression.length != 0){

            if(result){
                updateHistory()
                result = null
            }

            expression.push(e.target.textContent) //push the = sign
            operatorFlag = true //to allow operators be applied to operands
            result = solve()    //solve the current content of the expression
            expression.push(result) //temporary to display only
            history.push(display())

            expression = []
            console.log(typeof result)
            let tempResult = Array.from(String(result))
            //expression.push(result)
            for(let i = 0; i<tempResult.length; i++){
                expression.push(tempResult[i])
                console.log(tempResult[i])
            }
        } else if(e.target.id == 'point'){
            let pointFlag = false
            //checks if there is already a point in the operand it belongs
            for(let i = expression.length -1; i >= 0; i--){
                if(expression[i]=='.'){
                    pointFlag = true
                } else if(['+', '-', '*', '/', '%'].includes(expression[i])){
                    break
                }
            }

            if(!pointFlag){
                if(isNaN(+expression[expression.length - 1])){
                    console.log('.')
                    expression.push('0')
                    expression.push('.')
                } else if(!isNaN(+expression[expression.length - 1])){
                    expression.push('.')
                }
            }

            display()
        }
    }

    function solve(){
        let compactExpression = compact()
        let accumulator = 0

        if(compactExpression.length == 1) {
            return compactExpression[0]
        }
        
        //handle division, multiplication, and modulo
        for(let i = 0; i <compactExpression.length; i++){
            if(['*','/','%'].includes(compactExpression[i])){
                let operand1 = +compactExpression[i-1]
                let operator = compactExpression[i]
                let operand2 = +compactExpression[i+1]
                accumulator = operate(operand1, operand2, operator)
                compactExpression.splice(i-1, 3)
                compactExpression.splice(i-1, 0, String(accumulator))
                i=0
            }
        }

        //handle addition and subtraction
        for(let i =0; i<compactExpression.length; i++){
            if(['+','-'].includes(compactExpression[i])){
                let operand1 = +compactExpression[i-1]
                let operator = compactExpression[i]
                let operand2 = +compactExpression[i+1]
                accumulator = operate(operand1, operand2, operator)
                compactExpression.splice(i-1, 3)
                compactExpression.splice(i-1, 0, String(accumulator))
                i=0
            }
        }

        //!!!
        //round of accumulator
        
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
        let strExpression = toString()
        document.querySelector('.expression-cont').textContent = strExpression

        //check if there is equal sign '='
        //if there is, 
        //  slice the result and put it in its individual element
        //  slice the strExpression also until, inclusive, the equal sign
        //  append child
        //else
        //  remove appended child if it exist
        //  either way the content is overwritten for every new entry
        //did not change other things


        //!!!!! TO DO TOM
        // design result
        // round of
        // check bugs
        // submit and share
        // upper panel padding?
        try {
            let tempResult = document.querySelector('.result-cont')
            document.querySelector('#lower-panel').removeChild(tempResult)
            console.log('remove span')
        } catch(e){
            console.log('no child exist babe')
        }

        console.log(strExpression.includes('='))
        if (strExpression.includes('=')){
            //get result - which is after =
            let tempResultValue = strExpression.slice(strExpression.indexOf('=')+1)
            //get equals 
            let tempExpression = strExpression.slice(0,strExpression.indexOf('=')+1)
            document.querySelector('.expression-cont').textContent = tempExpression
            document.querySelector('.expression-cont').style.marginBottom = '5%'
            document.querySelector('.expression-cont').style.fontStyle = 'italic'


            let tempResultElement = document.createElement('span')
            tempResultElement.classList.add('result-cont')
            tempResultElement.textContent = tempResultValue
            document.querySelector('#lower-panel').appendChild(tempResultElement)
            console.log('inserted span')

            
        } else { //delete element if no equal
            document.querySelector('.expression-cont').style.marginBottom = '0'
            document.querySelector('.expression-cont').style.fontStyle = 'normal'

        }
       
        return strExpression
    }

    function updateHistory(){
        let historyElem = document.querySelector('#upper-panel')
        
        if(history.length == 0){
            historyElem.textContent = ""
            return
        }
        
        historyElem.textContent += `${history[history.length - 1]} \n`
        historyElem.scrollTop = historyElem.scrollHeight;
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






