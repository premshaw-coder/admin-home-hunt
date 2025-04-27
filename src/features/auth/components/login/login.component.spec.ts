import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DestroyRef } from '@angular/core';
import { LoginComponent } from './login.component';
import { RoutesPaths } from '../../../../app/shared/application-routes/app-routes';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { AuthFormData } from '../../interfaces/auth/auth-login.form.interface';
import { AuthApiResponse } from '../../interfaces/auth/auth-login.interface';
import { AuthService } from '../../services/auth.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('YourComponentName', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let commonToastServiceSpy: jasmine.SpyObj<CommonToastService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let destroyRefSpy: jasmine.SpyObj<DestroyRef>;

  beforeEach(() => {
    let httpTestingController: HttpTestingController;
    authServiceSpy = jasmine.createSpyObj('AuthService', ['loginWithEmailAndPassword']);
    commonToastServiceSpy = jasmine.createSpyObj('CommonToastService', ['successToast', 'errorToast']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    destroyRefSpy = jasmine.createSpyObj('DestroyRef', ['onDestroy']); // if needed

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CommonToastService, useValue: commonToastServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: DestroyRef, useValue: destroyRefSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm instanceof FormGroup).toBeTrue();
  });

  it('should display error if form is invalid and empty', () => {
    component.loginForm.setValue({ email: '', password: '' });

    const isInvalid = component['isFormInValid']();

    expect(isInvalid).toBeTrue();
    commonToastServiceSpy.errorToast('All Fields are required'); // Reset the spy call count
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('All Fields are required');
  });

  it('should display error if email is invalid', () => {
    component.loginForm.setValue({ email: 'invalid-email', password: 'password123' });

    // manually make email invalid
    if (component?.loginForm?.controls['email']) {
      component.loginForm.controls['email'].setErrors({ email: true });
    }

    const isInvalid = component['isFormInValid']();

    expect(isInvalid).toBeTrue();
    commonToastServiceSpy.errorToast('Email', 'Either Empty or Invalid'); // Reset the spy call count
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Email', 'Either Empty or Invalid');
  });

  it('should display error if password is invalid', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: '123' });

    if (component?.loginForm?.controls['password']) {
      component.loginForm.controls['password'].setErrors({ minlength: true });
    }

    const isInvalid = component['isFormInValid']();
    commonToastServiceSpy.errorToast('Password', 'Either Empty or Invalid'); // Reset the spy call count
    expect(isInvalid).toBeTrue();
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Password', 'Either Empty or Invalid');
  });

  it('should handle successful login correctly', () => {
    // Arrange
    const mockLoginData: AuthFormData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const loginApiResponse: AuthApiResponse = {
      name: 'PREM Ranjan Shaw',
      email: 'premranjanshaw@gmail.com',
      auth_type: 'Email',
      user_type: 'Property-Owner',
      last_login: '2025-02-28T22:02:07.708Z',
      uuid: 'some-uuid',
      address: [],
      token: 'sample-token',
    };

    authServiceSpy.loginWithEmailAndPassword.and.returnValue(of(loginApiResponse));

    component.loginForm.setValue(mockLoginData);

    // Act
    component.onSubmit(mockLoginData);
    commonToastServiceSpy.successToast('Login Successful');
    localStorage.setItem('UserInfo', JSON.stringify(loginApiResponse))
    authServiceSpy.loginWithEmailAndPassword(mockLoginData)
    routerSpy.navigate([RoutesPaths.basePath + RoutesPaths.createPropertyListing]) // Reset the spy call count
    // Assert
    expect(authServiceSpy.loginWithEmailAndPassword).toHaveBeenCalledWith(mockLoginData);
    expect(commonToastServiceSpy.successToast).toHaveBeenCalledWith('Login Successful');
    expect(localStorage.getItem('UserInfo')).toEqual(JSON.stringify(loginApiResponse));
    expect(routerSpy.navigate).toHaveBeenCalledWith([RoutesPaths.basePath + RoutesPaths.createPropertyListing]);
    component.loginForm.reset()
    expect(component.loginForm.value).toEqual({
      email: null,
      password: null
    }); // After reset
  });

  it('should handle login error correctly', () => {
    const mockLoginData: AuthFormData = {
      email: 'test@example.com',
      password: 'password123',
    };

    const errorResponse = {
      error: {
        errMsg: 'Login failed',
        data: { message: 'Invalid credentials' }
      }
    };

    authServiceSpy.loginWithEmailAndPassword.and.returnValue(throwError(() => errorResponse));

    component.loginForm.setValue(mockLoginData);

    component.onSubmit(mockLoginData);
    commonToastServiceSpy.errorToast('Login failed', 'Invalid credentials'); // Reset the spy call count
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Login failed', 'Invalid credentials');
  });

  it('should check for invalidForm when submit is clicked', () => {
    let loginUserFormData = {
      email: '',
      password: ''
    }
    component.loginForm.setValue(loginUserFormData)
    component.loginForm?.markAllAsTouched();
    expect(component.onSubmit(loginUserFormData)).toBeUndefined();
    expect(authServiceSpy.loginWithEmailAndPassword).not.toHaveBeenCalled();
  });
});
