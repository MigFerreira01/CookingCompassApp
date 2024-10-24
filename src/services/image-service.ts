import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadApiResponse {
    public_id: string;
    url: string;
    secure_url: string;
    [key: string]: any; 
  }

  @Injectable({
    providedIn: 'root',
  })
  export class CloudinaryService {
    private readonly cloudName: string = 'didwtxflj';
    private readonly uploadPreset: string = 'upload_image';
    constructor(private http: HttpClient) {}
  
    uploadImage(file: File): Observable<UploadApiResponse> {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', this.uploadPreset);
  
      return this.http.post<UploadApiResponse>(
        `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`,
        formData
      );
    }
  }