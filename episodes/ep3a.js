function ep3a() {
    readJSONFile("episodes/ep3a.json", function(json) {
        var jsonObj = JSON.parse(json);

        box.init(jsonObj.shift());

        var boxDim = [box.x, box.y, box.marginX, box.marginY];
        var formatter = new FormatJSON(...boxDim);

        var infoEp = formatter.getNewJSON(jsonObj.shift());
        infoEp = new Animation(infoEp, box);

        jsonObj = formatter.getNewJSON(jsonObj[0]);
        var txtAnim = new Animation(jsonObj, box);

        Step(
            function init() {
                box.draw(this);
            },
            function menu() {
                infoEp.appendText();
                startEp(this);
            },
            function flow0() {
                txtAnim.startSubtitles(this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);
            }
        );
    });
}
