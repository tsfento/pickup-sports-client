import { Component, OnInit } from '@angular/core';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../shared/models/event';
import { EventComponent } from '../../shared/components/events/event/event.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [EventComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  current_page: number = 1;
  total_pages: number = 0;
  events: Event[] = [];

  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params['page'] ? Number(params['page']) : 1;
      this.loadEvents(page);
    })
  }

  loadEvents(page: number) {
    this.eventService.getEvents(page).subscribe({
      next: (response: any) => {
        this.events = response.events;
        this.current_page = response.current_page;
        this.total_pages = response.total_pages;
        // console.log(this.events, this.current_page, this.total_pages)
      },
      error: (error: any) => {
        console.error('Error fetching events', error)
      }
    })
  }

  nextPage() {
    if (this.current_page < this.total_pages) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.current_page + 1},
        queryParamsHandling: 'merge'
      });
    }
  }

  previousPage() {
    if (this.current_page > 1) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.current_page - 1},
        queryParamsHandling: 'merge'
      });
    }
  }
}
