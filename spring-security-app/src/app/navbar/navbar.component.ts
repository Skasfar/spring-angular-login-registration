import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { ToastService } from '../toast.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() condition!: boolean;
  isDropdownOpen = true;
  constructor(private toastService: ToastService,private el: ElementRef, private renderer: Renderer2) {
    if (localStorage.getItem("JWT") !== "" && localStorage.getItem("JWT") !== null) {
      this.condition = true;
    } else {
      this.condition = false;
    }
  }

  showMessage() {
    this.toastService.addMessage('This is a notification message.');  }


    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }


    ngAfterViewInit() {
      // Initialize Bootstrap dropdown
      const element = this.el.nativeElement.querySelector('.dropdown-toggle');
      if (element) {
        this.renderer.listen(element, 'click', () => {
          this.renderer.addClass(this.el.nativeElement.querySelector('.dropdown'), 'show');
        });
      }
    }
}
