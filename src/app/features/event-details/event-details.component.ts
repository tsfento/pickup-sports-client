import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.service';
import { Event } from '../../shared/models/event';
import { DatePipe } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { User } from '../../shared/models/user';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit {
  event:Event = new Event({});
  currentUser:User | null = null;
  hasJoined:boolean = false;
  guests:any = [];

  constructor(private route:ActivatedRoute, private eventService:EventService, private userService:UserService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventService.getEvent(params['id']).subscribe({
        next: (response:any) => {
          this.event = response;
          this.hasJoined = response.has_joined;
          this.prepareGuests();
        },
        error: (error:any) => {
          console.log(error);
        }
      })
    });

    this.userService.currentUserBehaviorSubject.subscribe(() => {
      this.currentUser = this.userService.currentUserBehaviorSubject.value;
    })
  }

  toggleJoinEvent() {
    const eventJoin = this.hasJoined ? this.eventService.leaveEvent(this.event.id) : this.eventService.joinEvent(this.event.id);

    return eventJoin.subscribe({
      next: () => {
        this.hasJoined = !this.hasJoined;

        if (this.currentUser) {
          if (this.hasJoined) {
            this.event.participants.push(this.currentUser);
          } else {
            this.event.participants = this.event.participants.filter((p) => p.id !== this.currentUser?.id);
          }
          this.prepareGuests();
        }
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }

  prepareGuests() {
    this.guests = [...this.event.participants]

    const emptySlots = this.event.guests - this.event.participants.length;

    for(let i = 0; i < emptySlots; i++) {
      this.guests.push({empty: true});
    }
  }

  trackById(index:number, item:any) {
    return item.id || index;
  }
}
