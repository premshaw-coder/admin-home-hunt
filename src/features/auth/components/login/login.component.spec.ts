import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs/internal/observable/of';
import { AuthApiResponse } from '../../interfaces/auth/auth-login.interface';
import { CommonToastService } from '../../../../app/shared/toast/common-toast.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../environments/environment.development';
import { ApiEndPoints } from '../../../../app/shared/api-ends-points/admin-home-hunt-api-endpoints';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let commonService: CommonToastService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideAnimationsAsync(),
        provideHttpClient(withInterceptors([])),
        provideHttpClientTesting(),
        AuthService,
        CommonToastService,
        MessageService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    commonService = TestBed.inject(CommonToastService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should properly initialize the form then the component loads for this first time', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.get('email')?.value).toEqual('');
    expect(component.loginForm.get('password')?.value).toEqual('');
  });

  it('should set values to the loginForm', () => {
    let loginUserFormData = {
      email: 'premshaw@gmail.com',
      password: 'password123'
    }
    component.loginForm.setValue(loginUserFormData)
    const loginFormData = component.loginForm.value
    expect(loginFormData).toEqual(loginUserFormData);
  });

  it('should validate the loginForm is valid', () => {
    let loginUserFormData = {
      email: 'premshaw@gmail.com',
      password: 'password123'
    }
    component.loginForm.setValue(loginUserFormData)
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should validate the loginForm is invalid', () => {
    let loginUserFormData = {
      email: '',
      password: 'password123'
    }
    component.loginForm.setValue(loginUserFormData)
    expect(component.loginForm.invalid).toBeTrue();
  });


  it('should validate the loginForm controls', () => {
    let loginUserFormData = {
      email: '',
      password: ''
    }
    component.loginForm.setValue(loginUserFormData)
    component.loginForm?.markAllAsTouched()
    expect(component.loginForm.controls.email?.errors?.['required']).toBeTrue();
    expect(component.loginForm.controls.password?.errors?.['required']).toBeTrue();
  });

  it('should check for invalidForm when submit is clicked', () => {
    let loginUserFormData = {
      email: '',
      password: ''
    }
    component.loginForm.setValue(loginUserFormData)
    component.loginForm?.markAllAsTouched();
    expect(component.onSubmit(loginUserFormData)).toBeUndefined();
    const onLoginWithEmailAndPasswordSpy = spyOn(authService, 'loginWithEmailAndPassword')
    expect(onLoginWithEmailAndPasswordSpy).not.toHaveBeenCalled();
    //2nd way to unit test the onSubmit method
    const onSubmitSpy = spyOn(component, 'onSubmit').and.callFake(() => undefined);
    const onSubmitFunctionCall = component.onSubmit(loginUserFormData);
    expect(onSubmitFunctionCall).toBeUndefined();
    expect(onSubmitSpy).toHaveBeenCalledOnceWith(loginUserFormData);
  });

  it('should check for validForm when submit is clicked', () => {
    let loginUserFormData = {
      email: 'premranjanshaw@gmail.com',
      password: 'Prem@123'
    }
    let loginApiResponse: AuthApiResponse = {
      "name": "PREM Ranjan Shaw",
      "email": "premranjanshaw@gmail.com",
      "auth_type": "Email",
      "user_type": "Property-Owner",
      "last_login": "2025-02-28T22:02:07.708Z",
      "uuid": "35c34572-f511-4828-8dbf-6a6dd4acd631",
      "address": [],
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzIzMWZkYThhMGExMzdkZGY2ZjY2MyIsImlhdCI6MTc0NDQ3MzgyMiwiZXhwIjoxNzQ0NzMzMDIyfQ.N8R6QEfAvtSYja3fDukXjK9kkdFTIoEwgxP8NxBXLD4"
    }
    component.onSubmit(loginUserFormData)
    authService.loginWithEmailAndPassword(loginUserFormData).subscribe((res: AuthApiResponse) => {
      expect(res).toEqual(loginApiResponse);
    })

    const req = httpTestingController.expectOne(environment.baseUrl + ApiEndPoints.login);
    expect(req.request.method).toEqual('POST');
    req.flush(loginApiResponse);

  });

});
