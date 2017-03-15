function TextByLetter(txts, delay, index, speed) {
    this.init(txts, delay, index, speed)
}
TextByLetter.prototype = {
    txts: [],
    delay: 0,
    i: 0,
    line: 0,
    speed: 0,

    inte: 0,
    timeOut: 0,

    init(txts, delay, index, speed) {
        this.txts = txts;
        this.delay = delay * 1000 || 5000;
        this.i = index || 3;
        this.speed = speed || 40;
        this.startWritting();
        console.log("lololol");
    },

    writeText() {
        let shift = this.txts[this.line].shift()

        if (shift == undefined) {
            if(this.line >= this.txts.length -1) {
                clearInterval(this.inte);
                return;
            }
            else {
                // if(setup.spans[this.line+2].innerHTML[this.i] != " " || setup.spans[this.line+2].innerHTML[this.i+1] != " " || setup.spans[this.line+2].innerHTML[this.i+2] != " ") {
                //     shift = " ";
                // }

                //else {
                    this.line++;
                    this.i = 3;
                    shift = this.txts[this.line].shift();
                //}

            }
        }
        setup.spans[this.line+2].innerHTML = setCharAt(setup.spans[this.line+2].innerHTML, this.i+1, " ");
        setup.spans[this.line+2].innerHTML = setCharAt(setup.spans[this.line+2].innerHTML, this.i++, shift);
    },

    loopWrite() {
        this.inte = setInterval((function(){this.writeText() }).bind(this), this.speed);
    },
    startWritting() {
        this.timeOut = setTimeout((function(){this.loopWrite() }).bind(this), this.delay);
    },
    defineStartingIndex() {

    }
}


function setCharAt(str, index, chr) {
    //if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
