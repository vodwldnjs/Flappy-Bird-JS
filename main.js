let canvas = document.getElementById('paeng');
let ctx = canvas.getContext("2d");

let x_velocity = 0.1;
let y_velocity = 0;

const controlPower = 0.01;

const rectRadius = 25;
const gravitational_acceleration = 0.01;

let x_acceleration = 0;
let y_acceleration = gravitational_acceleration;

const x_original_acceleration = 0;
const y_original_acceleration = gravitational_acceleration;

let x = 0 + rectRadius;
let y = 0 + rectRadius;

function debug() {
    console.log(x_velocity, y_velocity, x_acceleration, y_acceleration);
}

function physics() {
    if (0 <= x + x_velocity - rectRadius && x + x_velocity + rectRadius <= canvas.clientWidth) {
        x += x_velocity;
    }
    else {
        x_velocity = -x_velocity;
    }
    if (0 <= y + y_velocity - rectRadius && y + y_velocity + rectRadius <= canvas.clientHeight) {
        y += y_velocity;
    }
    else {
        y_velocity = -y_velocity;
    }
    x_velocity += x_acceleration;
    y_velocity += y_acceleration;
}

function renderFrame() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    
    ctx.beginPath();
    ctx.arc(x, y, rectRadius, 0, 2 * Math.PI, false);
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    ctx.fill();
    ctx.closePath();

    physics();

    debug();
}

document.addEventListener("keydown", keydownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keydownHandler(event) {
    if (event.key == 'Right' || event.key == 'ArrowRight') x_acceleration += controlPower;
    if (event.key == 'Left' || event.key == 'ArrowLeft') x_acceleration -= controlPower;
    if (event.key == 'Up' || event.key == 'ArrowUp') y_acceleration -= controlPower;
    if (event.key == 'Down' || event.key == 'ArrowDown') y_acceleration += controlPower;
}

function keyUpHandler(event) {
    if (event.key == 'Right' || event.key == 'ArrowRight') x_acceleration = x_original_acceleration;
    if (event.key == 'Left' || event.key == 'ArrowLeft') x_acceleration = x_original_acceleration;
    if (event.key == 'Up' || event.key == 'ArrowUp') y_acceleration = y_original_acceleration;
    if (event.key == 'Down' || event.key == 'ArrowDown') y_acceleration = y_original_acceleration;
}

setInterval(renderFrame, 1);