import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Student} from '../interfaces/student.interface';
import {StudentService} from '../services/student.service';




@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService: StudentService) {
  }

  @ViewChild('name')
  nameInput: ElementRef;
  @ViewChild('email')
  emailInput: ElementRef;
  @Input()
  defaultName = 'Dominik';

  @Output()
  onStudentAdded = new EventEmitter<Student>();

  invalidName = false;
  emailIsBlank = false;
  invalidEmail = false;

  ngOnInit(): void {
  }

  add(name: string, email: string): void {
    // Usunięcie białych znaków z danych
    name = name.trim();
    email = email.trim();

    // Zaprzestanie wykonywania, kiedy pola są puste
    this.invalidName = !name;
    this.emailIsBlank = !email;
    // Zaprzestanie wykonywania, kiedy adres e-mail nie zawiera "@"
    this.invalidEmail = email.indexOf('@') < 1;

    if (this.invalidEmail || this.emailIsBlank || this.invalidName) {
      return;
    }

    this.invalidEmail = false;
    this.invalidName = false;
    this.emailIsBlank = false;


    // Przesłanie danych do serwera i zaktualizowanie lokalnej tablicy
    this.studentService.addStudent({name, email} as Student)
      .subscribe((student: Student) => {
        this.onStudentAdded.emit(student);
        this.nameInput.nativeElement.value = '';
        this.emailInput.nativeElement.value = '';
      });

  }
}
