import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Output() hover = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {

  }

  onMouseEnter(territory: HTMLElement) {
    this.hover.emit(territory.getAttribute('data-it'));
  }

  onMouseOutMap(): void {
    this.hover.emit(null);
  }
}
