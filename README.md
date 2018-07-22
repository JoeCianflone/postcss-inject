# PostCSS Inject [![Build Status][ci-img]][ci]

[PostCSS] plugin Inject classes into other classes in a way that makes sense.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/JoeCianflone/postcss-inject.svg
[ci]:      https://travis-ci.org/JoeCianflone/postcss-inject

Alright, if you've used Sass before you know about `@extend` the concept is pretty simple: you take one classes properties and add them to another class in a simple way. In theory, `@extend` is awesome, but it doesn't work the way you expect. See [this](https://www.sassmeister.com/gist/3ff2cf9f8f676f36bc4a07fe8b724fcb) to see how Sass handles extend.

Mixins with Sass work better, you create a bunch of properties in a mixin and you just `@include` them wherever you want. Buuut, you now have this extra thing...the mixin itself, it feels kinda dirty to me.

What I wanted was a way to have the simplicity of `@extend` with the behavior of a `@mixin`.

Funny thing is I wasn't the only one thinking of it. [Adam Wathen](https://github.com/adamwathan) was thinking about this when he created [Tailwinds](https://tailwindcss.com/). Adam created a PostCSS thing for [Tailwinds](https://tailwindcss.com/) called `@apply` which did almost everything I wanted it to do...except it was part of [Tailwinds](https://tailwindcss.com/). :)

## CSS Usage

```css
.bar {
  color: green;
}

.foo {
  @inject .bar;
}
```

Output

```css
.bar {
  color: green;
}

.foo {
  color: green;
}
```


So I extracted his concepts and created a plugin you see before you `@inject`! Now if you've used [Tailwinds](https://tailwindcss.com/) you know about 95% about how `@inject` works, but there are a couple of differences:


### All props come over, even `!important`

```css
.bar {
  color: green;
  font-size: 22px !important;
  border: 1px solid red;
}

.foo {
  @inject .bar;
}
```

Output:

```css
.bar {
  color: green;
  font-size: 22px !important;
  border: 1px solid red;
}

.foo {
  color: green;
  font-size: 22px !important;
  border: 1px solid red;
}
```

Why this change? Well, I can understand why you'd not want to take `!important` stuff over if you're working in a framework, but if you're using this outside of a framework I feel *not* taking this would be an unexpected behavior.

### This works inside of media queries...unless you disable it

```css

@media (min-width: 400px) {
  .bar {
    color: green;
    font-size: 22px !important;
    border: 1px solid red;
  }
}


.foo {
  @inject .bar;
}
```

Output:

```css

@media (min-width: 400px) {
  .bar {
    color: green;
    font-size: 22px !important;
    border: 1px solid red;
  }
}


.foo {
    color: green;
    font-size: 22px !important;
    border: 1px solid red;
}
```

Why allow this to work? Well, I guess this just goes to my C programming days, I like giving people enough rope to hang themselves. Honestly, you should probably never do this, but I'm giving you the ability to do this because you may have a legit case that I am not thinking about.

Don't worry, if you look at this in horror you can disable this via the options.

## General usage


```js
// Default options
postcss([ require('postcss-inject', {allowFromMediaQueries: true}) ])
```


See [PostCSS] docs for examples for your environment.
