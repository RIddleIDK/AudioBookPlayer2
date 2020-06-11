let audio = new Audio('audioFile.mp3' 
    /* <- название файла аудио / <- name audio file */ ); 

window.onload = function() {
    //delete localStorage.key('audoiLSTime');

    // -------------------------- all time block --------------------------
    let audioAllTimeNum = audio.duration.toFixed(1);
        // эта вещь для округления / this thing for rounding

    let hoursAudio   = Math.floor(audioAllTimeNum / 3600);
    let minutesAudio = Math.floor((audioAllTimeNum - (hoursAudio * 3600)) / 60);
    let secondsAudio = audioAllTimeNum - (hoursAudio * 3600) - (minutesAudio * 60);

    if (hoursAudio   < 10) {hoursAudio   = "0" + hoursAudio}
    if (minutesAudio < 10) {minutesAudio = "0" + minutesAudio}
    if (secondsAudio < 10) {secondsAudio = "0" + secondsAudio}

    let allTimeHHMMSS = hoursAudio + ' : ' + minutesAudio + ' : ' + Math.floor(secondsAudio);
    
    document.getElementById('allTime').innerHTML = allTimeHHMMSS;

}

// =========================== scroll time audio ===========================

let audioNowTime;
let nowTimeHHMMSS;

let hoursAudioNow;
let minutesAudioNow;
let secondsAudioNow;
let secondsAudioNow2;

let nowTime = document.getElementById('nowTime');

//audioNowTime = localStorage.getItem('audoiLSTime');
if (localStorage.getItem('audoiLSTime') == null) {
    localStorage.setItem('audoiLSTime', audio.currentTime.toFixed(1));
}

console.log(localStorage.getItem('audoiLSTime'));

function nowTimeFun() {
    
    if (localStorage.getItem('audoiLSTime') == 0.0) {
        audioNowTime = audio.currentTime;
    } else {
        audioNowTime = localStorage.getItem('audoiLSTime');
        
    }
    
    localStorage.audoiLSTime = audio.currentTime;

    hoursAudioNow   = Math.floor(audioNowTime / 3600);
    minutesAudioNow = Math.floor((audioNowTime - (hoursAudioNow * 3600)) / 60);
    secondsAudioNow = audioNowTime - (hoursAudioNow * 3600) - (minutesAudioNow * 60);
    
    if (hoursAudioNow   <= 9) {hoursAudioNow   = '0' + hoursAudioNow}
    if (minutesAudioNow <= 9) {minutesAudioNow = '0' + minutesAudioNow}
    if (secondsAudioNow <= 9) {secondsAudioNow = '0' + secondsAudioNow.toFixed(0)}
    if (secondsAudioNow > 10) {secondsAudioNow = secondsAudioNow.toFixed(0)}
    
    console.log(secondsAudioNow);
    
    nowTimeHHMMSS = hoursAudioNow + ' : ' + minutesAudioNow + ' : ' + secondsAudioNow;
    
    nowTime.innerHTML = nowTimeHHMMSS;
    console.log(nowTimeHHMMSS); 
    
    //localStorage.key('audoiLSTime') = audio.currentTime;
    //audioNowTime = audio.currentTime;
}

// =========================== scroll time audio ===========================

const DTAllPB = document.getElementById('DistancTraveledAllProggressBar');

let setIntervalConst;   /* var for interval */

let formulaForWidth;
let formulaForWidthR;

//localStorage.setItem('test', 123);

function funInterval() {
    console.log(localStorage.getItem('audoiLSTime'));

    formulaForWidth = 100 * audio.currentTime / audio.duration;
    formulaForWidthR = formulaForWidth.toFixed(1);
    
    console.log(formulaForWidth + '  ' + formulaForWidthR);

    DTAllPB.style.width = formulaForWidthR + '%';
    console.log(DTAllPB.style.width);
    
    if (DTAllPB.style.width >= 100) {
        clearInterval(setIntervalConst);
    }

    nowTimeFun();

}

// =========================== scroll time audio ===========================

let numForPlayPause = 0;
let numForPlayPause2;

function clickPlay() {
    numForPlayPause++;
    numForPlayPause2 = numForPlayPause % 2;
    console.log(numForPlayPause2 + '   ' + numForPlayPause);

    if (numForPlayPause2 == 0) {
        clearInterval(setIntervalConst);
        audio.pause();
    } else {
        setIntervalConst = setInterval( () => funInterval(), 1000 );
        audio.play();
    }
}

// =========================== scroll time audio =========================== 

function scrollTimeButton(scrollTime) {
    audio.currentTime += scrollTime
    console.log(audio.currentTime);

    formulaForWidth = 100 * audio.currentTime / audio.duration;
    formulaForWidthR = formulaForWidth.toFixed(1);
    
    console.log(formulaForWidth + '  ' + formulaForWidthR);

    DTAllPB.style.width = formulaForWidthR + '%';

    nowTimeFun();
}