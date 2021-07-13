//NODE SERVER
const io = require('socket.io')(8000);
const users = {};
io.on('connection',socket=>{
    console.log( socket.client.conn.server.clientsCount + " users connected" );
    console.log(io.sockets.sockets.length);
    // WHEN USER JOINS
    socket.on('new-user-joined',name=>{
        console.log(socket.id)
        users[socket.id] = name;
        // users.push( name );
        // console.log(users.length)
        let data = {'total':socket.client.conn.server.clientsCount,'name':name}
        console.log(`${data.total} ${data.name} `)
        if(name != null){
            socket.broadcast.emit('user-joined',data)
        }        
    });
    // WHEN USER SENDS MESSAGE
    socket.on('send',data=>{
        console.log(`${data.message} ${data.username}`)
        socket.broadcast.emit('received',`${data.username}: ${data.message}`)
    });

    socket.on('disconnect',data=>{
        if(data.username != null){
            console.log(`${data.message} ${data.username}`)
            socket.broadcast.emit('left',users[socket.id]);
            delete users[socket.id];
        }        
    });    
})