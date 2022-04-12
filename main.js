let currentTime=new Date()
render(currentTime)

g('#prevMonth').onclick=()=>{
    const beginningOfAMonth=new Date(currentTime.getFullYear(),currentTime.getMonth(),1)
    render(new Date(beginningOfAMonth-86400*1000))
}
g('#nextMonth').onclick=()=>{
    const beginningOfNextMonth=new Date(currentTime.getFullYear(),currentTime.getMonth()+1,1)
    render(beginningOfNextMonth)
}
g('#today').onclick=()=>{
    render(new Date())
}
//帮助函数
function g(selector){
    return   document.querySelector(selector)
}
function gs(selector){
    return document.querySelectorAll(selector)
}
function render(time){
    const year=time.getFullYear()
    const month=time.getMonth()+1

    initTime()
    generateDays()
    currentTime=time
    function initTime(){
        const time=g("#time")
        time.textContent=`${year}年${month}月`
    }
    function generateDays(){
        const date=g('#date')
        date.innerHTML=''
        const beginningOfAMonth=new Date(year,month-1,1)
        const weekday=beginningOfAMonth.getDay()
        const endOfMonth=new Date(new Date(year,month-1+1,1)-86400*1000)
        const lastDayOfTheMonth=endOfMonth.getDate()
        const endOfWeekDay=endOfMonth.getDay()
        const days=lastDayOfTheMonth
        const now=new Date()
        let selectedLi
        let n=0


//多少天
        for(let i=1;i<=days;i++){
            const li =document.createElement('li')
            li.textContent= i
            if(i===now.getDate() && year===now.getFullYear() && month=== now.getMonth()+1){
                li.classList.add('calendar-days-today')
            }
            li.onclick=()=> {
                if (selectedLi) {selectedLi.classList.remove('calendar-days-selected')}
                    li.classList.add('calendar-days-selected')
                    selectedLi = li
                }
            date.append(li)
            n+=1
        }
//铺垫月初
        let j=0
        if(j===weekday){
            for(let i=1;i<7;i++){
                const li=document.createElement('li')
                const d=new Date(beginningOfAMonth-86400*1000*i)
                li.textContent=d.getDate()
                date.prepend(li)
                li.classList.add('calendar-days-disabled')
                n+=1
            }
        }
        for(let i=1;i<weekday;i++){
            const li=document.createElement('li')
            const d=new Date(beginningOfAMonth-86400*1000*i)
            li.textContent=d.getDate()
            date.prepend(li)
            li.classList.add('calendar-days-disabled')
            n+=1
        }
//铺垫月末
        let i=endOfWeekDay+1
        for (let j=0;j<42-n;j++){
            const li=document.createElement('li')
            const delta=i-endOfWeekDay
            const d=new Date(endOfMonth-0+86400*1000*delta)
            li.textContent=d.getDate()
            date.append(li)
            li.classList.add('calendar-days-disabled')
            i++
        }
    }
}

