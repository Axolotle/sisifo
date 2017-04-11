readJSONFile("ep1.json", function(json) {
    var jsonObj = JSON.parse(json);
    console.log(jsonObj);
    var box = new Box(jsonObj, jsonObj[0], 14, "text");

    var txtAnim = [];


    for (let n = 0; n < jsonObj.length; n++) {
        jsonObj[n] = new AdaptJSON(jsonObj[n], jsonObj, box);
        txtAnim.push(new Anim(jsonObj[n], box));
    }



    txtAnim[0].writeText(0, 0, function(){
    let t = setTimeout(function () {
        txtAnim[1].cleanPage(txtAnim[1].cleanAt[0][0],txtAnim[1].cleanAt[0][1], " ");
        txtAnim[1].writeText(0, 0,
        function(){
        let t = setTimeout(function () {
            txtAnim[2].cleanPage(txtAnim[1].cleanAt[0][0],txtAnim[1].cleanAt[0][1], " ");
            txtAnim[2].writeText(0, 0,
            function(){
            let t = setTimeout(function () {
                txtAnim[3].cleanPage(txtAnim[1].cleanAt[0][0],txtAnim[1].cleanAt[0][1], " ");
                txtAnim[3].writeText(0, 0,
                function(){
                let t = setTimeout(function () {
                    txtAnim[4].cleanPage(txtAnim[1].cleanAt[0][0],txtAnim[1].cleanAt[0][1], " ");
                    txtAnim[4].writeText(0, 0);
                }, txtAnim[4].delay);
                });
            }, txtAnim[3].delay);
            });
        }, txtAnim[2].delay);
        });
    }, txtAnim[1].delay);
    });






});
