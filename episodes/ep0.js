async function ep0() {
    let json = await readJSONFile("episodes/ep0.json");

    box.init(json.shift());
    var boxDim = [box.x, box.y, box.marginX, box.marginY];
    var formatter = new FormatJSON(...boxDim);

    var infoEp = formatter.getNewJSON(json.shift());
    infoEp = new Animation(infoEp, box);


    var txtAnim = [];
    json = formatter.getNewJSON(json);
    json.forEach(function(obj) {
        txtAnim.push(new Animation(obj, box));
    });

    await box.draw();
    infoEp.appendText()
    await startEp();
    await txtAnim[0].writeText();
    await txtAnim[1].writeText();
    await txtAnim[2].writeText();
    setTimeout(showMenu, 3500);
}
