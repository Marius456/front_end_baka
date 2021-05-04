import { Component, ViewChild } from '@angular/core';  
import { FullCalendarComponent } from '@fullcalendar/angular';  
import { EventInput } from '@fullcalendar/core';  
import dayGridPlugin from '@fullcalendar/daygrid';  
import { ExerciseService } from '../../services/exercise.service';
import { Exercise, Event } from '../../entities/exercise';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {

  @ViewChild('calendar',null) calendarComponent: FullCalendarComponent;
  options: any;  
  eventsModel: any[] = [];  
  calendarVisible = true;  
  calendarWeekends = true;  
  calendarEvents: EventInput[] = [  
    { title: 'Event Now', start: new Date() }  
  ];  
  allExercise:Exercise[];   

  
  constructor(
    private ExerciseService:ExerciseService
    ) {
      this.GetPlan();
    } 
  
  toggleVisible() {  
    this.calendarVisible = !this.calendarVisible;  
  }  
  ngOnInit() {  
    this.options = {  
      editable: false,  
      disableDragging: false,  
      selectable: true,  
      theme: 'standart',  
      header: {  
        right: 'prev,next, today',  
        left: '',  
      },  
      validRange: {  
        start: '2021-04-01',  
        end: '2021-05-01'  
      },  
      plugins: [dayGridPlugin]  
    };   
   
    this.calendarEvents = [
        {  
          title: 'Running 2,5 km',  
          start: '2021-04-25',  
          end:   '2021-04-25'  
        },
        {  
          title: 'Push-ups 50',  
          start: '2021-04-25',  
          end:   '2021-04-25'  
        },
        {  
          title: 'Running 3 km',  
          start: '2021-04-27',  
          end:   '2021-04-27'  
        },
        {  
          title: 'Running 3,5 km',  
          start: '2021-04-29',  
          end:   '2021-04-29'  
        },
        {  
          title: 'Running 4 km',  
          start: '2021-05-01',  
          end:   '2021-05-01'  
        },
      ];  
  }  
  eventClick(model) {  
  }  
  dateClick(model) {  
  }  
  eventDragStop(model) {  
  }    
  handleDateClick(arg) {  
    if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {  
      this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array  
        title: 'New Event',  
        start: arg.date,  
        allDay: arg.allDay  
      })  
    }  
  }  

  
  GetPlan()    
  {       
    this.ExerciseService.getPlanExercises(sessionStorage.getItem("plan")).pipe(first()).subscribe(allExercise => this.allExercise = allExercise); 
    // console.log(this.allExercise);
    // this.calendarEvents = this.allExercise.map(item => new Event(item))
  } 
}
