async function ep1b() {
    const waves = await getAnimationObjects("episodes/ep1b.json");
    const infos = waves.shift();

    await box.draw();
    infos.displayText(box);

    await startListener();
    await waves[0].writeText(box);
    await Promise.all([
        waves[0].clean(box, 0),
        waves[0].clean(box, 1),
        waves[1].writeText(box)
    ]);
    await waves[2].writeText(box);
    waves[2].clean(box, 0)
    .then(() => waves[2].clean(box, 1));
    await waves[3].writeText(box);
    await Promise.all([
        waves[3].clean(box, 0),
        waves[3].clean(box, 1),
        waves[3].clean(box, 2),
        waves[3].clean(box, 3),
        waves[3].clean(box, 4)
    ]);

    setTimeout(showMenu, 3500);
}
