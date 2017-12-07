import Jasmine from "jasmine";
import { SpecReporter } from "jasmine-spec-reporter";

var jasmine = new Jasmine();

jasmine.loadConfig({
  spec_files: ["specs/7.test.js"]
});

jasmine.clearReporters(); // remove default reporter logs
jasmine.addReporter(
  new SpecReporter({
    // add jasmine-spec-reporter
    spec: {
      displayPending: true
    }
  })
);

jasmine.execute();
