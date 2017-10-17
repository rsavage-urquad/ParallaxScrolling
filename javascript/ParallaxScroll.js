var index;
var parallaxScroll;

$(document).ready(function(){
    index = new Index();
});

/* -----------------------------------------------------------------*/

/**
 * Index Object - Object for Page
 * @constructor
 */
var Index = function() {
    this.selectClicked();
};

/**
 * selectClicked() - Process the "Select" click event by retrieving the parameters from the
 * Input and Select elements and creating a ParallaxScroll object
 */
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

/* -----------------------------------------------------------------*/

/**
 * ParallaxScroll Object - Handles the setup and scrolling of the background.
 * @param {String} sectionId - Section to contain the Background
 * @param {string} backgroundImage - Image to use as the Background.
 * @param {number} height - Height of the Section (in pixels)
 * @param {number} speed - Scroll speed (ratio) of background to page.
 * @param {string|number} xVal - Background X Position (If unsure, try 0)
 * @param {number} yVal - Background Y Position in pixels, usually negative (You may have to play with this to avoid running out of image to display),
 * @param {boolean} cover - Should
 * @constructor
 */
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

/**
 * initialize() - Initialize the Background element (
 */
ParallaxScroll.prototype.initialize = function () {
    var realThis = this;
    var backgroundPos = this.xVal + " " + this.yVal + "px";

    // Set CSS values
    this.sectionObj.css("background-image", "url(\"" + this.backgroundImage + "\")");
    this.sectionObj.css("height", this.height + "px");
    this.sectionObj.css("background-repeat", "no-repeat");
    this.sectionObj.css("background-attachment", "fixed");
    this.sectionObj.css("background-position", backgroundPos);
    this.sectionObj.css("line-height", this.height + "px");

    if (this.cover) {
        this.sectionObj.css("background-size", "cover");
    }
    else {
        this.sectionObj.css("background-size", "");
    }

    // Setup Scroll event ptocessing.
    window.onscroll = function(){
        var windowYOffset = window.pageYOffset;
        var backgroundPos = realThis.xVal + " " + ((windowYOffset * realThis.speed) + realThis.yVal) + "px";

        realThis.sectionObj.css("background-position", backgroundPos);
    };
};