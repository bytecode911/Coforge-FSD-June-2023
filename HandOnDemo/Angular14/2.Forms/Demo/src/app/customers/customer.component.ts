import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators,FormArray,AbstractControl, ValidatorFn } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { Customer } from './customer';
import { __values } from 'tslib';

function emailMatcher( c: AbstractControl):{[key:string]:boolean} | null{
  const emailControl=c.get("email");
  const  confirmEmail=c.get("confirmEmail");
  // if(emailControl.pristine === confirmEmail.pristine){
  //   return null;
  // }
  if(emailControl.value === confirmEmail.value){
    return null;
  }
  return{match:true}
}

// //Custom validator hardcoded for Rating
// function ratingRange(c: AbstractControl): {[key:string]:boolean} | null{

//   if (c.value!=null && (isNaN(c.value) || c.value <1 || c.value>5)) {
//     return{'range': true};
//   }
//   return null;

// }

//Custom validator for Param
function ratingRange(min:number,max:number): ValidatorFn{
  return (c:AbstractControl): {[key:string]:boolean} | null =>{
  if (c.value!=null && (isNaN(c.value) || c.value <min || c.value>max)) {
    return{'range': true};
  }
  return null;
}
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();
  emailMessage:string;

  get addresses():FormArray{
    return <FormArray> this.customerForm.get("addresses");
  }

  private validationMessages={
    required: "Please enter your email address.",
    email: "Please enter a valid email address.",
  };

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
  this.customerForm= this.fb.group({
    firstName:["",[Validators.required,Validators.minLength(3)]],
    //lastName:{value:"n/a",disabled:true},
    lastName:["",[Validators.required,Validators.maxLength(50)]],
    emailGroup: this.fb.group({
      email:["",[Validators.required,Validators.email]],
      confirmEmail: ['',Validators.required],
  },{validator:emailMatcher}),
    phone:'',
    notification:"email",
   // rating:[null,[Validators.min(1),Validators.max(5)]],
    //rating:[null, ratingRange],
    rating:[null, ratingRange(1,5)],
    sendCatalog:true,
    addresses: this.fb.array([this.buildAddress()]),  
  });
  
  this.customerForm
      .get('notification')
       .valueChanges.subscribe(
    (value) => 
    //console.log(value));
  this.setNotification(value));

  const emailControl=this.customerForm.get("emailGroup.email");
  emailControl.valueChanges
    .pipe(debounceTime(1000))
    .subscribe(
    (value) => this.setMessage(emailControl)
  );

  }

//   populateTestData():void{
//     this.customerForm.setValue({
//       firstName:"Dev",
//       lastName:"Raj",
//       email:"abc@tochwood.com",
// sendCatalog:false,
//     })
//   }

addAddress():void{
  this.addresses.push(this.buildAddress());
}

buildAddress():FormGroup{
 return this.fb.group({
    addressType:"home",
    street1:["",[Validators.required,Validators.minLength(5)]],
    street2:"",
    city:"",
    state:"",
    zip:"",
  })
}

 populateTestData():void{
    this.customerForm.patchValue({
      firstName:"Dev",
      lastName:"Raj",
      email:"abc@tochwood.com",
sendCatalog:false,
    })
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm));
  }

  setMessage(c:AbstractControl):void{
    this.emailMessage="";

    if((c.touched || c.dirty) && c.errors){
      this.emailMessage=Object.keys(c.errors)
      .map((key) => this.validationMessages[key])
      .join(" ");
    }
  }



  setNotification(notifyVia:string):void{
    const phoneControl=this.customerForm.get('phone');

    if(notifyVia === 'text'){
      phoneControl.setValidators(Validators.required);

    }else{
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
