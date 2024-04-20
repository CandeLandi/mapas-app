import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

interface MarketAndColor {
  color: string;
  marker: Marker;
}

interface PlainMarker {
  color: string;
  lngLat: number[];
}

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.scss'
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map') divMap?: ElementRef;

  public markers: MarketAndColor[] = [];
  public map?: Map;

  public currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477);

  ngAfterViewInit(): void {

  if (!this.divMap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      attributionControl: false,
      zoom: 13, // starting position [lng, lat]// starting zoom
    });

    /*     const markerHtml = document.createElement('div');
        markerHtml.innerHTML = 'Candela Landi'

        const marker = new Marker({
          color: 'red',
          element: markerHtml
        })
          .setLngLat(this.currentLngLat)
          .addTo(this.map) */
    this.readFromToLocalStorage();
  }


  createMarket() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const lngLat = this.map.getCenter()
    console.log(LngLat)

    this.addMarker(lngLat, color);

  }


  addMarker(lngtLat: LngLat, color: string) {
    if (!this.map) return;
    console.log(lngtLat)
    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(lngtLat)
      .addTo(this.map);


    this.markers.push({ color, marker })
    this.saveToLocalStorage();

    marker.on('dragend', () => this.saveToLocalStorage())
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1)
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat()

    })
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    })
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))
  }

  readFromToLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString) //!OJO no es seguro

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, color)
    });
  }


}
