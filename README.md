# Makers Academy Week 8 - Github Profiles SPA

The challenge for Week 8 was to create a simple github user search single page application using AngularJS.

I chose NodeJS with Express for the server side implementation, and my testing framework consisted of Jasmine, Karma, PhantomJS and Protractor.

## Setup
0. Install [Node JS](https://nodejs.org/en/).
0. Clone this repo.
0. `npm install`
0. `npm install -g bower`
0. `bower install`
0. Get a new [personal access token](https://github.com/settings/tokens) from github.
0. Export an `ACCESS_TOKEN` environment variable containing this token.
0. Export a `PORT` environment variable, set to the port you want the server to listen on e.g. 3000.

## Usage
0. Run `node server.js`
0. Browse to http://localhost:3000
0. Enter a search term to see matching github profiles:

  ![screenshot](http://i.imgur.com/DVHgghC.png)

## Running tests
### Feature tests
0. `npm install -g protractor`
0. `webdriver-manager update`
0. `webdriver-manager start`
0. `node server.js`
0. `protractor test/e2e/conf.js`

### Unit tests
0. `npm install -g karma-cli`
0. `karma start test/karma.conf.js`
