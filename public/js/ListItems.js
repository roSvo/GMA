

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

    console.log("LOAD JSON : " + Tag);
    
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
    var SubColumn = Tag;
    console.log("TAG: " + Tag);

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
                CreateTableElements(JSONdata[Tag.toString()], Tag);
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

function CreateTableElements(JSONArray, Tag)
{

    //Get main DOM-tree element
    let MainDiv = document.getElementById("main");
    
    //Clear exsiting table
    MainDiv.innerHTML = "";

    //Get items from json data
    let ItemKey = Object.keys(JSONArray);

    let CustomWidth = "100%"

    //Create div for header caption
    let CaptionDiv = document.createElement("div");
    
    //Set class for caption
    CaptionDiv.setAttribute("class", "caption");
    
    //Set caption text
    CaptionDiv.innerHTML = Tag;

    //Apply caption to main hierarchy
    MainDiv.appendChild(CaptionDiv);

    //Iterate through if there is actual data.
    //Start with headers
    if(ItemKey.length > 0)
    {
        //Get first header key
        let ValueKey = Object.keys(JSONArray[ItemKey[0]]);

        //Div which contains all data of headers
        let HeaderDiv = document.createElement("div");
        
        
        CustomWidth = (95 / (ValueKey.length - 2)).toString() + "%";

        for(let i = 1; i < ValueKey.length; i++)
        {
            //Single span which contains header data
            let HeaderData = document.createElement("span");

            //console.log("Value key : ", ValueKey[i]);

            //Skip info header
            if(ValueKey[i] == "Info")
            {
                continue;
            }

            //Set class for header span
            HeaderData.setAttribute("class", "DataSpan");

            HeaderData.setAttribute("id", "DataId");

            //Set width according to data amount
            HeaderData.style.width = CustomWidth.toString();

            //Set header value to match w/e json had in it.
            HeaderData.innerHTML = ValueKey[i];
            
            //Set class for header div
            HeaderDiv.setAttribute("class", "HeaderData");

            //Inset single header data to header data div element -> tree
            HeaderDiv.appendChild(HeaderData)

        } 
        //Insert whole tree to main div tree -> root
        MainDiv.appendChild(HeaderDiv);
    }

    //Next fill the data according to headers.
    ItemKey.forEach(ItemElement =>
    {

        //Initialize div for single data shell
        let DivRow = document.createElement("div");

        DivRow.setAttribute("class", "row");

        //Initialize info char to be zero
        let info = "";

        //Get value key at the ItemElement
        let ValueKey = Object.keys(JSONArray[ItemElement]);
        //Create div for name data
        let NameData = document.createElement("div");

        //Set name data to match json "name" value
        NameData.innerHTML = ItemElement;
        //Set class attribute
        NameData.setAttribute("class", "name");

        //Set name data in between data shells
        DivRow.appendChild(NameData);

        //Iterate through the rest of the data (name / [0] has been added already)
        for(let i = 1; i < ValueKey.length; i++)
        {
            //Skip info, since we don't want it to show all the times
            if(ValueKey[i] == "Info")
            {
                //Set info to match w/e "Info" has in json
                info = JSONArray[ItemElement][ValueKey[i]];
                continue;
            }

            //Initialize singe data shell
            let Data = document.createElement("span"); 
            
            //Match with json
            Data.innerHTML = JSONArray[ItemElement][ValueKey[i]];
            //Set class attribute
            Data.setAttribute("class", "DataSpan");
            
            Data.style.width = CustomWidth.toString();

            //Insert single data shell to TableRow div
            DivRow.appendChild(Data);
        }   
        //Set show function for "info"
        DivRow.addEventListener("click", function() { ShowInfo(ItemElement) } );
        MainDiv.appendChild(DivRow);

        //Create div for info 
        let DivInfo = document.createElement("div");
        //Set separate id for this element
        DivInfo.setAttribute("id", ItemElement);
        //Set class attribute
        DivInfo.setAttribute("class", "info");

        //DivInfo.colSpan = (DataLength);
        //Initialize value
        DivInfo.innerHTML = info;
        //Do not show at the begining
        DivInfo.setAttribute("style","display:none;");
        //Add to main DOM element
        MainDiv.appendChild(DivInfo);
        
    })    
}



