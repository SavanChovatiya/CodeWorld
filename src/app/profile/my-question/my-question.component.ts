import { Component, OnInit } from '@angular/core';
import { DiscussService } from '../../services/discuss.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-my-question',
  templateUrl: './my-question.component.html',
  styleUrls: ['./my-question.component.css']
})
export class MyQuestionComponent implements OnInit {

  constructor(private _dataService: DiscussService, private userService: UserService, private toastr: ToastrService,
    private route: ActivatedRoute, private router: Router, private location: Location) { }

  public ques: any;
  q;
  data;
  admin;
  userId;
  dateval;
  isNotLogin = true;
  model = {
    user_name: ''
  };

  ngOnInit() {
      if (this.userService.isLoggedIn()) {
        this.userId = this.userService.getUserPayload().user_name;
        this.model.user_name = this.userId;
        this._dataService.getMyQuestions(this.model).subscribe(result => {
        this.q = result;
        this.q.reverse();
        });
        this.isNotLogin = false;
      }

      if (this.userService.isAdminLoggedIn()) {
        this.admin = true;
      } else {
        this.admin = false;
      }
  }

  onSearch(event) {
    alert('Search');
  }

  onPostQuestion(event) {
    this.data = {
      userId : this.userId,
      question : this.ques
    };

    this._dataService.postQuestion(this.data).subscribe(
      status => {
        // document.getElementById("ques").value = '';
        $('#ques').val('');
        this.toastr.success('Question posted successfuly');

        // this.router.navigate( [ '/discuss'] );
        location.reload();
      },
      error => {
        // console.log(error);
        this.toastr.error(error.error[0]);
      }
    );
    // this._dataService.getQuestions().subscribe(result => {
    //   this.q = result;
    //   this.q.reverse();
    // });

  }


  deleteQuestion(event, id) {
    this._dataService.deleteQuestion(id).subscribe(
      status => {
        this.toastr.success('deleted');
        // navigate
        location.reload();
      },
      error => {
        this.toastr.error(error.error[0]);
      }
    );
  }




  addQuestionButton() {
    document.getElementById('ques').focus();
  }


}
