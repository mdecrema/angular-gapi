import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() {
    gapi.load('client', () => {
      gapi.client.init({
        apiKey: environment.apiKey, // Your Google Api KEY,
        clientId: environment.clientId, // Your Google Api CLIENT ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly'
      })
    })
   }

   getCalendarList() : Promise<any> {

    return new Promise( resolve => { 
      gapi.client.calendar.calendarList.list({
        'maxResults': 200,
      }).then(
        (response) => {
          resolve(response.result.items)
        }
      )
    })

   }

  getCalendarByName(name: string, allCalendars: any) {
    return allCalendars.filter((calendar) => calendar.summary === name); 
  }

  getEvents() : any {
    var time_max = new Date();
    time_max.setDate(time_max.getDate()+30);
    var time_min = new Date();
    time_min.setDate(time_min.getDate()-30);

    gapi.client.setApiKey("");

      var request = gapi.client.calendar.events.list({
        'calendarId': '3bml8g7rtgrckieqtki78vtahc@group.calendar.google.com',
        'timeMin': time_max.toISOString(),
        'timeMax': time_min.toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 100,
        'orderBy': 'startTime'
      });
      
      request.execute(function(resp){
        var events = resp.items;
        console.log(events);
      });

  } 

  postNewEvent(event: any) : Promise<any> {
    return new Promise( resolve => {
      gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
        'sendNotifications': true
      }).then(
        (request) => {
          resolve(request);
        }
      )
    })
  }
}
