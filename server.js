const http  = require('http');
const fs = require('fs');
const path = require('path');


var Postfix = "";
const DataPath = "public/data/";

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
      Postfix = "Shadowrun/";
      sendResponse('public/js/shadowrun.js', 'text/javascript', ServerResponse);
      break;
    }
    case '/Main.json':
    {
      sendResponse('/public/data/Shadowrun/Main.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunSkills.json':
    {
      sendResponse('/public/data/Shadowrun/Main/Skills.json', 'application/json', ServerResponse);
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
    case '/Equipment.json':
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
    // --------
    case '/ShadowRunBlades.json' :
    {
      sendResponse('/public/data/Shadowrun/Weapons/Blades.json', 'application/json',  ServerResponse);
      break;
    }
    case '/ShadowRunBows.json' :
    {
      sendResponse('/public/data/Shadowrun/Weapons/Bows.json', 'application/json',  ServerResponse);
      break;
    }
    case '/ShadowRunClubs.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Clubs.json', 'application/json', ServerResponse);
      break;
    }
    case '/ShadowRunCrossbows.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Crossbows.json', 'application/json', ServerResponse);
      break;
    }    
    case '/ShadowRunTasers.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Tasers.json', 'applicaton/json', ServerResponse);
      break;
    } 
    case '/ShadowRunHold-Out%20Pistols.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Hold-Out Pistols.json', 'applicaton/json', ServerResponse);
      break;
    }
    case '/ShadowRunLight%20Pistols.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Light Pistols.json', 'applicaton/json', ServerResponse);
      break;
    }
    case '/ShadowRunHeavy%20Pistols.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Heavy Pistols.json', 'applicaton/json', ServerResponse);
      break;
    }
    case '/ShadowRunMachine%20Pistols.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Machine Pistols.json', 'applicaton/json', ServerResponse);
      break;
    }
    case '/ShadowRunSubmachine%20Guns.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Submachine Guns.json', 'applicaton/json', ServerResponse);
      break;
    }
    case '/ShadowRunAssault%20Rifles.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Assault Rifles.json', 'applicaton/json', ServerResponse);
      break;
    }
    case '/ShadowRunSniper%20Rifles.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Sniper Rifles.json', 'applicaton/json', ServerResponse);
      break; 
    }
    case '/ShadowRunShotguns.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Shotguns.json', 'applicaton/json', ServerResponse);
      break; 
    }
    case '/ShadowRunMachine%20Guns.json':
    {
      sendResponse('/public/data/Shadowrun/Weapons/Machine Guns.json', 'applicaton/json', ServerResponse);
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
      console.log("default was called, not ready yet..");
      //sendResponse(IncomingMessage.url, getContentType(IncomingMessage.url), ServerResponse);
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