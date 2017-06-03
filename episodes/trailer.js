readJSONFile("episodes/trailer.json", function(json) {
    var jsonObj = JSON.parse(json);

    box.init(jsonObj.shift());

    var txtAnim = [];
    for (let n = 0; n < jsonObj.length; n++) {
        jsonObj[n] = new ModifyJSON(jsonObj[n], jsonObj, box);
        txtAnim.push(new Animation(jsonObj[n], box));
    }
    document.body.style.background = "black";
    document.body.style.color = "white";

    Step(
        function init() {
            box.reDraw(this);
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
            txtAnim[2].appendText()
        }
    );
});
