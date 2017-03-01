var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var URL_INICIAL = "http://transparencia.gov.br/servidores/OrgaoLotacao-ListaServidores.asp?Ordem=2&paramDesc=1&CodOrg=26439&Pagina=";
var NUM_MAX_PAGINAS = 20;

var paginasVisitadas = {};
var numPagina = 0;
var paginaAtual = URL_INICIAL;
var fs = require('fs');
var qs = require('querystring');

main();

function main() {
  numPagina++;
  var proximaPagina = paginaAtual + numPagina;
  if (proximaPagina in paginasVisitadas) {
    main();
  } else {
    visitarPagina(proximaPagina, main);
  }
}


function visitarPagina(url, callback) {

  paginasVisitadas[url] = true;

  console.log("Varrendo a página: " + url);
  request(url, function(error, response, body) {
     if(response.statusCode !== 200) {
       callback();
       return;
     }
     // carrega o html
     var $ = cheerio.load(body);
     
     
     retornaServidor($, callback);
	});
}

function retornaServidor($, callback){
  var dados = $('#listagem').find('table tr a[href]');
  dados.splice(0, 1);

  var saida = "";
  
  for(i = 0; i <= dados.length; i++){
  	saida = saida + $(dados[i]).attr("href") + "\n";
  }

	var writeStream = fs.createWriteStream('links.txt', {'flags': 'a'});

	writeStream.write(saida);
	writeStream.end(callback);
}