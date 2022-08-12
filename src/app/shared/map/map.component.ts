import {AfterViewInit, Component, Input} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map: any;
  @Input() lat: number = 29.6042;
  @Input() lng: number = 52.5375;
  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    this.map = L.map('map').setView([this.lat , this.lng], 18);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution:
        '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>"',
    }).addTo(this.map);
    L.marker([this.lat , this.lng]).addTo(this.map);
  }

}
