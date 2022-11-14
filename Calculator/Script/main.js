let x = '' // Первое число
let y = '' // Второе число
let sign = '' // Знак операции
let finish = false; // Нажата ли кнопка =

// Массив цыфр
const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
// Массив действий
const action = ['+', '-', 'X', '/'];

// Экран
const screen = document.querySelector('.screen');
// Контейнер с кнопками
const buttonsField = document.querySelector('.calculator__buttons');




buttonsField.addEventListener('click',(event) => {
    //Если не кнопка
    if(!event.target.classList.contains('btn')) return;
    // Если кнопка "Очистить все"
    if(event.target.classList.contains('AC')) return;
    
    const key = event.target.textContent;

    // Нажат число
    if(digit.includes(key)){
        screen.style.fontSize = "80px";

        if(y === '' && sign === ''){
            if(finish) ClearAll();
            x += key;
            screen.textContent = x;
            console.log(x);
        }
        else if(sign !== ''){
            finish = false;
            y += key;
            screen.textContent = y;
            console.log(x,sign,y)
        }

        return;
    }

    //Нажато действие из массива action
    if(action.includes(key)){
        x = (x === '') ? '0' : x;
        screen.style.fontSize = "80px";
        //Рассчитать результат
        if(x !== '' && sign !== ''){
            x = Calculate(x,y,sign);
            screen.textContent = x;
            console.log(x);
        }

        sign = key;
        screen.textContent = sign;
        console.log(x, sign);
        return;
    }
    if(key === '='){
        screen.textContent = Calculate(x,y,sign);
    }
});

// Очистка 
function ClearAll(){
    screen.style.fontSize = "80px";
    screen.textContent = 0;
    x = '';
    y = '';
    sign = '';
    finish = false;
    console.log("Cleared");
}


// Расчет результата
function Calculate(_x, _y, _sign){
    screen.style.fontSize = "80px";
    let result = 0;
    finish = true;
    switch(_sign){
        case '+':   
            result = +_x + +_y;
            break;
        case '-':
            result = +_x - +_y;
            break;
        case 'X':
            if(_y !== '') result = +_x * +_y;
            //Возведение в степень по комбинации "x*="
            else{
                result = +_x * +_x
            }
            break;
        case '/':
            // Проверка деления на 0
            if(_y === '0'){
                x = '';
                y = '';
                sign = '';
                result = "Дядя, на ноль делить нельзя, я запрещаю!"
                screen.style.fontSize = "30px";
                return result;
            }
            result = +_x / +_y;
            break;
    }
    sign = '';
    x = result;
    y = '';

    return result;
}

document.querySelector('.AC').addEventListener('click', ClearAll);