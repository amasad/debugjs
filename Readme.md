# debugjs

  Lightweight JavaScript VM and stepping debugger in JavaScript.  
  [Demo app](http://debugjs.com/#example)  
  [Blog post](http://amasad.me/2014/01/06/building-an-in-browser-javascript-vm-and-debugger-using-generators/)  

## Installation

  With [component(1)](http://component.io):

    $ component install amasad/debugjs

  With npm

    $ npm install amasad/debugjs

  Or grab `dist/bundle.js` for a standalone library.

## API

## debugjs.createDebugger(options)

  Creates and returns a `Debugger`.
  `options` will be passed to the `Machine` constructor.
  `options.sandbox` will be passed as the sandbox option -- see `Machine`

## Debugger

### new Debugger(machine)

  Creates a `Debugger` on top of the passed `machine`.

### Debugger#addBreakpoints(filename, linenos)

  `filename` string of the filename.
  `liennos` array of linenumbers to add breakpoints to.

### Debugger#removeBreakpoint(filename, linenos)

  `filename` string of the filename.
  `liennos` array of linenumbers to remove breakpoints to.

### Debugger#getBreakpoints(filename)

  Gets an array of breakpoints on the file `filename`.

### Debugger#getCallStack(options)

  Gets a sanitized call stack, with nothing but stack frames. Pass in `{ raw: true }` to get meta call stack info.

### Debugger#run()

  Runs the code until it hits a breakpoint.

### Debugger#stepOver()

  Steps over an instruction.

### Debugger#stepIn()

  Steps into a function call.

### Debugger#stepOut()

  Steps out of a function call.

### Debugger#load(code, filename)

  Loads a file of code into the machine.

### Debugger#paused()

  Boolean for if the machine is paused.

### Debugger#halted()

  Boolean for if the machine is halted.

### Debugger#getCurrentStackFrame()

  Current stsack frame.

## Machine

### new Machine(sandbox, options)

  `sandbox` object with references to be copied into the context.
  `options`:

   * iframeParentElement to attach the context iframe to a parent element

### Machine#evaluate(code, filename)

  Compiles `code` as file `filename` and gets it ready to run.

### Machine#step()

  Steps through the `evaluate`ed code.

### Machine#run()

  Calls `step` continuously until machine is `halted`

### Machine#pause()

  Will not let `run()` do anymore steps.

### Machine#resume()

  `run()` could continue running.

### Machine#getCallStack()

  Gets the call stack. Note that this will include meta call stack information, like thunks etc.
  See `Debugger#getCallStack` on how to filter non stack frame information.

### Machine#getCurrentStackFrame()

  Gets the current stack frame

### Machine#getState()

  Returns an object the latest step information (whether halted and what was yielded).

### Machine#getCurrentLoc()

  Line and column of the latest instruction ran by the machine.

### Machine#paused

  Boolean stating if the machine is paused. See `pause()`

### Machine#halted

  Boolean stating if the machine has no more instructions to run and is in idle state.

## License

  AAL. See [LICENSE](https://github.com/amasad/debugjs/blob/master/LICENSE)
