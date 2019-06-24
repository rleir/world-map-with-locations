
// only the baseball circle? or the leaf 

document.addEventListener("DOMContentLoaded", function(event) { 


	var map = L.map('map').setView([30.5, -0.09], 2);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	function onEachFeature(feature, layer) {
		var popupContent = "";

		if (feature.properties) {
            if( feature.properties.place) {
			    popupContent += feature.properties.place;
			    popupContent += "<br>";
            }
            if( feature.properties.popupContent) {
			    popupContent += "<ul>";
                feature.properties.popupContent.forEach(function(inst){
			        popupContent += "<li>";
			        popupContent += inst;
			        popupContent += "</li>";
                });
			    popupContent += "</ul>";
			}
        }
		layer.bindPopup(popupContent);
	}

	L.geoJSON([bicycleRental], {

		style: function (feature) {
			return feature.properties && feature.properties.style;
		},

		onEachFeature: onEachFeature,

		pointToLayer: function (feature, latlng) {
			return L.circleMarker(latlng, {
				radius: 8,
				fillColor: "#ff7800",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			});
		}
	}).addTo(map);




//=====
    
	// Wellington var map = L.map('map').setView([51.5, -0.09], 13);


	var LeafIcon = L.Icon.extend({
		options: {
			shadowUrl: 'leaf-shadow.png',
			iconSize:     [38, 95],
			shadowSize:   [50, 64],
			iconAnchor:   [22, 94],
			shadowAnchor: [4, 62],
			popupAnchor:  [-3, -76]
		}
	});

	var greenIcon = new LeafIcon({iconUrl: 'leaf-green.png'});
	// redIcon = new LeafIcon({iconUrl: 'leaf-red.png'}),
	// orangeIcon = new LeafIcon({iconUrl: 'leaf-orange.png'});

	L.marker([51.5, -0.09], {icon: greenIcon}).bindPopup("I am a green leaf.").addTo(map);
	L.marker([51.495, -0.083]).bindPopup("I am a red leaf.").addTo(map);
	// L.marker([51.495, -0.083], {icon: redIcon}).bindPopup("I am a red leaf.").addTo(map);
	// L.marker([51.49, -0.1], {icon: orangeIcon}).bindPopup("I am an orange leaf.").addTo(map);

    // marker.bindTooltip("my tooltip text").openTooltip();
    // openTooltip(<String|HTMLElement> content, <LatLng> latlng, <Tooltip options> options?)

    //-----------------------------
    // http://bl.ocks.org/d3noob/9267535
    // Map using leaflet.js and d3,js overlaid
    
	/* Initialize the SVG layer */
//zzz	map._initPathRoot()    

	/* We simply pick up the SVG from the map object */
	var svg = d3.select("#map").select("svg"),
	g = svg.append("g");
	
	d3.json("circles.json", function(collection) {
		/* Add a LatLng object to each item in the dataset */
		collection.objects.forEach(function(d) {
			d.LatLng = new L.LatLng(d.circle.coordinates[0],
									d.circle.coordinates[1])
		})
		
		var feature = g.selectAll("circle")
			.data(collection.objects)
			.enter().append("circle")
			.style("stroke", "black")  
			.style("opacity", .6) 
			.style("fill", "red")
			.attr("r", 20);  
		
		map.on("viewreset", update);
		update();

		function update() {
			feature.attr("transform", 
			function(d) { 
				return "translate("+ 
					map.latLngToLayerPoint(d.LatLng).x +","+ 
					map.latLngToLayerPoint(d.LatLng).y +")";
				}
			)
		}
    });
});

    
