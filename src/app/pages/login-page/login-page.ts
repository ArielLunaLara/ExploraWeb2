import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

  message = signal<string | null>(null);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    // Por ahora solo se valida el formulario; la autenticación real se conectará después
    console.log("Datos de inicio de sesión:", this.loginForm.value.email);
    this.message.set(`Bienvenido, ${this.loginForm.value.email}`);
    this.loginForm.reset();
  }
}
