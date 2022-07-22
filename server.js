const http  = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('path');


var prefix = "";
const DataPath = "public/data/";

const requestResponseHandler = (IncomingMessage, ServerResponse) =>
{
  let MessageRequest = IncomingMessage.url.split("/");
  
  let RequestDirectory = parseSpace(MessageRequest[1]);
  let RequestFile = parseSpace(MessageRequest[2]);
  
  //There might be a way to do it with this.. 
  //Just case inside Request Directory.

  console.log("REQUEST DIRECTORY : ", RequestDirectory);
  console.log("REQUEST FILE : ", RequestFile);

  console.log("COMBINATION : ", prefix + RequestDirectory);

  //TODO : FIX prefix to work even if home page is loaded from shadowrun (or any other) page,
  //atm it requires F5 to refresh home..
  let URL = RequestDirectory
  
  if(prefix != null)
  {
    URL = prefix + RequestDirectory;
  }
   
  switch(URL)
  {
    //Home page:
    case '':
    {
      //Send html
      prefix = "";
      sendResponse('public/html/home.html', 'text/html', ServerResponse);
      break;
    }
    case 'home.css':
    {
      //Send css
      sendResponse('public/css/home.css', 'text/css', ServerResponse);
      break;
    }

    //SHADOWRUN PAGE:
    //------------------------------------------------------------------------------------
    case 'shadowrun':
    {
      //Send html
      prefix = "Shadowrun";
      sendResponse('public/html/shadowrun.html', 'text/html', ServerResponse);
      break;
    }
    case 'Shadowrunshadowrun.css':
    {
      //Send css
      sendResponse('public/css/shadowrun.css', 'text/css', ServerResponse);
      break;
    }
    case 'ShadowrunShadowBackground.jpg':
    {
      //Send background image
      sendResponse('public/images/ShadowsBackground.jpg', 'text/jpg', ServerResponse);
      break;
    }
    case 'ShadowrunListItems.js':
    {
      //Send public javaScript file
      sendResponse('public/js/ListItems.js', 'text/javascript', ServerResponse);
      break;
    }
    case 'ShadowrunMain':
    {
      //'Back' case
      if(RequestFile == null || RequestFile == 'Main')
      {
        sendResponse('/public/data/Shadowrun/Main.json', 'application/json', ServerResponse);
        break;
      }
      else
      {
        sendResponse('/public/data/' + prefix + '/' + RequestDirectory + "/" + RequestFile + '.json', 'application/json', ServerResponse);
        break;
      }
    }
    case 'ShadowrunGuide':
    {
      //TODO, NOT RequestDirectory + RequestFile should work dynamically
      //'Back' case
      if(RequestFile == 'Guide')
      {
        sendResponse('/public/data/Shadowrun/Main/Guide.json', 'application/json', ServerResponse)
        break;
      } 
      else
      {
        sendResponse('/public/data/' + prefix + '/' + RequestDirectory + "/"  + RequestFile + '.json', 'application/json', ServerResponse);
        break;
      }
    }
    case 'ShadowrunStats':
    {
      //TODO, NOT RequestDirectory + RequestFile should work dynamically
      //'Back' case
      if(RequestFile == 'Stats')
      {
        sendResponse('/public/data/Shadowrun/Main/Stats.json', 'application/json', ServerResponse)
        break;
      } 
      else
      {
        sendResponse('/public/data/' + prefix + '/' + RequestDirectory + "/"  + RequestFile + '.json', 'application/json', ServerResponse);
        break;
      }
    }
    case 'ShadowrunSkills':
    {
      //TODO, NOT RequestDirectory + RequestFile should work dynamically
      //'Back' case
      if(RequestFile == 'Skills')
      {
        sendResponse('/public/data/Shadowrun/Main/Skills.json', 'application/json', ServerResponse)
        break;
      } 
      else
      {
        sendResponse('/public/data/' + prefix + '/' + RequestDirectory + "/"  + RequestFile + '.json', 'application/json', ServerResponse);
        break;
      }
    }
    case 'ShadowrunEquipment':
    {
      //TODO, NOT RequestDirectory + RequestFile should work dynamically
      //'Back' case
      if(RequestFile == 'Equipment')
      {
        sendResponse('/public/data/Shadowrun/Main/Equipment.json', 'application/json', ServerResponse)
        break;
      } 
      else
      {
        sendResponse('/public/data/' + prefix + '/' + RequestDirectory + "/"  + RequestFile + '.json', 'application/json', ServerResponse);
        break;
      }
    }
    //------------------------------------------------------------------------------------
    
    
    //DUNGEON AND DRAGONS PAGE
    //------------------------------------------------------------------------------------
    case 'dungeon':
    {
      //Send html
      prefix = "Dungeon";
      sendResponse('public/html/dungeon.html', 'text/html', ServerResponse);
      break;
    }
    case 'Dungeondungeon.css':
    {
      //Send css
      sendResponse('public/css/dungeon.css', 'text/css', ServerResponse);
      break;
    }
    case 'DungeondungeonBackground.jpg':
    {
      //Send background image
      sendResponse('public/images/DungeonBackgound.jpg', 'text/jpg', ServerResponse);
      break;
    }
    case 'DungeonListItems.js':
    {
      //Send public javaScript file
      sendResponse('public/js/ListItems.js', 'text/javascript', ServerResponse);
      break;
    }
    case 'DungeonMain':
      {
        //'Back' case
        if(RequestFile == null || RequestFile == 'Main')
        {
          sendResponse('/public/data/dungeon/Main.json', 'application/json', ServerResponse);
          break;
        }
        else
        {
          sendResponse('/public/data/' + prefix + '/' + RequestDirectory + "/" + RequestFile + '.json', 'application/json', ServerResponse);
          break;
        }
      }
    

    default:
    {
      console.log("MACIG DEFAULT");
      sendResponse('public/data/' + prefix + '/' + RequestDirectory + '/' + RequestFile + '.json', 'application/json', ServerResponse);
      break;

      //prefix = "";
      //console.log("default was called, not ready yet..");
      //sendResponse(IncomingMessage.url, getContentType(IncomingMessage.url), ServerResponse);
      //break;
    }
    //------------------------------------------------------------------------------------


  }
}

function parseSpace(stringMessage)
{
  if(stringMessage != null)
  {
    let returnMessage = "";
    let temp = stringMessage.split("%20");
    
    returnMessage = temp[0];
    for(let index = 1; index < temp.length; index++)
    {
      returnMessage += " " + temp[index];  
    }
    
    return returnMessage;
  }

  return stringMessage;
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