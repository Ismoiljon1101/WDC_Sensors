import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  isSidebarExpanded = true;

    toggleSidebar() {
        this.isSidebarExpanded = !this.isSidebarExpanded;
    }

    navigateTo(page: string) {
        // Implement your navigation logic here
        console.log(`Navigating to ${page}`);
    }
}
