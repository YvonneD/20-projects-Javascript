const wordEl=document.getElementById('word')
const wordLettersEl=document.getElementById('wrong-letters')
const playAgainBtn=document.getElementById('play-button')
const popup=document.getElementById('popup-container')
const notification=document.getElementById('notification-container')
const finalMessage=document.getElementById('final-message')

const figureParts=document.querySelectorAll('.figure-part')
const words=['programming','baking','supermarket','fishing','air','filter','today','news']

let selectedWord=words[Math.floor(Math.random()*words.length)]
const correctLetters=[]
const wrongLetters=[]

function displayWord(){
    wordEl.innerHTML=
    `${selectedWord
        .split('')
        .map(letter=>`
         <span class="letter">
            ${correctLetters.includes(letter)?letter:''}
         </span>
        `).join('')
    }`
    const innerWord=wordEl.innerText.replace(/\n/g,'')
    if(innerWord===selectedWord){
        finalMessage.innerText='Congrats! You win'
        popup.style.display="flex"
    }
}
// update the wrong letters
function updateWrongLetterEl(){
    // display wrong letters
   wordLettersEl.innerHTML=`
    ${wrongLetters.length>0?'<p>wrong</p>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
   `    
//    display parts
   figureParts.forEach((part,index)=>{
       const errors=wrongLetters.length
       if(index<errors){
           part.style.display='block'
       }else{
           part.style.display='none'
       }
   })
//    check iflost
if(wrongLetters.length===figureParts.length){
    finalMessage.innerText='Unfortuately you lost'
    popup.style.display='flex'
}
}
// show notification
function showNotification(){
    notification.classList.add('show')
    setTimeout(()=>{
        notification.classList.remove('show')
    },2000)
}
// keydown
window.addEventListener('keydown',e=>{
    if(e.keyCode>=65&&e.keyCode<=90){
        const letter=e.key
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter)
                displayWord()
            }else{
                showNotification( )
            }
        }else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter)
                updateWrongLetterEl()
            }else{
                showNotification()
            }
        }
    }
})

function playAgain(){   
        //empty array
    correctLetters.splice(0)
    wrongLetters.splice(0)
    selectedWord=words[Math.floor(Math.random()*words.length)]
    displayWord()
    updateWrongLetterEl()
    popup.style.display='none'         
}

// play again
playAgainBtn.addEventListener('click',playAgain)
window.addEventListener('keydown',(e)=>{
    if(e.keyCode===13){
        playAgain()
    }
})

displayWord()