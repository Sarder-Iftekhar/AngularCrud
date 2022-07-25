import { Injectable } from '@angular/core';
//for reactive form approach we have to import
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  ntificationService: any;

  constructor(private httpClient:HttpClient) { }
  //form group property
  form:FormGroup=new FormGroup({
    $contactID:new FormControl(null),
    firstName:new FormControl(''),
    middleName:new FormControl(''),
    lastName:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl('')
  })


  initializeFormGroup()
  {
    this.form.setValue({
      $contactID:null,
      firstName:'',
      middleName:'',
      LastName:'',
      email:'',
      phone:''

    });
  }

  saveContact(data:any):Observable<any>
  {
    //return this.httpClient.post(`/api/Employee/SaveEmployees`,data);
    //http://localhost:14251/api/Employee/SaveEmployees
    //http://localhost:5001/api/Contact/SaveContact
   
    return this.httpClient.post("http://localhost:5001/api/Contact/SaveContact",data);
    

  }

}
