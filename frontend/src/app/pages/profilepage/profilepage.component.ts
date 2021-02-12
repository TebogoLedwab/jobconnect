import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ShareService } from 'src/app/services/share.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: [ './profilepage.component.scss' ]
})
export class ProfilepageComponent implements OnInit {
  url:any;
  video: any;
  selected_userId: string;
  selected_user: User = null;

  constructor (
    private route: ActivatedRoute,
    private userService: UserService,
    public alert: AlertService,
    private router: Router,
    public shareService: ShareService
  ) { }

  ngOnInit (): void {
    this.selected_userId = this.route.snapshot.paramMap.get('_id');
   // console.log(this.selected_userId);
    this.get_user_by_id();
    // this.getVideo('video');
  }

  // get user profile by id
  get_user_by_id (): void {
    this.userService.get_user_by_id(this.selected_userId).subscribe((user_server: any) => {
      this.selected_user = user_server.users[ 0 ];
      this.userService.user = this.selected_user;
      this.video = this.selected_user.video;

      //check if user has video
      if(this.selected_user.video == null)
      {
        //assign default video
        this.url ="../../../assets/W7y0.gif";
      }
      else{
        // get video of selected user
        this.url = "http://localhost:3500/uploads/" + this.video;
      }
    
    }, (error) => {
      this.alert.error(error.error.message);
      this.router.navigate([ '/dash' ]);
    })
  }

  back = _ => window.history.back();

  //get users video from backend
  getVideo(video): string {
    return "http://localhost:3500/uploads/" + video;
  }
 
}
