import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripService } from '../../services/trip-service';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {

  private tripService = inject(TripService);
  public loading = this.tripService.loading;

  // La galería solo usa nombre y foto de los primeros 6 destinos
  public gallery = computed(() => this.tripService.trips().slice(0, 6));

  ngOnInit(): void {
    this.tripService.fetchTrips();
  }
}
