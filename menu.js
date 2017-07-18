var box = new Box();
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
            function flow0() {

                txtAnim.appendText();
                box.menu();
                drawJournal(box.x, box.y, box.episodes);
                events();
            }
        );

    });
}

function drawJournal(x, y, ep) {
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
            let link = "<a href='https://sisifo.site/sisifo/journal/' class='ep'>" + content[i] + "</a>";
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

}



function loadEp(a) {
    box.reDraw();

    if (a.target.id == "menu") start(true);
    else {
        loadScript("episodes/"+a.target.id+".js");
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
