# qparse

`qparse` (pronounced "queue parse") is a **query string parser** and **generator** in JavaScript.



A query string is the part of a URL containing `&` separated key-value pairs.

```
http//www.example.com/path/name?key1=value1&key2=value2&key3=value3#hash
                                |_________________________________|
                                           query string
```



`qparse` **parses it out** of the URL, **breaks it down** to a JavaScript object and **joins the object** (after modifications) into a query string back again. Behind the scenes it handles all the *percent encoding/decoding* stuff for you.

```javascript
// node REPL

const qp = require("qparse");

qp.parse("example.com?hobbies=coding&hobbies=eating%20healthy%20food").data
// Output: { hobbies: ["coding", "eating healthy food"] }

qp.parse("?rect.length=30&rect.height=10").data
// Output: { rect: { length: "30", height: "10" } }
```



## TL;DR

Jump to:

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
