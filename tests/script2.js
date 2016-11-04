var rayerDesTrucs = function (a, cible) {
    strRaye = str.substring(0, (a--)-1) + '<s>' + str.substring(a);
    cible.innerHTML = strRaye;
    if (a > 79) {
    setTimeout(function () { rayerDesTrucs(a, cible); }, 10);
}
    return strRaye;
}

var motParMotWheel = function (message) {
    var cible = document.getElementById("text");
    // split le texte en mots indé
    var splitStr = message.split(' ');

    // si l'index est inférieur à la taille du tableau des mots => continuer d'afficher les mots suivants
    if (index < splitStr.length) {
        str += ' ' + splitStr[index++];
        cible.innerHTML = str;
    }


    // if (index == splitStr.length && !indexAtteint) {
    //     indexAtteint = true;
    //     str = str.substring(0, str.lastIndexOf(". ")+2) + '<s>' + str.substring(str.lastIndexOf(". ")+1) + '</s>';
    //
    //     cible.innerHTML = str;
    // }

    // si tout le texte est affiché
    if (index == splitStr.length && !indexAtteint) {
        indexAtteint = true;
        str = rayerDesTrucs(str.length-2, cible);
        console.log(str);
    }
}

var motParMotWheelInverse = function () {
    var cible = document.getElementById("text");
    var lastSpaceIndex = str.lastIndexOf(" ");

    str = str.substring(0, lastSpaceIndex);
    if (index > 0) {
        index--;
    }
    cible.innerHTML = str;
}

function MouseWheelHandler(e, text) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    if (indexAtteint && index < 15){
        checkPoint = true;
    }

    if (!checkPoint) {
        if (delta == 1) {
            motParMotWheel(tA);
        }
        else {
            motParMotWheelInverse();
        }
    }
    else {
        if (delta == 1) {
            motParMotWheel(tB);
        }
        else {
            motParMotWheelInverse();
        }
    }
    return false;
}
