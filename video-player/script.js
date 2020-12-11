const video=document.getElementById('video')
const play=document.getElementById('play')
const stop=document.getElementById('stop')
const progress=document.getElementById('progress')
const timestamp=document.getElementById('timestamp')

//play and pause
function toggleVideoStatus(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}

//update icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML='<i class="fa fa-play fa-2x"></i>'
        screen
    }else{
        play.innerHTML='<i class="fa fa-pause fa-2x"></i>'
    }
}

//update progress
function updateProgress(){
    progress.value=(video.currentTime/video.duration)*100
    //get minutes
    let min=Math.floor(video.currentTime/60)
    if(min<10){
        min='0'+String(min)
    }
    let sec=Math.floor(video.currentTime%60)
    if(sec<10){
        sec='0'+String(sec)
    }
    timestamp.innerHTML=`${min}:${sec}`
}

//set video time to progree
function setVideoProgress(){
    video.currentTime=(progress.value*video.duration)/100
};

//stop video
function stopVideo(){
    video.currentTime=0
    video.pause()
}

//event listener
video.addEventListener('click',toggleVideoStatus)
video.addEventListener('pause',updatePlayIcon)
video.addEventListener('play',updatePlayIcon)
video.addEventListener('timeupdate',updateProgress)

play.addEventListener('click',toggleVideoStatus)
stop.addEventListener('click',stopVideo)
progress.addEventListener('change',setVideoProgress)