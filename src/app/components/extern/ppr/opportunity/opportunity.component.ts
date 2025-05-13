import {AfterViewInit, Component} from '@angular/core';
import * as Leaf from 'leaflet';
import {TableDirective} from '../../../templates/table/table.directive';
import {OpportunityService} from './opportunity.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from '@angular/common';
import {Opportunity} from './opportunity.model';

export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
}

@Component({
  selector: 'ppr-opportunity',
  imports: [
    TableDirective,
    NgForOf,
    DatePipe,
    CurrencyPipe,
    NgIf
  ],
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements AfterViewInit {

  public opportunities: Opportunity[] = [];
  public cities = ['Nürnberg', 'Erlangen', 'Fürth', 'Bamberg'];
  public selectedCity = 'all';

  private map: Leaf.Map | undefined;

  constructor(private opportunityService: OpportunityService) {
  }

  ngAfterViewInit(): void {
    this.initialize();
  }

  public countMatches(city: string): number {
    return this.opportunities.filter(opp => opp.customer.address.city === city).length;
  }

  public showOpportunities(city: string) {
    this.selectedCity = city;

    // default, reset view
    if (city === 'all') {
      window.location.reload();
      return;
    }

    // add markers to map and keep the dealership selected
    if (this.map) {
      this.map.remove();
      this.initMap();

      let list: MapPoint[] = [
        { lat: 49.426113, lng: 11.038977, label: 'Dealership in Nürnberg' }
      ];

      // map all opportunities to points
      this.opportunities.filter(opp => opp.customer.address.city === city)
        .forEach(opp => {
          list.push(this.mapOpportunityToPoint(opp));
        })
      ;

      list.forEach((point, index) => {
        const marker = Leaf.marker([point.lat, point.lng])
          .addTo(this.map as Leaf.Map);
        marker.bindPopup(`${point.label}`);

        if (index === 0) {
          marker.openPopup();
        }
      });
    }
  }

  private initialize(): void {
    this.opportunities = this.opportunityService.generateMockOpportunities(50);

    this.initMap();
    this.addMarkers();
  }

  private initMap(): void {
    this.map = Leaf.map('map')
      .setView([49.426113, 11.038977], 10); // Center of Nuremberg

    Leaf.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  private addMarkers(selectedIndex = 0): void {
    if (!this.map) {
      return;
    }

    const points: MapPoint[] = [
      { lat: 49.426113, lng: 11.038977, label: 'Dealership in Nürnberg' }
    ];
    this.opportunities.forEach(opp => {
      points.push(this.mapOpportunityToPoint(opp));
    });

    points.forEach((point, index) => {
      const marker = Leaf.marker([point.lat, point.lng])
        .addTo(this.map as Leaf.Map);
      marker.bindPopup(`${point.label}`);

      if (index === selectedIndex) {
        marker.openPopup();
      }
    });
  }

  private mapOpportunityToPoint(opp: Opportunity): MapPoint {
    return {
      lat: opp.customer.address.geocode.lat,
      lng: opp.customer.address.geocode.lng,
      label: `${opp.vehicle.suggested.modelName}`
    };
  }
}
