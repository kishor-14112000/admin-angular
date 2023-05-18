import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCourseContentComponent } from './admin-course/admin-course.component';
import { AdminCourseComponent } from './admin-course-contents/admin-course-contents.component';
import { QuizComponent } from './quiz/quiz.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CourseModuleComponent } from './course-module/course-module.component';

const routes: Routes = [

  {path: 'course-content', component: AdminCourseComponent},
  
  {path: '', component: AdminCourseComponent},
  
  {path: 'sidebar', component: SidenavComponent},

  {path: 'admin-course', component: AdminCourseContentComponent},

  {path: 'quiz', component: QuizComponent},

  {path: 'course-module', component: CourseModuleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
