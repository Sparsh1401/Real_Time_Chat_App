const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());

const io = new Server(server,{
    //this will allow backend to trust our frontend source
    cors:{
        origin:"http://localhost:3000/",
        method:["GET","POST"]
    }
})

io.on("connection",(socket) => {console.log('User connected' + " " + `${socket.id}`)

    socket.on("join_room",(data) => {
        let roomId = data;
        socket.join(roomId);
        console.log(roomId);
    })

    socket.on("disconnect",()=>{
        console.log(`User got disconnected ${socket.id}`)
    })

    socket.on("send_mssg",(data) => {
        socket.to(data.roomId).emit("recieve_mssg",data.message);
    })

});

server.listen(3001, () => {
    console.log(`Server is listening on port: 3001`);
})