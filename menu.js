var box = new Box();
var maxEp = 3;
start(false);
//loadEp("3a");

box.addMenu = function(maxEp) {
    const _this = this;

    var lines = [];
    _this.lines.forEach(line => lines.push(line.innerHTML));

    var pos = 1;
    var length = lines.length;
    for (let n = 0; n <= maxEp; n++) {
        for (let i = 0; i < length; i++) {
            if (i < pos) lines[i] += "  ";
            else if (i - pos == 0) lines[i] += "─┐";
            else if (n === 0) {
                if (i - pos === 1) {
                    lines[i] += "<a class='ep' id='" + n + "'>" + n + "</a>│";
                } else lines[i] += " │";
            }
            else {
                if (i - pos === 1) lines[i] += n + "│";
                else if (i - pos == 4) {
                    lines[i] += "<a class='ep' id='" + n + "a'>a</a>│";
                } else if (i - pos == 6) {
                    lines[i] += "<a class='ep' id='" + n + "b'>b</a>│";
                } else lines[i] += " │";
            }
        }

        lines.push(" ".repeat(pos*2) + "└" + "─".repeat(_this.x-2) + "┘");
        pos++;
        length++;
    }

    var docFragment = document.createDocumentFragment();
    lines.forEach((txt, i) => {
        if (i < _this.y) {
            _this.lines[i].innerHTML = txt;
        }
        else {
            let elem = document.createElement("p");
            elem.innerHTML = txt;
            _this.lines.push(elem);
            docFragment.appendChild(elem);
        }
    });

    var div = document.getElementById(_this.div);
    div.appendChild(docFragment);

};
box.addTinyMenu = function(maxEp) {
    const _this = this;
    var pos = 1;

    var docFragment = document.createDocumentFragment();
    for (let n = 0; n <= maxEp; n++) {
        let elem = document.createElement("p");
        let content, length;

        if (n === 0) {
            length = 3;
            content = "<a class='ep' id='" + n + "'>" + n + "</a>";
        } else {
            length = 9;
            content = "<a class='ep' id='" + n + "a'>a</a>──" + n + "──<a class='ep' id='" + n + "b'>b</a>";
        }

        let before = "└" + "─".repeat(Math.floor((_this.x - length) / 2));
        let after = "─".repeat(Math.ceil((_this.x - length) / 2)) + "┘";

        elem.innerHTML = before + content + after;
        _this.lines.push(elem);
        docFragment.appendChild(elem);
    }

    var div = document.getElementById(_this.div);
    div.appendChild(docFragment);

};

async function start(again) {
    var mini = window.innerWidth < 900 ? true : false;

    var boxOptions = {
        maxX: mini ? 42 : 37,
        maxY: mini ? 12 : 22,
        minY: 12,
        minX: 30,
        divName: "text",
        marginX: 1,
        marginY: 1
    };
    var content = {
        txt: [
            " /                      ",
            "┌─╴┌─╮╶┬╴╭─╴╭─╮┌─╮┌─╴╭─╴",
            "├─╴├─╯ │ ╰─╮│ ││ │├─╴╰─╮",
            "╰─╴╵  ╶┴╴╶─╯╰─╯└─╯╰─╴╶─╯",
            "",
            "",
            "{{tag::a|id=" + maxEp + "a|class=ep}}lire le dernier épisode{{tag::/a}}"
        ],
        format: "align",
        charToAdd: " "
    };

    box.init(boxOptions);
    const formatter = new FormatJSON(box.x, box.y, box.marginX, box.marginY);
    const infos = new Animation(formatter.getNewJSON(content));

    if (again && !box.error) await box.draw();
    else await box.display();
    infos.displayText(box);

    if (mini) box.addTinyMenu(maxEp);
    else box.addMenu(maxEp);

    showLandpage(box.x, box.y, maxEp, mini);
    events();
}

initMenu();


function initMenu() {
    // init the little menu click listener
    var menu = document.getElementById("m");
    menu.addEventListener("click", showMenu);

    function action(e) {
        e.preventDefault();
        var ev = new Event("stop");
        window.dispatchEvent(ev);
        box.cleanLines();

        if (e.target.id == "return") {
            start(true);
        }
        else if (e.target.id == "reload") {
            loadEp(episode);
        }
        else if (e.target.id == "next"){
            var next;

            if (episode == "0") next = "1a";
            else if (episode == maxEp+"b") next = "0";
            else {
                let n = parseInt(episode[0]);
                let vs = episode[1];

                if (vs == "a") next = n+"b";
                else next = (n+1)+"a";
            }
            loadEp(next);
        }
        else if (e.target.id == "previous"){
            var previous;

            if (episode == "0") previous = maxEp+"b";
            else if (episode == "1a") previous = "0";
            else {
                let n = parseInt(episode[0]);
                let vs = episode[1];

                if (vs == "a") previous = (n-1)+"b";
                else previous = n+"a";
            }
            loadEp(previous);
        }
        else if (e.target.id == "fullscreen") {
            fullscreen();
            loadEp(episode);
        }

        options.style.display = "none";
    }

    var options = document.getElementById("m-options");
    var item = document.getElementsByClassName("menu-item");

    for (var i = 0; i < item.length; i++) {
        item[i].addEventListener("click", action);
    }
}

async function showMenu() {
    var options = document.getElementById("m-options");

    if (options.style.display == "" || options.style.display == "none") {
        options.style.display = "block";
    }
    else {
        options.style.display = "none";
    }

    return Promise.resolve();
}

function showLandpage(x, y, ep, mini) {
    var content = [
        "      ╷╭─╮╷ ╷┌─╮╭╮╷╭─┐╷      ",
        "      ││ ││ │├┬╯│││├─┤│      ",
        "    ╰─/╰─╯╰─╯╵ ╰╵╰╯╵ ╵╰─╴    ",
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



    if (mini) {
        sentences.push("┌" + generateCharLine(x-2, "─") + "┐");
        sentences.push("│" + generateCharLine(x-2, " ") + "│");
        var xToAdd = x - "journal d'écriture".length;
        var before = "│" + generateCharLine(Math.floor(xToAdd/2 - 1), " ");
        var after = generateCharLine(Math.ceil(xToAdd/2 - 1), " ") + "│";

        let link = "<a href='https://sisifo.site/sisifo/journal/'>" + "journal d'écriture" + "</a>";
        sentences.push(before + link + after);
        sentences.push("│" + generateCharLine(x-2, " ") + "│");
        sentences.push("└" + generateCharLine(x-2, "─") + "┘");
    }
    else {
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


    }

    var div = document.getElementById("journal");

    sentences.forEach(function(sentence) {
        let elem = document.createElement("p");
        elem.innerHTML = sentence;
        div.appendChild(elem);
    });


    // center header and footer
    var div2 = document.getElementById("text");
    var width;
    if (mini) {
        width = div2.offsetWidth;
    }
    else {
        width = div.offsetWidth + div2.offsetWidth;
    }

    var header = document.getElementById("header");
    var footer = document.getElementById("footer");

    header.style.width = width + "px";
    footer.style.width = width + "px";

    document.getElementById("m").style.display = "none";

    header.style.display = "block";
    footer.style.display = "block";
    for (var i = o = 0;
        (i < header.children.length) || (o < footer.children.length);
        i++, o++) {

        if (header.children[i]) header.children[i].style.display = "block";
        if (footer.children[o]) footer.children[o].style.display = "block";
    }
}

function hideLandpage(callback) {
    var header = document.getElementById("header").children;
    var footer = document.getElementById("footer").children;
    var journal = document.getElementById("journal").children;

    document.getElementById("m").style.display = "block";

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
        document.getElementById("header").style.display = "none";
        document.getElementById("footer").style.display = "none";
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
        while (j.hasChildNodes()) {
            j.removeChild(j.lastChild);
        }
        //box.cleanLines();
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
    box.reset();
}

function loadEp(a) {

    function isScriptAlreadyLoaded() {
        var head = document.getElementsByTagName('head')[0];
        var previous = head.getElementsByTagName("script");

        for (var i = 0; i < previous.length; i++) {
            let ref = previous[i].src;
            let start = ref.lastIndexOf("ep");
            let end = ref.lastIndexOf(".");

            if (ep == ref.substring(start+2, end)) {
                return true;
            }
        }
        return false;
    }

    var landpage = false;

    var ep;
    if (a.target != undefined) {
        ep = a.target.id;
        landpage = true;
    }
    else {
        ep = a;
    }
    episode = ep;

    function startMainFunction() {
        if (ep == "0") ep0();
        else if (ep == "1a") ep1a();
        else if (ep == "1b") ep1b();
        else if (ep == "2a") ep2a();
        else if (ep == "2b") ep2b();
        else if (ep == "3a") ep3a();
        else if (ep == "3b") ep3b();
    }

    function launch() {
        if (landpage) {
            hideLandpage(function() {
                startMainFunction();
            });
        }
        else startMainFunction();
    }

    if (!isScriptAlreadyLoaded())
        loadScript("episodes/ep" + ep + ".js", launch);
    else
        launch();
}

function loadScript(src, callback) {
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = function() {
            resolve;
            if (callback) callback();
        };
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startEp() {
    return new Promise ((resolve, reject) => {
        var link = document.getElementById("start");
        link.addEventListener("click", function() {
            box.cleanLines();
            resolve();
        });
    });
}

function fullscreen() {
    var html = document.getElementsByTagName("html")[0];
    if(document.body.webkitRequestFullScreen)
        html.webkitRequestFullScreen();
    else
        html.mozRequestFullScreen();
}
