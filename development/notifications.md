---
title: Notifications
---

# Introduction

The MagicMirror core has the ability to send notifications to modules. Or even better: the modules have the possibility
to send notifications to other modules.

Additional technical information on the notifications can be found in the [modules documentation](https://docs.magicmirror.builders/development/introduction.html#general-advice):

- [notificationReceived](https://docs.magicmirror.builders/development/core-module-file.html#subclassable-module-methods)
- [sendNotification](https://docs.magicmirror.builders/development/core-module-file.html#module-instance-methods)

# System notifications

The system sends three notifications when starting up:

| Notification          | Payload | Description                                                                            |
| --------------------- | ------- | -------------------------------------------------------------------------------------- |
| `ALL_MODULES_STARTED` | _none_  | All modules are started. You can now send notifications to other modules.              |
| `DOM_OBJECTS_CREATED` | _none_  | All dom objects are created. The system is now ready to perform visual changes.        |
| `MODULE_DOM_CREATED`  | _none_  | This module's dom has been fully loaded. You can now access your module's dom objects. |

# Default module notifications

These notifications are send by the default modules:

| Notification           | Payload                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SHOW_ALERT`           | [message details](https://github.com/MichMich/MagicMirror/tree/master/modules/default/alert#notification-params) | Sent to [alert module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/alert) to show an alert or notification.                                                                                                                                                                                                             |
| `HIDE_ALERT`           | _none_                                                                                                           | Sent to [alert module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/alert) to hide the current alert or notification.                                                                                                                                                                                                    |
| `CALENDAR_EVENTS`      | [calendar events](https://github.com/MichMich/MagicMirror/tree/master/modules/default/calendar)                  | Sent by [calendar module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/calendar) to inform modules of the calendar events. The [currentweather module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/currentweather) uses this event to display the weather for the location of an upcoming event. |
| `CURRENTWEATHER_DATA`  | _TBC_                                                                                                            | Sent by [currentweather module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/currentweather)                                                                                                                                                                                                                             |
| `INDOOR_TEMPERATURE`   | _number_                                                                                                         | Sent to [currentweather module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/currentweather) to show indoor temperature.                                                                                                                                                                                                 |
| `INDOOR_HUMIDITY`      | _number_                                                                                                         | Sent to [currentweather module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/currentweather) to show indoor humidity.                                                                                                                                                                                                    |
| `ARTICLE_NEXT`         | _none_                                                                                                           | Shows the next news title in [newsfeed module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/newsfeed).                                                                                                                                                                                                                   |
| `ARTICLE_PREVIOUS`     | _none_                                                                                                           | Shows the previous news title in [newsfeed module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/newsfeed).                                                                                                                                                                                                               |
| `ARTICLE_MORE_DETAILS` | _none_                                                                                                           | Shows more details in [newsfeed module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/newsfeed).                                                                                                                                                                                                                          |
| `ARTICLE_LESS_DETAILS` | _none_                                                                                                           | Hides the summary or full news article and only displays the news title of the currently viewed news item in [newsfeed module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/newsfeed).                                                                                                                                   |
| `ARTICLE_TOGGLE_FULL`  | _none_                                                                                                           | Toogles article in fullscreen in [newsfeed module](https://github.com/MichMich/MagicMirror/tree/master/modules/default/newsfeed).                                                                                                                                                                                                               |

# 3rd Party Module notifications

Take a look in the [wiki](https://github.com/MichMich/MagicMirror/wiki/) to see if 3rd party modules send notifications you might want to use.
