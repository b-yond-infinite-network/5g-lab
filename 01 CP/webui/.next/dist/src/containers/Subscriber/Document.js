'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('next/node_modules/babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('next/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('next/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('next/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('next/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('next/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _nprogress = require('nprogress');

var _nprogress2 = _interopRequireDefault(_nprogress);

var _subscriber = require('../../modules/crud/subscriber');

var _profile = require('../../modules/crud/profile');

var _actions = require('../../modules/crud/actions');

var _selectors = require('../../modules/crud/selectors');

var _actions2 = require('../../modules/notification/actions');

var Notification = _interopRequireWildcard(_actions2);

var _components = require('../../components');

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/demo/open5gs/webui/src/containers/Subscriber/Document.js';


var formData = {
  "security": {
    k: "465B5CE8 B199B49F AA5F0A2E E238A6BC",
    amf: "8000",
    op_value: "E8ED289D EBA952E4 283B54E8 8E6183CA"
  },
  "ambr": {
    "downlink": {
      "value": 1,
      "unit": 3
    },
    "uplink": {
      "value": 1,
      "unit": 3
    }
  },
  "slice": [{
    "sst": 1,
    "default_indicator": true,
    "session": [{
      "name": "internet",
      "type": 3,
      "ambr": {
        "downlink": {
          "value": 1,
          "unit": 3
        },
        "uplink": {
          "value": 1,
          "unit": 3
        }
      },
      "qos": {
        "index": 9,
        "arp": {
          "priority_level": 8,
          "pre_emption_capability": 1,
          "pre_emption_vulnerability": 1
        }
      }
    }]
  }]
};

var Document = function (_Component) {
  (0, _inherits3.default)(Document, _Component);

  function Document() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Document);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      formData: formData
    }, _this.validate = function (formData, errors) {
      var _this$props = _this.props,
          subscribers = _this$props.subscribers,
          action = _this$props.action,
          status = _this$props.status;
      var imsi = formData.imsi;

      if (action === 'create' && subscribers && subscribers.data && subscribers.data.filter(function (subscriber) {
        return subscriber.imsi === imsi;
      }).length > 0) {
        errors.imsi.addError('\'' + imsi + '\' is duplicated');
      }

      //    In Editing-mode, this is not working!
      //    More study is needed.
      //
      //    if (formData.msisdn) {
      //      formData.msisdn.map(msisdn => {
      //        if (subscribers.data.filter(subscriber => subscriber.msisdn.includes(msisdn)).length > 0) {
      //          errors.msisdn.addError(`'${msisdn}' is duplicated`);
      //        }
      //      });

      if (formData.msisdn) {
        var msisdn = formData.msisdn;

        if (msisdn && msisdn.length > 1 && msisdn[0] === msisdn[1]) errors.msisdn.addError('\'' + msisdn[1] + '\' is duplicated');
      }

      if (formData.slice) {
        var s_nssais = formData.slice.map(function (slice) {
          return (0, _stringify2.default)({ sst: slice.sst, sd: slice.sd });
        });
        var duplicates = {};
        for (var i = 0; i < s_nssais.length; i++) {
          if (duplicates.hasOwnProperty(s_nssais[i])) {
            duplicates[s_nssais[i]].push(i);
          } else if (s_nssais.lastIndexOf(s_nssais[i]) !== i) {
            duplicates[s_nssais[i]] = [i];
          }
        }

        var _loop = function _loop(key) {
          duplicates[key].forEach(function (index) {
            return errors.slice[index].sst.addError(key + ' is duplicated');
          });
        };

        for (var key in duplicates) {
          _loop(key);
        }
      }

      var _loop2 = function _loop2(_i) {
        var names = formData.slice[_i].session.map(function (session) {
          return session.name;
        });
        var duplicates = {};
        for (var j = 0; j < names.length; j++) {
          if (duplicates.hasOwnProperty(names[j])) {
            duplicates[names[j]].push(j);
          } else if (names.lastIndexOf(names[j]) !== j) {
            duplicates[names[j]] = [j];
          }
        }

        var _loop3 = function _loop3(key) {
          duplicates[key].forEach(function (index) {
            return errors.slice[_i].session[index].name.addError('\'' + key + '\' is duplicated');
          });
        };

        for (var key in duplicates) {
          _loop3(key);
        }
      };

      for (var _i = 0; _i < formData.slice.length; _i++) {
        _loop2(_i);
      }

      if (!formData.slice.some(function (slice) {
        return slice.default_indicator == true;
      })) {
        for (var _i2 = 0; _i2 < formData.slice.length; _i2++) {
          errors.slice[_i2].default_indicator.addError('At least 1 Default S-NSSAI is required');
        }
      }

      return errors;
    }, _this.handleSubmit = function (formData) {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          action = _this$props2.action;

      if (formData.security) {
        if (formData.security.op_type === 1) {
          formData.security.op = formData.security.op_value;
          formData.security.opc = null;
        } else {
          formData.security.op = null;
          formData.security.opc = formData.security.op_value;
        }
      }

      _nprogress2.default.configure({
        parent: '#nprogress-base-form',
        trickleSpeed: 5
      });
      _nprogress2.default.start();

      if (action === 'create') {
        dispatch((0, _subscriber.createSubscriber)({}, formData));
      } else if (action === 'update') {
        dispatch((0, _subscriber.updateSubscriber)(formData.imsi, {}, formData));
      } else {
        throw new Error('Action type \'' + action + '\' is invalid.');
      }
    }, _this.handleError = function (errors) {
      var dispatch = _this.props.dispatch;

      errors.map(function (error) {
        return dispatch(Notification.error({
          title: 'Validation Error',
          message: error.stack
        }));
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Document, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          subscriber = _props.subscriber,
          profiles = _props.profiles,
          dispatch = _props.dispatch;

      if (subscriber.needsFetch) {
        dispatch(subscriber.fetch);
      }
      if (profiles.needsFetch) {
        dispatch(profiles.fetch);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var subscriber = nextProps.subscriber,
          profiles = nextProps.profiles,
          status = nextProps.status;
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          action = _props2.action,
          onHide = _props2.onHide;

      if (subscriber.needsFetch) {
        dispatch(subscriber.fetch);
      }
      if (profiles.needsFetch) {
        dispatch(profiles.fetch);
      }

      if (subscriber.data) {
        // Mongoose library has a problem for 64bit-long type
        //
        //   FETCH : the library returns 'Number' type for 64bit-long type
        //   CREATE/UPDATE : the library returns 'String' type for 64bit-long type
        //
        // In this case, I cannot avoid json-schema validation function
        // So, I've changed the type from 'String' to 'Number' if the key name is 'downlink' and 'uplink'
        // 
        //    The followings are changed from 'String' to 'Number' after DB CREATE or UPDATE
        //     - ambr.downlink, ambr.uplink, qos.mbr.downlink, qos.mbr.uplink, qos.gbr.downlink, qos.gbr.uplink
        // 
        //traverse(subscriber.data).forEach(function(x) {
        //  if (this.key == 'downlink') this.update(Number(x));
        //  if (this.key == 'uplink') this.update(Number(x));
        //})

        if (subscriber.data.security) {
          if (subscriber.data.security.opc) {
            subscriber.data.security.op_type = 0;
            subscriber.data.security.op_value = subscriber.data.security.opc;
          } else {
            subscriber.data.security.op_type = 1;
            subscriber.data.security.op_value = subscriber.data.security.op;
          }
        }

        this.setState({ formData: subscriber.data });
      } else {
        this.setState({ formData: formData });
      }

      if (status.response) {
        _nprogress2.default.configure({
          parent: 'body',
          trickleSpeed: 5
        });
        _nprogress2.default.done(true);

        var message = action === 'create' ? "New subscriber created" : status.id + ' subscriber updated';

        dispatch(Notification.success({
          title: 'Subscriber',
          message: message
        }));

        dispatch((0, _actions.clearActionStatus)(_subscriber.MODEL, action));
        onHide();
      }

      if (status.error) {
        _nprogress2.default.configure({
          parent: 'body',
          trickleSpeed: 5
        });
        _nprogress2.default.done(true);

        var response = ((status || {}).error || {}).response || {};

        var title = 'Unknown Code';
        var _message = 'Unknown Error';
        if (response.data && response.data.name && response.data.message) {
          title = response.data.name;
          _message = response.data.message;
        } else {
          title = response.status;
          _message = response.statusText;
        }

        dispatch(Notification.error({
          title: title,
          message: _message,
          autoDismiss: 0,
          action: {
            label: 'Dismiss',
            callback: function callback() {
              return onHide();
            }
          }
        }));
        dispatch((0, _actions.clearActionStatus)(_subscriber.MODEL, action));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var validate = this.validate,
          handleSubmit = this.handleSubmit,
          handleError = this.handleError;
      var _props3 = this.props,
          visible = _props3.visible,
          action = _props3.action,
          status = _props3.status,
          subscriber = _props3.subscriber,
          profiles = _props3.profiles,
          onHide = _props3.onHide;

      return _react2.default.createElement(_components.Subscriber.Edit, {
        visible: visible,
        action: action,
        formData: this.state.formData,
        profiles: profiles.data,
        isLoading: subscriber.isLoading && !status.pending,
        validate: validate,
        onHide: onHide,
        onSubmit: handleSubmit,
        onError: handleError, __source: {
          fileName: _jsxFileName,
          lineNumber: 301
        }
      });
    }
  }]);

  return Document;
}(_react.Component);

Document.propTypes = {
  action: _propTypes2.default.string,
  visible: _propTypes2.default.bool,
  onHide: _propTypes2.default.func
};

Document = (0, _reactRedux.connect)(function (state, props) {
  return {
    subscribers: (0, _selectors.select)((0, _subscriber.fetchSubscribers)(), state.crud),
    subscriber: (0, _selectors.select)((0, _subscriber.fetchSubscriber)(props.imsi), state.crud),
    profiles: (0, _selectors.select)((0, _profile.fetchProfiles)(), state.crud),
    status: (0, _selectors.selectActionStatus)(_subscriber.MODEL, state.crud, props.action)
  };
})(Document);

exports.default = Document;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL1N1YnNjcmliZXIvRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiY29ubmVjdCIsIk5Qcm9ncmVzcyIsIk1PREVMIiwiZmV0Y2hTdWJzY3JpYmVycyIsImZldGNoU3Vic2NyaWJlciIsImNyZWF0ZVN1YnNjcmliZXIiLCJ1cGRhdGVTdWJzY3JpYmVyIiwiZmV0Y2hQcm9maWxlcyIsImNsZWFyQWN0aW9uU3RhdHVzIiwic2VsZWN0Iiwic2VsZWN0QWN0aW9uU3RhdHVzIiwiTm90aWZpY2F0aW9uIiwiU3Vic2NyaWJlciIsInRyYXZlcnNlIiwiZm9ybURhdGEiLCJrIiwiYW1mIiwib3BfdmFsdWUiLCJEb2N1bWVudCIsInN0YXRlIiwidmFsaWRhdGUiLCJlcnJvcnMiLCJwcm9wcyIsInN1YnNjcmliZXJzIiwiYWN0aW9uIiwic3RhdHVzIiwiaW1zaSIsImRhdGEiLCJmaWx0ZXIiLCJzdWJzY3JpYmVyIiwibGVuZ3RoIiwiYWRkRXJyb3IiLCJtc2lzZG4iLCJzbGljZSIsInNfbnNzYWlzIiwibWFwIiwic3N0Iiwic2QiLCJkdXBsaWNhdGVzIiwiaSIsImhhc093blByb3BlcnR5IiwicHVzaCIsImxhc3RJbmRleE9mIiwia2V5IiwiZm9yRWFjaCIsImluZGV4IiwibmFtZXMiLCJzZXNzaW9uIiwibmFtZSIsImoiLCJzb21lIiwiZGVmYXVsdF9pbmRpY2F0b3IiLCJoYW5kbGVTdWJtaXQiLCJkaXNwYXRjaCIsInNlY3VyaXR5Iiwib3BfdHlwZSIsIm9wIiwib3BjIiwiY29uZmlndXJlIiwicGFyZW50IiwidHJpY2tsZVNwZWVkIiwic3RhcnQiLCJFcnJvciIsImhhbmRsZUVycm9yIiwiZXJyb3IiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJzdGFjayIsInByb2ZpbGVzIiwibmVlZHNGZXRjaCIsImZldGNoIiwibmV4dFByb3BzIiwib25IaWRlIiwic2V0U3RhdGUiLCJyZXNwb25zZSIsImRvbmUiLCJpZCIsInN1Y2Nlc3MiLCJzdGF0dXNUZXh0IiwiYXV0b0Rpc21pc3MiLCJsYWJlbCIsImNhbGxiYWNrIiwidmlzaWJsZSIsImlzTG9hZGluZyIsInBlbmRpbmciLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJib29sIiwiZnVuYyIsImNydWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQVM7Ozs7QUFDVCxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFFVCxBQUFPOzs7O0FBRVAsQUFBUyxBQUFPLEFBQWtCLEFBQWlCLEFBQWtCOztBQUNyRSxBQUFTOztBQUNULEFBQVM7O0FBQ1QsQUFBUyxBQUFROztBQUNqQixBQUFPOztJQUFQLEFBQVk7O0FBRVosQUFBUzs7QUFFVCxBQUFPOzs7Ozs7Ozs7OztBQUVQLElBQU07O09BQ1EsQUFDUCxBQUNIO1NBRlUsQUFFTCxBQUNMO2NBSmEsQUFDSCxBQUdBLEFBRVo7QUFMWSxBQUNWOzs7ZUFLWSxBQUNELEFBQ1Q7Y0FISSxBQUNNLEFBRUYsQUFFVjtBQUpZLEFBQ1Y7O2VBR1EsQUFDQyxBQUNUO2NBYlcsQUFNUCxBQUtJLEFBRUEsQUFHWjtBQUxZLEFBQ1I7QUFOSSxBQUNOOztXQVNRLEFBQ0QsQUFDUDt5QkFGUSxBQUVhLEFBQ3JCOztjQUFZLEFBQ0EsQUFDUjtjQUZRLEFBRUEsQUFDUjs7O21CQUNjLEFBQ0QsQUFDVDtrQkFISSxBQUNNLEFBRUYsQUFFVjtBQUpZLEFBQ1Y7O21CQUdRLEFBQ0MsQUFDVDtrQkFWSSxBQUdBLEFBS0ksQUFFQSxBQUdaO0FBTFksQUFDUjtBQU5JLEFBQ047O2lCQVNLLEFBQ0ksQUFDVDs7NEJBQU8sQUFDYSxBQUNsQjtvQ0FGSyxBQUVxQixBQUMxQjt1Q0FyQ1osQUFBaUIsQUFnQk4sQUFBQyxBQUdHLEFBQUMsQUFhRCxBQUVFLEFBR3dCO0FBSHhCLEFBQ0w7QUFIRyxBQUNMO0FBZE0sQUFDUixLQURPO0FBSEgsQUFDUixHQURPO0FBaEJNLEFBQ2Y7O0ksQUEyQ0k7Ozs7Ozs7Ozs7Ozs7O2dOLEFBT0o7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TDtVQVhLLEFBWUwsbUJBWkssQUFZTDtVQVpLLEFBYUwsaUJBYkssQUFhTCxBQUdGOzsyQ0FDRSxBQUFDLHVCQUFELEFBQVk7aUJBQVosQUFDVyxBQUNUO2dCQUZGLEFBRVUsQUFDUjtrQkFBVSxLQUFBLEFBQUssTUFIakIsQUFHdUIsQUFDckI7a0JBQVUsU0FKWixBQUlxQixBQUNuQjttQkFBVyxXQUFBLEFBQVcsYUFBYSxDQUFDLE9BTHRDLEFBSzZDLEFBQzNDO2tCQU5GLEFBTVksQUFDVjtnQkFQRixBQU9VLEFBQ1I7a0JBUkYsQUFRWSxBQUNWO2lCQVRGLEFBU1c7b0JBVFg7c0JBREYsQUFDRSxBQVdIO0FBWEc7QUFDRSxPQURGOzs7OztBLEFBaFBpQjs7QSxBQUFqQixTLEFBQ0c7VUFDRyxvQkFEUyxBQUNDLEFBQ2xCO1dBQVMsb0JBRlEsQUFFRSxBQUNuQjtVQUFRLG9CLEFBSFMsQUFHQztBQUhELEFBQ2pCOztBQTRQSixvQ0FDRSxVQUFBLEFBQUMsT0FBRCxBQUFRLE9BQVI7O2lCQUNlLHVCQUFBLEFBQU8scUNBQW9CLE1BRHZCLEFBQ0osQUFBaUMsQUFDOUM7Z0JBQVksdUJBQU8saUNBQWdCLE1BQXZCLEFBQU8sQUFBc0IsT0FBTyxNQUYvQixBQUVMLEFBQTBDLEFBQ3REO2NBQVUsdUJBQUEsQUFBTywrQkFBaUIsTUFIakIsQUFHUCxBQUE4QixBQUN4QztZQUFRLEFBQW1CLHNEQUFPLE1BQTFCLEFBQWdDLE1BQU0sTUFKaEQsQUFBbUIsQUFJVCxBQUE0QztBQUpuQyxBQUNqQjtBQUZPLENBQUEsRUFBWCxBQUFXLEFBT1QsQUFFRjs7a0JBQUEsQUFBZSIsImZpbGUiOiJEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9kZW1vL29wZW41Z3Mvd2VidWkifQ==