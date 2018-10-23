function getPreviousBoxSize() {
    var query = window.location.search;
    if (query !== '') {
        let params = new URLSearchParams(query);
        if (params.has("x") && params.has("y")) {
            return {
                maxWidth: params.get("x"),
                maxHeight: params.get("y")
            }
        }
    }
    return undefined;
}

async function initEpisode(url) {
    var box = new Display();
    var prevSize = getPreviousBoxSize();
    var [opts, splash, ...txts] = await utils.getData(url);

    if (prevSize) {
        box.init(prevSize).display();
        await box.init(opts).draw();
    } else {
        box.init(opts).display();
    }

    var {txt, opts} = parser.extract(parser.split(splash.txt, box.width));
    box.print(txt);
    return {box: box, ep: txts}
}
