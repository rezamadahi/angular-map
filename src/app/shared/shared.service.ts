import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  latitude = new BehaviorSubject<number>(0);
  longitude = new BehaviorSubject<number>(0);
  constructor() {}

  // getLocation(lat?: number , lng?: number) {
  //   if (lat && lng) {
  //     this.latitude.next(lat);
  //     this.longitude.next(lng);
  //   }
  // }
}
