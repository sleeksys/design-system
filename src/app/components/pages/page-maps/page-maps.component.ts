import {AfterViewInit, Component} from '@angular/core';
import * as Leaf from 'leaflet';
import {TableDirective} from '../../templates/table/table.directive';
import {TableCellDirective} from '../../templates/table/table-cell.directive';
import {NgForOf} from '@angular/common';

export interface DemographyPoint {
  lat: number;
  lng: number;
  label: string;
  total: number;
  woman: number;
  man: number;
}

export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
}

@Component({
  selector: 'page-maps',
  imports: [
    TableDirective,
    TableCellDirective,
    NgForOf
  ],
  templateUrl: './page-maps.component.html',
  styleUrls: ['./page-maps.component.scss']
})
export class PageMapsComponent implements AfterViewInit {

  private map: Leaf.Map | undefined;
  public points: DemographyPoint[] = [
    { lat: 49.302591999, lng: 10.571929999, label: 'Stadt Ansbach', total: 29_450, woman: 54, man: 46 },
    { lat: 49.595132999, lng: 11.00498, label: 'Stadt Erlangen', total: 95_215, woman: 44.2, man: 55.8 },
    { lat: 49.466667, lng: 11.000000, label: 'Stadt Furth', total: 51_123, woman: 47.7, man: 52.3 },
    { lat: 49.426113, lng: 11.038977, label: 'Stadt Nuremberg', total: 318_779, woman: 45.1, man: 54.3 },
    { lat: 49.33047, lng: 11.02346, label: 'Stadt Schwabach', total: 17_180, woman: 48.1, man: 51.9 }
  ];

  ngAfterViewInit(): void {
    this.initMap1();
    this.initMap2();
    this.initMap3();
    this.addMarkers();
  }

  private initMap1(): void {
    const obj = Leaf.map('map1')
      .setView([49.426113, 11.038977], 9); // Center of Nuremberg
    const point = this.points[3];

    Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(obj);

    const marker = Leaf.marker([point.lat, point.lng])
      .addTo(obj);
    marker.bindPopup(`${point.label}`);
    marker.openPopup();
  }

  private initMap2(): void {
    const obj = Leaf.map('map2')
      .setView([49.426113, 11.038977], 9); // Center of Nuremberg

    Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(obj);

    // Define two points
    const pointNUE = this.points[3];  // Nuremberg
    const pointANS = this.points[0];   // Ansbach

    const pointA = Leaf.latLng(pointNUE.lat, pointNUE.lng);
    const pointB = Leaf.latLng(pointANS.lat, pointANS.lng);

    // Add markers for visualization
    Leaf.marker(pointA).addTo(obj)
      .bindPopup(pointNUE.label)
      .openPopup();
    Leaf.marker(pointB).addTo(obj)
      .bindPopup(pointANS.label);

    // Draw a line between the points
    Leaf.polyline([pointA, pointB], { color: 'red' }).addTo(obj);

    // Display the result
    const elt = document.getElementById('map2Distance') as HTMLElement;
    if (elt) {
      const distance = pointA.distanceTo(pointB); // distance in meters
      let d = (distance / 1000).toFixed(2);
      elt.innerHTML = `(Calculated distance between ${pointNUE.label} and ${pointANS.label}: ${d} km)`;
    }
  }

  private initMap3(): void {
    this.map = Leaf.map('map3')
      .setView([49.426113, 11.038977], 9); // Center of Nuremberg

    Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private addMarkers(selectedIndex = 0): void {
    if (!this.map) {
      return;
    }

    this.points.forEach((point, index) => {
      const marker = Leaf.marker([point.lat, point.lng])
        .addTo(this.map as Leaf.Map);
      marker.bindPopup(`<b>${point.label}</b>: ${point.woman}%`);

      if (index === selectedIndex) {
        marker.openPopup();
      }
    });
  }

  public calculateMatch(total: number, percentage: number) {
    return Math.round((total * percentage) / 100);
  }

  public openMark(point: DemographyPoint) {
    const index = this.points.indexOf(point);
    if (index >= 0) {
      this.addMarkers(index);
    }
  }
}
