import { Component, OnInit } from '@angular/core';
import { CalendarService } from 'src/services/calendar.service';
import { ContactService } from 'src/services/contact.service';
import { GmailService } from 'src/services/gmail.service';
import { GoogleApiService } from 'src/services/google-api.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  user: gapi.auth2.GoogleUser;
  userID: string;
  access_token: any;
  // Gmail
  emails: any;
  // Calendar
  calendarList: any;
  calendar: any;
  eventList: any;
  // People Contacts
  contactGroups: any;
  
  event = {
    'summary': 'Nuovo Appuntamento',
    'location' : 'Milan, Italy',
    'description' : 'I am testing how to post events on google calendar! ',
    'start' : {
      'dateTime': '2021-11-02T09:00:00-09:00',
      'timeZone' : 'GMT+01:00'      
    },'end' : {
      'dateTime' : '2021-11-02T10:00:00-10:00',
      'timeZone' : 'GMT+01:00',  
    },
    'recurrence' : ['RRULE:FREQ=DAILY;COUNT=2'  ]
    ,'attendees' : [    
      {'email' : 'marcodecrema@libero.it'},  // Email CC  
      {'email' : 'hp-dev@gmail.com'},   // Email CC
    ],
    'reminders' : {
      'useDefault' : false,
      'overrides' : [{
        'method' : 'email', 
        'minutes' : 24 * 60
      },      
      {
        'method' : 'popup', 
        'minutes' : 10
      },    
    ],    
  },   
}

  constructor(
    private googleApiService: GoogleApiService,
    private gmailService: GmailService,
    private calendarService: CalendarService,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  // Authentication

  login() {
    this.googleApiService.signIn().then(
      (res) => {
        this.user = res;
        console.log(this.user);
      }
    );
    
  }

  logout() {
    this.googleApiService.signOut();
    console.log('You Signed Out!');
  }

  getUserId() {
    this.userID = this.googleApiService.getUserId(this.user);
    console.log(this.userID);
  }

  getAccessToken() {
    this.access_token = this.googleApiService.getAccessToken(this.user);
    console.log(this.access_token);
  }

  // Gmail

  readMails() {
    this.gmailService.listMails(this.user).then(
      (res) => {
        this.emails = res.messages;
        console.log(this.emails);
      }
    )
  }

  sendMail() {
    this.gmailService.sendMail(this.user);
  }

  // Calendar

  getCalendarList() {
    this.calendarService.getCalendarList().then(
      (response) => {
        this.calendarList = response;
        console.log(this.calendarList);
      }
    )
  } 

  getCalendarByName() {
    this.calendar = this.calendarService.getCalendarByName('TestCalendar', this.calendarList);
    console.log(this.calendar);
  }

  getEvents() {
    this.eventList = this.calendarService.getEvents();
    console.log(this.eventList);
  }

  postEvent() {
    this.calendarService.postNewEvent(this.event);
  }

  // People Contacts

  getContactsList() {
    this.contactGroups = this.contactService.getContactsList(this.user);
    console.log(this.contactGroups);
  }

}
