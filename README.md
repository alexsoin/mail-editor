# MAIL-EDITOR

Конструктор писем. С возможностью сохранения и загрузки разметки.

Ядром проекта является https://unlayer.com/embed

## Methods
| method          | params                   | description                                                    |
| --------------- | ------------------------ | -------------------------------------------------------------- |
| **loadDesign**  | `Object data`            | Takes the design JSON and loads it in the editor               |
| **saveDesign**  | `Function callback`      | Returns the design JSON in a callback function                 |
| **exportHtml**  | `Function callback`      | Returns the design HTML and JSON in a callback function        |

See the [example source](https://github.com/unlayer/vue-email-editor/tree/master/src) for a reference implementation.

## Properties

* `minHeight` `String` minimum height to initialize the editor with (default 500px)
* `options` `Object` options passed to the Unlayer editor instance (default {})
* `tools` `Object` configuration for the built-in and custom tools (default {})
* `appearance` `Object` configuration for appearance and theme (default {})
* `projectId` `Integer` Unlayer project ID (optional)
* `locale` `String` translations string (default en-US)

See the [Unlayer Docs](https://docs.unlayer.com/) for all available options.


[Original](https://github.com/unlayer/vue-email-editor)
