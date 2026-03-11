
let cards = document.querySelectorAll(".card")
let plyCard = document.querySelector(".ply-card")
let marge = document.querySelector(".marge")
let vlmRng = document.querySelector("#volume-range")
let vlmIco = document.querySelector(".vlm-lbl > i")
let currDur = document.querySelector(".curr-dur")
let timeline = document.querySelector("#timeline")
let totalDur = document.querySelector(".total-dur")
let like = document.querySelector(".fa-heart")
let repeat = document.querySelector(".repeat")
let priveas = document.querySelector(".priveas")
let forward = document.querySelector(".forward")
let vdoPlayer = document.querySelector(".video-player")
let windowIco = document.querySelector(".windowIco")
vdoPlayer.classList.add("disNone")
let songDt;
let music;
let prMusic;
let numOFCards;
let playIco = document.querySelector(".play")
let songArr = [{songname : "daylight" , src : "./songs/daylingt" , cover : "./base/daylight.jpg", singer : "devid khusnor"},
    {songname : "on-on" , src : "./songs/1.mp3" , cover : "./base/card1img.jpeg" , singer : "Denial Levi"},
    {songname : "warriyo" , src : "./songs/2.mp3" , cover : "./base/card2img.jpeg" , singer : "Laura Brehm"},
    {songname : "lost-sky" , src : "./songs/3.mp3" , cover : "./base/card3img.jpeg" , singer : "Chris Linton"},
    {songname : "janji" , src : "./songs/4.mp3" , cover : "./base/card4img.jpeg" , singer : "Johnning"},
    {songname : "deaf-kev" , src : "./songs/5.mp3" , cover : "./base/card5img.jpeg" , singer : "Glich hop"},
    {songname : "on-on" , src : "./songs/1.mp3" , cover : "./base/card6img.jpeg" , singer : "Denial Levi"}
]
let count = 0;
for(card of cards){
    let audio = card.querySelector("audio")
    audio.setAttribute(`id`,`${++count}`)
}
// Eventlistners: 
cards.forEach((card)=>{
    card.addEventListener("click" , (event)=>{
        music = card.querySelector("audio")
        playbarInfo()
        playTmLn()
    });
});
repeat.addEventListener("click",()=>{
    musicRep()
})
playIco.addEventListener("click",()=>{
    changeIco()
})
marge.addEventListener("click",()=>{
    marge.classList.toggle("opy-fl")
    marge.classList.toggle("opy-hlf")
})
vlmRng.addEventListener("input", (event)=>{
    let volume = vlmRng.value
    music.volume = volume/100
    vlmIco.classList.remove("fa-volume","fa-volume-low","fa-volume-xmark","fa-volume-high")
    if(volume==0){
        vlmIco.classList.add("fa-volume-xmark")
    }else if(volume<=30){
        vlmIco.classList.add("fa-volume-off")
    }else if(volume<=60){
        vlmIco.classList.add("fa-volume-low")
    }else if (volume>60){
        vlmIco.classList.add("fa-volume-high")
    }
})
like.addEventListener("click",()=>{
    like.classList.toggle("like")
})

forward.addEventListener("click",()=>{
    if(music){
        if (Number(music.id) < count){
            let nextMs = document.getElementById(`${Number(music.id) + 1}`)
            music = nextMs
            playbarInfo()
            playTmLn()
        }
        else {
            let nextMs = document.getElementById("1")
            music = nextMs
            playbarInfo()
            playTmLn()
        }
    }
})
priveas.addEventListener("click" , ()=>{
    if(music){
        if (Number(music.id) == 1){
            let nextMs = document.getElementById(`${count}`)
            music = nextMs
            playbarInfo()
            playTmLn()
        }
        else {
            let nextMs = document.getElementById(`${Number(music.id)-1}`)
            music = nextMs
            playbarInfo()
            playTmLn()
        }
    }
});
windowIco.addEventListener("click",()=>{
    windowIco.classList.toggle("opy-fl")
    windowIco.classList.toggle("opy-hlf")
})


// function: 

function changeIco(){
    if(music){
        if(playIco.classList.contains("fa-play")){
            music.play()
        }else if(playIco.classList.contains("fa-pause")){
            music.pause()
        }
        playIco.classList.toggle("fa-play")
        playIco.classList.toggle("fa-pause")
    };
}
function changeIcoByCard(){
    if(prMusic){
        prMusic.pause()
    }
    if(music){
        playIco.classList.replace("fa-play","fa-pause")
        music.play()
    }
}
function musicRep(){
    music.currentTime = 0;
    timeline.value = 0;
}
function playbarInfo(){
    vdoPlayer.classList.remove("disNone")
    for(song of songArr){
        if(song.src == music.getAttribute("src")){
            songDt = song
            music.volume = (vlmRng.value)/100
            music.currentTime = 0
            plyCard.children[0].src = `${songDt.cover}`
            plyCard.children[1].children[0].innerHTML = `${songDt.songname}`
            plyCard.children[1].children[1].innerHTML = `${songDt.singer}`
            changeIcoByCard()
            reset()
            prMusic = music
            break
        }
        
    }
}
function playTmLn(){
    music.addEventListener("timeupdate",()=>{
        let curr = music.currentTime
        let currMnt = Math.floor((curr/60))
        let currSec = Math.floor((curr%60))

        let totalMnt =  Math.ceil((curr - music.duration)/60)
        let totalSec =   Math.floor((music.duration - curr)%60)

        currDur.innerHTML = `${currMnt}:${currSec}`
        totalDur.innerHTML = `${totalMnt}:${totalSec}`

        let finesed = Math.floor(curr*100/music.duration)
        timeline.value = finesed

        timeline.addEventListener("input" , ()=>{
            let increase = Math.floor((music.duration*timeline.value)/100)
            music.currentTime = increase
    });
    
    if(curr == music.duration & timeline.value == 100){
        setTimeout(()=>{
            musicRep() 
            changeIcoByCard()
        },2000)
    }
});
}
function reset (){
    like.classList.remove("like")
    windowIco.classList.replace("opy-fl","opy-hlf")
    marge.classList.replace("opy-fl","opy-hlf")
}