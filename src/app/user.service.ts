import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { Users, UserProfiles, ImageComments, ImageLikeCount } from './users'

const baseUrl = 'https://insta.nextacademy.com/api/v1/'
const usersUrl = baseUrl + 'users'
const userUrl = baseUrl + 'images?userId='

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = new BehaviorSubject<Users[]>([])
  private imgs = new BehaviorSubject<string[]>([])
  private userProfiles = new BehaviorSubject<UserProfiles[]>([])
  private imageComments = new BehaviorSubject<ImageComments[]>([])
  private imageLikeCount = new BehaviorSubject<ImageLikeCount[]>([])

  constructor(private http: HttpClient) {
    this.http.get(usersUrl).subscribe((users: Users[])=>
    this.users.next(users))
   }

  getUsers() {
    return this.users
  }

  getImages(userId) {
    return this.http.get(userUrl + `${userId}`)
  }

  getProfile(){
    return this.userProfiles
  }

  updateProfile(updatedProfile) {
    let tempProfile : UserProfiles[] = this.userProfiles.getValue()

    for (let i=0; i<tempProfile.length; i++) {
      if(tempProfile[i].id === updatedProfile.id) {
        tempProfile.splice(i, 1)
      }
    }
    tempProfile.push(updatedProfile)
    this.userProfiles.next(tempProfile)
  }

  getImageLikeCount() {
    return this.imageLikeCount
  }

  setImageLikeCount(like) {
    let count = 0
    let tempLike : ImageLikeCount[] = this.imageLikeCount.getValue()

    for (let i=0; i<tempLike.length; i++) {
      if(tempLike[i].userId === like.userId && tempLike[i].imageId === like.imageId) {
        count = tempLike[i].likeCount
        tempLike.splice(i, 1)
      }
    }

    //param "like" only has 2 properties which are "userId" and "imageId", 
    //how to add the 3rd property "likeCount" into "like" before push to "tempLike"?

    tempLike.push(like)
    this.imageLikeCount.next(tempLike)

  }

  getImageComments() {
    return this.imageComments
  }

  setImageComments(comment) {
    let tempComment : ImageComments[] = this.imageComments.getValue()
    tempComment.push(comment)
    this.imageComments.next(tempComment)
  }

}