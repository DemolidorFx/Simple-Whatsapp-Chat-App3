
 var message = document.getElementById('input_message')
 const socket = io.connect();
 const content = document.getElementById('content')
 const btn = document.getElementById('send')
 const currentdate = new Date();
 var hour
 var userId
 const chat = {
     users:{}
 }
 socket.on('connect', setUserId)
 socket.on('sendMessage', sendMessage)
 socket.on('currentMessages', currentState)

 function currentState(chat){
     for(messages in chat.messages){
        const time = chat.messages[messages].time
         const id = chat.messages[messages].user_id
         const row = chat.messages[messages].row
         const message = chat.messages[messages].user_message
         const color = chat.messages[messages].color
         sendMessage(message, id, color, row, time)
     }
 }

 function setUserId(){
     userId = socket.id
     chat.users[userId] = userId
     console.log(chat.users)
 }

 btn.addEventListener('touchend', e=>{
    var hour = currentdate.getHours()
        if(hour.toString().length == 1){
            var time = '0'+hour + ":" + currentdate.getMinutes()
        }else{
            var time = hour + ":" + currentdate.getMinutes()
        }
     if(message.value !== ''){
        const row = null
        const user_color = null
         sendMessage(message.value, userId, user_color, row, time)
         socket.emit('message', message.value, userId, time)
         message.value = "";
     }
     e.preventDefault()
 })

 btn.addEventListener('click', e=>{
    var hour = currentdate.getHours()
    if(hour.toString().length == 1){
        var time = '0'+hour + ":" + currentdate.getMinutes()
    }else{
        var time = hour + ":" + currentdate.getMinutes()
    }
     if(message.value !== ''){
        const row = null
        const user_color = null
         sendMessage(message.value, userId, user_color, row, time)
         socket.emit('message', message.value, userId, time)
         message.value = "";
     }
     e.preventDefault()
     
 })
 function enter(){
        var hour = currentdate.getHours()
        if(hour.toString().length == 1){
            var time = '0'+hour + ":" + currentdate.getMinutes()
        }else{
            var time = hour + ":" + currentdate.getMinutes()
        }
    console.log(time)
     if(message.value !== ''){
        const row = null
        const user_color = null
         sendMessage(message.value, userId, user_color, row, time)
         socket.emit('message', message.value, userId, time)
         message.value = "";
     }
 }

 function sendMessage(message, user, color, row, time){
    append_message = document.createElement('div')
    append_message.classList = 'in'
    console.log(time)
    if(user !== userId){
        if(!row){
            append_message.style = "margin-top:10px;"
            append_message.innerHTML = `<span class='message'>
            <a class='name' style='color:${color};'>${user}</a><br>
            <a>${message}</a>
                <a class='time'>${time}</a>
            </span>`
        }else{
            append_message.innerHTML = `<span class='message'>
            <a>${message}</a>
                <a class='time'>${time}</a>
        </span>`
        }
    }else{
        append_message.classList = 'out'
        append_message.innerHTML = `<span class='message user'>
        <a>${message}</a>
                <a class='time'>${time}</a>
        </span>`
    }
    content.append(append_message)
    append_message.scrollIntoView();
 }
