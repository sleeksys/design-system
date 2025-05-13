export interface Opportunity {
  customer: {
    id: string,
    name: string,
    address: {
      street: string,
      zipCode: string,
      city: string,
      geocode: {
        lat: number,
        lng: number
      }
    },
    contact: {
      email: string,
      phoneNumber: string
    }
  },
  vehicle: {
    current: {
      modelName: string,
      modelYear: number,
      vin?: string,
    },
    suggested: {
      modelName: string,
      modelYear: number
    }
  },
  contract: {
    reason: 'End of contract' | 'End of warranty' | 'End of leasing' | 'End of rental',
    type: 'Leasing' | 'Rental' | 'Financing',
    startDate: string,
    endDate: string,
    monthlyRate: number
  },
  assignee: {
    dealership: {
      code: string,
      name: string
    },
    advisor: {
      id: string,
      name: string
    },
  },
  status?: 'open' | 'in progress' | 'closed',
  interaction?: any[]
}
