async function ep2b() {
    const waves = await getAnimationObjects("episodes/ep2b.json");
    const infos = waves.shift();

    await box.draw();
    infos.displayText(box);

    await startEp();

    // create customs events to trigger add() and remove() function from Animation.addWord() method
    var adder = new Event('add');
    var remover = new Event('remove');

    if (window.addEventListener) {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", MouseWheelHandler);
        // Firefox
        window.addEventListener("DOMMouseScroll", MouseWheelHandler);
    }
    // IE 6/7/8
    else window.attachEvent("onmousewheel", MouseWheelHandler);

    await waves[0].addWord(box, () => {
        if (window.addEventListener) {
            window.removeEventListener("mousewheel", MouseWheelHandler);
            window.removeEventListener("DOMMouseScroll", MouseWheelHandler);
        }
        else window.detachEvent("onmousewheel", MouseWheelHandler);
    });

    setTimeout(showMenu, 3500);

    function MouseWheelHandler(e) {
        // cross-browser wheel delta
        var e = window.event || e; // old IE support
        e.preventDefault();
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        if (delta == 1) window.dispatchEvent(adder);
        else window.dispatchEvent(remover);
    }
}
