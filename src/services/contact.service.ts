import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { 
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.apiKey, // Your Google Api KEY
        clientId: environment.clientId, // Your Google Api CLIENT ID
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/people/v1/rest'],
        scope: 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly'
      })
    })
  }


  getContactsList() : any {

    return new Promise( resolve => {
      gapi.client.people.contactGroups.list({
  
      }).then(
        (request) => {
          resolve(request.result.contactGroups);

          console.log(request.result.contactGroups);
        }
      )
    })
  }

  getContactGroupByName() {
    return new Promise( resolve => {
      gapi.client.people.contactGroups.get({
        resourceName: 'contactGroups/796238e209ab9d47'
      }).then(
        (request) => {
          resolve(request);

          console.log(request);
        }
      )
    })
  }

}
