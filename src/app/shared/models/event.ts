import { Sport } from "./sport";
import { User } from "./user";

export class Event {
  id: number;
  title: string;
  content: string;
  start_date_time: string;
  end_date_time: string;
  created_at: string;
  guests: number;
  has_joined: boolean;
  participants: User[];
  cover_image_url:string;
  sports: Sport[];
  creator: User;

  constructor(event: any) {
    this.id = event.id || 0;
    this.title = event.title || '';
    this.content = event.content || '';
    this.start_date_time = event.start_date_time;
    this.end_date_time = event.end_date_time;
    this.created_at = event.created_at;
    this.guests = event.guests || 0;
    this.has_joined = event.has_joined || false;
    this.cover_image_url = event.cover_image_url || '';
    this.sports = event.sports;
    this.creator = event.creator || new User({});
    this.participants = event.participants || [];
  }
}
