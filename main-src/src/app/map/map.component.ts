import { Component, OnInit } from '@angular/core';
import {OpenStreetMapProvider} from 'leaflet-geosearch';
import {MappingService} from '../services/mapping.service';
let L:any;
const defaultCoords:number[] = [12.8797,121.7740];
const defaultZoom:number = 18;
  /**legend
         * LEGEND
         * Red = 100 + accidents
         * Orange = 51 - 99
         * Yllow= 1-50
         */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(private mapping:MappingService) { }

  locations:any[];
  test:any[];
  ngOnInit() {
    this.map();
  }
  map(){
    var color;
      this.mapping.getlocation().then(data =>{
      this.locations = data;
     const provider = new OpenStreetMapProvider();

     var icon = L.icon({
      iconUrl:  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon-2x.png",
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-shadow.png",
      shadowSize: [68, 95],
      shadowAnchor: [22, 94]
      });
      
     var map = L.map('map').setView(defaultCoords,defaultZoom,);
     var Redlayer = new L.layerGroup();
     var Orangelayer = new L.layerGroup();
     var Yellowlayer = new L.layerGroup();
     map.maxZoom = 100;

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
           attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
       }).addTo(map);
       
       this.locations.forEach(element => {
          console.log(element)         
        provider.search({query:element._id.location.street}).then(result =>{
          //console.log(result)
                      result.forEach(element => {
                      });
                      if(element.total>=100){
                        L.circle([parseFloat(result[0].y),parseFloat(result[0].x)], {
                          color: 'red',
                          fillColor: 'red',
                          fillOpacity: 0.5,
                          radius: 100
                        }).bindPopup(JSON.stringify(result[0].label))
                          .addTo(Redlayer);
                        L.marker([parseFloat(result[0].y),parseFloat(result[0].x)],{icon:icon})
                        .bindPopup(JSON.stringify(result[0].label))
                        .openPopup()
                        .on('click',function(){map.setView([parseFloat(result[0].y),parseFloat(result[0].x)],20)})
                        .on('dblclick',function(){map.setView([parseFloat(result[0].y),parseFloat(result[0].x)],10)})
                        .addTo(Redlayer);
                      }else if(element.total>=51&&element.total<=99){
                        
                        L.circle([parseFloat(result[0].y),parseFloat(result[0].x)], {
                          color: 'orange',
                          fillColor: 'orange',
                          fillOpacity: 0.5,
                          radius: 100
                        }).bindPopup(JSON.stringify(result[0].label))
                          .addTo(Orangelayer);
                        L.marker([parseFloat(result[0].y),parseFloat(result[0].x)],{icon:icon})
                        .bindPopup(JSON.stringify(result[0].label))
                        .openPopup()
                        .on('click',function(){map.setView([parseFloat(result[0].y),parseFloat(result[0].x)],20)})
                        .on('dblclick',function(){map.setView([parseFloat(result[0].y),parseFloat(result[0].x)],10)})
                        .addTo(Orangelayer);
                      }else if(element.total>=1&&element.total<=50){
                        
                        L.circle([parseFloat(result[0].y),parseFloat(result[0].x)], {
                          color: 'yellow',
                          fillColor: 'yellow',
                          fillOpacity: 0.5,
                          radius: 100
                        }).bindPopup(JSON.stringify(result[0].label))
                          .addTo(Yellowlayer);
                        L.marker([parseFloat(result[0].y),parseFloat(result[0].x)],{icon:icon})
                        .bindPopup(JSON.stringify(result[0].label))
                        .openPopup()
                        .on('click',function(){map.setView([parseFloat(result[0].y),parseFloat(result[0].x)],20)})
                        .on('dblclick',function(){map.setView([parseFloat(result[0].y),parseFloat(result[0].x)],10)})
                        .addTo(Yellowlayer);
                      }    
                      map.setView(defaultCoords,6);
                  });
                  
       });
    
      var overlay = {"Red warning":Redlayer,
                    "Orange Warning":Orangelayer,
                  "Yellow warning":Yellowlayer}
       L.control.layers("", overlay).addTo(map);   
    });
    
  }
}