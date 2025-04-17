import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
   }
}
