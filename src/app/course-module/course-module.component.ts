import { Component, OnInit } from '@angular/core';
import { AdminCourseServiceService } from '../service/admin-course-service.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-course-module',
  templateUrl: './course-module.component.html',
  styleUrls: ['./course-module.component.css'],
})
export class CourseModuleComponent implements OnInit {
  filteredData: any[] = [];
  module_data: any;
  searchText: string = '';
  myClass1 = 'dropdown-menu';
  myClass = 'dropdown-menu';
  selectedItems_course: string = '';
  selectedItem: string = '';
  module_name: string = '';
  selectedDifficulty: string = '';
  course_Data: any;
  submit = false;
  selectedValue: any;
  cities!: City[];
  selectedCity!: City;

  constructor(private service: AdminCourseServiceService) {}

  ngOnInit(): void {
    this.getDataFromAPI();
    this.getCourseDataFromAPI();
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
  ];
  }

  just_clicked_course() {
    if (this.myClass1 === 'dropdown-menu') {
      this.myClass1 = 'dropdown-menu show';
    } else {
      this.myClass1 = 'dropdown-menu';
    }
  }

  hide_class_course = 'dropdown-item';

  hide_click_course() {
    if (this.hide_class_course === 'dropdown-item') {
      this.myClass1 = 'dropdown-menu';
    } else {
      this.myClass1 = 'dropdown-item';
    }
  }

  selectItem_course(items: string) {
    this.selectedItems_course = items;
  }

  just_clicked() {
    if (this.myClass === 'dropdown-menu') {
      this.myClass = 'dropdown-menu show';
    } else {
      this.myClass = 'dropdown-menu';
    }
  }

  hide_class = 'dropdown-item';

  hide_click() {
    if (this.hide_class === 'dropdown-item') {
      this.myClass = 'dropdown-menu';
    } else {
      this.myClass = 'dropdown-item';
    }
  }

  hide_clicks(item: string) {
    this.selectedItem = item;
  }

  onSubmit() {
    const ModuleData = {
      course_name: this.selectedItems_course,
      module_name: this.module_name,
      level: this.selectedItem,
    };

    this.service.addModule(ModuleData).subscribe((response) => {
      console.log(response);
    });
  }

  getDataFromAPI() {
    this.service.getModuleData().subscribe(
      (response: any) => {
        this.module_data = response.data;
        this.filterData();
        console.log(this.module_data, 'Course module Data');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  getCourseDataFromAPI() {
    this.service.getData().subscribe(
      (response: any) => {
        this.course_Data = response.data;
        this.filterData();
        console.log(this.course_Data, 'Course Data');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  filterData() {
    this.filteredData = this.module_data.filter(
      (course: { course_code: string; module_name: string; course_name: string; }) =>
        course.course_code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        course.module_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        course.course_name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  search() {
    this.filterData();
  }

  openModal(i: any) {
    this.selectedValue = this.module_data[i];
  }

  //update
  onSaveChanges(): void {
    this.service.updateCourseModule(this.selectedValue).subscribe((course: any) => {
      console.log(`Updated course with ID ${course.c_name}`);
    });
    // location.reload();
  }

  pageReload(){
    location.reload();
  }
}
