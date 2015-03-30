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


	function addUserToWaypoint(raceid,waypointid, userid, callback)
	{
		var url = "races/" + raceid + "/waypoint/" + waypointid + "/user/" + userid;
		$.post(url, function(response)
		{
			callback(response);
		});
	}
	function showDetails(response)
	{
		var id = $("#races").val();
			//alert(JSON.stringify(response.waypoints));
		for(var point in response.waypoints)
		{
			var waypoint = response.waypoints[point];
			if(waypoint.users.length > 0)
			{	
				var _append = "<li id='wayp' data-id='" + waypoint._id + "' style='margin-top:10px;'><b> Cafe Waypoint " + waypoint.name + "</b>"; 
				_append += '<ul id="' + waypoint._id + '" class="noicon">';
				_append += '<li  style="margin-top:20px;"><b>Personen die deze checkpoint behaald hebben : </b><li>';
				for(var index in waypoint.users)
				{
					var user = waypoint.users[index];
					_append += '<li class="nestedli smallmargin" style="list-style-type:none";>' + user.fullName + '</li>';
				}
				_append += "</ul></li>";
				$("#waypoints").append(_append);
			}
			else
			{
				var _append = "<li id='wayp' data-id='" + waypoint._id + "' style='margin-top:10px;'><b> Cafe Waypoint " + waypoint.name + "</b>";
				_append += '<ul id="' + waypoint._id + '" class="noicon">';
				_append += '<li  style="margin-top:20px;"><b>Personen die deze checkpoint behaald hebben : </b><li>';
				_append += "</ul></li>";
				$("#waypoints").append(_append);

			}
		}	
	}

	function userIsMemberOfRace(race)
	{

		var user = JSON.parse(localStorage.getItem("user"));
		if(user != null) {
			for(var index in race.users)
			{
				var _user = race.users[index];
				if(_user == user.id)
				{
					return true;
				}
			}
		}
		return false;
	}
	function addUserToRace(raceid, userid)
	{
		var URI = "races/" +raceid + "/user/"+userid;
		$.post(URI, function(response)
		{
	
			if(response != "err")
			{
				alert("Je bent toegevoegt aan deze race");
				window.location.reload();
			}
		});
	}
