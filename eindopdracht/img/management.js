
	function getAllRaces(callback)
	{
		$.get("races", function(response)
		{
			callback(response);
		});
	}
	function getRaceById(id, callback)
	{
		$.get("races/" + id, function(response)
		{
			callback(response);
		});
	}
	function getJSONFromURL(url, callback)
	{
		$.get(url, function(response)
		{
			callback(response);
		});
	}
	function getGoogleMapsGeoCreate()
	{
		//var searchBox = new google.maps.places.SearchBox(input);
		var input = /** @type {HTMLInputElement} */(
      	document.getElementById('geocreate'));
  		var searchBox = new google.maps.places.SearchBox(
    	/** @type {HTMLInputElement} */(input));
  		google.maps.event.addListener(searchBox, 'places_changed', function() {

  			  var places = searchBox.getPlaces();
  			  if (places.length == 0) {
			      return;
			  }
			  var place = places[0];
			  loadWaypointsCreate(place.geometry.location);
		});
	}
	function loadWaypointsCreate(GEO)
	{
		$("#resultpoints").empty();
		var geo = GEO.lat() + "," + GEO.lng();
		var URI = "maps/" + GEO.lat() + "/" + GEO.lng();

		getJSONFromURL(URI, function(response)
		{
			for(var race in response.results)
			{
				var lng = response.results[race].geometry.location.lng;
				var lat = response.results[race].geometry.location.lat;
				
				$("#resultpoints").append('<li><a  lat="' + lat+ '" lng="' + lng+ '" place-id="' + response.results[race].place_id + '">' + response.results[race].name + '</a></li>');
			}
			//$("#resultpoints").listview("refresh");
		});
	}
	function getGoogleMapsGeoEdit()
	{
		//var searchBox = new google.maps.places.SearchBox(input);
		var input = /** @type {HTMLInputElement} */(
      	document.getElementById('geoedit'));
  		var searchBox = new google.maps.places.SearchBox(
    	/** @type {HTMLInputElement} */(input));
  		google.maps.event.addListener(searchBox, 'places_changed', function() {

  			  var places = searchBox.getPlaces();
  			  if (places.length == 0) {
			      return;
			  }
			  var place = places[0];
			  loadWaypointsEdit(place.geometry.location);
		});
	}
	function loadWaypointsEdit(GEO)
	{
		$("#resultpoints").empty();
		var geo = GEO.lat() + "," + GEO.lng();
		var URI = "maps/" + GEO.lat() + "/" + GEO.lng();
		getJSONFromURL(URI, function(response)
		{
			for(var race in response.results)
			{
				var lng = response.results[race].geometry.location.lng;
				var lat = response.results[race].geometry.location.lat;
				
				$("#editresultpoints").append('<li><a  lat="' + lat+ '" lng="' + lng+ '" place-id="' + response.results[race].place_id + '">' + response.results[race].name + '</a></li>');
			}
			//$("#resultpoints").listview("refresh");
		});
	}



	function reloadPage()
	{
		location.reload();
	}
	

	function saveRace()
	{

		var _waypoints = [];

		var listItems = $("#waypoints li a");
		listItems.each(function(idx, a) {
			var point = $(a);

			var _name = point.text();
			var _placeid = point.attr("place-id");
			var _lng = point.attr("lng");
			var _lat = point.attr("lat");

			_waypoints.push({placeid: _placeid, name: _name, latitude: _lat, longitude: _lng});
		});

		var _name = $("#racename").val();
		var _description = $("#racedescrip").val();
		var _status = $("#racestatus").val();
		var _startdatum = $("#racestartdate").val();
		var stringify = JSON.stringify(_waypoints);
		var URI = "races";
		$.post(URI, { name: _name, description:_description, startdatum: _startdatum, status: _status, way: stringify}, function(response)
		{

			if(response._id != null)
			{
				alert("Race toegevoegd");
			} else {
				alert(JSON.stringify(response));
			}
			reloadPage();
		});
	}

	function editRace(id)
	{
		var _waypoints = [];
		var listItems = $("#editwaypoints li a");
		listItems.each(function(idx, a) {
			var point = $(a);

			var _name = point.text();
			var _placeid = point.attr("place-id");
			var _lng = point.attr("lng");
			var _lat = point.attr("lat");
			var waypointid = point.attr("way-id");

			_waypoints.push({placeid: _placeid, name: _name, latitude: _lat, longitude: _lng, waypoint: waypointid});
		});

		var _name = $("#editracename").val();
		var _description = $("#editracedescrip").val();
		var _status = $("#editracestatus").val();
		var _startdatum = $("#editracestartdate").val();
		var stringify = JSON.stringify(_waypoints);
		var URI = "races/"+id;


		var dataObject = { name: _name, description:_description, startdatum: _startdatum, status: _status, way: stringify };

		 $.ajax({
            url: URI,
            type: 'PUT',    
            data: dataObject,
            success: function(result) {
                alert("Race aangepast");
                reloadPage();
            }
        });
	}
	function deleteRaceByID(raceid, callback)
	{
		var URI = "races/"+raceid;
		$.ajax({
			    url: URI,
			    type: 'DELETE',
			    success: function(result) {
			        callback(result);
			    }
			});
	}
	function fnOpenNormalDialog(callback) {
	    $("#dialog-confirm").html("Verwijderen Race");
	    // Define the Dialog and its properties.
	    $("#dialog-confirm").dialog({
		        resizable: false,
		        modal: true,
		        title: "Weet u zeker dat je deze race wilt verwijderen",
		        height: 250,
		        width: 400,
		        buttons: {
		            "Yes": function () {
		                $(this).dialog('close');
		                callback(true);
		            },
		                "No": function () {
		                $(this).dialog('close');
		                callback(false);
		            }
		        }
		    });
		}
