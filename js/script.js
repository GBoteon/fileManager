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
        console.log( data );
    });
    return true;
}

window.onload = function() {
    
    this.getAllFiles(  );

}