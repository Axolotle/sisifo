function initEpisode(file) {
    return new Promise(async (resolve, reject) => {
        try {
            var json = await readJSONFile("js/jsons/ep" + file + ".json");
            await box.init(json.shift());

            var formatter = new FormatJSON(box.x, box.y, box.marginX, box.marginY);
            json = formatter.getNewJSON(json);

            var objs = [];
            json.forEach(obj => objs.push(new Animation(obj)));

            var infos = objs.shift();

            await box.draw();
            infos.displayText(box);

            await startListener();
            resolve(objs.length > 1 ? objs : objs[0]);
        } catch (e) {
            setTimeout(() => showOptions("triche"), 1500);
            return box.drawError(e);
        }
    });
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

async function loadEpisode(a) {
    async function startEpisode(ep) {
        var json = await initEpisode(ep);

        if (ep == "0") ep0(json);
        else if (ep == "1a") ep1a(json);
        else if (ep == "1b") ep1b(json);
        else if (ep == "2a" || ep == "2b") ep2(json);
        else if (ep == "3a" || ep == "3b") ep3(json);
        else if (ep == "4a") ep4a(json);
        else if (ep == "4b") ep4b(json)
    }

    if (a.target != undefined) episode = a.target.id;
    else episode = a;

    if (landpage) await hideLandpage();

    startEpisode(episode);
}

async function ep0(waves) {
    await waves[0].writeText(box);
    await waves[1].writeText(box);
    await waves[2].writeText(box);

    setTimeout(showOptions, 3500);
}

async function ep1a(waves) {
    await waves[0].writeText(box);
    waves[0].clean(box);
    await waves[1].writeText(box);
    waves[1].clean(box);
    await waves[2].writeText(box);
    waves[2].clean(box);
    await waves[3].writeText(box);
    waves[3].clean(box);
    await waves[4].writeText(box);
    await waves[4].clean(box, "reverse");

    setTimeout(showOptions, 3500);
}

async function ep1b(waves) {
    await waves[0].writeText(box);
    await Promise.all([
        waves[0].clean(box, 0),
        waves[0].clean(box, 1),
        waves[1].writeText(box)
    ]);
    await waves[2].writeText(box);
    waves[2].clean(box, 0)
    .then(() => waves[2].clean(box, 1));
    await waves[3].writeText(box);
    await Promise.all([
        waves[3].clean(box, 0),
        waves[3].clean(box, 1),
        waves[3].clean(box, 2),
        waves[3].clean(box, 3),
        waves[3].clean(box, 4)
    ]);

    setTimeout(showOptions, 3500);
}

async function ep2(waves) {
    // create customs events to trigger add() and remove() function from Animation.addWord() method
    var adder = new Event('add');
    var remover = new Event('remove');

    if (window.addEventListener) {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", MouseWheelHandler);
        // Firefox
        window.addEventListener("DOMMouseScroll", MouseWheelHandler);
    }
    // IE 6/7/8
    else window.attachEvent("onmousewheel", MouseWheelHandler);

    await waves.addWord(box, () => {
        if (window.addEventListener) {
            window.removeEventListener("mousewheel", MouseWheelHandler);
            window.removeEventListener("DOMMouseScroll", MouseWheelHandler);
        }
        else window.detachEvent("onmousewheel", MouseWheelHandler);
    });

    setTimeout(showOptions, 3500);

    function MouseWheelHandler(e) {
        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        e.preventDefault();
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta == 1) window.dispatchEvent(adder);
        else window.dispatchEvent(remover);
    }
}

async function ep3(subtitle) {
    await subtitle.startSubtitles(box);

    setTimeout(showOptions, 3500);
}

async function ep4a(waves) {
    waves[1].displayText(box);
    await waves[1].overlay(box);
    box.cleanLines();
    waves[2].displayText(box);
    // await waves[2].overlay(box);

    // setTimeout(showOptions, 3500);
}

async function ep4b(waves) {
    waves[0].insertText(box);
    await sleep(3000);
    await waves[0].mouseOver(true);
    await sleep(3000);
    box.cleanLines();
    waves[1].insertText(box);
    await waves[1].mouseOver(false);

    setTimeout(showOptions, 4000);
}
