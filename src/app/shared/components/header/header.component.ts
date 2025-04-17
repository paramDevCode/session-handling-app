import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = 'Product Management App';
  @Input() showSearch: boolean = false;
  @Output() search = new EventEmitter<string>();
  @Output() add = new EventEmitter<void>();

  searchQuery = '';

  onSearchInput() {
    this.search.emit(this.searchQuery);
  }

  onAddClick() {
    this.add.emit();
  }
}
