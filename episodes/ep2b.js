function ep2b() {
    readJSONFile("episodes/ep2b.json", function(json) {
        var jsonObj = JSON.parse(json);

        box.init(jsonObj.shift());

        var boxDim = [box.x, box.y, box.marginX, box.marginY];
        var formatter = new FormatJSON(...boxDim);

        var infoEp = formatter.getNewJSON(jsonObj.shift());
        infoEp = new Animation(infoEp, box);

        jsonObj = formatter.getNewJSON(jsonObj[0]);
        var txtAnim = new Animation(jsonObj, box);

        Step(
            function init() {
                box.draw(this);
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
                    e.preventDefault();
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
                else window.attachEvent("onmousewheel", function(e){MouseWheelHandler(e)});
                /////////////////////////////////////////////////////////

                txtAnim.addWord(function(){
                    if (window.addEventListener) {
                        window.removeEventListener("mousewheel", MouseWheelHandler);
                        window.removeEventListener("DOMMouseScroll", MouseWheelHandler);
                    }
                    else window.detachEvent("onmousewheel", MouseWheelHandler);
                }, this);
            },
            function menu() {
                let tempo = setTimeout(function() {
                    showMenu();
                }, 3500);
            }
        );
    });
}
