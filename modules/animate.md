# Animation Guide
(_Introduced in version: 2.25.0_)

::: tip Preview of animation
check the [animate.css](https://animate.style/) library to see a preview of the animation name result
:::

::: warning Where animation can be used?
 - [global module configuration](configuration.html#animated) of a module
 - [this.hide()](../development/core-module-file.html#this-hide-speed-callback-options) function in core module file
 - [this.show()](../development/core-module-file.html#this-show-speed-callback-options) function in core module file
 - [this.updateDom()](../development/core-module-file.html#this-updatedom-speed-options) function in core module file
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
