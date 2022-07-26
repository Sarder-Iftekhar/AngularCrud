import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
 //contact : any;
 listPost:any;
  //ntificationService: any;
  constructor(public service:ContactService,
              public notificationService:NotificationService,
              public router: Router,
              public dialogRef:MatDialogRef<ContactComponent>) 
  { }

  ngOnInit(): void {
    // this.contact=new FormGroup({
    //   $contactID:new FormControl(null),
    //   firstName:new FormControl(''),
    //   middleName:new FormControl(''),
    //   LastName:new FormControl(),
    //   email:new FormControl(''),
    //   phone:new FormControl('')
    // })
  }


  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  getUserFormData()
  {
    //get form value from service
    let val = this.service.form.value;
    console.warn(val)
    
    this.service.saveContact(val).subscribe(data=>{
        //console.warn(result)
        this.listPost=data;
        console.warn(data)
        //edit
        this.notificationService.success('::Submitted successfully');
        
      }
      
    )
   // this.ntificationService.success('Submitted successfully')
   this.onClose();
  } 


//on close function not working, see later
  onClose()
  {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }




  // onSubmit() {
  //   if (this.service.form.valid) {
  //     this.service.insertEmployee(this.service.form.value);
  //     this.service.form.reset();
  //     this.service.initializeFormGroup();
  //     this.notificationService.success(':: Submitted successfully');
  //   }

}
