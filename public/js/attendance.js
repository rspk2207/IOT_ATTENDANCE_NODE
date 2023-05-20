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
        /*
        var dia = Date.getDate();
        var mes = Date.getMonth();
        mes++;
        var ano = Date.getFullYear();
        var hora = Date.getHours();
        var minuto = Date.getMinutes();
        */
        var field1 = "field1";
        var field2 = "field2";
        for(let i=0;i<data.feeds.length; i++)
        {
          if(data.feeds[i].field1 != null && data.feeds[i].field1 != undefined && data.feeds[i].field1 != 0) document.getElementById("108120111").innerHTML += "Câmbio Dólar: R$ " + data.feeds[i][field1];
          if(data.feeds[i].field2 != null || data.feeds[i].field2 != undefined) document.getElementById("108120123").innerHTML += "Câmbio Dólar: R$ " + data.feeds[i][field2];
        }
        console.log(data.feeds); 
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