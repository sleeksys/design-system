import {Injectable} from '@angular/core';
import {Opportunity} from './opportunity.model';
import {SleekUtils} from '../../../../services/sleek.utils';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {

  /** Generate mock data while running locally */
  public generateMockOpportunities(count: number): Opportunity[] {
    const reasons: Opportunity['contract']['reason'][] = [
      'End of contract', 'End of warranty', 'End of leasing', 'End of rental'
    ];
    const types: Opportunity['contract']['type'][] = [
      'Leasing', 'Rental', 'Financing'
    ];
    const modelNames = ['Toyota Corolla', 'VW Golf', 'BMW 3 Series', 'Audi A4', 'Mercedes C-Class'];
    const dealerships = [
      {code: 'DLR001', name: 'AutoHaus Müller'},
      {code: 'DLR002', name: 'Premium Cars AG'},
      {code: 'DLR003', name: 'DriveNow Motors'}
    ];
    const cities = ['Nürnberg', 'Erlangen', 'Fürth', 'Bamberg'];

    const opportunities: Opportunity[] = [];

    for (let i = 0; i < count; i++) {
      const modelCurrent = this.getRandomElement(modelNames);
      const modelSuggested = this.getRandomElement(modelNames);

      const startDate = this.getMaturityStartDate();
      const endDate = this.getMaturityEndDate();

      const dealership = this.getRandomElement(dealerships);
      const city = this.getRandomElement(cities);

      opportunities.push({
        customer: {
          id: SleekUtils.generateHash(),
          name: `Max Mustermann ${i+1}`,
          address: {
            street: `Hauptstrasse ${i + 1}`,
            zipCode: `90${100 + i}`,
            city,
            geocode: {
              lat: this.getRandomLat(),
              lng: this.getRandomLng()
            }
          },
          contact: {
            email: `max.muster${i + 1}@example.de`,
          }
        },
        vehicle: {
          current: {
            modelName: modelCurrent,
            modelYear: 2015 + Math.floor(Math.random() * 7)
          },
          suggested: {
            modelName: modelSuggested,
            modelYear: 2023 + Math.floor(Math.random() * 2)
          }
        },
        contract: {
          reason: this.getRandomElement(reasons),
          type: this.getRandomElement(types),
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          monthlyRate: parseFloat((300 + Math.random() * 200).toFixed(2))
        },
        assignee: {
          dealership,
          advisor: {
            id: SleekUtils.generateHash(),
            name: `John Doe ${i+1}`
          }
        }
      });
    }

    return opportunities;
  }

  /** Generate a random date 2,5 years in the past. */
  private getMaturityStartDate(): Date {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 2, today.getMonth() - 6);
    // random day of the month between 1 and 28
    startDate.setDate(Math.floor(Math.random() * 28) + 1);
    return startDate;
  }

  /** Generate a random date within the next 6 months. */
  private getMaturityEndDate(): Date {
    const today = new Date();
    const endDate = new Date(today);
    endDate.setFullYear(today.getFullYear(), today.getMonth() + Math.floor(Math.random() * 6));
    // random day of the month between 1 and 28
    endDate.setDate(Math.floor(Math.random() * 28) + 1);
    return endDate;
  }

  /** Generate random latitude for following cities Nürnberg, Fürth, Erlangen, Bamberg */
  private getRandomLat(): number {
    return +(49.3 + Math.random() * 0.3).toFixed(6);
  }

  /** Generate random longitude for following cities Nürnberg, Fürth, Erlangen, Bamberg */
  private getRandomLng(): number {
    return +(10.5 + Math.random() * 0.5).toFixed(6);
  }

  /** Get a random element from an array */
  private getRandomElement<Opportunity>(arr: Opportunity[]): Opportunity {
    return arr[Math.floor(Math.random() * arr.length)];
  }
}
