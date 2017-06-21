var inputWidth = document.createElement('input'),
    inputHeight = document.createElement('input'),
    countBomb = document.createElement('input'),
    generatePole = document.createElement('input'),
    saper_container = document.createElement('div');

inputWidth.setAttribute('type','number');
inputWidth.setAttribute('placeholder','Кількість по ширині');
inputHeight.setAttribute('type','number');
inputHeight.setAttribute('placeholder','Кількість по висоті');
countBomb.setAttribute('type','number');
countBomb.setAttribute('placeholder','Кількість бомб');
generatePole.addEventListener('click', submit, false);
generatePole.setAttribute('type','submit');
generatePole.setAttribute('value','Згенерувати');
document.body.appendChild(inputWidth);
document.body.appendChild(inputHeight);
document.body.appendChild(countBomb);
document.body.appendChild(generatePole);
saper_container.setAttribute('class','saper_container');
document.body.appendChild(saper_container);

function submit(e) {
    var countElem = inputWidth.value * inputHeight.value,
        bobmbCount = countBomb.value;
    if(bobmbCount=<countElem){
    console.log('here');
};
saper_container.style.width = inputWidth.value*52+'px';
    saper_container.style.height = inputHeight*52+'px';

    for(var i =0; i< countElem; i++){
        var elem = document.createElement('div');
        elem.setAttribute('class', 'block_saper');
        elem.addEventListener('click', check, false);
        saper_container.appendChild(elem);
    }

}