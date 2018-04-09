import express from 'express';
import path from 'path';

const PORT = process.env.CLIENT_PORT || 3001;
const HOST = process.env.HOST || '0.0.0.0';
const IP = process.env.IP || HOST;
const HOSTPORT = '27017';

var app = express();

app.use(express.static(path.resolve(__dirname, './dist/public')));

app.get('*',(req,res)=>{res.sendFile(path.resolve(__dirname, './dist/index.html'))});

app.listen(PORT, ()=>console.log(`Client server running on port ${PORT}...` ));
