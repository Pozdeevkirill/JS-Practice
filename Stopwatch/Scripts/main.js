//Laps
const laps__holder = document.querySelector('#laps').querySelector('ul');

//Timer
const hours = document.querySelector('#hour');
const minuts = document.querySelector('#min');
const seconds = document.querySelector('#seconds');
const miliSecond = document.querySelector('#miliSecond');

//Buttons
const starStop_btn = document.querySelector('#StartStop');
const starStop_btn_text = starStop_btn.querySelector('.btn_text');

const lap_btn = document.querySelector('#Lap');
const lap_btn_text = lap_btn.querySelector('.btn_text');

let isStart = false;

let h = 0;
let m = 0;
let s = 0;
let ms = 0;

let interval = null;

let laps = [];

lap_btn.addEventListener('click', ResetTime);

starStop_btn.addEventListener('click', () => {

    isStart = !isStart;
    if (isStart) {
        //Кнопка старт/стоп (Start/Stop button)
        starStop_btn.classList.remove('start_border');
        starStop_btn.classList.add('stop_border');

        starStop_btn_text.classList.remove('start');
        starStop_btn_text.classList.add('stop');
        starStop_btn_text.innerHTML = 'Stop';

        //Кнопка сброс/круг (Reset/Lap button)
        lap_btn_text.innerHTML = 'Lap';
        lap_btn.removeEventListener('click',ResetTime);
        lap_btn.addEventListener('click', Lap);

        interval = setInterval(Stopwatch, 10);
    }
    else {
        //Кнопка старт/стоп (Start/Stop button)
        starStop_btn.classList.remove('stop_border');
        starStop_btn.classList.add('start_border');

        starStop_btn_text.classList.remove('stop');
        starStop_btn_text.classList.add('start');
        starStop_btn_text.innerHTML = 'Start';

        //Кнопка сброс/круг (Reset/Lap button)
        lap_btn_text.innerHTML = 'Reset';
        lap_btn.removeEventListener('click',Lap);
        lap_btn.addEventListener('click', ResetTime);

        clearInterval(interval);
    }
});

function Stopwatch() {
    ms++;
    if (ms === 100) {
        ms = 0;
        s += 1;
    }
    if (s === 60) {
        s = 0;
        m += 1
    }
    if (m === 60) {
        m = 0;
        h += 1;
    }

    DisplayTime(h, m, s, ms);
}

function DisplayTime(_h, _m, _s, _ms) {
    const result = ConvertTimeToText(_h,_m,_s,_ms);

    hours.innerHTML = result.h;
    minuts.innerHTML = result.m;
    seconds.innerHTML = result.s;
    miliSecond.innerHTML = result.ms;
}

function ConvertTimeToText(_h, _m, _s, _ms) {
    const result = {
        h: _h < 10 ? `0${_h}:` : `${_h}:`,
        m: _m < 10 ? `0${_m}:` : `${_m}:`,
        s: _s < 10 ? `0${_s}.` : `${_s}.`,
        ms: _ms < 10 ? `0${_ms}` : _ms,
    }
    
    return result
}

function Lap() {
    const result = ConvertTimeToText(h, m, s, ms);
    let lap = {
        id: laps.length ,
        time: `${result.h}${result.m}${result.s}${result.ms}`,
    }

    laps.push(lap);

    let lapElement = document.createElement('li');
    lapElement.id = laps.length + 1;
    lapElement.innerHTML = `
        <span>Lap ${+laps[lap.id].id + 1}</span>
        <span>${laps[lap.id].time}</span>
    `;
    laps__holder.append(lapElement);


    console.log('lap');
}

function ResetTime() {
    h = 0;
    m = 0;
    s = 0;
    ms = 0;
    DisplayTime(h, m, s, ms);

    laps = [];
    laps__holder.innerHTML = '';
}