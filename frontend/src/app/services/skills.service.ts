import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skills';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  SERVER_URL = environment.SERVER_URL;
  
  constructor(private http:HttpClient) { 
    
       this.skills(this.skills);
   }



   public skills(skills)
   {
 
    this.http.post(`${this.SERVER_URL}/skills/default_skills`, skills);
   }
  //get all skills
  public get_skills(skill): Observable<any> {
    return this.http.get<Skill>(`${this.SERVER_URL}/skills/get_all_skills`, skill);
 }

}
