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
    var dadosGrafico = {};

    getJSON(url, function( status, data ){
        data.map(function( item ){
            var indice = item.user.id;       

            if(dadosGrafico[indice] != undefined) {
                dadosGrafico[indice].qtd++;
            } else {
                dadosGrafico[indice] = {
                    qtd: 1,
                    name: item.user.user_name
                };
            }


            item.content = item.content.content;
            item.id_user = item.user.id;
            item.name_user = item.user.user_name;
            delete item.user; // remover atributo nao necessário
            return item;
        }); 

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
        document.getElementById('my_dataviz').innerHTML = '';
        gerarGrafico( dadosGrafico );
    });
    return true;
}

window.onload = function() {
    
    this.getAllFiles( );

}