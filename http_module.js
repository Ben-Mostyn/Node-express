const https = require('http');

const server = https.createServer((req, res) => {
    if(req.url === '/'){
        res.write('welcome to our homepage');
        // This closes the stream with an optional final bit of data instead of using res.write
        res.end('Here is some extra "data"') 
    }
    if(req.url === '/about'){
        res.end('Welcome to our about page') 
    }
    if(req.url === '/contact-us'){
        res.end('Welcome to our contact us page') 
    }

    res.end(`
        
        <h1>Error, please try again </h1>
        <a href='/'>Go to homepage </a>
        `)
    
});

server.listen(5000);