// [I] Interface Segregation Principle — implement เฉพาะ ILogger
// [S] Single Responsibility Principle — รับผิดชอบแค่การ log ไปที่ console

import { ILogger } from '../interfaces/ILogger.js';

export class ConsoleLogger extends ILogger {
  log(message) {
    console.log(`[LOG] ${new Date().toISOString()} — ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${new Date().toISOString()} — ${message}`);
  }
}
