import WebSocket from 'ws';
import { decodeMessage } from './net/sec/ws.js';
import send from './net/ws/send.js';
import { wsRouteTypes } from './routes/ws.js';

const ws = new WebSocket('ws://localhost:8000');

ws.on('open', function open() {
    ws.send('something');
    send(ws, {World: "hello"}, wsRouteTypes.HistoryUpdate);
});

ws.on('message', function incoming(data) {
  console.log(data);
  const decoded = decodeMessage(data);
  console.log(decoded);
  setTimeout(() => {
    ws.send("Response")
  }, 100);
  setTimeout(() => {
    ws.send(data);
  }, 200);
});