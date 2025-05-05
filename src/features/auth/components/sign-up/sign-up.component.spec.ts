import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from '../../services/auth.service';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { MessageService } from 'primeng/api';
import { AuthApiResponse } from '../../interfaces/auth/auth-login.interface';
import { of } from 'rxjs/internal/observable/of';
import { throwError } from 'rxjs/internal/observable/throwError';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let httpTestingController: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let commonToastServiceSpy: jasmine.SpyObj<CommonToastService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signUpWithEmailAndPassword']);
    commonToastServiceSpy = jasmine.createSpyObj('CommonToastService', ['successToast', 'errorToast']);

    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
        MessageService,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CommonToastService, useValue: commonToastServiceSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should create the component', () => {
    expect(component).toBeFalsy();
  });

  it('should display error if form is invalid and all the fields are empty', () => {
    component.signUpForm.setValue({ name: '', email: '', password: '', phoneNumber: null });
    const isInvalid = component['isFormInValid']();
    expect(isInvalid).toBeTrue();
    expect(component.signUpForm.valid).toBeFalse();
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('All Fields are required');
  });

  it('should display error if form is invalid and only the name fields is empty', () => {
    component.signUpForm.setValue({ name: '', email: 'prem@123', password: '2q34214', phoneNumber: 123456776 });
    const isInvalid = component['isFormInValid']();
    expect(isInvalid).toBeTrue();
    expect(component.signUpForm.valid).toBeFalse();
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Name', 'Either Empty or Invalid');
  });
  it('should display error if form is invalid and only the email fields is empty', () => {
    component.signUpForm.setValue({ name: 'prem', email: '', password: '2q34214', phoneNumber: 123456776 });
    const isInvalid = component['isFormInValid']();
    expect(isInvalid).toBeTrue();
    expect(component.signUpForm.valid).toBeFalse();
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Email', 'Either Empty or Invalid');
  });
  it('should display error if form is invalid and only the phone-number fields is empty', () => {
    component.signUpForm.setValue({ name: 'prem', email: 'prem@gmail.com', password: '2q34214', phoneNumber: null });
    const isInvalid = component['isFormInValid']();
    expect(isInvalid).toBeTrue();
    expect(component.signUpForm.valid).toBeFalse();
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Phone Number', 'Either Empty or Invalid');
  });
  it('should display error if form is invalid and only the Password fields is empty', () => {
    component.signUpForm.setValue({ name: 'prem', email: 'prem@gmail.com', password: '', phoneNumber: 1234556789 });
    const isInvalid = component['isFormInValid']();
    expect(isInvalid).toBeTrue();
    expect(component.signUpForm.valid).toBeFalse();
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Password', 'Either Empty or Invalid');
  });

  it('should return false if the form is valid', () => {
    component.signUpForm.setValue({ name: 'prem', email: 'prem@gmail.com', password: 'fdsfsdqwes', phoneNumber: 1234556789 });
    const isInvalid = component['isFormInValid']();
    expect(isInvalid).toBeFalse();
    expect(component.signUpForm.valid).toBeTrue();
  });

  it('should return void when submit is called with invalid form', () => {
    component.signUpForm.setValue({ name: '', email: '', password: '', phoneNumber: null });
    const result = component.onSubmit({ name: '', email: '', password: '', phoneNumber: null });
    expect(result).toBeUndefined();
    expect(component.signUpForm.valid).toBeFalse();
  })

  it('should call signUpWithEmailAndPassword and show success toast on successful sign up', () => {
    const mockSignUpPayload: { name: string; email: string; password: string; phoneNumber: number; user_type?: string } = {
      name: 'John Doe', email: 'prem@gmail.com', password: 'password123', phoneNumber: 1234567890,
    };
    const mockAuthApiResponse: AuthApiResponse = {
      name: "John Doe",
      email: "john.doe@example.com",
      auth_type: "email",
      user_type: "Property-Owner",
      last_login: "2025-05-01T12:34:56Z",
      is_registered: true,
      address: [
        {
          street: "123 Main St",
          city: "Springfield",
          state: "IL",
          zip: "62704",
          country: "USA",
        },
      ],
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mockToken12345",
      uuid: "123e4567-e89b-12d3-a456-426614174000",
    };
    component.signUpForm.setValue(mockSignUpPayload);
    const signUpPayload = { ...mockSignUpPayload, 'user_type': 'Property-Owner' }
    authServiceSpy.signUpWithEmailAndPassword.and.returnValue(of(mockAuthApiResponse));
    component.onSubmit(signUpPayload);
    expect(authServiceSpy.signUpWithEmailAndPassword).toHaveBeenCalledWith(signUpPayload);
    expect(commonToastServiceSpy.successToast).toHaveBeenCalledWith('User Registered Successfully');
  })

  it('should not call signUpWithEmailAndPassword on invalid form and show error toast during sign up', () => {
    const mockSignUpPayload: { name: string; email: string; password: string; phoneNumber: number; user_type?: string } = {
      name: 'John Doe', email: 'prem@gmail.com', password: 'password123', phoneNumber: 1234567890,
    };
    const errorResponse = {
      error: {
        errMsg: 'Login failed',
        data: { message: 'Invalid credentials' }
      }
    };
    component.signUpForm.setValue(mockSignUpPayload);
    const signUpPayload = { ...mockSignUpPayload, 'user_type': 'Property-Owner' }
    authServiceSpy.signUpWithEmailAndPassword.and.returnValue(throwError(() => errorResponse));
    component.onSubmit(signUpPayload);
    expect(authServiceSpy.signUpWithEmailAndPassword).toHaveBeenCalledWith(signUpPayload);
    expect(commonToastServiceSpy.errorToast).toHaveBeenCalledWith('Login failed', 'Invalid credentials');
  })
});

