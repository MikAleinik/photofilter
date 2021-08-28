function init() {
    setAllInputRangeTheme();

    setImage('./assets/jpg/load-foto.jpg', true);

    document.getElementById('fotoImagePresetOne').style.filter = 'blur(0px) invert(0%) sepia(0) grayscale(0.8) contrast(1) brightness(1) opacity(1) hue-rotate(0deg)';
    document.getElementById('fotoImagePresetTwo').style.filter = 'blur(2.5px) invert(0%) sepia(0) grayscale(0) contrast(1.5) brightness(0.6) opacity(1) hue-rotate(0deg)';
    document.getElementById('fotoImagePresetThree').style.filter = 'blur(1px) invert(24%) sepia(0) grayscale(1) contrast(1) brightness(0.5) opacity(1) hue-rotate(0deg)';
    document.getElementById('fotoImagePresetFour').style.filter = 'blur(0px) invert(100%) sepia(0) grayscale(0) contrast(0.5) brightness(1) opacity(1) hue-rotate(0deg)';
    document.getElementById('fotoImagePresetFive').style.filter = 'blur(0px) invert(0%) sepia(0) grayscale(0) contrast(1) brightness(1) opacity(1) hue-rotate(0deg)';
}

function selectTheme(element) {
    for (let item of element.parentElement.children) {
        item.style.border = `1px solid`;
    }
    element.style.border = `3px solid`;

    let elementBody = document.querySelector('body');
    elementBody.classList.remove(elementBody.classList[0]);
    elementBody.classList.add(element.classList[0]);

    setAllInputRangeTheme();
}

function setAllInputRangeTheme() {
    let elementRange = document.querySelectorAll('input[type="range"]');
    for (let elementInputRange of elementRange) {
        changeRange(elementInputRange);
    }
}

function changeRange(elementInputRange) {
    let computedStyle = getComputedStyle(document.body);
    let background = computedStyle.background;
    background = background.substring(0, background.indexOf(')') + 1);
    let color = computedStyle.color;
    var value = (elementInputRange.value - elementInputRange.min) / (elementInputRange.max - elementInputRange.min) * 100;
    let linearGradient = 'linear-gradient(to right, ' + color + ' 0%, ' + color + ' ' + value + '%, ' + background + ' ' + value + '%, ' + background + ' 100%';
    elementInputRange.style.setProperty('--range__background__color', linearGradient);
    elementInputRange.style.setProperty('--range__text__color', computedStyle.color);

    let inputText = elementInputRange.nextElementSibling;
    inputText.value = elementInputRange.value;
}

function changeTextRange(elementTextRange) {
    let inputRange = elementTextRange.previousElementSibling;
    inputRange.value = elementTextRange.value;
    changeRange(inputRange);
}

function setSizeFoto(value) {
    elementFoto = document.getElementById('fotoImage');
    elementFoto.style.setProperty('--foto__heigth', value + '%');
    elementFoto.style.setProperty('--foto__width', value + '%');
}

function setBlur(value) {
    elementFoto = document.getElementById('fotoImage');
    let blur = value / 10 + 'px';
    elementFoto.style.setProperty('--foto__blur', blur);
}

function setInvert(value) {
    elementFoto = document.getElementById('fotoImage');
    let invert = value + '%';
    elementFoto.style.setProperty('--foto__invert', invert);
}

function setSepia(value) {
    elementFoto = document.getElementById('fotoImage');
    let sepia = value / 100;
    elementFoto.style.setProperty('--foto__sepia', sepia);
}

function setGray(value) {
    elementFoto = document.getElementById('fotoImage');
    let grayscale = value / 100;
    elementFoto.style.setProperty('--foto__grayscale', grayscale);
}

function setContrast(value) {
    elementFoto = document.getElementById('fotoImage');
    let contrast = value / 100;
    elementFoto.style.setProperty('--foto__contrast', contrast);
}

function setBrightness(value) {
    elementFoto = document.getElementById('fotoImage');
    let brightness = value / 100;
    elementFoto.style.setProperty('--foto__brightness', brightness);
}

function setOpacity(value) {
    elementFoto = document.getElementById('fotoImage');
    let opacity = value / 100;
    elementFoto.style.setProperty('--foto__opacity', opacity);
}

function setRotate(value) {
    elementFoto = document.getElementById('fotoImage');
    let rotate = value + 'deg';
    elementFoto.style.setProperty('--foto__rotate', rotate);
}

function selectPreset(element) {
    for (let item of element.parentElement.children) {
        item.style.border = `1px solid`;
    }
    element.style.border = `3px solid`;
    switch (element.id) {
        case 'presetOne': {
            setPresetOne();
            break;
        }
        case 'presetTwo': {
            setPresetTwo();
            break;
        }
        case 'presetThree': {
            setPresetThree();
            break;
        }
        case 'presetFour': {
            setPresetFour();
            break;
        }
        case 'presetFive': {
            setPresetFive();
            break;
        }
    }
}

function loadFile() {
    document.getElementById('loadFile').click();
}

document.getElementById('loadFile').onchange = e => {
    var file = e.target.files[0];
    document.getElementById('fotoName').innerHTML = file.name;
    var reader = new FileReader();
    reader.onload = readerEvent => {
        document.querySelector('.foto__label').style.display = 'none';
        document.getElementById('fotoImage').style.display = 'inline';
        setImage(readerEvent.target.result);
        document.getElementById('saveFile').href = readerEvent.target.result;
        document.getElementById('fotoLoadedImage').src = readerEvent.target.result;
        selectPreset(document.getElementById('presetFive'));
        document.getElementById('buttonSaveFile').disabled = false;       
    }
    reader.readAsDataURL(file);
}

function saveFile() {
    let canvas = document.getElementById('fotoImage');
    let contextCanvas = canvas.getContext('2d');
    setFiltersToCanvas(beginSave => {
        let link = document.getElementById('saveFile');
        link.setAttribute('href', canvas.toDataURL('image/jpeg').replace("image/jpeg", "image/octet-stream"));
        link.click();
        setImage(document.getElementById('fotoLoadedImage').src);
    });
}

function setFiltersToCanvas(callbackFunction) {
    elementFoto = document.getElementById('fotoImage');
    let blur = elementFoto.style.getPropertyValue('--foto__blur');
    let invert = elementFoto.style.getPropertyValue('--foto__invert');
    let sepia = elementFoto.style.getPropertyValue('--foto__sepia');
    let grayscale = elementFoto.style.getPropertyValue('--foto__grayscale');
    let contrast = elementFoto.style.getPropertyValue('--foto__contrast');
    let brightness = elementFoto.style.getPropertyValue('--foto__brightness');
    let opacity = elementFoto.style.getPropertyValue('--foto__opacity');
    let rotate = elementFoto.style.getPropertyValue('--foto__rotate');
    let filter = `blur(${blur}) invert(${invert}) sepia(${sepia}) grayscale(${grayscale}) contrast(${contrast}) brightness(${brightness}) opacity(${opacity}) hue-rotate(${rotate})`;

    var canvas = document.getElementById("fotoImage");
    var contextCanvas = canvas.getContext("2d");
    var img = new Image();
    let path = elementFoto.getAttribute('src');
    if(!path.includes('default-foto')){
        img.crossOrigin = '*';
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    img.width = canvas.clientWidth;
    img.height = canvas.clientHeight;
    img.src = document.getElementById('fotoLoadedImage').src;
    img.onload = function () {
        contextCanvas.filter = filter;
        contextCanvas.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
        if(callbackFunction != undefined){
            callbackFunction();
        }
    }
}

function setImage(path, isDefault) {
    var canvas = document.getElementById("fotoImage");
    var contextCanvas = canvas.getContext("2d");
    var img = new Image();
    if (!isDefault) {
        img.crossOrigin = '*';
    }
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    img.width = canvas.clientWidth;
    img.height = canvas.clientHeight;
    img.src = path;
    img.onload = function () {
        contextCanvas.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
    }
}

function setPresetOne(){
    setSizeFoto(100);
    document.getElementById('sizeRange').value = 100;
    changeRange(document.getElementById('sizeRange'));
    document.getElementById('sizeText').value = 100;

    setBlur(0);
    document.getElementById('blurRange').value = 0;
    changeRange(document.getElementById('blurRange'));
    document.getElementById('blurText').value = 0;

    setInvert(0);
    document.getElementById('invertRange').value = 0;
    changeRange(document.getElementById('invertRange'));
    document.getElementById('invertText').value = 0;

    setSepia(100);
    document.getElementById('sepiaRange').value = 100;
    changeRange(document.getElementById('sepiaRange'));
    document.getElementById('sepiaText').value = 100;

    setGray(80);
    document.getElementById('grayRange').value = 80;
    changeRange(document.getElementById('grayRange'));
    document.getElementById('grayText').value = 80;

    setContrast(100);
    document.getElementById('contrastRange').value = 100;
    changeRange(document.getElementById('contrastRange'));
    document.getElementById('contrastText').value = 100;

    setBrightness(100);
    document.getElementById('brightnessRange').value = 100;
    changeRange(document.getElementById('brightnessRange'));
    document.getElementById('brightnessText').value = 100;

    setOpacity(100);
    document.getElementById('opacityRange').value = 100;
    changeRange(document.getElementById('opacityRange'));
    document.getElementById('opacityText').value = 100;

    setRotate(0);
    document.getElementById('rotateRange').value = 0;
    changeRange(document.getElementById('rotateRange'));
    document.getElementById('rotateText').value = 0;
}

function setPresetTwo(){
    setSizeFoto(100);
    document.getElementById('sizeRange').value = 100;
    changeRange(document.getElementById('sizeRange'));
    document.getElementById('sizeText').value = 100;

    setBlur(25);
    document.getElementById('blurRange').value = 25;
    changeRange(document.getElementById('blurRange'));
    document.getElementById('blurText').value = 25;

    setInvert(0);
    document.getElementById('invertRange').value = 0;
    changeRange(document.getElementById('invertRange'));
    document.getElementById('invertText').value = 0;

    setSepia(0);
    document.getElementById('sepiaRange').value = 0;
    changeRange(document.getElementById('sepiaRange'));
    document.getElementById('sepiaText').value = 0;

    setGray(0);
    document.getElementById('grayRange').value = 0;
    changeRange(document.getElementById('grayRange'));
    document.getElementById('grayText').value = 0;

    setContrast(150);
    document.getElementById('contrastRange').value = 150;
    changeRange(document.getElementById('contrastRange'));
    document.getElementById('contrastText').value = 150;

    setBrightness(60);
    document.getElementById('brightnessRange').value = 60;
    changeRange(document.getElementById('brightnessRange'));
    document.getElementById('brightnessText').value = 60;

    setOpacity(100);
    document.getElementById('opacityRange').value = 100;
    changeRange(document.getElementById('opacityRange'));
    document.getElementById('opacityText').value = 100;

    setRotate(0);
    document.getElementById('rotateRange').value = 0;
    changeRange(document.getElementById('rotateRange'));
    document.getElementById('rotateText').value = 0;
}

function setPresetThree(){
    setSizeFoto(100);
    document.getElementById('sizeRange').value = 100;
    changeRange(document.getElementById('sizeRange'));
    document.getElementById('sizeText').value = 100;

    setBlur(10);
    document.getElementById('blurRange').value = 10;
    changeRange(document.getElementById('blurRange'));
    document.getElementById('blurText').value = 10;

    setInvert(24);
    document.getElementById('invertRange').value = 24;
    changeRange(document.getElementById('invertRange'));
    document.getElementById('invertText').value = 24;

    setSepia(0);
    document.getElementById('sepiaRange').value = 0;
    changeRange(document.getElementById('sepiaRange'));
    document.getElementById('sepiaText').value = 0;

    setGray(100);
    document.getElementById('grayRange').value = 100;
    changeRange(document.getElementById('grayRange'));
    document.getElementById('grayText').value = 100;

    setContrast(100);
    document.getElementById('contrastRange').value = 100;
    changeRange(document.getElementById('contrastRange'));
    document.getElementById('contrastText').value = 100;

    setBrightness(50);
    document.getElementById('brightnessRange').value = 50;
    changeRange(document.getElementById('brightnessRange'));
    document.getElementById('brightnessText').value = 50;

    setOpacity(100);
    document.getElementById('opacityRange').value = 100;
    changeRange(document.getElementById('opacityRange'));
    document.getElementById('opacityText').value = 100;

    setRotate(0);
    document.getElementById('rotateRange').value = 0;
    changeRange(document.getElementById('rotateRange'));
    document.getElementById('rotateText').value = 0;
}

function setPresetFour(){
    setSizeFoto(100);
    document.getElementById('sizeRange').value = 100;
    changeRange(document.getElementById('sizeRange'));
    document.getElementById('sizeText').value = 100;

    setBlur(0);
    document.getElementById('blurRange').value = 0;
    changeRange(document.getElementById('blurRange'));
    document.getElementById('blurText').value = 0;

    setInvert(100);
    document.getElementById('invertRange').value = 100;
    changeRange(document.getElementById('invertRange'));
    document.getElementById('invertText').value = 100;

    setSepia(0);
    document.getElementById('sepiaRange').value = 0;
    changeRange(document.getElementById('sepiaRange'));
    document.getElementById('sepiaText').value = 0;

    setGray(0);
    document.getElementById('grayRange').value = 0;
    changeRange(document.getElementById('grayRange'));
    document.getElementById('grayText').value = 0;

    setContrast(50);
    document.getElementById('contrastRange').value = 50;
    changeRange(document.getElementById('contrastRange'));
    document.getElementById('contrastText').value = 50;

    setBrightness(100);
    document.getElementById('brightnessRange').value = 100;
    changeRange(document.getElementById('brightnessRange'));
    document.getElementById('brightnessText').value = 100;

    setOpacity(100);
    document.getElementById('opacityRange').value = 100;
    changeRange(document.getElementById('opacityRange'));
    document.getElementById('opacityText').value = 100;

    setRotate(0);
    document.getElementById('rotateRange').value = 0;
    changeRange(document.getElementById('rotateRange'));
    document.getElementById('rotateText').value = 0;
}

function setPresetFive(){
    setSizeFoto(100);
    document.getElementById('sizeRange').value = 100;
    changeRange(document.getElementById('sizeRange'));
    document.getElementById('sizeText').value = 100;

    setBlur(0);
    document.getElementById('blurRange').value = 0;
    changeRange(document.getElementById('blurRange'));
    document.getElementById('blurText').value = 0;

    setInvert(0);
    document.getElementById('invertRange').value = 0;
    changeRange(document.getElementById('invertRange'));
    document.getElementById('invertText').value = 0;

    setSepia(0);
    document.getElementById('sepiaRange').value = 0;
    changeRange(document.getElementById('sepiaRange'));
    document.getElementById('sepiaText').value = 0;

    setGray(0);
    document.getElementById('grayRange').value = 0;
    changeRange(document.getElementById('grayRange'));
    document.getElementById('grayText').value = 0;

    setContrast(100);
    document.getElementById('contrastRange').value = 100;
    changeRange(document.getElementById('contrastRange'));
    document.getElementById('contrastText').value = 100;

    setBrightness(100);
    document.getElementById('brightnessRange').value = 100;
    changeRange(document.getElementById('brightnessRange'));
    document.getElementById('brightnessText').value = 100;

    setOpacity(100);
    document.getElementById('opacityRange').value = 100;
    changeRange(document.getElementById('opacityRange'));
    document.getElementById('opacityText').value = 100;

    setRotate(0);
    document.getElementById('rotateRange').value = 0;
    changeRange(document.getElementById('rotateRange'));
    document.getElementById('rotateText').value = 0;
}