import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { ShareService } from 'src/app/services/share.service';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.scss' ]
})
export class HomepageComponent implements OnInit {

  modalRef: BsModalRef;

  user: any;

  users: Array<User> = [];

  //a variable name to store users with skills
  users_with_skills: any;

  //an array to put in users with updated skills only
  users_skills:any[]=[];

  constructor (
    private modalService: BsModalService,
    public alert: AlertService,
    public storeService: StoreService,
    public userService: UserService,
    private shareService: ShareService
  ) { }

  ngOnInit (): void {
    // get all users
    this.get_users();
  }

  // get all users
  get_users (): void {
    this.userService.get_users().subscribe((server_users: Array<User>) => {
      this.storeService.set_users(server_users);
      this.users = server_users;
    //  console.log(this.users)

      //a method to get and display users with skills only
      this.users.forEach(user => {
       this.users_with_skills =  user.skills

       if(this.users_with_skills.length > 0){
        this.users_skills.push(user);
       }
       this.users_skills= this.users_skills.reverse()
      });
      
    });
  }

  // shuffle users by a specific category
  shuffle_by_category (skill_name: string): void {
    this.users_skills = this.storeService.get_users;

    let temp_users: Array<User> = [];

    for (let i = 0; i < this.users_skills.length; i++) {
      temp_users.push(this.get_user_with_skill(this.users_skills[ i ], skill_name));
    }

    temp_users = temp_users.filter(user => user !== null);
    this.users_skills = this.shareService.shuffle(temp_users.reverse());

    this.alert.success(`Sort by ${skill_name}`)
    
    
  }

  get_user_with_skill (user: User, skill_name: string): User {
    const skills = user.skills;
    for (let i = 0; i < skills.length; i++) {
      if (skills[ i ].name == skill_name) {
        return user;
      }
    }
    return null;
  }

  view_other_services(){
    this.alert.error("Please signup for more categories.");
  }

  openModal (template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
