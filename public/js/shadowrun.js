

var HistoryArray = [];

function ShowInfo(ItemElemet)
{
    console.log(ItemElemet);
    let x = document.getElementById(ItemElemet.toString());
    if(x.style.display === "none")
    {
        x.style.display = "table-cell";
    }
    else
    {
        x.style.display = "none";
    }
}

function LoadJSON(Tag)
{

    if(Tag == "Back" && HistoryArray.length > 1)
    {   
        HistoryArray.splice(HistoryArray.length - 1, 1);
        GetJsonData(HistoryArray[HistoryArray.length - 1], false);
    }
    else
    {
        GetJsonData(Tag, true);
    }
}  

function GetJsonData(Tag, ToBeAdded)
{
    console.log("HISTORY ARRAY : ", HistoryArray);
    
    var SubColumn = Tag;
    if(HistoryArray.length > 0)
    {
        var SubColumn = HistoryArray[HistoryArray.length - 1] + '/' + Tag;
    }

    console.log("Tag : ", Tag);

    fetch(SubColumn).then(data => 
        {
            return data.json();
        }).then(JSONdata => 
        {


            if(Array.isArray(JSONdata[Tag.toString()]))
            {
                if(ToBeAdded == true)
                {
                    HistoryArray.push(Tag.toString());
                }
                CreateListElements(JSONdata[Tag.toString()]);
            }
            else
            {
                console.log("JSON Data : ", JSONdata);
                CreateTableElements(JSONdata[Tag.toString()]);
            }
        });
}

function CreateListElements(JSONArray)
{
    var UnorderedList = document.getElementById("ItemList");
    UnorderedList.innerHTML = "";
    
    JSONArray.forEach(element =>
    {
        let NewListItem = document.createElement("li");
        let NewButton = document.createElement("button");
                
        NewButton.setAttribute("id", element);
        NewButton.addEventListener("click", function() { LoadJSON(element) } );

        NewButton.innerHTML = NewButton.getAttribute("id");
        NewListItem.appendChild(NewButton);
        UnorderedList.appendChild(NewListItem);
    });
}

function CreateTableElements(JSONArray)
{
    let Table = document.getElementById("ItemTable");
    Table.innerHTML = "";

    let ItemKey = Object.keys(JSONArray);

    //This can be chewd to be lot simpler. For example make these in 2 separate functions
    //but this will do for now.

    let DataLength = 0;
    let CustomWidth = "";

    if(ItemKey.length > 0)
    {
        let TableRow = document.createElement("tr");

        ValueKey = Object.keys(JSONArray[ItemKey[0]]);
        
        //Decrease first and last value [name] & [info]
        DataLength = ValueKey.length - 2;
        CustomWidth = (100 / DataLength).toString() + "%";
        console.log("Custom width : ", CustomWidth);
        for(let i = 1; i < ValueKey.length; i++)
        {
            if(ValueKey[i] == "Info")
            {
                continue;
            }

            let TableHeader = document.createElement("th");
            TableHeader.innerHTML = ValueKey[i];
            TableHeader.setAttribute("width", CustomWidth);
            TableRow.appendChild(TableHeader);
        }

        Table.appendChild(TableRow);
    }
    ItemKey.forEach(ItemElement =>
    {
        let TableRow = document.createElement("tr")
        let Info = "";

        ValueKey = Object.keys(JSONArray[ItemElement]);   
    
        let NameRow = document.createElement("tr");
        let NameData = document.createElement("td");
        
        NameData.innerHTML = JSONArray[ItemElement][ValueKey[0]];
        NameData.setAttribute("class", "name");
        NameData.colSpan = (DataLength);
        NameRow.appendChild(NameData);
        Table.appendChild(NameRow);
        
        for(let i = 1; i < ValueKey.length; i++)
        {
            if(ValueKey[i] == "Info")
            {
                Info = JSONArray[ItemElement][ValueKey[i]];
                continue;
            }
            let TableData = document.createElement("td");
            TableData.innerHTML = JSONArray[ItemElement][ValueKey[i]];
            TableData.setAttribute("width", CustomWidth);
            TableRow.appendChild(TableData);
        }
        
        TableRow.addEventListener("click", function() { ShowInfo(ItemElement) } );
        Table.appendChild(TableRow);

        let TableInfo = document.createElement("td");
        TableInfo.setAttribute("id", ItemElement);
        TableInfo.setAttribute("class", "info");
        TableInfo.colSpan = (DataLength);
        TableInfo.innerHTML = Info;
        TableInfo.setAttribute("style","display:none;");
        Table.appendChild(TableInfo);
        


    });
    Table.setAttribute("style", "display:block");
}

/* DEPRECATED CODE 

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
                    
                    //btn.setAttribute("id", "Back");
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
