function ep3a() {
    readJSONFile("episodes/ep3a.json", function(json) {
        var jsonObj = JSON.parse(json);

        box.init(jsonObj.shift());
        var infoEp = new ModifyJSON(jsonObj.shift(), jsonObj, box);
        infoEp = new Animation(infoEp, box);

        var txtAnim = [];
        for (let n = 0; n < jsonObj.length; n++) {
            jsonObj[n] = new ModifyJSON(jsonObj[n], jsonObj, box);
            txtAnim.push(new Animation(jsonObj[n], box));
        }
        var n = 0;
        Step(
            function init() {
                box.displayBox(this);
                //box.reDraw(this);
            },
            function menu() {
                infoEp.appendText();
                startEp(this);
            },
            function flow0() {
                txtAnim[0].startSubtitles(this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);
            }
        );
    });
}
