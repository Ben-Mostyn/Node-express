const http = require('http');
const port = 5000;

const server = http.createServer((req,res) => {
    const path = req.url;
    if(path === '/') {
        res.end('Home page');
        return
    }
    if(path === '/about') {
        // Blocking code
        for (let i = 0; i<1000; i++){
          for (let j = 0; j<1000; j++){
            console.log(j, i);
        }  
        }
        res.end('about page')
        return
    }

    res.end('Error no content for this page')
})

server.listen(port, () => {
    console.log(`server is listening on port:${port}`)
})