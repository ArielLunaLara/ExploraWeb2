import { Component, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-controls',
  imports: [ReactiveFormsModule],
  templateUrl: './controls.html',
  styleUrl: './controls.css',
})
export class Controls {

  searchControl = new FormControl("");

  orderByNameClick = output<void>();
  orderByPriceClick = output<void>();
  reverseClick = output<void>();
  search = output<string>();

  constructor() {
    // Búsqueda en vivo: espera 300 ms después de la última tecla antes de filtrar
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed())
      .subscribe(value => this.search.emit(value ?? ""));
  }

  orderByName(): void {
    this.orderByNameClick.emit();
  }

  orderByPrice(): void {
    this.orderByPriceClick.emit();
  }

  reverse(): void {
    this.reverseClick.emit();
  }

  onSearch(): void {
    this.search.emit(this.searchControl.value ?? "");
  }
}
