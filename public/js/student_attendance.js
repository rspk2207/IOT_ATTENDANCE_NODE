function displayStudent(sid)
{
var request = new XMLHttpRequest();
    
    var urlHere = "https://api.thingspeak.com/channels/2152462/feeds.json?";
    urlHere = urlHere + "api_key=0UVWX54PDB51HMAO&results=100";
    
    /*
    var urlHere = "https://api.thingspeak.com/channels/2152462/fields/1.json?";
    urlHere = urlHere + "api_key=0UVWX54PDB51HMAO&results=10";
    */ 
    console.log(urlHere);
    request.open('GET', urlHere, true);
    
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        countAttendance(data,sid);
        /*
        var dia = Date.getDate();
        var mes = Date.getMonth();
        mes++;
        var ano = Date.getFullYear();
        var hora = Date.getHours();
        var minuto = Date.getMinutes();
        */
       /*
        var field1 = "field1";
        var field2 = "field2";
        for(let i=0;i<data.feeds.length; i++)
        {
          if(data.feeds[i].field1 != null && data.feeds[i].field1 != undefined && data.feeds[i].field1 != 0) document.getElementById("108120111").innerHTML += "Câmbio Dólar: R$ " + data.feeds[i][field1];
          if(data.feeds[i].field2 != null || data.feeds[i].field2 != undefined) document.getElementById("108120123").innerHTML += "Câmbio Dólar: R$ " + data.feeds[i][field2];
        }
        console.log(data.feeds); 
        */
        
        /*
        document.getElementById("camb").innerHTML = "Câmbio Dólar: R$ " + data.feeds[0][field1];
        document.getElementById("camb").innerHTML += "Câmbio Dólar: R$ " + data.feeds[0][field2];
        console.log(data.feeds);
        */
        // +  " | Atualizado em " + dia + "/" + mes + "/" + ano + " às " + hora + ":" + minuto;
        } else {
        // We reached our target server, but it returned an error
         }
         };
    
        request.send();
}
function countAttendance(data,index) {
    let field1 = "field1";
    let field2 = "field2";
    let count1 = 0;
    let count2 = 0;
    let element = document.getElementById("student");
    for(let i=0;i<data.feeds.length; i++)
    {
      if(data.feeds[i].field1 != null && data.feeds[i].field1 != undefined && data.feeds[i].field1 != 0)
      {
        count1++;
      }
      if(data.feeds[i].field2 != null || data.feeds[i].field2 != undefined)
      {
        count2++;
      }
    }   
    if(index == '1') displayContent(1,count1,6,element);
    if(index == '2') displayContent(2,count2,6,element);


    /*
    let divtag = document.createElement("div");
    //divtag.id = 'student-div'+index;

    let attended = document.createElement("p");
    attended.innerHTML = count1;

    let total = document.createElement("p");
    total.innerHTML = '6';

    let percentAttendance = document.createElement("p");
    let percent = (100*count1)/6;
    percentAttendance.innerHTML = percent+'%';

    divtag.appendChild(attended);
    divtag.appendChild(total);
    divtag.appendChild(percentAttendance);
    
    element.appendChild(divtag);
    element.innerHTML += '<iframe width="450" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/2152462/charts/1?api_key=0UVWX54PDB51HMAO&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=column"></iframe>' 
    */
}

function displayContent(index,count,totalAttendance,elementTag){
    let divtag = document.createElement("div");
    //divtag.id = 'student-div'+index;

    let attended = document.createElement("p");
    attended.innerHTML = 'No of classes attended: '+count;

    let total = document.createElement("p");
    total.innerHTML = 'No of classes conducted: '+totalAttendance;

    let percentAttendance = document.createElement("p");
    let percent = (100*count)/totalAttendance;
    percentAttendance.innerHTML = 'Attendance percentage: '+percent+'%';

    divtag.appendChild(total);
    divtag.appendChild(attended);
    divtag.appendChild(percentAttendance);
    
    elementTag.append(divtag);
    document.getElementById("student-plot").innerHTML += '<iframe width="500" height="260" style="border: 1px solid #cccccc;" src="https://thingspeak.com/channels/2152462/charts/'+index+'?api_key=0UVWX54PDB51HMAO&bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=column"></iframe>'
    
}