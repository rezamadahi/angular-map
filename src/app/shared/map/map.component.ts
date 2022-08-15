import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';
import {SharedService} from "../shared.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  public map: any;
  lat: any = 29.6042;
  lng: any = 52.5644;
  marker: any;
  circle: any;
  // @Input() latitude: number = 29.6042;
  // @Input() longitude: number = 52.5375;
  constructor(private sharedService: SharedService) {
  }

  ngAfterViewInit(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
    this.sharedService.latitude.subscribe(lat => {
      if (lat !== 0) {
        this.lat = lat;
      }
    });
    this.sharedService.longitude.subscribe(lng => {
      if (lng !== 0) {
        this.lng = lng;
      }
    });
    this.initMap();
  }

  initMap() {
    console.log(this.lat , this.lng);
    this.map = L.map('map').setView([this.lat , this.lng], 6);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution:
        '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>"',
    }).addTo(this.map);
    this.map.invalidateSize();
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
    console.log(this.lat , this.lng);
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
