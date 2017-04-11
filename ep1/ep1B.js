var longest = {
    "txt": [
        "--- Ton nom est Efisio. Tu auras vingt-trois ans le mois prochain. Tu viens d'un petit village d'Ombrie, en plein milieu de la botte italienne. Ton père est un bâtard, le fils illégitime du curé des environs. Tu ne l'as appris que le jour où on t'a emmené sur sa tombe. Le vieux était mort depuis une semaine, une vierge de pierre vous regardait depuis le toit du caveau voisin, sa robe était peinte en bleu. Ton père s'est signé en passant devant. --- Ton nom est Efisio. La nuit est sèche et claire et terriblement froide. Les étoiles sont, au-dessus du monde, toujours semblables, mais brillent ici bien plus durement qu'ailleurs. Tu es dans le clocher de la chapelle, accroupi, assis parfois. Tu tiens tes mains en conque autour des cigarettes que tu fumes, tu ne dors pas. Tes frères d'armes comptent sur toi",
        "#--- On t'appelle Le Promeneur depuis ces soirs d'exécutions sous les fenêtres des bourgeois --- tu les menais calmement jusqu'au pied des immeubles, tu leur parlais d’une voix douce --- comme le pâtre à ses bêtes, l'infirmière à l'heure de la piqûre, tu leur demandais de te dire des choses simples, de te parler d'eux-mêmes, tu les laissais marcher devant --- un pas --- puis deux ------ et trois, tu tirais dans le dos d'abord pour les faire tomber puis dans la nuque pour les achever. --------- Les étoiles sont si vives que parfois tu fermes ------ les yeux. ------------ Tu ne dois pas dormir. Ton nom est Efisio. Tu attends le matin. ------------ Tu veilles sur tes frères. --------------- Tu attends l'aube de justice. --- Le dispensaire était plein de leurs statues de saints ------------"
    ]
}


readJSONFile("ep1B.json", function(json) {
    var jsonObj = JSON.parse(json);
    var box = new Box(jsonObj, longest, 14, "text");

    var txtAnim = [];
    for (let n = 0; n < jsonObj.length; n++) {
        jsonObj[n] = new AdaptJSON(jsonObj[n], jsonObj, box);
        txtAnim.push(new Anim(jsonObj[n], box));
    }



    txtAnim[0].writeText(0, 0, function(){
        let t = setTimeout(function () {
        txtAnim[1].writeText(0, 0);
        txtAnim[1].cleanPage(txtAnim[1].cleanAt[0][0], txtAnim[1].cleanAt[0][1], "-", function(){
            let t = setTimeout(function () {
            txtAnim[2].writeText(txtAnim[2].startAt[0][0],txtAnim[2].startAt[0][1], function(){
                let t = setTimeout(function () {
                txtAnim[3].writeText(0, 0, function(){
                    let t = setTimeout(function () {
                    txtAnim[4].cleanPage(txtAnim[4].cleanAt[0][0], txtAnim[4].cleanAt[0][1], " ");
                    txtAnim[4].cleanPage(txtAnim[4].cleanAt[1][0], txtAnim[4].cleanAt[1][1], " ");
                    txtAnim[4].cleanPage(txtAnim[4].cleanAt[2][0], txtAnim[4].cleanAt[2][1], " ");
                }, txtAnim[4].delay);
                });
                }, txtAnim[3].delay);
            });
        }, txtAnim[2].delay);
        });
    }, txtAnim[1].delay);
    });






});
