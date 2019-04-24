import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { Users, UserProfiles } from '../users'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  imgs = null
  userName = null
  userId = null
  profiles : UserProfiles[] = []
  profileById : UserProfiles[] = []

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId
    this.userName = this.route.snapshot.params.userName

    //setTimeout(() => {
      this.userService
        .getImages(this.userId)
        .subscribe(response => {
          this.imgs = response
        })

      //this.userService.getImages(this.route.snapshot.params.userId).subscribe(imgs => {
      //this.imgs = imgs

      this.userService.getProfile().subscribe(profile => {
        this.profiles = profile
    })
    
    //}, 3000)

    this.displayProfile()

    //for(let i = 0; i < this.profiles.length; i++) {
    //  if(this.profiles[i].id === this.route.snapshot.params.userId){
    //    this.profileById.push(this.profiles[i])
    //  }
    //}
   
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
    
}

