# jsonpretty

Yet another JSON pretty printer

## Installation

Install via npm:

```
$ npm install jsonpretty
```

# Usage

Take some JSON object and call like so:

``` js
var jsonpretty = require('jsonpretty');
var obj = { name: 'Bob', car: { make: 'Toyota', model: 'Camry' } };
console.log(jsonpretty(obj));
```

This will output:

``` json
{
  "name": "Bob",
  "car": {
    "make": "Toyota",
    "model": "Camry"
  }
}
```
