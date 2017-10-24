async function ep0() {
    const waves = await getAnimationObjects("episodes/ep0.json");
    const infos = waves.shift();

    await box.draw();
    infos.displayText(box);

    await startListener();
    await waves[0].writeText(box);
    await waves[1].writeText(box);
    await waves[2].writeText(box);

    setTimeout(showMenu, 3500);
}
