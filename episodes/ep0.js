function ep0() {
    readJSONFile("episodes/ep0.json", function(json) {
        var jsonObj = JSON.parse(json);

        box.init(jsonObj.shift());
        var infoEp = new ModifyJSON(jsonObj.shift(), jsonObj, box);
        infoEp = new Animation(infoEp, box);

        var txtAnim = [];
        for (let n = 0; n < jsonObj.length; n++) {
            jsonObj[n] = new ModifyJSON(jsonObj[n], jsonObj, box);
            txtAnim.push(new Animation(jsonObj[n], box));
        }
        // document.documentElement.style.background = "black";
        // document.documentElement.style.color = "white";

        Step(
            function init() {
                box.reDraw(this);
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
