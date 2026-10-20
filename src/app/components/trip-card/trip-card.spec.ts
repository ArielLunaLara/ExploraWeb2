import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCard } from './trip-card';
import { Trip } from '../../interfaces/trip.interface';

describe('TripCard', () => {
  let component: TripCard;
  let fixture: ComponentFixture<TripCard>;

  const mockTrip: Trip = {
    id: 1,
    name: 'Cancún',
    price: 12500,
    image: 'https://picsum.photos/seed/cancun/600/400',
    description: 'Playa',
    category: 'Playa',
    duration: '5 días / 4 noches',
    availability: 20,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TripCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('trip', mockTrip);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('no muestra el botón Eliminar por defecto', () => {
    expect(fixture.nativeElement.querySelector('.delete-btn')).toBeNull();
  });
});
