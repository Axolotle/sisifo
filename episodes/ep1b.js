function ep1b() {
    readJSONFile("episodes/ep1b.json", function(json) {
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

        var n = 0;
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
                txtAnim[0].clean(1);
            },
            function flow2() {
                txtAnim[2].writeText(this);
            },
            function flow3() {
                txtAnim[2].clean(0,function() {
                    txtAnim[2].clean(1);
                });
                txtAnim[3].writeText(this);
            },
            function flow4() {
                txtAnim[3].clean(0, this.parallel());
                txtAnim[3].clean(1, this.parallel());
                txtAnim[3].clean(2, this.parallel());
                txtAnim[3].clean(3, this.parallel());
                txtAnim[3].clean(4, this.parallel());
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);


            }
        );




    });

}
