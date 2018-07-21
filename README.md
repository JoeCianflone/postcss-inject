# PostCSS Inject [![Build Status][ci-img]][ci]

[PostCSS] plugin Inject classees into other classes.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/JoeCianflone/postcss-inject.svg
[ci]:      https://travis-ci.org/JoeCianflone/postcss-inject

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-inject') ])
```

See [PostCSS] docs for examples for your environment.
