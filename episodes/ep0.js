async function ep0() {
    const JSONs = await getFormatedObjs("episodes/ep0.json");
    const waves = [];
    JSONs.forEach(function(json) {
        waves.push(new Animation(json));
    });

    await box.draw();
    waves[0].displayText(box);

    await startEp();
    await waves[1].writeText(box);
    await waves[2].writeText(box);
    await waves[3].writeText(box);

    setTimeout(showMenu, 3500);
}
