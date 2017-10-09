function ep1a() {
    readJSONFile("episodes/ep1a.json", function(json) {
        var jsonObj = JSON.parse(json);

        box.init(jsonObj.shift());

        var boxDim = [box.x, box.y, box.marginX, box.marginY];
        var formatter = new FormatJSON(...boxDim);

        var infoEp = formatter.getNewJSON(jsonObj.shift());
        infoEp = new Animation(infoEp, box);
        var txtAnim = [];
        jsonObj = formatter.getNewJSON(jsonObj);
        jsonObj.forEach(function(json) {
            txtAnim.push(new Animation(json, box));
        });

        Step(
            function init() {
                box.draw(this);
            },
            function menu() {
                infoEp.appendText();
                startEp(this);
            },
            function flow0() {
                txtAnim[0].writeText(this);
            },
            function flow1() {
                txtAnim[0].clean(0);
                txtAnim[1].writeText(this);
            },
            function flow2() {
                txtAnim[1].clean(0);
                txtAnim[2].writeText(this);
            },
            function flow3() {
                txtAnim[2].clean(0);
                txtAnim[3].writeText(this);
            },
            function flow4() {
                txtAnim[3].clean(0);
                txtAnim[4].writeText(this);
            },
            function flow5() {
                txtAnim[4].reversedClean(0,this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);
            }
        );

    });

}
