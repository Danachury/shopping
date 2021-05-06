import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.sass']
})
export class DialogAlertComponent {

  @Input() message: string
  @Input() color = 'primary'

  @Output() closed = new EventEmitter<void>()

  onClose(): void {
    this.closed.emit()
  }
}
