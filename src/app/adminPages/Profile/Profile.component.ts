import { AuthenticationService } from './../../services/authentication.service';
import { User, newPassword } from './../../entities/user';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'admin-profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit{
  selectedFile : File = null;
  FromUser: any;    
  FromPassword: any;    
  submitted = false;
  submittedPassword = false;

  constructor(
    private formbuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private UserService: UserService
    ) {
         this.UploudUserDataInForm(this.authenticationService.currentUserValue.id.toString());
      }  

   ngOnInit(): void {  
    this.FromUser = this.formbuilder.group({  
      Id: [0, [Validators.required]],  
      Name: ['', [Validators.required]],  
      Email: ['', [Validators.required]],  
      Password: ['', [Validators.required]], 
      Description: ['', [Validators.required]],  
    });  
    this.FromPassword = this.formbuilder.group({  
      OldPassword: ['', [Validators.required]],  
      NewPassword: ['', [Validators.required]],  
      NewPassword2: ['', [Validators.required]],  
    });  
  }   

  get f() { return this.FromUser.controls; }
  get p() { return this.FromPassword.controls; }

  UploudUserDataInForm(UserId: string) {  
    this.UserService.getUser(UserId).subscribe(Response => {  
        this.FromUser.patchValue({
          Id: Response.id,
          Password: Response.password
        });
        this.FromUser.controls['Name'].setValue(Response.name);  
        this.FromUser.controls['Email'].setValue(Response.email);  
        this.FromUser.controls['Description'].setValue(Response.description);  
    });  
  } 

  UpdateUser(User: User) {
    this.submitted = true;

    if (this.FromUser.invalid) {
      return;
    }
    this.UserService.updateUser(this.authenticationService.currentUserValue.id, User)
                    .subscribe(() => {
                      this.UploudUserDataInForm(this.authenticationService.currentUserValue.id.toString());
                      this.submitted = false;
                    });  
  }

  UpdatePassword(pass: newPassword) {
    this.submittedPassword = true;

    if (this.FromPassword.invalid) {
      return;
    }
    this.UserService.updatePassword(this.authenticationService.currentUserValue.id, pass)
                    .subscribe(() => {
                      this.submittedPassword = false;
                    });  
  }

  Reset()    
  {    
     this.FromPassword.controls['OldPassword'].setValue('');  
     this.FromPassword.controls['NewPassword'].setValue('');  
     this.FromPassword.controls['NewPassword2'].setValue('');  
     this.submittedPassword = false;
  }

  onSelectedFile(e){
      this.selectedFile = e.target.files[0];
  }

  linkItem(){
      var formData = new FormData();
      formData.append("file", this.selectedFile, this.selectedFile.name)
      this.UserService.linkItemToIcon(this.authenticationService.currentUserValue.id, formData)
                      .subscribe(
                        r => console.log(r),
                        err => console.log(err)
                        )
  }
}
