async function ep3a() {
    const sub = await getAnimationObjects("episodes/ep3a.json");
    const infos = sub.shift();

    await box.draw();
    infos.displayText(box);

    await startEp();
    await sub[0].startSubtitles(box);

    setTimeout(showMenu, 3500);
}
