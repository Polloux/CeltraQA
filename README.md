# Answering the questions: 

1. How would you execute the test in parallel on multiple browsers?

   `npx codeceptjs run-workers 3` or
   
   `npx codeceptjs run-multiple parallel` after defining
   ```
   multiple: {
     parallel: {
       browsers: ['chromium', 'firefox', 'webkit'],
        browser: {
          chromium: { browser: 'chromium' },
          firefox: { browser: 'firefox' },
          webkit: { browser: 'webkit' }
        }
      }
   }
2. How would you ensure that Ads are pixel-perfect?
  There's a lot of libraries that can help you with getting it pixel perfect. There is ResembleHelper, Percy, Applitools, and Chromatic. Example of the ResembleHelper:

  ```
  I.saveElementScreenshot('#ad-container', 'expected.png');
  I.seeVisualDiff('expected.png', { tolerance: 2 }); // Tolerance is pixels
  ```

3. How would you handle flaky tests?
   Mostly the problem with testing is the changing environment. Tests are easy when we test for things that never change. The problem comes when we have to test a site that changes dynamically, gets extra elements, etc. We can also try retries
   ```
   retries: {
     run: 2
   }
  - We can replace waits with waitForElement, waitForFunction, as wait() doesn't really do what we want it to do, it often doesn't wait long enough or it waits too long. 
  - We can debug with --verbose and screenshots to trace if the fail is due to async behavior, network timing, or something else. Isolate flaky steps: Move those steps into helpers or retry wrappers.
  - We can also run the tests in CI multiple times and note if it fails only failing in Firefox or only under a lot of load.
   
