fetchPeopleInSpace();
fetchSpaceStationLocation();

function fetchPeopleInSpace() {
    var xmlhttp = new XMLHttpRequest();
    var url = "http://api.open-notify.org/astros.json";
    
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var response = JSON.parse(this.responseText);  
            console.log(response);
            initPeopleInSpace(response["people"]);
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
    var peopleInSpaceText = document.getElementById('peopleInSpaceText');
    var peopleInSpaceTable = document.getElementById('peopleInSpaceTable');
    var peopleInSpaceTableHtml = peopleInSpaceTable.innerHTML;
    peopleInSpaceText.innerHTML="There are " + peopleInSpace.length + " people in space right now";
      
    for (i = 0; i < peopleInSpace.length; i++) {
        peopleInSpaceTableHtml += astronautItem(peopleInSpace[i]['name'], peopleInSpace[i]['craft']);
    }

    peopleInSpaceTable.innerHTML = peopleInSpaceTableHtml;
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
      zoom: 1,
      center: spaceStationLocation
    });
    var marker = new google.maps.Marker({
      position: spaceStationLocation,
      map: map
    });
  }

  function astronautItem(name, craft) {
      var html = "<tr> <td>" + name + "</td>" + "<td>" + craft + "</td> </tr>";
      return html;
  }

