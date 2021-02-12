import { Component, Input, OnInit, TemplateRef } from "@angular/core";
import { CommonModule } from '@angular/common';  
import { User } from "src/app/models/user";
import { ShareService } from "src/app/services/share.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "UserCard",
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"],
})
export class UserCardComponent implements OnInit {
  @Input("user") user: User;
  user_with_skills: any;

  constructor(public shareService: ShareService) {}

  ngOnInit(): void {
    this.get_users_with_skills();
   // console.log(this.user);
  }

  //get image of user from database
  getImage(image): string {
    return "http://localhost:3500/uploads/" + image;
  }

  //get only users with skills
  get_users_with_skills() {
    if (this.user.skills.length > 0) {
      this.user_with_skills = this.user;
      // console.log(this.user_with_skills);
    }
  }
}
