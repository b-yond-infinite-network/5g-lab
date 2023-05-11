'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('next/node_modules/babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _taggedTemplateLiteral2 = require('next/node_modules/babel-runtime/helpers/taggedTemplateLiteral');

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _style = require('styled-jsx/style.js');

var _style2 = _interopRequireDefault(_style);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _openColor = require('open-color');

var _openColor2 = _interopRequireDefault(_openColor);

var _styleUtils = require('../../helpers/style-utils');

var _reactJsonschemaForm = require('react-jsonschema-form');

var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Spinner = require('./Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _Confirm = require('./Confirm');

var _Confirm2 = _interopRequireDefault(_Confirm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/demo/open5gs/webui/src/components/Shared/Form.js';

var _templateObject = (0, _taggedTemplateLiteral3.default)(['\n    width: calc(100vw - 2rem);\n  '], ['\n    width: calc(100vw - 2rem);\n  ']),
    _templateObject2 = (0, _taggedTemplateLiteral3.default)(['\n    height: calc(100vh - 16rem);\n  '], ['\n    height: calc(100vh - 16rem);\n  ']);

var Wrapper = _styledComponents2.default.div.withConfig({
  componentId: 's1m62379-0'
})(['display:flex;flex-direction:column;postion:relative;width:', ';', ' background:white;box-shadow:0 10px 20px rgba(0,0,0,0.19),0 6px 6px rgba(0,0,0,0.23);'], function (p) {
  return p.width || '1050px';
}, _styleUtils.media.mobile(_templateObject));

var Header = _styledComponents2.default.div.withConfig({
  componentId: 's1m62379-1'
})(['display:flex;justify-content:flex-start;padding:1rem;font-size:1.5rem;background:', ';'], _openColor2.default.gray[1]);

var Body = _styledComponents2.default.div.withConfig({
  componentId: 's1m62379-2'
})(['padding:2rem;font-size:14px;height:', ';', ' overflow:scroll;'], function (p) {
  return p.height || '500px';
}, _styleUtils.media.mobile(_templateObject2));

var Footer = _styledComponents2.default.div.withConfig({
  componentId: 's1m62379-3'
})(['display:flex;justify-content:flex-end;padding:1rem;']);

/* We can UI design with styled-componented. Later! */
var REQUIRED_FIELD_SYMBOL = "*";

var CustomTitleField = function CustomTitleField(props) {
  var id = props.id,
      title = props.title,
      required = props.required;

  var legend = required ? title + REQUIRED_FIELD_SYMBOL : title;
  return _react2.default.createElement('legend', { id: id, __source: {
      fileName: _jsxFileName,
      lineNumber: 63
    }
  }, legend);
};

var fields = {
  TitleField: CustomTitleField
};

function Label(props) {
  //  modified by acetcom
  //  const { label, required, id } = props;
  var label = props.label,
      id = props.id;

  var required = 0;
  if (!label) {
    // See #312: Ensure compatibility with old versions of React.
    return _react2.default.createElement('div', {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 78
      }
    });
  }
  return _react2.default.createElement('label', { className: 'control-label', htmlFor: id, __source: {
      fileName: _jsxFileName,
      lineNumber: 81
    }
  }, required ? label + REQUIRED_FIELD_SYMBOL : label);
}

var CustomFieldTemplate = function CustomFieldTemplate(props) {
  var id = props.id,
      classNames = props.classNames,
      label = props.label,
      children = props.children,
      errors = props.errors,
      help = props.help,
      description = props.description,
      hidden = props.hidden,
      required = props.required,
      displayLabel = props.displayLabel;

  if (hidden) {
    return children;
  }

  return _react2.default.createElement('div', { className: classNames, __source: {
      fileName: _jsxFileName,
      lineNumber: 106
    }
  }, displayLabel && _react2.default.createElement(Label, { label: label, required: required, id: id, __source: {
      fileName: _jsxFileName,
      lineNumber: 107
    }
  }), displayLabel && description ? description : null, children, errors, help);
};

var transformErrors = function transformErrors(errors) {
  return errors.map(function (error) {
    // use error messages from JSON schema if any
    if (error.schema.messages && error.schema.messages[error.name]) {
      return (0, _extends3.default)({}, error, {
        message: error.schema.messages[error.name]
      });
    }
    return error;
  });
};

var Form = function (_Component) {
  (0, _inherits3.default)(Form, _Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Form.__proto__ || (0, _getPrototypeOf2.default)(Form)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.handleChange = function (data) {
      var onChange = _this.props.onChange;

      var formDataChanged = null;
      if (onChange) {
        formDataChanged = onChange(data.formData);
      }
      _this.setState({
        editing: true,
        disableSubmitButton: (0, _keys2.default)(data.errors).length > 0,
        formData: formDataChanged ? formDataChanged : data.formData
      });
    }, _this.handleSubmit = function (data) {
      var onSubmit = _this.props.onSubmit;

      onSubmit(data.formData);
    }, _this.handleSubmitButton = function () {
      _this.setState({
        disabled: true,
        disableSubmitButton: true
      });
      _this.submitButton.click();
    }, _this.handleOutside = function () {
      var onHide = _this.props.onHide;

      if (_this.state.editing === true) {
        _this.setState({ confirm: true });
      } else {
        onHide();
      }
    }, _this.handleClose = function () {
      var onHide = _this.props.onHide;

      _this.setState({ confirm: false });
      onHide();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Form, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.visible === false && nextProps.visible === true) {
        // Initialize State Variable when form view is visible for the first time
        this.setState({
          formData: nextProps.formData,
          disabled: false,
          editing: false,
          confirm: false,
          disableSubmitButton: true
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var handleChange = this.handleChange,
          handleSubmit = this.handleSubmit,
          handleSubmitButton = this.handleSubmitButton,
          handleOutside = this.handleOutside,
          handleClose = this.handleClose;
      var _props = this.props,
          visible = _props.visible,
          title = _props.title,
          schema = _props.schema,
          uiSchema = _props.uiSchema,
          isLoading = _props.isLoading,
          validate = _props.validate,
          onSubmit = _props.onSubmit,
          onError = _props.onError;
      var _state = this.state,
          disabled = _state.disabled,
          disableSubmitButton = _state.disableSubmitButton,
          formData = _state.formData;

      return _react2.default.createElement('div', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 243
        }
      }, _react2.default.createElement(_Modal2.default, {
        visible: visible,
        onOutside: handleOutside,
        disableOnClickOutside: this.state.confirm, __source: {
          fileName: _jsxFileName,
          lineNumber: 244
        }
      }, _react2.default.createElement(Wrapper, { id: 'nprogress-base-form', width: this.props.width, __source: {
          fileName: _jsxFileName,
          lineNumber: 248
        }
      }, _react2.default.createElement(Header, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 249
        }
      }, title), _react2.default.createElement(Body, { height: this.props.height, __source: {
          fileName: _jsxFileName,
          lineNumber: 252
        }
      }, isLoading && _react2.default.createElement(_Spinner2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 253
        }
      }), !isLoading && _react2.default.createElement(_reactJsonschemaForm2.default, {
        schema: schema,
        uiSchema: disabled ? (0, _extends3.default)({
          "ui:disabled": true
        }, uiSchema) : (0, _extends3.default)({}, uiSchema),
        formData: formData,
        disableSubmitButton: disableSubmitButton,
        fields: fields,
        FieldTemplate: CustomFieldTemplate,
        liveValidate: true,
        validate: validate,
        showErrorList: false,
        transformErrors: transformErrors,
        autocomplete: 'off',
        onChange: handleChange,
        onSubmit: handleSubmit,
        onError: onError, __source: {
          fileName: _jsxFileName,
          lineNumber: 255
        }
      }, _react2.default.createElement('div', {
        'data-jsx': 301980644,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 277
        }
      }, _react2.default.createElement('button', { type: 'submit', ref: function ref(el) {
          return _this2.submitButton = el;
        }, 'data-jsx': 301980644,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 278
        }
      }), _react2.default.createElement(_style2.default, {
        styleId: 301980644,
        css: 'button[data-jsx="301980644"]{display:none}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL1NoYXJlZC9Gb3JtLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNSZ0MsQUFHc0MsYUFDZiIsImZpbGUiOiJzcmMvY29tcG9uZW50cy9TaGFyZWQvRm9ybS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9kZW1vL29wZW41Z3Mvd2VidWkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCBvYyBmcm9tICdvcGVuLWNvbG9yJztcbmltcG9ydCB7IG1lZGlhIH0gZnJvbSAnaGVscGVycy9zdHlsZS11dGlscyc7XG5cbmltcG9ydCBKc29uU2NoZW1hRm9ybSBmcm9tICdyZWFjdC1qc29uc2NoZW1hLWZvcm0nO1xuXG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9Nb2RhbCc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vQnV0dG9uJztcbmltcG9ydCBTcGlubmVyIGZyb20gJy4vU3Bpbm5lcic7XG5pbXBvcnQgQ29uZmlybSBmcm9tICcuL0NvbmZpcm0nO1xuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgcG9zdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAke3AgPT4gcC53aWR0aCB8fCBgMTA1MHB4YH07XG5cbiAgJHttZWRpYS5tb2JpbGVgXG4gICAgd2lkdGg6IGNhbGMoMTAwdncgLSAycmVtKTtcbiAgYH1cblxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgYm94LXNoYWRvdzogMCAxMHB4IDIwcHggcmdiYSgwLDAsMCwwLjE5KSwgMCA2cHggNnB4IHJnYmEoMCwwLDAsMC4yMyk7XG5gXG5cbmNvbnN0IEhlYWRlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcblxuICBwYWRkaW5nOiAxcmVtO1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgYmFja2dyb3VuZDogJHtvYy5ncmF5WzFdfTtcbmBcblxuY29uc3QgQm9keSA9IHN0eWxlZC5kaXZgXG4gIHBhZGRpbmc6IDJyZW07XG4gIGZvbnQtc2l6ZTogMTRweDtcblxuICBoZWlnaHQ6ICR7cCA9PiBwLmhlaWdodCB8fCBgNTAwcHhgfTtcbiAgJHttZWRpYS5tb2JpbGVgXG4gICAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTZyZW0pO1xuICBgfVxuXG4gIG92ZXJmbG93OiBzY3JvbGw7XG5gXG5cbmNvbnN0IEZvb3RlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG5cbiAgcGFkZGluZzogMXJlbTtcbmBcblxuLyogV2UgY2FuIFVJIGRlc2lnbiB3aXRoIHN0eWxlZC1jb21wb25lbnRlZC4gTGF0ZXIhICovXG5jb25zdCBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgPSBcIipcIjtcblxuY29uc3QgQ3VzdG9tVGl0bGVGaWVsZCA9IHByb3BzID0+IHtcbiAgY29uc3QgeyBpZCwgdGl0bGUsIHJlcXVpcmVkIH0gPSBwcm9wcztcbiAgY29uc3QgbGVnZW5kID0gcmVxdWlyZWQgPyB0aXRsZSArIFJFUVVJUkVEX0ZJRUxEX1NZTUJPTCA6IHRpdGxlO1xuICByZXR1cm4gPGxlZ2VuZCBpZD17aWR9PntsZWdlbmR9PC9sZWdlbmQ+O1xuXG59O1xuXG5jb25zdCBmaWVsZHMgPSB7XG4gIFRpdGxlRmllbGQ6IEN1c3RvbVRpdGxlRmllbGQsXG59O1xuXG5mdW5jdGlvbiBMYWJlbChwcm9wcykge1xuLy8gIG1vZGlmaWVkIGJ5IGFjZXRjb21cbi8vICBjb25zdCB7IGxhYmVsLCByZXF1aXJlZCwgaWQgfSA9IHByb3BzO1xuICBjb25zdCB7IGxhYmVsLCBpZCB9ID0gcHJvcHM7XG4gIGNvbnN0IHJlcXVpcmVkID0gMDtcbiAgaWYgKCFsYWJlbCkge1xuICAgIC8vIFNlZSAjMzEyOiBFbnN1cmUgY29tcGF0aWJpbGl0eSB3aXRoIG9sZCB2ZXJzaW9ucyBvZiBSZWFjdC5cbiAgICByZXR1cm4gPGRpdiAvPjtcbiAgfVxuICByZXR1cm4gKFxuICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb250cm9sLWxhYmVsXCIgaHRtbEZvcj17aWR9PlxuICAgICAge3JlcXVpcmVkID8gbGFiZWwgKyBSRVFVSVJFRF9GSUVMRF9TWU1CT0wgOiBsYWJlbH1cbiAgICA8L2xhYmVsPlxuICApO1xufVxuXG5jb25zdCBDdXN0b21GaWVsZFRlbXBsYXRlID0gcHJvcHMgPT4ge1xuICBjb25zdCB7XG4gICAgaWQsXG4gICAgY2xhc3NOYW1lcyxcbiAgICBsYWJlbCxcbiAgICBjaGlsZHJlbixcbiAgICBlcnJvcnMsXG4gICAgaGVscCxcbiAgICBkZXNjcmlwdGlvbixcbiAgICBoaWRkZW4sXG4gICAgcmVxdWlyZWQsXG4gICAgZGlzcGxheUxhYmVsLFxuICB9ID0gcHJvcHM7XG5cbiAgaWYgKGhpZGRlbikge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZXN9PlxuICAgICAge2Rpc3BsYXlMYWJlbCAmJiA8TGFiZWwgbGFiZWw9e2xhYmVsfSByZXF1aXJlZD17cmVxdWlyZWR9IGlkPXtpZH0gLz59XG4gICAgICB7ZGlzcGxheUxhYmVsICYmIGRlc2NyaXB0aW9uID8gZGVzY3JpcHRpb24gOiBudWxsfVxuICAgICAge2NoaWxkcmVufVxuICAgICAge2Vycm9yc31cbiAgICAgIHtoZWxwfVxuICAgIDwvZGl2PlxuICApO1xufVxuXG5jb25zdCB0cmFuc2Zvcm1FcnJvcnMgPSBlcnJvcnMgPT4ge1xuICByZXR1cm4gZXJyb3JzLm1hcChlcnJvciA9PiB7XG4gICAgLy8gdXNlIGVycm9yIG1lc3NhZ2VzIGZyb20gSlNPTiBzY2hlbWEgaWYgYW55XG4gICAgaWYgKGVycm9yLnNjaGVtYS5tZXNzYWdlcyAmJiBlcnJvci5zY2hlbWEubWVzc2FnZXNbZXJyb3IubmFtZV0pIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmVycm9yLFxuICAgICAgICBtZXNzYWdlOiBlcnJvci5zY2hlbWEubWVzc2FnZXNbZXJyb3IubmFtZV1cbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBlcnJvcjtcbiAgfSk7XG59O1xuXG5jbGFzcyBGb3JtIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICB2aXNpYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB0aXRsZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICBzY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgdWlTY2hlbWE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgZm9ybURhdGE6IFByb3BUeXBlcy5vYmplY3QsXG4gICAgaXNMb2FkaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgICB2YWxkYXRlOiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkhpZGU6IFByb3BUeXBlcy5mdW5jLFxuICAgIG9uU3VibWl0OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkVycm9yOiBQcm9wVHlwZXMuZnVuY1xuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAgdmlzaWJsZTogZmFsc2UsXG4gICAgdGl0bGU6IFwiXCJcbiAgfTtcblxuICBzdGF0ZSA9IHt9O1xuXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKSB7XG4gICAgaWYgKHRoaXMucHJvcHMudmlzaWJsZSA9PT0gZmFsc2UgJiYgbmV4dFByb3BzLnZpc2libGUgPT09IHRydWUpIHtcbiAgICAgIC8vIEluaXRpYWxpemUgU3RhdGUgVmFyaWFibGUgd2hlbiBmb3JtIHZpZXcgaXMgdmlzaWJsZSBmb3IgdGhlIGZpcnN0IHRpbWVcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBcbiAgICAgICAgZm9ybURhdGE6IG5leHRQcm9wcy5mb3JtRGF0YSxcbiAgICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICBlZGl0aW5nOiBmYWxzZSxcbiAgICAgICAgY29uZmlybTogZmFsc2UsXG4gICAgICAgIGRpc2FibGVTdWJtaXRCdXR0b246IHRydWVcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlID0gZGF0YSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25DaGFuZ2VcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGxldCBmb3JtRGF0YUNoYW5nZWQgPSBudWxsOyAgXG4gICAgaWYgKG9uQ2hhbmdlKSB7XG4gICAgICAgZm9ybURhdGFDaGFuZ2VkID0gb25DaGFuZ2UoZGF0YS5mb3JtRGF0YSk7XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgZWRpdGluZzogdHJ1ZSxcbiAgICAgIGRpc2FibGVTdWJtaXRCdXR0b246IChPYmplY3Qua2V5cyhkYXRhLmVycm9ycykubGVuZ3RoID4gMCksXG4gICAgICBmb3JtRGF0YTogZm9ybURhdGFDaGFuZ2VkID8gZm9ybURhdGFDaGFuZ2VkIDogZGF0YS5mb3JtRGF0YVxuICAgIH0pXG4gIH1cblxuICBoYW5kbGVTdWJtaXQgPSBkYXRhID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBvblN1Ym1pdFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgb25TdWJtaXQoZGF0YS5mb3JtRGF0YSk7XG4gIH1cblxuICBoYW5kbGVTdWJtaXRCdXR0b24gPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBkaXNhYmxlZDogdHJ1ZSxcbiAgICAgIGRpc2FibGVTdWJtaXRCdXR0b246IHRydWVcbiAgICB9KVxuICAgIHRoaXMuc3VibWl0QnV0dG9uLmNsaWNrKCk7XG4gIH1cblxuICBoYW5kbGVPdXRzaWRlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIG9uSGlkZVxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuZWRpdGluZyA9PT0gdHJ1ZSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbmZpcm06IHRydWUgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgb25IaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xvc2UgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgb25IaWRlXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICB0aGlzLnNldFN0YXRlKHsgY29uZmlybTogZmFsc2UgfSlcbiAgICBvbkhpZGUoKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBoYW5kbGVDaGFuZ2UsXG4gICAgICBoYW5kbGVTdWJtaXQsXG4gICAgICBoYW5kbGVTdWJtaXRCdXR0b24sXG4gICAgICBoYW5kbGVPdXRzaWRlLFxuICAgICAgaGFuZGxlQ2xvc2VcbiAgICB9ID0gdGhpcztcblxuICAgIGNvbnN0IHtcbiAgICAgIHZpc2libGUsXG4gICAgICB0aXRsZSxcbiAgICAgIHNjaGVtYSxcbiAgICAgIHVpU2NoZW1hLFxuICAgICAgaXNMb2FkaW5nLFxuICAgICAgdmFsaWRhdGUsXG4gICAgICBvblN1Ym1pdCxcbiAgICAgIG9uRXJyb3JcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHtcbiAgICAgIGRpc2FibGVkLFxuICAgICAgZGlzYWJsZVN1Ym1pdEJ1dHRvbixcbiAgICAgIGZvcm1EYXRhXG4gICAgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPE1vZGFsIFxuICAgICAgICAgIHZpc2libGU9e3Zpc2libGV9IFxuICAgICAgICAgIG9uT3V0c2lkZT17aGFuZGxlT3V0c2lkZX1cbiAgICAgICAgICBkaXNhYmxlT25DbGlja091dHNpZGU9e3RoaXMuc3RhdGUuY29uZmlybX0+XG4gICAgICAgICAgPFdyYXBwZXIgaWQ9J25wcm9ncmVzcy1iYXNlLWZvcm0nIHdpZHRoPXt0aGlzLnByb3BzLndpZHRofT5cbiAgICAgICAgICAgIDxIZWFkZXI+XG4gICAgICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICAgIDwvSGVhZGVyPlxuICAgICAgICAgICAgPEJvZHkgaGVpZ2h0PXt0aGlzLnByb3BzLmhlaWdodH0+XG4gICAgICAgICAgICAgIHtpc0xvYWRpbmcgJiYgPFNwaW5uZXIvPn1cbiAgICAgICAgICAgICAgeyFpc0xvYWRpbmcgJiYgXG4gICAgICAgICAgICAgICAgPEpzb25TY2hlbWFGb3JtXG4gICAgICAgICAgICAgICAgICBzY2hlbWE9e3NjaGVtYX1cbiAgICAgICAgICAgICAgICAgIHVpU2NoZW1hPXtcbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgXCJ1aTpkaXNhYmxlZFwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIC4uLnVpU2NoZW1hXG4gICAgICAgICAgICAgICAgICAgIH0gOiB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4udWlTY2hlbWFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZm9ybURhdGE9e2Zvcm1EYXRhfVxuICAgICAgICAgICAgICAgICAgZGlzYWJsZVN1Ym1pdEJ1dHRvbj17ZGlzYWJsZVN1Ym1pdEJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgIGZpZWxkcz17ZmllbGRzfVxuICAgICAgICAgICAgICAgICAgRmllbGRUZW1wbGF0ZT17Q3VzdG9tRmllbGRUZW1wbGF0ZX1cbiAgICAgICAgICAgICAgICAgIGxpdmVWYWxpZGF0ZVxuICAgICAgICAgICAgICAgICAgdmFsaWRhdGU9e3ZhbGlkYXRlfVxuICAgICAgICAgICAgICAgICAgc2hvd0Vycm9yTGlzdD17ZmFsc2V9XG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1FcnJvcnM9e3RyYW5zZm9ybUVycm9yc31cbiAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17aGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgICAgb25TdWJtaXQ9e2hhbmRsZVN1Ym1pdH1cbiAgICAgICAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgcmVmPXsoZWwgPT4gdGhpcy5zdWJtaXRCdXR0b24gPSBlbCl9Lz5cbiAgICAgICAgICAgICAgICAgICAgPHN0eWxlIGpzeD57YFxuICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBub25lO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYH08L3N0eWxlPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9Kc29uU2NoZW1hRm9ybT5cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9Cb2R5PlxuICAgICAgICAgICAgPEZvb3Rlcj5cbiAgICAgICAgICAgICAgPEJ1dHRvbiBjbGVhciBkaXNhYmxlZD17ZGlzYWJsZWR9IG9uQ2xpY2s9e2hhbmRsZUNsb3NlfT5cbiAgICAgICAgICAgICAgICBDQU5DRUxcbiAgICAgICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgICAgIDxCdXR0b24gY2xlYXIgZGlzYWJsZWQ9e2Rpc2FibGVkIHx8IGRpc2FibGVTdWJtaXRCdXR0b259IG9uQ2xpY2s9e2hhbmRsZVN1Ym1pdEJ1dHRvbn0+XG4gICAgICAgICAgICAgICAgU0FWRVxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvRm9vdGVyPlxuICAgICAgICAgIDwvV3JhcHBlcj4gIFxuICAgICAgICA8L01vZGFsPlxuICAgICAgICA8Q29uZmlybSBcbiAgICAgICAgICB2aXNpYmxlPXt0aGlzLnN0YXRlLmNvbmZpcm19IFxuICAgICAgICAgIG1lc3NhZ2U9XCJZb3UgaGF2ZSB1bnNhdmVkIGNoYW5nZXMuIEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjbG9zZT9cIlxuICAgICAgICAgIGJ1dHRvbnM9e1tcbiAgICAgICAgICAgIHsgdGV4dDogXCJDTE9TRVwiLCBhY3Rpb246IGhhbmRsZUNsb3NlLCBpbmZvOnRydWUgfSxcbiAgICAgICAgICAgIHsgdGV4dDogXCJOT1wiLCBhY3Rpb246ICgpID0+IHRoaXMuc2V0U3RhdGUoeyBjb25maXJtOiBmYWxzZSB9KX1cbiAgICAgICAgICBdfS8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRm9ybTtcbiJdfQ== */\n/*@ sourceURL=src/components/Shared/Form.js */'
      })))), _react2.default.createElement(Footer, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 288
        }
      }, _react2.default.createElement(_Button2.default, { clear: true, disabled: disabled, onClick: handleClose, __source: {
          fileName: _jsxFileName,
          lineNumber: 289
        }
      }, 'CANCEL'), _react2.default.createElement(_Button2.default, { clear: true, disabled: disabled || disableSubmitButton, onClick: handleSubmitButton, __source: {
          fileName: _jsxFileName,
          lineNumber: 292
        }
      }, 'SAVE')))), _react2.default.createElement(_Confirm2.default, {
        visible: this.state.confirm,
        message: 'You have unsaved changes. Are you sure you want to close?',
        buttons: [{ text: "CLOSE", action: handleClose, info: true }, { text: "NO", action: function action() {
            return _this2.setState({ confirm: false });
          } }], __source: {
          fileName: _jsxFileName,
          lineNumber: 298
        }
      }));
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  visible: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  schema: _propTypes2.default.object,
  uiSchema: _propTypes2.default.object,
  formData: _propTypes2.default.object,
  isLoading: _propTypes2.default.bool,
  valdate: _propTypes2.default.func,
  onHide: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  onError: _propTypes2.default.func
};
Form.defaultProps = {
  visible: false,
  title: ""
};

exports.default = Form;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL1NoYXJlZC9Gb3JtLmpzIl0sIm5hbWVzIjpbIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsInN0eWxlZCIsIm9jIiwibWVkaWEiLCJKc29uU2NoZW1hRm9ybSIsIk1vZGFsIiwiQnV0dG9uIiwiU3Bpbm5lciIsIkNvbmZpcm0iLCJXcmFwcGVyIiwiZGl2IiwicCIsIndpZHRoIiwibW9iaWxlIiwiSGVhZGVyIiwiZ3JheSIsIkJvZHkiLCJoZWlnaHQiLCJGb290ZXIiLCJSRVFVSVJFRF9GSUVMRF9TWU1CT0wiLCJDdXN0b21UaXRsZUZpZWxkIiwiaWQiLCJwcm9wcyIsInRpdGxlIiwicmVxdWlyZWQiLCJsZWdlbmQiLCJmaWVsZHMiLCJUaXRsZUZpZWxkIiwiTGFiZWwiLCJsYWJlbCIsIkN1c3RvbUZpZWxkVGVtcGxhdGUiLCJjbGFzc05hbWVzIiwiY2hpbGRyZW4iLCJlcnJvcnMiLCJoZWxwIiwiZGVzY3JpcHRpb24iLCJoaWRkZW4iLCJkaXNwbGF5TGFiZWwiLCJ0cmFuc2Zvcm1FcnJvcnMiLCJtYXAiLCJlcnJvciIsInNjaGVtYSIsIm1lc3NhZ2VzIiwibmFtZSIsIm1lc3NhZ2UiLCJGb3JtIiwic3RhdGUiLCJoYW5kbGVDaGFuZ2UiLCJvbkNoYW5nZSIsImZvcm1EYXRhQ2hhbmdlZCIsImRhdGEiLCJmb3JtRGF0YSIsInNldFN0YXRlIiwiZWRpdGluZyIsImRpc2FibGVTdWJtaXRCdXR0b24iLCJsZW5ndGgiLCJoYW5kbGVTdWJtaXQiLCJvblN1Ym1pdCIsImhhbmRsZVN1Ym1pdEJ1dHRvbiIsImRpc2FibGVkIiwic3VibWl0QnV0dG9uIiwiY2xpY2siLCJoYW5kbGVPdXRzaWRlIiwib25IaWRlIiwiY29uZmlybSIsImhhbmRsZUNsb3NlIiwibmV4dFByb3BzIiwidmlzaWJsZSIsInVpU2NoZW1hIiwiaXNMb2FkaW5nIiwidmFsaWRhdGUiLCJvbkVycm9yIiwiZWwiLCJ0ZXh0IiwiYWN0aW9uIiwiaW5mbyIsInByb3BUeXBlcyIs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