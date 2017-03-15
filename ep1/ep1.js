var divText = document.getElementById('text');
//window.onload = init;

// window.addEventListener('resize', function() {
//      init();
// });


function readJSONFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

var setup;
readJSONFile("ep1.json", function(objArray){
    let textes = JSON.parse(objArray);
    console.log(textes);
    setup = new Setup(textes, divText);

    var lol = [];
    for (var i=0; i < setup.txts.length; i++) {
        console.log("Constructing text anim");

        lol[i] = new TextByLetter(setup.txts[i], setup.delay[i]);
    }

})

/*
var setup = new SetupBox(, divText);





console.log(setup);
*/
























//var setup = new SetupBox("ep1.json", divText, function());

// var txtLengths = setup.orginalTxts.map(function(txt) {
//     return txt.text.length;
// });
// var maxLenght = setup.orginalTxts.reduce(function(min, cur) {
//     if (cur > min) return cur;
//     else return min;
// })









//lol = new TextByLetter(textes[0]["text"], textes[0]["delay"]);
//testt.startWritting();
//lol.startWritting();

//var inte = setInterval(function(){test.write() }, 50);

// var inte = setInterval(function(){ this.writeByLetters() }, 50);


// inherit : http://jsfiddle.net/Gs4qu/2/
//          http://stackoverflow.com/questions/7533473/javascript-inheritance-when-constructor-has-arguments




/*
TextByLetter.prototype.write = function() {
    var shift = this.txt.shift()
    if (shift == undefined) {
        clearInterval(inte);
        return;
    }
    shownText += shift;
    divText.innerHTML = shownText;
    console.log(shownText);

};
*/




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

/*
function A(x) {
  this.x = x || 100;
}

A.prototype = (function () {

  // initializing context,
  // use additional object

  var _someSharedVar = 500;

  function _someHelper() {
    console.log('internal helper: ' + _someSharedVar);
  }

  function method1() {
    console.log('method1: ' + this.x);
  }

  function method2() {
    console.log('method2: ' + this.x);
    _someHelper();
  }

  // the prototype itself
  return {
    constructor: A,
    method1: method1,
    method2: method2
  };

})();

var a = new A(10);
var b = new A(20);

a.method1(); // method1: 10
a.method2(); // method2: 10, internal helper: 500

b.method1(); // method1: 20
b.method2(); // method2: 20, internal helper: 500

// both objects are use
// the same methods from
// the same prototype
console.log(a.method1 === b.method1); // true
console.log(a.method2 === b.method2); // true

*/
