
# object-element-events

  Provide event methods to object element

## Installation

  Install with [component(1)](http://component.io):

    $ component install shallker/object-element-events

## API

##### .bind(String eventType, Function callback, [Boolean capture])
##### .unbind(String eventType, Function callback, [Boolean capture])
##### .addEventListener(String eventType, Function callback, [Boolean capture])
##### .removeEventListener(String eventType, Function callback, [Boolean capture])
##### .delegate(String selector, String eventType, Function callback, [Boolean capture])
##### .undelegate(String selector, String eventType, Function callback, [Boolean capture])
##### .on(String eventName, [String selector], Function callback, [Boolean capture])
##### .off(String eventName, [String selector], Function callback, [Boolean capture])
##### .triggerSync(String eventName, [Mix args...])
##### .trigger(String eventName, [Mix args...])

## Todo
- remove dependencies delegate and events
- let callback executed on objectElement

## License

  MIT
