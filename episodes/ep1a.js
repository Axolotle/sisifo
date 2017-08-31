function ep1a() {

    readJSONFile("episodes/ep1a.json", function(json) {
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
                box.reDraw(this);
            },
            function menu() {
                infoEp.appendText();
                startEp(this);
            },
            function flow0() {
                txtAnim[n++].writeText(this);
            },
            function flow1() {
                txtAnim[n].clean(0);
                txtAnim[n++].writeText(this);
            },
            function flow2() {
                txtAnim[n].clean(0);
                txtAnim[n++].writeText(this);
            },
            function flow3() {
                txtAnim[n].clean(0);
                txtAnim[n++].writeText(this);
            },
            function flow4() {
                txtAnim[n].clean(0);
                txtAnim[n++].writeText(this);
            },
            function flow5() {
                txtAnim[n++].reversedClean(0,this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);
            }
        );

    });

}
