import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GmailService {

  message = {
    "id": 'fwargfawer',
    "threadId": 'gregbfd',
    "labelIds": [
      'geargvbfd'
    ],
    "snippet": 'rdsgedrf',
    "historyId": 'gesrdgb',
    "internalDate": 'string',
    "payload": {
        "partId": 'string',
        "mimeType": 'string',
        "filename": null,
        "headers": [
          {
            "name": 'CIAO',
            "value": 'CIAOCIAO'
          }
        ],
        "body": {
            "attachmentId": null,
            "size": 1,
            "data": 'WElcome welcome welcome'
        }
        
    },
    "sizeEstimate": 1,
    "raw": 'string'
  }

  message2 = {
    "id": "15a7a79ed814d9ec",
    "threadId": "15a7a79d389926b3",
    "labelIds": [
     "UNREAD",
     "IMPORTANT",
     "SENT",
     "INBOX"
    ],
    "snippet": "Test 2 2021-11-01 13:51 GMT+01:00 Emil Tholin marcodecrema@libero.it: Test 1",
    "historyId": "1138108",
    "internalDate": "1488113495000",
    "payload": {
     "mimeType": "multipart/alternative",
     "headers": [
      {
       "name": "In-Reply-To",
       "value": "u003cCADsZLRzQ8UQ1HJ8=YsvRv-jtpRY=s_wZmbL8RzSbCtw4T5A+vg@mail.gmail.comu003e"
      },
      {
       "name": "References",
       "value": "u003cCADsZLRzQ8UQ1HJ8=YsvRv-jtpRY=s_wZmbL8RzSbCtw4T5A+vg@mail.gmail.comu003e"
      },
      {
       "name": "Message-ID",
       "value": "u003cCADsZLRzHC_sR6THger6gkDjJ348XbXehQ0YsFwHAh762ht216A@mail.gmail.comu003e"
      },
      {
       "name": "Subject",
       "value": "Re: Test"
      }
     ]
    },
    "sizeEstimate": 1333
   }


  constructor() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: 'AIzaSyA8usr5NDzCO3CV3O6bdzQxk8JRsZw7cH0',
        clientId: '202051394114-scm5a26govtgdup6tc438of4lk7qv6ok.apps.googleusercontent.com',
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
        userId: 'me',
        access_token: user.getAuthResponse().access_token,
        resource: this.message2
      }).then(
        (request) => {
          resolve(request);
        }
      )
    })
  }
}
