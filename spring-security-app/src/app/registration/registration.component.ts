import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ServicesrqService } from '../servicesrq.service';
// import * as bcrypt from 'bcryptjs';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})



export class RegistrationComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private routing: Router, private rqService: ServicesrqService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userEmail: '',
      userPassword: '',
      userDob:'',
      userName:'',
      userPhnNo:''
    });
  }
  register() {
 //let  password =this.form.getRawValue().userPassword //this.form.getRawValue().password; // Replace with the user's actual password
//const saltRounds = 10; // You can adjust the number of rounds as needed

if(confirm("Are you sure ?"+this.form.getRawValue().userName)){
this.rqService.userRegistration(this.form.getRawValue()).subscribe(
  (value: any) => {
    
    console.log("Response from service:", value);
    this.showSweetAlert("Registration Success","success");
    this.routing.navigate(['/login'])
  },
  (error: any) => {
    console.log('Failed to fetch user validation:', error);
    this.form.reset(); 
    this.showSweetAlert("User Already Exists!!","error");
    // Swal.fire({
    //   title:'login sucess',
    //   icon:'success',
    // })
  }
); 
}


    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //   if (err) {
    //     console.error('Error hashing password:', err);
    //   } else {
    //     console.log("the hash :",hash)

    //     // this.rqService.userValiation(this.form.getRawValue()).subscribe(
    //     this.rqService.userValiation({ "passwordHash": hash, "userEmail":this.form.getRawValue().userEmail }).subscribe(
    //       (value: any) => {
            
    //         console.log("Response from service:", value);
    //       },
    //       (error: any) => {
    //         console.error('Failed to fetch user validation:', error);
    //       }
    //     );
    //     // Send the 'hash' to the server
    //     // this.service.userValidation({ passwordHash: hash }).subscribe(/* Handle the response */);
    //   }
    // });

    // this.rqService.userValiation(this.form.getRawValue()).subscribe(
    //   (value: any) => {
        
    //     console.log("Response from service:", value);
    //   },
    //   (error: any) => {
    //     console.error('Failed to fetch user validation:', error);
    //   }
    // );

  }


  showSweetAlert(message: string, type: string) {
    let sweetAlertIcon: SweetAlertIcon;
  
    // Map your custom 'type' string to a valid SweetAlertIcon
    switch (type) {
      case 'success':
        sweetAlertIcon = 'success';
        break;
      case 'error':
        sweetAlertIcon = 'error';
        break;
 
      // Add more cases as needed
      default:
        sweetAlertIcon =  'warning'; // Set a default value if the type is not recognized
    }
  
    Swal.fire({
      icon: sweetAlertIcon, // Use the mapped SweetAlertIcon
      title: 'Sweet Message!',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }
  

}
