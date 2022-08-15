import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SharedService} from "../../shared/shared.service";
import {MapComponent} from "../../shared/map/map.component";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements AfterViewInit {

  latitude: number = 29.5445;
  longitude: number = 52.6544;
  marker: any;
  circle: any;
  public map: any;
  readOnly: boolean = false;
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

  ngAfterViewInit(): void {
    this.sharedService.latLng.subscribe(latLng => {
      this.latitude = latLng[0];
      this.longitude = latLng[1];
      this.setControllerValues();
    })
  }

  setControllerValues() {
    this.latitudeController.setValue(`${this.latitude}`);
    this.longitudeController.setValue(`${this.longitude}`);
  }

  onSubmit(form: any) {
    this.sharedService.latLng.next([form.value.latitude , form.value.longitude]);
  }

  onChangeReadOnly() {
    this.readOnly = this.readOnlyController.value || false;
  }


}
