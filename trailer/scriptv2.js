var letter = document.getElementById('text');
var bataille = document.getElementById('bataille');

var letterHeight = letter.offsetHeight;
var letterWidth = letter.offsetWidth;
var nbLines = 0;

txts = [
    "La Cité Universitaire de Madrid est un campus pharaonique, séparé de la cité, rêvé par le roi Alfonso XIII dans les années 1920. Sur un gigantesque terrain de Moncloa, d’une superficie de plus de 300 hectares, commencent à s’édifier, dès 1930, les facultés de médecine, de pharmacie et d’odontologie. Suivies, en 1932, de l’hôpital clinique.",
    "La Cité Universitaire de Madrid fut un des fronts les plus tenaces de la guerre civile espagnole. Dès 1936, les nationalistes, menés par Varela, ambitionnent de prendre Madrid, place forte républicaine, par un assaut frontal. Ils occupent rapidement la rive ouest du Manzanares, mais butent sur les positions défensives des brigadistes, situées au sommet de la berge opposée, montant à pic vers Moncloa.",
    "Après avoir subi de lourdes pertes, les phalangistes changent de tactique. Madrid ne tombera que s’ils délogent les républicains postés sur le promontoire de la Cité Universitaire, friche en construction, où s’alternent monumentaux instituts, terrains vagues et zones de travaux. Un véritable bocage urbain. Dès le 15 novembre 1936, de violents combats opposent attaquants et défenseurs, s’affrontant parfois à bout portant, au sein du même édifice, d’étage en étage. C'est..."
];

title = [
        " ",
        " ",
        " ",
        " ",
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
        "└─╯╰─╴   ╵╵╵╵ ╵└─╯╵ ╰╶┴╴└─╯",
        "────────",
        "╶╮ ┌─╴   ╭╮╷╭─╮╷ ╷   ╶╮ ╭─╮╶─╮╭─╴",
        " │ └─╮   ││││ ││╭╯    │ ╰─┤╶─┤├─╮",
        "╶┴╴╶─╯   ╵╰╯╰─╯╰╯    ╶┴╴╶─╯╶─╯╰─╯"
        ]

final = [
        "",
        "",
        "",
        "",
        "",
        "//#/#///////////",
        "//#╭─╴╶┬╴╭─╴╶┬╴┌─╴╭─╮###",
        "/##╰─╮#│#╰─╮#│#├─╴│#│##/",
        "###╶─╯╶┴╴╶─╯╶┴╴╵##╰─╯#//",
        "",
        "##avril#2017##",
        "",
        "##une#œuvre#de#littérature#numérique#de##",
        "##L.#Henry,#luvan,##",
        "##L.#Afchain,#N.#Chesnais##",
        "",
        "##accompagné·e·s#par##",
        "##Judith#De#la#Asunción#(guitare)##",
        "##&#Marie-Noële#Vidal#(chant)##",
        "",
        "##>#https://sisifo.site##"
]

console.log("pls do not look at this code, it's ugly, very very ugly.");
console.log("you can loose your eyes and someone in your family will probably die in extreme convulsions");


longestWord = countCharactersInWords(txts);

//window.onload = resize;
window.onresize = marging;

document.onkeydown = checkKey;

function checkKey(e) {
    if (e.keyCode == "13") resize();
    if (e.keyCode == "32") fullscreen();
}
function fullscreen() {
    if(document.body.webkitRequestFullScreen)
        document.body.webkitRequestFullScreen();
    else
        document.body.mozRequestFullScreen();
}

function resize()
{
    pageHeight = window.innerHeight;
    pageWidth = window.innerWidth;
    nW = parseInt(pageWidth / letterWidth);
    nH = pageHeight / letterHeight;

    if(nW < 43) {
        nW = 43;
    }
    if(nW > 60) {
        nW = 60;
    }


    bataille.style.marginLeft = (pageWidth - nW * letterWidth) / 2 + "px" ;
    bataille.style.marginTop = letterHeight*4 + "px" ;


    // decompose txts
    var str = "";
    str += createLine(nW,"┌","─","┐") + createLine(nW,"│"," ","│");
    txts.forEach(function(value, index, array){
        str += prepareLines(value);
    });
    str += createLine(nW,"│"," ","│") + createLine(nW,"└","─","┙");

    byLetter(0, str, "", 25);

}

function marging() {
    pageWidth = window.innerWidth;
    bataille.style.marginLeft = (pageWidth - nW * letterWidth) / 2 + "px" ;
}


// TEXT ANIMATION /////////////////////////////////////////
var byLetter = function(index, text1, txtOut, interval) {
    if(index < text1.length) {
        if(text1[index] == "<"){
            txtOut += "</br>";
            index += 5;
        }
        else {
            txtOut += text1[index++];

        }
        bataille.innerHTML = txtOut;
        if(text1[index] == " " || text1[index] == "─"){
            interval = 0;
        }
        else{
            interval = 70;
        }
        setTimeout(function () { byLetter(index, text1, txtOut, interval); }, interval);
    }
    else {
        txtOut = text1;
        text2 = asciiTitle(nW, title, " ");
        add_typo((nW+5)*3, text1, text2, txtOut, 10);
    }
}

var add_typo = function(idx, text1, text2, txtOut, interval) {
    if(idx < text2.length) {
        if(text2[idx] != " " && text2[idx] != undefined){
            txtOut = setCharAt(txtOut, idx, text2[idx]);
        }
        if(text2[idx] == " "){
            interval = 0;
        }
        else {
            interval = 5;
        }
        idx++;
        bataille.innerHTML = txtOut;
        setTimeout(function () { add_typo(idx, text1, text2, txtOut, interval); }, interval);
    }
    else {
        text1 = txtOut;
        bataille.innerHTML = text1;
        text2 = asciiTitle(nW, final, "/");
        rest = nbLines - final.length +2;
        for(a = 0; a < rest; a++){
            for(b = 0; b < nW; b++){
                text2 += "/";
            }
            text2 += "     ";
        }

        setTimeout(function(){add_final((nW+5)*2, text1, text2, txtOut, 0);}, 2000)

    }
}

var add_final = function(idx, text1, text2, txtOut, interval) {
    console.log(text2);
    if(idx < text2.length) {
        if(text2[idx] != " ") {
            if(text2[idx] == "#"){
                txtOut = setCharAt(txtOut, idx, " ");
            }
            else {
                txtOut = setCharAt(txtOut, idx, text2[idx]);
            }

        }
        if(text2[idx] == " "){
            interval = 0;
        }
        else{
            interval = 0;
        }
        bataille.innerHTML = txtOut;
        idx++;
        setTimeout(function () { add_final(idx, text1, text2, txtOut, interval); }, interval);
    }
}


function setCharAt(str, index, chr) {

    //if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
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


function buildingLines(splitStr, idx_word, lignes) {
    var strTable = [];
    var str = "";

    while(str.length < nW - 6 && idx_word < splitStr.length) {
        strTable.push(splitStr[idx_word++]);
        str = strTable.join(" ");
    }

    if(str.length > nW - 6) {
        strTable.pop();
        idx_word--;
    }
    str = strTable.join(" ");
    while(str.length < nW -6){
        str += " ";
    }

    lignes.push(str);
    nbLines++;
    return idx_word;

}
// PREPARE ASCII TITLE ///////////////////////////////////

function asciiTitle(nW, title, chara) {
    var strOut = "";

    title.forEach(function (value, index, array){
        length = value.length;
        spacesToAdd = (nW - length) / 2;

        for (var i = 0; i < parseInt(spacesToAdd); i++) {
            strOut += chara;
        }
        strOut += value;
        for (var i = 0; i < Math.round(spacesToAdd); i++) {
            strOut += chara;
        }
        strOut += "     "
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

function countCharactersInWords(txts){
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
