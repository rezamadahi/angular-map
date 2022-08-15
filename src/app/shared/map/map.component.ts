import {AfterViewInit, Component, Input} from '@angular/core';
import {SharedService} from "../shared.service";
import * as L from 'leaflet';
import Swal from 'sweetalert2';

const iconRetinaUrl = './assets/marker-icon-2x.png';
const iconUrl = './assets/marker-icon.png';
const shadowUrl = './assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  latitude: number = 29.5445;
  longitude: number = 52.6544;
  marker: any;
  circle: any;
  public map: any;
  @Input() readOnly: boolean = false;
  constructor(private sharedService: SharedService) {
  }

  ngAfterViewInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      if (position.coords.latitude !== 0 && position.coords.longitude !== 0 ) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.latitude;
      } else {
        this.latitude = 29.5445;
        this.longitude = 52.6544;
      }
      this.initMap();
      this.sharedService.latLng.subscribe(latLng => {
        this.latitude = latLng[0];
        this.longitude = latLng[1];
        setTimeout(() => {
          this.changeConfig();
        },10)
      })
    });
  }

  initMap() {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 10,
      attributionControl: false,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 22,
      attribution:
        '&copy;<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>"',
    }).addTo(this.map);
    this.changeConfig();
    this.map.invalidateSize();
  }

  changeConfig() {
    this.marker = L.marker([this.latitude , this.longitude] , {draggable: true});
    this.circle = L.circle([this.latitude , this.longitude], {radius: 50});
    this.map.addLayer(this.marker);
    this.map.addLayer(this.circle);
    L.popup()
      .setLatLng([this.latitude, this.longitude])
      .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      .openOn(this.map);
  }

  onChangeLocation() {
    this.map.on('click', (e:any) => {
      if (!this.readOnly) {
        Swal.fire({
          title: 'Are you sure?',
          text: '',
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancel',
          confirmButtonText: 'Confirm',
        }).then(result => {
          if (result.isConfirmed) {
            let coord = e.latlng;
            this.sharedService.latLng.next([coord.lat , coord.lng]);
            this.map.removeLayer(this.marker);
            this.map.removeLayer(this.circle);
            this.map.flyTo([this.latitude , this.longitude] , 15);
          }
          else {
            return;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
  }

}
