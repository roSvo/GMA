
//const { ftruncateSync } = require("fs");
//const { errorMonitor } = require("stream");

var JSONObject = null;

const EQUIPMENT     = 0;
const STATS         = 1;
const GUIDE         = 2;
const SKILLS        = 3;


function LoadJSON()
{
    console.log("I'm about to fetch json file");
    
    fetch("Items.json").then(data => 
    {
        return data.json();
    }).then(JSONdata => {
        JSONObject = JSONdata;
        //console.log("This is my json data : ", JSONObject.Equipment[0]);
    });    
}

function ShowElements()
{

    if (Array.isArray(JSONObject.Equipment))
    {
        console.log("This was an array!");
    }
    


    keys = Object.keys(JSONObject);
    keys.forEach(element => 
    {
        console.log("About to check if this element is an array", element);
        if(Array.isArray(JSONObject[element.toString()]))
        {
            JSONObject[element.toString()].forEach(SubElement =>
            {
                console.log(element, " in ", SubElement);
            })

            console.log("Found out that : ", element, " was an array");
        }
        else
        {
            console.log("This one tried to trick me : ", element, " was not an array!");
        }

            
    });


}

/*

function ShowList(tag, prevTag)

{    
    console.log("Tag: ", tag);

    let xhr = new XMLHttpRequest();
    
    var UnorderedList = document.getElementById(ItemList);
    
    if(prevTag == null && HistoryArray.length > 0)
    {
        HistoryArray.splice(HistoryArray.length - 1, 1);
    }
    
    xhr.open('GET', 'ShadowMain.json');

    var UnorderedList = document.getElementById("ItemList");
    UnorderedList.innerHTML = "";
{
    console.log("Tag : ", tag);

    if(prevTag == null && HistoryArray.length > 0)
    {
        HistoryArray.splice(HistoryArray.length - 1, 1);
    }

    fetch("Shadow" + tag + ".json").then(response => {
        return response.json();
    }).then(data => {
        

        console.log("Is this still possible? ", data[tag.toString()]);

        for (var i = 0; i < data[tag.toString()].length; i++)
        {
            console.log("Test element ", data[tag.toString()][i]);
            var item = document.createElement('li');
            var btn = document.createElement('button');

            btn.appendChild(document.createTextNode(data[tag.toString()][i]));
        var UnorderedList = document.getElementById("ItemList");
        UnorderedList.innerHTML = "";

        for (var i = 0; i < data[tag.toString()].length; i++)
        {  
            var id = data[tag.toString()][i];
            var idKeys = Object.keys(id);    

            idKeys.forEach(element => {
                
                var item = document.createElement('li');
                var btn = document.createElement('button');
                
                if(element == "Back")
                {
                    if(prevTag != null)
                    {
                        HistoryArray.push(prevTag);
                    }
                    
                    btn.setAttribute("id", "Back");
                    btn.addEventListener("click", function() { ShowList(HistoryArray[(HistoryArray.length - 1)], null)});
                }
                else
                {
                    btn.setAttribute("id", element);
                    console.log(btn.getAttribute("id"));
                    btn.addEventListener("click", function() { ShowList(btn.getAttribute("id"), tag)});  
                }

                //TODO CREATE ANOTHE FUNCTION WHICH OUTPUTS THE ACTUAL DATA!

                btn.innerHTML = btn.getAttribute("id");
                item.appendChild(btn);
                UnorderedList.appendChild(item);
            })
        }
    }).catch(err => {
        alert("Error has occured");
    })
    
}
    */
