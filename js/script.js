let BASE_URL = 'http://localhost:3000/';

function getJSON(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function(){
        var status = xhr.status;
        if(status === 200){
            callback(status, xhr.response);
        } else {
            console.log('Erro: ' + status);
        }
    }
    xhr.send();
}

function getAllFiles( ) {
    let url = BASE_URL + 'files';
    getJSON(url, function( status, data ){
        data.map(function( item ){
            item.content = item.content.content;
            item.id_user = item.user.id;
            item.name_user = item.user.user_name;
            delete item.user; // remover atributo nao necessário
            return item;
        }); 
        // CODIGO HTML AQUI 
        var w = "";   
        for (var y= 0; y < data.length; y++){
            w += "<tr>" + 
                "<th scope='row'>" + data[y].id_user + "</th>" +
                    "<td>" + data[y].name_user + "</td>" +
                    "<td>" + data[y].id + "</td>" +
                    "<td>" + data[y].file_name + "</td>" +
                    "<td>" + data[y].content + "</td>" +
                "</tr>";
        }
        
            
            document.getElementById('files').innerHTML = w;
    });
    return true;
}

window.onload = function() {
    
    this.getAllFiles( );

}