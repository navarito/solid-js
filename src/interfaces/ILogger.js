export class ILogger {
  /**
   * @param {string} message
   */
  log(message) {
    throw new Error('ILogger.log() must be implemented');
  }

  /**
   * @param {string} message
   */
  error(message) {
    throw new Error('ILogger.error() must be implemented');
  }
}
