const main=document.getElementById('main')
const addUser=document.getElementById('add_user')
const doubleMoney=document.getElementById('double')
const millionairesPerson=document.getElementById('millionaires')
const sortedList=document.getElementById('sort')
const calculateTotal=document.getElementById('calculate')

let data=[]

const proxy='https://cors-anywhere.herokuapp.com/'
 // 
//fetch random user and money
async function getRandomUser(){     
    const url='https://randomuser.me/api/'
    const res=await fetch(url, {
        mode: 'cors'
        })
    const data=await res.json()
    const user=data.results[0]
    console.log(data)
    const newUser={
        name:`${user.name.first} ${user.name.last}`,
        money:Math.floor(Math.random()*1000000)
    }
    addData(newUser)
}
//total wealth
function totalWealth(){
    const total=data.reduce((acc,user)=>(acc+=user.money),0)
    const totalEl=document.createElement('div')
    totalEl.innerHTML=`<h3>Total wealth:<strong>${formatMoney(total)}</strong></h3>`
    main.appendChild(totalEl)
}
//millionaires only
function millionairesOnly(){
    data=data.filter(user=>user.money>1000000)
    updateDOM()
}
//sort lisit
function sortList(){
    data.sort((a,b)=>b.money-a.money)
    updateDOM()
}
//double money
function doubleUserMoney(){
    data=data.map(user=>{
        return {...user,money:user.money*2}
    })
    updateDOM()
}

//add new object to data arr
function addData(obj){
    data.push(obj)
    updateDOM()
}
//update dom
function updateDOM(providedData=data){
    //clear main div
    main.innerHTML='<h2><strong>Person</strong> wealth</h2>'
    providedData.forEach(item=>{
        const element=document.createElement('div')
        element.classList.add('person')
        element.innerHTML=`<strong>${item.name}</strong>${formatMoney(item.money)}`
        main.appendChild(element)
    })
}
//format money
function formatMoney(number){
    return '$'+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event
addUser.addEventListener('click',getRandomUser)
doubleMoney.addEventListener('click',doubleUserMoney)
sortedList.addEventListener('click',sortList)
millionairesPerson.addEventListener('click',millionairesOnly)
calculateTotal.addEventListener('click',totalWealth)