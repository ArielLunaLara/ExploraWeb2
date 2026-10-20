import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  private router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', Validators.required),
  });

  // true cuando ya se escribió la confirmación y no coincide con la contraseña
  passwordsMismatch(): boolean {
    const { password, confirmPassword } = this.registerForm.value;
    return !!confirmPassword && password !== confirmPassword;
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.passwordsMismatch()) return;
    // Por ahora solo se valida el formulario; el guardado real se conectará después
    console.log("Nuevo registro:", this.registerForm.value.email);
    this.registerForm.reset();
    this.router.navigate(['/login']); // después de registrarse, pasa a iniciar sesión
  }
}
