// AUTHOR : daniellukonis

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

// HELPER FUNCTIONS
function radToDeg(rad){
    return Math.round(rad * 180 / Math.PI)
}

/// CANVAS PREP
function resizeCanvas(){
    const w = window.innerWidth - 10
    const h = window.innerHeight - 10
    w>h ? x = h : x = w;
    canvas.width = x
    canvas.height = x
    canvasCenter = Math.floor(canvas.width * 0.5)
    context.save()
    context.fillStyle = 'rgb(255,255,255)'
    context.fillRect(0,0,canvas.width,canvas.width)
    context.restore()
}
resizeCanvas()

/// HEAD SIZE VARIABLES
const baseHeadWidth = canvas.width / 3.5
const baseHeadHeight = baseHeadWidth
const baseChinWidth = baseHeadWidth / 2

const headWidthRange = baseChinWidth * 0.25
const headHeightRange = baseHeadHeight * 0.5
const chinWidthRange = baseChinWidth * 0.5

let headWidth = baseHeadWidth + headWidthRange
let headHeight = baseHeadHeight + headHeightRange
let chinWidth = baseChinWidth + chinWidthRange

function randomHead(){
headWidth = Math.round(baseHeadWidth + headWidthRange * fxrand())
headHeight = Math.round(baseHeadHeight + headHeightRange * fxrand())
chinWidth = Math.round(baseChinWidth + chinWidthRange * fxrand())
}
// randomHead()

/// EYE VARIABLES
const baseEyeWidth = baseHeadWidth * 0.15
const baseEyeHeight = baseHeadWidth * 0.35
const baseEyeAngle = 0
const eyeSeparation = headWidth * 0.45

const eyeWidthRange = baseEyeWidth * 0.25
const eyeHeightRange = baseEyeHeight * 0.25
const eyeAngleRange = 1

let eyeWidth = baseEyeWidth + eyeWidthRange
let eyeHeight = baseEyeHeight + eyeHeightRange
let eyeAngle = baseEyeAngle + eyeAngleRange

function randomEyes(){
eyeWidth = Math.round(baseEyeWidth + eyeWidthRange * fxrand())
eyeHeight = Math.round(baseEyeHeight + eyeHeightRange * fxrand())
eyeAngle = baseEyeAngle + eyeAngleRange * fxrand()
}
// randomEyes()

/// MOUTH VARIABLES
const baseMouthWidth = baseChinWidth
const baseMouthHeight = baseMouthWidth * 0.5
const baseMouthDistance = baseChinWidth * 1.5

const mouthWidthRange = baseMouthWidth * 0.5
const mouthHeightRange = baseMouthHeight * 0.75
const mouthDistanceRange = baseMouthDistance * 0.5

let mouthWidth = baseMouthWidth - mouthWidthRange
let mouthHeight = baseMouthHeight - mouthHeightRange
let mouthDistance = baseMouthDistance + mouthDistanceRange

function randomMouth(){
mouthWidth = Math.round(baseMouthWidth - mouthWidthRange * fxrand())
mouthHeight = Math.round(baseMouthHeight - mouthHeightRange * fxrand())
mouthDistance = Math.round(baseMouthDistance + mouthDistanceRange * fxrand())
}
// randomMouth()

/// HEAD ANGLES AND POSITIONS
let headFactor = headWidth-chinWidth
let acuteHeadAngle = Math.sin(headFactor / headHeight)
let complimentHeadAngle = Math.PI - Math.PI/2 - acuteHeadAngle
let heightAdjust = headWidth - ((headWidth+chinWidth+headHeight) / 2)

function postionAlien(){
    headFactor = headWidth-chinWidth
    acuteHeadAngle = Math.sin(headFactor / headHeight)
    complimentHeadAngle = Math.PI - Math.PI/2 - acuteHeadAngle
    heightAdjust = headWidth - ((headWidth+chinWidth+headHeight) / 2)
    context.translate(canvas.width/2,canvas.width/2 + heightAdjust)
    context.rotate(Math.PI/2)
}

///HEAD COLOR VARIABLES
let headColor = 'green'
let skinColor = 'green'

function randomGreenColor(){
    const gradient = context.createRadialGradient(-headWidth,0,0,0,0,headWidth*2);
    function randG(){return `rgb(0,${100*fxrand()+155},0)`}
    gradient.addColorStop(0, randG());
    gradient.addColorStop(0.5, randG());
    gradient.addColorStop(1, randG());
    headColor = gradient
    skinColor = 'green'
}
// randomGreenColor()

function randomGreyColor(){
    const gradient = context.createRadialGradient(-headWidth,0,0,0,0,headWidth*2);
    function randY(){
        const x = 100*fxrand()
        return `rgb(${x+100},${x+100},${x+100})`}
    gradient.addColorStop(0, randY());
    gradient.addColorStop(0.5, randY());
    gradient.addColorStop(1, randY());
    headColor = gradient
    skinColor = 'grey'
}
// randomGreyColor()

const rainbow = context.createRadialGradient(-headWidth,0,0,0,0,headWidth*2);
rainbow.addColorStop(0, 'red');
rainbow.addColorStop(1 / 6, 'orange');
rainbow.addColorStop(2 / 6, 'yellow');
rainbow.addColorStop(3 / 6, 'green');
rainbow.addColorStop(4 / 6, 'blue');
rainbow.addColorStop(5 / 6, 'indigo');
rainbow.addColorStop(1, 'violet');

function rarityColor(){
    const fx = fxrand()
    if(fx >= 0.5){
        randomGreenColor()
    }
    else if(fx >= 0.01){
        randomGreyColor()
    }
    else{
        headColor = rainbow
        skinColor = 'rainbow'
    }
}
// rarityColor()


/// DRAWING FUNCTIONS
function drawHead(){
    context.save()
    context.fillStyle = headColor
    context.strokeStyle = 'rgba(255,255,255,1)'
    context.shadowBlur = 5
    context.shadowColor = 'rgb(0,0,0)'
    context.lineWidth = 10
    context.beginPath()
    context.arc(headHeight,0,chinWidth,0,-complimentHeadAngle,true)
    context.arc(0,0,headWidth,-complimentHeadAngle,complimentHeadAngle,true)
    context.arc(headHeight,0,chinWidth,complimentHeadAngle,0,true)
    context.fill()
    context.stroke()
    context.restore()
}
// drawHead()



function drawEyes(){
    context.save()
    context.fillStyle = 'rgb(0,0,0)'
    context.strokeStyle = 'rgba(100,100,100,0.25)'
    context.shadowBlur = 5
    context.shadowColor = 'rgb(0,0,0)'
    context.lineWidth = 3
    context.beginPath()
    context.ellipse(0,-eyeSeparation,eyeWidth, eyeHeight,-eyeAngle, 0, Math.PI*2)
    context.fill()
    context.stroke()
    context.beginPath()
    context.ellipse(0,eyeSeparation,eyeWidth, eyeHeight,eyeAngle, 0, Math.PI*2)
    context.fill()
    context.stroke()
    context.restore()
}
// drawEyes()

function setFeatures(){
    window.$fxhashFeatures = {
        "head width": headWidth,
        "head height": headHeight,
        "chin width": chinWidth,
        "eye width": eyeWidth,
        "eye height": eyeHeight,
        "eye angle": radToDeg(eyeAngle),
        "mouth width": mouthWidth,
        "mouth height": mouthHeight,
        "mouth distance": mouthDistance,
        "mouth style": mouth,
        "skin color": skinColor,
    }
    console.log($fxhashFeatures)
}

function drawMouth(){
    context.save()
    context.fillStyle = 'rgb(0,0,0)'
    context.strokeStyle = 'rgba(0,0,0,0.25)'
    context.shadowBlur = 5
    context.shadowColor = 'rgb(0,0,0)'
    context.lineWidth = 3
    context.beginPath()
    context.ellipse(mouthDistance,0,mouthWidth,mouthHeight,Math.PI/2,0,Math.PI*2)
    context.fill()
    context.stroke()
    context.restore()
}
// drawMouth()

function drawSmile(){
    context.save()
    context.fillStyle = 'rgb(0,0,0)'
    context.strokeStyle = 'rgba(0,0,0,0.65)'
    context.shadowBlur = 5
    context.shadowColor = 'rgb(0,0,0)'
    context.lineCap = 'round'
    context.lineWidth = 10
    context.beginPath()
    context.ellipse(mouthDistance,0,mouthWidth,mouthHeight,Math.PI/2,Math.PI,0)
    context.stroke()
    context.restore()
}

function drawSmirk(){
    context.save()
    context.fillStyle = 'rgb(0,0,0)'
    context.strokeStyle = 'rgba(0,0,0,0.65)'
    context.shadowBlur = 5
    context.shadowColor = 'rgb(0,0,0)'
    context.lineCap = 'round'
    context.lineWidth = 10
    context.beginPath()
    if(fxrand()>=0.5){
        context.ellipse(mouthDistance,0,mouthWidth,mouthHeight,Math.PI/2,Math.PI,-Math.PI*0.4)
    }
    else{
        context.ellipse(mouthDistance,0,mouthWidth,mouthHeight,Math.PI/2,0.2,-Math.PI*0.6,true)
    }
    context.stroke()
    context.restore()
}

let mouth = 'smile'
function rarityMouth(){
    const fx = fxrand()
    if(fx >= 0.66){
        drawMouth()
        mouth = 'open'
    }
    else if(fx >= 0.33){
        drawSmile()
        mouth = 'smile'
    }
    else if(fx >= 0.01){
        drawSmirk()
        mouth = 'smirk'
    }
    else{
        mouth = 'none'
    }
}

/// FULL DRAW
function drawNgolien(){
    resizeCanvas()
    randomHead()
    randomEyes()
    randomMouth()
    rarityColor()
    postionAlien()
    drawHead()
    drawEyes()
    rarityMouth()
    setFeatures()
}

drawNgolien()

// setInterval(drawNgolien,'1000')

window.addEventListener('resize', ()=>{
    location.reload()
})

  