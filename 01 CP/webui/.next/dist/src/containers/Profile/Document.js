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

var _jsxFileName = '/home/demo/open5gs/webui/src/containers/Profile/Document.js';


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
          profiles = _this$props.profiles,
          action = _this$props.action,
          status = _this$props.status;

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
        dispatch((0, _profile.createProfile)({}, formData));
      } else if (action === 'update') {
        dispatch((0, _profile.updateProfile)(formData._id, {}, formData));
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
          profile = _props.profile,
          dispatch = _props.dispatch;

      if (profile.needsFetch) {
        dispatch(profile.fetch);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var profile = nextProps.profile,
          status = nextProps.status;
      var _props2 = this.props,
          dispatch = _props2.dispatch,
          action = _props2.action,
          onHide = _props2.onHide;

      if (profile.needsFetch) {
        dispatch(profile.fetch);
      }

      if (profile.data) {
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
        //traverse(profile.data).forEach(function(x) {
        //  if (this.key == 'downlink') this.update(Number(x));
        //  if (this.key == 'uplink') this.update(Number(x));
        //})

        if (profile.data.security) {
          if (profile.data.security.opc) {
            profile.data.security.op_type = 0;
            profile.data.security.op_value = profile.data.security.opc;
          } else {
            profile.data.security.op_type = 1;
            profile.data.security.op_value = profile.data.security.op;
          }
        }
        this.setState({ formData: profile.data });
      } else {
        this.setState({ formData: formData });
      }

      if (status.response) {
        _nprogress2.default.configure({
          parent: 'body',
          trickleSpeed: 5
        });
        _nprogress2.default.done(true);

        //      const message = action === 'create' ? "New profile created" : `${status.id} profile updated`;
        var message = action === 'create' ? "New profile created" : 'This profile updated';

        dispatch(Notification.success({
          title: 'Profile',
          message: message
        }));

        dispatch((0, _actions.clearActionStatus)(_profile.MODEL, action));
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
        dispatch((0, _actions.clearActionStatus)(_profile.MODEL, action));
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
          profile = _props3.profile,
          onHide = _props3.onHide;

      return _react2.default.createElement(_components.Profile.Edit, {
        visible: visible,
        action: action,
        formData: this.state.formData,
        isLoading: profile.isLoading && !status.pending,
        validate: validate,
        onHide: onHide,
        onSubmit: handleSubmit,
        onError: handleError, __source: {
          fileName: _jsxFileName,
          lineNumber: 288
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
    profiles: (0, _selectors.select)((0, _profile.fetchProfiles)(), state.crud),
    profile: (0, _selectors.select)((0, _profile.fetchProfile)(props._id), state.crud),
    status: (0, _selectors.selectActionStatus)(_profile.MODEL, state.crud, props.action)
  };
})(Document);

exports.default = Document;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb250YWluZXJzL1Byb2ZpbGUvRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiQ29tcG9uZW50IiwiUHJvcFR5cGVzIiwiY29ubmVjdCIsIk5Qcm9ncmVzcyIsIk1PREVMIiwiZmV0Y2hQcm9maWxlcyIsImZldGNoUHJvZmlsZSIsImNyZWF0ZVByb2ZpbGUiLCJ1cGRhdGVQcm9maWxlIiwiY2xlYXJBY3Rpb25TdGF0dXMiLCJzZWxlY3QiLCJzZWxlY3RBY3Rpb25TdGF0dXMiLCJOb3RpZmljYXRpb24iLCJQcm9maWxlIiwidHJhdmVyc2UiLCJmb3JtRGF0YSIsImsiLCJhbWYiLCJvcF92YWx1ZSIsIkRvY3VtZW50Iiwic3RhdGUiLCJ2YWxpZGF0ZSIsImVycm9ycyIsInByb3BzIiwicHJvZmlsZXMiLCJhY3Rpb24iLCJzdGF0dXMiLCJtc2lzZG4iLCJsZW5ndGgiLCJhZGRFcnJvciIsInNsaWNlIiwic19uc3NhaXMiLCJtYXAiLCJzc3QiLCJzZCIsImR1cGxpY2F0ZXMiLCJpIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwibGFzdEluZGV4T2YiLCJrZXkiLCJmb3JFYWNoIiwiaW5kZXgiLCJuYW1lcyIsInNlc3Npb24iLCJuYW1lIiwiaiIsInNvbWUiLCJkZWZhdWx0X2luZGljYXRvciIsImhhbmRsZVN1Ym1pdCIsImRpc3BhdGNoIiwic2VjdXJpdHkiLCJvcF90eXBlIiwib3AiLCJvcGMiLCJjb25maWd1cmUiLCJwYXJlbnQiLCJ0cmlja2xlU3BlZWQiLCJzdGFydCIsIl9pZCIsIkVycm9yIiwiaGFuZGxlRXJyb3IiLCJlcnJvciIsInRpdGxlIiwibWVzc2FnZSIsInN0YWNrIiwicHJvZmlsZSIsIm5lZWRzRmV0Y2giLCJmZXRjaCIsIm5leHRQcm9wcyIsIm9uSGlkZSIsImRhdGEiLCJzZXRTdGF0ZSIsInJlc3BvbnNlIiwiZG9uZSIsInN1Y2Nlc3MiLCJzdGF0dXNUZXh0IiwiYXV0b0Rpc21pc3MiLCJsYWJlbCIsImNhbGxiYWNrIiwidmlzaWJsZSIsImlzTG9hZGluZyIsInBlbmRpbmciLCJwcm9wVHlwZXMiLCJzdHJpbmciLCJib29sIiwiZnVuYyIsImNydWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQVM7Ozs7QUFDVCxBQUFPOzs7O0FBQ1AsQUFBUzs7QUFFVCxBQUFPOzs7O0FBRVAsQUFBUyxBQUFPLEFBQWUsQUFBYyxBQUFlOztBQUM1RCxBQUFTOztBQUNULEFBQVMsQUFBUTs7QUFDakIsQUFBTzs7SUFBUCxBQUFZOztBQUVaLEFBQVM7O0FBRVQsQUFBTzs7Ozs7Ozs7Ozs7QUFFUCxJQUFNOztPQUNRLEFBQ1AsQUFDSDtTQUZVLEFBRUwsQUFDTDtjQUphLEFBQ0gsQUFHQSxBQUVaO0FBTFksQUFDVjs7O2VBS1ksQUFDRCxBQUNUO2NBSEksQUFDTSxBQUVGLEFBRVY7QUFKWSxBQUNWOztlQUdRLEFBQ0MsQUFDVDtjQWJXLEFBTVAsQUFLSSxBQUVBLEFBR1o7QUFMWSxBQUNSO0FBTkksQUFDTjs7V0FTUSxBQUNELEFBQ1A7eUJBRlEsQUFFYSxBQUNyQjs7Y0FBWSxBQUNBLEFBQ1I7Y0FGUSxBQUVBLEFBQ1I7OzttQkFDYyxBQUNELEFBQ1Q7a0JBSEksQUFDTSxBQUVGLEFBRVY7QUFKWSxBQUNWOzttQkFHUSxBQUNDLEFBQ1Q7a0JBVkksQUFHQSxBQUtJLEFBRUEsQUFHWjtBQUxZLEFBQ1I7QUFOSSxBQUNOOztpQkFTSyxBQUNJLEFBQ1Q7OzRCQUFPLEFBQ2EsQUFDbEI7b0NBRkssQUFFcUIsQUFDMUI7dUNBckNaLEFBQWlCLEFBZ0JOLEFBQUMsQUFHRyxBQUFDLEFBYUQsQUFFRSxBQUd3QjtBQUh4QixBQUNMO0FBSEcsQUFDTDtBQWRNLEFBQ1IsS0FETztBQUhILEFBQ1IsR0FETztBQWhCTSxBQUNmOztJLEFBMkNJOzs7Ozs7Ozs7Ozs7OztnTixBQU9KO2dCLEFBQVE7QUFBQSxBQUNOLGEsQUFxR0YsV0FBVyxVQUFBLEFBQUMsVUFBRCxBQUFXLFFBQVc7d0JBQ00sTUFETixBQUNXO1VBRFgsQUFD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LFNBQVYsQUFBbUIsQUFDcEI7QUFFRDs7OEJBQVMsQUFBYTtpQkFBTSxBQUUxQjttQkFGMEIsQUFHMUI7dUJBSDBCLEFBR2IsQUFDYjs7bUJBQVEsQUFDQyxBQUNQO3NCQUFVLG9CQUFBO3FCQUFBLEFBQU07QUFOcEIsQUFBUyxBQUFtQixBQUlsQixBQUtWO0FBTFUsQUFDTjtBQUx3QixBQUMxQixTQURPO2lCQVNBLEFBQWtCLGdEQUEzQixBQUFTLEFBQXlCLEFBQ25DO0FBQ0Y7Ozs7NkJBeUdRO1VBQUEsQUFFTCxXQUZLLEFBS0gsS0FMRyxBQUVMO1VBRkssQUFHTCxlQUhLLEFBS0gsS0FMRyxBQUdMO1VBSEssQUFJTCxjQUpLLEFBS0gsS0FMRyxBQUlMO29CQVNFLEtBYkcsQUFhRTtVQWJGLEFBUUwsa0JBUkssQUFRTDtVQVJLLEFBU0wsaUJBVEssQUFTTDtVQVRLLEFBVUwsaUJBVkssQUFVTDtVQVZLLEFBV0wsa0JBWEssQUFXTDtVQVhLLEFBWUwsaUJBWkssQUFZTCxBQUdGOzsyQ0FDRSxBQUFDLG9CQUFELEFBQVM7aUJBQVQsQUFDVyxBQUNUO2dCQUZGLEFBRVUsQUFDUjtrQkFBVSxLQUFBLEFBQUssTUFIakIsQUFHdUIsQUFDckI7bUJBQVcsUUFBQSxBQUFRLGFBQWEsQ0FBQyxPQUpuQyxBQUkwQyxBQUN4QztrQkFMRixBQUtZLEFBQ1Y7Z0JBTkYsQUFNVSxBQUNSO2tCQVBGLEFBT1ksQUFDVjtpQkFSRixBQVFXO29CQVJYO3NCQURGLEFBQ0UsQUFVSDtBQVZHO0FBQ0UsT0FERjs7Ozs7QSxBQXBPaUI7O0EsQUFBakIsUyxBQUNHO1VBQ0csb0JBRFMsQUFDQyxBQUNsQjtXQUFTLG9CQUZRLEFBRUUsQUFDbkI7VUFBUSxvQixBQUhTLEFBR0M7QUFIRCxBQUNqQjs7QUErT0osb0NBQ0UsVUFBQSxBQUFDLE9BQUQsQUFBUSxPQUFSOztjQUNZLHVCQUFBLEFBQU8sK0JBQWlCLE1BRGpCLEFBQ1AsQUFBOEIsQUFDeEM7YUFBUyx1QkFBTywyQkFBYSxNQUFwQixBQUFPLEFBQW1CLE1BQU0sTUFGeEIsQUFFUixBQUFzQyxBQUMvQztZQUFRLEFBQW1CLG1EQUFPLE1BQTFCLEFBQWdDLE1BQU0sTUFIaEQsQUFBbUIsQUFHVCxBQUE0QztBQUhuQyxBQUNqQjtBQUZPLENBQUEsRUFBWCxBQUFXLEFBTVQsQUFFRjs7a0JBQUEsQUFBZSIsImZpbGUiOiJEb2N1bWVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9kZW1vL29wZW41Z3Mvd2VidWkifQ==