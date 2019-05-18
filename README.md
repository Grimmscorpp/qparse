# qparse

`qparse` is a query string generator and parser in JavaScript.

```
http://www.example.com/path/name?name1=value1&name2=value2&...&nameN=valueN#hash
                                 |________________________________________|
                                                query string
```

A query string, for the most part, is a collection of '&' separated *name=value* pairs. `qparse` turns it into an object and vice versa. In doing so:

* Performs URL encoding/decoding where applicable
* Creates nested hierarchies where possible
* Parses primitive types (`number`, `boolean`) where permissible (unless asked not to)

## TL;DR

Here's a hypothetical Node.js starter. The API should work consistently in all major browsers.

```javascript
const qp = require("qparse");

let query = qp.parse("example.com?veg=Spinach&fruits=Apple&fruits=Banana");

console.log(query.data);
// >>> { veg: 'Spinach', fruits: [ 'Apple', 'Banana' ] }

// ---------------------------------------------------------------------------------------------------------------------

query = qp.parse("example.com" +
                 "?rect.width=30&rect.height=10" +
                 "&rect.color=green&rect.fill=true");

let rect = query.data.rect;

console.log(rect);                     // { color: 'green', fill: true, height: 10, width: 30 }
console.log(rect.fill === true);       // true
console.log(rect.width * rect.height); // 300

// ---------------------------------------------------------------------------------------------------------------------

// Generate a new query string from an object. Parameters listed below:

query = qp.create({
  customer: "John Doe",         // customer=John%20Doe
  cart: {
    qty: 2,                     // cart.qty=2
    items: ["item-1", "item-2"] // cart.items=item-1&cart.items=item-2
  }
});

console.log("example.com" + query); // example.com?customer=John%20Doe&cart.qty=2&cart.items=item-1&cart.items=item-2

console.log(query.isEmpty);         // false

query.data = {};
console.log(query.isEmpty);         // true
```



## Contents

1. [Installation](#installation)
2. [Sample Code](#sample-code)
3. [Feature Comparison](#feature-comparison)
4. [Contributor Notes](#contributor-notes)



## Installation

You can install the compiled package using `npm`.

```bash
npm install qparse
```

Once installed, you can get started on Node.js following the [sample code below](#sample-code), or feel free to include `dist/qparse[.min].js` in your browser.

Generous contributors can get the source and the dependencies using:

```bash
git clone https://github.com/Grimmscorpp/qparse.git
cd qparse
npm install
```

Then build it:

```bash
npx webpack --config webpack.config.debug.js # creates dist/qparse.js
npx webpack --config webpack.config.js       # creates dist/qparse.min.js
```



## Sample Code

#### Node.js

```javascript
var qp = require("qparse");

// Start generating a new URL from scratch...
var url = "http://www.example.com/path";
var query = qp.fresh();

query.data = {
  firstName: "John",
  lastName: "Doe",
  hobbies: [
    "coding",
    "eating"
  ],
  email: {
    home: "john.doe@homail.com",
    office: "john.doe@offmail.com"
  }
};

// Generating the URL is pretty straightforward...
console.log("Full URL: " + url + query);
console.log("Query String: " + query.toString());

/************************************Output************************************
 *                                                                            *
 * Full URL: http://www.example.com/path?firstName=John&lastName=Doe&hobbies= *
 * coding&hobbies=eating&email.home=john.doe@homail.com&email.office=john.doe *
 * @offmail.com                                                               *
 *                                                                            *
 * Query String: ?firstName=John&lastName=Doe&hobbies=coding&hobbies=eating&e *
 * mail.home=john.doe@homail.com&email.office=john.doe@offmail.com            *
 *                                                                            *
 ******************************************************************************/

// Parsing the new URL will produce an object similar to `query`.
// Note: The `url` part will not be preserved in the object.

var newQuery = qp.parse(url + query); // Passing query.toString() will also do

newQuery.data.email.office = null; // One way to delete an entry
newQuery.data.hobbies.push("creating nice tools"); // Contains whitespaces

console.log(url + newQuery);

/************************************Output************************************
 *                                                                            *
 * http://www.example.com/path?firstName=John&lastName=Doe&hobbies=coding&hob *
 * bies=eating&hobbies=creating%20nice%20tools&email.home=john.doe@homail.com *
 *                                                                            *
 ******************************************************************************/
```

### Browser

Include `dist/qparse[.min].js` in your scripts. This will expose the objects `qparse` and `qp` (the shorthand) in the global scope; if one is overridden, the other should remain.

```html
<!doctype html>
<html>
  <head>
    <title>qparse demo</title>
  </head>
  <body>
    <button onclick="check()">Test qparse</button>

    <script src="path/to/qparse/dist/qparse.min.js"></script>
    <script type="text/javascript">
      function check() {
        var query = qp.parse(location.search);
        query.data.today = "is a present!";
        location.href = location.origin
          + location.pathname
          + query
          + location.hash;
      }
    </script>
  </body>
</html>
```



## Feature Comparison





## Contributor Notes
