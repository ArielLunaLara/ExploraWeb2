import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../interfaces/trip.interface';

@Injectable({
  providedIn: 'root',
})
export class TripService {

  private http = inject(HttpClient);
  // Archivo local en public/data; después se puede cambiar por la URL de una API real
  private dataUrl = 'data/trips.json';
  private _trips: WritableSignal<Trip[]> = signal([]);
  private _searchTerm = signal('');
  private _loading = signal(false);
  private _error = signal<string | null>(null);
  private loaded = false;
  private nextLocalId = 1000; // ids de viajes nuevos, lejos del rango del JSON

  public trips = this._trips.asReadonly();
  public loading = this._loading.asReadonly();
  public error = this._error.asReadonly();

  public categories = ['Playa', 'Pueblo Mágico', 'Aventura', 'Cultural'];

  // Lista del catálogo filtrada por destino o categoría
  public filteredTrips = computed(() => {
    const term = this._searchTerm().trim().toLowerCase();
    if (!term) return this._trips();
    return this._trips().filter(trip =>
      trip.name.toLowerCase().includes(term) ||
      trip.category.toLowerCase().includes(term)
    );
  });

  public tripCount = computed(() => this.filteredTrips().length);

  fetchTrips(): void {
    // Evita volver a descargar (y perder los viajes agregados) al cambiar de página
    if (this.loaded) return;
    this.loaded = true;
    this._loading.set(true);
    this._error.set(null);

    this.http.get<Trip[]>(this.dataUrl).subscribe({
      next: (response: Trip[]) => {
        // Conserva los viajes que se hayan agregado antes de que terminara la descarga
        this._trips.update(current => [...response, ...current]);
        this._loading.set(false);
      },
      error: (error) => {
        console.error(error);
        this.loaded = false; // permite reintentar
        this._loading.set(false);
        this._error.set('No se pudo cargar el catálogo. Intenta de nuevo.');
      }
    });
  }

  orderByName(): void {
    this._trips.update(trips => [...trips].sort((a, b) => a.name.localeCompare(b.name)));
  }

  orderByPrice(): void {
    this._trips.update(trips => [...trips].sort((a, b) => a.price - b.price));
  }

  reverse(): void {
    this._trips.update(trips => [...trips].reverse());
  }

  search(value: string): void {
    this._searchTerm.set(value);
  }

  addTrip(newTrip: Trip): void {
    this._trips.update(trips => [...trips, { ...newTrip, id: this.nextLocalId++ }]);
  }

  deleteTrip(id: number): void {
    this._trips.update(trips => trips.filter(trip => trip.id !== id));
  }
}
