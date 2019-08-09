import { Injectable } from '@nestjs/common';
import * as UA from 'ua-device';

export interface UaDetail{
  browser:string
  browserVersion:string
  deviceManufacturer:string
  deviceModel:string
  deviceType:string
  engine:string
  engineVersion:string
  os:string
  osVersion:string
}

@Injectable()
export class UaService {
  constructor() {}
  public parse(ua:string): UaDetail {
    try{
      const result = UA(ua);
      return {
        browser:result.browser.name,
        browserVersion:result.browser.version.original,
        deviceManufacturer:result.device.manufacturer,
        deviceModel:result.device.model,
        deviceType:result.device.type,
        engine:result.engine.name,
        engineVersion:result.engine.version.original,
        os:result.os.name,
        osVersion:result.os.version.original,
      };
    }catch(e){
      return {
        browser:'未知',
        browserVersion:'未知',
        deviceManufacturer:'未知',
        deviceModel:'未知',
        deviceType:'未知',
        engine:'未知',
        engineVersion:'未知',
        os:'未知',
        osVersion:'未知',
      }
    }
    
  }
}
