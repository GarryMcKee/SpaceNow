fetchPeopleInSpace();
fetchSpaceStationLocation();

function fetchPeopleInSpace() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.open-notify.org/astros.json";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);  
            initPeopleInSpace(response["number"]);
        }
    };
    
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function fetchSpaceStationLocation() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.open-notify.org/iss-now.json";

    xmlhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);
            initSpaceStationLocation(response['iss_position']['latitude'], response['iss_position']['longitude']);
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function initPeopleInSpace(peopleInSpace) {
    var canvas = document.getElementById('astroCanvas');
    var ctx = canvas.getContext('2d');
    var peopleInSpaceText = document.getElementById('peopleInSpaceText');
    var astroIcon = new Image();
    astroIcon.src = "_images/astroicon.png"
    var width = astroIcon.width;
    var height = astroIcon.height;
    var x = 0;
    var y = 0;

    peopleInSpaceText.innerHTML="There are " + peopleInSpace + " people in space right now";
    
    canvas.width = (width * 4);
    canvas.height = (4/2) * astroIcon.height;
    
    for(i = 0; i < peopleInSpace; i++) {
        if(x + width > canvas.width) {
            x = 0;
            y += astroIcon.height;
        }
        ctx.drawImage(astroIcon, x, y);
        x += width;
    }
}

function initSpaceStationLocation(lat, lon) {
    var latText = document.getElementById("latValueText");
    var lonText = document.getElementById("lonValueText");
    latText.innerHTML = lat;
    lonText.innerHTML = lon;

    initMap(lat, lon);
}

function initMap(latVal, lonVal) {
    var spaceStationLocation = {lat: parseFloat(latVal), lng: parseFloat(lonVal)};
    console.log(spaceStationLocation);
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: spaceStationLocation
    });
    var marker = new google.maps.Marker({
      position: spaceStationLocation,
      map: map
    });
  }

