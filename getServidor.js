var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');
var pgModelo  = 'http://transparencia.gov.br/servidores/';
var visitados = {};
var fs = require('fs');
var FileHrefs = []; 
FileHrefs = ['OrgaoLotacao-DetalhaServidor.asp?IdServidor=1324974&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=2067436&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1082309&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1063328&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1680459&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1465729&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1434847&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=2139747&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1920874&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1381157&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1112655&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=2073618&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1443421&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=2218524&CodOrgao=26439',
				 'OrgaoLotacao-DetalhaServidor.asp?IdServidor=1268244&CodOrgao=26439']; 
main();

function main() {
//	console.log(FileHrefs);
  for (linha = 0;linha<FileHrefs.length;linha++){
      visitarPagina(pgModelo + FileHrefs[linha]);
  }
  console.log('End.')
}


function visitarPagina(url) {

  visitados[url] = true;

  console.log("Varrendo a página: " + url);
  request(url, function(error, response, body) {
     if(response.statusCode !== 200) {
       return;
     }
     // carrega o html
     var $ = cheerio.load(body);
     
     
     retornaServidor($);
	});
}

function retornaServidor($){
	return;}