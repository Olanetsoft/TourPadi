//Get the locations from the supplied data on the front end
const locations = JSON.parse(document.getElementById('map').dataset.locations);
//console.log(locations)

mapboxgl.accessToken = 'pk.eyJ1Ijoib2xhbmV0c29mdCIsImEiOiJjazFudTBkbTcwYTFrM2JxZncxZW9zOXNjIn0.YgyUQrHeEyvLPKZZDP_yJg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/olanetsoft/ckal1e85h24ym1iqm5w9z4zo7',
    //setting scroll to False
    scrollZoom: false
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: 
});

//defining our bounds
const bounds = new mapboxgl.LngLatBounds();

//looping through all locations
locations.forEach(loc => {
    //Create marker
    const el = document.createElement('div');
    el.className = 'marker'


    //Add Marker
    new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
    }).setLngLat(loc.coordinates).addTo(map);//setting latlng and adding it to map variable created earlier


    //Add a pop up
    new mapboxgl.Popup({
        offset: 30
    })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map)


    //now extends map bounds to include current location
    bounds.extend(loc.coordinates)
});


//fitting the map to bounds
map.fitBounds(bounds, {
    padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
});