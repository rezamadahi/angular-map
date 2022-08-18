import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {
  // isPendingData = false;
  arr:string[];
  constructor( private cdr: ChangeDetectorRef) {
    this.arr=[];
    for(let i=0;i<40;i++){
      this.arr.push('help'+i);
    }
  }

  ngOnInit(): void {
  }

  addMoreElement() {
    for(let i=0;i<5;i++){
      this.arr.push('help'+i);
    }
    this.cdr.detectChanges();
  }
}
