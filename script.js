var xmlhttp = new XMLHttpRequest();
var url = "http://api.open-notify.org/astros.json";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

var canvas = document.getElementById('astroCanvas');
var ctx = canvas.getContext('2d');
var astroIcon = new Image();
astroIcon.src = "_images/astroicon.png"
var width = astroIcon.width;
var height = astroIcon.height;
var x = 0;
var y = 0;

console.log("width: " + width);
console.log("height: " + width);

canvas.width = (width * 3);
canvas.height = (4/2) * astroIcon.height;

for(i = 0; i < 4; i++) {
    if(x + width > canvas.width) {
        x = 0;
        y += astroIcon.height;
    }
    ctx.drawImage(astroIcon, x, y);
    x += width;
}