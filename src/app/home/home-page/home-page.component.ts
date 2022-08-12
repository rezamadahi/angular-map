import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {SharedService} from "../../shared/shared.service";
import {MapComponent} from "../../shared/map/map.component";

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
  @ViewChild(MapComponent) child: any;
  constructor(private sharedService: SharedService) {
    this.sharedService.latitude.subscribe(lat => {
      this.latitude = lat;
      this.latitudeController.setValue(`${lat}`);
    });
    this.sharedService.longitude.subscribe(lng => {
      this.longitude = lng;
      this.longitudeController.setValue(`${lng}`);
    });
    if (this.latitude === 0 && this.longitude === 0) {
      this.sharedService.getLocation();
    }
  }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this.sharedService.getLocation(parseFloat(form.value.latitude) , parseFloat(form.value.longitude));
    this.child.flyTo();
  }

}
