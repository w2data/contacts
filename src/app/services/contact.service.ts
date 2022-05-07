import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ContactInformation } from '../models/contact-information';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private dbPath = '/contacts';

  contactsRef: AngularFireList<ContactInformation> = null;

  constructor(private db: AngularFireDatabase) {
    this.contactsRef = db.list(this.dbPath);
  }

  create(contact: ContactInformation): any {
    console.log('in service');
    return this.contactsRef.push(contact);
  }
}
