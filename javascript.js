var stations =[];
var codes ={};

$(function WMATA() {
    var params = {
        // demo key
        "api_key": "6b700f7ea9db408e9745c207da7ca827"
    };
    $.ajax({
        url: "https://api.wmata.com/Rail.svc/json/jStations?" + $.param(params),
        type: "GET",
    })
    .done(function(data) {
      $.each(data.Stations,function(i){
        stations.push(data.Stations[i].Name);
        var name = data.Stations[i].Name;
        codes[name] = data.Stations[i].Code;
      });
    })
    .fail(function() {
        alert("error");
    });
});

$(function stationDropdown() {
  $("#start").autocomplete({
    source: stations
  });
  $("#end").autocomplete({
    source: stations
  });
});

function price(){
  var start = document.getElementById("start").value;
  var end = document.getElementById("end").value;
  var params = {
            "api_key": "6b700f7ea9db408e9745c207da7ca827",
            "FromStationCode": codes[start],
            "ToStationCode": codes[end]
        };
	$.ajax({
            url: "https://api.wmata.com/Rail.svc/json/jSrcStationToDstStationInfo?" + $.param(params),
            type: "GET",
        })
	.done(function(data) {
		if(start == "" || end== ""){
			$("#peak").html("Please pick begining and end")
		}else{
			$("#peak").html("Peak: $"+data.StationToStationInfos[0].RailFare.PeakTime);
			$("#offPeak").html("Off Peak: $" +data.StationToStationInfos[0].RailFare.OffPeakTime);
			$("#sr").html("Senior Citezen $" +data.StationToStationInfos[0].RailFare.SeniorDisabled);
		}

	})
	.fail(function() {
            alert("error");
        });
}
