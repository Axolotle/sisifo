readJSONFile("episodes/ep1a.json", function(json) {
    var jsonObj = JSON.parse(json);

    box.init(jsonObj.shift());

    var txtAnim = [];
    for (let n = 0; n < jsonObj.length; n++) {
        jsonObj[n] = new ModifyJSON(jsonObj[n], jsonObj, box);
        txtAnim.push(new Animation(jsonObj[n], box));
    }

    Step(
        function init() {
            box.reDraw(this);
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
            txtAnim[5].reversedClean(0,this);
        },
        function menu() {
            let tempo = setTimeout(function() {
                txtAnim[6].appendText();
                events();
            }, 1500);
        }
    );

});
