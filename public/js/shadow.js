
var HistoryArray = [];

function ShowList(tag, prevTag)
{
   
    var UnorderedList = document.getElementById("ItemList");
    UnorderedList.innerHTML = "";

    if(prevTag == null && HistoryArray.length > 0)
    {
        HistoryArray.pop();
    }

    console.log("Tag :", tag, " Prev Tag : ", prevTag);

    fetch("Shadow" + tag + ".json").then(response => {
        return response.json();
    }).then(data => {
        
        for (var i = 0; i < data[tag.toString()].length; i++)
        {
            var item = document.createElement('li');
            var btn = document.createElement('button');

            btn.appendChild(document.createTextNode(data[tag.toString()][i]));

            var id = data[tag.toString()][i];

            if(id == "Back")
            {
                console.log("Previous was set", prevTag);
                HistoryArray.push(prevTag);
                btn.addEventListener("click", function() { ShowList(prevTag, null)});
            }
            else
            {
                btn.setAttribute("id", id);                
                btn.addEventListener("click", function() { ShowList(this.id, tag)});
            }
            item.append(btn);
            UnorderedList.appendChild(item);

        }
    }).catch(err => {
        alert("Error has occured");
    }) 

    
 
}

function ShowElements(tag)
{
    console.log("Now we are suposed to show you : ", tag);
}