import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  latitude: number = 0;
  longitude: number = 0;
  latitudeController = new FormControl('');
  longitudeController = new FormControl('');
  myForm = new FormGroup({
    latitude: this.latitudeController,
    longitude: this.longitudeController
  });
  constructor(private sharedService: SharedService) {
    this.sharedService.getLocation();
    this.sharedService.latitude.subscribe(lat => {
      this.latitude = lat;
      // this.latitudeController.setValue(`${lat}`);
    });
    this.sharedService.longitude.subscribe(lng => {
      this.longitude = lng;
      // this.longitudeController.setValue(`${lng}`);
    });
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this.sharedService.getLocation(parseInt(form.value.latitude) , parseInt(form.value.longitude));
  }

}
