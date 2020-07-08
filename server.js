const http  = require('http');
const fs = require('fs');
const path = require('path');



const requestResponseHandler = (IncomingMessage, ServerResponse) =>
{
  console.dir(IncomingMessage.url);

  switch(IncomingMessage.url)
  {
    //Home page:
    case '/':
    {
      //Send html
      sendResponse('public/html/home.html', 'text/html', ServerResponse);
      break;
    }
    case '/home.css':
    {
      //Send css
      sendResponse('public/css/home.css', 'text/css', ServerResponse);
      break;
    }

    //Shadowrun page:
    case '/shadowrun':
    {
      //Send html
      sendResponse('public/html/shadow.html', 'text/html', ServerResponse);
      break;
    }
    case '/shadowrun.css':
    {
      //Send css
      sendResponse('public/css/shadow.css', 'text/css', ServerResponse);
      break;
    }
    case '/ShadowBackground.jpg':
    {
      //Send background image
      sendResponse('public/images/ShadowBackground3.jpg', 'text/jpg', ServerResponse);
      break;
    }
    case '/shadow.js':
    {
      //Send public javaScript file
      sendResponse('public/js/shadow.js', 'text/javascript', ServerResponse);
      break;
    }

    
    //Dungeons and dragon page
    case '/dungeon':
    {
      //Send html
      sendResponse('public/html/dungeon.html', 'text/html', ServerResponse);
      break;
    }
    case '/dungeon.css':
    {
      //Send css
      sendResponse('public/css/dungeon.css', 'text/css', ServerResponse);
      break;
    }

    default:
    {
      console.log("default was called..")
      sendResponse(IncomingMessage.url, getContentType(IncomingMessage.url), ServerResponse);
      break;
    }
    
  }
}

function sendResponse(url, contentType, res)
{
  let file = path.join(__dirname, url);
  fs.readFile(file, (err, content) => {
    if(err)
    {
      res.writeHead(404);
      res.write(`File '${file}' Not Found!`);
      res.end();
      console.log(`Response: 404 ${file}, err`);
    }else
    {
      res.writeHead(200, {'Content-Type': contentType});
      res.write(content);
      res.end();
      console.log(`Response: 200 ${file}`);
    }
  })
}


function getContentType(url)
{
  switch (path.extname(url)) 
  {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'text/javascript';
    case '.json':
      return 'application/json';
    default:
      return 'application/octate-stream';
  }
}

const httpServer = http.createServer();

console.log("Server running on port 3000");
httpServer.listen(3000);

httpServer.on('request', requestResponseHandler);