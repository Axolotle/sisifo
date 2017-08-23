function ep2a() {
    readJSONFile("episodes/ep2a.json", function(json) {
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
                // create customs events to trigger add() and remove() function from Animation.addWord() method
                var adder = new Event('add');
                var remover = new Event('remove');

                /////////////////////////////////////////////////////////
                function MouseWheelHandler(e) {
                    // cross-browser wheel delta
                    var e = window.event || e; // old IE support
                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    if (delta == 1) {
                        window.dispatchEvent(adder);
                    }
                    else {
                        window.dispatchEvent(remover);
                    }

                    return false;
                }
                /////////////////////////////////////////////////////////
                if (window.addEventListener) {
                    // IE9, Chrome, Safari, Opera
                    window.addEventListener("mousewheel", MouseWheelHandler);
                    // Firefox
                    window.addEventListener("DOMMouseScroll", MouseWheelHandler);
                }
                // IE 6/7/8
                else window.attachEvent("onmousewheel", MouseWheelHandler);
                /////////////////////////////////////////////////////////

                txtAnim[n++].addWord(function(){
                    if (window.addEventListener) {
                        window.removeEventListener("mousewheel", MouseWheelHandler);
                        window.removeEventListener("DOMMouseScroll", MouseWheelHandler);
                    }
                    else window.detachEvent("onmousewheel", MouseWheelHandler);
                }, this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    txtAnim[n].appendText();
                    events();
                }, 3500);
            }
        );

    });

}
