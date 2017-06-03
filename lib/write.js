function ModifyJSON(obj, jsonObj, box) {

    this.init(obj, jsonObj, box);

}
ModifyJSON.prototype.init = function(obj, jsonObj, box) {

    this.speed = obj.speed || 70;
    this.cleanSpeed = obj.cleanSpeed || this.speed/2;
    this.startAt = obj.startAt || [0,0];


    if (obj.cleanAt) this.cleanAt = obj.cleanAt;
    if (obj.noClearingSpace) this.noClearingSpace = true;
    if (obj.onTheBox) this.onTheBox = true;

    if (Array.isArray(obj.txt)) {
        this.txt = this.centerSentences(obj.txt, obj.charToAdd, box, jsonObj);
    }
    else {
        this.txt = this.defineSentences(obj.txt, box.x-box.marginX*2, jsonObj);

    }
};
ModifyJSON.prototype.centerSentences = function(txt, char, box, jsonObj) {
    var self = this;

    function generateCharLine(n, elem) {
        var charLine = "";
        for (var i = 0; i < n; i++) {
            charLine += elem;
        }
        return charLine;
    }
    var y = box.y - box.marginY*2;
    var x = this.onTheBox ? box.x : box.x - box.marginX*2;


    var yToAdd = y - txt.length;
    var xToAdd = 0;

    var sentences = [];

    for (var i = 0; i < Math.floor(yToAdd/2); i++) {
        sentences.push(generateCharLine(x, char));
    }

    txt.forEach(function(line) {
        xToAdd = x - line.length;
        var sentence = "";

        sentence += generateCharLine(Math.ceil(xToAdd/2), char);
        sentence += line;
        sentence += generateCharLine(Math.floor(xToAdd/2), char);

        sentences.push(sentence);
    });

    for (var i = 0; i < Math.ceil(yToAdd/2); i++) {
        sentences.push(generateCharLine(x, char));
    }

    return sentences;
};
ModifyJSON.prototype.defineSentences = function(txt, x, jsonObj) {
    var line = this.startAt[0],
        index = this.startAt[1];

    var sentence = [],
        sentences = [];

    var dontEscape = ["?", "!", ":", ";"];

    var splittedTxt = txt.split(" ");

    var self = this;
    splittedTxt.forEach(function(word) {
        var isTag = false;
        var tags = {};
        var newLine = false;

        if (word.indexOf("<") != -1) {
            isTag = true;

            while (word.indexOf("<") != -1) {
                var startIndex = word.indexOf("<");
                var endIndex = word.indexOf(">");
                var tag = word.substring(startIndex+1, endIndex);

                tags[tag] = startIndex ;

                word = word.substr(0,startIndex) + word.substr(endIndex+1);
            }


        }

        //var width = index + 1 + word.length;
        var width = index == 0 ? index + word.length : index + 1 + word.length;

        if (word.indexOf("\n") > -1) {
            word = word.replace('\n', '');
            newLine = true;
        }
        if (width <= x) {
            sentence.push(word);

            //if (index != 0) index += 1 + word.length;
            //else index += word.length;
            index += index == 0 ? word.length : 1 + word.length;
        }
        else if (dontEscape.indexOf(word) > -1) {
            var lastword = sentence.pop();
            sentences.push(sentence);

            sentence = [lastword, word];
            index = lastword.length + 1 + word.length;
        }
        else {
            sentences.push(sentence);
            sentence = [word];
            line++;
            index = word.length;
        }

        if (newLine) {
            sentences.push(sentence);
            line++;
            sentence = [];
            index = 0;
        }
        if (isTag) {
            for (var tag in tags) {
                if (tags.hasOwnProperty(tag)) {
                    var pos = [line, index - word.length + tags[tag]];
                    self.manageTags(tag, pos, jsonObj);
                }
            }
        }

    });

    sentences.push(sentence);

    return this.wordsArrayToStringArray(sentences);

};
ModifyJSON.prototype.manageTags = function (tag, pos, jsonObj) {


    // starting at (startAt) tag <s>
    if (tag[0] == "s") {
        var n = parseInt(tag.substr(1));
        jsonObj[n].startAt = pos;
    }
    // cleaning at (cleanAt) tag <c>
    else if (tag[0] == "c") {
        // get the obj index to refer to
        var n = parseInt(tag.substr(1,tag.indexOf("-")));
        // get the character and convert it into an array index ("a" = 0, ...)
        var ref = tag.substr(tag.indexOf("-")+1, 1).charCodeAt(0) - 97;
        // get the cleaning or end characters
        var infos = tag.substr(tag.indexOf("-")+2);

        // possible FIXME, not very elegant
        if (jsonObj[n].cleanAt === undefined) {
            jsonObj[n].cleanAt = [];
        }
        if (jsonObj[n].cleanAt[ref] === undefined) {
            jsonObj[n].cleanAt[ref] = [];
        }
        if (jsonObj[n].cleanAt[ref-1] === undefined) {
            jsonObj[n].cleanAt[ref-1] = [];
        }

        if (infos == "/") {
            jsonObj[n].cleanAt[ref][1] = pos;
        }
        else {
            // get the character between the simple quotes
            var char = infos.substr(1, infos.length-2);

            // check if the previous cleaning "end" index is already defined
            // this allow the user to chain cleaning tags without closing them
            if (ref >= 1 && !Array.isArray(jsonObj[n].cleanAt[ref-1][1])) {
                jsonObj[n].cleanAt[ref-1][1] = pos;
            }
            jsonObj[n].cleanAt[ref][2] = char;
            jsonObj[n].cleanAt[ref][0] = pos;
        }


    }
    // Speed alteration (altSpeed) tag <m>
    else if (tag[0] == "m") {
        var speed;
        if (tag[1] == "+") {
            speed = tag.substr(tag.indexOf("+")+1);
            speed = this.speed - (parseInt(speed)*20);
        }
        else if (tag[1] == "-") {
            speed = tag.substr(tag.indexOf("-")+1);
            speed = this.speed + parseInt(speed*20);
        }
        else {
            speed = this.speed;
        }
        if (this.altSpeed === undefined) {
            this.altSpeed = [];
        }
        this.altSpeed.push([pos, speed]);
    }
    // Pause (pauses) tag
    else if (tag[0] == "p") {
        if (this.pause === undefined) {
            this.pause = [];
        }
        var pause = parseFloat(tag.substr(1));
        if (pause == undefined) pause = 1;
        this.pause.push([pos, pause*1000]);
    }

};
ModifyJSON.prototype.wordsArrayToStringArray = function(wordsArray) {
    var sentences = wordsArray.map(function(words) {
        return words.join(" ");
    });
    return sentences;

};







function Animation(obj, box) {
    this.init(obj, box);
}
Animation.prototype.init = function (obj, box) {

    this.cleanSpeed = obj.cleanSpeed;

    if (obj.cleanAt) this.cleanAt = obj.cleanAt;
    if (obj.noClearingSpace) this.noClearingSpace = obj.noClearingSpace;
    if (obj.onTheBox) this.onTheBox = true;

    this.startAt = obj.startAt;
    this.altSpeed = obj.altSpeed || [];
    this.pause = obj.pause || [];


    this.txt = this.formatStringsToIndieChar(obj.txt);

    this.box = box;
    this.speed = obj.speed;
};
Animation.prototype.formatStringsToIndieChar = function(sentences) {

    var t = sentences.map(function(sentence) {
        return sentence.split("");
    });

    return t;

};
Animation.prototype.writeText = function(callback) {
    var line = this.startAt[0];
    var index = this.startAt[1];

    if (this.onTheBox) {
        index -= this.box.marginX;
    }

    var l = 0;
    var i = 0;

    var speed = this.speed;

    var self = this;
    var write = function() {

        if (self.pause[0] != undefined && l == self.pause[0][0][0] && index == self.pause[0][0][1]) {
            var pause = self.pause.shift();
            if (pause != undefined) {
                setTimeout(write, pause[1]);
            }
        }
        else {
                if (self.altSpeed[0] != undefined && l == self.altSpeed[0][0][0] && index == self.altSpeed[0][0][1]) {
                    speed = self.altSpeed[0][1];
                    self.altSpeed.shift();
                }

            var shift = self.txt[l].shift();


            if (shift == undefined) {
                if (l >= self.txt.length - 1) {
                    if (callback)
                        callback();
                        return;
                }
                else {
                    self.cleanEndOfLine(line, index, " ");
                    line++;
                    l++;
                    index = 0;
                    if (self.onTheBox) {
                        index -= self.box.marginX;
                    }
                }
                setTimeout(write, speed);
                return;
            }
            if (shift == "\\") {
                if (index == 0) {
                    setTimeout(write, speed);
                    return;
                }
                else shift = " ";
            }
            if (shift == " " && self.noClearingSpace) {
                setTimeout(write, speed);
                index++;
                return;
            }
            self.box.printChar(line, index, shift);

            index++;
            setTimeout(write, speed);

        }

    }
    write();

};
Animation.prototype.cleanEndOfLine = function(line, index, char) {
    var self = this;
    var cleaning = setInterval(function() {
        if (index >= self.box.x - self.box.marginX*2) {
            clearInterval(cleaning);
            return;
        }
        self.box.printChar(line, index++, char);
    }, 10);

};
Animation.prototype.clean = function(pos, callback) {
    var cleanAt = this.cleanAt[pos] || this.cleanAt[0];
    var line = cleanAt[0][0];
    var index = cleanAt[0][1];
    var char,
        chars;

    if (cleanAt[2].length > 1) chars = cleanAt[2].split("");
    else char = cleanAt[2];

    var self = this;
    var cleaningPage = setInterval(function() {
        // if multiple characters are given to the method, it will display a random one (with more chance to display the first one)
        if (chars != undefined) {
            let rand = Math.random() * (chars.length-1);

            if (rand < 0.5) {
                char = chars[0];
            }
            else {
                char = chars[1];
            }
        }
        // clear the interval at specified line/index
        if (line >= cleanAt[1][0] && index >= cleanAt[1][1]) {
            clearInterval(cleaningPage);
            if (callback) callback();
        }
        else if (index >= self.box.x - self.box.marginX*2) {
            line++;
            index = 0;
        }
        else {
            if (char === "\\") char = " ";
            self.box.printChar(line, index++, char);
        }


    }, self.cleanSpeed);

};
Animation.prototype.reversedClean = function(pos, callback) {
    var cleanAt = this.cleanAt[pos] || this.cleanAt[0];
    var line = cleanAt[1][0];
    var index = cleanAt[1][1];
    var char = cleanAt[2];

    var self = this;
    var cleaningPage = setInterval(function() {
        // clear the interval at specified line/index
        if (line == 0 && index < 0) {
            clearInterval(cleaningPage);
            if (callback) callback();
        }
        else if (index < 0) {
            line--;
            index = self.box.x - self.box.marginX - "</br>".length+1;
        }
        else {
            if (char === "\\") char = " ";
            self.box.printChar(line, index--, char);
        }


    }, self.cleanSpeed);
};