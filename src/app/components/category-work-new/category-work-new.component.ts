import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryWorkService } from '../../services/category-work.service';
import { CategoryWork } from '../../models/category-work';

@Component({
  selector: 'app-category-work-new',
  templateUrl: './category-work-new.component.html',
  styleUrls: ['./category-work-new.component.css'],
  providers: [UserService, CategoryWorkService]
})
export class CategoryWorkNewComponent implements OnInit {
  public page_title: string;
	public identity;
	public token;
	public status: string;
  public category: CategoryWork;
  
  constructor(
      private _route: ActivatedRoute,
	  	private _router: Router,
	  	private _userService: UserService,
	  	private _categoryService:CategoryWorkService	
      ) { 
        this.page_title = "Crear nueva categoria de trabajo"; 
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.category = new CategoryWork(1, '');
      }

  ngOnInit() {
  }

  onSubmit(form){
  	this._categoryService.create(this.token,this.category).subscribe(
        response => {
        	if (response.status = 'success') {
            this.category = response.category;
        		this.status = 'success';

        		this._router.navigate(['/cv']);
        	}
        	else{
        		this.status = 'error';
        	}

        },
        error => {
        	this.status = 'error';
        	console.log(<any>error);
        }
    );
  }

}
