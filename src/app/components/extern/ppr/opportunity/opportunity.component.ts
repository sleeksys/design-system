import {AfterViewInit, Component} from '@angular/core';
import * as Leaf from 'leaflet';
import {TableDirective} from '../../../templates/table/table.directive';
import {OpportunityService} from './opportunity.service';
import {CurrencyPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Opportunity} from './opportunity.model';

export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
}

export interface Distance {
  customerId: string;
  distance: string;
}

@Component({
  selector: 'ppr-opportunity',
  imports: [
    TableDirective,
    NgForOf,
    DatePipe,
    CurrencyPipe,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent implements AfterViewInit {

  public mappedOpportunities: Opportunity[] = [];
  public cities = ['Nürnberg', 'Erlangen', 'Fürth', 'Bamberg'];
  public selectedCity = 'all';

  private opportunities: Opportunity[] = [];
  private distances: Distance[] = [];
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

      // filter opportunities by city
      this.mappedOpportunities = this.opportunities.filter(opp => opp.customer.address.city === city);

      // map all opportunities to points
      this.mappedOpportunities.forEach(opp => {
        list.push(this.mapOpportunityToPoint(opp));
      });

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

  public getDistanceToDealership(opp: Opportunity) {
    const obj = this.distances.find(d => d.customerId === opp.customer.id);
    if (obj) {
      return `${obj.distance} km`;
    }
    return '-- km';
  }

  public calculateTimeRemainingToMaturity(opp: Opportunity): string {
    const today = new Date();
    const endDate = new Date(opp.contract.endDate);
    const diffTime = Math.abs(endDate.getTime() - today.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days > 40) {
      const months = Math.round(days / 30);
      return (months === 1) ? `1 month` : `${months} months`;
    }
    return `${days} days`;
  }

  public getVehiclePictureUrl(model: string): string {
    let url = 'porsche.jpg';

    // BMW 3 Series
    if (model.includes('BMW 3 Series')) {
      // url = 'BMW_3_Series.jpg';
    }

    // Toyota Corolla
    if (model.includes('Toyota Corolla')) {
      url = 'Toyota_Corolla.jpg';
    }

    // VW Golf
    if (model.includes('VW Golf')) {
      // url = 'VW_Golf.jpg';
    }

    // 'Audi A4', 'Mercedes C-Class'
    return `https://designsystem.sleeksys.com/media/vehicles/${url}`;
  }

  private initialize(): void {
    this.opportunities = this.opportunityService.generateMockOpportunities(50);
    this.mappedOpportunities = this.opportunities;

    this.initMap();
    this.addMarkers();

    this.opportunities.forEach(opp => {
      const distance = this.calculateDistanceToDealership(opp);
      this.distances.push({
        customerId: opp.customer.id,
        distance: distance
      });
    });
  }

  private calculateDistanceToDealership(opp: Opportunity) {
    const pointDealership = Leaf.latLng(49.426113, 11.038977); // Dealership in Nürnberg
    const pointOpp = Leaf.latLng(opp.customer.address.geocode.lat, opp.customer.address.geocode.lng);

    const distance = pointDealership.distanceTo(pointOpp); // distance in meters
    return (distance / 1000).toFixed(2);
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
