import fetch$1 from 'isomorphic-unfetch';
import React from 'react';
import Head from 'next/head';
import reactApollo from 'react-apollo';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

function getCjsExportFromNamespace (n) {
	return n && n.default || n;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var fastJsonStableStringify = function (data, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var cycles = (typeof opts.cycles === 'boolean') ? opts.cycles : false;

    var cmp = opts.cmp && (function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    })(opts.cmp);

    var seen = [];
    return (function stringify (node) {
        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        if (node === undefined) return;
        if (typeof node == 'number') return isFinite(node) ? '' + node : 'null';
        if (typeof node !== 'object') return JSON.stringify(node);

        var i, out;
        if (Array.isArray(node)) {
            out = '[';
            for (i = 0; i < node.length; i++) {
                if (i) out += ',';
                out += stringify(node[i]) || 'null';
            }
            return out + ']';
        }

        if (node === null) return 'null';

        if (seen.indexOf(node) !== -1) {
            if (cycles) return JSON.stringify('__cycle__');
            throw new TypeError('Converting circular structure to JSON');
        }

        var seenIndex = seen.push(node) - 1;
        var keys = Object.keys(node).sort(cmp && cmp(node));
        out = '';
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = stringify(node[key]);

            if (!value) continue;
            if (out) out += ',';
            out += JSON.stringify(key) + ':' + value;
        }
        seen.splice(seenIndex, 1);
        return '{' + out + '}';
    })(data);
};

var fclone = createCommonjsModule(function (module) {
(function (root, factory) {
    if (module.exports) {
			  //node
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.fclone = factory();
    }
}(commonjsGlobal, function () {

// see if it looks and smells like an iterable object, and do accept length === 0

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function isArrayLike(item) {
  if (Array.isArray(item)) return true;

  var len = item && item.length;
  return typeof len === 'number' && (len === 0 || len - 1 in item) && typeof item.indexOf === 'function';
}

function fclone(obj, refs) {
  if (!obj || "object" !== (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;

  if (obj instanceof Date) {
    return new Date(obj);
  }

  if (typeof Buffer !== 'undefined' && Buffer.isBuffer(obj)) {
    return new Buffer(obj);
  }

  // typed array Int32Array etc.
  if (typeof obj.subarray === 'function' && /[A-Z][A-Za-z\d]+Array/.test(Object.prototype.toString.call(obj))) {
    return obj.subarray(0);
  }

  if (!refs) {
    refs = [];
  }

  if (isArrayLike(obj)) {
    refs[refs.length] = obj;
    var _l = obj.length;
    var i = -1;
    var _copy = [];

    while (_l > ++i) {
      _copy[i] = ~refs.indexOf(obj[i]) ? '[Circular]' : fclone(obj[i], refs);
    }

    refs.length && refs.length--;
    return _copy;
  }

  refs[refs.length] = obj;
  var copy = {};

  if (obj instanceof Error) {
    copy.name = obj.name;
    copy.message = obj.message;
    copy.stack = obj.stack;
  }

  var keys = Object.keys(obj);
  var l = keys.length;

  while (l--) {
    var k = keys[l];
    copy[k] = ~refs.indexOf(obj[k]) ? '[Circular]' : fclone(obj[k], refs);
  }

  refs.length && refs.length--;
  return copy;
}

fclone.default = fclone;
  return fclone
}));
});

var bundle_umd = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, fastJsonStableStringify, fclone);
}(commonjsGlobal, (function (exports,stringify,fclone$$1) {
    stringify = stringify && stringify.hasOwnProperty('default') ? stringify['default'] : stringify;
    fclone$$1 = fclone$$1 && fclone$$1.hasOwnProperty('default') ? fclone$$1['default'] : fclone$$1;

    var __assign = function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function isScalarValue(value) {
        return ['StringValue', 'BooleanValue', 'EnumValue'].indexOf(value.kind) > -1;
    }
    function isNumberValue(value) {
        return ['IntValue', 'FloatValue'].indexOf(value.kind) > -1;
    }
    function isStringValue(value) {
        return value.kind === 'StringValue';
    }
    function isBooleanValue(value) {
        return value.kind === 'BooleanValue';
    }
    function isIntValue(value) {
        return value.kind === 'IntValue';
    }
    function isFloatValue(value) {
        return value.kind === 'FloatValue';
    }
    function isVariable(value) {
        return value.kind === 'Variable';
    }
    function isObjectValue(value) {
        return value.kind === 'ObjectValue';
    }
    function isListValue(value) {
        return value.kind === 'ListValue';
    }
    function isEnumValue(value) {
        return value.kind === 'EnumValue';
    }
    function isNullValue(value) {
        return value.kind === 'NullValue';
    }
    function valueToObjectRepresentation(argObj, name, value, variables) {
        if (isIntValue(value) || isFloatValue(value)) {
            argObj[name.value] = Number(value.value);
        }
        else if (isBooleanValue(value) || isStringValue(value)) {
            argObj[name.value] = value.value;
        }
        else if (isObjectValue(value)) {
            var nestedArgObj_1 = {};
            value.fields.map(function (obj) {
                return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
            });
            argObj[name.value] = nestedArgObj_1;
        }
        else if (isVariable(value)) {
            var variableValue = (variables || {})[value.name.value];
            argObj[name.value] = variableValue;
        }
        else if (isListValue(value)) {
            argObj[name.value] = value.values.map(function (listValue) {
                var nestedArgArrayObj = {};
                valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
                return nestedArgArrayObj[name.value];
            });
        }
        else if (isEnumValue(value)) {
            argObj[name.value] = value.value;
        }
        else if (isNullValue(value)) {
            argObj[name.value] = null;
        }
        else {
            throw new Error("The inline argument \"" + name.value + "\" of kind \"" + value.kind + "\"" +
                'is not supported. Use variables instead of inline arguments to ' +
                'overcome this limitation.');
        }
    }
    function storeKeyNameFromField(field, variables) {
        var directivesObj = null;
        if (field.directives) {
            directivesObj = {};
            field.directives.forEach(function (directive) {
                directivesObj[directive.name.value] = {};
                if (directive.arguments) {
                    directive.arguments.forEach(function (_a) {
                        var name = _a.name, value = _a.value;
                        return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
                    });
                }
            });
        }
        var argObj = null;
        if (field.arguments && field.arguments.length) {
            argObj = {};
            field.arguments.forEach(function (_a) {
                var name = _a.name, value = _a.value;
                return valueToObjectRepresentation(argObj, name, value, variables);
            });
        }
        return getStoreKeyName(field.name.value, argObj, directivesObj);
    }
    var KNOWN_DIRECTIVES = [
        'connection',
        'include',
        'skip',
        'client',
        'rest',
        'export',
    ];
    function getStoreKeyName(fieldName, args, directives) {
        if (directives &&
            directives['connection'] &&
            directives['connection']['key']) {
            if (directives['connection']['filter'] &&
                directives['connection']['filter'].length > 0) {
                var filterKeys = directives['connection']['filter']
                    ? directives['connection']['filter']
                    : [];
                filterKeys.sort();
                var queryArgs_1 = args;
                var filteredArgs_1 = {};
                filterKeys.forEach(function (key) {
                    filteredArgs_1[key] = queryArgs_1[key];
                });
                return directives['connection']['key'] + "(" + JSON.stringify(filteredArgs_1) + ")";
            }
            else {
                return directives['connection']['key'];
            }
        }
        var completeFieldName = fieldName;
        if (args) {
            var stringifiedArgs = stringify(args);
            completeFieldName += "(" + stringifiedArgs + ")";
        }
        if (directives) {
            Object.keys(directives).forEach(function (key) {
                if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
                    return;
                if (directives[key] && Object.keys(directives[key]).length) {
                    completeFieldName += "@" + key + "(" + JSON.stringify(directives[key]) + ")";
                }
                else {
                    completeFieldName += "@" + key;
                }
            });
        }
        return completeFieldName;
    }
    function argumentsObjectFromField(field, variables) {
        if (field.arguments && field.arguments.length) {
            var argObj_1 = {};
            field.arguments.forEach(function (_a) {
                var name = _a.name, value = _a.value;
                return valueToObjectRepresentation(argObj_1, name, value, variables);
            });
            return argObj_1;
        }
        return null;
    }
    function resultKeyNameFromField(field) {
        return field.alias ? field.alias.value : field.name.value;
    }
    function isField(selection) {
        return selection.kind === 'Field';
    }
    function isInlineFragment(selection) {
        return selection.kind === 'InlineFragment';
    }
    function isIdValue(idObject) {
        return idObject && idObject.type === 'id';
    }
    function toIdValue(idConfig, generated) {
        if (generated === void 0) { generated = false; }
        return __assign({ type: 'id', generated: generated }, (typeof idConfig === 'string'
            ? { id: idConfig, typename: undefined }
            : idConfig));
    }
    function isJsonValue(jsonObject) {
        return (jsonObject != null &&
            typeof jsonObject === 'object' &&
            jsonObject.type === 'json');
    }
    function defaultValueFromVariable(node) {
        throw new Error("Variable nodes are not supported by valueFromNode");
    }
    function valueFromNode(node, onVariable) {
        if (onVariable === void 0) { onVariable = defaultValueFromVariable; }
        switch (node.kind) {
            case 'Variable':
                return onVariable(node);
            case 'NullValue':
                return null;
            case 'IntValue':
                return parseInt(node.value, 10);
            case 'FloatValue':
                return parseFloat(node.value);
            case 'ListValue':
                return node.values.map(function (v) { return valueFromNode(v, onVariable); });
            case 'ObjectValue': {
                var value = {};
                for (var _i = 0, _a = node.fields; _i < _a.length; _i++) {
                    var field = _a[_i];
                    value[field.name.value] = valueFromNode(field.value, onVariable);
                }
                return value;
            }
            default:
                return node.value;
        }
    }

    function getDirectiveInfoFromField(field, variables) {
        if (field.directives && field.directives.length) {
            var directiveObj_1 = {};
            field.directives.forEach(function (directive) {
                directiveObj_1[directive.name.value] = argumentsObjectFromField(directive, variables);
            });
            return directiveObj_1;
        }
        return null;
    }
    function shouldInclude(selection, variables) {
        if (variables === void 0) { variables = {}; }
        if (!selection.directives) {
            return true;
        }
        var res = true;
        selection.directives.forEach(function (directive) {
            if (directive.name.value !== 'skip' && directive.name.value !== 'include') {
                return;
            }
            var directiveArguments = directive.arguments || [];
            var directiveName = directive.name.value;
            if (directiveArguments.length !== 1) {
                throw new Error("Incorrect number of arguments for the @" + directiveName + " directive.");
            }
            var ifArgument = directiveArguments[0];
            if (!ifArgument.name || ifArgument.name.value !== 'if') {
                throw new Error("Invalid argument for the @" + directiveName + " directive.");
            }
            var ifValue = directiveArguments[0].value;
            var evaledValue = false;
            if (!ifValue || ifValue.kind !== 'BooleanValue') {
                if (ifValue.kind !== 'Variable') {
                    throw new Error("Argument for the @" + directiveName + " directive must be a variable or a boolean value.");
                }
                else {
                    evaledValue = variables[ifValue.name.value];
                    if (evaledValue === undefined) {
                        throw new Error("Invalid variable referenced in @" + directiveName + " directive.");
                    }
                }
            }
            else {
                evaledValue = ifValue.value;
            }
            if (directiveName === 'skip') {
                evaledValue = !evaledValue;
            }
            if (!evaledValue) {
                res = false;
            }
        });
        return res;
    }
    function flattenSelections(selection) {
        if (!selection.selectionSet ||
            !(selection.selectionSet.selections.length > 0))
            return [selection];
        return [selection].concat(selection.selectionSet.selections
            .map(function (selectionNode) {
            return [selectionNode].concat(flattenSelections(selectionNode));
        })
            .reduce(function (selections, selected) { return selections.concat(selected); }, []));
    }
    function getDirectiveNames(doc) {
        var directiveNames = doc.definitions
            .filter(function (definition) {
            return definition.selectionSet && definition.selectionSet.selections;
        })
            .map(function (x) { return flattenSelections(x); })
            .reduce(function (selections, selected) { return selections.concat(selected); }, [])
            .filter(function (selection) {
            return selection.directives && selection.directives.length > 0;
        })
            .map(function (selection) { return selection.directives; })
            .reduce(function (directives, directive) { return directives.concat(directive); }, [])
            .map(function (directive) { return directive.name.value; });
        return directiveNames;
    }
    function hasDirectives(names, doc) {
        return getDirectiveNames(doc).some(function (name) { return names.indexOf(name) > -1; });
    }

    var __assign$1 = function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    function getFragmentQueryDocument(document, fragmentName) {
        var actualFragmentName = fragmentName;
        var fragments = [];
        document.definitions.forEach(function (definition) {
            if (definition.kind === 'OperationDefinition') {
                throw new Error("Found a " + definition.operation + " operation" + (definition.name ? " named '" + definition.name.value + "'" : '') + ". " +
                    'No operations are allowed when using a fragment as a query. Only fragments are allowed.');
            }
            if (definition.kind === 'FragmentDefinition') {
                fragments.push(definition);
            }
        });
        if (typeof actualFragmentName === 'undefined') {
            if (fragments.length !== 1) {
                throw new Error("Found " + fragments.length + " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.");
            }
            actualFragmentName = fragments[0].name.value;
        }
        var query = __assign$1({}, document, { definitions: [
                {
                    kind: 'OperationDefinition',
                    operation: 'query',
                    selectionSet: {
                        kind: 'SelectionSet',
                        selections: [
                            {
                                kind: 'FragmentSpread',
                                name: {
                                    kind: 'Name',
                                    value: actualFragmentName,
                                },
                            },
                        ],
                    },
                }
            ].concat(document.definitions) });
        return query;
    }

    function assign(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            if (typeof source === 'undefined' || source === null) {
                return;
            }
            Object.keys(source).forEach(function (key) {
                target[key] = source[key];
            });
        });
        return target;
    }

    function getMutationDefinition(doc) {
        checkDocument(doc);
        var mutationDef = doc.definitions.filter(function (definition) {
            return definition.kind === 'OperationDefinition' &&
                definition.operation === 'mutation';
        })[0];
        if (!mutationDef) {
            throw new Error('Must contain a mutation definition.');
        }
        return mutationDef;
    }
    function checkDocument(doc) {
        if (doc.kind !== 'Document') {
            throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
        }
        var operations = doc.definitions
            .filter(function (d) { return d.kind !== 'FragmentDefinition'; })
            .map(function (definition) {
            if (definition.kind !== 'OperationDefinition') {
                throw new Error("Schema type definitions not allowed in queries. Found: \"" + definition.kind + "\"");
            }
            return definition;
        });
        if (operations.length > 1) {
            throw new Error("Ambiguous GraphQL document: contains " + operations.length + " operations");
        }
    }
    function getOperationDefinition(doc) {
        checkDocument(doc);
        return doc.definitions.filter(function (definition) { return definition.kind === 'OperationDefinition'; })[0];
    }
    function getOperationDefinitionOrDie(document) {
        var def = getOperationDefinition(document);
        if (!def) {
            throw new Error("GraphQL document is missing an operation");
        }
        return def;
    }
    function getOperationName(doc) {
        return (doc.definitions
            .filter(function (definition) {
            return definition.kind === 'OperationDefinition' && definition.name;
        })
            .map(function (x) { return x.name.value; })[0] || null);
    }
    function getFragmentDefinitions(doc) {
        return doc.definitions.filter(function (definition) { return definition.kind === 'FragmentDefinition'; });
    }
    function getQueryDefinition(doc) {
        var queryDef = getOperationDefinition(doc);
        if (!queryDef || queryDef.operation !== 'query') {
            throw new Error('Must contain a query definition.');
        }
        return queryDef;
    }
    function getFragmentDefinition(doc) {
        if (doc.kind !== 'Document') {
            throw new Error("Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a \"gql\" tag? http://docs.apollostack.com/apollo-client/core.html#gql");
        }
        if (doc.definitions.length > 1) {
            throw new Error('Fragment must have exactly one definition.');
        }
        var fragmentDef = doc.definitions[0];
        if (fragmentDef.kind !== 'FragmentDefinition') {
            throw new Error('Must be a fragment definition.');
        }
        return fragmentDef;
    }
    function getMainDefinition(queryDoc) {
        checkDocument(queryDoc);
        var fragmentDefinition;
        for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
            var definition = _a[_i];
            if (definition.kind === 'OperationDefinition') {
                var operation = definition.operation;
                if (operation === 'query' ||
                    operation === 'mutation' ||
                    operation === 'subscription') {
                    return definition;
                }
            }
            if (definition.kind === 'FragmentDefinition' && !fragmentDefinition) {
                fragmentDefinition = definition;
            }
        }
        if (fragmentDefinition) {
            return fragmentDefinition;
        }
        throw new Error('Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.');
    }
    function createFragmentMap(fragments) {
        if (fragments === void 0) { fragments = []; }
        var symTable = {};
        fragments.forEach(function (fragment) {
            symTable[fragment.name.value] = fragment;
        });
        return symTable;
    }
    function getDefaultValues(definition) {
        if (definition &&
            definition.variableDefinitions &&
            definition.variableDefinitions.length) {
            var defaultValues = definition.variableDefinitions
                .filter(function (_a) {
                var defaultValue = _a.defaultValue;
                return defaultValue;
            })
                .map(function (_a) {
                var variable = _a.variable, defaultValue = _a.defaultValue;
                var defaultValueObj = {};
                valueToObjectRepresentation(defaultValueObj, variable.name, defaultValue);
                return defaultValueObj;
            });
            return assign.apply(void 0, [{}].concat(defaultValues));
        }
        return {};
    }
    function variablesInOperation(operation) {
        var names = new Set();
        if (operation.variableDefinitions) {
            for (var _i = 0, _a = operation.variableDefinitions; _i < _a.length; _i++) {
                var definition = _a[_i];
                names.add(definition.variable.name.value);
            }
        }
        return names;
    }

    function cloneDeep(value) {
        return fclone$$1(value);
    }

    var TYPENAME_FIELD = {
        kind: 'Field',
        name: {
            kind: 'Name',
            value: '__typename',
        },
    };
    function isNotEmpty(op, fragments) {
        return (op.selectionSet.selections.filter(function (selectionSet) {
            return !(selectionSet &&
                selectionSet.kind === 'FragmentSpread' &&
                !isNotEmpty(fragments[selectionSet.name.value], fragments));
        }).length > 0);
    }
    function getDirectiveMatcher(directives) {
        return function directiveMatcher(directive) {
            return directives.some(function (dir) {
                if (dir.name && dir.name === directive.name.value)
                    return true;
                if (dir.test && dir.test(directive))
                    return true;
                return false;
            });
        };
    }
    function addTypenameToSelectionSet(selectionSet, isRoot) {
        if (isRoot === void 0) { isRoot = false; }
        if (selectionSet.selections) {
            if (!isRoot) {
                var alreadyHasThisField = selectionSet.selections.some(function (selection) {
                    return (selection.kind === 'Field' &&
                        selection.name.value === '__typename');
                });
                if (!alreadyHasThisField) {
                    selectionSet.selections.push(TYPENAME_FIELD);
                }
            }
            selectionSet.selections.forEach(function (selection) {
                if (selection.kind === 'Field') {
                    if (selection.name.value.lastIndexOf('__', 0) !== 0 &&
                        selection.selectionSet) {
                        addTypenameToSelectionSet(selection.selectionSet);
                    }
                }
                else if (selection.kind === 'InlineFragment') {
                    if (selection.selectionSet) {
                        addTypenameToSelectionSet(selection.selectionSet);
                    }
                }
            });
        }
    }
    function removeDirectivesFromSelectionSet(directives, selectionSet) {
        if (!selectionSet.selections)
            return selectionSet;
        var agressiveRemove = directives.some(function (dir) { return dir.remove; });
        selectionSet.selections = selectionSet.selections
            .map(function (selection) {
            if (selection.kind !== 'Field' ||
                !selection ||
                !selection.directives)
                return selection;
            var directiveMatcher = getDirectiveMatcher(directives);
            var remove;
            selection.directives = selection.directives.filter(function (directive) {
                var shouldKeep = !directiveMatcher(directive);
                if (!remove && !shouldKeep && agressiveRemove)
                    remove = true;
                return shouldKeep;
            });
            return remove ? null : selection;
        })
            .filter(function (x) { return !!x; });
        selectionSet.selections.forEach(function (selection) {
            if ((selection.kind === 'Field' || selection.kind === 'InlineFragment') &&
                selection.selectionSet) {
                removeDirectivesFromSelectionSet(directives, selection.selectionSet);
            }
        });
        return selectionSet;
    }
    function removeDirectivesFromDocument(directives, doc) {
        var docClone = cloneDeep(doc);
        docClone.definitions.forEach(function (definition) {
            removeDirectivesFromSelectionSet(directives, definition.selectionSet);
        });
        var operation = getOperationDefinitionOrDie(docClone);
        var fragments = createFragmentMap(getFragmentDefinitions(docClone));
        return isNotEmpty(operation, fragments) ? docClone : null;
    }
    function addTypenameToDocument(doc) {
        checkDocument(doc);
        var docClone = cloneDeep(doc);
        docClone.definitions.forEach(function (definition) {
            var isRoot = definition.kind === 'OperationDefinition';
            addTypenameToSelectionSet(definition.selectionSet, isRoot);
        });
        return docClone;
    }
    var connectionRemoveConfig = {
        test: function (directive) {
            var willRemove = directive.name.value === 'connection';
            if (willRemove) {
                if (!directive.arguments ||
                    !directive.arguments.some(function (arg) { return arg.name.value === 'key'; })) {
                    console.warn('Removing an @connection directive even though it does not have a key. ' +
                        'You may want to use the key parameter to specify a store key.');
                }
            }
            return willRemove;
        },
    };
    function removeConnectionDirectiveFromDocument(doc) {
        checkDocument(doc);
        return removeDirectivesFromDocument([connectionRemoveConfig], doc);
    }
    function hasDirectivesInSelectionSet(directives, selectionSet, nestedCheck) {
        if (nestedCheck === void 0) { nestedCheck = true; }
        if (!(selectionSet && selectionSet.selections)) {
            return false;
        }
        var matchedSelections = selectionSet.selections.filter(function (selection) {
            return hasDirectivesInSelection(directives, selection, nestedCheck);
        });
        return matchedSelections.length > 0;
    }
    function hasDirectivesInSelection(directives, selection, nestedCheck) {
        if (nestedCheck === void 0) { nestedCheck = true; }
        if (selection.kind !== 'Field' || !selection) {
            return true;
        }
        if (!selection.directives) {
            return false;
        }
        var directiveMatcher = getDirectiveMatcher(directives);
        var matchedDirectives = selection.directives.filter(directiveMatcher);
        return (matchedDirectives.length > 0 ||
            (nestedCheck &&
                hasDirectivesInSelectionSet(directives, selection.selectionSet, nestedCheck)));
    }
    function getDirectivesFromSelectionSet(directives, selectionSet) {
        selectionSet.selections = selectionSet.selections
            .filter(function (selection) {
            return hasDirectivesInSelection(directives, selection, true);
        })
            .map(function (selection) {
            if (hasDirectivesInSelection(directives, selection, false)) {
                return selection;
            }
            if ((selection.kind === 'Field' || selection.kind === 'InlineFragment') &&
                selection.selectionSet) {
                selection.selectionSet = getDirectivesFromSelectionSet(directives, selection.selectionSet);
            }
            return selection;
        });
        return selectionSet;
    }
    function getDirectivesFromDocument(directives, doc, includeAllFragments) {
        if (includeAllFragments === void 0) { includeAllFragments = false; }
        checkDocument(doc);
        var docClone = cloneDeep(doc);
        docClone.definitions = docClone.definitions.map(function (definition) {
            if ((definition.kind === 'OperationDefinition' ||
                (definition.kind === 'FragmentDefinition' && !includeAllFragments)) &&
                definition.selectionSet) {
                definition.selectionSet = getDirectivesFromSelectionSet(directives, definition.selectionSet);
            }
            return definition;
        });
        var operation = getOperationDefinitionOrDie(docClone);
        var fragments = createFragmentMap(getFragmentDefinitions(docClone));
        return isNotEmpty(operation, fragments) ? docClone : null;
    }

    function getEnv() {
        if (typeof process !== 'undefined' && process.env.NODE_ENV) {
            return process.env.NODE_ENV;
        }
        return 'development';
    }
    function isEnv(env) {
        return getEnv() === env;
    }
    function isProduction() {
        return isEnv('production') === true;
    }
    function isDevelopment() {
        return isEnv('development') === true;
    }
    function isTest() {
        return isEnv('test') === true;
    }

    function tryFunctionOrLogError(f) {
        try {
            return f();
        }
        catch (e) {
            if (console.error) {
                console.error(e);
            }
        }
    }
    function graphQLResultHasError(result) {
        return result.errors && result.errors.length;
    }

    function isEqual(a, b) {
        if (a === b) {
            return true;
        }
        if (a instanceof Date && b instanceof Date) {
            return a.getTime() === b.getTime();
        }
        if (a != null &&
            typeof a === 'object' &&
            b != null &&
            typeof b === 'object') {
            for (var key in a) {
                if (Object.prototype.hasOwnProperty.call(a, key)) {
                    if (!Object.prototype.hasOwnProperty.call(b, key)) {
                        return false;
                    }
                    if (!isEqual(a[key], b[key])) {
                        return false;
                    }
                }
            }
            for (var key in b) {
                if (!Object.prototype.hasOwnProperty.call(a, key)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    function deepFreeze(o) {
        Object.freeze(o);
        Object.getOwnPropertyNames(o).forEach(function (prop) {
            if (o[prop] !== null &&
                (typeof o[prop] === 'object' || typeof o[prop] === 'function') &&
                !Object.isFrozen(o[prop])) {
                deepFreeze(o[prop]);
            }
        });
        return o;
    }
    function maybeDeepFreeze(obj) {
        if (isDevelopment() || isTest()) {
            var symbolIsPolyfilled = typeof Symbol === 'function' && typeof Symbol('') === 'string';
            if (!symbolIsPolyfilled) {
                return deepFreeze(obj);
            }
        }
        return obj;
    }

    var haveWarned = Object.create({});
    function warnOnceInDevelopment(msg, type) {
        if (type === void 0) { type = 'warn'; }
        if (isProduction()) {
            return;
        }
        if (!haveWarned[msg]) {
            if (!isTest()) {
                haveWarned[msg] = true;
            }
            switch (type) {
                case 'error':
                    console.error(msg);
                    break;
                default:
                    console.warn(msg);
            }
        }
    }

    function stripSymbols(data) {
        return JSON.parse(JSON.stringify(data));
    }

    exports.getDirectiveInfoFromField = getDirectiveInfoFromField;
    exports.shouldInclude = shouldInclude;
    exports.flattenSelections = flattenSelections;
    exports.getDirectiveNames = getDirectiveNames;
    exports.hasDirectives = hasDirectives;
    exports.getFragmentQueryDocument = getFragmentQueryDocument;
    exports.getMutationDefinition = getMutationDefinition;
    exports.checkDocument = checkDocument;
    exports.getOperationDefinition = getOperationDefinition;
    exports.getOperationDefinitionOrDie = getOperationDefinitionOrDie;
    exports.getOperationName = getOperationName;
    exports.getFragmentDefinitions = getFragmentDefinitions;
    exports.getQueryDefinition = getQueryDefinition;
    exports.getFragmentDefinition = getFragmentDefinition;
    exports.getMainDefinition = getMainDefinition;
    exports.createFragmentMap = createFragmentMap;
    exports.getDefaultValues = getDefaultValues;
    exports.variablesInOperation = variablesInOperation;
    exports.removeDirectivesFromDocument = removeDirectivesFromDocument;
    exports.addTypenameToDocument = addTypenameToDocument;
    exports.removeConnectionDirectiveFromDocument = removeConnectionDirectiveFromDocument;
    exports.getDirectivesFromDocument = getDirectivesFromDocument;
    exports.isScalarValue = isScalarValue;
    exports.isNumberValue = isNumberValue;
    exports.valueToObjectRepresentation = valueToObjectRepresentation;
    exports.storeKeyNameFromField = storeKeyNameFromField;
    exports.getStoreKeyName = getStoreKeyName;
    exports.argumentsObjectFromField = argumentsObjectFromField;
    exports.resultKeyNameFromField = resultKeyNameFromField;
    exports.isField = isField;
    exports.isInlineFragment = isInlineFragment;
    exports.isIdValue = isIdValue;
    exports.toIdValue = toIdValue;
    exports.isJsonValue = isJsonValue;
    exports.valueFromNode = valueFromNode;
    exports.assign = assign;
    exports.cloneDeep = cloneDeep;
    exports.getEnv = getEnv;
    exports.isEnv = isEnv;
    exports.isProduction = isProduction;
    exports.isDevelopment = isDevelopment;
    exports.isTest = isTest;
    exports.tryFunctionOrLogError = tryFunctionOrLogError;
    exports.graphQLResultHasError = graphQLResultHasError;
    exports.isEqual = isEqual;
    exports.maybeDeepFreeze = maybeDeepFreeze;
    exports.warnOnceInDevelopment = warnOnceInDevelopment;
    exports.stripSymbols = stripSymbols;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd);

var Observable_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// === Symbol Support ===

var hasSymbols = function () {
  return typeof Symbol === 'function';
};
var hasSymbol = function (name) {
  return hasSymbols() && Boolean(Symbol[name]);
};
var getSymbol = function (name) {
  return hasSymbol(name) ? Symbol[name] : '@@' + name;
};

if (hasSymbols() && !hasSymbol('observable')) {
  Symbol.observable = Symbol('observable');
}

// === Abstract Operations ===

function getMethod(obj, key) {
  var value = obj[key];

  if (value == null) return undefined;

  if (typeof value !== 'function') throw new TypeError(value + ' is not a function');

  return value;
}

function getSpecies(obj) {
  var ctor = obj.constructor;
  if (ctor !== undefined) {
    ctor = ctor[getSymbol('species')];
    if (ctor === null) {
      ctor = undefined;
    }
  }
  return ctor !== undefined ? ctor : Observable;
}

function isObservable(x) {
  return x instanceof Observable; // SPEC: Brand check
}

function hostReportError(e) {
  if (hostReportError.log) {
    hostReportError.log(e);
  } else {
    setTimeout(function () {
      throw e;
    });
  }
}

function enqueue(fn) {
  Promise.resolve().then(function () {
    try {
      fn();
    } catch (e) {
      hostReportError(e);
    }
  });
}

function cleanupSubscription(subscription) {
  var cleanup = subscription._cleanup;
  if (cleanup === undefined) return;

  subscription._cleanup = undefined;

  if (!cleanup) {
    return;
  }

  try {
    if (typeof cleanup === 'function') {
      cleanup();
    } else {
      var unsubscribe = getMethod(cleanup, 'unsubscribe');
      if (unsubscribe) {
        unsubscribe.call(cleanup);
      }
    }
  } catch (e) {
    hostReportError(e);
  }
}

function closeSubscription(subscription) {
  subscription._observer = undefined;
  subscription._queue = undefined;
  subscription._state = 'closed';
}

function flushSubscription(subscription) {
  var queue = subscription._queue;
  if (!queue) {
    return;
  }
  subscription._queue = undefined;
  subscription._state = 'ready';
  for (var i = 0; i < queue.length; ++i) {
    notifySubscription(subscription, queue[i].type, queue[i].value);
    if (subscription._state === 'closed') break;
  }
}

function notifySubscription(subscription, type, value) {
  subscription._state = 'running';

  var observer = subscription._observer;

  try {
    var m = getMethod(observer, type);
    switch (type) {
      case 'next':
        if (m) m.call(observer, value);
        break;
      case 'error':
        closeSubscription(subscription);
        if (m) m.call(observer, value);else throw value;
        break;
      case 'complete':
        closeSubscription(subscription);
        if (m) m.call(observer);
        break;
    }
  } catch (e) {
    hostReportError(e);
  }

  if (subscription._state === 'closed') cleanupSubscription(subscription);else if (subscription._state === 'running') subscription._state = 'ready';
}

function onNotify(subscription, type, value) {
  if (subscription._state === 'closed') return;

  if (subscription._state === 'buffering') {
    subscription._queue.push({ type: type, value: value });
    return;
  }

  if (subscription._state !== 'ready') {
    subscription._state = 'buffering';
    subscription._queue = [{ type: type, value: value }];
    enqueue(function () {
      return flushSubscription(subscription);
    });
    return;
  }

  notifySubscription(subscription, type, value);
}

var Subscription = function () {
  function Subscription(observer, subscriber) {
    _classCallCheck(this, Subscription);

    // ASSERT: observer is an object
    // ASSERT: subscriber is callable

    this._cleanup = undefined;
    this._observer = observer;
    this._queue = undefined;
    this._state = 'initializing';

    var subscriptionObserver = new SubscriptionObserver(this);

    try {
      this._cleanup = subscriber.call(undefined, subscriptionObserver);
    } catch (e) {
      subscriptionObserver.error(e);
    }

    if (this._state === 'initializing') this._state = 'ready';
  }

  _createClass(Subscription, [{
    key: 'unsubscribe',
    value: function unsubscribe() {
      if (this._state !== 'closed') {
        closeSubscription(this);
        cleanupSubscription(this);
      }
    }
  }, {
    key: 'closed',
    get: function () {
      return this._state === 'closed';
    }
  }]);

  return Subscription;
}();

var SubscriptionObserver = function () {
  function SubscriptionObserver(subscription) {
    _classCallCheck(this, SubscriptionObserver);

    this._subscription = subscription;
  }

  _createClass(SubscriptionObserver, [{
    key: 'next',
    value: function next(value) {
      onNotify(this._subscription, 'next', value);
    }
  }, {
    key: 'error',
    value: function error(value) {
      onNotify(this._subscription, 'error', value);
    }
  }, {
    key: 'complete',
    value: function complete() {
      onNotify(this._subscription, 'complete');
    }
  }, {
    key: 'closed',
    get: function () {
      return this._subscription._state === 'closed';
    }
  }]);

  return SubscriptionObserver;
}();

var Observable = exports.Observable = function () {
  function Observable(subscriber) {
    _classCallCheck(this, Observable);

    if (!(this instanceof Observable)) throw new TypeError('Observable cannot be called as a function');

    if (typeof subscriber !== 'function') throw new TypeError('Observable initializer must be a function');

    this._subscriber = subscriber;
  }

  _createClass(Observable, [{
    key: 'subscribe',
    value: function subscribe(observer) {
      if (typeof observer !== 'object' || observer === null) {
        observer = {
          next: observer,
          error: arguments[1],
          complete: arguments[2]
        };
      }
      return new Subscription(observer, this._subscriber);
    }
  }, {
    key: 'forEach',
    value: function forEach(fn) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (typeof fn !== 'function') {
          reject(new TypeError(fn + ' is not a function'));
          return;
        }

        function done() {
          subscription.unsubscribe();
          resolve();
        }

        var subscription = _this.subscribe({
          next: function (value) {
            try {
              fn(value, done);
            } catch (e) {
              reject(e);
              subscription.unsubscribe();
            }
          },

          error: reject,
          complete: resolve
        });
      });
    }
  }, {
    key: 'map',
    value: function map(fn) {
      var _this2 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        return _this2.subscribe({
          next: function (value) {
            try {
              value = fn(value);
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'filter',
    value: function filter(fn) {
      var _this3 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        return _this3.subscribe({
          next: function (value) {
            try {
              if (!fn(value)) return;
            } catch (e) {
              return observer.error(e);
            }
            observer.next(value);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'reduce',
    value: function reduce(fn) {
      var _this4 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);
      var hasSeed = arguments.length > 1;
      var hasValue = false;
      var seed = arguments[1];
      var acc = seed;

      return new C(function (observer) {
        return _this4.subscribe({
          next: function (value) {
            var first = !hasValue;
            hasValue = true;

            if (!first || hasSeed) {
              try {
                acc = fn(acc, value);
              } catch (e) {
                return observer.error(e);
              }
            } else {
              acc = value;
            }
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            if (!hasValue && !hasSeed) return observer.error(new TypeError('Cannot reduce an empty sequence'));

            observer.next(acc);
            observer.complete();
          }
        });
      });
    }
  }, {
    key: 'concat',
    value: function concat() {
      var _this5 = this;

      for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      var C = getSpecies(this);

      return new C(function (observer) {
        var subscription = void 0;

        function startNext(next) {
          subscription = next.subscribe({
            next: function (v) {
              observer.next(v);
            },
            error: function (e) {
              observer.error(e);
            },
            complete: function () {
              if (sources.length === 0) {
                subscription = undefined;
                observer.complete();
              } else {
                startNext(C.from(sources.shift()));
              }
            }
          });
        }

        startNext(_this5);

        return function () {
          if (subscription) {
            subscription.unsubscribe();
            subscription = undefined;
          }
        };
      });
    }
  }, {
    key: 'flatMap',
    value: function flatMap(fn) {
      var _this6 = this;

      if (typeof fn !== 'function') throw new TypeError(fn + ' is not a function');

      var C = getSpecies(this);

      return new C(function (observer) {
        var subscriptions = [];

        var outer = _this6.subscribe({
          next: function (value) {
            if (fn) {
              try {
                value = fn(value);
              } catch (e) {
                return observer.error(e);
              }
            }

            var inner = C.from(value).subscribe({
              next: function (value) {
                observer.next(value);
              },
              error: function (e) {
                observer.error(e);
              },
              complete: function () {
                var i = subscriptions.indexOf(inner);
                if (i >= 0) subscriptions.splice(i, 1);
                completeIfDone();
              }
            });

            subscriptions.push(inner);
          },
          error: function (e) {
            observer.error(e);
          },
          complete: function () {
            completeIfDone();
          }
        });

        function completeIfDone() {
          if (outer.closed && subscriptions.length === 0) observer.complete();
        }

        return function () {
          subscriptions.forEach(function (s) {
            return s.unsubscribe();
          });
          outer.unsubscribe();
        };
      });
    }
  }, {
    key: getSymbol('observable'),
    value: function () {
      return this;
    }
  }], [{
    key: 'from',
    value: function from(x) {
      var C = typeof this === 'function' ? this : Observable;

      if (x == null) throw new TypeError(x + ' is not an object');

      var method = getMethod(x, getSymbol('observable'));
      if (method) {
        var observable = method.call(x);

        if (Object(observable) !== observable) throw new TypeError(observable + ' is not an object');

        if (isObservable(observable) && observable.constructor === C) return observable;

        return new C(function (observer) {
          return observable.subscribe(observer);
        });
      }

      if (hasSymbol('iterator')) {
        method = getMethod(x, getSymbol('iterator'));
        if (method) {
          return new C(function (observer) {
            enqueue(function () {
              if (observer.closed) return;
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = method.call(x)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var item = _step.value;

                  observer.next(item);
                  if (observer.closed) return;
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }

              observer.complete();
            });
          });
        }
      }

      if (Array.isArray(x)) {
        return new C(function (observer) {
          enqueue(function () {
            if (observer.closed) return;
            for (var i = 0; i < x.length; ++i) {
              observer.next(x[i]);
              if (observer.closed) return;
            }
            observer.complete();
          });
        });
      }

      throw new TypeError(x + ' is not observable');
    }
  }, {
    key: 'of',
    value: function of() {
      for (var _len2 = arguments.length, items = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        items[_key2] = arguments[_key2];
      }

      var C = typeof this === 'function' ? this : Observable;

      return new C(function (observer) {
        enqueue(function () {
          if (observer.closed) return;
          for (var i = 0; i < items.length; ++i) {
            observer.next(items[i]);
            if (observer.closed) return;
          }
          observer.complete();
        });
      });
    }
  }, {
    key: getSymbol('species'),
    get: function () {
      return this;
    }
  }]);

  return Observable;
}();

if (hasSymbols()) {
  Object.defineProperty(Observable, Symbol('extensions'), {
    value: {
      symbol: getSymbol('observable'),
      hostReportError: hostReportError
    },
    configurabe: true
  });
}
});

unwrapExports(Observable_1);
var Observable_2 = Observable_1.Observable;

var zenObservable = Observable_1.Observable;

var bundle_umd$2 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
	factory(exports, zenObservable);
}(commonjsGlobal, (function (exports,zenObservable$$1) {
	zenObservable$$1 = zenObservable$$1 && zenObservable$$1.hasOwnProperty('default') ? zenObservable$$1['default'] : zenObservable$$1;

	/* tslint:disable */
	var Observable = zenObservable$$1;

	exports.default = Observable;
	exports.Observable = Observable;

	Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$2);

function _typeof$1(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof$1 = function _typeof(obj) { return typeof obj; }; } else { _typeof$1 = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof$1(obj); }

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */

/**
 * Used to print values in error messages.
 */
function inspect(value) {
  switch (_typeof$1(value)) {
    case 'string':
      return JSON.stringify(value);

    case 'function':
      return value.name ? "[function ".concat(value.name, "]") : '[function]';

    case 'object':
      if (value) {
        if (typeof value.inspect === 'function') {
          return value.inspect();
        } else if (Array.isArray(value)) {
          return '[' + value.map(inspect).join(', ') + ']';
        }

        var properties = Object.keys(value).map(function (k) {
          return "".concat(k, ": ").concat(inspect(value[k]));
        }).join(', ');
        return properties ? '{ ' + properties + ' }' : '{}';
      }

      return String(value);

    default:
      return String(value);
  }
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 */
var QueryDocumentKeys = {
  Name: [],
  Document: ['definitions'],
  OperationDefinition: ['name', 'variableDefinitions', 'directives', 'selectionSet'],
  VariableDefinition: ['variable', 'type', 'defaultValue', 'directives'],
  Variable: ['name'],
  SelectionSet: ['selections'],
  Field: ['alias', 'name', 'arguments', 'directives', 'selectionSet'],
  Argument: ['name', 'value'],
  FragmentSpread: ['name', 'directives'],
  InlineFragment: ['typeCondition', 'directives', 'selectionSet'],
  FragmentDefinition: ['name', // Note: fragment variable definitions are experimental and may be changed
  // or removed in the future.
  'variableDefinitions', 'typeCondition', 'directives', 'selectionSet'],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ['values'],
  ObjectValue: ['fields'],
  ObjectField: ['name', 'value'],
  Directive: ['name', 'arguments'],
  NamedType: ['name'],
  ListType: ['type'],
  NonNullType: ['type'],
  SchemaDefinition: ['directives', 'operationTypes'],
  OperationTypeDefinition: ['type'],
  ScalarTypeDefinition: ['description', 'name', 'directives'],
  ObjectTypeDefinition: ['description', 'name', 'interfaces', 'directives', 'fields'],
  FieldDefinition: ['description', 'name', 'arguments', 'type', 'directives'],
  InputValueDefinition: ['description', 'name', 'type', 'defaultValue', 'directives'],
  InterfaceTypeDefinition: ['description', 'name', 'directives', 'fields'],
  UnionTypeDefinition: ['description', 'name', 'directives', 'types'],
  EnumTypeDefinition: ['description', 'name', 'directives', 'values'],
  EnumValueDefinition: ['description', 'name', 'directives'],
  InputObjectTypeDefinition: ['description', 'name', 'directives', 'fields'],
  DirectiveDefinition: ['description', 'name', 'arguments', 'locations'],
  SchemaExtension: ['directives', 'operationTypes'],
  ScalarTypeExtension: ['name', 'directives'],
  ObjectTypeExtension: ['name', 'interfaces', 'directives', 'fields'],
  InterfaceTypeExtension: ['name', 'directives', 'fields'],
  UnionTypeExtension: ['name', 'directives', 'types'],
  EnumTypeExtension: ['name', 'directives', 'values'],
  InputObjectTypeExtension: ['name', 'directives', 'fields']
};
var BREAK = {};
/**
 * visit() will walk through an AST using a depth first traversal, calling
 * the visitor's enter function at each node in the traversal, and calling the
 * leave function after visiting that node and all of its child nodes.
 *
 * By returning different values from the enter and leave functions, the
 * behavior of the visitor can be altered, including skipping over a sub-tree of
 * the AST (by returning false), editing the AST by returning a value or null
 * to remove the value, or to stop the whole traversal by returning BREAK.
 *
 * When using visit() to edit an AST, the original AST will not be modified, and
 * a new version of the AST with the changes applied will be returned from the
 * visit function.
 *
 *     const editedAST = visit(ast, {
 *       enter(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: skip visiting this node
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       },
 *       leave(node, key, parent, path, ancestors) {
 *         // @return
 *         //   undefined: no action
 *         //   false: no action
 *         //   visitor.BREAK: stop visiting altogether
 *         //   null: delete this node
 *         //   any value: replace this node with the returned value
 *       }
 *     });
 *
 * Alternatively to providing enter() and leave() functions, a visitor can
 * instead provide functions named the same as the kinds of AST nodes, or
 * enter/leave visitors at a named key, leading to four permutations of
 * visitor API:
 *
 * 1) Named visitors triggered when entering a node a specific kind.
 *
 *     visit(ast, {
 *       Kind(node) {
 *         // enter the "Kind" node
 *       }
 *     })
 *
 * 2) Named visitors that trigger upon entering and leaving a node of
 *    a specific kind.
 *
 *     visit(ast, {
 *       Kind: {
 *         enter(node) {
 *           // enter the "Kind" node
 *         }
 *         leave(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 *
 * 3) Generic visitors that trigger upon entering and leaving any node.
 *
 *     visit(ast, {
 *       enter(node) {
 *         // enter any node
 *       },
 *       leave(node) {
 *         // leave any node
 *       }
 *     })
 *
 * 4) Parallel visitors for entering and leaving nodes of a specific kind.
 *
 *     visit(ast, {
 *       enter: {
 *         Kind(node) {
 *           // enter the "Kind" node
 *         }
 *       },
 *       leave: {
 *         Kind(node) {
 *           // leave the "Kind" node
 *         }
 *       }
 *     })
 */

function visit(root, visitor) {
  var visitorKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : QueryDocumentKeys;

  /* eslint-disable no-undef-init */
  var stack = undefined;
  var inArray = Array.isArray(root);
  var keys = [root];
  var index = -1;
  var edits = [];
  var node = undefined;
  var key = undefined;
  var parent = undefined;
  var path = [];
  var ancestors = [];
  var newRoot = root;
  /* eslint-enable no-undef-init */

  do {
    index++;
    var isLeaving = index === keys.length;
    var isEdited = isLeaving && edits.length !== 0;

    if (isLeaving) {
      key = ancestors.length === 0 ? undefined : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();

      if (isEdited) {
        if (inArray) {
          node = node.slice();
        } else {
          var clone = {};

          for (var k in node) {
            if (node.hasOwnProperty(k)) {
              clone[k] = node[k];
            }
          }

          node = clone;
        }

        var editOffset = 0;

        for (var ii = 0; ii < edits.length; ii++) {
          var editKey = edits[ii][0];
          var editValue = edits[ii][1];

          if (inArray) {
            editKey -= editOffset;
          }

          if (inArray && editValue === null) {
            node.splice(editKey, 1);
            editOffset++;
          } else {
            node[editKey] = editValue;
          }
        }
      }

      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else {
      key = parent ? inArray ? index : keys[index] : undefined;
      node = parent ? parent[key] : newRoot;

      if (node === null || node === undefined) {
        continue;
      }

      if (parent) {
        path.push(key);
      }
    }

    var result = void 0;

    if (!Array.isArray(node)) {
      if (!isNode(node)) {
        throw new Error('Invalid AST Node: ' + inspect(node));
      }

      var visitFn = getVisitFn(visitor, node.kind, isLeaving);

      if (visitFn) {
        result = visitFn.call(visitor, node, key, parent, path, ancestors);

        if (result === BREAK) {
          break;
        }

        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);

          if (!isLeaving) {
            if (isNode(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
    }

    if (result === undefined && isEdited) {
      edits.push([key, node]);
    }

    if (isLeaving) {
      path.pop();
    } else {
      stack = {
        inArray: inArray,
        index: index,
        keys: keys,
        edits: edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : visitorKeys[node.kind] || [];
      index = -1;
      edits = [];

      if (parent) {
        ancestors.push(parent);
      }

      parent = node;
    }
  } while (stack !== undefined);

  if (edits.length !== 0) {
    newRoot = edits[edits.length - 1][1];
  }

  return newRoot;
}

function isNode(maybeNode) {
  return Boolean(maybeNode && typeof maybeNode.kind === 'string');
}
/**
 * Creates a new visitor instance which delegates to many visitors to run in
 * parallel. Each visitor will be visited for each node before moving on.
 *
 * If a prior visitor edits a node, no following visitors will see that node.
 */


function visitInParallel(visitors) {
  var skipping = new Array(visitors.length);
  return {
    enter: function enter(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          false);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined) {
              return result;
            }
          }
        }
      }
    },
    leave: function leave(node) {
      for (var i = 0; i < visitors.length; i++) {
        if (!skipping[i]) {
          var fn = getVisitFn(visitors[i], node.kind,
          /* isLeaving */
          true);

          if (fn) {
            var result = fn.apply(visitors[i], arguments);

            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== undefined && result !== false) {
              return result;
            }
          }
        } else if (skipping[i] === node) {
          skipping[i] = null;
        }
      }
    }
  };
}
/**
 * Creates a new visitor instance which maintains a provided TypeInfo instance
 * along with visiting visitor.
 */

function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter: function enter(node) {
      typeInfo.enter(node);
      var fn = getVisitFn(visitor, node.kind,
      /* isLeaving */
      false);

      if (fn) {
        var result = fn.apply(visitor, arguments);

        if (result !== undefined) {
          typeInfo.leave(node);

          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }

        return result;
      }
    },
    leave: function leave(node) {
      var fn = getVisitFn(visitor, node.kind,
      /* isLeaving */
      true);
      var result;

      if (fn) {
        result = fn.apply(visitor, arguments);
      }

      typeInfo.leave(node);
      return result;
    }
  };
}
/**
 * Given a visitor instance, if it is leaving or not, and a node kind, return
 * the function the visitor runtime should call.
 */

function getVisitFn(visitor, kind, isLeaving) {
  var kindVisitor = visitor[kind];

  if (kindVisitor) {
    if (!isLeaving && typeof kindVisitor === 'function') {
      // { Kind() {} }
      return kindVisitor;
    }

    var kindSpecificVisitor = isLeaving ? kindVisitor.leave : kindVisitor.enter;

    if (typeof kindSpecificVisitor === 'function') {
      // { Kind: { enter() {}, leave() {} } }
      return kindSpecificVisitor;
    }
  } else {
    var specificVisitor = isLeaving ? visitor.leave : visitor.enter;

    if (specificVisitor) {
      if (typeof specificVisitor === 'function') {
        // { enter() {}, leave() {} }
        return specificVisitor;
      }

      var specificKindVisitor = specificVisitor[kind];

      if (typeof specificKindVisitor === 'function') {
        // { enter: { Kind() {} }, leave: { Kind() {} } }
        return specificKindVisitor;
      }
    }
  }
}

var visitor = /*#__PURE__*/Object.freeze({
	QueryDocumentKeys: QueryDocumentKeys,
	BREAK: BREAK,
	visit: visit,
	visitInParallel: visitInParallel,
	visitWithTypeInfo: visitWithTypeInfo,
	getVisitFn: getVisitFn
});

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Converts an AST into a string, using one set of reasonable
 * formatting rules.
 */

function print(ast) {
  return visit(ast, {
    leave: printDocASTReducer
  });
}
var printDocASTReducer = {
  Name: function Name(node) {
    return node.value;
  },
  Variable: function Variable(node) {
    return '$' + node.name;
  },
  // Document
  Document: function Document(node) {
    return join(node.definitions, '\n\n') + '\n';
  },
  OperationDefinition: function OperationDefinition(node) {
    var op = node.operation;
    var name = node.name;
    var varDefs = wrap('(', join(node.variableDefinitions, ', '), ')');
    var directives = join(node.directives, ' ');
    var selectionSet = node.selectionSet; // Anonymous queries with no directives or variable definitions can use
    // the query short form.

    return !name && !directives && !varDefs && op === 'query' ? selectionSet : join([op, join([name, varDefs]), directives, selectionSet], ' ');
  },
  VariableDefinition: function VariableDefinition(_ref) {
    var variable = _ref.variable,
        type = _ref.type,
        defaultValue = _ref.defaultValue,
        directives = _ref.directives;
    return variable + ': ' + type + wrap(' = ', defaultValue) + wrap(' ', join(directives, ' '));
  },
  SelectionSet: function SelectionSet(_ref2) {
    var selections = _ref2.selections;
    return block(selections);
  },
  Field: function Field(_ref3) {
    var alias = _ref3.alias,
        name = _ref3.name,
        args = _ref3.arguments,
        directives = _ref3.directives,
        selectionSet = _ref3.selectionSet;
    return join([wrap('', alias, ': ') + name + wrap('(', join(args, ', '), ')'), join(directives, ' '), selectionSet], ' ');
  },
  Argument: function Argument(_ref4) {
    var name = _ref4.name,
        value = _ref4.value;
    return name + ': ' + value;
  },
  // Fragments
  FragmentSpread: function FragmentSpread(_ref5) {
    var name = _ref5.name,
        directives = _ref5.directives;
    return '...' + name + wrap(' ', join(directives, ' '));
  },
  InlineFragment: function InlineFragment(_ref6) {
    var typeCondition = _ref6.typeCondition,
        directives = _ref6.directives,
        selectionSet = _ref6.selectionSet;
    return join(['...', wrap('on ', typeCondition), join(directives, ' '), selectionSet], ' ');
  },
  FragmentDefinition: function FragmentDefinition(_ref7) {
    var name = _ref7.name,
        typeCondition = _ref7.typeCondition,
        variableDefinitions = _ref7.variableDefinitions,
        directives = _ref7.directives,
        selectionSet = _ref7.selectionSet;
    return (// Note: fragment variable definitions are experimental and may be changed
      // or removed in the future.
      "fragment ".concat(name).concat(wrap('(', join(variableDefinitions, ', '), ')'), " ") + "on ".concat(typeCondition, " ").concat(wrap('', join(directives, ' '), ' ')) + selectionSet
    );
  },
  // Value
  IntValue: function IntValue(_ref8) {
    var value = _ref8.value;
    return value;
  },
  FloatValue: function FloatValue(_ref9) {
    var value = _ref9.value;
    return value;
  },
  StringValue: function StringValue(_ref10, key) {
    var value = _ref10.value,
        isBlockString = _ref10.block;
    return isBlockString ? printBlockString(value, key === 'description') : JSON.stringify(value);
  },
  BooleanValue: function BooleanValue(_ref11) {
    var value = _ref11.value;
    return value ? 'true' : 'false';
  },
  NullValue: function NullValue() {
    return 'null';
  },
  EnumValue: function EnumValue(_ref12) {
    var value = _ref12.value;
    return value;
  },
  ListValue: function ListValue(_ref13) {
    var values = _ref13.values;
    return '[' + join(values, ', ') + ']';
  },
  ObjectValue: function ObjectValue(_ref14) {
    var fields = _ref14.fields;
    return '{' + join(fields, ', ') + '}';
  },
  ObjectField: function ObjectField(_ref15) {
    var name = _ref15.name,
        value = _ref15.value;
    return name + ': ' + value;
  },
  // Directive
  Directive: function Directive(_ref16) {
    var name = _ref16.name,
        args = _ref16.arguments;
    return '@' + name + wrap('(', join(args, ', '), ')');
  },
  // Type
  NamedType: function NamedType(_ref17) {
    var name = _ref17.name;
    return name;
  },
  ListType: function ListType(_ref18) {
    var type = _ref18.type;
    return '[' + type + ']';
  },
  NonNullType: function NonNullType(_ref19) {
    var type = _ref19.type;
    return type + '!';
  },
  // Type System Definitions
  SchemaDefinition: function SchemaDefinition(_ref20) {
    var directives = _ref20.directives,
        operationTypes = _ref20.operationTypes;
    return join(['schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  OperationTypeDefinition: function OperationTypeDefinition(_ref21) {
    var operation = _ref21.operation,
        type = _ref21.type;
    return operation + ': ' + type;
  },
  ScalarTypeDefinition: addDescription(function (_ref22) {
    var name = _ref22.name,
        directives = _ref22.directives;
    return join(['scalar', name, join(directives, ' ')], ' ');
  }),
  ObjectTypeDefinition: addDescription(function (_ref23) {
    var name = _ref23.name,
        interfaces = _ref23.interfaces,
        directives = _ref23.directives,
        fields = _ref23.fields;
    return join(['type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  }),
  FieldDefinition: addDescription(function (_ref24) {
    var name = _ref24.name,
        args = _ref24.arguments,
        type = _ref24.type,
        directives = _ref24.directives;
    return name + (args.every(function (arg) {
      return arg.indexOf('\n') === -1;
    }) ? wrap('(', join(args, ', '), ')') : wrap('(\n', indent(join(args, '\n')), '\n)')) + ': ' + type + wrap(' ', join(directives, ' '));
  }),
  InputValueDefinition: addDescription(function (_ref25) {
    var name = _ref25.name,
        type = _ref25.type,
        defaultValue = _ref25.defaultValue,
        directives = _ref25.directives;
    return join([name + ': ' + type, wrap('= ', defaultValue), join(directives, ' ')], ' ');
  }),
  InterfaceTypeDefinition: addDescription(function (_ref26) {
    var name = _ref26.name,
        directives = _ref26.directives,
        fields = _ref26.fields;
    return join(['interface', name, join(directives, ' '), block(fields)], ' ');
  }),
  UnionTypeDefinition: addDescription(function (_ref27) {
    var name = _ref27.name,
        directives = _ref27.directives,
        types = _ref27.types;
    return join(['union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  }),
  EnumTypeDefinition: addDescription(function (_ref28) {
    var name = _ref28.name,
        directives = _ref28.directives,
        values = _ref28.values;
    return join(['enum', name, join(directives, ' '), block(values)], ' ');
  }),
  EnumValueDefinition: addDescription(function (_ref29) {
    var name = _ref29.name,
        directives = _ref29.directives;
    return join([name, join(directives, ' ')], ' ');
  }),
  InputObjectTypeDefinition: addDescription(function (_ref30) {
    var name = _ref30.name,
        directives = _ref30.directives,
        fields = _ref30.fields;
    return join(['input', name, join(directives, ' '), block(fields)], ' ');
  }),
  DirectiveDefinition: addDescription(function (_ref31) {
    var name = _ref31.name,
        args = _ref31.arguments,
        locations = _ref31.locations;
    return 'directive @' + name + (args.every(function (arg) {
      return arg.indexOf('\n') === -1;
    }) ? wrap('(', join(args, ', '), ')') : wrap('(\n', indent(join(args, '\n')), '\n)')) + ' on ' + join(locations, ' | ');
  }),
  SchemaExtension: function SchemaExtension(_ref32) {
    var directives = _ref32.directives,
        operationTypes = _ref32.operationTypes;
    return join(['extend schema', join(directives, ' '), block(operationTypes)], ' ');
  },
  ScalarTypeExtension: function ScalarTypeExtension(_ref33) {
    var name = _ref33.name,
        directives = _ref33.directives;
    return join(['extend scalar', name, join(directives, ' ')], ' ');
  },
  ObjectTypeExtension: function ObjectTypeExtension(_ref34) {
    var name = _ref34.name,
        interfaces = _ref34.interfaces,
        directives = _ref34.directives,
        fields = _ref34.fields;
    return join(['extend type', name, wrap('implements ', join(interfaces, ' & ')), join(directives, ' '), block(fields)], ' ');
  },
  InterfaceTypeExtension: function InterfaceTypeExtension(_ref35) {
    var name = _ref35.name,
        directives = _ref35.directives,
        fields = _ref35.fields;
    return join(['extend interface', name, join(directives, ' '), block(fields)], ' ');
  },
  UnionTypeExtension: function UnionTypeExtension(_ref36) {
    var name = _ref36.name,
        directives = _ref36.directives,
        types = _ref36.types;
    return join(['extend union', name, join(directives, ' '), types && types.length !== 0 ? '= ' + join(types, ' | ') : ''], ' ');
  },
  EnumTypeExtension: function EnumTypeExtension(_ref37) {
    var name = _ref37.name,
        directives = _ref37.directives,
        values = _ref37.values;
    return join(['extend enum', name, join(directives, ' '), block(values)], ' ');
  },
  InputObjectTypeExtension: function InputObjectTypeExtension(_ref38) {
    var name = _ref38.name,
        directives = _ref38.directives,
        fields = _ref38.fields;
    return join(['extend input', name, join(directives, ' '), block(fields)], ' ');
  }
};

function addDescription(cb) {
  return function (node) {
    return join([node.description, cb(node)], '\n');
  };
}
/**
 * Given maybeArray, print an empty string if it is null or empty, otherwise
 * print all items together separated by separator if provided
 */


function join(maybeArray, separator) {
  return maybeArray ? maybeArray.filter(function (x) {
    return x;
  }).join(separator || '') : '';
}
/**
 * Given array, print each item on its own line, wrapped in an
 * indented "{ }" block.
 */


function block(array) {
  return array && array.length !== 0 ? '{\n' + indent(join(array, '\n')) + '\n}' : '';
}
/**
 * If maybeString is not null or empty, then wrap with start and end, otherwise
 * print an empty string.
 */


function wrap(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || '') : '';
}

function indent(maybeString) {
  return maybeString && '  ' + maybeString.replace(/\n/g, '\n  ');
}
/**
 * Print a block string in the indented block form by adding a leading and
 * trailing blank line. However, if a block string starts with whitespace and is
 * a single-line, adding a leading blank line would strip that whitespace.
 */


function printBlockString(value, isDescription) {
  var escaped = value.replace(/"""/g, '\\"""');
  return (value[0] === ' ' || value[0] === '\t') && value.indexOf('\n') === -1 ? "\"\"\"".concat(escaped.replace(/"$/, '"\n'), "\"\"\"") : "\"\"\"\n".concat(isDescription ? escaped : indent(escaped), "\n\"\"\"");
}

var printer = /*#__PURE__*/Object.freeze({
	print: print
});

var require$$0 = getCjsExportFromNamespace(printer);

var bundle_umd$4 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd, bundle_umd$2, require$$0);
}(commonjsGlobal, (function (exports,apolloUtilities,Observable,printer) {
    Observable = Observable && Observable.hasOwnProperty('default') ? Observable['default'] : Observable;

    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function validateOperation(operation) {
        var OPERATION_FIELDS = [
            'query',
            'operationName',
            'variables',
            'extensions',
            'context',
        ];
        for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
            var key = _a[_i];
            if (OPERATION_FIELDS.indexOf(key) < 0) {
                throw new Error("illegal argument: " + key);
            }
        }
        return operation;
    }
    var LinkError = /** @class */ (function (_super) {
        __extends(LinkError, _super);
        function LinkError(message, link) {
            var _this = _super.call(this, message) || this;
            _this.link = link;
            return _this;
        }
        return LinkError;
    }(Error));
    function isTerminating(link) {
        return link.request.length <= 1;
    }
    function toPromise(observable) {
        var completed = false;
        return new Promise(function (resolve, reject) {
            observable.subscribe({
                next: function (data) {
                    if (completed) {
                        console.warn("Promise Wrapper does not support multiple results from Observable");
                    }
                    else {
                        completed = true;
                        resolve(data);
                    }
                },
                error: reject,
            });
        });
    }
    // backwards compat
    var makePromise = toPromise;
    function fromPromise(promise) {
        return new Observable(function (observer) {
            promise
                .then(function (value) {
                observer.next(value);
                observer.complete();
            })
                .catch(observer.error.bind(observer));
        });
    }
    function fromError(errorValue) {
        return new Observable(function (observer) {
            observer.error(errorValue);
        });
    }
    function transformOperation(operation) {
        var transformedOperation = {
            variables: operation.variables || {},
            extensions: operation.extensions || {},
            operationName: operation.operationName,
            query: operation.query,
        };
        // best guess at an operation name
        if (!transformedOperation.operationName) {
            transformedOperation.operationName =
                typeof transformedOperation.query !== 'string'
                    ? apolloUtilities.getOperationName(transformedOperation.query)
                    : '';
        }
        return transformedOperation;
    }
    function createOperation(starting, operation) {
        var context = __assign({}, starting);
        var setContext = function (next) {
            if (typeof next === 'function') {
                context = __assign({}, context, next(context));
            }
            else {
                context = __assign({}, context, next);
            }
        };
        var getContext = function () { return (__assign({}, context)); };
        Object.defineProperty(operation, 'setContext', {
            enumerable: false,
            value: setContext,
        });
        Object.defineProperty(operation, 'getContext', {
            enumerable: false,
            value: getContext,
        });
        Object.defineProperty(operation, 'toKey', {
            enumerable: false,
            value: function () { return getKey(operation); },
        });
        return operation;
    }
    function getKey(operation) {
        // XXX we're assuming here that variables will be serialized in the same order.
        // that might not always be true
        return printer.print(operation.query) + "|" + JSON.stringify(operation.variables) + "|" + operation.operationName;
    }

    var passthrough = function (op, forward) { return (forward ? forward(op) : Observable.of()); };
    var toLink = function (handler) {
        return typeof handler === 'function' ? new ApolloLink(handler) : handler;
    };
    var empty = function () {
        return new ApolloLink(function (op, forward) { return Observable.of(); });
    };
    var from = function (links) {
        if (links.length === 0)
            return empty();
        return links.map(toLink).reduce(function (x, y) { return x.concat(y); });
    };
    var split = function (test, left, right) {
        if (right === void 0) { right = new ApolloLink(passthrough); }
        var leftLink = toLink(left);
        var rightLink = toLink(right);
        if (isTerminating(leftLink) && isTerminating(rightLink)) {
            return new ApolloLink(function (operation) {
                return test(operation)
                    ? leftLink.request(operation) || Observable.of()
                    : rightLink.request(operation) || Observable.of();
            });
        }
        else {
            return new ApolloLink(function (operation, forward) {
                return test(operation)
                    ? leftLink.request(operation, forward) || Observable.of()
                    : rightLink.request(operation, forward) || Observable.of();
            });
        }
    };
    // join two Links together
    var concat = function (first, second) {
        var firstLink = toLink(first);
        if (isTerminating(firstLink)) {
            console.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
            return firstLink;
        }
        var nextLink = toLink(second);
        if (isTerminating(nextLink)) {
            return new ApolloLink(function (operation) {
                return firstLink.request(operation, function (op) { return nextLink.request(op) || Observable.of(); }) || Observable.of();
            });
        }
        else {
            return new ApolloLink(function (operation, forward) {
                return (firstLink.request(operation, function (op) {
                    return nextLink.request(op, forward) || Observable.of();
                }) || Observable.of());
            });
        }
    };
    var ApolloLink = /** @class */ (function () {
        function ApolloLink(request) {
            if (request)
                this.request = request;
        }
        ApolloLink.prototype.split = function (test, left, right) {
            if (right === void 0) { right = new ApolloLink(passthrough); }
            return this.concat(split(test, left, right));
        };
        ApolloLink.prototype.concat = function (next) {
            return concat(this, next);
        };
        ApolloLink.prototype.request = function (operation, forward) {
            throw new Error('request is not implemented');
        };
        ApolloLink.empty = empty;
        ApolloLink.from = from;
        ApolloLink.split = split;
        ApolloLink.execute = execute;
        return ApolloLink;
    }());
    function execute(link, operation) {
        return (link.request(createOperation(operation.context, transformOperation(validateOperation(operation)))) || Observable.of());
    }

    exports.Observable = Observable;
    exports.createOperation = createOperation;
    exports.makePromise = makePromise;
    exports.toPromise = toPromise;
    exports.fromPromise = fromPromise;
    exports.fromError = fromError;
    exports.empty = empty;
    exports.from = from;
    exports.split = split;
    exports.concat = concat;
    exports.ApolloLink = ApolloLink;
    exports.execute = execute;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$4);
var bundle_umd_1 = bundle_umd$4.ApolloLink;

var ponyfill = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}});

unwrapExports(ponyfill);

var lib = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});



var _ponyfill2 = _interopRequireDefault(ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof commonjsGlobal !== 'undefined') {
  root = commonjsGlobal;
} else {
  root = module;
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
});

unwrapExports(lib);

var bundle_umd$6 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd$4);
}(commonjsGlobal, (function (exports,apolloLink) {
    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    /*
     * Expects context to contain the forceFetch field if no dedup
     */
    var DedupLink = /** @class */ (function (_super) {
        __extends(DedupLink, _super);
        function DedupLink() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.inFlightRequestObservables = new Map();
            _this.subscribers = new Map();
            return _this;
        }
        DedupLink.prototype.request = function (operation, forward) {
            var _this = this;
            // sometimes we might not want to deduplicate a request, for example when we want to force fetch it.
            if (operation.getContext().forceFetch) {
                return forward(operation);
            }
            var key = operation.toKey();
            var cleanup = function (operationKey) {
                _this.inFlightRequestObservables.delete(operationKey);
                var prev = _this.subscribers.get(operationKey);
                return prev;
            };
            if (!this.inFlightRequestObservables.get(key)) {
                // this is a new request, i.e. we haven't deduplicated it yet
                // call the next link
                var singleObserver_1 = forward(operation);
                var subscription_1;
                var sharedObserver = new apolloLink.Observable(function (observer) {
                    // this will still be called by each subscriber regardless of
                    // deduplication status
                    var prev = _this.subscribers.get(key);
                    if (!prev)
                        prev = { next: [], error: [], complete: [] };
                    _this.subscribers.set(key, {
                        next: prev.next.concat([observer.next.bind(observer)]),
                        error: prev.error.concat([observer.error.bind(observer)]),
                        complete: prev.complete.concat([observer.complete.bind(observer)]),
                    });
                    if (!subscription_1) {
                        subscription_1 = singleObserver_1.subscribe({
                            next: function (result) {
                                var previous = cleanup(key);
                                _this.subscribers.delete(key);
                                if (previous) {
                                    previous.next.forEach(function (next) { return next(result); });
                                    previous.complete.forEach(function (complete) { return complete(); });
                                }
                            },
                            error: function (error) {
                                var previous = cleanup(key);
                                _this.subscribers.delete(key);
                                if (previous)
                                    previous.error.forEach(function (err) { return err(error); });
                            },
                        });
                    }
                    return function () {
                        if (subscription_1)
                            subscription_1.unsubscribe();
                        _this.inFlightRequestObservables.delete(key);
                    };
                });
                this.inFlightRequestObservables.set(key, sharedObserver);
            }
            // return shared Observable
            return this.inFlightRequestObservables.get(key);
        };
        return DedupLink;
    }(apolloLink.ApolloLink));

    exports.DedupLink = DedupLink;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$6);

var bundle_umd$8 = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd$4, lib, bundle_umd, require$$0, bundle_umd$6);
}(commonjsGlobal, (function (exports,apolloLink,$$observable,apolloUtilities,printer,apolloLinkDedup) {
    $$observable = $$observable && $$observable.hasOwnProperty('default') ? $$observable['default'] : $$observable;

    (function (NetworkStatus) {
        NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
        NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
        NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
        NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
        NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
        NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
        NetworkStatus[NetworkStatus["error"] = 8] = "error";
    })(exports.NetworkStatus || (exports.NetworkStatus = {}));
    function isNetworkRequestInFlight(networkStatus) {
        return networkStatus < 7;
    }

    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Observable = (function (_super) {
        __extends(Observable, _super);
        function Observable() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Observable.prototype[$$observable] = function () {
            return this;
        };
        Observable.prototype['@@observable'] = function () {
            return this;
        };
        return Observable;
    }(apolloLink.Observable));

    var __extends$1 = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    function isApolloError(err) {
        return err.hasOwnProperty('graphQLErrors');
    }
    var generateErrorMessage = function (err) {
        var message = '';
        if (Array.isArray(err.graphQLErrors) && err.graphQLErrors.length !== 0) {
            err.graphQLErrors.forEach(function (graphQLError) {
                var errorMessage = graphQLError
                    ? graphQLError.message
                    : 'Error message not found.';
                message += "GraphQL error: " + errorMessage + "\n";
            });
        }
        if (err.networkError) {
            message += 'Network error: ' + err.networkError.message + '\n';
        }
        message = message.replace(/\n$/, '');
        return message;
    };
    var ApolloError = (function (_super) {
        __extends$1(ApolloError, _super);
        function ApolloError(_a) {
            var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
            var _this = _super.call(this, errorMessage) || this;
            _this.graphQLErrors = graphQLErrors || [];
            _this.networkError = networkError || null;
            if (!errorMessage) {
                _this.message = generateErrorMessage(_this);
            }
            else {
                _this.message = errorMessage;
            }
            _this.extraInfo = extraInfo;
            _this.__proto__ = ApolloError.prototype;
            return _this;
        }
        return ApolloError;
    }(Error));

    (function (FetchType) {
        FetchType[FetchType["normal"] = 1] = "normal";
        FetchType[FetchType["refetch"] = 2] = "refetch";
        FetchType[FetchType["poll"] = 3] = "poll";
    })(exports.FetchType || (exports.FetchType = {}));

    var __extends$2 = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign = function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var hasError = function (storeValue, policy) {
        if (policy === void 0) { policy = 'none'; }
        return storeValue &&
            ((storeValue.graphQLErrors &&
                storeValue.graphQLErrors.length > 0 &&
                policy === 'none') ||
                storeValue.networkError);
    };
    var ObservableQuery = (function (_super) {
        __extends$2(ObservableQuery, _super);
        function ObservableQuery(_a) {
            var scheduler = _a.scheduler, options = _a.options, _b = _a.shouldSubscribe, shouldSubscribe = _b === void 0 ? true : _b;
            var _this = _super.call(this, function (observer) {
                return _this.onSubscribe(observer);
            }) || this;
            _this.isCurrentlyPolling = false;
            _this.isTornDown = false;
            _this.options = options;
            _this.variables = options.variables || {};
            _this.queryId = scheduler.queryManager.generateQueryId();
            _this.shouldSubscribe = shouldSubscribe;
            _this.scheduler = scheduler;
            _this.queryManager = scheduler.queryManager;
            _this.observers = [];
            _this.subscriptionHandles = [];
            return _this;
        }
        ObservableQuery.prototype.result = function () {
            var that = this;
            return new Promise(function (resolve, reject) {
                var subscription;
                var observer = {
                    next: function (result) {
                        resolve(result);
                        if (!that.observers.some(function (obs) { return obs !== observer; })) {
                            that.queryManager.removeQuery(that.queryId);
                        }
                        setTimeout(function () {
                            subscription.unsubscribe();
                        }, 0);
                    },
                    error: function (error) {
                        reject(error);
                    },
                };
                subscription = that.subscribe(observer);
            });
        };
        ObservableQuery.prototype.currentResult = function () {
            if (this.isTornDown) {
                return {
                    data: this.lastError ? {} : this.lastResult ? this.lastResult.data : {},
                    error: this.lastError,
                    loading: false,
                    networkStatus: exports.NetworkStatus.error,
                };
            }
            var queryStoreValue = this.queryManager.queryStore.get(this.queryId);
            if (hasError(queryStoreValue, this.options.errorPolicy)) {
                return {
                    data: {},
                    loading: false,
                    networkStatus: queryStoreValue.networkStatus,
                    error: new ApolloError({
                        graphQLErrors: queryStoreValue.graphQLErrors,
                        networkError: queryStoreValue.networkError,
                    }),
                };
            }
            var _a = this.queryManager.getCurrentQueryResult(this), data = _a.data, partial = _a.partial;
            var queryLoading = !queryStoreValue ||
                queryStoreValue.networkStatus === exports.NetworkStatus.loading;
            var loading = (this.options.fetchPolicy === 'network-only' && queryLoading) ||
                (partial && this.options.fetchPolicy !== 'cache-only');
            var networkStatus;
            if (queryStoreValue) {
                networkStatus = queryStoreValue.networkStatus;
            }
            else {
                networkStatus = loading ? exports.NetworkStatus.loading : exports.NetworkStatus.ready;
            }
            var result = {
                data: data,
                loading: isNetworkRequestInFlight(networkStatus),
                networkStatus: networkStatus,
            };
            if (queryStoreValue &&
                queryStoreValue.graphQLErrors &&
                this.options.errorPolicy === 'all') {
                result.errors = queryStoreValue.graphQLErrors;
            }
            if (!partial) {
                var stale = false;
                this.lastResult = __assign({}, result, { stale: stale });
            }
            return __assign({}, result, { partial: partial });
        };
        ObservableQuery.prototype.getLastResult = function () {
            return this.lastResult;
        };
        ObservableQuery.prototype.getLastError = function () {
            return this.lastError;
        };
        ObservableQuery.prototype.resetLastResults = function () {
            delete this.lastResult;
            delete this.lastError;
            this.isTornDown = false;
        };
        ObservableQuery.prototype.refetch = function (variables) {
            var fetchPolicy = this.options.fetchPolicy;
            if (fetchPolicy === 'cache-only') {
                return Promise.reject(new Error('cache-only fetchPolicy option should not be used together with query refetch.'));
            }
            if (!apolloUtilities.isEqual(this.variables, variables)) {
                this.variables = Object.assign({}, this.variables, variables);
            }
            if (!apolloUtilities.isEqual(this.options.variables, this.variables)) {
                this.options.variables = Object.assign({}, this.options.variables, this.variables);
            }
            var isNetworkFetchPolicy = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
            var combinedOptions = __assign({}, this.options, { fetchPolicy: isNetworkFetchPolicy ? fetchPolicy : 'network-only' });
            return this.queryManager
                .fetchQuery(this.queryId, combinedOptions, exports.FetchType.refetch)
                .then(function (result) { return result; });
        };
        ObservableQuery.prototype.fetchMore = function (fetchMoreOptions) {
            var _this = this;
            if (!fetchMoreOptions.updateQuery) {
                throw new Error('updateQuery option is required. This function defines how to update the query data with the new results.');
            }
            var combinedOptions;
            return Promise.resolve()
                .then(function () {
                var qid = _this.queryManager.generateQueryId();
                if (fetchMoreOptions.query) {
                    combinedOptions = fetchMoreOptions;
                }
                else {
                    combinedOptions = __assign({}, _this.options, fetchMoreOptions, { variables: Object.assign({}, _this.variables, fetchMoreOptions.variables) });
                }
                combinedOptions.fetchPolicy = 'network-only';
                return _this.queryManager.fetchQuery(qid, combinedOptions, exports.FetchType.normal, _this.queryId);
            })
                .then(function (fetchMoreResult) {
                _this.updateQuery(function (previousResult) {
                    return fetchMoreOptions.updateQuery(previousResult, {
                        fetchMoreResult: fetchMoreResult.data,
                        variables: combinedOptions.variables,
                    });
                });
                return fetchMoreResult;
            });
        };
        ObservableQuery.prototype.subscribeToMore = function (options) {
            var _this = this;
            var subscription = this.queryManager
                .startGraphQLSubscription({
                query: options.document,
                variables: options.variables,
            })
                .subscribe({
                next: function (subscriptionData) {
                    if (options.updateQuery) {
                        _this.updateQuery(function (previous, _a) {
                            var variables = _a.variables;
                            return options.updateQuery(previous, {
                                subscriptionData: subscriptionData,
                                variables: variables,
                            });
                        });
                    }
                },
                error: function (err) {
                    if (options.onError) {
                        options.onError(err);
                        return;
                    }
                    console.error('Unhandled GraphQL subscription error', err);
                },
            });
            this.subscriptionHandles.push(subscription);
            return function () {
                var i = _this.subscriptionHandles.indexOf(subscription);
                if (i >= 0) {
                    _this.subscriptionHandles.splice(i, 1);
                    subscription.unsubscribe();
                }
            };
        };
        ObservableQuery.prototype.setOptions = function (opts) {
            var oldOptions = this.options;
            this.options = Object.assign({}, this.options, opts);
            if (opts.pollInterval) {
                this.startPolling(opts.pollInterval);
            }
            else if (opts.pollInterval === 0) {
                this.stopPolling();
            }
            var tryFetch = (oldOptions.fetchPolicy !== 'network-only' &&
                opts.fetchPolicy === 'network-only') ||
                (oldOptions.fetchPolicy === 'cache-only' &&
                    opts.fetchPolicy !== 'cache-only') ||
                (oldOptions.fetchPolicy === 'standby' &&
                    opts.fetchPolicy !== 'standby') ||
                false;
            return this.setVariables(this.options.variables, tryFetch, opts.fetchResults);
        };
        ObservableQuery.prototype.setVariables = function (variables, tryFetch, fetchResults) {
            if (tryFetch === void 0) { tryFetch = false; }
            if (fetchResults === void 0) { fetchResults = true; }
            this.isTornDown = false;
            var newVariables = variables ? variables : this.variables;
            if (apolloUtilities.isEqual(newVariables, this.variables) && !tryFetch) {
                if (this.observers.length === 0 || !fetchResults) {
                    return new Promise(function (resolve) { return resolve(); });
                }
                return this.result();
            }
            else {
                this.variables = newVariables;
                this.options.variables = newVariables;
                if (this.observers.length === 0) {
                    return new Promise(function (resolve) { return resolve(); });
                }
                return this.queryManager
                    .fetchQuery(this.queryId, __assign({}, this.options, { variables: this.variables }))
                    .then(function (result) { return result; });
            }
        };
        ObservableQuery.prototype.updateQuery = function (mapFn) {
            var _a = this.queryManager.getQueryWithPreviousResult(this.queryId), previousResult = _a.previousResult, variables = _a.variables, document = _a.document;
            var newResult = apolloUtilities.tryFunctionOrLogError(function () {
                return mapFn(previousResult, { variables: variables });
            });
            if (newResult) {
                this.queryManager.dataStore.markUpdateQueryResult(document, variables, newResult);
                this.queryManager.broadcastQueries();
            }
        };
        ObservableQuery.prototype.stopPolling = function () {
            if (this.isCurrentlyPolling) {
                this.scheduler.stopPollingQuery(this.queryId);
                this.options.pollInterval = undefined;
                this.isCurrentlyPolling = false;
            }
        };
        ObservableQuery.prototype.startPolling = function (pollInterval) {
            if (this.options.fetchPolicy === 'cache-first' ||
                this.options.fetchPolicy === 'cache-only') {
                throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
            }
            if (this.isCurrentlyPolling) {
                this.scheduler.stopPollingQuery(this.queryId);
                this.isCurrentlyPolling = false;
            }
            this.options.pollInterval = pollInterval;
            this.isCurrentlyPolling = true;
            this.scheduler.startPollingQuery(this.options, this.queryId);
        };
        ObservableQuery.prototype.onSubscribe = function (observer) {
            var _this = this;
            if (observer._subscription &&
                observer._subscription._observer &&
                !observer._subscription._observer.error) {
                observer._subscription._observer.error = function (error) {
                    console.error('Unhandled error', error.message, error.stack);
                };
            }
            this.observers.push(observer);
            if (observer.next && this.lastResult)
                observer.next(this.lastResult);
            if (observer.error && this.lastError)
                observer.error(this.lastError);
            if (this.observers.length === 1)
                this.setUpQuery();
            return function () {
                _this.observers = _this.observers.filter(function (obs) { return obs !== observer; });
                if (_this.observers.length === 0) {
                    _this.tearDownQuery();
                }
            };
        };
        ObservableQuery.prototype.setUpQuery = function () {
            var _this = this;
            if (this.shouldSubscribe) {
                this.queryManager.addObservableQuery(this.queryId, this);
            }
            if (!!this.options.pollInterval) {
                if (this.options.fetchPolicy === 'cache-first' ||
                    this.options.fetchPolicy === 'cache-only') {
                    throw new Error('Queries that specify the cache-first and cache-only fetchPolicies cannot also be polling queries.');
                }
                this.isCurrentlyPolling = true;
                this.scheduler.startPollingQuery(this.options, this.queryId);
            }
            var observer = {
                next: function (result) {
                    _this.lastResult = result;
                    _this.observers.forEach(function (obs) { return obs.next && obs.next(result); });
                },
                error: function (error) {
                    _this.lastError = error;
                    _this.observers.forEach(function (obs) { return obs.error && obs.error(error); });
                },
            };
            this.queryManager.startQuery(this.queryId, this.options, this.queryManager.queryListenerForObserver(this.queryId, this.options, observer));
        };
        ObservableQuery.prototype.tearDownQuery = function () {
            this.isTornDown = true;
            if (this.isCurrentlyPolling) {
                this.scheduler.stopPollingQuery(this.queryId);
                this.isCurrentlyPolling = false;
            }
            this.subscriptionHandles.forEach(function (sub) { return sub.unsubscribe(); });
            this.subscriptionHandles = [];
            this.queryManager.removeObservableQuery(this.queryId);
            this.queryManager.stopQuery(this.queryId);
            this.observers = [];
        };
        return ObservableQuery;
    }(Observable));

    var __assign$1 = function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var QueryScheduler = (function () {
        function QueryScheduler(_a) {
            var queryManager = _a.queryManager, ssrMode = _a.ssrMode;
            this.inFlightQueries = {};
            this.registeredQueries = {};
            this.intervalQueries = {};
            this.pollingTimers = {};
            this.ssrMode = false;
            this.queryManager = queryManager;
            this.ssrMode = ssrMode || false;
        }
        QueryScheduler.prototype.checkInFlight = function (queryId) {
            var query = this.queryManager.queryStore.get(queryId);
            return (query &&
                query.networkStatus !== exports.NetworkStatus.ready &&
                query.networkStatus !== exports.NetworkStatus.error);
        };
        QueryScheduler.prototype.fetchQuery = function (queryId, options, fetchType) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.queryManager
                    .fetchQuery(queryId, options, fetchType)
                    .then(function (result) {
                    resolve(result);
                })
                    .catch(function (error) {
                    reject(error);
                });
            });
        };
        QueryScheduler.prototype.startPollingQuery = function (options, queryId, listener) {
            if (!options.pollInterval) {
                throw new Error('Attempted to start a polling query without a polling interval.');
            }
            if (this.ssrMode)
                return queryId;
            this.registeredQueries[queryId] = options;
            if (listener) {
                this.queryManager.addQueryListener(queryId, listener);
            }
            this.addQueryOnInterval(queryId, options);
            return queryId;
        };
        QueryScheduler.prototype.stopPollingQuery = function (queryId) {
            delete this.registeredQueries[queryId];
        };
        QueryScheduler.prototype.fetchQueriesOnInterval = function (interval) {
            var _this = this;
            this.intervalQueries[interval] = this.intervalQueries[interval].filter(function (queryId) {
                if (!(_this.registeredQueries.hasOwnProperty(queryId) &&
                    _this.registeredQueries[queryId].pollInterval === interval)) {
                    return false;
                }
                if (_this.checkInFlight(queryId)) {
                    return true;
                }
                var queryOptions = _this.registeredQueries[queryId];
                var pollingOptions = __assign$1({}, queryOptions);
                pollingOptions.fetchPolicy = 'network-only';
                _this.fetchQuery(queryId, pollingOptions, exports.FetchType.poll).catch(function () { });
                return true;
            });
            if (this.intervalQueries[interval].length === 0) {
                clearInterval(this.pollingTimers[interval]);
                delete this.intervalQueries[interval];
            }
        };
        QueryScheduler.prototype.addQueryOnInterval = function (queryId, queryOptions) {
            var _this = this;
            var interval = queryOptions.pollInterval;
            if (!interval) {
                throw new Error("A poll interval is required to start polling query with id '" + queryId + "'.");
            }
            if (this.intervalQueries.hasOwnProperty(interval.toString()) &&
                this.intervalQueries[interval].length > 0) {
                this.intervalQueries[interval].push(queryId);
            }
            else {
                this.intervalQueries[interval] = [queryId];
                this.pollingTimers[interval] = setInterval(function () {
                    _this.fetchQueriesOnInterval(interval);
                }, interval);
            }
        };
        QueryScheduler.prototype.registerPollingQuery = function (queryOptions) {
            if (!queryOptions.pollInterval) {
                throw new Error('Attempted to register a non-polling query with the scheduler.');
            }
            return new ObservableQuery({
                scheduler: this,
                options: queryOptions,
            });
        };
        return QueryScheduler;
    }());

    var MutationStore = (function () {
        function MutationStore() {
            this.store = {};
        }
        MutationStore.prototype.getStore = function () {
            return this.store;
        };
        MutationStore.prototype.get = function (mutationId) {
            return this.store[mutationId];
        };
        MutationStore.prototype.initMutation = function (mutationId, mutationString, variables) {
            this.store[mutationId] = {
                mutationString: mutationString,
                variables: variables || {},
                loading: true,
                error: null,
            };
        };
        MutationStore.prototype.markMutationError = function (mutationId, error) {
            var mutation = this.store[mutationId];
            if (!mutation) {
                return;
            }
            mutation.loading = false;
            mutation.error = error;
        };
        MutationStore.prototype.markMutationResult = function (mutationId) {
            var mutation = this.store[mutationId];
            if (!mutation) {
                return;
            }
            mutation.loading = false;
            mutation.error = null;
        };
        MutationStore.prototype.reset = function () {
            this.store = {};
        };
        return MutationStore;
    }());

    var __assign$2 = function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var QueryStore = (function () {
        function QueryStore() {
            this.store = {};
        }
        QueryStore.prototype.getStore = function () {
            return this.store;
        };
        QueryStore.prototype.get = function (queryId) {
            return this.store[queryId];
        };
        QueryStore.prototype.initQuery = function (query) {
            var previousQuery = this.store[query.queryId];
            if (previousQuery &&
                previousQuery.document !== query.document &&
                printer.print(previousQuery.document) !== printer.print(query.document)) {
                throw new Error('Internal Error: may not update existing query string in store');
            }
            var isSetVariables = false;
            var previousVariables = null;
            if (query.storePreviousVariables &&
                previousQuery &&
                previousQuery.networkStatus !== exports.NetworkStatus.loading) {
                if (!apolloUtilities.isEqual(previousQuery.variables, query.variables)) {
                    isSetVariables = true;
                    previousVariables = previousQuery.variables;
                }
            }
            var networkStatus;
            if (isSetVariables) {
                networkStatus = exports.NetworkStatus.setVariables;
            }
            else if (query.isPoll) {
                networkStatus = exports.NetworkStatus.poll;
            }
            else if (query.isRefetch) {
                networkStatus = exports.NetworkStatus.refetch;
            }
            else {
                networkStatus = exports.NetworkStatus.loading;
            }
            var graphQLErrors = [];
            if (previousQuery && previousQuery.graphQLErrors) {
                graphQLErrors = previousQuery.graphQLErrors;
            }
            this.store[query.queryId] = {
                document: query.document,
                variables: query.variables,
                previousVariables: previousVariables,
                networkError: null,
                graphQLErrors: graphQLErrors,
                networkStatus: networkStatus,
                metadata: query.metadata,
            };
            if (typeof query.fetchMoreForQueryId === 'string' &&
                this.store[query.fetchMoreForQueryId]) {
                this.store[query.fetchMoreForQueryId].networkStatus =
                    exports.NetworkStatus.fetchMore;
            }
        };
        QueryStore.prototype.markQueryResult = function (queryId, result, fetchMoreForQueryId) {
            if (!this.store[queryId])
                return;
            this.store[queryId].networkError = null;
            this.store[queryId].graphQLErrors =
                result.errors && result.errors.length ? result.errors : [];
            this.store[queryId].previousVariables = null;
            this.store[queryId].networkStatus = exports.NetworkStatus.ready;
            if (typeof fetchMoreForQueryId === 'string' &&
                this.store[fetchMoreForQueryId]) {
                this.store[fetchMoreForQueryId].networkStatus = exports.NetworkStatus.ready;
            }
        };
        QueryStore.prototype.markQueryError = function (queryId, error, fetchMoreForQueryId) {
            if (!this.store[queryId])
                return;
            this.store[queryId].networkError = error;
            this.store[queryId].networkStatus = exports.NetworkStatus.error;
            if (typeof fetchMoreForQueryId === 'string') {
                this.markQueryResultClient(fetchMoreForQueryId, true);
            }
        };
        QueryStore.prototype.markQueryResultClient = function (queryId, complete) {
            if (!this.store[queryId])
                return;
            this.store[queryId].networkError = null;
            this.store[queryId].previousVariables = null;
            this.store[queryId].networkStatus = complete
                ? exports.NetworkStatus.ready
                : exports.NetworkStatus.loading;
        };
        QueryStore.prototype.stopQuery = function (queryId) {
            delete this.store[queryId];
        };
        QueryStore.prototype.reset = function (observableQueryIds) {
            var _this = this;
            this.store = Object.keys(this.store)
                .filter(function (queryId) {
                return observableQueryIds.indexOf(queryId) > -1;
            })
                .reduce(function (res, key) {
                res[key] = __assign$2({}, _this.store[key], { networkStatus: exports.NetworkStatus.loading });
                return res;
            }, {});
        };
        return QueryStore;
    }());

    var __assign$3 = function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var __awaiter = function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var defaultQueryInfo = {
        listeners: [],
        invalidated: false,
        document: null,
        newData: null,
        lastRequestId: null,
        observableQuery: null,
        subscriptions: [],
    };
    var QueryManager = (function () {
        function QueryManager(_a) {
            var link = _a.link, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, store = _a.store, _c = _a.onBroadcast, onBroadcast = _c === void 0 ? function () { return undefined; } : _c, _d = _a.ssrMode, ssrMode = _d === void 0 ? false : _d;
            this.mutationStore = new MutationStore();
            this.queryStore = new QueryStore();
            this.idCounter = 1;
            this.queries = new Map();
            this.fetchQueryPromises = new Map();
            this.queryIdsByName = {};
            this.link = link;
            this.deduplicator = apolloLink.ApolloLink.from([new apolloLinkDedup.DedupLink(), link]);
            this.queryDeduplication = queryDeduplication;
            this.dataStore = store;
            this.onBroadcast = onBroadcast;
            this.scheduler = new QueryScheduler({ queryManager: this, ssrMode: ssrMode });
        }
        QueryManager.prototype.mutate = function (_a) {
            var _this = this;
            var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueriesByName = _a.updateQueries, _b = _a.refetchQueries, refetchQueries = _b === void 0 ? [] : _b, _c = _a.awaitRefetchQueries, awaitRefetchQueries = _c === void 0 ? false : _c, updateWithProxyFn = _a.update, _d = _a.errorPolicy, errorPolicy = _d === void 0 ? 'none' : _d, fetchPolicy = _a.fetchPolicy, _e = _a.context, context = _e === void 0 ? {} : _e;
            if (!mutation) {
                throw new Error('mutation option is required. You must specify your GraphQL document in the mutation option.');
            }
            if (fetchPolicy && fetchPolicy !== 'no-cache') {
                throw new Error("fetchPolicy for mutations currently only supports the 'no-cache' policy");
            }
            var mutationId = this.generateQueryId();
            var cache = this.dataStore.getCache();
            (mutation = cache.transformDocument(mutation)),
                (variables = apolloUtilities.assign({}, apolloUtilities.getDefaultValues(apolloUtilities.getMutationDefinition(mutation)), variables));
            var mutationString = printer.print(mutation);
            this.setQuery(mutationId, function () { return ({ document: mutation }); });
            var generateUpdateQueriesInfo = function () {
                var ret = {};
                if (updateQueriesByName) {
                    Object.keys(updateQueriesByName).forEach(function (queryName) {
                        return (_this.queryIdsByName[queryName] || []).forEach(function (queryId) {
                            ret[queryId] = {
                                updater: updateQueriesByName[queryName],
                                query: _this.queryStore.get(queryId),
                            };
                        });
                    });
                }
                return ret;
            };
            this.mutationStore.initMutation(mutationId, mutationString, variables);
            this.dataStore.markMutationInit({
                mutationId: mutationId,
                document: mutation,
                variables: variables || {},
                updateQueries: generateUpdateQueriesInfo(),
                update: updateWithProxyFn,
                optimisticResponse: optimisticResponse,
            });
            this.broadcastQueries();
            return new Promise(function (resolve, reject) {
                var storeResult;
                var error;
                var operation = _this.buildOperationForLink(mutation, variables, __assign$3({}, context, { optimisticResponse: optimisticResponse }));
                var completeMutation = function () { return __awaiter(_this, void 0, void 0, function () {
                    var refetchQueryPromises, _i, refetchQueries_1, refetchQuery, promise, queryOptions;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error) {
                                    this.mutationStore.markMutationError(mutationId, error);
                                }
                                this.dataStore.markMutationComplete({
                                    mutationId: mutationId,
                                    optimisticResponse: optimisticResponse,
                                });
                                this.broadcastQueries();
                                if (error) {
                                    throw error;
                                }
                                if (typeof refetchQueries === 'function') {
                                    refetchQueries = refetchQueries(storeResult);
                                }
                                refetchQueryPromises = [];
                                for (_i = 0, refetchQueries_1 = refetchQueries; _i < refetchQueries_1.length; _i++) {
                                    refetchQuery = refetchQueries_1[_i];
                                    if (typeof refetchQuery === 'string') {
                                        promise = this.refetchQueryByName(refetchQuery);
                                        if (promise) {
                                            refetchQueryPromises.push(promise);
                                        }
                                        continue;
                                    }
                                    queryOptions = {
                                        query: refetchQuery.query,
                                        variables: refetchQuery.variables,
                                        fetchPolicy: 'network-only',
                                    };
                                    if (refetchQuery.context) {
                                        queryOptions.context = refetchQuery.context;
                                    }
                                    refetchQueryPromises.push(this.query(queryOptions));
                                }
                                if (!awaitRefetchQueries) return [3, 2];
                                return [4, Promise.all(refetchQueryPromises)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                this.setQuery(mutationId, function () { return ({ document: undefined }); });
                                if (errorPolicy === 'ignore' &&
                                    storeResult &&
                                    apolloUtilities.graphQLResultHasError(storeResult)) {
                                    delete storeResult.errors;
                                }
                                return [2, storeResult];
                        }
                    });
                }); };
                apolloLink.execute(_this.link, operation).subscribe({
                    next: function (result) {
                        if (apolloUtilities.graphQLResultHasError(result) && errorPolicy === 'none') {
                            error = new ApolloError({
                                graphQLErrors: result.errors,
                            });
                            return;
                        }
                        _this.mutationStore.markMutationResult(mutationId);
                        if (fetchPolicy !== 'no-cache') {
                            _this.dataStore.markMutationResult({
                                mutationId: mutationId,
                                result: result,
                                document: mutation,
                                variables: variables || {},
                                updateQueries: generateUpdateQueriesInfo(),
                                update: updateWithProxyFn,
                            });
                        }
                        storeResult = result;
                    },
                    error: function (err) {
                        _this.mutationStore.markMutationError(mutationId, err);
                        _this.dataStore.markMutationComplete({
                            mutationId: mutationId,
                            optimisticResponse: optimisticResponse,
                        });
                        _this.broadcastQueries();
                        _this.setQuery(mutationId, function () { return ({ document: undefined }); });
                        reject(new ApolloError({
                            networkError: err,
                        }));
                    },
                    complete: function () { return completeMutation().then(resolve, reject); },
                });
            });
        };
        QueryManager.prototype.fetchQuery = function (queryId, options, fetchType, fetchMoreForQueryId) {
            var _this = this;
            var _a = options.variables, variables = _a === void 0 ? {} : _a, _b = options.metadata, metadata = _b === void 0 ? null : _b, _c = options.fetchPolicy, fetchPolicy = _c === void 0 ? 'cache-first' : _c;
            var cache = this.dataStore.getCache();
            var query = cache.transformDocument(options.query);
            var storeResult;
            var needToFetch = fetchPolicy === 'network-only' || fetchPolicy === 'no-cache';
            if (fetchType !== exports.FetchType.refetch &&
                fetchPolicy !== 'network-only' &&
                fetchPolicy !== 'no-cache') {
                var _d = this.dataStore.getCache().diff({
                    query: query,
                    variables: variables,
                    returnPartialData: true,
                    optimistic: false,
                }), complete = _d.complete, result = _d.result;
                needToFetch = !complete || fetchPolicy === 'cache-and-network';
                storeResult = result;
            }
            var shouldFetch = needToFetch && fetchPolicy !== 'cache-only' && fetchPolicy !== 'standby';
            if (apolloUtilities.hasDirectives(['live'], query))
                shouldFetch = true;
            var requestId = this.generateRequestId();
            var cancel = this.updateQueryWatch(queryId, query, options);
            this.setQuery(queryId, function () { return ({
                document: query,
                lastRequestId: requestId,
                invalidated: true,
                cancel: cancel,
            }); });
            this.invalidate(true, fetchMoreForQueryId);
            this.queryStore.initQuery({
                queryId: queryId,
                document: query,
                storePreviousVariables: shouldFetch,
                variables: variables,
                isPoll: fetchType === exports.FetchType.poll,
                isRefetch: fetchType === exports.FetchType.refetch,
                metadata: metadata,
                fetchMoreForQueryId: fetchMoreForQueryId,
            });
            this.broadcastQueries();
            var shouldDispatchClientResult = !shouldFetch || fetchPolicy === 'cache-and-network';
            if (shouldDispatchClientResult) {
                this.queryStore.markQueryResultClient(queryId, !shouldFetch);
                this.invalidate(true, queryId, fetchMoreForQueryId);
                this.broadcastQueries();
            }
            if (shouldFetch) {
                var networkResult = this.fetchRequest({
                    requestId: requestId,
                    queryId: queryId,
                    document: query,
                    options: options,
                    fetchMoreForQueryId: fetchMoreForQueryId,
                }).catch(function (error) {
                    if (isApolloError(error)) {
                        throw error;
                    }
                    else {
                        var lastRequestId = _this.getQuery(queryId).lastRequestId;
                        if (requestId >= (lastRequestId || 1)) {
                            _this.queryStore.markQueryError(queryId, error, fetchMoreForQueryId);
                            _this.invalidate(true, queryId, fetchMoreForQueryId);
                            _this.broadcastQueries();
                        }
                        _this.removeFetchQueryPromise(requestId);
                        throw new ApolloError({ networkError: error });
                    }
                });
                if (fetchPolicy !== 'cache-and-network') {
                    return networkResult;
                }
                else {
                    networkResult.catch(function () { });
                }
            }
            return Promise.resolve({ data: storeResult });
        };
        QueryManager.prototype.queryListenerForObserver = function (queryId, options, observer) {
            var _this = this;
            var previouslyHadError = false;
            return function (queryStoreValue, newData) {
                _this.invalidate(false, queryId);
                if (!queryStoreValue)
                    return;
                var observableQuery = _this.getQuery(queryId).observableQuery;
                var fetchPolicy = observableQuery
                    ? observableQuery.options.fetchPolicy
                    : options.fetchPolicy;
                if (fetchPolicy === 'standby')
                    return;
                var errorPolicy = observableQuery
                    ? observableQuery.options.errorPolicy
                    : options.errorPolicy;
                var lastResult = observableQuery
                    ? observableQuery.getLastResult()
                    : null;
                var lastError = observableQuery ? observableQuery.getLastError() : null;
                var shouldNotifyIfLoading = (!newData && queryStoreValue.previousVariables != null) ||
                    fetchPolicy === 'cache-only' ||
                    fetchPolicy === 'cache-and-network';
                var networkStatusChanged = Boolean(lastResult &&
                    queryStoreValue.networkStatus !== lastResult.networkStatus);
                var errorStatusChanged = errorPolicy &&
                    (lastError && lastError.graphQLErrors) !==
                        queryStoreValue.graphQLErrors &&
                    errorPolicy !== 'none';
                if (!isNetworkRequestInFlight(queryStoreValue.networkStatus) ||
                    (networkStatusChanged && options.notifyOnNetworkStatusChange) ||
                    shouldNotifyIfLoading) {
                    if (((!errorPolicy || errorPolicy === 'none') &&
                        queryStoreValue.graphQLErrors &&
                        queryStoreValue.graphQLErrors.length > 0) ||
                        queryStoreValue.networkError) {
                        var apolloError_1 = new ApolloError({
                            graphQLErrors: queryStoreValue.graphQLErrors,
                            networkError: queryStoreValue.networkError,
                        });
                        previouslyHadError = true;
                        if (observer.error) {
                            try {
                                observer.error(apolloError_1);
                            }
                            catch (e) {
                                setTimeout(function () {
                                    throw e;
                                }, 0);
                            }
                        }
                        else {
                            setTimeout(function () {
                                throw apolloError_1;
                            }, 0);
                            if (!apolloUtilities.isProduction()) {
                                console.info('An unhandled error was thrown because no error handler is registered ' +
                                    'for the query ' +
                                    printer.print(queryStoreValue.document));
                            }
                        }
                        return;
                    }
                    try {
                        var data = void 0;
                        var isMissing = void 0;
                        if (newData) {
                            if (fetchPolicy !== 'no-cache') {
                                _this.setQuery(queryId, function () { return ({ newData: null }); });
                            }
                            data = newData.result;
                            isMissing = !newData.complete || false;
                        }
                        else {
                            if (lastResult && lastResult.data && !errorStatusChanged) {
                                data = lastResult.data;
                                isMissing = false;
                            }
                            else {
                                var document_1 = _this.getQuery(queryId).document;
                                var readResult = _this.dataStore.getCache().diff({
                                    query: document_1,
                                    variables: queryStoreValue.previousVariables ||
                                        queryStoreValue.variables,
                                    optimistic: true,
                                });
                                data = readResult.result;
                                isMissing = !readResult.complete;
                            }
                        }
                        var resultFromStore = void 0;
                        if (isMissing && fetchPolicy !== 'cache-only') {
                            resultFromStore = {
                                data: lastResult && lastResult.data,
                                loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: true,
                            };
                        }
                        else {
                            resultFromStore = {
                                data: data,
                                loading: isNetworkRequestInFlight(queryStoreValue.networkStatus),
                                networkStatus: queryStoreValue.networkStatus,
                                stale: false,
                            };
                        }
                        if (errorPolicy === 'all' &&
                            queryStoreValue.graphQLErrors &&
                            queryStoreValue.graphQLErrors.length > 0) {
                            resultFromStore.errors = queryStoreValue.graphQLErrors;
                        }
                        if (observer.next) {
                            var isDifferentResult = !(lastResult &&
                                resultFromStore &&
                                lastResult.networkStatus === resultFromStore.networkStatus &&
                                lastResult.stale === resultFromStore.stale &&
                                lastResult.data === resultFromStore.data);
                            if (isDifferentResult || previouslyHadError) {
                                try {
                                    observer.next(resultFromStore);
                                }
                                catch (e) {
                                    setTimeout(function () {
                                        throw e;
                                    }, 0);
                                }
                            }
                        }
                        previouslyHadError = false;
                    }
                    catch (error) {
                        previouslyHadError = true;
                        if (observer.error)
                            observer.error(new ApolloError({ networkError: error }));
                        return;
                    }
                }
            };
        };
        QueryManager.prototype.watchQuery = function (options, shouldSubscribe) {
            if (shouldSubscribe === void 0) { shouldSubscribe = true; }
            if (options.fetchPolicy === 'standby') {
                throw new Error('client.watchQuery cannot be called with fetchPolicy set to "standby"');
            }
            var queryDefinition = apolloUtilities.getQueryDefinition(options.query);
            if (queryDefinition.variableDefinitions &&
                queryDefinition.variableDefinitions.length) {
                var defaultValues = apolloUtilities.getDefaultValues(queryDefinition);
                options.variables = apolloUtilities.assign({}, defaultValues, options.variables);
            }
            if (typeof options.notifyOnNetworkStatusChange === 'undefined') {
                options.notifyOnNetworkStatusChange = false;
            }
            var transformedOptions = __assign$3({}, options);
            return new ObservableQuery({
                scheduler: this.scheduler,
                options: transformedOptions,
                shouldSubscribe: shouldSubscribe,
            });
        };
        QueryManager.prototype.query = function (options) {
            var _this = this;
            if (!options.query) {
                throw new Error('query option is required. You must specify your GraphQL document ' +
                    'in the query option.');
            }
            if (options.query.kind !== 'Document') {
                throw new Error('You must wrap the query string in a "gql" tag.');
            }
            if (options.returnPartialData) {
                throw new Error('returnPartialData option only supported on watchQuery.');
            }
            if (options.pollInterval) {
                throw new Error('pollInterval option only supported on watchQuery.');
            }
            var requestId = this.idCounter;
            return new Promise(function (resolve, reject) {
                _this.addFetchQueryPromise(requestId, resolve, reject);
                return _this.watchQuery(options, false)
                    .result()
                    .then(function (result) {
                    _this.removeFetchQueryPromise(requestId);
                    resolve(result);
                })
                    .catch(function (error) {
                    _this.removeFetchQueryPromise(requestId);
                    reject(error);
                });
            });
        };
        QueryManager.prototype.generateQueryId = function () {
            var queryId = this.idCounter.toString();
            this.idCounter++;
            return queryId;
        };
        QueryManager.prototype.stopQueryInStore = function (queryId) {
            this.queryStore.stopQuery(queryId);
            this.invalidate(true, queryId);
            this.broadcastQueries();
        };
        QueryManager.prototype.addQueryListener = function (queryId, listener) {
            this.setQuery(queryId, function (_a) {
                var _b = _a.listeners, listeners = _b === void 0 ? [] : _b;
                return ({
                    listeners: listeners.concat([listener]),
                    invalidate: false,
                });
            });
        };
        QueryManager.prototype.updateQueryWatch = function (queryId, document, options) {
            var _this = this;
            var cancel = this.getQuery(queryId).cancel;
            if (cancel)
                cancel();
            var previousResult = function () {
                var previousResult = null;
                var observableQuery = _this.getQuery(queryId).observableQuery;
                if (observableQuery) {
                    var lastResult = observableQuery.getLastResult();
                    if (lastResult) {
                        previousResult = lastResult.data;
                    }
                }
                return previousResult;
            };
            return this.dataStore.getCache().watch({
                query: document,
                variables: options.variables,
                optimistic: true,
                previousResult: previousResult,
                callback: function (newData) {
                    _this.setQuery(queryId, function () { return ({ invalidated: true, newData: newData }); });
                },
            });
        };
        QueryManager.prototype.addFetchQueryPromise = function (requestId, resolve, reject) {
            this.fetchQueryPromises.set(requestId.toString(), {
                resolve: resolve,
                reject: reject,
            });
        };
        QueryManager.prototype.removeFetchQueryPromise = function (requestId) {
            this.fetchQueryPromises.delete(requestId.toString());
        };
        QueryManager.prototype.addObservableQuery = function (queryId, observableQuery) {
            this.setQuery(queryId, function () { return ({ observableQuery: observableQuery }); });
            var queryDef = apolloUtilities.getQueryDefinition(observableQuery.options.query);
            if (queryDef.name && queryDef.name.value) {
                var queryName = queryDef.name.value;
                this.queryIdsByName[queryName] = this.queryIdsByName[queryName] || [];
                this.queryIdsByName[queryName].push(observableQuery.queryId);
            }
        };
        QueryManager.prototype.removeObservableQuery = function (queryId) {
            var _a = this.getQuery(queryId), observableQuery = _a.observableQuery, cancel = _a.cancel;
            if (cancel)
                cancel();
            if (!observableQuery)
                return;
            var definition = apolloUtilities.getQueryDefinition(observableQuery.options.query);
            var queryName = definition.name ? definition.name.value : null;
            this.setQuery(queryId, function () { return ({ observableQuery: null }); });
            if (queryName) {
                this.queryIdsByName[queryName] = this.queryIdsByName[queryName].filter(function (val) {
                    return !(observableQuery.queryId === val);
                });
            }
        };
        QueryManager.prototype.clearStore = function () {
            this.fetchQueryPromises.forEach(function (_a) {
                var reject = _a.reject;
                reject(new Error('Store reset while query was in flight(not completed in link chain)'));
            });
            var resetIds = [];
            this.queries.forEach(function (_a, queryId) {
                var observableQuery = _a.observableQuery;
                if (observableQuery)
                    resetIds.push(queryId);
            });
            this.queryStore.reset(resetIds);
            this.mutationStore.reset();
            var reset = this.dataStore.reset();
            return reset;
        };
        QueryManager.prototype.resetStore = function () {
            var _this = this;
            return this.clearStore().then(function () {
                return _this.reFetchObservableQueries();
            });
        };
        QueryManager.prototype.reFetchObservableQueries = function (includeStandby) {
            var observableQueryPromises = this.getObservableQueryPromises(includeStandby);
            this.broadcastQueries();
            return Promise.all(observableQueryPromises);
        };
        QueryManager.prototype.startQuery = function (queryId, options, listener) {
            this.addQueryListener(queryId, listener);
            this.fetchQuery(queryId, options)
                .catch(function () { return undefined; });
            return queryId;
        };
        QueryManager.prototype.startGraphQLSubscription = function (options) {
            var _this = this;
            var query = options.query;
            var isCacheEnabled = !(options.fetchPolicy && options.fetchPolicy === 'no-cache');
            var cache = this.dataStore.getCache();
            var transformedDoc = cache.transformDocument(query);
            var variables = apolloUtilities.assign({}, apolloUtilities.getDefaultValues(apolloUtilities.getOperationDefinition(query)), options.variables);
            var sub;
            var observers = [];
            return new Observable(function (observer) {
                observers.push(observer);
                if (observers.length === 1) {
                    var handler = {
                        next: function (result) {
                            if (isCacheEnabled) {
                                _this.dataStore.markSubscriptionResult(result, transformedDoc, variables);
                                _this.broadcastQueries();
                            }
                            observers.forEach(function (obs) {
                                if (apolloUtilities.graphQLResultHasError(result) && obs.error) {
                                    obs.error(new ApolloError({
                                        graphQLErrors: result.errors,
                                    }));
                                }
                                else if (obs.next) {
                                    obs.next(result);
                                }
                            });
                        },
                        error: function (error) {
                            observers.forEach(function (obs) {
                                if (obs.error) {
                                    obs.error(error);
                                }
                            });
                        },
                    };
                    var operation = _this.buildOperationForLink(transformedDoc, variables);
                    sub = apolloLink.execute(_this.link, operation).subscribe(handler);
                }
                return function () {
                    observers = observers.filter(function (obs) { return obs !== observer; });
                    if (observers.length === 0 && sub) {
                        sub.unsubscribe();
                    }
                };
            });
        };
        QueryManager.prototype.stopQuery = function (queryId) {
            this.stopQueryInStore(queryId);
            this.removeQuery(queryId);
        };
        QueryManager.prototype.removeQuery = function (queryId) {
            var subscriptions = this.getQuery(queryId).subscriptions;
            subscriptions.forEach(function (x) { return x.unsubscribe(); });
            this.queries.delete(queryId);
        };
        QueryManager.prototype.getCurrentQueryResult = function (observableQuery, optimistic) {
            if (optimistic === void 0) { optimistic = true; }
            var _a = observableQuery.options, variables = _a.variables, query = _a.query;
            var lastResult = observableQuery.getLastResult();
            var newData = this.getQuery(observableQuery.queryId).newData;
            if (newData) {
                return { data: newData.result, partial: false };
            }
            else {
                try {
                    var data = this.dataStore.getCache().read({
                        query: query,
                        variables: variables,
                        previousResult: lastResult ? lastResult.data : undefined,
                        optimistic: optimistic,
                    });
                    return { data: data, partial: false };
                }
                catch (e) {
                    return { data: {}, partial: true };
                }
            }
        };
        QueryManager.prototype.getQueryWithPreviousResult = function (queryIdOrObservable) {
            var observableQuery;
            if (typeof queryIdOrObservable === 'string') {
                var foundObserveableQuery = this.getQuery(queryIdOrObservable).observableQuery;
                if (!foundObserveableQuery) {
                    throw new Error("ObservableQuery with this id doesn't exist: " + queryIdOrObservable);
                }
                observableQuery = foundObserveableQuery;
            }
            else {
                observableQuery = queryIdOrObservable;
            }
            var _a = observableQuery.options, variables = _a.variables, query = _a.query;
            var data = this.getCurrentQueryResult(observableQuery, false).data;
            return {
                previousResult: data,
                variables: variables,
                document: query,
            };
        };
        QueryManager.prototype.broadcastQueries = function () {
            var _this = this;
            this.onBroadcast();
            this.queries.forEach(function (info, id) {
                if (!info.invalidated || !info.listeners)
                    return;
                info.listeners
                    .filter(function (x) { return !!x; })
                    .forEach(function (listener) {
                    listener(_this.queryStore.get(id), info.newData);
                });
            });
        };
        QueryManager.prototype.getObservableQueryPromises = function (includeStandby) {
            var _this = this;
            var observableQueryPromises = [];
            this.queries.forEach(function (_a, queryId) {
                var observableQuery = _a.observableQuery;
                if (!observableQuery)
                    return;
                var fetchPolicy = observableQuery.options.fetchPolicy;
                observableQuery.resetLastResults();
                if (fetchPolicy !== 'cache-only' &&
                    (includeStandby || fetchPolicy !== 'standby')) {
                    observableQueryPromises.push(observableQuery.refetch());
                }
                _this.setQuery(queryId, function () { return ({ newData: null }); });
                _this.invalidate(true, queryId);
            });
            return observableQueryPromises;
        };
        QueryManager.prototype.fetchRequest = function (_a) {
            var _this = this;
            var requestId = _a.requestId, queryId = _a.queryId, document = _a.document, options = _a.options, fetchMoreForQueryId = _a.fetchMoreForQueryId;
            var variables = options.variables, context = options.context, _b = options.errorPolicy, errorPolicy = _b === void 0 ? 'none' : _b, fetchPolicy = options.fetchPolicy;
            var operation = this.buildOperationForLink(document, variables, __assign$3({}, context, { forceFetch: !this.queryDeduplication }));
            var resultFromStore;
            var errorsFromStore;
            return new Promise(function (resolve, reject) {
                _this.addFetchQueryPromise(requestId, resolve, reject);
                var subscription = apolloLink.execute(_this.deduplicator, operation).subscribe({
                    next: function (result) {
                        var lastRequestId = _this.getQuery(queryId).lastRequestId;
                        if (requestId >= (lastRequestId || 1)) {
                            if (fetchPolicy !== 'no-cache') {
                                try {
                                    _this.dataStore.markQueryResult(result, document, variables, fetchMoreForQueryId, errorPolicy === 'ignore' || errorPolicy === 'all');
                                }
                                catch (e) {
                                    reject(e);
                                    return;
                                }
                            }
                            else {
                                _this.setQuery(queryId, function () { return ({
                                    newData: { result: result.data, complete: true },
                                }); });
                            }
                            _this.queryStore.markQueryResult(queryId, result, fetchMoreForQueryId);
                            _this.invalidate(true, queryId, fetchMoreForQueryId);
                            _this.broadcastQueries();
                        }
                        if (result.errors && errorPolicy === 'none') {
                            reject(new ApolloError({
                                graphQLErrors: result.errors,
                            }));
                            return;
                        }
                        else if (errorPolicy === 'all') {
                            errorsFromStore = result.errors;
                        }
                        if (fetchMoreForQueryId || fetchPolicy === 'no-cache') {
                            resultFromStore = result.data;
                        }
                        else {
                            try {
                                resultFromStore = _this.dataStore.getCache().read({
                                    variables: variables,
                                    query: document,
                                    optimistic: false,
                                });
                            }
                            catch (e) { }
                        }
                    },
                    error: function (error) {
                        _this.removeFetchQueryPromise(requestId);
                        _this.setQuery(queryId, function (_a) {
                            var subscriptions = _a.subscriptions;
                            return ({
                                subscriptions: subscriptions.filter(function (x) { return x !== subscription; }),
                            });
                        });
                        reject(error);
                    },
                    complete: function () {
                        _this.removeFetchQueryPromise(requestId);
                        _this.setQuery(queryId, function (_a) {
                            var subscriptions = _a.subscriptions;
                            return ({
                                subscriptions: subscriptions.filter(function (x) { return x !== subscription; }),
                            });
                        });
                        resolve({
                            data: resultFromStore,
                            errors: errorsFromStore,
                            loading: false,
                            networkStatus: exports.NetworkStatus.ready,
                            stale: false,
                        });
                    },
                });
                _this.setQuery(queryId, function (_a) {
                    var subscriptions = _a.subscriptions;
                    return ({
                        subscriptions: subscriptions.concat([subscription]),
                    });
                });
            });
        };
        QueryManager.prototype.refetchQueryByName = function (queryName) {
            var _this = this;
            var refetchedQueries = this.queryIdsByName[queryName];
            if (refetchedQueries === undefined)
                return;
            return Promise.all(refetchedQueries
                .map(function (id) { return _this.getQuery(id).observableQuery; })
                .filter(function (x) { return !!x; })
                .map(function (x) { return x.refetch(); }));
        };
        QueryManager.prototype.generateRequestId = function () {
            var requestId = this.idCounter;
            this.idCounter++;
            return requestId;
        };
        QueryManager.prototype.getQuery = function (queryId) {
            return this.queries.get(queryId) || __assign$3({}, defaultQueryInfo);
        };
        QueryManager.prototype.setQuery = function (queryId, updater) {
            var prev = this.getQuery(queryId);
            var newInfo = __assign$3({}, prev, updater(prev));
            this.queries.set(queryId, newInfo);
        };
        QueryManager.prototype.invalidate = function (invalidated, queryId, fetchMoreForQueryId) {
            if (queryId)
                this.setQuery(queryId, function () { return ({ invalidated: invalidated }); });
            if (fetchMoreForQueryId) {
                this.setQuery(fetchMoreForQueryId, function () { return ({ invalidated: invalidated }); });
            }
        };
        QueryManager.prototype.buildOperationForLink = function (document, variables, extraContext) {
            var cache = this.dataStore.getCache();
            return {
                query: cache.transformForLink
                    ? cache.transformForLink(document)
                    : document,
                variables: variables,
                operationName: apolloUtilities.getOperationName(document) || undefined,
                context: __assign$3({}, extraContext, { cache: cache, getCacheKey: function (obj) {
                        if (cache.config) {
                            return cache.config.dataIdFromObject(obj);
                        }
                        else {
                            throw new Error('To use context.getCacheKey, you need to use a cache that has a configurable dataIdFromObject, like apollo-cache-inmemory.');
                        }
                    } }),
            };
        };
        return QueryManager;
    }());

    var DataStore = (function () {
        function DataStore(initialCache) {
            this.cache = initialCache;
        }
        DataStore.prototype.getCache = function () {
            return this.cache;
        };
        DataStore.prototype.markQueryResult = function (result, document, variables, fetchMoreForQueryId, ignoreErrors) {
            if (ignoreErrors === void 0) { ignoreErrors = false; }
            var writeWithErrors = !apolloUtilities.graphQLResultHasError(result);
            if (ignoreErrors && apolloUtilities.graphQLResultHasError(result) && result.data) {
                writeWithErrors = true;
            }
            if (!fetchMoreForQueryId && writeWithErrors) {
                this.cache.write({
                    result: result.data,
                    dataId: 'ROOT_QUERY',
                    query: document,
                    variables: variables,
                });
            }
        };
        DataStore.prototype.markSubscriptionResult = function (result, document, variables) {
            if (!apolloUtilities.graphQLResultHasError(result)) {
                this.cache.write({
                    result: result.data,
                    dataId: 'ROOT_SUBSCRIPTION',
                    query: document,
                    variables: variables,
                });
            }
        };
        DataStore.prototype.markMutationInit = function (mutation) {
            var _this = this;
            if (mutation.optimisticResponse) {
                var optimistic_1;
                if (typeof mutation.optimisticResponse === 'function') {
                    optimistic_1 = mutation.optimisticResponse(mutation.variables);
                }
                else {
                    optimistic_1 = mutation.optimisticResponse;
                }
                var changeFn_1 = function () {
                    _this.markMutationResult({
                        mutationId: mutation.mutationId,
                        result: { data: optimistic_1 },
                        document: mutation.document,
                        variables: mutation.variables,
                        updateQueries: mutation.updateQueries,
                        update: mutation.update,
                    });
                };
                this.cache.recordOptimisticTransaction(function (c) {
                    var orig = _this.cache;
                    _this.cache = c;
                    try {
                        changeFn_1();
                    }
                    finally {
                        _this.cache = orig;
                    }
                }, mutation.mutationId);
            }
        };
        DataStore.prototype.markMutationResult = function (mutation) {
            var _this = this;
            if (!apolloUtilities.graphQLResultHasError(mutation.result)) {
                var cacheWrites_1 = [];
                cacheWrites_1.push({
                    result: mutation.result.data,
                    dataId: 'ROOT_MUTATION',
                    query: mutation.document,
                    variables: mutation.variables,
                });
                if (mutation.updateQueries) {
                    Object.keys(mutation.updateQueries)
                        .filter(function (id) { return mutation.updateQueries[id]; })
                        .forEach(function (queryId) {
                        var _a = mutation.updateQueries[queryId], query = _a.query, updater = _a.updater;
                        var _b = _this.cache.diff({
                            query: query.document,
                            variables: query.variables,
                            returnPartialData: true,
                            optimistic: false,
                        }), currentQueryResult = _b.result, complete = _b.complete;
                        if (!complete) {
                            return;
                        }
                        var nextQueryResult = apolloUtilities.tryFunctionOrLogError(function () {
                            return updater(currentQueryResult, {
                                mutationResult: mutation.result,
                                queryName: apolloUtilities.getOperationName(query.document) || undefined,
                                queryVariables: query.variables,
                            });
                        });
                        if (nextQueryResult) {
                            cacheWrites_1.push({
                                result: nextQueryResult,
                                dataId: 'ROOT_QUERY',
                                query: query.document,
                                variables: query.variables,
                            });
                        }
                    });
                }
                this.cache.performTransaction(function (c) {
                    cacheWrites_1.forEach(function (write) { return c.write(write); });
                });
                var update_1 = mutation.update;
                if (update_1) {
                    this.cache.performTransaction(function (c) {
                        apolloUtilities.tryFunctionOrLogError(function () { return update_1(c, mutation.result); });
                    });
                }
            }
        };
        DataStore.prototype.markMutationComplete = function (_a) {
            var mutationId = _a.mutationId, optimisticResponse = _a.optimisticResponse;
            if (!optimisticResponse)
                return;
            this.cache.removeOptimistic(mutationId);
        };
        DataStore.prototype.markUpdateQueryResult = function (document, variables, newResult) {
            this.cache.write({
                result: newResult,
                dataId: 'ROOT_QUERY',
                variables: variables,
                query: document,
            });
        };
        DataStore.prototype.reset = function () {
            return this.cache.reset();
        };
        return DataStore;
    }());

    var version = "2.4.2";

    var __assign$4 = function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
    };
    var hasSuggestedDevtools = false;
    var supportedDirectives = new apolloLink.ApolloLink(function (operation, forward) {
        operation.query = apolloUtilities.removeConnectionDirectiveFromDocument(operation.query);
        return forward(operation);
    });
    var ApolloClient = (function () {
        function ApolloClient(options) {
            var _this = this;
            this.defaultOptions = {};
            this.resetStoreCallbacks = [];
            var link = options.link, cache = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, connectToDevTools = options.connectToDevTools, _c = options.queryDeduplication, queryDeduplication = _c === void 0 ? true : _c, defaultOptions = options.defaultOptions;
            if (!link || !cache) {
                throw new Error("\n        In order to initialize Apollo Client, you must specify link & cache properties on the config object.\n        This is part of the required upgrade when migrating from Apollo Client 1.0 to Apollo Client 2.0.\n        For more information, please visit:\n          https://www.apollographql.com/docs/react/basics/setup.html\n        to help you get started.\n      ");
            }
            this.link = supportedDirectives.concat(link);
            this.cache = cache;
            this.store = new DataStore(cache);
            this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
            this.queryDeduplication = queryDeduplication;
            this.ssrMode = ssrMode;
            this.defaultOptions = defaultOptions || {};
            if (ssrForceFetchDelay) {
                setTimeout(function () { return (_this.disableNetworkFetches = false); }, ssrForceFetchDelay);
            }
            this.watchQuery = this.watchQuery.bind(this);
            this.query = this.query.bind(this);
            this.mutate = this.mutate.bind(this);
            this.resetStore = this.resetStore.bind(this);
            this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
            var defaultConnectToDevTools = !apolloUtilities.isProduction() &&
                typeof window !== 'undefined' &&
                !window.__APOLLO_CLIENT__;
            if (typeof connectToDevTools === 'undefined'
                ? defaultConnectToDevTools
                : connectToDevTools && typeof window !== 'undefined') {
                window.__APOLLO_CLIENT__ = this;
            }
            if (!hasSuggestedDevtools && !apolloUtilities.isProduction()) {
                hasSuggestedDevtools = true;
                if (typeof window !== 'undefined' &&
                    window.document &&
                    window.top === window.self) {
                    if (typeof window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                        if (window.navigator &&
                            window.navigator.userAgent.indexOf('Chrome') > -1) {
                            console.debug('Download the Apollo DevTools ' +
                                'for a better development experience: ' +
                                'https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm');
                        }
                    }
                }
            }
            this.version = version;
        }
        ApolloClient.prototype.watchQuery = function (options) {
            if (this.defaultOptions.watchQuery) {
                options = __assign$4({}, this.defaultOptions.watchQuery, options);
            }
            if (this.disableNetworkFetches &&
                (options.fetchPolicy === 'network-only' ||
                    options.fetchPolicy === 'cache-and-network')) {
                options = __assign$4({}, options, { fetchPolicy: 'cache-first' });
            }
            return this.initQueryManager().watchQuery(options);
        };
        ApolloClient.prototype.query = function (options) {
            if (this.defaultOptions.query) {
                options = __assign$4({}, this.defaultOptions.query, options);
            }
            if (options.fetchPolicy === 'cache-and-network') {
                throw new Error('cache-and-network fetchPolicy can only be used with watchQuery');
            }
            if (this.disableNetworkFetches && options.fetchPolicy === 'network-only') {
                options = __assign$4({}, options, { fetchPolicy: 'cache-first' });
            }
            return this.initQueryManager().query(options);
        };
        ApolloClient.prototype.mutate = function (options) {
            if (this.defaultOptions.mutate) {
                options = __assign$4({}, this.defaultOptions.mutate, options);
            }
            return this.initQueryManager().mutate(options);
        };
        ApolloClient.prototype.subscribe = function (options) {
            return this.initQueryManager().startGraphQLSubscription(options);
        };
        ApolloClient.prototype.readQuery = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.initProxy().readQuery(options, optimistic);
        };
        ApolloClient.prototype.readFragment = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.initProxy().readFragment(options, optimistic);
        };
        ApolloClient.prototype.writeQuery = function (options) {
            var result = this.initProxy().writeQuery(options);
            this.initQueryManager().broadcastQueries();
            return result;
        };
        ApolloClient.prototype.writeFragment = function (options) {
            var result = this.initProxy().writeFragment(options);
            this.initQueryManager().broadcastQueries();
            return result;
        };
        ApolloClient.prototype.writeData = function (options) {
            var result = this.initProxy().writeData(options);
            this.initQueryManager().broadcastQueries();
            return result;
        };
        ApolloClient.prototype.__actionHookForDevTools = function (cb) {
            this.devToolsHookCb = cb;
        };
        ApolloClient.prototype.__requestRaw = function (payload) {
            return apolloLink.execute(this.link, payload);
        };
        ApolloClient.prototype.initQueryManager = function () {
            var _this = this;
            if (!this.queryManager) {
                this.queryManager = new QueryManager({
                    link: this.link,
                    store: this.store,
                    queryDeduplication: this.queryDeduplication,
                    ssrMode: this.ssrMode,
                    onBroadcast: function () {
                        if (_this.devToolsHookCb) {
                            _this.devToolsHookCb({
                                action: {},
                                state: {
                                    queries: _this.queryManager
                                        ? _this.queryManager.queryStore.getStore()
                                        : {},
                                    mutations: _this.queryManager
                                        ? _this.queryManager.mutationStore.getStore()
                                        : {},
                                },
                                dataWithOptimisticResults: _this.cache.extract(true),
                            });
                        }
                    },
                });
            }
            return this.queryManager;
        };
        ApolloClient.prototype.resetStore = function () {
            var _this = this;
            return Promise.resolve()
                .then(function () {
                return _this.queryManager
                    ? _this.queryManager.clearStore()
                    : Promise.resolve(null);
            })
                .then(function () { return Promise.all(_this.resetStoreCallbacks.map(function (fn) { return fn(); })); })
                .then(function () {
                return _this.queryManager && _this.queryManager.reFetchObservableQueries
                    ? _this.queryManager.reFetchObservableQueries()
                    : Promise.resolve(null);
            });
        };
        ApolloClient.prototype.clearStore = function () {
            var queryManager = this.queryManager;
            return Promise.resolve().then(function () { return (queryManager ? queryManager.clearStore() : Promise.resolve(null)); });
        };
        ApolloClient.prototype.onResetStore = function (cb) {
            var _this = this;
            this.resetStoreCallbacks.push(cb);
            return function () {
                _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function (c) { return c !== cb; });
            };
        };
        ApolloClient.prototype.reFetchObservableQueries = function (includeStandby) {
            return this.queryManager
                ? this.queryManager.reFetchObservableQueries(includeStandby)
                : Promise.resolve(null);
        };
        ApolloClient.prototype.extract = function (optimistic) {
            return this.initProxy().extract(optimistic);
        };
        ApolloClient.prototype.restore = function (serializedState) {
            return this.initProxy().restore(serializedState);
        };
        ApolloClient.prototype.initProxy = function () {
            if (!this.proxy) {
                this.initQueryManager();
                this.proxy = this.cache;
            }
            return this.proxy;
        };
        return ApolloClient;
    }());

    exports.printAST = printer.print;
    exports.ApolloClient = ApolloClient;
    exports.default = ApolloClient;
    exports.ObservableQuery = ObservableQuery;
    exports.ApolloError = ApolloError;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$8);
var bundle_umd_1$1 = bundle_umd$8.ApolloClient;

var bundle_umd$a = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd);
}(commonjsGlobal, (function (exports,apolloUtilities) {
    function queryFromPojo(obj) {
        var op = {
            kind: 'OperationDefinition',
            operation: 'query',
            name: {
                kind: 'Name',
                value: 'GeneratedClientQuery',
            },
            selectionSet: selectionSetFromObj(obj),
        };
        var out = {
            kind: 'Document',
            definitions: [op],
        };
        return out;
    }
    function fragmentFromPojo(obj, typename) {
        var frag = {
            kind: 'FragmentDefinition',
            typeCondition: {
                kind: 'NamedType',
                name: {
                    kind: 'Name',
                    value: typename || '__FakeType',
                },
            },
            name: {
                kind: 'Name',
                value: 'GeneratedClientQuery',
            },
            selectionSet: selectionSetFromObj(obj),
        };
        var out = {
            kind: 'Document',
            definitions: [frag],
        };
        return out;
    }
    function selectionSetFromObj(obj) {
        if (typeof obj === 'number' ||
            typeof obj === 'boolean' ||
            typeof obj === 'string' ||
            typeof obj === 'undefined' ||
            obj === null) {
            return null;
        }
        if (Array.isArray(obj)) {
            return selectionSetFromObj(obj[0]);
        }
        var selections = [];
        Object.keys(obj).forEach(function (key) {
            var field = {
                kind: 'Field',
                name: {
                    kind: 'Name',
                    value: key,
                },
            };
            var nestedSelSet = selectionSetFromObj(obj[key]);
            if (nestedSelSet) {
                field.selectionSet = nestedSelSet;
            }
            selections.push(field);
        });
        var selectionSet = {
            kind: 'SelectionSet',
            selections: selections,
        };
        return selectionSet;
    }
    var justTypenameQuery = {
        kind: 'Document',
        definitions: [
            {
                kind: 'OperationDefinition',
                operation: 'query',
                name: null,
                variableDefinitions: null,
                directives: [],
                selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                        {
                            kind: 'Field',
                            alias: null,
                            name: {
                                kind: 'Name',
                                value: '__typename',
                            },
                            arguments: [],
                            directives: [],
                            selectionSet: null,
                        },
                    ],
                },
            },
        ],
    };

    var ApolloCache = (function () {
        function ApolloCache() {
        }
        ApolloCache.prototype.transformDocument = function (document) {
            return document;
        };
        ApolloCache.prototype.transformForLink = function (document) {
            return document;
        };
        ApolloCache.prototype.readQuery = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.read({
                query: options.query,
                variables: options.variables,
                optimistic: optimistic,
            });
        };
        ApolloCache.prototype.readFragment = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.read({
                query: apolloUtilities.getFragmentQueryDocument(options.fragment, options.fragmentName),
                variables: options.variables,
                rootId: options.id,
                optimistic: optimistic,
            });
        };
        ApolloCache.prototype.writeQuery = function (options) {
            this.write({
                dataId: 'ROOT_QUERY',
                result: options.data,
                query: options.query,
                variables: options.variables,
            });
        };
        ApolloCache.prototype.writeFragment = function (options) {
            this.write({
                dataId: options.id,
                result: options.data,
                variables: options.variables,
                query: apolloUtilities.getFragmentQueryDocument(options.fragment, options.fragmentName),
            });
        };
        ApolloCache.prototype.writeData = function (_a) {
            var id = _a.id, data = _a.data;
            if (typeof id !== 'undefined') {
                var typenameResult = null;
                try {
                    typenameResult = this.read({
                        rootId: id,
                        optimistic: false,
                        query: justTypenameQuery,
                    });
                }
                catch (e) {
                }
                var __typename = (typenameResult && typenameResult.__typename) || '__ClientData';
                var dataToWrite = Object.assign({ __typename: __typename }, data);
                this.writeFragment({
                    id: id,
                    fragment: fragmentFromPojo(dataToWrite, __typename),
                    data: dataToWrite,
                });
            }
            else {
                this.writeQuery({ query: queryFromPojo(data), data: data });
            }
        };
        return ApolloCache;
    }());

    (function (Cache) {
    })(exports.Cache || (exports.Cache = {}));

    exports.ApolloCache = ApolloCache;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$a);

function Cache(options) {
  this.map = new Map;
  this.newest = null;
  this.oldest = null;
  this.max = options && options.max;
  this.dispose = options && options.dispose;
}

var Cache_1 = Cache;

var Cp = Cache.prototype;

Cp.has = function (key) {
  return this.map.has(key);
};

Cp.get = function (key) {
  var entry = getEntry(this, key);
  return entry && entry.value;
};

function getEntry(cache, key) {
  var entry = cache.map.get(key);
  if (entry &&
      entry !== cache.newest) {
    var older = entry.older;
    var newer = entry.newer;

    if (newer) {
      newer.older = older;
    }

    if (older) {
      older.newer = newer;
    }

    entry.older = cache.newest;
    entry.older.newer = entry;

    entry.newer = null;
    cache.newest = entry;

    if (entry === cache.oldest) {
      cache.oldest = newer;
    }
  }

  return entry;
}

Cp.set = function (key, value) {
  var entry = getEntry(this, key);
  if (entry) {
    return entry.value = value;
  }

  entry = {
    key: key,
    value: value,
    newer: null,
    older: this.newest
  };

  if (this.newest) {
    this.newest.newer = entry;
  }

  this.newest = entry;
  this.oldest = this.oldest || entry;

  this.map.set(key, entry);

  if (typeof this.max === "number") {
    while (this.oldest &&
           this.map.size > this.max) {
      this.delete(this.oldest.key);
    }
  }

  return entry.value;
};

Cp.delete = function (key) {
  var entry = this.map.get(key);
  if (entry) {
    if (entry === this.newest) {
      this.newest = entry.older;
    }

    if (entry === this.oldest) {
      this.oldest = entry.newer;
    }

    if (entry.newer) {
      entry.newer.older = entry.older;
    }

    if (entry.older) {
      entry.older.newer = entry.newer;
    }

    this.map.delete(key);

    if (typeof this.dispose === "function") {
      this.dispose(key, entry.value);
    }

    return true;
  }

  return false;
};

var cache = {
	Cache: Cache_1
};

var tuple_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', { value: true });

// A map data structure that holds object keys weakly, yet can also hold
// non-object keys, unlike the native `WeakMap`.
var UniversalWeakMap = function UniversalWeakMap() {
  // Since a `WeakMap` cannot hold primitive values as keys, we need a
  // backup `Map` instance to hold primitive keys. Both `this._weakMap`
  // and `this._strongMap` are lazily initialized.
  this._weakMap = null;
  this._strongMap = null;
  this.data = null;
};

// Since `get` and `set` are the only methods used, that's all I've
// implemented here.

UniversalWeakMap.prototype.get = function get (key) {
  var map = this._getMap(key, false);
  if (map) {
    return map.get(key);
  }
};

UniversalWeakMap.prototype.set = function set (key, value) {
  this._getMap(key, true).set(key, value);
  // An actual `Map` or `WeakMap` would return `this` here, but
  // returning the `value` is more convenient for the `tuple`
  // implementation.
  return value;
};

UniversalWeakMap.prototype._getMap = function _getMap (key, canCreate) {
  if (! canCreate) {
    return isObjRef(key) ? this._weakMap : this._strongMap;
  }
  if (isObjRef(key)) {
    return this._weakMap || (this._weakMap = new WeakMap);
  }
  return this._strongMap || (this._strongMap = new Map);
};

function isObjRef(value) {
  switch (typeof value) {
  case "object":
    if (value === null) {
      return false;
    }
  case "function":
    return true;
  default:
    return false;
  }
}

// Although `Symbol` is widely supported these days, we can safely fall
// back to using a non-enumerable string property without violating any
// assumptions elsewhere in the implementation.
var useSymbol = typeof Symbol === "function";

// Used to mark `tuple.prototype` so that all objects that inherit from
// any `tuple.prototype` object (there could be more than one) will test
// positive according to `tuple.isTuple`.
var brand = useSymbol
  ? Symbol.for("immutable-tuple")
  : "@@__IMMUTABLE_TUPLE__@@";

// Used to save a reference to the globally shared `UniversalWeakMap` that
// stores all known `tuple` objects.
var globalKey = useSymbol
  ? Symbol.for("immutable-tuple-root")
  : "@@__IMMUTABLE_TUPLE_ROOT__@@";

// Convenient helper for defining hidden immutable properties.
function def(obj, name, value, enumerable) {
  Object.defineProperty(obj, name, {
    value: value,
    enumerable: !! enumerable,
    writable: false,
    configurable: false
  });
  return value;
}

var freeze = Object.freeze || function (obj) {
  return obj;
};

// The `mustConvertThisToArray` value is true when the corresponding
// `Array` method does not attempt to modify `this`, which means we can
// pass a `tuple` object as `this` without first converting it to an
// `Array`.
function forEachArrayMethod(fn) {
  function call(name, mustConvertThisToArray) {
    var desc = Object.getOwnPropertyDescriptor(Array.prototype, name);
    fn(name, desc, !! mustConvertThisToArray);
  }

  call("every");
  call("filter");
  call("find");
  call("findIndex");
  call("forEach");
  call("includes");
  call("indexOf");
  call("join");
  call("lastIndexOf");
  call("map");
  call("reduce");
  call("reduceRight");
  call("slice");
  call("some");
  call("toLocaleString");
  call("toString");

  // The `reverse` and `sort` methods are usually destructive, but for
  // `tuple` objects they return a new `tuple` object that has been
  // appropriately reversed/sorted.
  call("reverse", true);
  call("sort", true);

  // Make `[...someTuple]` work.
  call(useSymbol && Symbol.iterator || "@@iterator");
}

// See [`universal-weak-map.js`](universal-weak-map.html).
// See [`util.js`](util.html).
// If this package is installed multiple times, there could be mutiple
// implementations of the `tuple` function with distinct `tuple.prototype`
// objects, but the shared pool of `tuple` objects must be the same across
// all implementations. While it would be ideal to use the `global`
// object, there's no reliable way to get the global object across all JS
// environments without using the `Function` constructor, so instead we
// use the global `Array` constructor as a shared namespace.
var root = Array[globalKey] || def(Array, globalKey, new UniversalWeakMap, false);

function lookup() {
  var arguments$1 = arguments;

  var node = root;

  // Because we are building a tree of *weak* maps, the tree will not
  // prevent objects in tuples from being garbage collected, since the
  // tree itself will be pruned over time when the corresponding `tuple`
  // objects become unreachable. In addition to internalization, this
  // property is a key advantage of the `immutable-tuple` package.
  var argc = arguments.length;
  for (var i = 0; i < argc; ++i) {
    var item = arguments$1[i];
    node = node.get(item) || node.set(item, new UniversalWeakMap);
  }

  // Return node.data rather than node itself to prevent tampering with
  // the UniversalWeakMap tree.
  return node.data || (node.data = Object.create(null));
}

// See [`lookup.js`](lookup.html).
// See [`util.js`](util.html).
// When called with any number of arguments, this function returns an
// object that inherits from `tuple.prototype` and is guaranteed to be
// `===` any other `tuple` object that has exactly the same items. In
// computer science jargon, `tuple` instances are "internalized" or just
// "interned," which allows for constant-time equality checking, and makes
// it possible for tuple objects to be used as `Map` or `WeakMap` keys, or
// stored in a `Set`.
function tuple() {
  var arguments$1 = arguments;

  var node = lookup.apply(null, arguments);

  if (node.tuple) {
    return node.tuple;
  }

  var t = Object.create(tuple.prototype);

  // Define immutable items with numeric indexes, and permanently fix the
  // `.length` property.
  var argc = arguments.length;
  for (var i = 0; i < argc; ++i) {
    t[i] = arguments$1[i];
  }

  def(t, "length", argc, false);

  // Remember this new `tuple` object so that we can return the same object
  // earlier next time.
  return freeze(node.tuple = t);
}

// Since the `immutable-tuple` package could be installed multiple times
// in an application, there is no guarantee that the `tuple` constructor
// or `tuple.prototype` will be unique, so `value instanceof tuple` is
// unreliable. Instead, to test if a value is a tuple, you should use
// `tuple.isTuple(value)`.
def(tuple.prototype, brand, true, false);
function isTuple(that) {
  return !! (that && that[brand] === true);
}

tuple.isTuple = isTuple;

function toArray(tuple) {
  var array = [];
  var i = tuple.length;
  while (i--) { array[i] = tuple[i]; }
  return array;
}

// Copy all generic non-destructive Array methods to `tuple.prototype`.
// This works because (for example) `Array.prototype.slice` can be invoked
// against any `Array`-like object.
forEachArrayMethod(function (name, desc, mustConvertThisToArray) {
  var method = desc && desc.value;
  if (typeof method === "function") {
    desc.value = function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var result = method.apply(
        mustConvertThisToArray ? toArray(this) : this,
        args
      );
      // Of course, `tuple.prototype.slice` should return a `tuple` object,
      // not a new `Array`.
      return Array.isArray(result) ? tuple.apply(void 0, result) : result;
    };
    Object.defineProperty(tuple.prototype, name, desc);
  }
});

// Like `Array.prototype.concat`, except for the extra effort required to
// convert any tuple arguments to arrays, so that
// ```
// tuple(1).concat(tuple(2), 3) === tuple(1, 2, 3)
// ```
var ref = Array.prototype;
var concat = ref.concat;
tuple.prototype.concat = function () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return tuple.apply(void 0, concat.apply(toArray(this), args.map(
    function (item) { return isTuple(item) ? toArray(item) : item; }
  )));
};

exports.default = tuple;
exports.tuple = tuple;
exports.lookup = lookup;
});

unwrapExports(tuple_1);
var tuple_2 = tuple_1.tuple;
var tuple_3 = tuple_1.lookup;

var local = createCommonjsModule(function (module, exports) {

var fakeNullFiber = new (function Fiber(){});
var localKey = "_optimism_local";

function getCurrentFiber() {
  return fakeNullFiber;
}

{
  try {
    var Fiber = module["eriuqer".split("").reverse().join("")]("fibers");
    // If we were able to require fibers, redefine the getCurrentFiber
    // function so that it has a chance to return Fiber.current.
    getCurrentFiber = function () {
      return Fiber.current || fakeNullFiber;
    };
  } catch (e) {}
}

// Returns an object unique to Fiber.current, if fibers are enabled.
// This object is used for Fiber-local storage in ./entry.js.
exports.get = function () {
  var fiber = getCurrentFiber();
  return fiber[localKey] || (fiber[localKey] = Object.create(null));
};
});
var local_1 = local.get;

var entry = createCommonjsModule(function (module, exports) {

var getLocal = local.get;
var UNKNOWN_VALUE = Object.create(null);
var emptySetPool = [];
var entryPool = [];

// Don't let the emptySetPool or entryPool grow larger than this size,
// since unconstrained pool growth could lead to memory leaks.
exports.POOL_TARGET_SIZE = 100;

// Since this package might be used browsers, we should avoid using the
// Node built-in assert module.
function assert(condition, optionalMessage) {
  if (! condition) {
    throw new Error(optionalMessage || "assertion failure");
  }
}

function Entry(fn, key, args) {
  this.parents = new Set;
  this.childValues = new Map;

  // When this Entry has children that are dirty, this property becomes
  // a Set containing other Entry objects, borrowed from emptySetPool.
  // When the set becomes empty, it gets recycled back to emptySetPool.
  this.dirtyChildren = null;

  reset(this, fn, key, args);

  ++Entry.count;
}

Entry.count = 0;

function reset(entry, fn, key, args) {
  entry.fn = fn;
  entry.key = key;
  entry.args = args;
  entry.value = UNKNOWN_VALUE;
  entry.dirty = true;
  entry.subscribe = null;
  entry.unsubscribe = null;
  entry.recomputing = false;
  // Optional callback that will be invoked when entry.parents becomes
  // empty. The Entry object is given as the first parameter. If the
  // callback returns true, then this entry can be removed from the graph
  // and safely recycled into the entryPool.
  entry.reportOrphan = null;
}

Entry.acquire = function (fn, key, args) {
  var entry = entryPool.pop();
  if (entry) {
    reset(entry, fn, key, args);
    return entry;
  }
  return new Entry(fn, key, args);
};

function release(entry) {
  assert(entry.parents.size === 0);
  assert(entry.childValues.size === 0);
  assert(entry.dirtyChildren === null);
  if (entryPool.length < exports.POOL_TARGET_SIZE) {
    entryPool.push(entry);
  }
}

exports.Entry = Entry;

var Ep = Entry.prototype;

// The public API of Entry objects consists of the Entry constructor,
// along with the recompute, setDirty, and dispose methods.

Ep.recompute = function recompute() {
  if (! rememberParent(this) &&
      maybeReportOrphan(this)) {
    // The recipient of the entry.reportOrphan callback decided to dispose
    // of this orphan entry by calling entry.dispos(), which recycles it
    // into the entryPool, so we don't need to (and should not) proceed
    // with the recomputation.
    return;
  }

  return recomputeIfDirty(this);
};

// If the given entry has a reportOrphan method, and no remaining parents,
// call entry.reportOrphan and return true iff it returns true. The
// reportOrphan function should return true to indicate entry.dispose()
// has been called, and the entry has been removed from any other caches
// (see index.js for the only current example).
function maybeReportOrphan(entry) {
  var report = entry.reportOrphan;
  return typeof report === "function" &&
    entry.parents.size === 0 &&
    report(entry) === true;
}

Ep.setDirty = function setDirty() {
  if (this.dirty) return;
  this.dirty = true;
  this.value = UNKNOWN_VALUE;
  reportDirty(this);
  // We can go ahead and unsubscribe here, since any further dirty
  // notifications we receive will be redundant, and unsubscribing may
  // free up some resources, e.g. file watchers.
  unsubscribe(this);
};

Ep.dispose = function dispose() {
  var entry = this;
  forgetChildren(entry).forEach(maybeReportOrphan);
  unsubscribe(entry);

  // Because this entry has been kicked out of the cache (in index.js),
  // we've lost the ability to find out if/when this entry becomes dirty,
  // whether that happens through a subscription, because of a direct call
  // to entry.setDirty(), or because one of its children becomes dirty.
  // Because of this loss of future information, we have to assume the
  // worst (that this entry might have become dirty very soon), so we must
  // immediately mark this entry's parents as dirty. Normally we could
  // just call entry.setDirty() rather than calling parent.setDirty() for
  // each parent, but that would leave this entry in parent.childValues
  // and parent.dirtyChildren, which would prevent the child from being
  // truly forgotten.
  entry.parents.forEach(function (parent) {
    parent.setDirty();
    forgetChild(parent, entry);
  });

  // Since this entry has no parents and no children anymore, and the
  // caller of Entry#dispose has indicated that entry.value no longer
  // matters, we can safely recycle this Entry object for later use.
  release(entry);
};

function setClean(entry) {
  entry.dirty = false;

  if (mightBeDirty(entry)) {
    // This Entry may still have dirty children, in which case we can't
    // let our parents know we're clean just yet.
    return;
  }

  reportClean(entry);
}

function reportDirty(entry) {
  entry.parents.forEach(function (parent) {
    reportDirtyChild(parent, entry);
  });
}

function reportClean(entry) {
  entry.parents.forEach(function (parent) {
    reportCleanChild(parent, entry);
  });
}

function mightBeDirty(entry) {
  return entry.dirty ||
    (entry.dirtyChildren &&
     entry.dirtyChildren.size);
}

// Let a parent Entry know that one of its children may be dirty.
function reportDirtyChild(entry, child) {
  // Must have called rememberParent(child) before calling
  // reportDirtyChild(parent, child).
  assert(entry.childValues.has(child));
  assert(mightBeDirty(child));

  if (! entry.dirtyChildren) {
    entry.dirtyChildren = emptySetPool.pop() || new Set;

  } else if (entry.dirtyChildren.has(child)) {
    // If we already know this child is dirty, then we must have already
    // informed our own parents that we are dirty, so we can terminate
    // the recursion early.
    return;
  }

  entry.dirtyChildren.add(child);
  reportDirty(entry);
}

// Let a parent Entry know that one of its children is no longer dirty.
function reportCleanChild(entry, child) {
  var cv = entry.childValues;

  // Must have called rememberChild(child) before calling
  // reportCleanChild(parent, child).
  assert(cv.has(child));
  assert(! mightBeDirty(child));

  var childValue = cv.get(child);
  if (childValue === UNKNOWN_VALUE) {
    cv.set(child, child.value);
  } else if (childValue !== child.value) {
    entry.setDirty();
  }

  removeDirtyChild(entry, child);

  if (mightBeDirty(entry)) {
    return;
  }

  reportClean(entry);
}

function removeDirtyChild(entry, child) {
  var dc = entry.dirtyChildren;
  if (dc) {
    dc.delete(child);
    if (dc.size === 0) {
      if (emptySetPool.length < exports.POOL_TARGET_SIZE) {
        emptySetPool.push(dc);
      }
      entry.dirtyChildren = null;
    }
  }
}

function rememberParent(entry) {
  var local$$1 = getLocal();
  var parent = local$$1.currentParentEntry;
  if (parent) {
    entry.parents.add(parent);

    if (! parent.childValues.has(entry)) {
      parent.childValues.set(entry, UNKNOWN_VALUE);
    }

    if (mightBeDirty(entry)) {
      reportDirtyChild(parent, entry);
    } else {
      reportCleanChild(parent, entry);
    }

    return parent;
  }
}

// This is the most important method of the Entry API, because it
// determines whether the cached entry.value can be returned immediately,
// or must be recomputed. The overall performance of the caching system
// depends on the truth of the following observations: (1) this.dirty is
// usually false, (2) this.dirtyChildren is usually null/empty, and thus
// (3) this.value is usally returned very quickly, without recomputation.
function recomputeIfDirty(entry) {
  if (entry.dirty) {
    // If this Entry is explicitly dirty because someone called
    // entry.setDirty(), recompute.
    return reallyRecompute(entry);
  }

  if (mightBeDirty(entry)) {
    // Get fresh values for any dirty children, and if those values
    // disagree with this.childValues, mark this Entry explicitly dirty.
    entry.dirtyChildren.forEach(function (child) {
      assert(entry.childValues.has(child));
      try {
        recomputeIfDirty(child);
      } catch (e) {
        entry.setDirty();
      }
    });

    if (entry.dirty) {
      // If this Entry has become explicitly dirty after comparing the fresh
      // values of its dirty children against this.childValues, recompute.
      return reallyRecompute(entry);
    }
  }

  assert(entry.value !== UNKNOWN_VALUE);

  return entry.value;
}

function reallyRecompute(entry) {
  assert(! entry.recomputing, "already recomputing");
  entry.recomputing = true;

  // Since this recomputation is likely to re-remember some of this
  // entry's children, we forget our children here but do not call
  // maybeReportOrphan until after the recomputation finishes.
  var originalChildren = forgetChildren(entry);

  var local$$1 = getLocal();
  var parent = local$$1.currentParentEntry;
  local$$1.currentParentEntry = entry;

  var threw = true;
  try {
    entry.value = entry.fn.apply(null, entry.args);
    threw = false;

  } finally {
    entry.recomputing = false;

    assert(local$$1.currentParentEntry === entry);
    local$$1.currentParentEntry = parent;

    if (threw || ! subscribe(entry)) {
      // Mark this Entry dirty if entry.fn threw or we failed to
      // resubscribe. This is important because, if we have a subscribe
      // function and it failed, then we're going to miss important
      // notifications about the potential dirtiness of entry.value.
      entry.setDirty();
    } else {
      // If we successfully recomputed entry.value and did not fail to
      // (re)subscribe, then this Entry is no longer explicitly dirty.
      setClean(entry);
    }
  }

  // Now that we've had a chance to re-remember any children that were
  // involved in the recomputation, we can safely report any orphan
  // children that remain.
  originalChildren.forEach(maybeReportOrphan);

  return entry.value;
}

var reusableEmptyArray = [];

// Removes all children from this entry and returns an array of the
// removed children.
function forgetChildren(entry) {
  var children = reusableEmptyArray;

  if (entry.childValues.size > 0) {
    children = [];
    entry.childValues.forEach(function (value, child) {
      forgetChild(entry, child);
      children.push(child);
    });
  }

  // After we forget all our children, this.dirtyChildren must be empty
  // and therefor must have been reset to null.
  assert(entry.dirtyChildren === null);

  return children;
}

function forgetChild(entry, child) {
  child.parents.delete(entry);
  entry.childValues.delete(child);
  removeDirtyChild(entry, child);
}

function subscribe(entry) {
  if (typeof entry.subscribe === "function") {
    try {
      unsubscribe(entry); // Prevent double subscriptions.
      entry.unsubscribe = entry.subscribe.apply(null, entry.args);
    } catch (e) {
      // If this Entry has a subscribe function and it threw an exception
      // (or an unsubscribe function it previously returned now throws),
      // return false to indicate that we were not able to subscribe (or
      // unsubscribe), and this Entry should remain dirty.
      entry.setDirty();
      return false;
    }
  }

  // Returning true indicates either that there was no entry.subscribe
  // function or that it succeeded.
  return true;
}

function unsubscribe(entry) {
  var unsub = entry.unsubscribe;
  if (typeof unsub === "function") {
    entry.unsubscribe = null;
    unsub();
  }
}
});
var entry_1 = entry.POOL_TARGET_SIZE;
var entry_2 = entry.Entry;

var Cache$1 = cache.Cache;
var tuple$1 = tuple_1.tuple;
var Entry = entry.Entry;
var getLocal = local.get;

function defaultMakeCacheKey() {
  return tuple$1.apply(null, arguments);
}

// Exported so that custom makeCacheKey functions can easily reuse the
// default implementation (with different arguments).
var defaultMakeCacheKey_1 = defaultMakeCacheKey;

function normalizeOptions(options) {
  options = options || Object.create(null);

  if (typeof options.makeCacheKey !== "function") {
    options.makeCacheKey = defaultMakeCacheKey;
  }

  if (typeof options.max !== "number") {
    options.max = Math.pow(2, 16);
  }

  return options;
}

function wrap$1(fn, options) {
  options = normalizeOptions(options);

  // If this wrapped function is disposable, then its creator does not
  // care about its return value, and it should be removed from the cache
  // immediately when it no longer has any parents that depend on it.
  var disposable = !! options.disposable;

  var cache$$1 = new Cache$1({
    max: options.max,
    dispose: function (key, entry$$1) {
      entry$$1.dispose();
    }
  });

  function reportOrphan(entry$$1) {
    if (disposable) {
      // Triggers the entry.dispose() call above.
      cache$$1.delete(entry$$1.key);
      return true;
    }
  }

  function optimistic() {
    if (disposable && ! getLocal().currentParentEntry) {
      // If there's no current parent computation, and this wrapped
      // function is disposable (meaning we don't care about entry.value,
      // just dependency tracking), then we can short-cut everything else
      // in this function, because entry.recompute() is going to recycle
      // the entry object without recomputing anything, anyway.
      return;
    }

    var key = options.makeCacheKey.apply(null, arguments);
    if (! key) {
      return fn.apply(null, arguments);
    }

    var args = [], len = arguments.length;
    while (len--) args[len] = arguments[len];

    var entry$$1 = cache$$1.get(key);
    if (entry$$1) {
      entry$$1.args = args;
    } else {
      cache$$1.set(key, entry$$1 = Entry.acquire(fn, key, args));
      entry$$1.subscribe = options.subscribe;
      if (disposable) {
        entry$$1.reportOrphan = reportOrphan;
      }
    }

    var value = entry$$1.recompute();

    // If options.disposable is truthy, the caller of wrap is telling us
    // they don't care about the result of entry.recompute(), so we should
    // avoid returning the value, so it won't be accidentally used.
    if (! disposable) {
      return value;
    }
  }

  optimistic.dirty = function () {
    var key = options.makeCacheKey.apply(null, arguments);
    if (! key) {
      return;
    }

    if (! cache$$1.has(key)) {
      return;
    }

    cache$$1.get(key).setDirty();
  };

  return optimistic;
}

var wrap_1 = wrap$1;

var lib$1 = {
	defaultMakeCacheKey: defaultMakeCacheKey_1,
	wrap: wrap_1
};

var require$$1 = getCjsExportFromNamespace(visitor);

var bundle_umd$c = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd, require$$1, require$$0, bundle_umd$a);
}(commonjsGlobal, (function (exports,apolloUtilities,visitor,printer,apolloCache) {
    var frozen = {};
    var frozenTestMap = new Map();
    if (typeof Object.freeze === 'function') {
        Object.freeze(frozen);
    }
    try {
        frozenTestMap.set(frozen, frozen).delete(frozen);
    }
    catch (_a) {
        var wrap = function (method) {
            return method && (function (obj) {
                try {
                    frozenTestMap.set(obj, obj).delete(obj);
                }
                finally {
                    return method.call(Object, obj);
                }
            });
        };
        Object.freeze = wrap(Object.freeze);
        Object.seal = wrap(Object.seal);
        Object.preventExtensions = wrap(Object.preventExtensions);
    }

    var haveWarned = false;
    var HeuristicFragmentMatcher = (function () {
        function HeuristicFragmentMatcher() {
        }
        HeuristicFragmentMatcher.prototype.ensureReady = function () {
            return Promise.resolve();
        };
        HeuristicFragmentMatcher.prototype.canBypassInit = function () {
            return true;
        };
        HeuristicFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
            var obj = context.store.get(idValue.id);
            if (!obj && idValue.id === 'ROOT_QUERY') {
                return true;
            }
            if (!obj) {
                return false;
            }
            if (!obj.__typename) {
                if (!haveWarned) {
                    console.warn("You're using fragments in your queries, but either don't have the addTypename:\n  true option set in Apollo Client, or you are trying to write a fragment to the store without the __typename.\n   Please turn on the addTypename option and include __typename when writing fragments so that Apollo Client\n   can accurately match fragments.");
                    console.warn('Could not find __typename on Fragment ', typeCondition, obj);
                    console.warn("DEPRECATION WARNING: using fragments without __typename is unsupported behavior " +
                        "and will be removed in future versions of Apollo client. You should fix this and set addTypename to true now.");
                    if (!apolloUtilities.isTest()) {
                        haveWarned = true;
                    }
                }
                return 'heuristic';
            }
            if (obj.__typename === typeCondition) {
                return true;
            }
            apolloUtilities.warnOnceInDevelopment('You are using the simple (heuristic) fragment matcher, but your ' +
                'queries contain union or interface types. Apollo Client will not be ' +
                'able to accurately map fragments. To make this error go away, use ' +
                'the `IntrospectionFragmentMatcher` as described in the docs: ' +
                'https://www.apollographql.com/docs/react/recipes/fragment-matching.html', 'error');
            return 'heuristic';
        };
        return HeuristicFragmentMatcher;
    }());
    var IntrospectionFragmentMatcher = (function () {
        function IntrospectionFragmentMatcher(options) {
            if (options && options.introspectionQueryResultData) {
                this.possibleTypesMap = this.parseIntrospectionResult(options.introspectionQueryResultData);
                this.isReady = true;
            }
            else {
                this.isReady = false;
            }
            this.match = this.match.bind(this);
        }
        IntrospectionFragmentMatcher.prototype.match = function (idValue, typeCondition, context) {
            if (!this.isReady) {
                throw new Error('FragmentMatcher.match() was called before FragmentMatcher.init()');
            }
            var obj = context.store.get(idValue.id);
            if (!obj) {
                return false;
            }
            if (!obj.__typename) {
                throw new Error("Cannot match fragment because __typename property is missing: " + JSON.stringify(obj));
            }
            if (obj.__typename === typeCondition) {
                return true;
            }
            var implementingTypes = this.possibleTypesMap[typeCondition];
            if (implementingTypes && implementingTypes.indexOf(obj.__typename) > -1) {
                return true;
            }
            return false;
        };
        IntrospectionFragmentMatcher.prototype.parseIntrospectionResult = function (introspectionResultData) {
            var typeMap = {};
            introspectionResultData.__schema.types.forEach(function (type) {
                if (type.kind === 'UNION' || type.kind === 'INTERFACE') {
                    typeMap[type.name] = type.possibleTypes.map(function (implementingType) { return implementingType.name; });
                }
            });
            return typeMap;
        };
        return IntrospectionFragmentMatcher;
    }());

    var wrap$1 = lib$1.wrap;
    var CacheKeyNode = (function () {
        function CacheKeyNode() {
            this.children = null;
            this.key = null;
        }
        CacheKeyNode.prototype.lookup = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this.lookupArray(args);
        };
        CacheKeyNode.prototype.lookupArray = function (array) {
            var node = this;
            array.forEach(function (value) {
                node = node.getOrCreate(value);
            });
            return node.key || (node.key = Object.create(null));
        };
        CacheKeyNode.prototype.getOrCreate = function (value) {
            var map = this.children || (this.children = new Map);
            return map.get(value) || map.set(value, new CacheKeyNode()).get(value);
        };
        return CacheKeyNode;
    }());

    var hasOwn = Object.prototype.hasOwnProperty;
    var DepTrackingCache = (function () {
        function DepTrackingCache(data) {
            if (data === void 0) { data = Object.create(null); }
            var _this = this;
            this.data = data;
            this.depend = wrap$1(function (dataId) { return _this.data[dataId]; }, {
                disposable: true,
                makeCacheKey: function (dataId) {
                    return dataId;
                }
            });
        }
        DepTrackingCache.prototype.toObject = function () {
            return this.data;
        };
        DepTrackingCache.prototype.get = function (dataId) {
            this.depend(dataId);
            return this.data[dataId];
        };
        DepTrackingCache.prototype.set = function (dataId, value) {
            var oldValue = this.data[dataId];
            if (value !== oldValue) {
                this.data[dataId] = value;
                this.depend.dirty(dataId);
            }
        };
        DepTrackingCache.prototype.delete = function (dataId) {
            if (hasOwn.call(this.data, dataId)) {
                delete this.data[dataId];
                this.depend.dirty(dataId);
            }
        };
        DepTrackingCache.prototype.clear = function () {
            this.replace(null);
        };
        DepTrackingCache.prototype.replace = function (newData) {
            var _this = this;
            if (newData) {
                Object.keys(newData).forEach(function (dataId) {
                    _this.set(dataId, newData[dataId]);
                });
                Object.keys(this.data).forEach(function (dataId) {
                    if (!hasOwn.call(newData, dataId)) {
                        _this.delete(dataId);
                    }
                });
            }
            else {
                Object.keys(this.data).forEach(function (dataId) {
                    _this.delete(dataId);
                });
            }
        };
        return DepTrackingCache;
    }());
    function defaultNormalizedCacheFactory(seed) {
        return new DepTrackingCache(seed);
    }

    var __assign = function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var CIRCULAR = Object.create(null);
    var objToStr = Object.prototype.toString;
    var QueryKeyMaker = (function () {
        function QueryKeyMaker(cacheKeyRoot) {
            this.cacheKeyRoot = cacheKeyRoot;
            this.perQueryKeyMakers = new Map();
        }
        QueryKeyMaker.prototype.forQuery = function (document) {
            if (!this.perQueryKeyMakers.has(document)) {
                this.perQueryKeyMakers.set(document, new PerQueryKeyMaker(this.cacheKeyRoot, document));
            }
            return this.perQueryKeyMakers.get(document);
        };
        return QueryKeyMaker;
    }());
    var PerQueryKeyMaker = (function () {
        function PerQueryKeyMaker(cacheKeyRoot, query) {
            this.cacheKeyRoot = cacheKeyRoot;
            this.query = query;
            this.cache = new Map;
            this.lookupArray = this.cacheMethod(this.lookupArray);
            this.lookupObject = this.cacheMethod(this.lookupObject);
            this.lookupFragmentSpread = this.cacheMethod(this.lookupFragmentSpread);
        }
        PerQueryKeyMaker.prototype.cacheMethod = function (method) {
            var _this = this;
            return function (value) {
                if (_this.cache.has(value)) {
                    var cached = _this.cache.get(value);
                    if (cached === CIRCULAR) {
                        throw new Error("QueryKeyMaker cannot handle circular query structures");
                    }
                    return cached;
                }
                _this.cache.set(value, CIRCULAR);
                try {
                    var result = method.call(_this, value);
                    _this.cache.set(value, result);
                    return result;
                }
                catch (e) {
                    _this.cache.delete(value);
                    throw e;
                }
            };
        };
        PerQueryKeyMaker.prototype.lookupQuery = function (document) {
            return this.lookupObject(document);
        };
        PerQueryKeyMaker.prototype.lookupSelectionSet = function (selectionSet) {
            return this.lookupObject(selectionSet);
        };
        PerQueryKeyMaker.prototype.lookupFragmentSpread = function (fragmentSpread) {
            var name = fragmentSpread.name.value;
            var fragment = null;
            this.query.definitions.some(function (definition) {
                if (definition.kind === "FragmentDefinition" &&
                    definition.name.value === name) {
                    fragment = definition;
                    return true;
                }
            });
            return this.lookupObject(__assign({}, fragmentSpread, { fragment: fragment }));
        };
        PerQueryKeyMaker.prototype.lookupAny = function (value) {
            if (Array.isArray(value)) {
                return this.lookupArray(value);
            }
            if (typeof value === "object" && value !== null) {
                if (value.kind === "FragmentSpread") {
                    return this.lookupFragmentSpread(value);
                }
                return this.lookupObject(value);
            }
            return value;
        };
        PerQueryKeyMaker.prototype.lookupArray = function (array) {
            var elements = array.map(this.lookupAny, this);
            return this.cacheKeyRoot.lookup(objToStr.call(array), this.cacheKeyRoot.lookupArray(elements));
        };
        PerQueryKeyMaker.prototype.lookupObject = function (object) {
            var _this = this;
            var keys = safeSortedKeys(object);
            var values = keys.map(function (key) { return _this.lookupAny(object[key]); });
            return this.cacheKeyRoot.lookup(objToStr.call(object), this.cacheKeyRoot.lookupArray(keys), this.cacheKeyRoot.lookupArray(values));
        };
        return PerQueryKeyMaker;
    }());
    var queryKeyMap = Object.create(null);
    Object.keys(visitor.QueryDocumentKeys).forEach(function (parentKind) {
        var childKeys = queryKeyMap[parentKind] = Object.create(null);
        visitor.QueryDocumentKeys[parentKind].forEach(function (childKey) {
            childKeys[childKey] = true;
        });
        if (parentKind === "FragmentSpread") {
            childKeys["fragment"] = true;
        }
    });
    function safeSortedKeys(object) {
        var keys = Object.keys(object);
        var keyCount = keys.length;
        var knownKeys = typeof object.kind === "string" && queryKeyMap[object.kind];
        var target = 0;
        for (var source = target; source < keyCount; ++source) {
            var key = keys[source];
            var value = object[key];
            var isObjectOrArray = value !== null && typeof value === "object";
            if (!isObjectOrArray || !knownKeys || knownKeys[key] === true) {
                keys[target++] = key;
            }
        }
        keys.length = target;
        return keys.sort();
    }

    var __assign$1 = function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var StoreReader = (function () {
        function StoreReader(cacheKeyRoot) {
            if (cacheKeyRoot === void 0) { cacheKeyRoot = new CacheKeyNode; }
            var _this = this;
            this.cacheKeyRoot = cacheKeyRoot;
            var reader = this;
            var executeStoreQuery = reader.executeStoreQuery, executeSelectionSet = reader.executeSelectionSet;
            reader.keyMaker = new QueryKeyMaker(cacheKeyRoot);
            this.executeStoreQuery = wrap$1(function (options) {
                return executeStoreQuery.call(_this, options);
            }, {
                makeCacheKey: function (_a) {
                    var query = _a.query, rootValue = _a.rootValue, contextValue = _a.contextValue, variableValues = _a.variableValues, fragmentMatcher = _a.fragmentMatcher;
                    if (contextValue.store instanceof DepTrackingCache) {
                        return reader.cacheKeyRoot.lookup(reader.keyMaker.forQuery(query).lookupQuery(query), contextValue.store, fragmentMatcher, JSON.stringify(variableValues), rootValue.id);
                    }
                }
            });
            this.executeSelectionSet = wrap$1(function (options) {
                return executeSelectionSet.call(_this, options);
            }, {
                makeCacheKey: function (_a) {
                    var selectionSet = _a.selectionSet, rootValue = _a.rootValue, execContext = _a.execContext;
                    if (execContext.contextValue.store instanceof DepTrackingCache) {
                        return reader.cacheKeyRoot.lookup(reader.keyMaker.forQuery(execContext.query).lookupSelectionSet(selectionSet), execContext.contextValue.store, execContext.fragmentMatcher, JSON.stringify(execContext.variableValues), rootValue.id);
                    }
                }
            });
        }
        StoreReader.prototype.readQueryFromStore = function (options) {
            var optsPatch = { returnPartialData: false };
            return this.diffQueryAgainstStore(__assign$1({}, options, optsPatch)).result;
        };
        StoreReader.prototype.diffQueryAgainstStore = function (_a) {
            var store = _a.store, query = _a.query, variables = _a.variables, previousResult = _a.previousResult, _b = _a.returnPartialData, returnPartialData = _b === void 0 ? true : _b, _c = _a.rootId, rootId = _c === void 0 ? 'ROOT_QUERY' : _c, fragmentMatcherFunction = _a.fragmentMatcherFunction, config = _a.config;
            var queryDefinition = apolloUtilities.getQueryDefinition(query);
            variables = apolloUtilities.assign({}, apolloUtilities.getDefaultValues(queryDefinition), variables);
            var context = {
                store: store,
                dataIdFromObject: (config && config.dataIdFromObject) || null,
                cacheRedirects: (config && config.cacheRedirects) || {},
            };
            var execResult = this.executeStoreQuery({
                query: query,
                rootValue: {
                    type: 'id',
                    id: rootId,
                    generated: true,
                    typename: 'Query',
                },
                contextValue: context,
                variableValues: variables,
                fragmentMatcher: fragmentMatcherFunction,
            });
            var hasMissingFields = execResult.missing && execResult.missing.length > 0;
            if (hasMissingFields && !returnPartialData) {
                execResult.missing.forEach(function (info) {
                    if (info.tolerable)
                        return;
                    throw new Error("Can't find field " + info.fieldName + " on object " + JSON.stringify(info.object, null, 2) + ".");
                });
            }
            if (previousResult) {
                if (apolloUtilities.isEqual(previousResult, execResult.result)) {
                    execResult.result = previousResult;
                }
            }
            return {
                result: execResult.result,
                complete: !hasMissingFields,
            };
        };
        StoreReader.prototype.executeStoreQuery = function (_a) {
            var query = _a.query, rootValue = _a.rootValue, contextValue = _a.contextValue, variableValues = _a.variableValues, _b = _a.fragmentMatcher, fragmentMatcher = _b === void 0 ? defaultFragmentMatcher : _b;
            var mainDefinition = apolloUtilities.getMainDefinition(query);
            var fragments = apolloUtilities.getFragmentDefinitions(query);
            var fragmentMap = apolloUtilities.createFragmentMap(fragments);
            var execContext = {
                query: query,
                fragmentMap: fragmentMap,
                contextValue: contextValue,
                variableValues: variableValues,
                fragmentMatcher: fragmentMatcher,
            };
            return this.executeSelectionSet({
                selectionSet: mainDefinition.selectionSet,
                rootValue: rootValue,
                execContext: execContext,
            });
        };
        StoreReader.prototype.executeSelectionSet = function (_a) {
            var _this = this;
            var selectionSet = _a.selectionSet, rootValue = _a.rootValue, execContext = _a.execContext;
            var fragmentMap = execContext.fragmentMap, contextValue = execContext.contextValue, variables = execContext.variableValues;
            var finalResult = {
                result: {},
            };
            var object = contextValue.store.get(rootValue.id);
            var typename = (object && object.__typename) ||
                (rootValue.id === 'ROOT_QUERY' && 'Query') ||
                void 0;
            function handleMissing(result) {
                var _a;
                if (result.missing) {
                    finalResult.missing = finalResult.missing || [];
                    (_a = finalResult.missing).push.apply(_a, result.missing);
                }
                return result.result;
            }
            selectionSet.selections.forEach(function (selection) {
                var _a;
                if (!apolloUtilities.shouldInclude(selection, variables)) {
                    return;
                }
                if (apolloUtilities.isField(selection)) {
                    var fieldResult = handleMissing(_this.executeField(object, typename, selection, execContext));
                    if (typeof fieldResult !== 'undefined') {
                        merge(finalResult.result, (_a = {},
                            _a[apolloUtilities.resultKeyNameFromField(selection)] = fieldResult,
                            _a));
                    }
                }
                else {
                    var fragment = void 0;
                    if (apolloUtilities.isInlineFragment(selection)) {
                        fragment = selection;
                    }
                    else {
                        fragment = fragmentMap[selection.name.value];
                        if (!fragment) {
                            throw new Error("No fragment named " + selection.name.value);
                        }
                    }
                    var typeCondition = fragment.typeCondition.name.value;
                    var match = execContext.fragmentMatcher(rootValue, typeCondition, contextValue);
                    if (match) {
                        var fragmentExecResult = _this.executeSelectionSet({
                            selectionSet: fragment.selectionSet,
                            rootValue: rootValue,
                            execContext: execContext,
                        });
                        if (match === 'heuristic' && fragmentExecResult.missing) {
                            fragmentExecResult = __assign$1({}, fragmentExecResult, { missing: fragmentExecResult.missing.map(function (info) {
                                    return __assign$1({}, info, { tolerable: true });
                                }) });
                        }
                        merge(finalResult.result, handleMissing(fragmentExecResult));
                    }
                }
            });
            return finalResult;
        };
        StoreReader.prototype.executeField = function (object, typename, field, execContext) {
            var variables = execContext.variableValues, contextValue = execContext.contextValue;
            var fieldName = field.name.value;
            var args = apolloUtilities.argumentsObjectFromField(field, variables);
            var info = {
                resultKey: apolloUtilities.resultKeyNameFromField(field),
                directives: apolloUtilities.getDirectiveInfoFromField(field, variables),
            };
            var readStoreResult = readStoreResolver(object, typename, fieldName, args, contextValue, info);
            if (!field.selectionSet) {
                return readStoreResult;
            }
            if (readStoreResult.result == null) {
                return readStoreResult;
            }
            function handleMissing(res) {
                var missing = null;
                if (readStoreResult.missing) {
                    missing = missing || [];
                    missing.push.apply(missing, readStoreResult.missing);
                }
                if (res.missing) {
                    missing = missing || [];
                    missing.push.apply(missing, res.missing);
                }
                return {
                    result: res.result,
                    missing: missing,
                };
            }
            if (Array.isArray(readStoreResult.result)) {
                return handleMissing(this.executeSubSelectedArray(field, readStoreResult.result, execContext));
            }
            return handleMissing(this.executeSelectionSet({
                selectionSet: field.selectionSet,
                rootValue: readStoreResult.result,
                execContext: execContext,
            }));
        };
        StoreReader.prototype.executeSubSelectedArray = function (field, result, execContext) {
            var _this = this;
            var missing = null;
            function handleMissing(childResult) {
                if (childResult.missing) {
                    missing = missing || [];
                    missing.push.apply(missing, childResult.missing);
                }
                return childResult.result;
            }
            result = result.map(function (item) {
                if (item === null) {
                    return null;
                }
                if (Array.isArray(item)) {
                    return handleMissing(_this.executeSubSelectedArray(field, item, execContext));
                }
                return handleMissing(_this.executeSelectionSet({
                    selectionSet: field.selectionSet,
                    rootValue: item,
                    execContext: execContext,
                }));
            });
            return { result: result, missing: missing };
        };
        return StoreReader;
    }());
    function defaultFragmentMatcher() {
        return true;
    }
    function assertIdValue(idValue) {
        if (!apolloUtilities.isIdValue(idValue)) {
            throw new Error("Encountered a sub-selection on the query, but the store doesn't have an object reference. This should never happen during normal use unless you have custom code that is directly manipulating the store; please file an issue.");
        }
    }
    function readStoreResolver(object, typename, fieldName, args, context, _a) {
        var resultKey = _a.resultKey, directives = _a.directives;
        var storeKeyName = fieldName;
        if (args || directives) {
            storeKeyName = apolloUtilities.getStoreKeyName(storeKeyName, args, directives);
        }
        var fieldValue = void 0;
        if (object) {
            fieldValue = object[storeKeyName];
            if (typeof fieldValue === 'undefined' &&
                context.cacheRedirects &&
                typeof typename === 'string') {
                var type = context.cacheRedirects[typename];
                if (type) {
                    var resolver = type[fieldName];
                    if (resolver) {
                        fieldValue = resolver(object, args, {
                            getCacheKey: function (storeObj) {
                                return apolloUtilities.toIdValue({
                                    id: context.dataIdFromObject(storeObj),
                                    typename: storeObj.__typename,
                                });
                            },
                        });
                    }
                }
            }
        }
        if (typeof fieldValue === 'undefined') {
            return {
                result: fieldValue,
                missing: [{
                        object: object,
                        fieldName: storeKeyName,
                        tolerable: false,
                    }],
            };
        }
        if (apolloUtilities.isJsonValue(fieldValue)) {
            fieldValue = fieldValue.json;
        }
        return {
            result: fieldValue,
        };
    }
    var hasOwn$1 = Object.prototype.hasOwnProperty;
    function merge(target, source) {
        if (source !== null && typeof source === 'object' &&
            source !== target) {
            if (Object.isExtensible && !Object.isExtensible(target)) {
                target = __assign$1({}, target);
            }
            Object.keys(source).forEach(function (sourceKey) {
                var sourceVal = source[sourceKey];
                if (!hasOwn$1.call(target, sourceKey)) {
                    target[sourceKey] = sourceVal;
                }
                else {
                    target[sourceKey] = merge(target[sourceKey], sourceVal);
                }
            });
        }
        return target;
    }

    var ObjectCache = (function () {
        function ObjectCache(data) {
            if (data === void 0) { data = Object.create(null); }
            this.data = data;
        }
        ObjectCache.prototype.toObject = function () {
            return this.data;
        };
        ObjectCache.prototype.get = function (dataId) {
            return this.data[dataId];
        };
        ObjectCache.prototype.set = function (dataId, value) {
            this.data[dataId] = value;
        };
        ObjectCache.prototype.delete = function (dataId) {
            this.data[dataId] = undefined;
        };
        ObjectCache.prototype.clear = function () {
            this.data = Object.create(null);
        };
        ObjectCache.prototype.replace = function (newData) {
            this.data = newData || Object.create(null);
        };
        return ObjectCache;
    }());
    function defaultNormalizedCacheFactory$1(seed) {
        return new ObjectCache(seed);
    }

    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$2 = function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var WriteError = (function (_super) {
        __extends(WriteError, _super);
        function WriteError() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 'WriteError';
            return _this;
        }
        return WriteError;
    }(Error));
    function enhanceErrorWithDocument(error, document) {
        var enhancedError = new WriteError("Error writing result to store for query:\n " + printer.print(document));
        enhancedError.message += '\n' + error.message;
        enhancedError.stack = error.stack;
        return enhancedError;
    }
    var StoreWriter = (function () {
        function StoreWriter() {
        }
        StoreWriter.prototype.writeQueryToStore = function (_a) {
            var query = _a.query, result = _a.result, _b = _a.store, store = _b === void 0 ? defaultNormalizedCacheFactory() : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
            return this.writeResultToStore({
                dataId: 'ROOT_QUERY',
                result: result,
                document: query,
                store: store,
                variables: variables,
                dataIdFromObject: dataIdFromObject,
                fragmentMatcherFunction: fragmentMatcherFunction,
            });
        };
        StoreWriter.prototype.writeResultToStore = function (_a) {
            var dataId = _a.dataId, result = _a.result, document = _a.document, _b = _a.store, store = _b === void 0 ? defaultNormalizedCacheFactory() : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMatcherFunction = _a.fragmentMatcherFunction;
            var operationDefinition = apolloUtilities.getOperationDefinition(document);
            try {
                return this.writeSelectionSetToStore({
                    result: result,
                    dataId: dataId,
                    selectionSet: operationDefinition.selectionSet,
                    context: {
                        store: store,
                        processedData: {},
                        variables: apolloUtilities.assign({}, apolloUtilities.getDefaultValues(operationDefinition), variables),
                        dataIdFromObject: dataIdFromObject,
                        fragmentMap: apolloUtilities.createFragmentMap(apolloUtilities.getFragmentDefinitions(document)),
                        fragmentMatcherFunction: fragmentMatcherFunction,
                    },
                });
            }
            catch (e) {
                throw enhanceErrorWithDocument(e, document);
            }
        };
        StoreWriter.prototype.writeSelectionSetToStore = function (_a) {
            var _this = this;
            var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, context = _a.context;
            var variables = context.variables, store = context.store, fragmentMap = context.fragmentMap;
            selectionSet.selections.forEach(function (selection) {
                if (!apolloUtilities.shouldInclude(selection, variables)) {
                    return;
                }
                if (apolloUtilities.isField(selection)) {
                    var resultFieldKey = apolloUtilities.resultKeyNameFromField(selection);
                    var value = result[resultFieldKey];
                    if (typeof value !== 'undefined') {
                        _this.writeFieldToStore({
                            dataId: dataId,
                            value: value,
                            field: selection,
                            context: context,
                        });
                    }
                    else {
                        var isDefered = selection.directives &&
                            selection.directives.length &&
                            selection.directives.some(function (directive) { return directive.name && directive.name.value === 'defer'; });
                        if (!isDefered && context.fragmentMatcherFunction) {
                            if (!apolloUtilities.isProduction()) {
                                console.warn("Missing field " + resultFieldKey + " in " + JSON.stringify(result, null, 2).substring(0, 100));
                            }
                        }
                    }
                }
                else {
                    var fragment = void 0;
                    if (apolloUtilities.isInlineFragment(selection)) {
                        fragment = selection;
                    }
                    else {
                        fragment = (fragmentMap || {})[selection.name.value];
                        if (!fragment) {
                            throw new Error("No fragment named " + selection.name.value + ".");
                        }
                    }
                    var matches = true;
                    if (context.fragmentMatcherFunction && fragment.typeCondition) {
                        var idValue = apolloUtilities.toIdValue({ id: 'self', typename: undefined });
                        var fakeContext = {
                            store: new ObjectCache({ self: result }),
                            cacheRedirects: {},
                        };
                        var match = context.fragmentMatcherFunction(idValue, fragment.typeCondition.name.value, fakeContext);
                        if (!apolloUtilities.isProduction() && match === 'heuristic') {
                            console.error('WARNING: heuristic fragment matching going on!');
                        }
                        matches = !!match;
                    }
                    if (matches) {
                        _this.writeSelectionSetToStore({
                            result: result,
                            selectionSet: fragment.selectionSet,
                            dataId: dataId,
                            context: context,
                        });
                    }
                }
            });
            return store;
        };
        StoreWriter.prototype.writeFieldToStore = function (_a) {
            var field = _a.field, value = _a.value, dataId = _a.dataId, context = _a.context;
            var _b;
            var variables = context.variables, dataIdFromObject = context.dataIdFromObject, store = context.store;
            var storeValue;
            var storeObject;
            var storeFieldName = apolloUtilities.storeKeyNameFromField(field, variables);
            if (!field.selectionSet || value === null) {
                storeValue =
                    value != null && typeof value === 'object'
                        ?
                            { type: 'json', json: value }
                        :
                            value;
            }
            else if (Array.isArray(value)) {
                var generatedId = dataId + "." + storeFieldName;
                storeValue = this.processArrayValue(value, generatedId, field.selectionSet, context);
            }
            else {
                var valueDataId = dataId + "." + storeFieldName;
                var generated = true;
                if (!isGeneratedId(valueDataId)) {
                    valueDataId = '$' + valueDataId;
                }
                if (dataIdFromObject) {
                    var semanticId = dataIdFromObject(value);
                    if (semanticId && isGeneratedId(semanticId)) {
                        throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
                    }
                    if (semanticId ||
                        (typeof semanticId === 'number' && semanticId === 0)) {
                        valueDataId = semanticId;
                        generated = false;
                    }
                }
                if (!isDataProcessed(valueDataId, field, context.processedData)) {
                    this.writeSelectionSetToStore({
                        dataId: valueDataId,
                        result: value,
                        selectionSet: field.selectionSet,
                        context: context,
                    });
                }
                var typename = value.__typename;
                storeValue = apolloUtilities.toIdValue({ id: valueDataId, typename: typename }, generated);
                storeObject = store.get(dataId);
                var escapedId = storeObject && storeObject[storeFieldName];
                if (escapedId !== storeValue && apolloUtilities.isIdValue(escapedId)) {
                    var hadTypename = escapedId.typename !== undefined;
                    var hasTypename = typename !== undefined;
                    var typenameChanged = hadTypename && hasTypename && escapedId.typename !== typename;
                    if (generated && !escapedId.generated && !typenameChanged) {
                        throw new Error("Store error: the application attempted to write an object with no provided id" +
                            (" but the store already contains an id of " + escapedId.id + " for this object. The selectionSet") +
                            " that was trying to be written is:\n" +
                            printer.print(field));
                    }
                    if (hadTypename && !hasTypename) {
                        throw new Error("Store error: the application attempted to write an object with no provided typename" +
                            (" but the store already contains an object with typename of " + escapedId.typename + " for the object of id " + escapedId.id + ". The selectionSet") +
                            " that was trying to be written is:\n" +
                            printer.print(field));
                    }
                    if (escapedId.generated) {
                        if (typenameChanged) {
                            if (!generated) {
                                store.delete(escapedId.id);
                            }
                        }
                        else {
                            mergeWithGenerated(escapedId.id, storeValue.id, store);
                        }
                    }
                }
            }
            storeObject = store.get(dataId);
            if (!storeObject || !apolloUtilities.isEqual(storeValue, storeObject[storeFieldName])) {
                store.set(dataId, __assign$2({}, storeObject, (_b = {}, _b[storeFieldName] = storeValue, _b)));
            }
        };
        StoreWriter.prototype.processArrayValue = function (value, generatedId, selectionSet, context) {
            var _this = this;
            return value.map(function (item, index) {
                if (item === null) {
                    return null;
                }
                var itemDataId = generatedId + "." + index;
                if (Array.isArray(item)) {
                    return _this.processArrayValue(item, itemDataId, selectionSet, context);
                }
                var generated = true;
                if (context.dataIdFromObject) {
                    var semanticId = context.dataIdFromObject(item);
                    if (semanticId) {
                        itemDataId = semanticId;
                        generated = false;
                    }
                }
                if (!isDataProcessed(itemDataId, selectionSet, context.processedData)) {
                    _this.writeSelectionSetToStore({
                        dataId: itemDataId,
                        result: item,
                        selectionSet: selectionSet,
                        context: context,
                    });
                }
                return apolloUtilities.toIdValue({ id: itemDataId, typename: item.__typename }, generated);
            });
        };
        return StoreWriter;
    }());
    function isGeneratedId(id) {
        return id[0] === '$';
    }
    function mergeWithGenerated(generatedKey, realKey, cache) {
        if (generatedKey === realKey) {
            return false;
        }
        var generated = cache.get(generatedKey);
        var real = cache.get(realKey);
        var madeChanges = false;
        Object.keys(generated).forEach(function (key) {
            var value = generated[key];
            var realValue = real[key];
            if (apolloUtilities.isIdValue(value) &&
                isGeneratedId(value.id) &&
                apolloUtilities.isIdValue(realValue) &&
                !apolloUtilities.isEqual(value, realValue) &&
                mergeWithGenerated(value.id, realValue.id, cache)) {
                madeChanges = true;
            }
        });
        cache.delete(generatedKey);
        var newRealValue = __assign$2({}, generated, real);
        if (apolloUtilities.isEqual(newRealValue, real)) {
            return madeChanges;
        }
        cache.set(realKey, newRealValue);
        return true;
    }
    function isDataProcessed(dataId, field, processedData) {
        if (!processedData) {
            return false;
        }
        if (processedData[dataId]) {
            if (processedData[dataId].indexOf(field) >= 0) {
                return true;
            }
            else {
                processedData[dataId].push(field);
            }
        }
        else {
            processedData[dataId] = [field];
        }
        return false;
    }

    var __assign$3 = function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var RecordingCache = (function () {
        function RecordingCache(data) {
            if (data === void 0) { data = {}; }
            this.data = data;
            this.recordedData = {};
        }
        RecordingCache.prototype.record = function (transaction) {
            transaction(this);
            var recordedData = this.recordedData;
            this.recordedData = {};
            return recordedData;
        };
        RecordingCache.prototype.toObject = function () {
            return __assign$3({}, this.data, this.recordedData);
        };
        RecordingCache.prototype.get = function (dataId) {
            if (this.recordedData.hasOwnProperty(dataId)) {
                return this.recordedData[dataId];
            }
            return this.data[dataId];
        };
        RecordingCache.prototype.set = function (dataId, value) {
            if (this.get(dataId) !== value) {
                this.recordedData[dataId] = value;
            }
        };
        RecordingCache.prototype.delete = function (dataId) {
            this.recordedData[dataId] = undefined;
        };
        RecordingCache.prototype.clear = function () {
            var _this = this;
            Object.keys(this.data).forEach(function (dataId) { return _this.delete(dataId); });
            this.recordedData = {};
        };
        RecordingCache.prototype.replace = function (newData) {
            this.clear();
            this.recordedData = __assign$3({}, newData);
        };
        return RecordingCache;
    }());
    function record(startingState, transaction) {
        var recordingCache = new RecordingCache(startingState);
        return recordingCache.record(transaction);
    }

    var __extends$1 = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$4 = function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
    };
    var defaultConfig = {
        fragmentMatcher: new HeuristicFragmentMatcher(),
        dataIdFromObject: defaultDataIdFromObject,
        addTypename: true,
    };
    function defaultDataIdFromObject(result) {
        if (result.__typename) {
            if (result.id !== undefined) {
                return result.__typename + ":" + result.id;
            }
            if (result._id !== undefined) {
                return result.__typename + ":" + result._id;
            }
        }
        return null;
    }
    var InMemoryCache = (function (_super) {
        __extends$1(InMemoryCache, _super);
        function InMemoryCache(config) {
            if (config === void 0) { config = {}; }
            var _this = _super.call(this) || this;
            _this.optimistic = [];
            _this.watches = new Set();
            _this.typenameDocumentCache = new Map();
            _this.cacheKeyRoot = new CacheKeyNode();
            _this.silenceBroadcast = false;
            _this.config = __assign$4({}, defaultConfig, config);
            if (_this.config.customResolvers) {
                console.warn('customResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating customResolvers in the next major version.');
                _this.config.cacheRedirects = _this.config.customResolvers;
            }
            if (_this.config.cacheResolvers) {
                console.warn('cacheResolvers have been renamed to cacheRedirects. Please update your config as we will be deprecating cacheResolvers in the next major version.');
                _this.config.cacheRedirects = _this.config.cacheResolvers;
            }
            _this.addTypename = _this.config.addTypename;
            _this.data = defaultNormalizedCacheFactory();
            _this.storeReader = new StoreReader(_this.cacheKeyRoot);
            _this.storeWriter = new StoreWriter();
            var cache = _this;
            var maybeBroadcastWatch = cache.maybeBroadcastWatch;
            _this.maybeBroadcastWatch = wrap$1(function (c) {
                return maybeBroadcastWatch.call(_this, c);
            }, {
                makeCacheKey: function (c) {
                    if (c.optimistic && cache.optimistic.length > 0) {
                        return;
                    }
                    if (c.previousResult) {
                        return;
                    }
                    if (cache.data instanceof DepTrackingCache) {
                        return cache.cacheKeyRoot.lookup(c.query, JSON.stringify(c.variables));
                    }
                }
            });
            return _this;
        }
        InMemoryCache.prototype.restore = function (data) {
            if (data)
                this.data.replace(data);
            return this;
        };
        InMemoryCache.prototype.extract = function (optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            if (optimistic && this.optimistic.length > 0) {
                var patches = this.optimistic.map(function (opt) { return opt.data; });
                return Object.assign.apply(Object, [{}, this.data.toObject()].concat(patches));
            }
            return this.data.toObject();
        };
        InMemoryCache.prototype.read = function (query) {
            if (query.rootId && this.data.get(query.rootId) === undefined) {
                return null;
            }
            var store = (query.optimistic && this.optimistic.length)
                ? defaultNormalizedCacheFactory(this.extract(true))
                : this.data;
            return this.storeReader.readQueryFromStore({
                store: store,
                query: this.transformDocument(query.query),
                variables: query.variables,
                rootId: query.rootId,
                fragmentMatcherFunction: this.config.fragmentMatcher.match,
                previousResult: query.previousResult,
                config: this.config,
            });
        };
        InMemoryCache.prototype.write = function (write) {
            this.storeWriter.writeResultToStore({
                dataId: write.dataId,
                result: write.result,
                variables: write.variables,
                document: this.transformDocument(write.query),
                store: this.data,
                dataIdFromObject: this.config.dataIdFromObject,
                fragmentMatcherFunction: this.config.fragmentMatcher.match,
            });
            this.broadcastWatches();
        };
        InMemoryCache.prototype.diff = function (query) {
            var store = (query.optimistic && this.optimistic.length)
                ? defaultNormalizedCacheFactory(this.extract(true))
                : this.data;
            return this.storeReader.diffQueryAgainstStore({
                store: store,
                query: this.transformDocument(query.query),
                variables: query.variables,
                returnPartialData: query.returnPartialData,
                previousResult: query.previousResult,
                fragmentMatcherFunction: this.config.fragmentMatcher.match,
                config: this.config,
            });
        };
        InMemoryCache.prototype.watch = function (watch) {
            var _this = this;
            this.watches.add(watch);
            return function () {
                _this.watches.delete(watch);
            };
        };
        InMemoryCache.prototype.evict = function (query) {
            throw new Error("eviction is not implemented on InMemory Cache");
        };
        InMemoryCache.prototype.reset = function () {
            this.data.clear();
            this.broadcastWatches();
            return Promise.resolve();
        };
        InMemoryCache.prototype.removeOptimistic = function (id) {
            var _this = this;
            var toPerform = this.optimistic.filter(function (item) { return item.id !== id; });
            this.optimistic = [];
            toPerform.forEach(function (change) {
                _this.recordOptimisticTransaction(change.transaction, change.id);
            });
            this.broadcastWatches();
        };
        InMemoryCache.prototype.performTransaction = function (transaction) {
            var alreadySilenced = this.silenceBroadcast;
            this.silenceBroadcast = true;
            transaction(this);
            if (!alreadySilenced) {
                this.silenceBroadcast = false;
            }
            this.broadcastWatches();
        };
        InMemoryCache.prototype.recordOptimisticTransaction = function (transaction, id) {
            var _this = this;
            this.silenceBroadcast = true;
            var patch = record(this.extract(true), function (recordingCache) {
                var dataCache = _this.data;
                _this.data = recordingCache;
                _this.performTransaction(transaction);
                _this.data = dataCache;
            });
            this.optimistic.push({
                id: id,
                transaction: transaction,
                data: patch,
            });
            this.silenceBroadcast = false;
            this.broadcastWatches();
        };
        InMemoryCache.prototype.transformDocument = function (document) {
            if (this.addTypename) {
                var result = this.typenameDocumentCache.get(document);
                if (!result) {
                    this.typenameDocumentCache.set(document, (result = apolloUtilities.addTypenameToDocument(document)));
                }
                return result;
            }
            return document;
        };
        InMemoryCache.prototype.readQuery = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.read({
                query: options.query,
                variables: options.variables,
                optimistic: optimistic,
            });
        };
        InMemoryCache.prototype.readFragment = function (options, optimistic) {
            if (optimistic === void 0) { optimistic = false; }
            return this.read({
                query: this.transformDocument(apolloUtilities.getFragmentQueryDocument(options.fragment, options.fragmentName)),
                variables: options.variables,
                rootId: options.id,
                optimistic: optimistic,
            });
        };
        InMemoryCache.prototype.writeQuery = function (options) {
            this.write({
                dataId: 'ROOT_QUERY',
                result: options.data,
                query: this.transformDocument(options.query),
                variables: options.variables,
            });
        };
        InMemoryCache.prototype.writeFragment = function (options) {
            this.write({
                dataId: options.id,
                result: options.data,
                query: this.transformDocument(apolloUtilities.getFragmentQueryDocument(options.fragment, options.fragmentName)),
                variables: options.variables,
            });
        };
        InMemoryCache.prototype.broadcastWatches = function () {
            var _this = this;
            if (!this.silenceBroadcast) {
                var optimistic_1 = this.optimistic.length > 0;
                this.watches.forEach(function (c) {
                    _this.maybeBroadcastWatch(c);
                    if (optimistic_1) {
                        _this.maybeBroadcastWatch.dirty(c);
                    }
                });
            }
        };
        InMemoryCache.prototype.maybeBroadcastWatch = function (c) {
            var previousResult = c.previousResult && c.previousResult();
            var newData = this.diff({
                query: c.query,
                variables: c.variables,
                previousResult: previousResult,
                optimistic: c.optimistic,
            });
            if (previousResult &&
                previousResult === newData.result) {
                return;
            }
            c.callback(newData);
        };
        return InMemoryCache;
    }(apolloCache.ApolloCache));

    exports.InMemoryCache = InMemoryCache;
    exports.defaultDataIdFromObject = defaultDataIdFromObject;
    exports.StoreReader = StoreReader;
    exports.assertIdValue = assertIdValue;
    exports.WriteError = WriteError;
    exports.enhanceErrorWithDocument = enhanceErrorWithDocument;
    exports.StoreWriter = StoreWriter;
    exports.HeuristicFragmentMatcher = HeuristicFragmentMatcher;
    exports.IntrospectionFragmentMatcher = IntrospectionFragmentMatcher;
    exports.ObjectCache = ObjectCache;
    exports.defaultNormalizedCacheFactory = defaultNormalizedCacheFactory$1;
    exports.RecordingCache = RecordingCache;
    exports.record = record;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$c);
var bundle_umd_1$2 = bundle_umd$c.InMemoryCache;
var bundle_umd_2 = bundle_umd$c.IntrospectionFragmentMatcher;

var __schema={types:[{kind:"INTERFACE",name:"PlatformProduct",possibleTypes:[{name:"EmailProductNewsletter"},{name:"WebsiteProductSite"},{name:"MagazineProductPublication"}]},{kind:"INTERFACE",name:"PlatformSection",possibleTypes:[{name:"EmailSection"},{name:"WebsiteSection"},{name:"MagazineSection"}]},{kind:"INTERFACE",name:"PlatformSchedule",possibleTypes:[{name:"EmailSchedule"},{name:"WebsiteSchedule"},{name:"MagazineSchedule"}]},{kind:"INTERFACE",name:"PlatformContent",possibleTypes:[{name:"PlatformContentArticle"},{name:"PlatformContentContact"},{name:"PlatformContentCompany"},{name:"PlatformContentApparatus"},{name:"PlatformContentGroup"},{name:"PlatformContentInQuarters"},{name:"PlatformContentBlog"},{name:"PlatformContentCollection"},{name:"PlatformContentDocument"},{name:"PlatformContentEbook"},{name:"PlatformContentEngineSpec"},{name:"PlatformContentProduct"},{name:"PlatformContentEvent"},{name:"PlatformContentInfographic"},{name:"PlatformContentJob"},{name:"PlatformContentMediaGallery"},{name:"PlatformContentNews"},{name:"PlatformContentPage"},{name:"PlatformContentPodcast"},{name:"PlatformContentPressRelease"},{name:"PlatformContentProductExternal"},{name:"PlatformContentPromotion"},{name:"PlatformContentReview"},{name:"PlatformContentSponsored"},{name:"PlatformContentTextAd"},{name:"PlatformContentVideo"},{name:"PlatformContentWebinar"},{name:"PlatformContentWhitepaper"}]},{kind:"INTERFACE",name:"PlatformEntity",possibleTypes:[{name:"PlatformEntityVenue"},{name:"PlatformEntityOrganization"}]}]};var introspectionQueryResultData = {__schema:__schema};

var fragmentMatcher = new bundle_umd_2({
  introspectionQueryResultData: introspectionQueryResultData
});

// const { InMemoryCache } = apolloCache;
// The client-side apollo client.
// Will be initialized once.

var apolloClient;
var NODE_ENV = process.env.NODE_ENV;

var create = function create(apolloConfig, initialState) {
  var isBrowser = process.browser;

  var config = _objectSpread({}, apolloConfig, {
    // Create cache and restore from initial state.
    cache: new bundle_umd_1$2({
      fragmentMatcher: fragmentMatcher
    }).restore(initialState || {}),
    // Only allow dev tools if on a non-production browser.
    connectToDevTools: isBrowser && NODE_ENV !== 'production',
    // Enable SSR mode if running on the server.
    ssrMode: !isBrowser
  });

  return new bundle_umd_1$1(config);
};

function initApollo(config, initialState, req) {
  var apolloConfig;

  if (typeof config === 'function') {
    apolloConfig = config(req);
  } else {
    apolloConfig = config;
  } // On the server, ensure a new client is created for every request.
  // @see https://www.apollographql.com/docs/react/features/server-side-rendering.html#server-initialization


  if (!process.browser) {
    return create(apolloConfig, initialState, req);
  } // Reuse the same client instance.


  if (!apolloClient) {
    apolloClient = create(apolloConfig, initialState);
  }

  return apolloClient;
}

var bundle_umd$e = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, require$$0);
}(commonjsGlobal, (function (exports,printer) {
    var __assign = function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var defaultHttpOptions = {
        includeQuery: true,
        includeExtensions: false,
    };
    var defaultHeaders = {
        // headers are case insensitive (https://stackoverflow.com/a/5259004)
        accept: '*/*',
        'content-type': 'application/json',
    };
    var defaultOptions = {
        method: 'POST',
    };
    var fallbackHttpConfig = {
        http: defaultHttpOptions,
        headers: defaultHeaders,
        options: defaultOptions,
    };
    var throwServerError = function (response, result, message) {
        var error = new Error(message);
        error.response = response;
        error.statusCode = response.status;
        error.result = result;
        throw error;
    };
    //TODO: when conditional types come in ts 2.8, operations should be a generic type that extends Operation | Array<Operation>
    var parseAndCheckHttpResponse = function (operations) { return function (response) {
        return (response
            .text()
            .then(function (bodyText) {
            try {
                return JSON.parse(bodyText);
            }
            catch (err) {
                var parseError = err;
                parseError.response = response;
                parseError.statusCode = response.status;
                parseError.bodyText = bodyText;
                return Promise.reject(parseError);
            }
        })
            //TODO: when conditional types come out then result should be T extends Array ? Array<FetchResult> : FetchResult
            .then(function (result) {
            if (response.status >= 300) {
                //Network error
                throwServerError(response, result, "Response not successful: Received status code " + response.status);
            }
            //TODO should really error per response in a Batch based on properties
            //    - could be done in a validation link
            if (!Array.isArray(result) &&
                !result.hasOwnProperty('data') &&
                !result.hasOwnProperty('errors')) {
                //Data error
                throwServerError(response, result, "Server response was missing for query '" + (Array.isArray(operations)
                    ? operations.map(function (op) { return op.operationName; })
                    : operations.operationName) + "'.");
            }
            return result;
        }));
    }; };
    var checkFetcher = function (fetcher) {
        if (!fetcher && typeof fetch === 'undefined') {
            var library = 'unfetch';
            if (typeof window === 'undefined')
                library = 'node-fetch';
            throw new Error("\nfetch is not found globally and no fetcher passed, to fix pass a fetch for\nyour environment like https://www.npmjs.com/package/" + library + ".\n\nFor example:\nimport fetch from '" + library + "';\nimport { createHttpLink } from 'apollo-link-http';\n\nconst link = createHttpLink({ uri: '/graphql', fetch: fetch });");
        }
    };
    var createSignalIfSupported = function () {
        if (typeof AbortController === 'undefined')
            return { controller: false, signal: false };
        var controller = new AbortController();
        var signal = controller.signal;
        return { controller: controller, signal: signal };
    };
    var selectHttpOptionsAndBody = function (operation, fallbackConfig) {
        var configs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            configs[_i - 2] = arguments[_i];
        }
        var options = __assign({}, fallbackConfig.options, { headers: fallbackConfig.headers, credentials: fallbackConfig.credentials });
        var http = fallbackConfig.http;
        /*
         * use the rest of the configs to populate the options
         * configs later in the list will overwrite earlier fields
         */
        configs.forEach(function (config) {
            options = __assign({}, options, config.options, { headers: __assign({}, options.headers, config.headers) });
            if (config.credentials)
                options.credentials = config.credentials;
            http = __assign({}, http, config.http);
        });
        //The body depends on the http options
        var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
        var body = { operationName: operationName, variables: variables };
        if (http.includeExtensions)
            body.extensions = extensions;
        // not sending the query (i.e persisted queries)
        if (http.includeQuery)
            body.query = printer.print(query);
        return {
            options: options,
            body: body,
        };
    };
    var serializeFetchParameter = function (p, label) {
        var serialized;
        try {
            serialized = JSON.stringify(p);
        }
        catch (e) {
            var parseError = new Error("Network request failed. " + label + " is not serializable: " + e.message);
            parseError.parseError = e;
            throw parseError;
        }
        return serialized;
    };
    //selects "/graphql" by default
    var selectURI = function (operation, fallbackURI) {
        var context = operation.getContext();
        var contextURI = context.uri;
        if (contextURI) {
            return contextURI;
        }
        else if (typeof fallbackURI === 'function') {
            return fallbackURI(operation);
        }
        else {
            return fallbackURI || '/graphql';
        }
    };

    exports.fallbackHttpConfig = fallbackHttpConfig;
    exports.throwServerError = throwServerError;
    exports.parseAndCheckHttpResponse = parseAndCheckHttpResponse;
    exports.checkFetcher = checkFetcher;
    exports.createSignalIfSupported = createSignalIfSupported;
    exports.selectHttpOptionsAndBody = selectHttpOptionsAndBody;
    exports.serializeFetchParameter = serializeFetchParameter;
    exports.selectURI = selectURI;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$e);

var bundle_umd$g = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd$4, bundle_umd$e);
}(commonjsGlobal, (function (exports,apolloLink,apolloLinkHttpCommon) {
    /* tslint:disable */
    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    var createHttpLink = function (linkOptions) {
        if (linkOptions === void 0) { linkOptions = {}; }
        var _a = linkOptions.uri, uri = _a === void 0 ? '/graphql' : _a, 
        // use default global fetch is nothing passed in
        fetcher = linkOptions.fetch, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, requestOptions = __rest(linkOptions, ["uri", "fetch", "includeExtensions", "useGETForQueries"]);
        // dev warnings to ensure fetch is present
        apolloLinkHttpCommon.checkFetcher(fetcher);
        //fetcher is set here rather than the destructuring to ensure fetch is
        //declared before referencing it. Reference in the destructuring would cause
        //a ReferenceError
        if (!fetcher) {
            fetcher = fetch;
        }
        var linkConfig = {
            http: { includeExtensions: includeExtensions },
            options: requestOptions.fetchOptions,
            credentials: requestOptions.credentials,
            headers: requestOptions.headers,
        };
        return new apolloLink.ApolloLink(function (operation) {
            var chosenURI = apolloLinkHttpCommon.selectURI(operation, uri);
            var context = operation.getContext();
            var contextConfig = {
                http: context.http,
                options: context.fetchOptions,
                credentials: context.credentials,
                headers: context.headers,
            };
            //uses fallback, link, and then context to build options
            var _a = apolloLinkHttpCommon.selectHttpOptionsAndBody(operation, apolloLinkHttpCommon.fallbackHttpConfig, linkConfig, contextConfig), options = _a.options, body = _a.body;
            var controller;
            if (!options.signal) {
                var _b = apolloLinkHttpCommon.createSignalIfSupported(), _controller = _b.controller, signal = _b.signal;
                controller = _controller;
                if (controller)
                    options.signal = signal;
            }
            // If requested, set method to GET if there are no mutations.
            var definitionIsMutation = function (d) {
                return d.kind === 'OperationDefinition' && d.operation === 'mutation';
            };
            if (useGETForQueries &&
                !operation.query.definitions.some(definitionIsMutation)) {
                options.method = 'GET';
            }
            if (options.method === 'GET') {
                var _c = rewriteURIForGET(chosenURI, body), newURI = _c.newURI, parseError = _c.parseError;
                if (parseError) {
                    return apolloLink.fromError(parseError);
                }
                chosenURI = newURI;
            }
            else {
                try {
                    options.body = apolloLinkHttpCommon.serializeFetchParameter(body, 'Payload');
                }
                catch (parseError) {
                    return apolloLink.fromError(parseError);
                }
            }
            return new apolloLink.Observable(function (observer) {
                fetcher(chosenURI, options)
                    .then(function (response) {
                    operation.setContext({ response: response });
                    return response;
                })
                    .then(apolloLinkHttpCommon.parseAndCheckHttpResponse(operation))
                    .then(function (result) {
                    // we have data and can send it to back up the link chain
                    observer.next(result);
                    observer.complete();
                    return result;
                })
                    .catch(function (err) {
                    // fetch was cancelled so its already been cleaned up in the unsubscribe
                    if (err.name === 'AbortError')
                        return;
                    // if it is a network error, BUT there is graphql result info
                    // fire the next observer before calling error
                    // this gives apollo-client (and react-apollo) the `graphqlErrors` and `networErrors`
                    // to pass to UI
                    // this should only happen if we *also* have data as part of the response key per
                    // the spec
                    if (err.result && err.result.errors && err.result.data) {
                        // if we dont' call next, the UI can only show networkError because AC didn't
                        // get andy graphqlErrors
                        // this is graphql execution result info (i.e errors and possibly data)
                        // this is because there is no formal spec how errors should translate to
                        // http status codes. So an auth error (401) could have both data
                        // from a public field, errors from a private field, and a status of 401
                        // {
                        //  user { // this will have errors
                        //    firstName
                        //  }
                        //  products { // this is public so will have data
                        //    cost
                        //  }
                        // }
                        //
                        // the result of above *could* look like this:
                        // {
                        //   data: { products: [{ cost: "$10" }] },
                        //   errors: [{
                        //      message: 'your session has timed out',
                        //      path: []
                        //   }]
                        // }
                        // status code of above would be a 401
                        // in the UI you want to show data where you can, errors as data where you can
                        // and use correct http status codes
                        observer.next(err.result);
                    }
                    observer.error(err);
                });
                return function () {
                    // XXX support canceling this request
                    // https://developers.google.com/web/updates/2017/09/abortable-fetch
                    if (controller)
                        controller.abort();
                };
            });
        });
    };
    // For GET operations, returns the given URI rewritten with parameters, or a
    // parse error.
    function rewriteURIForGET(chosenURI, body) {
        // Implement the standard HTTP GET serialization, plus 'extensions'. Note
        // the extra level of JSON serialization!
        var queryParams = [];
        var addQueryParam = function (key, value) {
            queryParams.push(key + "=" + encodeURIComponent(value));
        };
        if ('query' in body) {
            addQueryParam('query', body.query);
        }
        if (body.operationName) {
            addQueryParam('operationName', body.operationName);
        }
        if (body.variables) {
            var serializedVariables = void 0;
            try {
                serializedVariables = apolloLinkHttpCommon.serializeFetchParameter(body.variables, 'Variables map');
            }
            catch (parseError) {
                return { parseError: parseError };
            }
            addQueryParam('variables', serializedVariables);
        }
        if (body.extensions) {
            var serializedExtensions = void 0;
            try {
                serializedExtensions = apolloLinkHttpCommon.serializeFetchParameter(body.extensions, 'Extensions map');
            }
            catch (parseError) {
                return { parseError: parseError };
            }
            addQueryParam('extensions', serializedExtensions);
        }
        // Reconstruct the URI with added query params.
        // XXX This assumes that the URI is well-formed and that it doesn't
        //     already contain any of these query params. We could instead use the
        //     URL API and take a polyfill (whatwg-url@6) for older browsers that
        //     don't support URLSearchParams. Note that some browsers (and
        //     versions of whatwg-url) support URL but not URLSearchParams!
        var fragment = '', preFragment = chosenURI;
        var fragmentStart = chosenURI.indexOf('#');
        if (fragmentStart !== -1) {
            fragment = chosenURI.substr(fragmentStart);
            preFragment = chosenURI.substr(0, fragmentStart);
        }
        var queryParamsPrefix = preFragment.indexOf('?') === -1 ? '?' : '&';
        var newURI = preFragment + queryParamsPrefix + queryParams.join('&') + fragment;
        return { newURI: newURI };
    }
    var HttpLink = /** @class */ (function (_super) {
        __extends(HttpLink, _super);
        function HttpLink(opts) {
            return _super.call(this, createHttpLink(opts).request) || this;
        }
        return HttpLink;
    }(apolloLink.ApolloLink));

    exports.createHttpLink = createHttpLink;
    exports.HttpLink = HttpLink;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$g);
var bundle_umd_1$3 = bundle_umd$g.HttpLink;

var bundle_umd$i = createCommonjsModule(function (module, exports) {
(function (global, factory) {
    factory(exports, bundle_umd$4);
}(commonjsGlobal, (function (exports,apolloLink) {
    /* tslint:disable */
    var __extends = (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var onError = function (errorHandler) {
        return new apolloLink.ApolloLink(function (operation, forward) {
            return new apolloLink.Observable(function (observer) {
                var sub;
                var retriedSub;
                var retriedResult;
                try {
                    sub = forward(operation).subscribe({
                        next: function (result) {
                            if (result.errors) {
                                retriedResult = errorHandler({
                                    graphQLErrors: result.errors,
                                    response: result,
                                    operation: operation,
                                    forward: forward,
                                });
                                if (retriedResult) {
                                    retriedSub = retriedResult.subscribe({
                                        next: observer.next.bind(observer),
                                        error: observer.error.bind(observer),
                                        complete: observer.complete.bind(observer),
                                    });
                                    return;
                                }
                            }
                            observer.next(result);
                        },
                        error: function (networkError) {
                            retriedResult = errorHandler({
                                operation: operation,
                                networkError: networkError,
                                //Network errors can return GraphQL errors on for example a 403
                                graphQLErrors: networkError.result && networkError.result.errors,
                                forward: forward,
                            });
                            if (retriedResult) {
                                retriedSub = retriedResult.subscribe({
                                    next: observer.next.bind(observer),
                                    error: observer.error.bind(observer),
                                    complete: observer.complete.bind(observer),
                                });
                                return;
                            }
                            observer.error(networkError);
                        },
                        complete: function () {
                            // disable the previous sub from calling complete on observable
                            // if retry is in flight.
                            if (!retriedResult) {
                                observer.complete.bind(observer)();
                            }
                        },
                    });
                }
                catch (e) {
                    errorHandler({ networkError: e, operation: operation, forward: forward });
                    observer.error(e);
                }
                return function () {
                    if (sub)
                        sub.unsubscribe();
                    if (retriedSub)
                        sub.unsubscribe();
                };
            });
        });
    };
    var ErrorLink = /** @class */ (function (_super) {
        __extends(ErrorLink, _super);
        function ErrorLink(errorHandler) {
            var _this = _super.call(this) || this;
            _this.link = onError(errorHandler);
            return _this;
        }
        ErrorLink.prototype.request = function (operation, forward) {
            return this.link.request(operation, forward);
        };
        return ErrorLink;
    }(apolloLink.ApolloLink));

    exports.onError = onError;
    exports.ErrorLink = ErrorLink;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

});

unwrapExports(bundle_umd$i);
var bundle_umd_1$4 = bundle_umd$i.onError;

// const { ApolloLink } = apolloLink;
// const { onError } = apolloLinkError;

var _console = console,
    log = _console.log;
var apolloConfig = (function (req) {
  var headers = req ? req.headers : {};
  var uri = req ? "".concat(req.protocol, "://").concat(req.get('host')) : '';
  return {
    link: bundle_umd_1.from([bundle_umd_1$4(function (_ref) {
      var graphQLErrors = _ref.graphQLErrors,
          networkError = _ref.networkError;

      if (graphQLErrors) {
        graphQLErrors.map(function (_ref2) {
          var message = _ref2.message,
              locations = _ref2.locations,
              path = _ref2.path;
          return log("[GraphQL error]: Message: ".concat(message, ", Location: ").concat(locations, ", Path: ").concat(path));
        });
      }

      if (networkError) log("[Network error]: ".concat(networkError));
    }), new bundle_umd_1$3({
      uri: "".concat(uri, "/graphql"),
      headers: headers,
      fetch: fetch$1
    })])
  };
});

var getDataFromTree = reactApollo.getDataFromTree;
var _console$1 = console,
    log$1 = _console$1.log;
var withApollo = (function (App) {
  var WithApollo =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(WithApollo, _React$Component);

    /**
     *
     * @param {*} props
     */
    function WithApollo(props) {
      var _this;

      _classCallCheck(this, WithApollo);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithApollo).call(this, props));
      var apolloState = _this.props.apolloState;
      _this.apollo = initApollo(apolloConfig, apolloState);
      return _this;
    }
    /**
     *
     * @param {*} ctx
     */


    _createClass(WithApollo, [{
      key: "render",

      /**
       *
       */
      value: function render() {
        return React.createElement(App, _extends({}, this.props, {
          apollo: this.apollo
        }));
      }
    }], [{
      key: "getInitialProps",
      value: function () {
        var _getInitialProps = _asyncToGenerator(
        /*#__PURE__*/
        regenerator.mark(function _callee(_ref) {
          var Component, router, ctx, rest, req, res, apollo, appProps, apolloState;
          return regenerator.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  Component = _ref.Component, router = _ref.router, ctx = _ref.ctx, rest = _ref.rest;
                  req = ctx.req, res = ctx.res; // Create the apollo client and expose it within the context.
                  // This allows the "raw" client to be accessed within `getInitialProps`

                  apollo = initApollo(apolloConfig, {}, req);
                  ctx.apollo = apollo; // Await the App's initial props.

                  appProps = {};

                  if (!App.getInitialProps) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 8;
                  return App.getInitialProps(_objectSpread({
                    Component: Component,
                    router: router,
                    ctx: ctx
                  }, rest));

                case 8:
                  appProps = _context.sent;

                case 9:
                  if (!(!process.browser && !res.headersSent)) {
                    _context.next = 19;
                    break;
                  }

                  _context.prev = 10;
                  _context.next = 13;
                  return getDataFromTree(React.createElement(App, _extends({}, appProps, {
                    Component: Component,
                    router: router,
                    apollo: apollo
                  })));

                case 13:
                  _context.next = 18;
                  break;

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](10);
                  // Prevent errors from crashing SSR.
                  // Handle the error in components via data.error prop.
                  // @see http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
                  log$1('SERVER ERROR in getDataFromTree', _context.t0);

                case 18:
                  // Clear the head state so duplicate head data is prevented.
                  Head.rewind();

                case 19:
                  // Extract the Apollo query data.
                  apolloState = apollo.cache.extract();
                  return _context.abrupt("return", _objectSpread({}, appProps, {
                    apolloState: apolloState
                  }));

                case 21:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[10, 15]]);
        }));

        return function getInitialProps(_x) {
          return _getInitialProps.apply(this, arguments);
        };
      }()
    }]);

    return WithApollo;
  }(React.Component);

  WithApollo.displayName = 'WithApollo(App)';
  return WithApollo;
});

export default withApollo;
