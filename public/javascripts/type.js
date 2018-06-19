var TxtRotate = function (el, toRotate, period, fonts, colors) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
    this.fonts = fonts;
    this.colors = colors;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    if (!this.fonts) this.font = "Jura";
    else this.font = this.fonts[i];

    if (!this.colors) this.color = "black";
    else this.color = this.colors[i];

    if (i != this.toRotate.length - 1)
        this.el.innerHTML = '<span class="wrap" style="font-family: ' + this.font + '; color:'+ this.color +'; ">' + this.txt + '</span>';
    else
        this.el.innerHTML = '<span class="wrap" style="font-family: ' + this.font + '; color:' + this.color + '; text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;">' + this.txt + '</span>';
    
    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        if (i == this.toRotate.length -1) delta = 20000;
        else delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }
    else {
        delta = 50;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        var fonts = elements[i]. getAttribute('data1');
        var colors = elements[i].getAttribute('data2');
        if (toRotate && fonts && colors) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period, JSON.parse(fonts), JSON.parse(colors));
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};