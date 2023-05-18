import { Component, OnInit } from '@angular/core';
import { AdminCourseServiceService } from '../service/admin-course-service.service';

@Component({
  selector: 'app-admin-course',
  templateUrl: './admin-course.component.html',
  styleUrls: ['./admin-course.component.css'],
})
export class AdminCourseContentComponent implements OnInit {
  searchText: string = '';
  AllData: any[] = [];
  filteredData: any[] = [];
  submit = false;
  new_course_name: string = '';
  new_course_code: string = '';
  course_Data: any[] = [];
  all_data: any[] = [];
  count_Data: any[] = [];
  selectedValue: any;

  constructor(private service: AdminCourseServiceService) {
    this.count_Data = [];
  }

  ngOnInit(): void {
    this.getCourseDataFromAPI();
    this.getCountDataFromAPI();
  }

  onSubmit_Course() {
    const course_create = {
      course_name: this.new_course_name,
      course_code: this.new_course_code,
    };
    this.service.addNewCourse(course_create).subscribe((response) => {
      console.log(response, 'creating new course');
    });
  }

  getCourseDataFromAPI() {
    this.service.getData().subscribe(
      (response: any) => {
        this.course_Data = response.data;
        this.filterData();
        console.log(this.all_data, 'Course Data');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  getCountDataFromAPI() {
    this.service.getCount().subscribe(
      (response: any) => {
        this.count_Data = response.data;
        console.log(this.count_Data, 'count Data');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  filterData() {
    this.filteredData = this.course_Data.filter(
      (course) =>
        course.course_code
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        course.course_id
          .toString()
          .toLowerCase()
          .includes(this.searchText.toLowerCase()) ||
        course.course_name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  search() {
    this.filterData();
  }

  openModal(i: any) {
    this.selectedValue = this.course_Data[i];
  }

  //update
  onSaveChanges(): void {
    this.service.updateCourse(this.selectedValue).subscribe((course: any) => {
      console.log(`Updated course with ID ${course.c_name}`);
    });
    location.reload();
  }

  pageReload() {
    location.reload();
  }
}