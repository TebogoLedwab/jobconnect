import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'uploadguide',
  templateUrl: './uploadguide.component.html',
  styleUrls: ['./uploadguide.component.scss']
})
export class UploadguideComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  close_modal() {
    this.modalService.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.close_modal();

    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 200);
  }

}
