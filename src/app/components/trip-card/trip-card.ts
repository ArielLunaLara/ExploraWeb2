import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Trip } from '../../interfaces/trip.interface';

@Component({
  selector: 'app-trip-card',
  imports: [CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  trip = input.required<Trip>();
  // En el catálogo se muestra sin botón; en Configurar catálogo con botón Eliminar
  showDelete = input(false);
  deleteClick = output<number>();

  onDeleteClick(): void {
    this.deleteClick.emit(this.trip().id);
  }
}
