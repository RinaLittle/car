const gas = document.querySelector('.gas')//элемент газ
let pressingGas = false;//создаем переменную для отслеживания состояния зажатой кнопки мыши
let pressingBrake = false
let brake = document.querySelector('.brake')
let speedometer = document.querySelector('.speed')//элемент скорость
let gasolineСonsumption = document.querySelector('.gasoline')
let gameboard = document.querySelector(".layout--gameboard__wrapper")
let indexRasstoyanie = document.querySelector(".index-rasstoyanie")
let upArrow = document.querySelector('.up-arrow')//стрелка вверх
let carImg = document.querySelector('.main__img-car')
let arrowDown = document.querySelector('.arrow-down')//стрелка вниз
let inputElem = document.querySelector('.refueling-liters')
let inputValue
let refueling = document.querySelector('.fill-the-car')
const maxBenzin = 60
let needBenzin
let fromQuantity = document.querySelector('.from-quantity')

const car = {
    htmlElement: '',
    speed: 0,
    rasstoyanie: 0,
    dvigatel: {
      benzin: 30,
      moshnost: 1.6,
      gasoline: 0.003 //расход бензина
    },
    changeSpeed(speed) {
        this.speed = Number(speed.toFixed(1))//переводим строку в число
    },
    addCar() {
        const car = document.querySelectorAll('.main__car-wrapper') //получаем массив(элемент-машину)
        this.htmlElement = car[0] //выбираем первый элемент массива
    },
    braking() {
        if (this.speed > 0) {
            this.changeSpeed(this.speed - 0.1)
        }
        if (this.speed < 0) {
            this.changeSpeed(0)
        }
    },
    carGo() {
        if(pressingGas === true) {
            this.moveForward();
        }
        if(pressingBrake === true) {
            this.stop()
        }
        this.braking()
        this.calculateGasolineConsumption()
        updateInterface();
        const rass = this.rasstoyanie - (this.rasstoyanie * 2)
        gameboard.style.backgroundPositionX =  rass + 'px'
    },
    calculateGasolineConsumption() {
        if (pressingGas == true) {
            this.dvigatel.benzin = this.dvigatel.benzin - (this.dvigatel.gasoline * this.speed); 
        }
        if (this.dvigatel.benzin <= 0)  {
          this.speed--
          this.dvigatel.benzin = 0
        }
        if (this.speed < 0) {
          this.speed = 0
        }
        this.rasstoyanie = this.rasstoyanie + this.speed
        //получаем расход бензина, умножая 
      },
    stop() {
        this.speed = this.speed - 0.3
    },
    moveForward() {//создаем функцию для движения машины вперед
        this.changeSpeed(this.speed + 1 )  
        if(this.speed > 60) {
            this.speed = 60
        }
    },
}
car.addCar(); //машина
car.changeSpeed(0); //изменение скоростих

function updateInterface() {
    speedometer.innerText = car.speed;//меняем значение скорости на текущую 
    gasolineСonsumption.innerText = Number(car.dvigatel.benzin.toFixed(1));
    indexRasstoyanie.innerText = Number(car.rasstoyanie.toFixed(1))
    gasolineСonsumption.innerText = Number(car.dvigatel.benzin.toFixed(1))
}

brake.addEventListener('mousedown', function(event) { //Добавляем обработчик события
    if(event.button === 0) {// Проверяем, какая кнопка мыши была нажата
        pressingBrake = true;
    }
});
gas.addEventListener('mousedown', function(event) {//Добавляем обработчик события
    if(event.button === 0) {// Проверяем, какая кнопка мыши была нажата
        pressingGas = true;
    }
});

document.addEventListener('mouseup', function(event) {// Добавляем обработчик события "mouseup" к документу (вне элемента carElement)
    if(event.button === 0) {// Проверяем, какая кнопка мыши была отпущена
        pressingGas = false;// Устанавливаем переменную isMouseDown в значение false, чтобы отметить, что кнопка мыши больше не зажата
        pressingBrake = false;
    }
});
inputElem.addEventListener('input', function() {
    if (car.speed == 0) {
        inputValue = Number(inputElem.value)
        if (inputValue < 0) {
            alert('Введите корректное число')
            inputValue = 0
        }
    } 
});
refueling.addEventListener('click', function () {
    if (car.speed == 0) {
    needBenzin = maxBenzin - car.dvigatel.benzin
    if (Number(inputValue)  > needBenzin) {
        car.dvigatel.benzin = maxBenzin
    }
    if (inputValue < needBenzin ) {
        car.dvigatel.benzin = inputValue + car.dvigatel.benzin
    }
    updateInterface()
    } else {
        alert('Дождитесь остановки машины')
    }
});
// Переменная для хранения текущей позиции машины (0 - верхняя, 1 - средняя, 2 - нижняя)
let carPosition = 1;


// Функция для перемещения машины вверх
function moveArrowUp() {
    if (car.speed > 0) {
        if (carPosition > 0) { // Проверяем, что машина не на верхней полосе
            carPosition--; // Уменьшаем значение позиции
            updateCarPosition(); // Обновляем позицию машины
        }
    }
}

// Функция для перемещения машины вниз
function moveArrowDown() {
    if (car.speed > 0) {
        if (carPosition < 2) { // Проверяем, что машина не на нижней полосе
            carPosition++; // Увеличиваем значение позиции
            updateCarPosition(); // Обновляем позицию машины
        }
    }

}


// Функция для обновления позиции машины на основе текущей позиции
function updateCarPosition() {
    // Вычисляем новую позицию на основе текущей позиции
    const positionsIds = {
        0: 205,
        1: 143,
        2: 45
    }
    // const positionsIds = [205,143,45]
    let newPosition = positionsIds[carPosition];

    // Альтернативный вариант от GPT
    // let newPosition
    // if(carPosition === 0) {
    //     newPosition = 205
    // } else if(carPosition === 1) {
    //     newPosition = 143
    // } else {
    //     newPosition = 45
    // }
    carImg.style.bottom = newPosition + 'px'; // Устанавливаем новое значение bottom
}

// Добавляем обработчики событий для кнопок
upArrow.addEventListener('click', moveArrowUp);
arrowDown.addEventListener('click', moveArrowDown);

setInterval(function () {
    car.carGo();
}, 100);