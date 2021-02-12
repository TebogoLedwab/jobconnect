import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) {}

  success (body: string, head: string = '') {
    this.toastr.success(body, head);

  }

  error (body: string, head: string = '') {
    this.toastr.error(body, head);;
  }

  info (body: string, head: string = '') {
    this.toastr.info(body, head);;
  }

}
