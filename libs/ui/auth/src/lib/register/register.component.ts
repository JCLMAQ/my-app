import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageSelectorComponent } from '../../../../i18n/src/lib/language-selector/language-selector.component';
import { IUserRegister } from '../auth.model';
import { RegisterService } from '../services/register.service';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
    selector: 'my-app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [MatCardModule, LanguageSelectorComponent, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatTooltipModule, JsonPipe]
})
export class RegisterComponent implements OnInit {
  private errorMsg?: string;

  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true;

  userToRegister: IUserRegister = {
    email: '',
    password: '',
    confirmPassword: '',
    lastName: '',
    firstName: '',
    nickName: '',
    gender: '',
    role: '',
    title: '',
  };

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    // private alertService: AlertService,
  ) {}

  ngOnInit(){

    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
// TODO Verify that the email doens not already exist !!!
    this.registerForm = this.fb.group({
      email: ['', {
        validators: [ Validators.required, Validators.email, ],
        updateOn: 'blur'
        }],
      password: ['', [ Validators.minLength(8), Validators.required, createPasswordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      nickName: ['', ],
      lastName: ['', ],
      firstName: ['', ],
      gender: ['', ],
      role: ['', ],
      title: ['', ],
      acceptTerms: [false, Validators.requiredTrue]
    }, formOptions );

  }

  get email() { return this.registerForm.controls['email'];}
  get password() {return this.registerForm.controls['password'];}
  get confirmPassword() {return this.registerForm.controls['confirmPassword'];}
  get lastName() {return this.registerForm.controls['lastName'];}
  get firstName() {return this.registerForm.controls['firstName'];}
  get title() {return this.registerForm.controls['title'];}
  get role() {return this.registerForm.controls['role'];}
  get gender() {return this.registerForm.controls['gender'];}
  get acceptTerms() {return this.registerForm.controls['acceptTerms'];}

  // convenience getter for easy access to form fields
  get formField() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid

    this.loading = true;

    this.register();
  }

  async register() {
    // this.userToRegister = this.registerForm.value
    try {
      // const res = await this.registerService.register(this.userToRegister);
      const res = await this.registerService.register(this.registerForm.value);
      if(res && res.errorMessage){
        alert(res.errorMessage);
      }
    } catch (e) {
      alert('Désolé, une erreur a eu lieu empéchant votre enregistrement');
    }
    this.login();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  login() {
    this.router.navigate(['login']);
  }

  backHome() {
    this.router.navigate(['home']);
  }

  cancelRegister() {
    this.router.navigate(['home'])
  }

}
