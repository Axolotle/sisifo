async function ep1a() {
    const waves = await getAnimationObjects("episodes/ep1a.json");
    const infos = waves.shift();

    await box.draw();
    infos.displayText(box);

    await startListener();
    await waves[0].writeText(box);
    waves[0].clean(box);
    await waves[1].writeText(box);
    waves[1].clean(box);
    await waves[2].writeText(box);
    waves[2].clean(box);
    await waves[3].writeText(box);
    waves[3].clean(box);
    await waves[4].writeText(box);
    await waves[4].clean(box, "reverse");

    setTimeout(showMenu, 3500);
}
