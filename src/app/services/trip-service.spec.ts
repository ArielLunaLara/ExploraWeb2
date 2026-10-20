import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TripService } from './trip-service';
import { Trip } from '../interfaces/trip.interface';

const DATA = 'data/trips.json';

// Simula el JSON con ids 1..n y precios descendentes
function mockTrips(n: number): Trip[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1, name: `Destino ${String.fromCharCode(67 - i)}`, price: 1000 * (n - i),
    image: 'https://x.com/a.png', description: 'Descripción', category: i % 2 ? 'Playa' : 'Cultural',
    duration: '3 días', availability: 10,
  }));
}

describe('TripService', () => {
  let service: TripService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(TripService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('carga el catálogo una sola vez', () => {
    service.fetchTrips();
    service.fetchTrips();
    http.expectOne(DATA).flush(mockTrips(3));
    expect(service.trips().length).toBe(3);
  });

  it('filtra por destino o categoría', () => {
    service.fetchTrips();
    http.expectOne(DATA).flush(mockTrips(3));
    service.search('playa');
    expect(service.tripCount()).toBe(1);
  });

  it('ordena por precio de menor a mayor', () => {
    service.fetchTrips();
    http.expectOne(DATA).flush(mockTrips(3));
    service.orderByPrice();
    expect(service.trips().map(t => t.price)).toEqual([1000, 2000, 3000]);
  });

  it('agrega y elimina viajes sin repetir ids', () => {
    const trip = { ...mockTrips(1)[0], id: 0 };
    service.addTrip(trip);
    service.fetchTrips();
    http.expectOne(DATA).flush(mockTrips(3));

    const ids = service.trips().map(t => t.id);
    expect(new Set(ids).size).toBe(4);

    service.deleteTrip(1000);
    expect(service.trips().length).toBe(3);
  });
});
