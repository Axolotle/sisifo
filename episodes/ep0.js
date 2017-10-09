function ep0() {
    readJSONFile("episodes/ep0.json", function(json) {
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
        // document.documentElement.style.background = "black";
        // document.documentElement.style.color = "white";

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
                txtAnim[1].writeText(this);
            },
            function flow2() {
                txtAnim[2].writeText(this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);
            }
        );
    });
}
