import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
 
@Component({
  selector: 'dialogbox',
  templateUrl: 'dialogbox.component.html'
})
export class DemoModalServiceStaticComponent {
  //modalRef: BsModalRef;
  //constructor(private modalService: BsModalService) {}
 
  //openModal(template: TemplateRef<any>) {this.modalRef = this.modalService.show(template);}
}