import {Component,OnInit,ViewEncapsulation,TemplateRef,ViewChild,ElementRef, Inject} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService } from "src/app/services/alert.service";
import { ShareService } from "src/app/services/share.service";
import { StoreService } from "src/app/services/store.service";
import { UserService } from "src/app/services/user.service";
import { HttpClient, HttpEventType } from "@angular/common/http";
import { TaggingEventArgs } from "@syncfusion/ej2-angular-dropdowns";
import { Skill } from "src/app/models/skills";
import { SkillsService } from "src/app/services/skills.service";
import { City } from "src/app/location";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { environment } from "src/environments/environment";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: "Editpage",
  templateUrl: "./editpage.component.html",
  styleUrls: ["./editpage.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class EditpageComponent implements OnInit {
  SERVER_URL = environment.SERVER_URL;
  user: any;
  updateForm: FormGroup;
  users = [];
  selectedFile: File;
  userVideo: File;

  number:number;

  modalRef: BsModalRef;
  @ViewChild("signin") signin: ElementRef;

  //user skills
  user_skills:any;
//variable used to display users current skills
 my_skills: Skill[] = [];
 //skills from database
  skills: Skill[] = [];
// skills selected by users on dropdown
  public selected_skills: Skill[] = [];

  id: any;
  locations = City;

  constructor(
    private userService: UserService,
    public alert: AlertService,
    private router: Router,
    private http: HttpClient,
    public shareService: ShareService,
    public storeService: StoreService,
    private fb: FormBuilder,
    private skillsService: SkillsService,
    private modalService: BsModalService,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.getUsers();

    this.updateForm = this.fb.group({
      name: ["", Validators.required],
      surname: ["", Validators.required],
      email: ["", Validators.required],
      skills: ["", [Validators.required]],
      age: ["", Validators.required],
      location: ["", Validators.required],
      phoneNumber: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    // console.log(this.userVideo);
    // console.log(this.storeService.get_user.video);
    // console.log(this.storeService.get_user);
    this.user = this.storeService.get_user;

    // get all skills from databasae
    this.get_skills();

    this.selected_skills = this.user.skills;
    
    this.set_default();

   this.update_ui_skills(this.user);

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.openModal(this.signin);
    }, 2000);
  }

  set_default() {
    let user_info = {
      name: this.user.name,
      surname: this.user.surname,
      email: this.user.email,
      location: this.user.location,
      phoneNumber: this.user.phoneNumber,
      age: this.user.age,
    skills: this.user.skills,
    
    };
    this.updateForm.patchValue(user_info);
    this.update_ui_skills(this.user)
  }

  //update users profile
  update_users() {
    let updated_data = this.updateForm.value;
  //  console.log(updated_data);
    this.id = this.storeService.get_user._id;
  
    this.userService
      .update_users(this.id, updated_data)
      .subscribe((data: any) => {
        // set user in the storeservice
        this.storeService.set_user(data.users);
        localStorage.setItem("user", JSON.stringify(data.users));

       this.update_ui_skills(data.users);


        if (data.message == "Profile successfully updated!") {
          this.alert.success(data.message);
        }
      });
  }

  back = (_) => window.history.back();

  // get all skills from databasae
  get_skills(): void {
    this.skillsService.get_skills(this.skills).subscribe((data: Skill[]) => {
      this.skills = data;
  
    });

  }
  //display users skills on chips menu
  update_ui_skills(user: any) {
    this.skills = [];
  
    user.skills.forEach((skill) => {
      this.skills.push(skill.name);
      this.my_skills = this.skills;
  
      this.storeService.set_user(this.user);
      this.skills = this.my_skills;
    });
    console.log(this.my_skills)
  }

  // map the appropriate columns to fields property
  // public fields: object = { text: "name", value: "_id" };
  public fields: { [key: string]: string } = { text: "name", value: "_id" };
  // set the type of mode for how to visualized the selected items in input element.
  public box: string = "Box";

  // bind the tagging event
  users_selected_skills = (e: TaggingEventArgs) => {
    this.user_skills = e.itemData;
    this.selected_skills.push(this.user_skills);

    // console.log(">>> selected skills");
    // console.log(this.selected_skills);
  };

 //File Upload
 onFileChanged(event) {
//  console.log(event);
  this.selectedFile = event.target.files[0];
  this.userVideo = event.target.files[0];
  
}
// upload user image
onUpload() {
  this.id = this.storeService.get_user._id;

  const uploadData = new FormData();
  uploadData.append("image", this.selectedFile);

  this.http
    .patch("http://localhost:3500/users/update_image/" + this.id, uploadData)
    .subscribe((data:any) => {
     console.log(data.users);
      // set user in the storeservice
      this.storeService.set_user(data.users);
      localStorage.setItem("user", JSON.stringify(data.users));
      this.user = data.users;

     this.update_ui_skills(data.users);

     //upload alert
     if (data.message == "Image successfully uploaded!") {
      this.alert.success(data.message);
     }
    });
}

  //upload users video event
  // onVideoChange(event) {
  //   console.log(event);
   
  // }

  //user video upload
  videoUpload() {
    this.id = this.storeService.get_user._id;

    const uploadVid = new FormData();
    uploadVid.append("video", this.userVideo);

    this.http
      .patch(`${this.SERVER_URL}/users/update_video/${this.id}`, uploadVid)
      .subscribe((video: any) => {
        console.log(video.users);
        //set user in store servuce
        this.storeService.set_user(video.users);
        localStorage.setItem("user", JSON.stringify(video.users));
        this.user = video.users;

        this.update_ui_skills(video.users);
        this.refresh();


        if (video.message == "Video successfully updated!") {
          this.alert.success(video.message);
        }
      });
  }

  refresh() {
    window.location.reload();
  }

  //get all users
  getUsers() {
    this.http
      .get("http://localhost:3500/users/get_all_users")
      .subscribe((data: any) => {
        this.users = data.users;
      });
  }

  //get users image
  getImage(image): string {
    return "http://localhost:3500/uploads/" + image;
  }

  //get users video from backend
  getVideo(video): string {
    return `${this.SERVER_URL}/uploads/` + video;
  }
//  guideline modal
  openModal(template) {
    this.modalRef = this.modalService.show(template);
 
  }


}
