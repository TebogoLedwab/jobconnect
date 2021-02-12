import { Component, OnInit } from "@angular/core";
import { Skill } from "src/app/models/skills";
import { User } from "src/app/models/user";
import { AlertService } from "src/app/services/alert.service";
import { ShareService } from "src/app/services/share.service";
import { SkillsService } from "src/app/services/skills.service";
import { StoreService } from "src/app/services/store.service";
import { UserService } from "src/app/services/user.service";

import { City } from "src/app/location";

@Component({
  selector: "app-dashboardpage",
  templateUrl: "./dashboardpage.component.html",
  styleUrls: ["./dashboardpage.component.scss"],
})
export class DashboardpageComponent implements OnInit {
  //users
  users: Array<User> = [];
  //skills
  skills: Skill[] = [];
  //city
  location = City;
  //an array to put in users with updated skills only
  users_skills:any[]=[];

  users_filtered: any[] = [];
  skillName: string = "All";
  locationName: string = "All";

  //a variable name to store users with skills
  users_with_skills: any;

  constructor(
    public alert: AlertService,
    public storeService: StoreService,
    private userService: UserService,
    private shareService: ShareService,
    private skillsService: SkillsService
  ) {}

  ngOnInit(): void {
    // get all users
    this.get_users();
    //get all skills
    this.get_skills();
   
  }

  // get all users
  get_users(): void {
    this.userService.get_users().subscribe((server_users: Array<User>) => {
      this.storeService.set_users(server_users);
      this.users = server_users;
      this.users_filtered = this.users;


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

  // get all skills from databasae
  get_skills(): void {
    this.skillsService.get_skills(this.skills).subscribe((data: Skill[]) => {
      this.skills = data;
    });
  }

  //selected skill
  onOptionsSelectedSkills(e) {
    this.skillName = e.target.value;
    this.filterData();
  }

  //selected location
  onOptionsSelectedLocation(e) {
    this.locationName = e.target.value;
    this.filterData();
  }

  //check if skill exists
  checkIfSkillExist(user: User, skillName: string): User {
    const skills = user.skills;
    for (let i = 0; i < skills.length; i++) {
      if (skills[i].name == skillName) {
        return user;
      }
    }
    return null;
  }

  // // filter by skill and city
  filterData() {
    this.users_skills = this.users.reverse();

    if (this.skillName == "All" && this.locationName == "All") {
      return;
    }

    if (this.skillName !== "All" && this.locationName == "All") {
      let temp: Array<User> = [];

      for (let i = 0; i < this.users.length; i++) {
        if (this.checkIfSkillExist(this.users[i], this.skillName)) {
          temp.reverse().push(this.checkIfSkillExist(this.users[i], this.skillName));
        }
      }
      this.users_skills = temp.reverse();
      return;
    }

    if (this.skillName == "All" && this.locationName !== "All") {
      this.users_skills = this.users.reverse().filter(
        (user) => user.location == this.locationName
      );
      return;
    }

    if (this.skillName !== "All" && this.locationName !== "All") {
      let temp: any = [];

      for (let i = 0; i < this.users.length; i++) {
        if (this.checkIfSkillExist(this.users[i], this.skillName)) {
          temp.reverse().push(this.checkIfSkillExist(this.users[i], this.skillName));
        }
      }

      this.users_skills = temp.reverse().filter(
        (user) => user.location == this.locationName
      );
      return;
    }

  }


}
