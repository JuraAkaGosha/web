var inputWidth = document.createElement('input'),
    inputHeight = document.createElement('input'),
    countBomb = document.createElement('input'),
    generatePole = document.createElement('input'),
    saper_container = document.createElement('div'),
    countflag = 0, bombCount , bomb;

inputWidth.setAttribute('type', 'number');
inputWidth.setAttribute('placeholder', 'Кількість по ширині');
inputHeight.setAttribute('type', 'number');
inputHeight.setAttribute('placeholder', 'Кількість по висоті');
countBomb.setAttribute('type', 'number');
countBomb.setAttribute('placeholder', 'Кількість бомб');
generatePole.addEventListener('click', submit, false);
generatePole.setAttribute('type', 'submit');
generatePole.setAttribute('value', 'Згенерувати');
document.body.appendChild(inputWidth);
document.body.appendChild(inputHeight);
document.body.appendChild(countBomb);
document.body.appendChild(generatePole);
saper_container.setAttribute('id', 'saper_container');
document.body.appendChild(saper_container);

function submit(e) {
    var countElem = inputWidth.value * inputHeight.value,
        bombArray = [];
    bombCount = countBomb.value;
    bomb = countElem;
    if (bombCount <= countElem) {
        for (var i = 0; i < bombCount; i++) {
            bombArray.push(Math.floor(Math.random() * countElem-1) + 1)
        }
    }
    saper_container.style.width = inputWidth.value * 52 + 'px';
    saper_container.style.height = inputHeight * 52 + 'px';

    for (var i = 0; i < countElem; i++) {
        var elem = document.createElement('div');
        elem.setAttribute('class', 'block_saper');
        elem.addEventListener('click', check, false);
        elem.addEventListener('contextmenu', flag, true);
        for (var j = 0; j < bombArray.length; j++) {
            if (bombArray[j] == i) {
                elem.setAttribute('data-attr', 'true');
            }
        }
        saper_container.appendChild(elem);
    }

}
function check(e) {
    var elem = e.target;
    console.log(Boolean(elem.getAttribute('data-attr')));
    elem.removeEventListener('click', check, false);
    elem.removeAttribute('class');
    if (Boolean(elem.getAttribute('data-attr'))) {
        var container = document.getElementById('saper_container');
        for(var i = 0; i < bomb; i++){
            container.childNodes[i].removeEventListener('contextmenu', flag, true);
            container.childNodes[i].removeEventListener('click', check, false);
            if (Boolean(container.childNodes[i].getAttribute('data-attr'))){
                container.childNodes[i].setAttribute('class', 'block_saper_bomb');
            }

        }
    }
    else {
        elem.setAttribute('class', 'block_saper_check');
    }
}

function flag(e) {
    console.log(bombCount);
    var elem = e.target;
    console.log(elem.getAttribute('class'));
    if (elem.getAttribute('class') == 'block_saper_flag') {
        elem.setAttribute('class', 'block_saper');
        countflag--;
    }
    else {
        if (countflag < +bombCount) {
            elem.setAttribute('class', 'block_saper_flag');
            countflag++;
        }
    }
    e.preventDefault();
}