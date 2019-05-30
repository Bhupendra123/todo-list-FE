import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public constants: any;
  constructor() {
    // console.log('ConfigService called');
    this.constants = {
      API_ENDPOINT: 'http://localhost:3500/'
    }
  }

  // method to get api end point
  public getApiEndPoint() {
    return this.constants.API_ENDPOINT;
  }
}
