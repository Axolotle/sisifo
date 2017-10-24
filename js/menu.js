var box = new Box();
var maxEp = 3;
var episode;
buildEpisodeBox(false);
initBurger();

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
box.removeMenu = function() {
    return new Promise ((resolve, reject) => {
        const _this = this;
        const div = document.getElementById(_this.div);

        async function removeRow() {
            if (_this.lines.length > _this.y) {
                div.removeChild(div.lastChild);
                _this.lines.pop();

                _this.lines.forEach(line => {
                    if (line.innerHTML.length > _this.x) {
                        let content = line.innerHTML;
                        line.innerHTML = content.substr(0, content.length - 2);
                    }
                });
                await sleep(30);
                removeRow();
            } else {
                resolve();
            }
        }

        _this.removeTags();
        removeRow();
    });
};

async function buildEpisodeBox(again) {
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
    episodeSelectionListener();
}

function showLandpage(x, y, maxEp, mini) {
    var txt = [];

    if (mini) {
        let content = "journal d'écriture";
        let xToAdd = x - content.length;

        txt.push("┌" + "─".repeat(x - 2) + "┐");
        txt.push("│" + " ".repeat(x - 2) + "│");
        let before = "│" + " ".repeat(Math.floor(xToAdd / 2 - 1));
        let after = " ".repeat(Math.ceil(xToAdd / 2 - 1)) + "│";
        let link = "<a href='https://sisifo.site/sisifo/journal/'>" + content + "</a>";
        txt.push(before + link + after);
        txt.push("│" + " ".repeat(x - 2) + "│");
        txt.push("└" + "─".repeat(x - 2) + "┘");
    }
    else {
        let content = [
            "      ╷╭─╮╷ ╷┌─╮╭╮╷╭─┐╷      ",
            "      ││ ││ │├┬╯│││├─┤│      ",
            "    ╰─/╰─╯╰─╯╵ ╰╵╰╯╵ ╵╰─╴    ",
            "┌─╮╷ ┌─╴╭─╴┌─╮╶┬╴╶┬╴╷ ╷┌─╮┌─╴",
            "│ │  ├─╴│  ├┬╯ │  │ │ │├┬╯├─╴",
            "└─╯  ╰─╴╰─╴╵ ╰╶┴╴ ╵ ╰─╯╵ ╰╰─╴",
            "",
            "accéder au journal",
        ];
        let yToAdd = y - content.length - 2;

        txt.push("┌" + "─".repeat(x - 2) + "┐  ");

        let top = Math.floor(yToAdd / 2)
        for (let i = 0; i < top; i++) {
            txt.push("│" + " ".repeat(x - 2) + "│  ");
        }

        content.forEach((line, index) => {
            let xToAdd = x - line.length;
            var before = "│" + " ".repeat(Math.floor(xToAdd/2 - 1));
            var after = " ".repeat(Math.ceil(xToAdd/2 - 1)) + "│  ";

            if (line == "accéder au journal") {
                let link = "<a href='https://sisifo.site/sisifo/journal/'>" + line + "</a>";
                txt.push(before + link + after);
            }
            else txt.push(before + line + after);
        });

        let bot = Math.ceil(yToAdd/2)
        for (let i = 0; i < bot; i++) {
            txt.push("│" + " ".repeat(x - 2) + "│  ");
        }

        for (let i = 0; i <= maxEp + 1; i++) {
            txt.push("└" + "─".repeat(x - 2) + "┘  ");
        }
    }

    var journal = document.getElementById("journal");

    txt.forEach(sentence => {
        let elem = document.createElement("p");
        elem.innerHTML = sentence;
        journal.appendChild(elem);
    });

    // center header and footer
    var div = document.getElementById("text");
    var width = mini ? div.offsetWidth : journal.offsetWidth + div.offsetWidth;

    var header = document.getElementById("header");
    var footer = document.getElementById("footer");

    header.style.width = width + "px";
    footer.style.width = width + "px";
    header.style.display = "block";
    footer.style.display = "block";

    document.getElementById("burger").style.display = "none";

    var hChild = header.children;
    var fChild = footer.children;
    var hLength = hChild.length;
    var fLength = fChild.length;
    for (let i = o = 0; (i < hLength) || (o < fLength); i++, o++) {
        if (hChild[i]) hChild[i].style.display = "block";
        if (fChild[o]) fChild[o].style.display = "block";
    }
}

function hideLandpage() {
    return new Promise (async (resolve, reject) => {
        function hideHeaderAndFooter() {
            return new Promise (async (resolve, reject) => {
                const header = document.getElementById("header");
                const footer = document.getElementById("footer");
                const hChild = header.children;
                const fChild = footer.children;
                const hLen = hChild.length;
                const fLen = fChild.length;

                for (let i = hLen-1, o = 0; (i >= 0) || (o < fLen); i--, o++) {
                    if (hChild[i]) hChild[i].style.display = "none";
                    if (fChild[o]) fChild[o].style.display = "none";
                    await sleep(40);
                }

                header.style.display = "none";
                footer.style.display = "none";
                resolve();
            });
        }

        function deleteJournal() {
            return new Promise (async (resolve, reject) => {
                const journal = document.getElementById("journal");
                const jChild = journal.children;
                var jLen = jChild.length;

                // Get rid of possible inline tags

                for (let i = 0; i < jLen; i++) {
                    let length = jChild[i].children.length;
                    if (length > 0) {
                        let content = jChild[i].innerHTML;
                        for (let c = 0; c < length; c++) {
                            let open = content.indexOf("<");
                            let close = content.indexOf(">", content.indexOf(">")+1);
                            let txt = jChild[i].children[c].innerHTML;
                            content = content.substring(0, open) + txt + content.substr(close+1);
                        }
                        jChild[i].innerHTML = content;
                    }
                }

                // Delete the extra rows
                for (let i = jLen; i > box.y ; i--) {
                    journal.removeChild(journal.lastChild);
                    await sleep(30);
                }
                // Delete character by character
                var lineLength = jChild[0].innerHTML.length;
                jLen = jChild.length;
                for (let chara = 0; chara < lineLength; chara++) {
                    let len = jChild[0].innerHTML.length-1;
                    for (let l = 0; l < jLen; l++) {
                        let content = jChild[l].innerHTML;
                        jChild[l].innerHTML = content.substr(0, len);
                    }
                    await sleep(15);
                }
                // Delete every nodes
                while (journal.hasChildNodes()) {
                    journal.removeChild(journal.lastChild);
                }
                resolve();
            });
        }

        await Promise.all([
            hideHeaderAndFooter(),
            deleteJournal(),
            box.removeMenu()
        ]);
        document.getElementById("burger").style.display = "block";
        resolve();
    });
}

async function loadEpisode(a) {
    async function startEpisode(ep) {
        var json = await initEpisode(ep);
        
        if (ep == "0") ep0(animObjs);
        else if (ep == "1a") ep1a(json);
        else if (ep == "1b") ep1b(json);
        else if (ep == "2a" || ep == "2b") ep2(json);
        else if (ep == "3a" || ep == "3b") ep3(json);
    }

    var landpage;
    if (a.target != undefined) {
        episode = a.target.id;
        landpage = true;
    }
    else episode = a;

    if (landpage) await hideLandpage();

    startEpisode(episode);
}

function initBurger() {
    // init the little menu click listener
    function showOptions() {
        var options = document.getElementById("burger-options");
        if (options.style.display == "" || options.style.display == "none") {
            options.style.display = "block";
        } else options.style.display = "none";
    }

    var menu = document.getElementById("burger");
    menu.addEventListener("click", showOptions);

    function action(e) {
        e.preventDefault();
        const id = e.target.id;
        document.getElementById("burger-options").style.display = "none";

        if (id != "fullscreen") {
            window.dispatchEvent(new Event("stop"));
            box.cleanLines();
        } else return fullscreen();

        if (id == "return") buildEpisodeBox(true);
        else if (id == "reload") loadEpisode(episode);
        else if (id == "next"){
            let next;
            if (episode == "0") next = "1a";
            else if (episode == maxEp + "b") next = "0";
            else {
                let n = parseInt(episode[0]);
                let vs = episode[1];
                if (vs == "a") next = n + "b";
                else next = (n + 1) + "a";
            }
            loadEpisode(next);
        }
        else if (id == "previous"){
            let previous;
            if (episode == "0") previous = maxEp + "b";
            else if (episode == "1a") previous = "0";
            else {
                let n = parseInt(episode[0]);
                let vs = episode[1];
                if (vs == "a") previous = (n - 1) + "b";
                else previous = n + "a";
            }
            loadEpisode(previous);
        }
    }

    var items = document.getElementsByClassName("burger-item");
    var itemsLength = items.length;
    for (let i = 0; i < itemsLength; i++) {
        items[i].addEventListener("click", action);
    }
}

function episodeSelectionListener() {
    var links = document.getElementsByClassName("ep");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", loadEpisode);
    }
}

function startListener() {
    return new Promise ((resolve, reject) => {
        var link = document.getElementById("start");
        link.addEventListener("click", () => {
            box.cleanLines();
            resolve();
        });
    });
}

function fullscreen() {
    var html = document.getElementsByTagName("html")[0];
    if (document.body.webkitRequestFullScreen) {
        html.webkitRequestFullScreen();
    } else html.mozRequestFullScreen();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
