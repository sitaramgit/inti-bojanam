import type { CapacitorConfig } from '@capacitor/cli';
import { apiEndPoints } from './common/apiEndPoints';

const config: CapacitorConfig = {
  "appId": "com.example.app",
  "appName": "my-app",
  "webDir": "out",
  "bundledWebRuntime": false,
  // "server": {
  //   "url": apiEndPoints.host_api.host,
  //   "cleartext": true
  // }
};

export default config;
