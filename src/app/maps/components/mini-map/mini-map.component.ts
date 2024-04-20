import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Marker, Map, LngLat } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss'
})
export class MiniMapComponent {
  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number]

ngAfterViewInit(){
  if( !this.divMap?.nativeElement ) throw "Map Div not found";
  if ( !this.lngLat ) throw "LngLat cant be null"

  const map = new Map({
    container: this.divMap.nativeElement, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.lngLat,
    zoom: 15, 
    attributionControl: false,
    interactive: false,
  });
    new Marker()
    .setLngLat( this.lngLat )
    .addTo( map )
}
}
