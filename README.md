# MSAL + Angular Sample

- Uses [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js) for authentication against the v2 endpoint
- Showcases making REST calls to the [Microsoft Graph](https://graph,microsoft.com) with the token obtained by MSAL
  - JSON Responses
  - Blob Responses

## Setup

Use either [yarn](https://yarnpkg.com) or npm to get your dependencies

- @angular/cli is needed globally
  - ``yarn global add @angular/cli`` or ``npm install -g @angular/cli``
- Local dependencies
  - ``yarn`` or ``npm install``

## Development server

Run `ng serve` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
