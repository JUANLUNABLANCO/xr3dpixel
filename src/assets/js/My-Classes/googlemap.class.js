function init_GMAP() {
    var geocoder;
    var map;
    // var geocode_search;
    var region;
    var origin;
    var mark;
    var new_centr;


    function initialize() {
        origin = { 'pqt': { 'lat': 36.736746, 'long': -4.54998 } }; //localizaciones 36.7365839, -4.5518074 // cade pta
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(origin.pqt.lat + .0001, origin.pqt.long);
        var mapOptions = {
            zoom: 19,
            center: latlng
        };
        map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
        // geocode_search = document.getElementById("geocode_search");
        // console.log(geocode_search);
        // geocode_search.addEventListener("click", codeAddress, false);


        mark = new google.maps.LatLng(origin.pqt.lat, origin.pqt.long);
        // ##################### <<< icon_gold_star
        try {
            var gold_star = {
                path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                fillColor: "yellow",
                fillOpacity: 0.8,
                scale: 0.1,
                strokeColor: "gold",
                strokeWeight: 2
            };
            markerStart = new google.maps.Marker({
                position: mark,
                title: "XR3DPixel",
                animation: google.maps.Animation.BOUNCE,
                icon: gold_star
            });
            // nuevo marker con etiqueta
            markerLabel = new google.maps.Marker({
              position: mark,
              title: "Click to toogle bounce this marker | Click para parar de saltar",
              animation: google.maps.Animation.BOUNCE,
              icon: '/assets/images/content/googlemaps/blue_circle.png',
              zIndex:100
            });
            google.maps.event.addListener(markerLabel, 'mouseover', function(event) {
                this.setIcon('/assets/images/content/googlemaps/avr3ds_marker.png');
            });
            google.maps.event.addListener(markerLabel, 'mouseout', function(event) {
                this.setIcon('/assets/images/content/googlemaps/blue_circle.png');
            });
            // nuevo marker con etiqueta
            // markerStart.setMap(map);
            markerLabel.setMap(map);
            new_center = markerLabel; //variable que guarda el new center in map
            markerLabel.addListener('click', ToggleBounce);
            // click to stop bounce
            function ToggleBounce() {
              if (markerLabel.getAnimation() !== null) {
                markerLabel.setAnimation(null);
              } else {
                markerLabel.setAnimation(google.maps.Animation.BOUNCE);
              }
            }
        } catch (error) {
            messages(error);
        }
        //############## <<< icon_gold_star

    }


    google.maps.event.addDomListener(window, 'load', initialize);

    // ### BUSCADOR SENCILLO
    // function codeAddress() {
    //     var address = document.getElementById('address').value;
    //     geocoder.geocode({ 'address': address, 'region': region }, function(results, status) {
    //         if (status == google.maps.GeocoderStatus.OK) {
    //             map.setCenter(results[0].geometry.location);
    //             var marker = new google.maps.Marker({
    //                 map: map,
    //                 position: results[0].geometry.location
    //             });
    //             console.log(results);
    //         } else {
    //             alert('Geocode was not successful for the following reason: ' + status);
    //         }
    //     });
    // }







    // ################ MAS FUNCIONALIDADES DE GOOGLE MAPS
    // /**
    //   *	@title: googlemap.js
    //   *	@Author: Juan Luna
    //   *	@version: 1.0
    //   *	@Date:   10/10/2014
    //   *	@Description: una mezcolanza de todas las utilidades del api googlemaps para js
    //   */
    // //################################################################### fin documentation
    // "use strict";
    // 		//########################################################### variables globales
    // 		var type_map="ROADMAP";							//tipo mapa inicial
    // 		var b_roadmap, b_satelite, b_hybrid, b_terrain, b_grades,b_zoom_up,b_zoom_down; //botones del html
    // 		var map;										//el mapa
    // 		var origin;										//el punto origen
    // 		var marker;										//una marca
    // 		var rute;										//un Polyline
    // 		var Malaga,Madrid,Barcelona,Bilbao;				//LatLng positions
    // 		var Bilbao_marked=false;
    // 		var myTrip=[];									//el path del Polyline
    // 		var myRute=[];									//myTrip Strings
    // 		var extension;									//Poligon
    // 		var finish;										//Circle
    // 		var infowindow;									//ventana Info
    // 		var markers=[];									//array de markers
    // 		var new_center;									//new Center in map
    // 		var initial_zoom=5;								//zoom inicial
    // 		var middle_zoom=15;
    // 		var current_zoom=initial_zoom;					//el zoom actual.
    // 		//*****
    // 		// hay que cambiarlo cada vez que cambiemos el zoom desde cualquier función//
    // 		//*****
    // 		var time_split=300000;							//tiempo de espera tras un cambio de centro, normalmente 3000 ms
    // 		var marker_bilbao;								//otra marca
    // 		var grades=true;								//tilt 45º
    // 		var tilt=45;
    // 		var tm_roadmap 	= google.maps.MapTypeId.ROADMAP;
    // 		var tm_Hybrid 	= google.maps.MapTypeId.HYBRID;
    // 		var tm_satellite= google.maps.MapTypeId.SATELLITE;
    // 		var tm_terrain 	= google.maps.MapTypeId.TERRAIN;
    // 		var styles=[];
    // 		var span_info=null;								//para el Zoom
    // 		var drawing_manager;							//para el drawing manager
    // 		var ft_layer;									//fusion tables layer
    // 		var fuengirola;									//para centrar el mapa aqui
    // 		var weather_layer;								//the weather control
    // 		var clouds_layer;								//the clouds control
    // 		var address;									//to geopositioning an address
    // 		var search_address;								//the click button that begin search address

    // 		//stylers										//estilos definidos al final de este archivo
    // 		//########################################################### fin initialize() //inicializamos origin, map,
    // 		/**
    // 		 * [initialize description] función que inicializa el google map, con unas propiedades iniciales.
    // 		 * Otras funciones como zoom, marker, ruta, poligono, circle, poliline, bounds y una clase HomeControl
    // 		 * @return {[null]}
    // 		 */
    // 		function initialize(){
    // 			origin =new google.maps.LatLng(36.7166,-4.42);
    // 			var mapProp = {
    // 				center:origin,
    // 				zoom:current_zoom,
    // 				disableDefaultUI: false,
    // 				mapTypeId:tm_roadmap,
    // 				mapTypeControl: false,
    // 				//controla externamente todos estos de abajo
    // 				panControl: false,
    // 				zoomControl: false,
    // 				scaleControl: false,
    // 				streetViewControl: false,
    // 				//sale un minimapa, no respeta la posicion
    // 				overviewMapControl: true,
    // 				overviewMapControlOptions: {
    // 					opened: true,
    // 					position: google.maps.ControlPosition.UP_LEFT
    // 				}
    // 			};
    // 			map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    // 			addZoomInfo();		//funcion que actualiza la info del boton zoom
    // 																									console.log(map);
    // 																									console.log(map.getMapTypeId());

    // 			//###################################
    // 			//butons map_type_id >>>
    // 			//###################################
    // 			//buttons propios de map_type_id
    // 			b_roadmap 	= document.getElementById('roadmap');
    // 			b_satelite 	= document.getElementById('satellite');
    // 			b_hybrid 	= document.getElementById('hybrid');
    // 			b_terrain 	= document.getElementById('terrain');
    // 			b_grades	= document.getElementById("grades");
    // 			b_zoom_up	= document.getElementById("zoom_up");
    // 			b_zoom_down	= document.getElementById("zoom_down");
    // 			//manejadores de los botones
    // 			try{
    // 				b_roadmap.addEventListener("click",function(){
    // 					map.setMapTypeId(tm_roadmap);
    // 					botonHabilited();
    // 				},false);
    // 				b_satelite.addEventListener("click",function(){
    // 					map.setMapTypeId(tm_satellite);
    // 					botonHabilited();
    // 				},false);
    // 				b_hybrid.addEventListener("click",function(){
    // 					map.setMapTypeId(tm_Hybrid);
    // 					botonHabilited();
    // 				},false);
    // 				b_terrain.addEventListener("click",function(){
    // 					map.setMapTypeId(tm_terrain);
    // 					botonHabilited();
    // 				},false);
    // 			}catch(error){
    // 				messages(error);
    // 			}
    // 			//#################################### <<< buttons map_type_id

    // 			/*################################
    // 			  button grades	>>>
    // 			  ################################*/
    // 			//habilitar o no el boton grades
    // 			botonHabilited();	//funcion que comprueba el estado del maptypeid si es hybrid o satellite dissabled=true else dissabled=false
    // 			//grades puede tener 0º o 45º, al pulsar sobre el botón cambia. *comentario: No funciona o no es compatible con la zona
    // 			try{
    // 				b_grades.addEventListener("click",function(){
    // 					grades=!grades;
    // 					(grades==true)?tilt=45:tilt=0;
    // 					map.setTilt(tilt);	//NO ME FUNCIONA
    // 																									console.log("grades: "+tilt);
    // 																									console.log(map.getTilt());
    // 					//cambiar el valor del value de ese boton
    // 					b_grades.value = "grades: "+tilt;
    // 				},false);
    // 			}catch(error){
    // 					messages(error);
    // 				}
    // 			//################################ <<< button grades

    // 			/*#####
    // 			  zoom control >>>
    // 			  #####*/
    // 			// tenemos control sobre zoom + y sobre zoom -, la info del control debe actualizarse así como el valor del a variable current_zoom
    // 			try{
    // 				b_zoom_up.addEventListener("click",function(){
    // 					if (current_zoom>20)current_zoom=20;
    // 					current_zoom +=2;
    // 					map.setZoom(current_zoom);
    // 					addZoomInfo();
    // 				},false);
    // 				b_zoom_down.addEventListener("click",function(){
    // 					if (current_zoom<0)current_zoom=0;
    // 					current_zoom -=2;
    // 					map.setZoom(current_zoom);
    // 					addZoomInfo();
    // 				},false);
    // 			}catch(error){
    // 					messages(error);
    // 				}
    // 			//##### <<< zoom control



    // 			/*##############
    // 			  icon_gold_star >>>
    // 			  ##############*/
    // 			//una marca animada en el mapa, con icon:svg, es decir dibujada con codigo no con imagen
    // 			try{
    // 				var gold_star = {
    // 					path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    // 					fillColor: "yellow",
    // 					fillOpacity: 0.8,
    // 					scale: .05,
    // 					strokeColor: "gold",
    // 					strokeWeight: 2
    // 				};
    // 				marker = new google.maps.Marker({
    // 					position:origin,
    // 					title:"click to zoom",
    // 					animation:google.maps.Animation.BOUNCE,
    // 					icon:gold_star
    // 				});
    // 				marker.setMap(map);
    // 				new_center=marker;								//variable que guarda el new center in map
    // 			}catch(error){
    // 					messages(error);
    // 				}
    // 			//############## <<< icon_gold_star

    // 			/*#########################
    // 			  rute_malaga_madrid_malaga >>>
    // 			  #########################*/
    // 			Malaga = origin;
    // 			Madrid = new google.maps.LatLng(40.416775,-3.703790);
    // 			Barcelona = new google.maps.LatLng(41.385064, 2.173403);
    // 			Bilbao = new google.maps.LatLng(43.263013,-2.934985);
    // 			try{
    // 				myTrip.push(Malaga,Madrid,Barcelona);
    // 				myRute.push("Málaga","Madrid","Barcelona");
    // 							console.log(myTrip);
    // 				rute = new google.maps.Polyline({
    // 					path:myTrip,
    // 					strokeColor:"#000",
    // 					strokeOpacity:0.8,
    // 					strokeWeight:2
    // 				});
    // 				rute.setMap(map);
    // 			}catch(error){
    // 					messages(error);
    // 				}
    // 			//######################### <<< rute_malaga_madrid_malaga












    // 			//###########################################################
    // 			//un poligono
    // 			extension = new google.maps.Polygon({
    // 				path:myTrip,
    // 				strokeColor:"#000",
    // 				strokeOpacity:0.8,
    // 				strokeWeight:2,
    // 				fillColor:"#fff",
    // 				fillOpacity:.5,
    // 				editable:false			//puede editarse si queremos por el usuario
    // 			});
    // 			extension.setMap(map);

    // 			//###########################################################
    // 			//un circle en la ultima ciudad del trip
    // 			finish = new google.maps.Circle({
    // 				center:myTrip[myTrip.length-1],
    // 				radius:30000,
    // 				strokeColor:"#0f0",
    // 				strokeOpacity:.6,
    // 				strokeWeight:1,
    // 				fillColor:"#0f0",
    // 				fillOpacity:.3
    // 			});
    // 			finish.setMap(map);

    // 			//###########################################################
    // 			//un rectangulo con sus oarámetros bounds
    // 			var rectangle = new google.maps.Rectangle({
    // 			    strokeOpacity: 0.8,
    // 			    strokeColor: '#FF0000',
    // 			    strokeWeight: 2,
    // 			    fillColor: '#FF0000',
    // 			    fillOpacity: 0.35,
    // 			    map: map,
    // 			    bounds: new google.maps.LatLngBounds(
    // 			      new google.maps.LatLng(40.416775,-3.703790),
    // 			      new google.maps.LatLng(41.385064, 2.173403))
    // 			});
    // 			rectangle.setMap(map);

    // 			//###########################################################

    // 			//########################################################### Class HomeControl
    // 			//introducir un control propio  dentro del mapa que haga algo, haremos una clase HomeControl, rara pues es concretísima
    // 			function HomeControl(controlDiv,map){
    // 				controlDiv.style.padding = "5px";	//un control externo
    // 				//un div
    // 				var controlUI = document.createElement('div');
    // 				controlUI.style.backgroundColor = "yellow";
    // 				controlUI.style.border = "1px solid";
    // 				controlUI.style.cursor = "pointer";
    // 				controlUI.style.textAlign = "center";
    // 				controlUI.style.title = "set map to London";
    // 				//meter en el control que nos llega el div
    // 				controlDiv.appendChild(controlUI);
    // 				//un texto
    // 				var controlText = document.createElement("div");
    // 				controlText.style.fontFamily = "Arial Sans-serif";
    // 				controlText.style.fontSize = "12px";
    // 				controlText.style.paddingLeft = "4px";
    // 				controlText.style.paddingRight = "4px";
    // 				controlText.innerHTML = "<b>Bilbao<b>";
    // 				//meter ese texto en el div
    // 				controlUI.appendChild(controlText);
    // 				//evento que maneja este control
    // 				google.maps.event.addDomListener(controlUI, "click", function(){
    // 						map.setCenter(Bilbao);
    // 						//crear una marca dinámica en bilbao sino lo está
    // 						if (Bilbao_marked==false){
    // 							marker_bilbao = new google.maps.Marker({
    // 								position:Bilbao,
    // 								title:"click to zoom",
    // 								animation:google.maps.Animation.BOUNCE,
    // 								icon:"media/images/icon_mark_lolipop.png"
    // 							});
    // 							marker_bilbao.setMap(map);
    // 							Bilbao_marked=true;
    // 						}
    // 				});

    // 			}; //fin clase HomeControl
    // 			//ahora creemos un objeto de esta clase, antes debemos crear un control
    // 			//creamos un control
    // 			var bilbaoControlDiv = document.createElement("div");
    // 			//un objeto de la clase anterior
    // 			var homeControl = new HomeControl(bilbaoControlDiv, map);
    // 			//ahora hay que colocarlo dentro del mapa en una posición
    // 			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(bilbaoControlDiv);
    // 			//########################################################### class HomeControl

    // 			//########################################################### Eventos
    // 			//Eventos
    // 			//click sobre el center, u otros, para ello debemos pasar los componentes de myTrip a marker
    // 			for (var i=0,l=myTrip.length; i<l; i++){
    // 				markers.push(new google.maps.Marker({
    // 					position:myTrip[i],
    // 					title:"click to zoom",
    // 					animation:google.maps.Animation.BOUNCE,
    // 					icon:"media/images/icon_mark_lolipop.png"
    // 				}));
    // 				markers[i].rute=myRute[i];
    // 				markers[i].setMap(map);

    // 			}
    // 			//objetos marker centrarlos con click y añadir una infowindow
    // 			for (var i=0,l=markers.length; i<l; i++){
    // 				google.maps.event.addListener(markers[i],"click", function(){
    // 					map.setZoom(middle_zoom);
    // 					addZoomInfo();
    // 					new_center=this;
    // console.log(new_center);
    // console.log(this.getPosition());		//y no markers[i], porque esta referencia se perderá cuando el evento arranque, ya que el  for ya se habrá cerrado
    // 					map.setCenter(this.getPosition());
    // 					//infowindow informaciones de los markers en ventanas informativas
    // 					infowindow = new google.maps.InfoWindow({
    // 						content:this.rute +": "+ this.getPosition().toString(), //myRute[i]
    // 						size: new google.maps.Size(450,350)	//tamaño del window

    // 					});
    // 					infowindow.open(map,this);
    // 				});
    // 			}
    // 			//volver al estado anterior tras un click evento center_changued, pero cambiando el centro de masas dependiendo donde cliqueemos
    // 			google.maps.event.addListener(map,'center_changed',function() {
    // 			// 3 seconds after the center of the map has changed, pan back to the marker
    // 			  window.setTimeout(function(){
    // console.log(new_center);
    // 				map.setZoom(initial_zoom);
    // 			    map.panTo(new_center.getPosition());
    // 			    addZoomInfo();
    // 			  },time_split);
    // 			});

    // 			/*##############################################
    // 				marcas nuevas en cualquier posicion del mapa
    // 			  ##############################################*/
    // 			//hacer click en cualquier sitio y crear una marca distinta a las ordinarias
    // 			google.maps.event.addListener(map, "click", function(event){
    // 				placeMarker(map, event.latLng);		//funcion externa que recibe una localización cualquiera de tipo LatLang originada por el event.latLng
    // 													//y crea una marca
    // 													//observa que es latLng con minúscula
    // 																									console.log(event.latLng);
    // 			});
    // 			//#############################################
    // 			//bounds crear unos límites del mapa donde generar marcas u otras acciones
    // 			var southWest = new google.maps.LatLng(30,-7);
    // 			var northEast = new google.maps.LatLng(43,2);
    // 			var bounds = new google.maps.LatLngBounds(southWest,northEast);
    // 			map.fitBounds(bounds);					//centrar el mapa entorno a esos bounds
    // 			addZoomInfo()


    // 			// DRAWING MANAGER
    // 			// crearemos el objeto en este momento y cuando se desactive lo eliminaremos
    // 			// tanto para crear drawing manager como para crear weather necesitamos especificar las librerias en el objeto url
    // 			// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDY0kkJiTPVd2U7aTOAwhc9ySH6oHxOIYM&sensor=false&language=es&libraries=drawing&libraries=weather"></script>
    // 			// pero date cuenta que solo podemos tener una variable libraries=algo, otra, otra
    // 			var opt_drawing = document.getElementsByName("drawing");
    // 			for (var i=0, l=opt_drawing.length; i<l; i++){
    // 				opt_drawing[i].addEventListener("change",function(){
    // 					if (this.checked && this.value == "on"){
    // 						drawing_manager = new google.maps.drawing.DrawingManager({
    // 							drawingMode: google.maps.drawing.OverlayType.MARKER,
    // 							drawingControl: true,
    // 							drawingControlOptions: {
    // 								position: google.maps.ControlPosition.TOP_CENTER,
    // 								drawingModes:  [google.maps.drawing.OverlayType.MARKER,
    // 												google.maps.drawing.OverlayType.CIRCLE,
    // 												google.maps.drawing.OverlayType.POLYGON,
    // 												google.maps.drawing.OverlayType.POLYLINE,
    // 												google.maps.drawing.OverlayType.RECTANGLE]
    // 							}
    // 						});//fin drawing manager
    // 						drawing_manager.setMap(map);
    // 					}else if (this.checked && this.value == "off") {
    // 						drawing_manager.setOptions({
    // 							drawingControl: false,									//deshabilitamos el drawingControl
    // 							drawingMode: google.maps.drawing.OverlayType.null		//deshabilitamos los drawingModes
    // 						});
    // 						drawing_manager.setMap(null);		// y no drawing_manager = null // eso eliminaria el objeto pero no retornaria
    // 															//el setMap() anterior

    // 					}
    // 				},false);

    // 			}//FIN DRAWING MANAGER

    // 			//SUPERPOSICONES PERSONALIZADAS
    // 			//-para saber más seguir la documentación en 'developers.google.com/maps/documentation/Overlays'  -

    // 			//Capas FUSIONTABLESLAYER
    // 			//podemos utilizar tablas creadas o crearlas nosotros mismos en la aplicación de google  'interfaz web de google fusion tables'
    // 			//posteriormente podemos utilizar esa tabla creando una consulta dentro del propio constructor de FusionTablesLayer()
    // 			//1hfZdnZ949wH1r3pWFG_7_ruhH7sVCDHAivHqrgjG   id de tabla
    // 			var opt_ft_layer = document.getElementsByName("ft_layer");
    // 			for (var i=0, l=opt_ft_layer.length; i<l; i++){
    // 				opt_ft_layer[i].addEventListener("change",function(){
    // 					if (this.checked && this.value == "on"){
    // 						ft_layer = new google.maps.FusionTablesLayer({
    // 							query:{
    // 								select: "location",
    // 								from: "1hfZdnZ949wH1r3pWFG_7_ruhH7sVCDHAivHqrgjG"
    // 							},
    // 						});
    // console.log(ft_layer);
    // 						ft_layer.setMap(map);		//enlazando con la tabla externa de Google Fusion Tables
    // 						fuengirola = new google.maps.LatLng(36.5425894,-4.628785);							//esos puntos serán bounds para hacer fitBounds y centrarlos
    // 						progressiveZoom(fuengirola);
    // 						addZoomInfo();
    // 					}else if (this.checked && this.value == "off") {
    // 						ft_layer.setMap(null);		// y no drawing_manager = null // eso eliminaria el objeto pero no retornaria
    // 						regressiveZoom(Madrid);
    // 						addZoomInfo();															//el setMap() anterior
    // 					}
    // 				},false);

    // 			}
    // 						// al pulsarlo el evento center_changed dejará de tener un event listener, cambiará a un
    // 			// nuevo centro en málaga con un zoom de 17 --> middle_zoom y tras crear el objeto FusionTablesLayer
    // 			// accederá a través de una consulta a los puntos los cuales dos de ellos en Av Mijas 23 coinciden
    // 			// deberemos gestionarlos para que se puedan ver las dos ventanas no solo la última geoposicionada
    // 			//

    // 			// WEATHER CONTROL
    // 			// ccontrolamos los eventos de los input type='radio' name='wc_layer' para saber cuando haya un evento changue si
    // 			// el avlor es 'on' o 'off', ap partir de ahí creamos el objeto o lo destruimos volviendo al antiguo map
    // 			var opt_wc_layer = document.getElementsByName("wc_layer");
    // 			for (var i=0, l=opt_wc_layer.length; i<l; i++){
    // 				opt_wc_layer[i].addEventListener("change",function(){
    // 					if (this.checked && this.value == "on"){
    // 						weather_layer = new google.maps.weather.WeatherLayer({
    // 							temperatureUnits:google.maps.weather.TemperatureUnit.CELSIUS
    // 						});
    // 						clouds_layer = new google.maps.weather.CloudLayer();
    // console.log(weather_layer);
    // console.log(clouds_layer);
    // 						weather_layer.setMap(map);		//el tiempo en celsius
    // 						clouds_layer.setMap(map);		//las nubes

    // 					}else if (this.checked && this.value == "off") {
    // 						clouds_layer.setMap(null);		// y no weather_layer = null // eso eliminaria el objeto pero no retornaria
    // 						weather_layer.setMap(null);
    // 					}
    // 				},false);

    // 			}


    // 			// GEOPOSICIONAR UN ADRESS
    // 			//
    // 			search_address = document.getElementById("search");						//el boton search que ini
    // 			search_address.addEventListener("click", function(){
    // 				address = document.getElementById("address").value;   				//el address introducido tras el click y no antes
    // 				if (address !=""){
    // console.log(address);
    // 					// I create a new google maps object to handle the request and we pass the address to it
    // 				    var geoCoder = new google.maps.Geocoder(address);
    // 				      // a new object for the request I called "request" , you can put there other parameters to specify a better search (check google api doc for details) ,
    // 				      // on this example im going to add just the address
    // 				    var request = {address:address};

    // 				      // I make the request
    // 				    geoCoder.geocode(request, function(result, status){
    // 				    	if(status=="OK") {
    // 				            // as a result i get two parameters , result and status.
    // 				            // results is an  array tha contenis objects with the results founds for the search made it.
    // 				            // to simplify the example i take only the first result "result[0]" but you can use more that one if you want

    // 				            // So , using the first result I need to create a  latlng object to be pass later to the map
    // 				            var latlng = new google.maps.LatLng(result[0].geometry.location.lat(), result[0].geometry.location.lng());

    // 					        // some initial values to the map
    // 					        var myOptions = {
    // 						        zoom: 15,
    // 						        center: latlng,
    // 						        mapTypeId: google.maps.MapTypeId.ROADMAP
    // 					        };
    // 					        current_zoom = 15;
    // 					        							//necesario para que no haya una desincronización entre el zoom que manejamos y el dato en esa variable
    // 					        							//current_zoom que utilizamos en el control de zoom propio, ya que es un control nuestro
    // console.log(result);
    // 				            // the map is created with all the information
    // 				            // To change the options we utilize setOptions for more than one option or setCenter, setMapTypeId, ... to change only one specific option
    // 				            map.setOptions(myOptions);

    // 				            addZoomInfo();				//actualizamos el zoom

    // 				            // an extra step is need it to add the mark pointing to the place selected.
    // 				            var marker_address = new google.maps.Marker({position:latlng,map:map,title:'title'});
    // 				        } else {
    //       						alert("Error: " + status);
    //   						}

    // 				    });	//FIN GEOCODER
    // 				} else {
    // console.log("la dirección falta");
    // 				}
    // 			}, false);


    // 			//seleccionar un estilo entre: style_bluelow, style_sepia, style_countrysblue, style_roads, style_water
    // 			stylerSelect(style_water);
    // 		//########################################################### fin Eventos
    // 		}
    // 		//########################################################### fin initialize()

    // 		//########################################################### funciones externas a initialize()
    // 		//botonHabilited si el tipo de mapTypeId es hybrid o satellite se habilitara el boton sinó permanecerá disabled
    // 		function botonHabilited(){
    // 			if (map.getMapTypeId() == tm_Hybrid || map.getMapTypeId() == tm_satellite ){
    // 				b_grades.disabled=false;
    // 			}else {b_grades.disabled=true;}
    // 		}

    // 		//placeMarker(map, location) recibe una localizacion y devuelve una marca en el mapa
    // 		function placeMarker(map, location){
    // 			var new_marker = new google.maps.Marker({
    // 				position:location,
    // 				map:map,
    // 				title:"a new mark",
    // 				animation:google.maps.Animation.DROP,
    // 				icon:"media/images/icon_mark_evernote.png"
    // 			});
    // console.log(new_marker.position);
    // 			map.setCenter(new_marker.position);
    // 		}

    // 		//añadir el estado del zoom en el documento
    // 		function addZoomInfo(){
    // 			var b_info = document.getElementById("b_info");
    // 			if (span_info==null){
    // 				span_info = document.createElement("span");
    // 			}
    // 			var info_text = " " + map.getZoom();
    // 			span_info.innerHTML = info_text;
    // 			b_info.appendChild(span_info);

    // 		}

    // 		//seleccionar un estilo de mapa
    // 		function stylerSelect(name_stile){
    // 			map.setOptions({styles:name_stile});
    // 		}
    // 		// To hide: drawingmanager
    // 		function hideDrawingManager(map){
    // 			drawing_manager.setOptions({
    // 				drawingControl: false
    // 			});
    // 		}
    // 		// to show: dawingManager
    // 		function showDrawingManager(map){
    // 			drawing_manager.setOptions({
    // 				drawingControl: false
    // 			});
    // 		}

    // 		function progressiveZoom(new_location){
    // 				for(var x=current_zoom, y=middle_zoom; x<y; x++){
    // 					window.setTimeout(function(){
    // console.log(new_location);
    // 						map.setZoom(x);
    // 			    		map.setCenter(new_location);	//pero de momento haremos un centro en fuengirola
    // 			    		addZoomInfo();
    // 			    	},700);
    // 			    	current_zoom=y;
    // 				}

    // 		}

    // 		function regressiveZoom(new_location){
    // 				for(var x=current_zoom, y=initial_zoom; x>y; x--){
    // 					window.setTimeout(function(){
    // console.log(new_location);
    // 						map.setZoom(x);
    // 			    		map.setCenter(new_location);	//pero de momento haremos un centro en fuengirola
    // 			    		addZoomInfo();
    // 			    	},700);
    // 			    	current_zoom=y;
    // 				}

    // 		}

    // 		function makeColor(){
    // 	        /**
    // 	         * Otra forma de crear un color aleatoriamente:
    // 	         *
    // 	         * for(var color = Math.floor(Math.random()*0xffffff).toString(16); color.length < 6; color = '0'+color);
    // 	         * return '#' + color;
    // 	         */
    // 	        return '#' + hexVal.sort(function(){
    // 	            return (Math.round(Math.random())-0.5);
    // 	        }).slice(0,6).join('');
    // 	    }

    // 		function messages(error){
    // 			console.log("SE HA PRODUCIDO UN ERROR: "+error.message);
    // 		}


    // 		//Para dispositivos moviles
    // /*
    // 		function detectBrowser() {
    // 		  var useragent = navigator.userAgent;
    // 		  var mapdiv = document.getElementById("map_canvas");

    // 		  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    // 		    mapdiv.style.width = '100%';
    // 		    mapdiv.style.height = '100%';
    // 		  } else {
    // 		    mapdiv.style.width = '600px';
    // 		    mapdiv.style.height = '800px';
    // 		  }
    // 		}
    // */
    // 		//#########################################################

    // /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // //crear una función que se active con un botón al pulsarlo podremos
    // //hacer click  en cualquier lugar del mapa y se creará una marca en ese punto
    // //para ello obtendremos el argumento LatLng del evento click en el mapa
    // //si se pulsa borrar marca otro botón podremos borrar la marca que
    // //queramos
    //   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/

    // /*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    // //al dar una dirección aparecen 5 puntos en ella cómo gestionar esto
    // //para que sea fácilemnte manejable por el usuario.
    //   @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*/


    // /* ################## styles map ##################################*/
    // 	var style_bluelow = [
    //   {
    //     stylers: [
    //       { hue: "#00ffe6" },
    //       { saturation: -20 }
    //     ]
    //   },{
    //     featureType: "road",
    //     elementType: "geometry",
    //     stylers: [
    //       { lightness: 100 },
    //       { visibility: "simplified" }
    //     ]
    //   },{
    //     featureType: "road",
    //     elementType: "labels",
    //     stylers: [
    //       { visibility: "off" }
    //     ]
    //   }
    // ];

    // var style_sepia = [
    //   {
    //     featureType: "all",
    //     stylers: [
    //       { saturation: -80 }
    //     ]
    //   },{
    //     featureType: "road.arterial",
    //     elementType: "geometry",
    //     stylers: [
    //       { hue: "#00ffee" },
    //       { saturation: 50 }
    //     ]
    //   },{
    //     featureType: "poi.business",
    //     elementType: "labels",
    //     stylers: [
    //       { visibility: "off" }
    //     ]
    //   }
    // ];


    // var style_countrysblue = [
    //   {
    //     featureType: "administrative.country",
    //     stylers: [
    //       { weight: 0.1 },
    //       { saturation: 24 },
    //       { lightness: -26 },
    //       { gamma: 1.53 },
    //       { hue: "#2a00ff" },
    //       { color: "#711dcc" }
    //     ]
    //   }
    // ];

    // var style_roads = [
    //   {
    //     "featureType": "road.highway.controlled_access",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       { "saturation": -62 },
    //       { "lightness": -63 },
    //       { "gamma": 4.33 },
    //       { "visibility": "on" },
    //       { "weight": 3.6 },
    //       { "hue": "#00b2ff" },
    //       { "color": "#00b2ff" }
    //     ]
    //   },  {
    //     "featureType": "road.arterial",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       { "saturation": -62 },
    //       { "lightness": -63 },
    //       { "gamma": 4.33 },
    //       { "visibility": "on" },
    //       { "color": "#00e5ff" },
    //       { "weight": 0.9 },
    //       { "hue": "#007fff" }
    //     ]
    //   }
    // ];


    // var style_water = [
    //   {
    //     "featureType": "water",
    //     "elementType": "labels.text.fill",
    //     "stylers": [
    //       { "visibility": "on" },
    //       { "hue": "#00ccff" },
    //       { "color": "#fffeff" },
    //       { "weight": 0.6 }
    //     ]
    //   },{
    //     "featureType": "water",
    //     "elementType": "geometry.fill",
    //     "stylers": [
    //       { "visibility": "on" },
    //       { "color": "#3a3aff" }
    //     ]
    //   }
    // ];


    // styles.push(style_bluelow, style_sepia, style_countrysblue, style_roads, style_water);
    // /* ################## styles map ##################################*/




    // 		google.maps.event.addDomListener(window, 'load', initialize);
    // 		//window.addEventListener('load',initialize,false);				// también funciona




    // google.maps.event.addDomListener(window, 'load', initialize);
}
