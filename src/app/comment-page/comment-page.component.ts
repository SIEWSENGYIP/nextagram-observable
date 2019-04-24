import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Users, UserProfiles, ImageLikeCount, ImageComments } from '../users'
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})
export class CommentPageComponent implements OnInit {

  @Input() userId = null
  @Input() imageId = null

  comments  = new FormGroup({
    userId :  new FormControl(""),
    imageId : new FormControl(""),
    author : new FormControl("You"),
    comment : new FormControl("")
  })

  constructor(private userService : UserService,
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    debugger

    this.comments.controls["userId"].setValue(this.userId)
    this.comments.controls["imageId"].setValue(this.imageId)

  }

  onSubmit() {
    this.userService.setImageComments(this.comments.value)
  }

}
