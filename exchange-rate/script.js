const currentcyEl_1=document.getElementById("currency1")
const currentcyEl_2=document.getElementById("currency2")
const amountEl_1=document.getElementById('amount1')
const amountEl_2=document.getElementById('amount2')
const rateEl=document.getElementById('rate')
const swap=document.getElementById("swap")

//fetch api and update dom
function calculate(){
    const currency_one=currentcyEl_1.value
    const currency_two=currentcyEl_2.value
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`).then(res=>res.json()).then(data=>{
        const rate=data.rates[currency_two]
        rateEl.innerText=`1 ${currency_one}=${rate} ${currency_two}`
        amountEl_2.value=(amountEl_1.value*rate).toFixed(2)
    })
}

currentcyEl_1.addEventListener('change',calculate)
amountEl_1.addEventListener('input',calculate)
currentcyEl_2.addEventListener('change',calculate)
amountEl_2.addEventListener('input',calculate)
swap.addEventListener('click',()=>{
    const temp=currentcyEl_1.value
    currentcyEl_1.value=currentcyEl_2.value
    currentcyEl_2.value=temp
    calculate()
    amountEl_2.style.transform='scale(1.3)'
})

calculate()