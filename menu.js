var box = new Box();
start(false);

function start(again) {
readJSONFile("menu.json", function(json) {
    var jsonObj = JSON.parse(json);
    options = jsonObj;
    box.init(jsonObj.shift());

    jsonObj = new ModifyJSON(jsonObj.shift(), jsonObj, box);
    var txtAnim = new Animation(jsonObj, box);



    Step(
        function init() {
            if (again) {
                box.reDraw(this);
            }
            else {
                box.drawBox(this);
            }
        },
        function flow0() {

                txtAnim.appendText();

            events();
        }
    );

});
}

function loadEp(a) {
    box.cleanBox();

    if (a.target.id == "menu") start(true);
    else {
        loadScript("episodes/"+a.target.id+".js");
    }
}

function loadScript(src) {
    return new Promise(function (resolve, reject) {
        var s;
        s = document.createElement('script');
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}

function events() {
    var links = document.getElementsByClassName("ep");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("click", loadEp);
    }
}

function startEp(callback) {
    var link = document.getElementById("start");
    link.addEventListener("click", function() {
        box.cleanBox();
        callback();
    })
}
