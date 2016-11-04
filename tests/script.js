var showText = function (target, message, index, interval, check, decal) {
    if (index < message.length) {
        var text = document.getElementById(target).textContent;
        var titre = "citeuniversitaire";
        if (index > decal) {
            if (index%2== 0){
                text = setCharAt(text, (index-(decal+1)),' ');
            }
            else {
                if (titre[check] == message[index]) {
                    add = titre[check].toUpperCase();
                    text = setCharAt(text, (index-(decal+1)), add);
                    check++;
                }
                else {
                    text = setCharAt(text, (index-(decal+1)),'.');
                }
            }
        }
        text += message[index++];
        document.getElementById(target).textContent = text;
        setTimeout(function () { showText(target, message, index, interval, check, decal); }, interval);
    }
}

var showTextDouble = function (target, message, message2, index, interval, check, decal) {
    if (index < message.length) {
        var text = document.getElementById(target).textContent;
        if (index > decal && check < message2.length) {
            add = message2[check];
            text = setCharAt(text, (index-(decal+1)), add);
            check++;
        }
        text += message[index++];
        document.getElementById(target).textContent = text;
        setTimeout(function () { showTextDouble(target, message, message2, index, interval, check, decal); }, interval);
    }
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}

var motParMot = function (target, message, message2, index, interval) {
    var splittedString = message.split(' ');
    if (index < splittedString.length) {
        var text = document.getElementById(target).textContent;
        text += ' ' + splittedString[index++];
        document.getElementById(target).textContent = text;
    }
    setTimeout(function () { motParMot(target, message, message2, index, interval); }, interval);
}

var motParMotWheel = function (target, message) {
    var splittedString = message.split(' ');
    if (index < splittedString.length) {
        var str = document.getElementById(target).textContent;
        str += ' ' + splittedString[index++];
        document.getElementById(target).textContent = str;
    }
    if (index == splittedString.length && !indexAtteint) {
        indexAtteint = true;
        str = str.substring(0, str.lastIndexOf(",")+1) + "|" + str.substring(str.lastIndexOf(",")+1);
        document.getElementById(target).textContent = str;
    }
}

var motParMotWheelInverse = function (target, message) {

    var str = document.getElementById(target).textContent;
    var lastSpaceIndex = str.lastIndexOf(" ");
    str = str.substring(0, lastSpaceIndex);
    if (index > 0) {
        index--;
    }
    document.getElementById(target).textContent = str;

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
            motParMotWheel("text", text);
        }
        else {
            motParMotWheelInverse("text", text);
        }
    }
    else {
        if (delta == 1) {
            motParMotWheel("text", text2);
        }
        else {
            motParMotWheelInverse("text", text2);
        }
    }
	return false;
}
