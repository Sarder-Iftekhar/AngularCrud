import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ContactService } from 'src/app/shared/contact.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
 //contact : any;
 listPost:any;
  ntificationService: any;
  constructor(public service:ContactService) { }

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
  }

  getUserFormData()
  {
    //get form value from service
    let val = this.service.form.value;
    console.warn(val)
    this.ntificationService.success('Submitted successfully')
    this.service.saveContact(val).subscribe(data=>{
        //console.warn(result)
        this.listPost=data;
        console.warn(data)
        //edit
        

      }
      
    )
   // this.ntificationService.success('Submitted successfully')
   
  } 

}
