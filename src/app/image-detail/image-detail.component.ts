import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Users, UserProfiles, ImageLikeCount, ImageComments } from '../users'
import {ActivatedRoute, Router} from "@angular/router"

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.css']
})
export class ImageDetailComponent implements OnInit {

  userId = null
  imageId = null
  imgs = null
  likeCount : ImageLikeCount[] = []
  likeCountById : ImageLikeCount[] = []
  imageComments : ImageComments[] = []
  imageCommentsById : ImageComments[] = []


  constructor(private userService : UserService,
    private router : Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    
    this.userId = this.route.snapshot.params.userId
    this.imageId = this.route.snapshot.params.imageId

    this.userService
        .getImages(this.userId)
        .subscribe(response => {
          this.imgs = response
        })

    this.userService
    .getImageLikeCount().subscribe (response => {
      this.likeCount = response
    })

    this.userService
    .getImageComments().subscribe (response => {
      this.imageComments = response
    })

    this.getLikeCount()
    this.getComment()
  }

  showImage() {
    return this.imgs[this.imageId]
  }

  getLikeCount() {

    if (this.likeCount.length > 0) {
      for(let i = 0; i < this.likeCount.length; i++) {
        if(this.likeCount[i].userId === this.userId && this.likeCount[i].imageId === this.imageId){
          this.likeCountById.push(this.likeCount[i])
        }
      }
    }

    return this.likeCountById
  }

  getComment() {
    debugger
    if (this.imageComments.length > 0) {
      for(let i = 0; i < this.imageComments.length; i++) {
        if(this.imageComments[i].userId === this.userId && this.imageComments[i].imageId === this.imageId){
          this.imageCommentsById.push(this.imageComments[i])
        }
      }
    }
  }
}
