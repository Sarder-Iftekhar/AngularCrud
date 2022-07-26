import { Injectable } from '@angular/core';
//for reactive form approach we have to import
import { FormGroup,FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../classes/contact';

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
   contact!:Contact[];
  populateForm(contact:any){
    //this.form.setValue(contact)



  }

  saveContact(data:any):Observable<any>
  {
    //return this.httpClient.post(`/api/Employee/SaveEmployees`,data);
    //http://localhost:14251/api/Employee/SaveEmployees
    //http://localhost:5001/api/Contact/SaveContact
   
    return this.httpClient.post("http://localhost:5001/api/Contact/SaveContact",data);
    

  }

 url='http://localhost:5001/api/Contact/GetAllContact'
  getContacts():Observable<any>
  { 
     //return this.httpClient.get(`/api/Contact/GetAllContact`);

     return this.httpClient.get(this.url);
  }


  //for checking
    getContactByParameter(contactID:string):Observable<any>
  {
    //passed parameter employeeID:string                 //error:3
    //get by using doller sign ----  ${employeeID}
    //like this change param name in backend controller in getEmployeeBy parameter function also
     return this.httpClient.get(`/api/Employee/GetContactById/id/${contactID}`);
     //return this.httpClient.get(this.url1);


  }


  






}
