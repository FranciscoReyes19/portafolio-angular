import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryWork} from '../models/category-work';
import {global} from './global';

@Injectable()
export class CategoryWorkService {
	public url:string;
	
	constructor(
		private _http:HttpClient
		){
		this.url = global.url;
    }
    create(token,category):Observable<any>{
    	let json = JSON.stringify(category);
    	let params = "json="+json;
        console.log(params);
    	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded')
    	                               .set('Authorization', token);
    
    return this._http.post(this.url + 'categories-work', params, {headers: headers});

    }
    /*
    getCategories():Observable<any>{
    	let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    	
    	return this._http.get(this.url + 'category', {headers: headers});

    }
    getCategory(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'category/'+id, {headers: headers});

    }

    getPosts(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        
        return this._http.get(this.url + 'post/category/'+id, {headers: headers});

    }
    */

}