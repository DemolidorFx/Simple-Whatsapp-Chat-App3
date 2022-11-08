const express = require('express');
const app = express();
const port = process.env.PORT || 3000
const server = app.listen(port);
app.use(express.static('public'));
const socket = require('socket.io');
const io = socket(server);
const chat = {
    messages:[],
    color:{}
}
io.sockets.on('connection', (socket)=>{
    color = ['#d88deb', '#17c29c', '#fa6533', '#23d366', '#42c7b8', '#a5b337', '#fc9775', '#48a6fd', '#53bdeb', '#e26ab6','#fc9760', '#e26ab6', '#a791ff', '#ffbc38', '#f15c6d']
    const color_range = Math.floor(Math.random() * color.length);
    console.log('conectado')

    const userId = socket.id;
    chat.color[userId] = color[color_range];
    console.log(chat.color)
    socket.emit('currentMessages', chat)
    socket.on('message', sendMessage)
    function sendMessage(message, id, time_user){
        const lastMessage = chat.messages[chat.messages.length - 1]
        if(lastMessage){
            console.log(lastMessage)
            if(lastMessage.user_id == id){
                chat.messages.push({user_id:id, user_message:message, color:chat.color[id], row:true, time:time_user})
            }else{
                chat.messages.push({user_id:id, user_message:message, color:chat.color[id], row:false, time:time_user})
            }
        }else{
            chat.messages.push({user_id:id, user_message:message, color:chat.color[id], row:false, time:time_user})
        }
        const user_color = chat.color[id]
        const row = chat.messages[chat.messages.length - 1].row
        socket.broadcast.emit('sendMessage', message, id, user_color, row, time_user)
    }
});