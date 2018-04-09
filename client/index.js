import express from 'express';
import path from 'path';

const CLIENT_PORT = process.env.CLIENT_PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';

var app = express();

app.use(express.static(path.resolve(__dirname, './dist/public')));

app.get('*',(req,res)=>{res.sendFile(path.resolve(__dirname, './dist/index.html'))});

app.listen(CLIENT_PORT, ()=>console.log(`Client server running on port ${CLIENT_PORT}...` ));
