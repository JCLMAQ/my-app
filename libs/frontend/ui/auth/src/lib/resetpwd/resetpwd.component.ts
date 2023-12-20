import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';
import { OnlyOneErrorPipe } from '../../pipes/only-one-error.pipe';
import { JsonPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-resetpwd',
    templateUrl: './resetpwd.component.html',
    styleUrls: ['./resetpwd.component.scss'],
    standalone: true,
    imports: [MatCardModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, JsonPipe, OnlyOneErrorPipe]
})
export class ResetpwdComponent implements OnInit {

    hidePassword = true;
    hideConfirmPassword = true;

    resetpwdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router:Router,
    private store: Store<AppState>
  ) {
    const formOptions: AbstractControlOptions = { validators: MustMatch('newPassword', 'confirmNewPassword') };
    this.resetpwdForm = fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
        ]],
      confirmNewPassword: ['', [Validators.required]]
    },
    formOptions );
  }

  ngOnInit(): void {
  }

  get newPassword() {
    return this.resetpwdForm.controls['newPassword'];
}

get confirmNewPassword() {
  return this.resetpwdForm.controls['confirmNewPassword'];
}

  resetPwd() {

  }

  backhome() {
    this.router.navigate(['home']);
  }

}
