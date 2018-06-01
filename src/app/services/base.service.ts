import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class BaseService {

	constructor(public httpClient: HttpClient,
				private authS: AuthService) { }

	/*urlAPI = 'http://localhost:5000/api';	*/	//teste local

	urlAPI = 'http://45.55.248.8:4174/api';

	changeToken(response: Observable<any>) {
		response.filter((res: any, index: number) => {
		  if (res.token != null) {
			this.authS.token = res.token;
		  }
	
		  return true;
		});
	  }

	GetAll(url: any): Observable<any> {
		var response = this.httpClient.get<any>(`${this.urlAPI}/${url}`);

		this.changeToken(response);

		return response;
	}

	GetById(url: any, id: any): Observable<any> {
		var response = this.httpClient.get<any[]>(`${this.urlAPI}/${url}/${id}`);

		this.changeToken(response);

		return response;
	}

	Post(url: any, data: any): Observable<any> {
		var response = this.httpClient.post<any>(`${this.urlAPI}/${url}`, data);

		this.changeToken(response);

		return response;
	}

	Put(url: any, data: any, id: any) {
		var response = this.httpClient.put<any>(`${this.urlAPI}/${url}/${id}`, data);

		this.changeToken(response);

		return response;
	}

	Delete(url: any, id: any) {
		var response = this.httpClient.delete<any>(`${this.urlAPI}/${url}/${id}`);

		this.changeToken(response);

		return response;
	}

}
