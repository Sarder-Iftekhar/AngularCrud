import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from 'src/app/shared/contact.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  //listGet:any;
 
  constructor(public contactService:ContactService,
              private dialog:MatDialog, 
              private router: Router,
              public notificationService:NotificationService) { }

  ngOnInit(): void {

    this.getAllContacts();
    
    
  }

  ngAfterViewInit(){
    //this.listGet.sort = 
  }
  @ViewChild(MatSort)
  sort!: MatSort;
  //listGet:MatTableDataSource<any>;
  //listGet!:MatTableDataSource<any>;
  listGet =  new MatTableDataSource();
  //listGet:any;
  searchKey!:string;

  displayedColumns: string[] = ['firstName', 'middleName', 'lastName', 'email', 'phone', 'actions']
  getAllContacts(){
    this.contactService.getContacts().subscribe
    (
      data=>
      {
        this.listGet.data = data;
        
      }
    )
  }
  
  // onSearchClear() {
  //   this.searchKey = " ";
  //  this.applyFilter();
  // }

  // applyFilter() {
  //   this.listGet.filter = this.searchKey.trim().toLowerCase();
  // }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listGet.filter = filterValue.trim().toLowerCase();
    // if (this.listGet.paginator) {
    //   this.listGet.paginator.firstPage();
    // }
  }

//for popup form
  onCreate()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=false;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
   this.dialog.open(ContactComponent,dialogConfig)
  }

//edit not working
  onEdit(row:any)
  {    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=false; //true
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.data=row.contactId;
    let dialogRef = this.dialog.open(ContactComponent,dialogConfig)

    dialogRef.afterClosed().subscribe(confirm=>{
      if (confirm) {
        this.getAllContacts();
      }     
    })
  }


  onDelete(row:any){
    if(confirm('Are you sure to delete this record ?')){
      this.contactService.deleteContact(row.contactId).subscribe(
        data=>{
          this.getAllContacts();
        }

      );
      this.notificationService.warn('! Deleted successfully');
    }
  };
  //test
 
  
}
