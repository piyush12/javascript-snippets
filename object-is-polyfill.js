// polyfill of Object.is()

if (!Object.is) {
  Object.is = function (x, y) {
    const isNegativeX = checkIsNegative(x)
    const isNegativeY = checkIsNegative(y)

    if (isNegativeX || isNegativeY) {
      return isNegativeX && isNegativeY
    } else if (x === y) {
      return true
    } else if (isItNan(x) && isItNan(y)) {
      return true
    }

    return false

    // check for negative values for negative 0 we need to divide by 1 and check if it negative Infinity
    function checkIsNegative(value) {
      return value === 0 && (1 / value) === -Infinity
    }

    // Check for NaN and NaN is only value that is not equal to itself
    function isItNan(value) {
      return value !== value
    }
  }
}

// tests:

console.log("++++++++++++++++++")
console.log(Object.is(-4, -4) === true)
console.log('++++++++++++++++++');
console.log(Object.is(42, 42) === true);
console.log(Object.is('foo', 'foo') === true);
console.log(Object.is(false, false) === true);
console.log(Object.is(null, null) === true);
console.log(Object.is(undefined, undefined) === true);
console.log(Object.is(NaN, NaN) === true);
console.log(Object.is(-0, -0) === true);
console.log(Object.is(0, 0) === true);

console.log('++++++++');
console.log(Object.is(-0, 0) === false);
console.log(Object.is(0, -0) === false);
console.log(Object.is(0, NaN) === false);
console.log(Object.is(NaN, 0) === false);
console.log(Object.is(42, '42') === false);
console.log(Object.is('42', 42) === false);
console.log(Object.is('foo', 'bar') === false);
console.log(Object.is(false, true) === false);
console.log(Object.is(null, undefined) === false);
console.log(Object.is(undefined, null) === false);

// // Case 1: Evaluation result is the same as using ===
Object.is(25, 25); // true
Object.is("foo", "foo"); // true
Object.is("foo", "bar"); // false
Object.is(null, null); // true
Object.is(undefined, undefined); // true
Object.is(window, window); // true
Object.is([], []); // false
const foo = { a: 1 };
const bar = { a: 1 };
const sameFoo = foo;
Object.is(foo, foo); // true
Object.is(foo, bar); // false
Object.is(foo, sameFoo); // true

// Case 2: Signed zero
Object.is(0, -0); // false
Object.is(+0, -0); // false
Object.is(-0, -0); // true

// Case 3: NaN
Object.is(NaN, 0 / 0); // true
Object.is(NaN, Number.NaN); // true

