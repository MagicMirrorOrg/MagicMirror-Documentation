# Animation Guide

(_Introduced in version: 2.25.0_)

::: tip Preview of animation
check the [animate.css](https://animate.style/) library to see a preview of the animation name result
:::

::: warning Where animation can be used?

 - [global module configuration](configuration.html#animated) of a module
 - [this.hide()](../module-development/core-module-file.html#this-hide-speed-callback-options) function in core module file
 - [this.show()](../module-development/core-module-file.html#this-show-speed-callback-options) function in core module file
 - [this.updateDom()](../module-development/core-module-file.html#this-updatedom-speed-options) function in core module file
:::

## animateIn

When the module appears, you can choose an animation.<br>
Here is the list of names of special animations available:

- bounce
- flash
- pulse
- rubberBand
- shakeX
- shakeY
- headShake
- swing
- tada
- wobble
- jello
- heartBeat
- backInDown
- backInLeft
- backInRight
- backInUp
- bounceIn
- bounceInDown
- bounceInLeft
- bounceInRight
- bounceInUp
- fadeIn
- fadeInDown
- fadeInDownBig
- fadeInLeft
- fadeInLeftBig
- fadeInRight
- fadeInRightBig
- fadeInUp
- fadeInUpBig
- fadeInTopLeft
- fadeInTopRight
- fadeInBottomLeft
- fadeInBottomRight
- flip
- flipInX
- flipInY
- lightSpeedInRight
- lightSpeedInLeft
- rotateIn
- rotateInDownLeft
- rotateInDownRight
- rotateInUpLeft
- rotateInUpRight
- jackInTheBox
- rollIn
- zoomIn
- zoomInDown
- zoomInLeft
- zoomInRight
- zoomInUp
- slideInDown
- slideInLeft
- slideInRight
- slideInUp

## animateOut

When module should hide, you can choose an animation.<br>
Here is the list of names of special animations available:

- backOutDown
- backOutLeft
- backOutRight
- backOutUp
- bounceOut
- bounceOutDown
- bounceOutLeft
- bounceOutRight
- bounceOutUp
- fadeOut
- fadeOutDown
- fadeOutDownBig
- fadeOutLeft
- fadeOutLeftBig
- fadeOutRight
- fadeOutRightBig
- fadeOutUp
- fadeOutUpBig
- fadeOutTopLeft
- fadeOutTopRight
- fadeOutBottomRight
- fadeOutBottomLeft
- flipOutX
- flipOutY
- lightSpeedOutRight
- lightSpeedOutLeft
- rotateOut
- rotateOutDownLeft
- rotateOutDownRight
- rotateOutUpLeft
- rotateOutUpRight
- hinge
- rollOut
- zoomOut
- zoomOutDown
- zoomOutLeft
- zoomOutRight
- zoomOutUp
- slideOutDown
- slideOutLeft
- slideOutRight
- slideOutUp 

::: warning WARN
- You can't choose an `animateIn` name to place it on an `animateOut` and vice versa
- Animation names are case sensitive
- In case of wrong animation name, this will display the default animation (fade)
:::

## Developer Notes

You can create an animation on a single `<div>` of your module.<br>
We coded `addAnimateCSS` and `removeAnimateCSS` in order to do this.

::: tip addAnimateCSS() function
Allows you to add an animation to a single `<div>` of your module
:::

Syntaxe: `addAnimateCSS(<div>, <animation name>, <animation time in sec>)` <br>
Sample:
 * You have created a `<div>` named "myDivSample"
 * You want to add a `flipInX` type animation for a duration of 1 second

 ```javascript
 addAnimateCSS("myDivSample", "flipInX", 1)
 ```

::: tip removeAnimateCSS() function
Allows you to remove an animation to a single `<div>` of your module
:::

Syntaxe: `removeAnimateCSS(<div>, <animation name>)` <br>
Sample:
 * You have created a `<div>` named "myDivSample"
 * You want to remove a `flipInX` type animation created with `addAnimateCSS()` function

```javascript
removeAnimateCSS("myDivSample", "flipInX")
```

::: tip Tip
:::

You have to update only one element of your module.<br>
So, why not add an animation !?

```javascript
...
// select element ("myDivSample")
let test = document.getElementById("myDivSample")
// apply pretty update of this element
test.textContent = "Hello AnimateCSS!"
// add an "flipInX" animation type to "myDivSample" with 1 sec duration
addAnimateCSS("myDivSample", "flipInX", 1)
setTimeout(() => {
  // remove animation after 1sec
  removeAnimateCSS("myDivSample", "flipInX")
}, 1000)
...
```
