import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.services';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';



@Component({
  selector: 'app-post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers:[ UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {
	public page_title: string;
	public identity;
	public token;
	public url;
  public urlAux;
	public post: Post;
	public categories;
	public status;
  public is_edit: boolean;
	public froala_options : Object = {
        charCounterCount: true,
	    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
	    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert']
	};
	public afuConfig = {
      multiple: false,
      formatsAllowed: ".jpg, .png, .gif, .jpeg",
      maxSize: "50",
      uploadAPI:  {
        url:global.url+'post/upload',
        headers: {
           "Authorization" : this._userService.getToken()
        }
      },
        theme: "attachPin",
        hideProgressBar: false,
        hideResetBtn: true,
        hideSelectBtn: false,
        attachPinText: 'Sube tu imagen/Cambiar'
      };

  constructor(
  	private _route: ActivatedRoute,
  	private _router: Router,
  	private _userService:UserService,
  	private _categoryService: CategoryService,
  	private _postService: PostService) 
  {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.urlAux = global.url;
  }

  ngOnInit() {
  	this.getCategories();
  	this.post = new Post(1, this.identity.sub, 1, '', '', null, null);
    this.getPost();
    //console.log(this.identity);
  	//console.log(this.post);
  }

  getCategories(){
  	this._categoryService.getCategories().subscribe(
  		response => {
  			if (response.status == 'success') {
  				this.categories = response.categories;
  				//console.log(this.categories);
  			}

  		},
	  		error => {
	  			console.log(error);

	  		}
  		);
  }

  ImageUpload(data){
    let image_data = JSON.parse(data.response);
    this.post.image = image_data.image;
  }
  
  onSubmit(form){
    console.log(this.post);
  	this._postService.update(this.token,this.post, this.post.id).subscribe(
  		response => {
  			if (response.status == 'success') {
  				this.status = 'success';
  				//this.post = response.post;
          //Bug; al modificar imagen si se presiona "modificar" 
          //muy pronto no se realiza la actualizacion, hasta el siguiente intento
  				this._router.navigate(['/entrada', this.post.id]);
  			}else{
  				this.status = 'error';
  			}

  		},
  		error => {
  			console.log(error);
  			this.status = 'error';
  		});
  }

  getPost(){
   this._route.params.subscribe(
     params => {
       let id = +params['id'];

       this._postService.getPost(id).subscribe(
         response => {
           if(response.status == 'success'){
             this.post = response.posts;
             if (this.post.user_id != this.identity.sub) {
               this._router.navigate(['/inicio']);  
             }
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
	