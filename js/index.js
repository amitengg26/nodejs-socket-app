const socket = io('https://nodejs-socketchatapp.herokuapp.com');
const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')
var audio = new Audio('./sounds/ting.mp3');

const append = (val,position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = val;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    messageContainer.append(msgElement  )
    if(position == 'left'){
        audio.play();
    }    
}

const notify = (val)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = val;
    msgElement.classList.add('notification');
    messageContainer.append(msgElement)
    audio.play();
}

    
const username = prompt('What is your name');
console.log('username',username)
if( username != null){
    socket.emit('new-user-joined',username)
}

// socket.emit('send','This is message from Amit')
socket.on('user-joined',data=>{
    console.log('data=>',data)
    notify(`${data.name} has joined conversation. Total users joined are ${data.total}`)
})
socket.on('received',data=>{
    console.log('data',data)
    append(data,'left')
})
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let message = 'You: '+messageInp.value;
    append(message,'right')
    // alert(message)    
    let data = {'message':messageInp.value,'username':username}
    socket.emit('send',data);
    messageInp.value = '';
})

socket.on('left',name=>{    
    notify(`${name} left the chat`,'left')
})