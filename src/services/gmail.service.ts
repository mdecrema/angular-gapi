import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

   message = [
    'MIME-Version: 1.0',
    "From:" + 'marcodecrema@libero.it' +"\r\n" +
     "To: " + 'decremamarco@gmail.com' +"\r\n"  +
     "Subject:" + 'Nuova Mail da Gapi' +"\nContent-Type: text/html; charset=UTF-8\n\n\n"+'Buona sera, Il tuo turno di lavoro è stato modificato Sabato 06/12 -> Mattino (10.30/15.00)'+"",
     
   ].join("");


  constructor() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.apiKey, // Your Google Api KEY,
        clientId: environment.clientId, // Your Google Api CLIENT ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send'
      })
    })
   }

   public listMails(user: gapi.auth2.GoogleUser) : Promise<gapi.client.gmail.ListMessagesResponse> {
    return new Promise(resolve => {
      gapi.client.gmail.users.messages.list({
        userId: user.getId(),
        access_token: user.getAuthResponse().access_token,
        maxResults: 10
      }).then(
        (response) => {
          resolve(response.result)
        }
      )
    })
  }

  public sendMail(user: gapi.auth2.GoogleUser) : Promise<any> {
    return new Promise( resolve => {
      gapi.client.gmail.users.messages.send({
        userId: user.getId(),
        access_token: user.getAuthResponse().access_token,
        resource: {
          raw: btoa(this.message.toString())
        }
      }).then(
        (request) => {
          resolve(request);
        }
      )
    })
  }
}
