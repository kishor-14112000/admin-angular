import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminCourseServiceService } from '../service/admin-course-service.service';

@Component({
  selector: 'app-admin-course-contents',
  templateUrl: './admin-course-contents.component.html',
  styleUrls: ['./admin-course-contents.component.css'],
})
export class AdminCourseComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('myCheckbox') myCheckbox!: ElementRef;
  myClass = 'dropdown-menu';
  myClass1 = 'dropdown-menu';
  Price_class = 'dropdown-menu';
  isChecked: boolean = false;
  selectedItems: string = '';
  selectedItems_course: string = '';
  course_name: string = '';
  video_question: string = '';
  course_code: string = '';
  module_no: string = '';
  video_link: string = '';
  
  submit = false;
  http: any;
  renderer: any;
  messageService: any;
  datas: any;
  editedContent: any;
  checkedRows: { [key: string]: boolean } = {};
  selectedValue: any;
  DeletedValue: any;
  router: any;
  AllData: any[] = [];
  course_Data: any[] = [];
  module_data: any[] = [];
  filteredData: any[] = [];
  searchText: string = '';

  // end of initialization variables.

  constructor(private service: AdminCourseServiceService) {}

  ngOnInit(): void {
    this.getDataFromAPI();
    this.getModuleDataFromAPI();
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

  selectItem(item: string) {
    this.selectedItems = item;
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

  //post data details

  onSubmit() {
    const courseData = {
      module_name: this.selectedItems_course,
      video_question: this.video_question,
      video_link: this.video_link,
    };

    this.service.addCourseContent(courseData).subscribe((response) => {
      console.log(response);
    });
  }
  
  //get data from api (backend)

  getDataFromAPI() {
    this.service.getContentData().subscribe(
      (response: any) => {
        this.AllData = response.data;
        this.filteredData = this.AllData;
        console.log(this.AllData, "Course Content Data");
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  getModuleDataFromAPI() {
    this.service.getModuleData().subscribe(
      (response: any) => {
        this.module_data = response.data;
        console.log(this.module_data, "Module Data");
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  //end getDataFromAPI

  //update data

  onSaveChanges(): void {
    this.service.updateCourseContent(this.selectedValue).subscribe((coursecontent: any) => {
      console.log(`Updated course with ID ${coursecontent.course_name}`);
    });

    // location.reload();
  }

  //end update

  //delete data

  onDeleteChanges(): void {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        delete_data: this.DeletedValue,
      },
    };

    this.service.deleteCourse(options).subscribe((deleteCoursedata: any) => {
      console.log(deleteCoursedata);
    });

    location.reload();
  }

  //delete end

  openModal(i: any) {
    this.selectedValue = this.AllData[i];
  }

  openDeleteModal(i: any) {
    this.DeletedValue = this.AllData[i];
  }

  redirectToLink(link: string) {
    window.open(link, '_blank');
  }

  checks = false;
  bulk(event: any) {
    if (event.target.checked == true) {
      this.checks = true;
    } else {
      this.checks = false;
    }
  }

  //search...

  search() {
    this.filteredData = this.AllData.filter(
      (data) =>
        data.course_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        data.course_code.toLowerCase().includes(this.searchText.toLowerCase()) ||
        data.module_name.toLowerCase().includes(this.searchText.toLowerCase()) ||
        data.level.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}