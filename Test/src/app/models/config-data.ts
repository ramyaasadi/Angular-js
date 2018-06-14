export class ConfigurationData {
    configId:number;
    configName: string;
    configValue: string;
    status: string;
    systemRequired:string;
    constructor(values: Object = {}) {
      Object.assign(this, values);
    }
  }

