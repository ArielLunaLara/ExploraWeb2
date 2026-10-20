import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripCard } from '../../components/trip-card/trip-card';
import { TripService } from '../../services/trip-service';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-admin-page',
  imports: [ReactiveFormsModule, TripCard],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage implements OnInit {

  private tripService = inject(TripService);
  public trips = this.tripService.trips;
  public categories = this.tripService.categories;

  successMessage = signal<string | null>(null);

  tripForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(1)]),
    image: new FormControl('', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]),
    description: new FormControl('', [Validators.required, Validators.minLength(10)]),
    category: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
    availability: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
  });

  ngOnInit(): void {
    // Se carga el catálogo aquí también, por si el admin entra directo a esta página
    this.tripService.fetchTrips();
  }

  onSubmit(): void {
    if (this.tripForm.invalid) return;

    const newTrip: Trip = {
      id: 0, // el servicio asigna el id real
      name: this.tripForm.value.name!,
      price: this.tripForm.value.price!,
      image: this.tripForm.value.image!,
      description: this.tripForm.value.description!,
      category: this.tripForm.value.category!,
      duration: this.tripForm.value.duration!,
      availability: this.tripForm.value.availability!,
    };

    this.tripService.addTrip(newTrip);
    this.successMessage.set(`"${newTrip.name}" se añadió al catálogo.`);
    this.tripForm.reset({ category: '' });
  }

  deleteTrip(id: number): void {
    const trip = this.trips().find(t => t.id === id);
    // La propuesta pide confirmar antes de eliminar
    if (trip && confirm(`¿Seguro que quieres eliminar "${trip.name}" del catálogo?`)) {
      this.tripService.deleteTrip(id);
      this.successMessage.set(null);
    }
  }
}
