import { MzModalComponent } from 'ng2-materialize';
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

  @ViewChild('modaldelete') modalDelete: MzModalComponent;
  @Output() deleteEmitter = new EventEmitter<any>();
  
  private id;

  constructor() { }

  ngOnInit() {
  }

  open(id) {
    this.id = id;    
    this.modalDelete.open();
  }

  delete() {
    this.deleteEmitter.emit(this.id);
  }

}
