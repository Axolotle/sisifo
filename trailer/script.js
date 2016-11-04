var letter = document.getElementById('text');
var page = document.getElementById('main');
var bataille = document.getElementById('bataille');

var letterHeight = letter.offsetHeight;
var letterWidth = letter.offsetWidth;

txts = ["La Cité Universitaire de Madrid est un campus pharaonique, séparé de la cité, rêvé par le roi Alfonso XIII dans les années 1920. Sur un gigantesque terrain de Moncloa, d’une superficie de plus de 300 hectares, commencent à s’édifier, dès 1930, les facultés de médecine, de pharmacie et d’odontologie. Suivies, en 1932, de l’hôpital clinique.",
"La Cité Universitaire de Madrid fut un des fronts les plus tenaces de la guerre civile espagnole. Dès 1936, les nationalistes, menés par Varela, ambitionnent de prendre Madrid, place forte républicaine, par un assaut frontal. Ils occupent rapidement la rive ouest du Manzanares, mais butent sur les positions défensives des brigadistes, situées au sommet de la berge opposée, montant à pic vers Moncloa.",
"Après avoir subi de lourdes pertes, les phalangistes changent de tactique. Madrid ne tombera que s’ils délogent les républicains postés sur le promontoire de la Cité Universitaire, friche en construction, où s’alternent monumentaux instituts, terrains vagues et zones de travaux. Un véritable bocage urbain. Dès le 15 novembre 1936, de violents combats opposent attaquants et défenseurs, s’affrontant parfois à bout portant, au sein du même édifice, d’étage en étage."];

title = [
         "╷  ╭─┐   ┌─╮╭─┐╶┬╴╭─┐╶┬╴╷  ╷  ┌─╴",
         "│  ├─┤   │─┤├─┤ │ ├─┤ │ │  │  ├─╴",
         "╰─╴╵ ╵   └─╯╵ ╵ ╵ ╵ ╵╶┴╴╰─╴╰─╴╰─╴",
         "┌─╮┌─╴   ╷  ╭─┐   ╭─╴╶┬╴╶┬╴┌─╴",
         "│ │├─╴   │  ├─┤   │   │  │ ├─╴",
         "└─╯╰─╴   ╰─╴╵ ╵   ╰─╴╶┴╴ ╵ ╰─╴",
         "╷ ╷╭╮╷╶┬╴╷ ╷┌─╴┌─╮╭─╴╶┬╴╶┬╴╭─┐╶┬╴┌─╮┌─╴",
         "│ ││││ │ │╭╯├─╴├┬╯╰─╮ │  │ ├─┤ │ ├┬╯├─╴",
         "╰─╯╵╰╯╶┴╴╰╯ ╰─╴╵ ╰╶─╯╶┴╴ ╵ ╵ ╵╶┴╴╵ ╰╰─╴",
         "┌─╮┌─╴   ╭╮╮╭─┐┌─╮┌─╮╶┬╴┌─╮",
         "│ │├─╴   │││├─┤│ │├┬╯ │ │ │",
         "└─╯╰─╴   ╵╵╵╵ ╵└─╯╵ ╰╶┴╴└─╯"
        ]










longestWord = wordCount(txts);

window.onload = resize;
window.onresize = resize;

function resize()
{
    // determine how many characters you can fit by lines (nW) and the number of lines (nH)
    pageHeight = window.innerHeight - 100;
    pageWidth = window.innerWidth - 400;
    nW = pageWidth / letterWidth;
    nH = pageHeight / letterHeight;
    if(nW < 15) {
        nW = 15;
    }

    // draw unicode box and position the text div
    createLines();
    bataille.style.marginTop = (50 + letterHeight*2) + "px" ;
    bataille.style.marginLeft = (200 + letterWidth*3) + "px" ;
    bataille.style.marginRight = (200 + letterWidth*3) + "px" ;

    // decompose txts
    str = ""
    txts.forEach(function(value, index, array){
        str += prepareLines(value);
    });
    bataille.innerHTML = str;
}



// TEXT MANIPULATION /////////////////////////////////////

function prepareLines(txt) {
    var splitStr = txt.split(' ');

    var lignes = [];
    var index = 0;


    while(index < splitStr.length) {
        index = buildingLines(splitStr, index, lignes);
    }

    var txtOut = "<p>";
    lignes.forEach(function(value, index, array){
        txtOut += value + "</br>";
    });
    txtOut += "</p>";

    return txtOut;
}


function buildingLines(splitStr, index, lignes) {
    var strTable = [];
    var str = "";

    while(str.length < nW - 5) {
        strTable.push(splitStr[index++]);
        str = strTable.join(" ");
    }

    if(str.length > nW - 5) {
        strTable.pop();
        str = strTable.join(" ");
        index--;
    }

    lignes.push(str);
    return index;
}



// DRAW BOXES ////////////////////////////////////////////

function createLines() {
    var lines = createLine(nW,"┌","─","┐");

    for(var i = 0; i < (nH - 2); i++) {
        lines += createLine(nW,"│"," ","│");
    }

    lines += createLine(nW,"└","─","┙");

    page.innerHTML = lines;
}


function createLine(nW,cara1, cara2, cara3) {
    var line = "<p>"+cara1;

    for(var i = 0; i < (nW - 3); i++) {
        line += cara2;
    }

    line += cara3+"</p>";

    return line;
}

///////////////////////////////////////////////////////////

function wordCount(txts){
    width = 0;
    txts.forEach(function(value, index, array){
        splittedString = value.split(' ');
        splittedString.forEach(function(value, index, array){
            if(value.length > width){
                width = value.length;
            }
        });
    });
    return width;
}
