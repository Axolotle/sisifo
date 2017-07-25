var box = new Box();
var episodes;
start(false);

function start(again) {
    readJSONFile("menu.json", function(json) {
        var jsonObj = JSON.parse(json);
        box.init(jsonObj.shift());

        jsonObj = new ModifyJSON(jsonObj.shift(), jsonObj, box);
        var txtAnim = new Animation(jsonObj, box);

        Step(
            function init() {
                if (again) {
                    box.reDraw(this);
                }
                else {
                    box.displayBox(this);
                }
            },
            function displayLandpage() {
                txtAnim.appendText();
                box.menu();
                showMenu(box.x, box.y, box.episodes);
                events();
            }
        );

    });
}

function showMenu(x, y, ep) {
    var content = [
        "  ╷╭─╮╷ ╷┌─╮╭╮╷╭─┐╷  ",
        "  ││ ││ │├┬╯│││├─┤│  ",
        "╰─/╰─╯╰─╯╵ ╰╵╰╯╵ ╵╰─╴",
        "┌─╮╷ ┌─╴╭─╴┌─╮╶┬╴╶┬╴╷ ╷┌─╮┌─╴",
        "│ │  ├─╴│  ├┬╯ │  │ │ │├┬╯├─╴",
        "└─╯  ╰─╴╰─╴╵ ╰╶┴╴ ╵ ╰─╯╵ ╰╰─╴",
        "",
        "accéder au journal",
    ];

    function generateCharLine(n, elem) {
        var charLine = "";
        for (var i = 0; i < n; i++) {
            charLine += elem;
        }
        return charLine;
    }

    var sentences = [];
    var yToAdd = y - content.length - 2;

    sentences.push("┌" + generateCharLine(x-2, "─") + "┐  ");

    for (let i = 0; i < Math.floor(yToAdd/2); i++) {
        sentences.push("│" + generateCharLine(x-2, " ") + "│  ");
    }

    for (let i = 0; i < content.length; i++) {
        var xToAdd = x - content[i].length;

        var before = "│" + generateCharLine(Math.floor(xToAdd/2 - 1), " ");
        var after = generateCharLine(Math.ceil(xToAdd/2 - 1), " ") + "│  ";

        if (i == content.length-1) {
            let link = "<a href='https://sisifo.site/sisifo/journal/'>" + content[i] + "</a>";
            sentences.push(before + link + after);
        }
        else {
            sentences.push(before + content[i] + after);
        }
    }

    for (let i = 0; i < Math.ceil(yToAdd/2); i++) {
        sentences.push("│" + generateCharLine(x-2, " ") + "│  ");
    }

    for (let i = 0; i <= ep+1; i++) {
        sentences.push("└" + generateCharLine(x-2, "─") + "┘  ");
    }

    var div = document.getElementById("journal");

    sentences.forEach(function(sentence) {
        let elem = document.createElement("p");
        elem.innerHTML = sentence;
        div.appendChild(elem);
    });


    // center header and footer
    var div2 = document.getElementById("text");
    var width = div.offsetWidth + div2.offsetWidth;

    var header = document.getElementById("header");
    var footer = document.getElementById("footer");

    header.style.width = width + "px";
    footer.style.width = width + "px";

    for (var i = o = 0;
        (i < header.children.length) || (o < footer.children.length);
        i++, o++) {

        if (header.children[i]) header.children[i].style.display = "block";
        if (footer.children[o]) footer.children[o].style.display = "block";
    }
}

function hideMenu(callback) {
    var header = document.getElementById("header").children;
    var footer = document.getElementById("footer").children;
    var journal = document.getElementById("journal").children;

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function hide() {
        for (var i = header.length-1, o = 0;
            (i >= 0) || (o < footer.length);
            i--, o++) {

            if (header[i]) header[i].style.display = "none";
            if (footer[o]) footer[o].style.display = "none";

            await sleep(25);
        }

    }

    async function deleteJournal() {

        // first, get rid of possible inline tags
        for (let i = 0; i < journal.length; i++) {
            if (journal[i].children.length > 0) {
                for (var a = 0; a < journal[i].children.length; i++) {
                    var index = journal[i].innerHTML.indexOf("<");
                    var txt = journal[i].children[a].innerHTML;

                    journal[i].removeChild(journal[i].children[a]);
                    journal[i].innerHTML = journal[i].innerHTML.substr(0, index) + txt + journal[i].innerHTML.substr(index);
                }
            }
        }
        // then delete the box
        var j = document.getElementById("journal");
        for (let i = journal.length; i > box.y ; i--) {
            console.log(box.y, journal.length);
            j.removeChild(j.lastChild);
            await sleep(10);
        }
        var lineLength = journal[0].innerHTML.length;
        for (let char = 0; char < lineLength; char++) {
            var newLength = journal[0].innerHTML.length-1;
            for (var line = 0; line < journal.length; line++) {
                journal[line].innerHTML = journal[line].innerHTML.substr(0, newLength);
            }
            await sleep(10);
        }
        console.log(j.children.length);
        while (j.hasChildNodes()) {
            j.removeChild(j.lastChild);
        }
        // for (let i = 0; i < journal.children.length; i++) {
        //     j.removeChild(j.lastChild);
        // }
        box.cleanBox();
        if (callback) {
            callback();
        }
    }

    if (header || footer) {
        hide();
    }
    if (journal) {
        deleteJournal();
    }
    box.resetBox();
}

function loadEp(a) {
    if (a.target.id == "menu") {
        box.cleanBox();
        start(true);
    }
    else {
        hideMenu(function() {
            if (a.target.id == 0) {
                loadScript("episodes/trailer.js");
            }
            else {
            loadScript("episodes/ep"+a.target.id+".js");
            }
        });
    }

}

function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

function events() {
    var links = document.getElementsByClassName("ep");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", loadEp);
    }
}

function startEp(callback) {
    var link = document.getElementById("start");
    link.addEventListener("click", function() {
        box.cleanBox();
        callback();
    })
}
