import Debugger from './debugger';
import Machine from './machine';

export { default as Debugger } from './debugger';
export { default as Machine } from './machine';

/**
 * Sugar to create a debugger without worrying about the machine.
 * @api
 * @param options
 */
export function createDebugger(options = {}) {
  return new Debugger(new Machine(options.sandbox, options));
}
