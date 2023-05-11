'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('next/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _regenerator = require('next/node_modules/babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('next/node_modules/babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _promise = require('next/node_modules/babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('next/node_modules/babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var authApi = function authApi(method, url, csrf, data) {
  return (0, _axios2.default)({
    baseURL: '/api/auth',
    headers: { 'X-CSRF-TOKEN': csrf },
    method: method,
    url: url,
    data: data
  });
};
/**
 * A class to handle signing in and out and caching session data in sessionStore
 *
 * Note: We use XMLHttpRequest() here rather than fetch because fetch() uses
 * Service Workers and they cannot share cookies with the browser session
 * yet (!) so if we tried to get or pass the CSRF token it would mismatch.
 */

var Session = function () {
  function Session() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        req = _ref.req;

    (0, _classCallCheck3.default)(this, Session);

    this.session = {};
    try {
      if (req) {
        // If running on server we can access the server side environment
        this.session = {
          csrfToken: req.connection._httpMessage.locals._csrf
        };
        if (req.user) {
          this.session.user = req.user;
        }
        if (req.authToken) {
          this.session.authToken = req.authToken;
        }
      } else {
        // If running on client, attempt to load session from localStorage
        this.session = this.getLocalStore('session');
      }
    } catch (err) {
      console.log(err);
    }
  }

  (0, _createClass3.default)(Session, [{
    key: 'getSession',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(forceUpdate) {
        var _this = this;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof window === 'undefined')) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', new _promise2.default(function (resolve) {
                  resolve(_this.session);
                }));

              case 2:

                if (forceUpdate === true) {
                  this.session = {};
                  this.removeLocalStore('session');
                }

                this.session = this.getLocalStore('session');

                if (!(this.session && (0, _keys2.default)(this.session).length > 0 && this.session.expires && this.session.expires > Date.now())) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt('return', new _promise2.default(function (resolve) {
                  resolve(_this.session);
                }));

              case 6:
                return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                  authApi('get', '/session').then(function (response) {
                    _this.session = response.data;
                    _this.session.expires = Date.now() + _this.session.clientMaxAge;
                    _this.saveLocalStore('session', _this.session);
                    resolve(_this.session);
                  }).catch(function (error) {
                    return reject(Error('XMLHttpRequest failed: Unable to get session'));
                  });
                }));

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getSession(_x2) {
        return _ref2.apply(this, arguments);
      }

      return getSession;
    }()
  }, {
    key: 'signin',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(username, password) {
        var _this2 = this;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', new _promise2.default(function () {
                  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(resolve, reject) {
                    var csrf;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            if (!(typeof window === 'undefined')) {
                              _context3.next = 2;
                              break;
                            }

                            return _context3.abrupt('return', reject(Error('This method should only be called on the client')));

                          case 2:
                            _context3.next = 4;
                            return Session.getCsrfToken();

                          case 4:
                            csrf = _context3.sent;

                            authApi('post', '/login', csrf, { username: username, password: password }).then(function () {
                              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(response) {
                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        if (!(response.status !== 200)) {
                                          _context2.next = 2;
                                          break;
                                        }

                                        return _context2.abrupt('return', reject(Error('XMLHttpRequest error: Unable to login')));

                                      case 2:
                                        _context2.next = 4;
                                        return _this2.getSession(true);

                                      case 4:
                                        _this2.session = _context2.sent;

                                        resolve(true);

                                      case 6:
                                      case 'end':
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2, _this2);
                              }));

                              return function (_x7) {
                                return _ref5.apply(this, arguments);
                              };
                            }()).catch(function (error) {
                              return reject(Error('Incorrect username or password.'));
                            });

                          case 6:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this2);
                  }));

                  return function (_x5, _x6) {
                    return _ref4.apply(this, arguments);
                  };
                }()));

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function signin(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: 'signout',
    value: function () {
      var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        var _this3 = this;

        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt('return', new _promise2.default(function () {
                  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(resolve, reject) {
                    return _regenerator2.default.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            if (!(typeof window === 'undefined')) {
                              _context5.next = 2;
                              break;
                            }

                            return _context5.abrupt('return', reject(Error('This method should only be called on the client')));

                          case 2:
                            _context5.next = 4;
                            return authApi('post', '/logout', _this3.session.csrfToken);

                          case 4:
                            _context5.next = 6;
                            return _this3.getSession(true);

                          case 6:
                            _this3.session = _context5.sent;

                            resolve(true);

                          case 8:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this3);
                  }));

                  return function (_x8, _x9) {
                    return _ref7.apply(this, arguments);
                  };
                }()));

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function signout() {
        return _ref6.apply(this, arguments);
      }

      return signout;
    }()

    // The Web Storage API is widely supported, but not always available (e.g.
    // it can be restricted in private browsing mode, triggering an exception).
    // We handle that silently by just returning null here.

  }, {
    key: 'getLocalStore',
    value: function getLocalStore(name) {
      try {
        return JSON.parse(localStorage.getItem(name));
      } catch (err) {
        return null;
      }
    }
  }, {
    key: 'saveLocalStore',
    value: function saveLocalStore(name, data) {
      try {
        localStorage.setItem(name, (0, _stringify2.default)(data));
        return true;
      } catch (err) {
        return false;
      }
    }
  }, {
    key: 'removeLocalStore',
    value: function removeLocalStore(name) {
      try {
        localStorage.removeItem(name);
        return true;
      } catch (err) {
        return false;
      }
    }
  }], [{
    key: 'getCsrfToken',
    value: function () {
      var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
        return _regenerator2.default.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt('return', new _promise2.default(function (resolve, reject) {
                  if (typeof window === 'undefined') {
                    return reject(Error('This method should only be called on the client'));
                  }

                  authApi('get', '/csrf').then(function (response) {
                    return resolve(response.data.csrfToken);
                  }).catch(function (error) {
                    return reject(Error('Unexpected response when trying to get CSRF token'));
                  });
                }));

              case 1:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getCsrfToken() {
        return _ref8.apply(this, arguments);
      }

      return getCsrfToken;
    }()
  }]);

  return Session;
}();

exports.default = Session;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2F1dGgvc2Vzc2lvbi5qcyJdLCJuYW1lcyI6WyJheGlvcyIsImF1dGhBcGkiLCJtZXRob2QiLCJ1cmwiLCJjc3JmIiwiZGF0YSIsImJhc2VVUkwiLCJoZWFkZXJzIiwiU2Vzc2lvbiIsInJlcSIsInNlc3Npb24iLCJjc3JmVG9rZW4iLCJjb25uZWN0aW9uIiwiX2h0dHBNZXNzYWdlIiwibG9jYWxzIiwiX2NzcmYiLCJ1c2VyIiwiYXV0aFRva2VuIiwiZ2V0TG9jYWxTdG9yZSIsImVyciIsImNvbnNvbGUiLCJsb2ciLCJmb3JjZVVwZGF0ZSIsIndpbmRvdyIsInJlc29sdmUiLCJyZW1vdmVMb2NhbFN0b3JlIiwibGVuZ3RoIiwiZXhwaXJlcyIsIkRhdGUiLCJub3ciLCJyZWplY3QiLCJ0aGVuIiwicmVzcG9uc2UiLCJjbGllbnRNYXhBZ2UiLCJzYXZlTG9jYWxTdG9yZSIsImNhdGNoIiwiRXJyb3IiLCJ1c2VybmFtZSIsInBhc3N3b3JkIiwiZ2V0Q3NyZlRva2VuIiwic3RhdHVzIiwiZ2V0U2Vzc2lvbiIsIm5hbWUiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQSxBQUFPOzs7Ozs7QUFFUCxJQUFNLFVBQVUsU0FBVixBQUFVLFFBQUEsQUFBQyxRQUFELEFBQVMsS0FBVCxBQUFjLE1BQWQsQUFBb0IsTUFBUyxBQUMzQzs7YUFBYSxBQUNGLEFBQ1Q7YUFBUyxFQUFFLGdCQUZBLEFBRUYsQUFBa0IsQUFDM0I7WUFIVyxBQUlYO1NBSlcsQUFLWDtVQUxGLEFBQU8sQUFBTSxBQU9kO0FBUGMsQUFDWCxHQURLO0FBRFQ7QUFWQTs7Ozs7Ozs7SSxBQW9CcUIsc0JBRW5CO3FCQUF3QjttRkFBSixBQUFJO1FBQVgsQUFBVyxXQUFYLEFBQVc7O3dDQUN0Qjs7U0FBQSxBQUFLLFVBQUwsQUFB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QU8sTUFBaEIsQUFBUyxBQUFPLEFBQU07QUFsQlAsQUFPakI7OytCQVBpQjsrQkFBQTs2Q0FBQTs7QUFBQTtpQ0FBQTtBQUFaOzs2Q0FBQTs2Q0FBQTtBQUFBO0EsbUJBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O29GQXdCQTt1R0FBWSxrQkFBQSxBQUFPLFNBQVAsQUFBZ0IsUUFBaEI7b0ZBQUE7Z0NBQUE7MkRBQUE7K0JBQUE7a0NBQ2IsT0FBQSxBQUFPLFdBRE0sQUFDSyxjQURMOytDQUFBO0FBQUE7QUFBQTs7OERBRVIsT0FBTyxNQUZDLEFBRVIsQUFBTyxBQUFNOzsrQkFGTDs2Q0FBQTttQ0FNWCxRQUFBLEFBQVEsUUFBUixBQUFnQixXQUFXLE9BQUEsQUFBSyxRQU5yQixBQU1YLEFBQXdDOzsrQkFON0I7NkNBQUE7bUNBT0ksT0FBQSxBQUFLLFdBUFQsQUFPSSxBQUFnQjs7K0JBQXJDO21DQVBpQixBQU9aLG9CQUNMOztvQ0FSaUIsQUFRakIsQUFBUTs7K0JBUlM7K0JBQUE7NkNBQUE7O0FBQUE7aUNBQUE7QUFBWjs7NkNBQUE7NkNBQUE7QUFBQTtBLG1CQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFZVDs7QUFDQTtBQUNBOzs7OztrQyxBQUNjLE1BQU0sQUFDbEI7VUFBSSxBQUNGO2VBQU8sS0FBQSxBQUFLLE1BQU0sYUFBQSxBQUFhLFFBQS9CLEFBQU8sQUFBVyxBQUFxQixBQUN4QztBQUZELFFBRUUsT0FBQSxBQUFPLEtBQUssQUFDWjtlQUFBLEFBQU8sQUFDUjtBQUNGOzs7O21DLEFBQ2MsTSxBQUFNLE1BQU0sQUFDekI7VUFBSSxBQUNGO3FCQUFBLEFBQWEsUUFBYixBQUFxQixNQUFNLHlCQUEzQixBQUEyQixBQUFlLEFBQzFDO2VBQUEsQUFBTyxBQUNSO0FBSEQsUUFHRSxPQUFBLEFBQU8sS0FBSyxBQUNaO2VBQUEsQUFBTyxBQUNSO0FBQ0Y7Ozs7cUMsQUFDZ0IsTUFBTSxBQUNyQjtVQUFJLEFBQ0Y7cUJBQUEsQUFBYSxXQUFiLEFBQXdCLEFBQ3hCO2VBQUEsQUFBTyxBQUNSO0FBSEQsUUFHRSxPQUFBLEFBQU8sS0FBSyxBQUNaO2VBQUEsQUFBTyxBQUNSO0FBQ0Y7Ozs7Ozs7Ozs7d0VBakhvQixVQUFBLEFBQUMsU0FBRCxBQUFVLFFBQVcsQUFDdEM7c0JBQUksT0FBQSxBQUFPLFdBQVgsQUFBc0IsYUFBYSxBQUNqQzsyQkFBTyxPQUFPLE1BQWQsQUFBTyxBQUFPLEFBQU0sQUFDckI7QUFFRDs7MEJBQUEsQUFDRSxPQURGLEFBQ1MsU0FEVCxBQUVFLEtBQ0Esb0JBQUE7MkJBQVksUUFBUSxTQUFBLEFBQVMsS0FBN0IsQUFBWSxBQUFzQjtBQUhwQyxxQkFBQSxBQUlFLE1BQ0EsaUJBQUE7MkJBQVMsT0FBTyxNQUFoQixBQUFTLEFBQU8sQUFBTTtBQUx4QixBQU9EO0EsQUFaTSxpQkFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCLEFBMUJVIiwiZmlsZSI6InNlc3Npb24uanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZGVtby9vcGVuNWdzL3dlYnVpIn0=