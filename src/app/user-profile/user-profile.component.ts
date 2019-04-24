import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Users, UserProfiles } from '../users'
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId = null
  userName = null
  profiles : UserProfiles[] = []
  profileById : UserProfiles[] = []

  profile  = new FormGroup({
    id :  new FormControl(""),
    name : new FormControl(""),
    description : new FormControl(""),
    blogLink : new FormControl(""),
    facebookLink : new FormControl(""),
    email : new FormControl("")
  })
  constructor(private userService : UserService,
              private router : Router,
              private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.userService.getProfile().subscribe(profile => {
      this.profiles = profile
    })

    this.userId = this.route.snapshot.params.userId
    this.userName = this.route.snapshot.params.userName

    this.displayProfile()
    
    this.profile.controls["id"].setValue(this.userId)
    this.profile.controls["name"].setValue(this.userName)

    if (this.profileById.length>0) {
      this.profile.controls["description"].setValue(this.profileById[0].description)
      this.profile.controls["blogLink"].setValue(this.profileById[0].blogLink)
      this.profile.controls["facebookLink"].setValue(this.profileById[0].facebookLink)
      this.profile.controls["email"].setValue(this.profileById[0].email)
    }
   
  }

  displayProfile() {
    if (this.profiles.length > 0) {
      for(let i = 0; i < this.profiles.length; i++) {
        if(this.profiles[i].id === this.userId){
          this.profileById.push(this.profiles[i])
        }
      }
    }
  }

  onSubmit() {

      this.userService.updateProfile(this.profile.value)
      //let url = '/user/' + this.profile.get("id").value + '/' + this.profile.get("name").value
      let url = '/user/' + this.userId + '/' + this.userName
      this.router.navigate([url])
    
  }

}
