import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable()
export class FileUploadService {

    urlApi: string = "FileUpload";

    constructor(private baseS: BaseService) {

    }

    uploadFile(data: any) {
        return this.baseS.Post(this.urlApi + "/upload", data).toPromise();
    }

    removeFile(name: string) {
        return this.baseS.Delete(this.urlApi, name).toPromise();
    }
}