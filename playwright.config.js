// @ts-check
import { defineConfig, devices } from '@playwright/test';


const config = ({
  testDir: './tests',
  fullyParallel: true,
  //retries : 2,
  timeout: 40 * 1000,// this timeout will apply to all tests
  expect: {
    timeout: 40 * 1000,  // this timeout will apply to all assertions
  },
  reporter: [
    ['html'],
    ['allure-playwright'],

  ], //report results in HTML format
  /* reporter:[
      ['html', {outputFolder : 'My-report', open :'always'}]
      ['html', {outputFolder : 'My-report', open :'never'}]
       ['html', {outputFolder : 'My-report', open :'on-failure'}]
 
   ],*/
  /*reporter: [//terminal report + JSON report + Junit Report
    //['dot'],
   // ['list'],
  ['json',{outputFile:'my-report-json'}],
  ['junit',{outputFile:'my-result.xml'}],
  
  
  ],*/

  use: {

    trace: 'on-first-retry',
    headless: false,
    browserName: 'chromium',
    //viewport: { width: 800, height: 600 },
    //screenshot : 'only-on-failure',
    // video : 'retain-on-failure',



  },

  /* projects: [
 
     {
       name: 'firefox',
       use: { ...devices['Desktop Firefox'] },
     },
 
   ],*/
});


module.exports = config;

