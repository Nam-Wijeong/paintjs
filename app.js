const canvas = document.querySelector('#jsCanvas');
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700

// canvas에 너비와 높이 지정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
   const x = event.offsetX;
   const y = event.offsetY;
   if(!painting) {
    // console.log("creating path in" ,x, y);

    // path 는 선! x,y 좌표로 움직인다
       ctx.beginPath();
       ctx.moveTo(x, y);
   }else {
    //    console.log("creating path in" ,x, y);
    // lineTo는 path 이전 위치에서 지금 위치까지 선을 만든다
       ctx.lineTo(x, y);
       ctx.stroke();
   }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handelRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = 'Fill'
    }else{
        filling = true;
        mode.innerText = 'Paint'
        
    }
}

function handleCanvasClick(){
    if(filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// 마우스 우클릭 방지
function handleCM(event) {
    event.preventDefault()
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs[🎨]";
    link.click();
}


if(canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick))

if(range) {
    range.addEventListener('input', handelRangeChange)
}

if(mode) {
    mode.addEventListener('click', handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
}