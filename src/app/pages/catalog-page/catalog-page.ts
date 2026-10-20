import { Component, inject, OnInit } from '@angular/core';
import { TripCard } from '../../components/trip-card/trip-card';
import { Controls } from '../../components/controls/controls';
import { TripService } from '../../services/trip-service';

@Component({
  selector: 'app-catalog-page',
  imports: [TripCard, Controls],
  templateUrl: './catalog-page.html',
  styleUrl: './catalog-page.css',
})
export class CatalogPage implements OnInit {

  private tripService = inject(TripService);
  public trips = this.tripService.filteredTrips;
  public tripCount = this.tripService.tripCount;
  public loading = this.tripService.loading;
  public error = this.tripService.error;

  ngOnInit(): void {
    this.tripService.fetchTrips();
  }

  retry(): void {
    this.tripService.fetchTrips();
  }

  orderByName(): void {
    this.tripService.orderByName();
  }

  orderByPrice(): void {
    this.tripService.orderByPrice();
  }

  reverse(): void {
    this.tripService.reverse();
  }

  search(value: string): void {
    this.tripService.search(value);
  }
}
