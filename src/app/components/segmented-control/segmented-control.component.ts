import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SegmentedControlConfig } from '../../interfaces/ui-config/segmented-control-config.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.scss'
})
export class SegmentedControlComponent {
  @Input() config: SegmentedControlConfig[]=[];
  @Output() segmentSelected = new EventEmitter<string>()

  selectItem(item:SegmentedControlConfig){
    this.config.map((i:SegmentedControlConfig)=>{
      i.active = item.name === i.name;
    });
    this.segmentSelected.emit(item.name);

  }
}
