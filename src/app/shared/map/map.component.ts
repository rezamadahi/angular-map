import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  lat: number = 29.6042;
  lng: number = 52.5644;
  marker: any;
  circle: any;
  // @Input() lat: number = 29.6042;
  // @Input() lng: number = 52.5375;
  constructor(private sharedService: SharedService) {
    this.sharedService.longitude.subscribe(lng => {
      this.lng = lng;
    });
    this.sharedService.latitude.subscribe(lat => {
      this.lat = lat;
    });
  }

  ngAfterViewInit(): void {
    if (this.lat !== 0 && this.lng !== 0) {
      this.initMap();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // const longitude = position.coords.longitude;
          // const latitude = position.coords.latitude;
          this.lat = position.coords.latitude ;
          this.lng = position.coords.longitude;
          this.initMap();
        });
      } else {
        alert('No support for geolocation');
      }
    }
    console.log(this.lat);
  }

  initMap() {
    this.map = L.map('map').setView([this.lat , this.lng], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution:
        '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>"',
    }).addTo(this.map);
    this.marker = L.marker([this.lat , this.lng]);
    this.circle = L.circle([this.lat , this.lng], {radius: 200});
    this.map.addLayer(this.marker);
    this.map.addLayer(this.circle);
    L.popup()
      .setLatLng([this.lat, this.lng])
      .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      .openOn(this.map);
    this.map.flyTo([this.lat , this.lng] , 6);
  }

  flyTo() {
    L.latLng(this.lat, this.lng);
    this.map.removeLayer(this.marker);
    this.map.removeLayer(this.circle);
    this.marker = L.marker([this.lat , this.lng]);
    this.circle = L.circle([this.lat , this.lng], {radius: 200});
    this.map.addLayer(this.marker);
    this.map.addLayer(this.circle);
    L.popup()
      .setLatLng([this.lat, this.lng])
      .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      .openOn(this.map);
    this.map.flyTo([this.lat , this.lng] , 12);
  }

}
