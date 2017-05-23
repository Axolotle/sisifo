readJSONFile("ep1B.json", function(json) {
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
            txtAnim[1].clean(0);
            txtAnim[1].writeText(this);
            txtAnim[1].clean(1);
        },
        function flow2() {
            txtAnim[2].writeText(this);
        },
        function flow3() {
            txtAnim[3].clean(0,function() {
                txtAnim[3].clean(1);
            });
            txtAnim[3].writeText(this);
        },
        function flow4() {
            txtAnim[4].clean(0);
            txtAnim[4].clean(1);
            txtAnim[4].clean(2);
            txtAnim[4].clean(3);
            txtAnim[4].clean(4);
        }
    );




});
