import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Entity } from '../../models/entity.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {
  public entityForm: FormGroup;
  public showSaveBtn: boolean = false;
  public entity: Entity;
  constructor(public apiService: ApiService, public formBuilder: FormBuilder, private route: ActivatedRoute, public router: Router) {
    this.entityForm = formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      tempTime: ['', [Validators.required]]
    }, { validator: this.validDate('date', 'tempTime') });
  }
  get title() { return this.entityForm.get('title'); }
  get description() { return this.entityForm.get('description'); }
  get date() { return this.entityForm.get('date'); }
  get tempTime() { return this.entityForm.get('tempTime'); }

  validDate(date: string, tempTime: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let dateObj = group.controls[date];
      let tempTimeObj = group.controls[tempTime];
      let dateArr = dateObj.value.split('-');
      let timeArr = tempTimeObj.value.split(':');
      let setDateTime = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]));
      let now = new Date();

      if (now > setDateTime && this.showSaveBtn) {
        return {
          invalidDate: true
        };
      }
    }
  }

  ngOnInit() {
    if (this.route.snapshot.params.id == '' || this.route.snapshot.paramMap.get("id") == null) {
      this.showSaveBtn = true;
      let tempDate = new Date();
      this.entityForm.controls['date'].setValue(tempDate.getFullYear() + '-' + ((tempDate.getMonth() + 1) > 9 ? (tempDate.getMonth() + 1) : '0' + (tempDate.getMonth() + 1)) + '-' + (tempDate.getDate() > 9 ? tempDate.getDate() : '0' + tempDate.getDate()));
      this.entityForm.controls['tempTime'].setValue((tempDate.getHours() > 9 ? tempDate.getHours() : '0' + tempDate.getHours()) + ':' + (tempDate.getMinutes() > 9 ? tempDate.getMinutes() : '0' + tempDate.getMinutes()));
      this.entity = new Entity('', '', '', new Date(), false);
    } else {
      this.apiService.request('post', 'getEntityById', { _id: this.route.snapshot.params.id }, {}, true).subscribe((res) => {
        this.entityForm.controls['title'].setValue(res.title);
        this.entityForm.controls['description'].setValue(res.description);
        let tempDate = new Date(res.time);
        this.entityForm.controls['date'].setValue(tempDate.getFullYear() + '-' + ((tempDate.getMonth() + 1) > 9 ? (tempDate.getMonth() + 1) : '0' + (tempDate.getMonth() + 1)) + '-' + (tempDate.getDate() > 9 ? tempDate.getDate() : '0' + tempDate.getDate()));
        this.entityForm.controls['tempTime'].setValue((tempDate.getHours() > 9 ? tempDate.getHours() : '0' + tempDate.getHours()) + ':' + (tempDate.getMinutes() > 9 ? tempDate.getMinutes() : '0' + tempDate.getMinutes()));
        this.entity = new Entity(
          res._id,
          res.title,
          res.description,
          res.time,
          res.status
        );
      }, (error) => {
        alert(error);
      });
    }
  }
  createEntity(data) {
    let dateArr = data.date.split('-');
    let timeArr = data.tempTime.split(':');
    let setDateTime = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]));
    let obj = {
      description: data.description,
      time: setDateTime,
      title: data.title
    }
    this.apiService.request('post', 'insertEntity', obj, {}, true).subscribe((res) => {
      if (res._id) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      alert(error);
    });
  }
  back() {
    this.router.navigate(['/']);
  }
  deleteEntity(obj) {
    this.apiService.request('post', 'deleteEntity', { _id: obj._id }, {}, true).subscribe((res) => {
      if (res._id) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      alert(error);
    });
  }
  updateEntity(data) {
    let dateArr = data.date.split('-');
    let timeArr = data.tempTime.split(':');
    let setDateTime = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) - 1, parseInt(dateArr[2]), parseInt(timeArr[0]), parseInt(timeArr[1]));
    let obj = {
      _id: this.entity._id,
      status: this.entity.status,
      description: data.description,
      time: setDateTime,
      title: data.title
    }
    this.apiService.request('post', 'updateEntity', obj, {}, true).subscribe((res) => {
      console.log(res);
      if (res.ok) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      alert(error);
    });
  }
}
