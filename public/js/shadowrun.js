

var HistoryArray = [];

function ShowInfo(ItemElemet)
{
    console.log(ItemElemet);
    let x = document.getElementById(ItemElemet.toString());
    if(x.style.display === "none")
    {
        x.style.display = "block";
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
        GetJsonData(HistoryArray[HistoryArray.length - 1]);
    }
    else
    {
        HistoryArray.push(Tag.toString());
        GetJsonData(Tag)
    }
}  

function GetJsonData(Tag)
{

    fetch("ShadowRun" + Tag + ".json").then(data => 
        {
            return data.json();
        }).then(JSONdata => 
        {
            if(Array.isArray(JSONdata[Tag.toString()]))
            {
                CreateListElements(JSONdata[Tag.toString()]);
            }
            else
            {
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
    if(ItemKey.length > 0)
    {
        let TableRow = document.createElement("tr");

        ValueKey = Object.keys(JSONArray[ItemKey[0]]);
        ValueKey.forEach(ValueElement =>
        {   
            if(ValueElement == "Info")
            {
                return false;
            }
            let TableHeader = document.createElement("th");
            TableHeader.innerHTML = ValueElement;
            TableRow.appendChild(TableHeader);

        });
        Table.appendChild(TableRow);
    }
    
    ItemKey.forEach(ItemElement =>
    {
        let TableRow = document.createElement("tr")
        let Info = "";

        ValueKey = Object.keys(JSONArray[ItemElement]);   
        
        ValueKey.forEach(ValueElement =>
        {
            if(ValueElement == "Info")
            {
                Info = JSONArray[ItemElement][ValueElement];
                return false;
            }            
            
            let TableData = document.createElement("td");
            TableData.innerHTML = JSONArray[ItemElement][ValueElement];
            TableRow.appendChild(TableData);
        });
        
        TableRow.addEventListener("click", function() { ShowInfo(ItemElement) } );
        Table.appendChild(TableRow);

        TableInfo = document.createElement("td");
        TableInfo.setAttribute("id", ItemElement);
        TableInfo.setAttribute("colspan", "8");
        TableInfo.innerHTML = Info;
        TableInfo.setAttribute("style","display:none;");        
        Table.appendChild(TableInfo);     

    });

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
