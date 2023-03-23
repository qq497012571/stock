
<script src="https://cdn.bootcdn.net/ajax/libs/socket.io/2.3.0/socket.io.js"></script>
<script>
    var socket = io('ws://localhost:9502/', {
        transports: ["websocket"]
    });
    socket.on('connect', data => {
        socket.emit('event', 'hello, hyperf', console.log);
        socket.emit('join-room', 'room1', console.log);
        setInterval(function() {
            socket.emit('say', '{"room":"room1", "message":"Hello Hyperf."}');
        }, 1000);
    });
    socket.on('event', console.log);
</script>
