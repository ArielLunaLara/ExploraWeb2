import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { RegisterPage } from './register-page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('RegisterPage contraseñas', () => {
  it('detecta cuando la confirmación no coincide', async () => {
    await TestBed.configureTestingModule({ imports: [RegisterPage], providers: [provideRouter([])] }).compileComponents();
    const page = TestBed.createComponent(RegisterPage).componentInstance;
    page.registerForm.patchValue({ password: '12345678', confirmPassword: '1234567x' });
    expect(page.passwordsMismatch()).toBe(true);
    page.registerForm.patchValue({ confirmPassword: '12345678' });
    expect(page.passwordsMismatch()).toBe(false);
  });
});
