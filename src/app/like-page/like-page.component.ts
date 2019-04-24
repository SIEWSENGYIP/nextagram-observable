import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Users, UserProfiles, ImageLikeCount, ImageComments } from '../users'
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-like-page',
  templateUrl: './like-page.component.html',
  styleUrls: ['./like-page.component.css']
})
export class LikePageComponent implements OnInit {
  @Input() userId = null
  @Input() imageId = null

  likes  = new FormGroup({
    userId :  new FormControl(""),
    imageId : new FormControl("")
  })

  constructor(private userService : UserService,
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.likes.controls["userId"].setValue(this.userId)
    this.likes.controls["imageId"].setValue(this.imageId)
  }

  onSubmit() {
    this.userService.setImageLikeCount(this.likes.value)
  }

}
