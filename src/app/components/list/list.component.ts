import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { Entity } from '../../models/entity.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public entities: Entity[];
  public deleteListItem: any = [];
  public filterData: string;
  constructor(public apiService: ApiService, public router: Router, public formBuilder: FormBuilder) {
    this.filterData = 'all';
  }
  ngOnInit() {
    this.apiService.request('post', 'getAllEntities', {}, {}, true).subscribe((res) => {
      this.entities = res.map(item => {
        return new Entity(
          item._id,
          item.title,
          item.description,
          item.time,
          item.status
        );
      });
    }, (error) => {
      alert(error);
    });
  }
  updateEntity(data) {
    this.apiService.request('post', 'updateEntity', data, {}, true).subscribe((res) => {
      console.log(res);
    }, (error) => {
      alert(error);
    });
  }
  toggleSelectEntity(obj) {
    if (this.deleteListItem.indexOf(obj) === -1) {
      this.deleteListItem.push(obj);
    } else {
      let index = this.deleteListItem.indexOf(obj);
      if (index > -1) {
        this.deleteListItem.splice(index, 1);
      }
    }
  }
  multipleDeleteEntity() {
    console.log('multipleDeleteEntity');
    this.apiService.request('post', 'deleteMultipleEntities', this.deleteListItem, {}, true).subscribe((res) => {
      let deleteListArrlength = this.deleteListItem.length;
      while (deleteListArrlength > 0) {
        let tempIndex = this.entities.indexOf(this.deleteListItem[deleteListArrlength - 1]);
        this.entities.splice(tempIndex, 1);
        deleteListArrlength--;
      }
      this.deleteListItem = [];
    }, (error) => {
      alert(error);
    });
  }
}
