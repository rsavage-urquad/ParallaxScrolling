var index;
var parallaxScroll;

$(document).ready(function(){
    index = new Index();

    // parallaxScroll = new ParallaxScroll("parallaxArea", "images/MountainLake-1920x780.png", 600 , 0.25, 0, -150, false);
    //parallaxScroll = new ParallaxScroll("parallaxArea", "images/MultiPlanetsGold-1920x836.png", 450 , 0.25, 0, -350, false);


    // window.onscroll = function(){
    //     [].slice.call(parallax).forEach(function(el,i){
    //
    //         var windowYOffset = window.pageYOffset;
    //         var elBackgroundPos = "0 " + ((windowYOffset * speed) - 150) + "px";
    //
    //         el.style.backgroundPosition = elBackgroundPos;
    //
    //     });
    // };

});


var Index = function() {
    this.selectClicked();
};

Index.prototype.selectClicked = function() {
    var image = $("#backgroundImage").val();
    var backgroundHeight = $("#backgroundHeight").val();
    var speed = $("#speed").val();
    var xVal = $("#xVal").val();
    var yVal = $("#yVal").val();
    var cover = $("#cover").val();
    var imageUrl;
    var coverValue;

    switch(image) {
        case "Mountain Lake":
            imageUrl = "images/MountainLake-1920x780.png";
            break;
        case "Multiple Planets":
            imageUrl = "images/MultiPlanetsGold-1920x836.png";
            break;
        case "Purple Lightning":
            imageUrl = "images/PurpleLightning-1920x726.png";
            break;
        default:
            imageUrl = "images/EarthMoon-1920x664.png";
            break;
    }

    coverValue = (cover === "True");
    parallaxScroll = new ParallaxScroll("parallaxArea", imageUrl, backgroundHeight , Number(speed), Number(xVal), Number(yVal), coverValue);
};





var ParallaxScroll = function (sectionId, backgroundImage, height, speed, xVal, yVal, cover) {
    this.sectionId = sectionId;
    this.backgroundImage = backgroundImage;
    this.height = height;
    this.speed = speed;
    this.xVal = xVal;
    this.yVal = yVal;
    this.cover = cover;

    this.sectionObj = $("#" + this.sectionId);

    this.initialize();
};

ParallaxScroll.prototype.initialize = function () {
    var realThis = this;
    var backgroundPos = this.xVal + " " + this.yVal + "px";

    this.sectionObj.css("background-image", "url(\"" + this.backgroundImage + "\")");
    this.sectionObj.css("height", this.height + "px");
    this.sectionObj.css("background-repeat", "no-repeat");
    this.sectionObj.css("background-attachment", "fixed");

    if (this.cover) {
        this.sectionObj.css("background-size", "cover");
    }
    else {
        this.sectionObj.css("background-size", "");
    }



    this.sectionObj.css("background-position", backgroundPos);

    this.sectionObj.css("line-height", this.height + "px");

    window.onscroll = function(){
        var windowYOffset = window.pageYOffset;
        var backgroundPos = realThis.xVal + " " + ((windowYOffset * realThis.speed) + realThis.yVal) + "px";

        realThis.sectionObj.css("background-position", backgroundPos);
    };
};