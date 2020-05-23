import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
	public post:Post;
  public identity;
  public token;

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _postService: PostService,
    private _userService: UserService

    ) 
  { 
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
  	this.getPost();
  }

  getPost(){
   this._route.params.subscribe(
   	params => {
   		let id = +params['id'];
   		console.log(id);

   		this._postService.getPost(id).subscribe(
   			response => {
   				if(response.status == 'success'){
   					this.post = response.posts;
   					console.log(this.post);
   				}else{
   					this._router.navigate(['/inicio']);
   				}

   			},
   			error => {
   				this._router.navigate(['/inicio']);
   				console.log(error);
   			}

   		);
   	}
   	);
   
   //peticion ajax para sacar los datos

  }


}
