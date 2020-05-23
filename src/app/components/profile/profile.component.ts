import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { PostService } from '../../services/post.service';
import { global } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [PostService, UserService]
})
export class ProfileComponent implements OnInit {
	public url;
	public user:User;
	public posts: Array<Post>;
	public identity;
	public token;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _postService: PostService,
    private _userService: UserService
  	) { 
      this.url = global.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();
      this.user = new User(1,'','','','','','','ROLE_USER');
    }

  ngOnInit() {
  	this.getProfile();	
  }

  getUser(userId){
  	this._userService.getPostByUser(userId).subscribe(
  		response => {
  			if (response.status == 'success') {
  				this.user = response.user;
  				console.log(this.user);
  			}

  		},
  		error => {
  			console.log(error);

  		});
  }

  getProfile(){
  this._route.params.subscribe(
   	params => {
	   	let userId = +params['id'];
	  	this.getUser(userId);
	  	this.getPosts(userId);
  	});
  }

  getPosts(id){
  	this._userService.getPostsByUser(id).subscribe(
  		response => {
  			if (response.status == 'success') {
  				this.posts = response.posts;
  				console.log(this.posts);
  			}

  		},
  		error => {
  			console.log(error);

  		});

  }
  deletePost(id){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }
      );
  }


}
