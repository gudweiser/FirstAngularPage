import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {StudentEditComponent} from './student-edit/student-edit.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {path: 'students', component: StudentsComponent},
  {path: 'edit/:id', component: StudentEditComponent},
  {path: '**', redirectTo: '/404', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
