import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  latLng = new BehaviorSubject<number[]>([29.5445,52.6544]);
  constructor() {}

}
