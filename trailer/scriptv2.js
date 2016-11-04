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









longestWord = countCharacters(txts);

window.onload = resize;
window.onresize = resize;

function resize()
{
    // determine how many characters you can fit by lines (nW) and the number of lines (nH)
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;
    nW = parseInt(pageWidth / letterWidth);
    nH = pageHeight / letterHeight;

    if(nW < longestWord+6) {
        nW = longestWord+6;
    }
    if(nW > 60) {
        nW = 60;
    }


    // draw unicode box and position the text div
    //createLines();
    bataille.style.marginTop = (50 + letterHeight*2) + "px" ;
    bataille.style.marginLeft = (pageWidth - nW * letterWidth) / 2 + "px" ;
    bataille.style.marginRight = (pageWidth - nW * letterWidth) / 2 + "px" ;

    // decompose txts
    var str = ""
    str += createLine(nW,"┌","─","┐");
    str += createLine(nW,"│"," ","│");
    txts.forEach(function(value, index, array){
        str += prepareLines(value);
    });
    str += createLine(nW,"│"," ","│");
    str += createLine(nW,"└","─","┘");

    text2 = asciiTitle(nW, title);
    str += text2;
    var index = 0;
    var interval = 0;
    var txtOut = "";
    byLetter(index, str, txtOut, interval);

    //var decal = 20;
    //byLetterDoubleTexte(index, str, text2, txtOut, interval, decal);
    //bataille.innerHTML = str;
}




// TEXT MANIPULATION /////////////////////////////////////

function prepareLines(txt) {
    var splitStr = txt.split(' ');

    var lignes = [];
    var index = 0;

    while(index < splitStr.length) {
        index = buildingLines(splitStr, index, lignes);
    }

    var txtOut = "";
    //var txtOut = "<p>";
    lignes.forEach(function(value, index, array){
        txtOut += "│  " + value + "  │" + "</br>";
    });
    //txtOut += "</p>";

    return txtOut;
}


function buildingLines(splitStr, index, lignes) {
    var strTable = [];
    var str = "";

    while(str.length < nW - 6 && index < splitStr.length) {
        strTable.push(splitStr[index++]);
        str = strTable.join(" ");
    }

    if(str.length > nW - 6) {
        strTable.pop();
        index--;
    }
    str = strTable.join(" ");
    while(str.length < nW -6){
        str += " ";
    }

    lignes.push(str);
    return index;
}
// PREPARE ASCII TITLE ///////////////////////////////////

function asciiTitle(nW, title) {
    var strOut = "";

    title.forEach(function (value, index, array){
        length = value.length;
        spacesToAdd = (nW - length) / 2;

        for (var i = 0; i < parseInt(spacesToAdd); i++) {
            strOut += " ";
        }
        strOut += value;
        for (var i = 0; i < Math.round(spacesToAdd); i++) {
            strOut += " ";
        }
        strOut += "</br>"
    });
    return strOut
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
    var line = cara1;

    for(var i = 0; i < (nW - 2); i++) {
        line += cara2;
    }

    line += cara3 + "</br>";

    return line;
}

///////////////////////////////////////////////////////////

function countCharacters(txts){
    var n = 0;
    txts.forEach(function(value, index, array){
        var splittedStr = value.split(' ');
        splittedStr.forEach(function(value, index, array){
            if(value.length > n){
                n = value.length;
            }
        });
    });
    return n;
}

// TEXT ANIMATION /////////////////////////////////////////
var byLetter = function(index, text1, txtOut, interval) {
    if (index < text1.length) {
        if(text1[index] == "<"){
            txtOut += "</br>";
            index += 5;
        }
        else {
            txtOut += text1[index++];

        }
        bataille.innerHTML = txtOut;
        if(text1[index] == " " || text1[index] == "─"){
            interval = 2;
        }
        else{
            interval = 10;
        }
        setTimeout(function () { byLetter(index, text1, txtOut, interval); }, interval);
    }
}

var byLetterDoubleTexte = function(index, text1, text2, txtOut, interval, decal) {
    if (index < text1.length) {
        if(index > decal) {
            if(text2[index - decal] != " "){

                add = text2[index - decal];
                console.log(add);
                txtOut = setCharAt(txtOut, index, add);
            }
        }
        txtOut += text1[index++];
        bataille.innerHTML = txtOut;

        if(text1[index] == " " || text1[index] == "─"){
            interval = 2;
        }
        else{
            interval = 80;
        }
        setTimeout(function () { byLetterDoubleTexte(index, text1, text2, txtOut, interval, decal); }, interval);
    }
}

function setCharAt(str, index, chr) {
    console.log('char is : '+ chr);

    //if(index > str.length-1) return str;

    return str.substr(0,index) + chr + str.substr(index+1);
}
