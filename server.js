const http  = require('http');
const fs = require('fs');
const path = require('path');


const httpServer = http.createServer(requestResponseHandler);
console.log("Server running on port 3000");
httpServer.listen(3000);


function requestResponseHandler(request, response)
{
  console.log(`Request came: ${request.url}`);
  
  switch(request.url)
  {
    //Home page:
    case '/':
    {
      //Send html
      sendResponse('public/html/home.html', 'text/html', response);
      break;
    }
    case '/home.css':
    {
      //Send css
      sendResponse('public/css/home.css', 'text/css', response);
      break;
    }

    //Shadowrun page:
    case '/shadowrun':
    {
      //Send html
      sendResponse('public/html/shadow.html', 'text/html', response);
      break;
    }
    case '/shadowrun.css':
    {
      //Send css
      sendResponse('public/css/shadow.css', 'text/css', response);
      break;
    }
    case '/ShadowBackground.jpg':
    {
      //Send background image
      sendResponse('public/images/ShadowBackground.jpg', 'text/jpg', response);
      break;
    }
    case '/shadow.js':
    {
      //Send public javaScript file
      sendResponse('public/js/shadow.js', 'text/javascript', response);
      break;
    }
    case '/Armory.json':
    {
      sendResponse('public/data/shadow/Armory.json', 'application/json', response);
      break;
    }
    case '/ShadowMain.json':
    {
      sendResponse('public/data/shadow/Main.json', 'application/json', response);
      break;
    }
    case '/ShadowGuide.json':
    {
      sendResponse('public/data/shadow/Guide.json', 'application/json', response);
      break;
    }
    case '/ShadowSkills.json':
    {
      sendResponse('public/data/shadow/Skills.json', 'application/json', response);
      break;
    } 
    case '/ShadowStats.json':
    {
      sendResponse('public/data/shadow/Stats.json', 'application/json', response);
      break;
    }
    case '/ShadowArmory.json':
    {
      sendResponse('public/data/shadow/Armory.json', 'application/json', response);
      break;
    } 
    case '/ShadowWeapons.json':
    {
      sendResponse('public/data/shadow/Weapons.json', 'application/json', response); 
      break;
    }

    //Dungeons and dragon page
    case '/dungeon':
    {
      //Send html
      sendResponse('public/html/dungeon.html', 'text/html', response);
      break;
    }
    case '/dungeon.css':
    {
      //Send css
      sendResponse('public/css/dungeon.css', 'text/css', response);
      break;
    }

    default:
    {
      console.log("default was called..")
      sendResponse(request.url, getContentType(request.url), response);
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