
//const { ftruncateSync } = require("fs");
//const { errorMonitor } = require("stream");

const { isArray } = require("util");

function LoadJSON(Tag, PreviousTag)
{
    console.log("I'm about to fetch json file : ", Tag + ".json");
    
    if(Tag == 'Back')
    {
        console.log("Tag : ", Tag);
        console.log("Previous Tag : ", PreviousTag);

        Tag = PreviousTag;
    }

    fetch("ShadowRun" + Tag + ".json").then(data => 
    {
        return data.json();
    }).then(JSONdata => 
    {    
        //console.log("Tag : ", Tag.toString());
        //console.log("Previous Tag : ", PreviousTag.toString());
            
        if(Array.isArray(JSONdata[Tag.toString()]))
        {
            CreateListElements(JSONdata[Tag.toString()], PreviousTag);
        }
        else
        {
            CreateTableElements(JSONdata, Tag);
        }

    });
}    


function CreateListElements(JSONArray, Tag)
{
    var UnorderedList = document.getElementById("ItemList");
    UnorderedList.innerHTML = "";

    console.log("Tag : ", Tag)
    

    JSONArray.forEach(element =>
    {
        console.log("Element : ", element);
        let NewListItem = document.createElement('li');
        let NewButton = document.createElement('button');
                
        NewButton.setAttribute('id', element);
        
        NewButton.addEventListener("click", function() { LoadJSON(element, Tag) } );

        NewButton.innerHTML = NewButton.getAttribute("id");
        NewListItem.appendChild(NewButton);
        UnorderedList.appendChild(NewListItem);
    
    })    

}

function CreateTableElements(JSONData, Tag)
{
    console.log("Create Table Elements was called..." );
}


//DEPRICATED FUNCTION!!
function ShowElements(Tag, PreviousTag)
{
    keys = Object.keys(JSONObject);
    keys.forEach(element => 
    {
        JSONObject[element.toString()].forEach(Layer1 =>
        {
            console.log(JSONObject[element][Layer1]);
        });
        
        if(Array.isArray(JSONObject[element.toString()]))
        {
            

            //If it is an array, create list element to the left side of the screen
            CreateListElements();
            /*
            JSONObject[element.toString()].forEach(SubElement =>
            {
                console.log(element, " in ", SubElement);
            })
            console.log("Found out that : ", element, " was an array");
            */
        }
        else
        {
            //If not, create table element
            CreateTableElements();
            //console.log("This one tried to trick me : ", element, " was not an array!");
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

                //TODO CREATE ANOTHER FUNCTION WHICH OUTPUTS THE ACTUAL DATA!

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
