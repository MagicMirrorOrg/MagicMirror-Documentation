---
title: Testing
---

# Core Development Documentation: Testing

Unit tests are important to ensure the quality of the project as changes occur.

All tests are located in the
[_tests_ top-level directory](https://github.com/MagicMirrorOrg/MagicMirror/tree/master/tests).

## Hierarchy of Tests

Below the _tests_ directory are other directories that organize the tests:

- _configs_ - Configuration files for tests.
- _e2e_ - End-to-end tests that start and run MagicMirror² in various
  configurations.
- _electron_ - Electron application tests.
- _mocks_ - Mock-up data for tests.
- _unit_ - Unit tests for utilities and smaller portions of MagicMirror².
- _utils_ - Testing utilities.

## Writing a Test

Almost all pull requests must have test coverage of changes. Usually, it is
easier to find an existing test and extend it to test your new functionality.

For example, if you were writing a test for a fix in the Calendar module, you
might locate _tests/e2e/modules/calendar_spec.js_ and add an additional test
there.

If you have questions about how to write a test, you can also ask in the
[MagicMirror forums](https://forum.magicmirror.builders/).
