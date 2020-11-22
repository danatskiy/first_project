//объявляем переменную btnLeft для левой кнопки
let btnLeft = document.querySelector('.btn-left');
//добавляем к переменной событие по клику
//переменная//событие   //клик         //функция обработчик
btnLeft.addEventListener("click", clickHandler);
//объявляем переменную btnRight для правой кнопки
let btnRight = document.querySelector('.btn-right');
//добавляем к переменной событие по клику
//переменная//событие   //клик         //функция обработчик
btnRight.addEventListener("click", clickHandler);


//объявляем переменную и присваиваем ей значение функиции
let globalTimerId = setIntervalCustom();

//описываем функицию
function setIntervalCustom() {
    //объявляем переменную и присваиваем ей значение(регулярного вызова через промежуток времени)
    let timerId = setInterval(() => {
        //запускаем функцию очистки класса "active"
        clearActive();
        //запускаем функцию очистки класса "active" у индикаторов
        clearActiveIndicator();
        //запускаем функцию "goNext"-> вправо
        goNext('right');
        //запускаем функцию добавления класса "active"
        setActive();
        //запускаем функцию добавления класса "active" к индикаторам
        setActiveIndicator();
        //время повторения запуска setInterval 4с.
    }, 4000);
    //возвращем значение
    return timerId;
}

//описываем функцию очистки (сброс таймера)
function clearIntervalCustom(timerId) {
    //сброс (очистка)таймера
    clearInterval(timerId);
}

//добавляем событие на переменную btnRight
//переменная//событие   //тип-наведение мыши    //имя функции
btnRight.addEventListener("mouseover", mouseoverHandler);
//добавляем событие на переменную btnRight
//переменная//событие   //тип-отведение мыши    //имя функции
btnRight.addEventListener("mouseout", mouseoutHandler);
//добавляем событие на переменную btnLeft
//переменная//событие   //тип-наведение мыши    //имя функции
btnLeft.addEventListener("mouseover", mouseoverHandler);
//добавляем событие на переменную btnLeft
//переменная//событие   //тип-отведение мыши    //имя функции
btnLeft.addEventListener("mouseout", mouseoutHandler);

//описываем функцию(наведение мыши)
function mouseoverHandler() {
    //запускаем функцию(сброса таймера) очистки для(globalTimerId)
    clearIntervalCustom(globalTimerId);
}

//описываем функцию(отведение мыши)
function mouseoutHandler() {
    //переменной присваиваем значение функции и запускаем ее
    globalTimerId = setIntervalCustom();
}

//объявляем переменную со значением = 1(значение блока с классом active)
let currentId = 1
//объявляем постоянную со значением равным 5(количество карточек,количество индикаторов)
const itemCount = 5

//описываем функцию clickHandler
//функция   //имя    //значение параметра event
function clickHandler(event) {
    //запускаем функцию очистки класса "active"
    clearActive();
    //запускаем функцию очистки класса "active" у индикаторов
    clearActiveIndicator();
    //запускаем функцию goNext
    //имя //событие//текущая цель//data-(data-id для кнопок <>)
    goNext(event.currentTarget.dataset.dir);
    //запускаем функцию добавления класса "active"
    setActive();
    //запускаем функцию добавления класса "active" к индикаторам
    setActiveIndicator();
}

//описываем функцию (поведение для кнопок <>)
//имя функции  //параметр
function goNext(dir) {
    //если параметр = "вправо"(нажали вправо)
    if (dir == 'right') {
        //то значение переменной увеличивается на 1
        currentId += 1;
        //если переменная currentId больше постоянной itemCount
        if (currentId > itemCount) {
            //то происходит сброс значения переменной до currentId = 1
            //и мы возвращаемся к 1 (активной карточке)
            currentId = 1
        }
    }
    //если параметр = "влево"(нажали влево)
    if (dir == 'left') {
        ////то значение переменной уменьшается на 1
        currentId -= 1;
        //если значение переменной currentId меньше 1
        if (currentId < 1) {
            //то значению переменной currentId присваивается значение постоянной itemCount (5)
            currentId = itemCount
        }
    }
    //определение какая карточка видимая
    //объявляем переменную и присваиваем значение =false
    var itemIsVisible = false;
    //начальное условие i=0
    //конечное условие i меньше длинны массива
    //i++ шаг прирощения (+1)
    for (var i = 0; i < massive.length; i++) {
        //если переменная currentId равна текущему значению массива
        if (currentId == massive[i]) {
            //то переменной присваиваем значение true
            itemIsVisible = true;
        }

    }
    //сдвиг поля с карточками
    //объявляем переменную shiftI со значением 0
    let shiftI = 0;
    //переменной shiftI присваиваем значение currentId(текущее значение)-
    // elCountOnScreen(сколько карточек видно на экране)
    shiftI = currentId - elCountOnScreen;
    //если значение shiftI меньше 0
    if (shiftI < 0) {
        //то значению присваиваем 0
        shiftI = 0;
    }
    console.log(currentId);
    console.log(massive);
    //обявляем переменную shiftIPx и присваиваем ей значение shiftI *
    let shiftIPx = shiftI * (currentBlockWidth+40);

    console.log(itemIsVisible);
    //если переменная itemIsVisible равна false
    if (itemIsVisible == false) {
        //переменной massive присваивается значение массива
        massive = []
        //начальное условие i= 1+shiftI
        //конечное условие i меньше либо равно elCountOnScreen + shiftI
        //i++ шаг прирощения (+1)
        for (let i = 1 + shiftI; i <= elCountOnScreen + shiftI; i++) {
            //добавляем значение i в массив
            massive.push(i);
        }
        //объявляем переменную и присваиваем значение блока с классом .card-list
        let cardListBlock = document.querySelector('.card-list')
        //смещение
        //переменной добавляем атрибут. имя style. значение влево - значение переменной
        cardListBlock.setAttribute('style', 'left: -' + shiftIPx+ 'px');
    }
    console.log(shiftIPx);
}


//описываем функцию очистки класса "active"
function clearActive() {
    //объявляем переменную и присваиваем ей значение блока с классом .block-data
    var divs = document.querySelectorAll('.block-data');
    //для каждой переменной  выполнить функцию с парметром el
    divs.forEach(function (el) {
        //для параметра el удалить класс active
        el.classList.remove('active')
    })
}

//описываем функцию добавления класса "active"
function setActive() {
    //объявляем переменную и присваиваем ей значение блока с классом .block-data
    var divs = document.querySelectorAll('.block-data');
    //для каждой переменной выполнить функцию с парметром el
    divs.forEach(function (el) {
        //если параметр el. data-el-Id равен currentId
        if (el.dataset.elId == currentId) {
            //то присваиваю класс active
            el.classList.add('active');
        }
    })
}

//описываем функцию очистки класса "active" у индикаторов
function clearActiveIndicator() {
    //объявляем переменную и присваиваем ей значение блока с классом .slide-item
    var indicator = document.querySelectorAll('.slide-item');
    //для каждой переменной выполнить функцию с парметром el
    indicator.forEach(function (el) {
        //для парметра el удалить класс active
        el.classList.remove('active')
    })
}

//описываем функцию добавления класса "active" к индикаторам
function setActiveIndicator() {
    //объявляем переменную и присваиваем ей значение блока с классом .slide-item
    var indicator = document.querySelectorAll('.slide-item');
    //для каждой переменной выполнить функцию с парметром el
    indicator.forEach(function (el) {
        //если параметр el. data-el-Id равен currentId
        if (el.dataset.elId == currentId) {
            //то присваиваю класс active
            el.classList.add('active');
        }
    })
}


//объявляем переменную и присваиваем значение 1(количество элементов на экране)
let elCountOnScreen = 1;
//объявляем переменную и присваиваем значение 260(ширина блока карточки)
let minBlockWidth = 260;
//объявляем переменную и присваиваем значение ширины экрана клиента(ширина экрана)
let screenWidth = document.getElementById('vZWidth').offsetWidth;

//объявляем переменную и присваиваем значение переменной  minBlockWidth
let currentBlockWidth = minBlockWidth;

//функция определения ширины экрана и количества карточек
//объявляем функцию
function calcWidth() {
    //если ширина экрана/4 больше либо равна ширине блока
    if ((screenWidth / 4) >= minBlockWidth) {
        //то количество карточек равно
        elCountOnScreen = 4
        //текущая ширина блока равна ширине экрана/4 минус
        currentBlockWidth = ((screenWidth - 160) / 4)
        return
    }
    //если ширина экрана/3 больше либо равна ширине блока
    if ((screenWidth / 3) >= minBlockWidth) {
        //то количество карточек равно
        elCountOnScreen = 3
        currentBlockWidth = ((screenWidth - 120) / 3)
        return
    }

    //если ширина экрана/2 больше либо равна ширине блока
    if ((screenWidth / 2) >= minBlockWidth) {
        //то количество карточек равно
        elCountOnScreen = 2
        currentBlockWidth = ((screenWidth - 80) / 2)
        return
    }
    //если ширина экрана/1 больше либо равна ширине блока
    if ((screenWidth / 1) >= minBlockWidth) {
        //то количество карточек равно
        elCountOnScreen = 1
        currentBlockWidth = (screenWidth - 40)
        return
    }
    currentBlockWidth = screenWidth;

}

//запускаем функцию
calcWidth();

//определение ширины карточки
//объявляем переменную и присваиваем ей значение блока с классом .card
let cardWidth = document.querySelectorAll('.card');
//перебираем массив для каждой переменной cardWidth описываем функцию с параметром el
cardWidth.forEach(function (el) {
    //параметру el с шириной присваиваем значение текущей ширины блока
    el.style.width = currentBlockWidth + "px";
})


console.log(screenWidth);
console.log('elCountOnScreen = ' + elCountOnScreen + ' items');
console.log('currentBlockWidth = ' + currentBlockWidth + 'px');

//объявляем переменную и присваиваем значение равное массиву
let massive = []
//перебираем массив
//начальное значение i=1
//конечное значение i меньше либо равно elCountOnScreen(количество элементов на экране)
//i++ шаг прирощения (+1)
for (let i = 1; i <= elCountOnScreen; i++) {
    //добавляем значение i в массив
    massive.push(i);
}

//описываем функцию (одинаковая высота)
window.onload = function() {


    //запускаем функцию
    sameHeightText();
    //запускаем функцию
    sameHeight();
}


function sameHeightText() {
    //объявляем переменную mainDiv присваиваем ей значение(массива) с классом card
    var mainDiv = document.querySelectorAll(".card-title");
    //объявляем переменную maxHeight присваиваем ей значение 0
    var maxHeight = 0;
    //перебираем массив
    //начальное значение i=0
    //конечное значение i меньше длинны массива
    //i++ шаг прирощения (+1)

    mainDiv.forEach(function (el) {
        //если maxHeight меньше значения массива(clientHeight содержит высоту нашего div)
        if (maxHeight < el.clientHeight) {
            //то maxHeight приравниваем значиение массива(clientHeight содержит высоту нашего div)
            maxHeight = el.clientHeight;
        }
    })

    //перебираем массив
    //начальное значение i=0
    //конечное значение i меньше длинны массива(clientHeight содержит высоту нашего div)
    //i++ шаг прирощения (+1)
    for (var i = 0; i < mainDiv.length; ++i) {
        //для значений массива задаем стиль с высотой и приравниваем к значению переменной maxHeight
        mainDiv[i].style.minHeight = maxHeight + "px";
    }
}

//описываем функцию (одинаковая высота)
function sameHeight() {
    //объявляем переменную mainDiv присваиваем ей значение(массива) с классом card
    var mainDiv = document.getElementsByClassName("card-text");
    //объявляем переменную maxHeight присваиваем ей значение 0
    var maxHeight = 0;
    let newHeight = 0;
    //перебираем массив
    //начальное значение i=0
    //конечное значение i меньше длинны массива
    //i++ шаг прирощения (+1)
    for (var i = 0; i < mainDiv.length; ++i){
        //если maxHeight меньше значения массива(clientHeight содержит высоту нашего div)
        if (maxHeight < mainDiv[i].clientHeight) {
            //то maxHeight приравниваем значиение массива(clientHeight содержит высоту нашего div)
            maxHeight = mainDiv[i].clientHeight;
        }
        console.log('='+mainDiv[i].clientHeight);
    }
    //перебираем массив
    //начальное значение i=0
    //конечное значение i меньше длинны массива(clientHeight содержит высоту нашего div)
    //i++ шаг прирощения (+1)
    for (var i = 0; i < mainDiv.length; ++i) {
        newHeight = maxHeight;
        //для значений массива задаем стиль с высотой и приравниваем к значению переменной maxHeight
        mainDiv[i].style.minHeight =newHeight +"px";
    }
}

window.onresize = function initPage() {



};

