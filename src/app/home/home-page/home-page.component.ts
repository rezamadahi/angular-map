import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SharedService} from "../../shared/shared.service";
import {MapComponent} from "../../shared/map/map.component";
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
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit , OnDestroy {

  latitude: number = 29.5445;
  longitude: number = 52.6544;
  marker: any;
  circle: any;
  public map: any;
  latitudeController = new FormControl('');
  longitudeController = new FormControl('');
  readOnlyController = new FormControl(false);
  myForm = new FormGroup({
    latitude: this.latitudeController,
    longitude: this.longitudeController
  });
  @ViewChild(MapComponent) child: any;
  constructor(private sharedService: SharedService) {
  }

  ngOnInit(): void {
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
      this.setControllerValues();
    });
  }

  setControllerValues() {
    this.latitudeController.setValue(`${this.latitude}`);
    this.longitudeController.setValue(`${this.longitude}`);
  }

  initMap() {
    if (this.map) {
      this.map.off();
      this.map.remove();
    }
    this.map = L.map('map', {
      center: [this.latitude, this.longitude],
      zoom: 12,
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

  onSubmit(form: any) {
    this.latitude = parseFloat(form.value.latitude);
    this.longitude = parseFloat(form.value.longitude);
    this.map.removeLayer(this.marker);
    this.map.removeLayer(this.circle);
    this.changeConfig();
    this.map.flyTo([this.latitude , this.longitude] , 15);
  }

  changeConfig() {
    this.setControllerValues();
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
      if (this.readOnlyController.value == false) {
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
            this.latitude = coord.lat;
            this.longitude = coord.lng;
            this.map.removeLayer(this.marker);
            this.map.removeLayer(this.circle);
            this.changeConfig();
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
