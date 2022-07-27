import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  listPost:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public contactService:ContactService,
              public notificationService:NotificationService,
              public router: Router,
              public dialogRef:MatDialogRef<ContactComponent>) 
  { }

  ngOnInit(): void {
    this.getDataForEdit(this.data);
  }

  getDataForEdit(contactId:number) {
    this.contactService.getContactByParameter(contactId).subscribe(res=>{
      this.contactService.form.patchValue(res);   
    });
  }

  onClear(){
    this.contactService.form.reset();
    this.contactService.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  getUserFormData()
  {
    //get form value from service
    let val = this.contactService.form.value;
    console.warn(val)
    
    this.contactService.saveContact(val).subscribe(data=>{        
        //edit
        this.notificationService.success('Submitted successfully');   
        this.onClose(true);     
      }      
    )
   // this.ntificationService.success('Submitted successfully')
   //this.onClose();
  } 


//on close function not working, see later
  onClose(val:boolean)
  {
    // this.service.form.reset(); // test
    // this.service.initializeFormGroup(); // test
    this.dialogRef.close(val);
  }




  // onSubmit() {
  //   if (this.service.form.valid) {
  //     this.service.insertEmployee(this.service.form.value);
  //     this.service.form.reset();
  //     this.service.initializeFormGroup();
  //     this.notificationService.success(':: Submitted successfully');
  //   }

}
