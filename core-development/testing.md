---
title: Testing
---

# Core Development Documentation: Testing

Unit tests are important to ensure the quality of the project as changes occur.

All tests are located in the [*tests* top-level directory](https://github.com/MichMich/MagicMirror/tree/master/tests).

## Hierarchy of Tests

Below the *tests* directory are other directories that organize the tests:

* *configs* - Configuration files for tests.
* *e2e* - End-to-end tests that start and run MagicMirror² in various configurations.
* *electron* - Electron application tests.
* *mocks* - Mock-up data for tests.
* *unit* - Unit tests for utilities and smaller portions of MagicMirror².
* *utils* - Testing utilities.

## Writing a Test

Almost all pull requests must have test coverage of changes. Usually, it is easier to find an existing test and
extend it to test your new functionality.

For example, if you were writing a test for a fix in the Calendar module, you might locate *tests/e2e/modules/calendar_spec.js*
and add an additional test there.

If you have questions about how to write a test, you can also ask in the [MagicMirror forums](https://forum.magicmirror.builders/).
