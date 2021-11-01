import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private auth: gapi.auth2.GoogleAuth;
  private user: gapi.auth2.GoogleUser;
  public subject = new ReplaySubject<gapi.auth2.GoogleUser>(1);

  constructor() { 
    gapi.load('auth2', () => {
      this.auth = gapi.auth2.init({  
        client_id: '202051394114-scm5a26govtgdup6tc438of4lk7qv6ok.apps.googleusercontent.com',
        //scope: 'https://www.googleapis.com/auth/gmail.readonly'
      })
    })
  }



  signIn(): Promise<gapi.auth2.GoogleUser> {
    /*gapi.load('auth2', () => {
    this.auth = gapi.auth2.init({
      client_id: '202051394114-scm5a26govtgdup6tc438of4lk7qv6ok.apps.googleusercontent.com'
    })
  })*/
    
    // Login
    return new Promise(resolve => {
      this.auth.signIn().then(
        (response) => {
          resolve(response);
        }
      )
    })

  }

  signOut() {
    this.auth.signOut().then(
      (res) => {}
    )
  }

  getUserId(user: gapi.auth2.GoogleUser) {
    return user.getId();
  }

  getAccessToken(user: gapi.auth2.GoogleUser) {
    // Undefined if stamped
    return user.getAuthResponse().access_token;
  }

}
