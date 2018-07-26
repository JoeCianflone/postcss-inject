const postcss = require('postcss');
const plugin = require('./');

function run(input, config = {}, utilities = []) {
  return postcss([plugin(config, utilities)]).process(input, { from: undefined });
}

test('selectors with invalid characters do not need to be manually escaped', () => {
  const input = `
    .a\\:1\\/2 { color: red; }
    .b { @inject .a:1/2; }
  `;

  const expected = `
    .a\\:1\\/2 { color: red; }
    .b { color: red; }
  `;

  return run(input).then(result => {
    expect(result.css).toEqual(expected);
    expect(result.warnings().length).toBe(0);
  });
});

// test('it removes important from applied classes by default', () => {
//   const input = `
//     .a { color: red !important; }
//     .b { @apply .a; }
//   `

//   const expected = `
//     .a { color: red !important; }
//     .b { color: red; }
//   `

//   return run(input).then(result => {
//     expect(result.css).toEqual(expected)
//     expect(result.warnings().length).toBe(0)
//   })
// })

// test('applied rules can be made !important', () => {
//   const input = `
//     .a { color: red; }
//     .b { @apply .a !important; }
//   `

//   const expected = `
//     .a { color: red; }
//     .b { color: red !important; }
//   `

//   return run(input).then(result => {
//     expect(result.css).toEqual(expected)
//     expect(result.warnings().length).toBe(0)
//   })
// })

test('it fails if the class does not exist', () => {
  return run('.b { @inject .a; }').catch(e => {
    expect(e).toMatchObject({ name: 'CssSyntaxError' });
  });
});

// test('applying classes that are defined in a media query is not supported', () => {
//   const input = `
//     @media (min-width: 300px) {
//       .a { color: blue; }
//     }
//     .b {
//       @apply .a;
//     }
//   `
//   expect.assertions(1)
//   return run(input).catch(e => {
//     expect(e).toMatchObject({ name: 'CssSyntaxError' })
//   })
// })

// test('applying classes that are ever used in a media query is not supported', () => {
//   const input = `
//     .a {
//       color: red;
//     }
//     @media (min-width: 300px) {
//       .a { color: blue; }
//     }
//     .b {
//       @apply .a;
//     }
//   `
//   expect.assertions(1)
//   return run(input).catch(e => {
//     expect(e).toMatchObject({ name: 'CssSyntaxError' })
//   })
// })

test('it does not match classes that include pseudo-selectors', () => {
  const input = `
    .a:hover {
      color: red;
    }
    .b {
      @inject .a;
    }
  `;
  expect.assertions(1);
  return run(input).catch(e => {
    expect(e).toMatchObject({ name: 'CssSyntaxError' });
  });
});

test('it does not match classes that have multiple rules', () => {
  const input = `
    .a {
      color: red;
    }
    .b {
      @inject .a;
    }
    .a {
      color: blue;
    }
  `;
  expect.assertions(1);
  return run(input).catch(e => {
    expect(e).toMatchObject({ name: 'CssSyntaxError' });
  });
});
