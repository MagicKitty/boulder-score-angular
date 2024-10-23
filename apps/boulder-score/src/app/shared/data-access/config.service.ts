import { Injectable } from '@angular/core';
import { ConfigDTO } from '../models/config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config!: ConfigDTO;

  setConfig(config: ConfigDTO) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}
