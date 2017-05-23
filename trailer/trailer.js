readJSONFile("trailer.json", function(json) {

    var jsonObj = JSON.parse(json);

    var box = new Box(jsonObj.shift());
    var x = box.x - box.marginX*2;

    var txtAnim = [];
    for (let n = 0; n < jsonObj.length; n++) {
        jsonObj[n] = new ModifyJSON(jsonObj[n], jsonObj, box);
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
            txtAnim[1].writeText(this);
        },
        function flow2() {
            txtAnim[2].writeText(this);
        },
        function flow3() {
        }
    );
});
