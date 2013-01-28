# URL Alias module using redis

Express middleware for URL rewriting middleware by mapping using redis.  The module is for example useful mapping SEO optimized url to some index based url, e.g.

	/posts/hello-world -> /posts/16

Usage
------------

You must install the express-urlalias middleware before any other middleware (or at least the router). This is because it modifies the value of req.url, and you want that to happen before any other middleware looks at the request.

	var urlalias = require('express-urlalias');
	urlalias.configure('mysite');

	var server = express.createServer();
    server.configure(function() {
        server.use(urlalias);
		server.use(server.router);
	});

To allow the module support multiple sites in one redis server. User should specify the domain

	urlalias.configure('mysite');

To add a url alias

	urlalias.add('/post/whatever-new-alias', '/post/1');
	
or callback with error

	urlalias.add('/post/whatever-new-alias', '/post/1',
		function (err) {console.log(err);});
	
To delete a url alias

	urlalias.remove('/post/whatever-new-alias');

or callback with error

	urlalias.remove('/post/whatever-new-alias',
		function (err) {console.log(err);});

To check if the an alias already existed in database

	urlalias.isExist('/post/whatever-new-alias', 
		function (returnBoolean)
		{console.log(returnBoolean);});		

The module will handle query string of the url automatically.  When url aliasing is found, the middleware with replace the *req.url* with new url and store the original *req.url* to *req.urlRewritten*

Installation
------------

    $ npm install express-urlalias

License 
-------

Copyright 2013 Water Lou

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
