import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component'
import { UserDetailComponent } from './user-detail/user-detail.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { ImageDetailComponent } from './image-detail/image-detail.component'

const routes: Routes = [
  { path: 'user-profile/:userId/:userName', component: UserProfileComponent },
  { path: 'user/:userId/:userName', component: UserDetailComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'image-detail/:userId/:imageId', component: ImageDetailComponent },
  { path: '', component: UserListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
