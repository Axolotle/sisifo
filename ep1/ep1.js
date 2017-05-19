readJSONFile("ep1.json", function(json) {
    var jsonObj = JSON.parse(json);

    var box = new Box(jsonObj.shift());
    var x = box.x - box.marginX*2;

    var txtAnim = [];
    for (let n = 0; n < jsonObj.length; n++) {
        jsonObj[n] = new ModifyJSON(jsonObj[n], jsonObj, x);
        txtAnim.push(new Animation(jsonObj[n], box));
    }

    Step(
        function init() {
            box.drawBox(this);
        },
        function flow0() {
            txtAnim[0].writeText(this);
        },
        function flow1() {
            txtAnim[1].clean(0);
            txtAnim[1].writeText(this);
        },
        function flow2() {
            txtAnim[2].clean(0);
            txtAnim[2].writeText(this);
        },
        function flow3() {
            txtAnim[3].clean(0);
            txtAnim[3].writeText(this);
        },
        function flow4() {
            txtAnim[4].clean(0);
            txtAnim[4].writeText(this);
        },
        function flow5() {
            txtAnim[5].reversedClean(0);
        }
    );

});
