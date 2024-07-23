const express = require("express");
const fs = require('fs');
const zlib = require('zlib')

const app = express()

fs.createReadStream('./large-dummy-file.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream('./sample.zip')))


app.get("/" , (req,resp)=>{
// fs.readFile("./large-dummy-file.txt" , (err,data)=>{   One way to read the file
// resp.end(data) 
// })

const stream = fs.createReadStream("./large-dummy-file.txt" , 'utf-8');
stream.on("data" , (chunk)=> resp.write(chunk));
stream.on("end" , ()=>resp.end())
})

app.listen(3000 , ()=>{
    console.log("Server is listening on port 3000")
})


///Node Js with Cluster for scaling and balancing work load 
// const express = require('express')
// const cluster = require('cluster')
// const os = require("os")

// const cpulength = os.cpus().length;

// if (cluster.isPrimary) {
//     console.log("Master Process is running : " + process.pid)
//     for (let i = 0; i < cpulength; i++) {
//         cluster.fork()
//     }

//     cluster.on("exit", (worker, code, signal) => {
//         console.log("Worker has died : " + worker.process.pid)
//         cluster.fork()
//     })
// }
// else {
   
//     const app = express()

//     app.get("/", (req, resp) => {
//         resp.send(`Hello World ${process.pid}`)
//     })

//     app.listen(3000, () => {
//         console.log(`Server is listening on port 3000 ${process.pid}`)
//     })
// }