import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from '@prisma/client';

import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { map } from 'rxjs';
import { UserEntityService } from '../store/user-entity.service';
import { UserListService } from '../userList.service';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';
import { userEmailValidator, userNickNameValidator } from '../validators/user-async.validator';

// import { userEmailValidator } from '../validators/user-async.validator';
@Component({
    selector: 'my-app-users-details',
    templateUrl: './users-details.component.html',
    styleUrls: ['./users-details.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatButtonModule,
        MatTooltipModule,
        RouterLink,
        JsonPipe,
    ],
})
export class UsersDetailsComponent implements OnInit{
  private errorMsg?: string;

  public user?: User;
 // navigation init
  hasNext = false;
  hasPrevious = false;


  profileForm!: FormGroup;
  newProfileForm!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  isAdmin!: boolean; // Needed to be sure that the user has an Id
  loading = false;
  submitted = false;
  hidePassword = true;
  mode: 'create' | 'update' | 'view';

  formControls = {};

  filteredData: User[] | undefined;
  filterIndex: number | undefined;
  lengthFilteredData: number | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userEntityService: UserEntityService,
    private userListService: UserListService,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.mode = 'view'
  }



  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id; // Only for User profil
    this.mode = this.route.snapshot.params['mode'];


    this.isAdmin = true

    this.userListService.usersList.subscribe(data => {this.filteredData = data})
    this.filterIndex = this.filteredData?.findIndex((filter: { id: string; }) => filter.id === this.id)
    this.lengthFilteredData= this.filteredData?.length;
    if(this.lengthFilteredData === undefined) { this.lengthFilteredData = 0}
    if(this.filterIndex === undefined) { this.filterIndex = 0}

    this.flagNavBouttons(this.filterIndex,this.lengthFilteredData)

    // // TODO verify isAdmin from the User logged
    // this.isAdmin = false;
    // // password not required in update mode
    const passwordValidators = [Validators.minLength(8)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }

    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };

    this.formControls = {
      title: ['', []],
      email: ['', {
            validators: [ Validators.required, Validators.email, ],
            asyncValidators: [userEmailValidator(this.userEntityService)],
            updateOn: 'blur'
            }],
      nickName: ['', {
            validators: [Validators.required, Validators.maxLength(10), Validators.minLength(3)],
            asyncValidators: [userNickNameValidator(this.userEntityService)],
            updateOn: 'blur'
            }],
      lastName: ['', ],
      firstName: ['', ],
      // validates date format yyyy-mm-dd : dob = date of birth
      dob: ['', []],
    };


    if (this.mode === 'update' || this.mode ==='view') {
      this.profileForm = this.fb.group(this.formControls);
      this.userEntityService.entities$
          .pipe(
            map((users :User[]) => users.find((user :User)=> user.id === this.id)))
          .subscribe((result) => {this.user = result} );
      this.profileForm.patchValue({...this.user})

      if(this.mode == 'view' ) { this.profileForm.disable()}

    } else {
        if (this.mode == 'create' || this.isAddMode ) {
        this.hasNext = false;
        this.hasPrevious = false;
        this.profileForm = this.fb.group({
            ...this.formControls,
            password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
            confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
            role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
            acceptTerms: [false, Validators.requiredTrue]
        });
      }
    }

  } // end of ngOnInit

  flagNavBouttons(dataIndex: number | undefined, lengthData: number | undefined){
    if ((dataIndex != undefined) && (lengthData != undefined)) {
      this.hasPrevious = true
      this.hasNext = true
      if(lengthData === 1) {
        this.hasNext = false
        this.hasPrevious = false
      } else {
        if( dataIndex  >= lengthData -1 ){
          this.hasNext = false
          this.hasPrevious = true
        }
        if ((dataIndex )<= 0) {
        this.hasPrevious = false
        this.hasNext = true
        }
      }
    }
  }

  searchUserFromIndex(indexId: number) {
    let result: User | undefined
    if(this.filteredData != undefined){
      result = Object.values(this.filteredData)[indexId];
      return result
      }
      return result
  }



  onSubmit() {
    this.submitted = true;
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.profileForm.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.loading = false
    if (this.mode == 'update') {
        this.save();
    } else {
        this.create();
    }
  }

  reload(id: string | undefined) {
    if (this.mode === 'update' || this.mode ==='view') {
      this.userEntityService.entities$
          .pipe(
            map((users :User[]) => users.find((user: User)=> user.id === id)))
          .subscribe((result) => {this.user = result} );
      this.profileForm.patchValue({...this.user})
    } else {
        if (this.mode == 'create' || this.isAddMode ) {
          this.profileForm.reset()
          this.profileForm = this.fb.group({
            ...this.formControls,
            password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
            confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
            role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
            acceptTerms: [false, Validators.requiredTrue]
          });
        }
    }
  }


  save() {
    const val = this.profileForm.value;
    let dobIn = null
    if(val.dob !== null || undefined ) {
      if(val.dob !== '') {
        dobIn = val.dob?.toISOString();
      }

    }
    this.profileForm.value.dob = dobIn;
    if(this.profileForm.value.title === "") {
      this.profileForm.value.title = null;
    }

    const user: Partial<User> = {
        ...this.user,
        ...this.profileForm.value,
    };


    if (this.mode == 'update') {
        this.userEntityService.update(user);
    } else {
      if (this.mode == 'create') {
        this.userEntityService.add(user, {isOptimistic: false})
    }
  }
}
  add() {
    this.mode = 'create';
    this.reload(undefined)
  }

  create() {}

  cancel() {
    this.router.navigate(['users/userslist']);
  }

  remove() {}

  reset() {}

  virtualRemove(id: string | undefined) {}

  next() {
    if ((this.filterIndex != undefined) && (this.lengthFilteredData != undefined)){
      this.filterIndex = this.filterIndex + 1;
      if(this.filterIndex >= this.lengthFilteredData) {
        this.filterIndex = this.lengthFilteredData - 1
      }
      this.flagNavBouttons(this.filterIndex,this.lengthFilteredData)
      const nextUser: User | undefined = this.searchUserFromIndex(this.filterIndex)
      this.reload(nextUser?.id)
    }
  }

  last() {
    if ((this.filterIndex != undefined) && (this.lengthFilteredData != undefined)){
      this.filterIndex = this.lengthFilteredData - 1;
      this.flagNavBouttons(this.filterIndex,this.lengthFilteredData)
      const nextUser: User | undefined = this.searchUserFromIndex(this.filterIndex)
      this.reload(nextUser?.id)
    }
  }

  first() {
    if ((this.filterIndex != undefined) && (this.lengthFilteredData != undefined)){
      this.filterIndex = 0;
      this.flagNavBouttons(this.filterIndex,this.lengthFilteredData)
      const nextUser: User | undefined = this.searchUserFromIndex(this.filterIndex)
      this.reload(nextUser?.id)
    }
  }

  previous() {
    if ((this.filterIndex != undefined) && (this.lengthFilteredData != undefined)){
    this.filterIndex = this.filterIndex - 1;
    if(this.filterIndex <= 0) {
      this.filterIndex = 0
    }
    this.flagNavBouttons(this.filterIndex,this.lengthFilteredData)
    const nextUser: User | undefined = this.searchUserFromIndex(this.filterIndex)
    this.reload(nextUser?.id)
  }
}

  async register() {
    // try {
    //   const res = await this.registerService.register(userToRegister);
    //   if(res && res.errorMessage){
    //     alert(res.errorMessage);
    //   }
    // } catch (e) {
    //   alert('Désolé, une erreur a eu lieu empéchant votre enregistrement');
    // }
    this.router.navigate(['login']);
  }

  onReset() {
    this.submitted = false;
    this.profileForm.reset();
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

  // GET
  get formField() {
    return this.profileForm.controls;
  }

  get email() {
    return this.profileForm.controls['email']
  }

  get nickName() {
    return this.profileForm.controls['nickName']
  }

  // get dob(): Date{
  //   return this.formControls[dob].toDateString()
  // }

}



