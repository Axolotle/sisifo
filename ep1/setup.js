function Setup(textes, div) {
    this.init(textes, div);
}
Setup.prototype = {
    html: null,
    spans: [],
    x: 0,
    y: 0,
    originalTxts: [],
    txts: [],
    delay: [],

    init(textes, div) {
        this.html = div;
        let xy = this.getDimensions();
        this.x = xy[0];
        this.y = xy[1];
        for (let i = 0; i < textes.length; i++) {
            this.originalTxts.push(textes[i].text);
            this.delay.push(textes[i].delay)
        }
        console.log(this.delay);
        this.spans = this.drawBox();
        this.txts = this.defineSentences(this.splitTextsInWords());



    },

    getDimensions() {
        // definition of a set of data of page/character dimensions
        let letterDim = this.getLetterWidth();
        let letterW = letterDim[0];
        let pageW = window.innerWidth;
        //let letterH = letterDim[1];
        //let pageH = window.innerHeight;

        // get the max character and line appendable on the screen
        let maxcW = parseInt(pageW / letterW);
        //let nH = parseInt(pageH / letterH);
        // set the format of the main text bloc
        let x = 0;

        if(maxcW <= 60) {
            x = maxcW;
        }
        else {
            x = 60;
        }

        let y = parseInt(1500 / x);

        return [x, y];
    },

    getLetterWidth() {
        // Create an span element to check the height and the width of one character then suppress it
        let outer = document.createElement("span");
        outer.style.visibility = "hidden";
        document.body.appendChild(outer);
        outer.innerHTML = "a";

        let a = outer.offsetWidth;
        let b = outer.offsetHeight;

        outer.parentNode.removeChild(outer);

        return [a, b];
    },

    drawBox() {
        let lines = [];

        for (let y = 0; y <= this.y+3; y++) {
            let elem = document.createElement("span");
            if (y == 0) {
                elem.innerHTML = this.createLine("┌","─","┐");
            }
            else if (y == this.y+3)
                elem.innerHTML = this.createLine("└","─","┙");
            else
                elem.innerHTML = this.createLine("│"," ","│");

            lines.push(elem);
        }

        lines.forEach(function(line){
            divText.appendChild(line);
        });

        return lines;
    },

    createLine(c1, c2, c3) {
        let line = c1;
        for(let i = -6; i <= (this.x - 2); i++)
            line += c2;
        line += c3;

        return line;
    },

    splitTextsInWords() {
        // Split every individual texts by word and push them in an array
        var allSplittedText = [];
        this.originalTxts.forEach(function(txt) {
            allSplittedText.push(txt.split(" "));
        });
        return allSplittedText;
    },

    defineSentences(allSplittedText) {
        let self = this;
        // Define an array of sentences equal to the max width of the box for every texts
        var textsBySentences = [];
        allSplittedText.forEach(function(text, i) {

            textsBySentences.push(self.defineSentence(text, self));
        });
        return textsBySentences;
    },

    defineSentence(words) {
        let self = this;
        var sentences = [];
        var sentence = [];

        words.forEach(function(word) {
            var next = sentence.join(" ").length + word.length + 1;
            if (next <= self.x) {
                sentence.push(word)
            }
            else {
                sentences.push(sentence.join(" ").split(""));

                sentence = [word];

            }
        });

        return sentences;
    }

}
