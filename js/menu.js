testNavigator();
var box = new Box();
var maxEp = 3;
var episode;
var mini;
var landpage = true;
var padding = 0;

initBurger();
resize();

window.onresize = resize;

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
                await sleep(10);
                removeRow();
            } else {
                resolve();
            }
        }

        _this.removeTags();
        removeRow();
    });
};

async function resize() {
    var main = document.getElementsByTagName('main')[0];
    var body = document.getElementsByTagName('body')[0];
    var bodyStyle = body.style.alignItems;

    if (landpage) {
        await displayLandpage(false);
        let style = main.style.padding;
        let padding = style != "" ? parseInt(style.substr(0,2)) : 0;
        if (main.clientHeight - padding > window.innerHeight - box.charaH * 4) {
            if (bodyStyle != "flex-start") {
                body.style.alignItems = "flex-start";
                main.style.padding = box.charaH * 2 + "px 0px";
            }
        }
        else {
           if (bodyStyle != "center") {
               body.style.alignItems = "center";
               main.style.padding = null;
           }
       }
    }

    else {
        if (main.style.padding != "") main.style.padding = null;
        if (main.clientHeight > window.innerHeight) {
            if (bodyStyle != "flex-start") {
                body.style.alignItems = "flex-start";
            }
        } else {
            if (bodyStyle != "center") {
                body.style.alignItems = "center";
            }
        }
    }
}

function displayLandpage(animate) {
    return new Promise (async (resolve, reject) => {

        function buildEpisodeBox() {
            return new Promise (async (resolve, reject) => {
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

                const formatter = new FormatJSON(box.x, box.y, box.marginX, box.marginY);
                const infos = new Animation(formatter.getNewJSON(content));

                if (!animate || box.error) {
                    box.remove();
                    await box.display();
                }
                else await box.draw();
                infos.displayText(box);

                if (mini) box.addTinyMenu(maxEp);
                else box.addMenu(maxEp);

                episodeSelectionListener();

                resolve();
            });
        }

        function buildJournalBox() {
            return new Promise (async (resolve, reject) => {
                function journal() {
                    var txt = [];
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
                    var n = box.x - 2;
                    var yToAdd = box.y - content.length - 2;

                    txt.push("┌" + "─".repeat(n) + "┐  ");

                    var top = Math.floor(yToAdd / 2)
                    for (let i = 0; i < top; i++) {
                        txt.push("│" + " ".repeat(n) + "│  ");
                    }

                    content.forEach((line, index) => {
                        var xToAdd = n - line.length;
                        var before = "│" + " ".repeat(Math.floor(xToAdd/2));
                        var after = " ".repeat(Math.ceil(xToAdd/2)) + "│  ";

                        if (line == "accéder au journal") {
                            link = [before.length, index+top+1, line];
                        }
                        txt.push(before + line + after);
                    });

                    var bot = Math.ceil(yToAdd/2)
                    for (let i = 0; i < bot; i++) {
                        txt.push("│" + " ".repeat(n) + "│  ");
                    }

                    for (let i = 0; i <= maxEp + 1; i++) {
                        txt.push("└" + "─".repeat(n) + "┘  ");
                    }

                    return txt;
                }

                function miniJournal() {
                    var txt = [];
                    var content = "journal d'écriture";
                    var n = box.x - 2;
                    var xToAdd = n - content.length;

                    txt.push("┌" + "─".repeat(n) + "┐");
                    txt.push("│" + " ".repeat(n) + "│");
                    var before = "│" + " ".repeat(Math.floor(xToAdd / 2));
                    var after = " ".repeat(Math.ceil(xToAdd / 2)) + "│";
                    link = [before.length, 2, content];
                    txt.push(before + content + after);
                    txt.push("│" + " ".repeat(n) + "│");
                    txt.push("└" + "─".repeat(n) + "┘");

                    return txt;
                }
                var link;
                var content = mini ? miniJournal() : journal();

                var journal = document.getElementById("journal");
                var docFragment = document.createDocumentFragment();

                if (animate) {
                    content.forEach(sentence => {
                        let elem = document.createElement("p");
                        docFragment.appendChild(elem);
                    });
                    journal.appendChild(docFragment);
                    let jLen = journal.children.length;
                    let len = content[0].length;
                    if (mini) {
                        for (let i = 0; i < jLen; i++) {
                            journal.children[i].innerHTML = content[i];
                        }
                    } else {
                        for (let i = 0; i <= len; i++) {
                            for (let a = 0; a < jLen; a++) {
                                journal.children[a].innerHTML = content[a].substring(0, i);
                            }
                            await sleep(10);
                        }
                    }
                }
                else {
                    let jLen = journal.children.length;

                    for (var i = 0; i < jLen; i++) {
                        journal.removeChild(journal.lastChild);
                    }

                    content.forEach(sentence => {
                        let elem = document.createElement("p");
                        elem.innerHTML = sentence;
                        docFragment.appendChild(elem);
                    });
                    journal.appendChild(docFragment);
                }

                var addr = "https://sisifo.site/sisifo/journal/";
                var line = journal.children[link[1]].innerHTML;
                journal.children[link[1]].innerHTML = line.substring(0, link[0]) + "<a href='" + addr + "'>" + link[2] + "</a>" + line.substr(link[0] + link[2].length);

                resolve();
            });
        }

        var boxOptions = {
            divName: "text",
            marginX: 1,
            marginY: 1,
            minY: 12,
            minX: 33,
            maxX: 41,
            maxY: 24
        };
        var maxX = Math.floor(window.innerWidth / box.charaW);
        landpage = true;
        // maxEp length + prologue + 2 whitespace + 2 margin whitespace
        var adding = maxEp * 2 + 2 + 2;
        if (maxX <= boxOptions.minX * 2 + adding + 2) {
            mini = true;
            if (maxX <= 42) boxOptions.maxX = maxX - 2;
            else boxOptions.maxX = 42;
            boxOptions.minX = 28;
            boxOptions.maxY = 12;
        }
        else if (maxX <= boxOptions.maxX * 2 + adding) {
            mini = false;
            let value = maxX - adding;
            boxOptions.maxX = Math.floor(value/2) - 1;
        }

        let previousSize = [box.x, box.y];
        try {
            await box.init(boxOptions);
        } catch (e) {
            return box.drawError(e);
        }
        if (previousSize[0] != box.x || previousSize[1] != box.y) {
            if (animate) {
                await buildEpisodeBox();
                await buildJournalBox();

            } else {
                await Promise.all([
                     buildEpisodeBox(),
                     buildJournalBox()
                ]);
            }

            let centerDiv = document.getElementById("center");
            if (mini) centerDiv.style.flexDirection = "column";
            else centerDiv.style.flexDirection = "row";

            let width = centerDiv.clientWidth;
            let header = document.getElementById("header");
            let footer = document.getElementById("footer");
            header.style.width = width + "px";
            footer.style.width = width + "px";

            if (animate) {
                let hChild = header.children;
                let fChild = footer.children;
                let hLen = hChild.length;
                let fLen = fChild.length;
                header.style.display = "block";
                footer.style.display = "block";

                for (let i = hLen-1, o = 0; (i >= 0) || (o < fLen); i--, o++) {
                    if (hChild[i]) hChild[i].style.display = "block";
                    if (fChild[o]) fChild[o].style.display = "block";
                    await sleep(40);
                }
            }

            let line = document.getElementById("line");
            if (mini) line.innerHTML = "─ ".repeat(Math.ceil(box.x/2));
            else line.innerHTML = "─ ".repeat(box.x + maxEp + 2);
        }

        resolve();
    });

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
                    resize();
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
                    await sleep(10);
                }
                // Delete character by character

                jLen = jChild.length;
                if (mini) {
                    for (let line = 0; line < jLen; line++) {
                        journal.removeChild(journal.lastChild);
                        await sleep(10);
                    }
                } else {
                    let lineLength = jChild[0].innerHTML.length;
                    for (let chara = 0; chara < lineLength; chara++) {
                        let len = jChild[0].innerHTML.length-1;
                        for (let l = 0; l < jLen; l++) {
                            let content = jChild[l].innerHTML;
                            jChild[l].innerHTML = content.substr(0, len);
                        }
                        await sleep(10);
                    }
                    // Delete every nodes
                    while (journal.hasChildNodes()) {
                        journal.removeChild(journal.lastChild);
                    }
                }

                resolve();
            });
        }

        landpage = false;
        var burgerIcon = document.getElementById("burger-icon")
        burgerIcon.style.display = "block";
        var fullscreenIcon = document.getElementById("fullscreen-icon")
        fullscreenIcon.style.display = "none";

        await hideHeaderAndFooter(),
        await Promise.all([
            deleteJournal(),
            box.removeMenu()
        ]);

        resize();
        resolve();
    });
}

function initBurger() {
    // init the burger and fullscreen click listener

    async function action(e) {
        e.preventDefault();
        const id = e.target.id;
        document.getElementById("burger-options").style.display = "none";
        icons[0].children[2].style.display = "block";

        if (id != "fullscreen") {
            window.dispatchEvent(new Event("stop"));
            box.cleanLines();
        } else return fullscreen();

        if (box.error) {
            const div = document.getElementById(box.div);

            const length = div.children.length;
            for (let n = 0; n < length; n++) {
                div.removeChild(div.lastChild);
            }

            box.lines = [];
            box.error = false;
        }

        if (id == "return") {
            icons[0].style.display = "none";
            icons[1].style.display = "block";
            await displayLandpage(true);
            resize();
        }
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

    var icons = document.getElementsByClassName("icon");
    for (let i = 0; i < icons.length; i++) {
        icons[i].style.top = box.charaH + "px";
        icons[i].style.right = box.charaW * 2 + "px";
        icons[i].children[1].style.lineHeight = "0px";
        icons[i].addEventListener("click", showOptions);
    }

    var options = document.getElementById("burger-options");
    options.style.top = box.charaH * 2 + "px";
    options.style.right = box.charaW * 2 + "px";

    var items = document.getElementsByClassName("burger-item");
    var itemsLength = items.length;
    for (let i = 0; i < itemsLength; i++) {
        items[i].addEventListener("click", action);
    }
}

function showOptions(e) {
    if (e && e.target.parentNode.id === "fullscreen-icon") fullscreen();
    else  {
        let options = document.getElementById("burger-options");
        let display = options.style.display;

        if (e != undefined) {
            if (options.style.top == "") {
                options.style.top = box.charaH * 2 + "px";
                options.style.right = box.charaW * 2 + "px";
                options.style.marginTop = null;
            }
            let bar = document.getElementById("burger-icon").children[2];
            if (display == "" || display == "none") {
                options.style.display = "block";
                bar.style.display = "none";
            }
            else {
                options.style.display = "none";
                bar.style.display = "block";
            }
        } else {
            if (options.style.top != "") {
                options.style.top = null;
                options.style.right = null;
                options.style.marginTop = Math.floor((box.y-11)/2) * box.charaH + "px";
            }
            if (display == "" || display == "none") {
                options.style.display = "block";
            }
            else {
                options.style.display = "none";
            }
        }

    }
}

function episodeSelectionListener() {
    var links = document.getElementsByClassName("ep");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", loadEpisode);
    }
}

function fullscreen() {
    var html = document.getElementsByTagName("html")[0];
    if (document.body.webkitRequestFullScreen) {
        html.webkitRequestFullScreen();
    } else html.mozRequestFullScreen();
}

function testNavigator() {
    // no let ?
    let error = document.getElementById("error");
    error.style.display = "none";
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
