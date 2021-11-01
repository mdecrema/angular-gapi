import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() { 
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: 'AIzaSyBA-lWAnl9UhZUhPBedNSxO9IgRLT9sXec',
        clientId: '202051394114-scm5a26govtgdup6tc438of4lk7qv6ok.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/people/v1/rest'],
        scope: 'https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly'
      })
    })
  }


  getContactsList(user: gapi.auth2.GoogleUser) : any {
    gapi.client.load('people', 'v1', () => {
      
      var req = gapi.client.people.contactGroups.list({
        access_token: user.getAuthResponse().access_token
      });

      req.execute(function(){
        (res) => {
          console.log(res);
        }
      })

    });
  }
}
