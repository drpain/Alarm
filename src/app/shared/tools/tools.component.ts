import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { tokenNotExpired } from 'angular2-jwt';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  user: any;
  token: any;
  public sending_notification = false;

  constructor(
    public afAuth: AngularFireAuth,
    public api: ApiService
  ) {
    this.afAuth.authState.subscribe(User => {
      this.user = User;
    });
  }

  getToken() {
    if (!this.user) return false;
    this.user.getIdToken(true).then(token => {
      this.token = token;
    });
  }

  testNotification() {
    if (this.sending_notification) return false;
    this.sending_notification = true;

    this.api.get('notification', 'type=alarm&device=rudi-iphone&title=Test message&message=This is a test notification&notification=true').subscribe(data => {
      console.log("resp", data);
      this.sending_notification = false;
      alert("Notification sent");
    }, err => {
      this.sending_notification = false;
      console.error(err);
      alert(err.status + ": " + err.statusText);
    })
  }

  ngOnInit() { }
}
