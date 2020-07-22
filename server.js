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

    //SHADOWRUN PAGE:
    //------------------------------------------------------------------------------------
    case '/shadowrun':
    {
      //Send html
      sendResponse('public/html/shadowrun.html', 'text/html', ServerResponse);
      break;
    }
    case '/shadowrun.css':
    {
      //Send css
      sendResponse('public/css/shadowrun.css', 'text/css', ServerResponse);
      break;
    }
    case '/ShadowBackground.jpg':
    {
      //Send background image
      sendResponse('public/images/ShadowsBackground.jpg', 'text/jpg', ServerResponse);
      break;
    }
    case '/shadowrun.js':
    {
      //Send public javaScript file
      sendResponse('public/js/shadowrun.js', 'text/javascript', ServerResponse);
      break;
    }
    case '/ShadowRunMain.json':
    {
      sendResponse('public/data/Shadowrun/Main.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunSkills.json':
    {
      sendResponse('public/data/Shadowrun/Main/Skills.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunGuide.json':
    {
      sendResponse('/public/data/Shadowrun/Main/Guide.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunStats.json':
    {
      sendResponse('/public/data/Shadowrun/Main/Stats.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunEquipment.json':
    {
      sendResponse('/public/data/Shadowrun/Main/Equipment.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunArmor.json':
    {
      sendResponse('/public/data/Shadowrun/Equipment/Armor.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunWeapons.json':
    {
      sendResponse('/public/data/Shadowrun/Equipment/Weapons.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunBlades.json' :
    {
      sendResponse('/public/data/Shadowrun/Weapons/Blades.json', 'application/json',  ServerResponse);
      break;
    }

    //------------------------------------------------------------------------------------
    
    
    //DUNGEON AND DRAGONS PAGE
    //------------------------------------------------------------------------------------
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
    //------------------------------------------------------------------------------------


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