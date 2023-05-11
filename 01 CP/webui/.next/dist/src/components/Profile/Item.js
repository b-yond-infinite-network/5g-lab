'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _openColor = require('open-color');

var _openColor2 = _interopRequireDefault(_openColor);

var _styleUtils = require('../../helpers/style-utils');

var _edit = require('react-icons/lib/md/edit');

var _edit2 = _interopRequireDefault(_edit);

var _delete = require('react-icons/lib/md/delete');

var _delete2 = _interopRequireDefault(_delete);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/demo/open5gs/webui/src/components/Profile/Item.js';


var Card = _styledComponents2.default.div.withConfig({
  componentId: 'al9vs4-0'
})(['position:relative;display:flex;padding:0.5rem;cursor:pointer;', ' .actions{position:absolute;top:0;right:0;width:8rem;height:100%;display:flex;align-items:center;justify-content:center;opacity:0;}&:hover{background:', ';.actions{', ';}}'], function (p) {
  return p.disabled && 'opacity: 0.5; cursor: not-allowed; pointer-events: none;';
}, _openColor2.default.gray[1], function (p) {
  return p.disabled ? 'opacity: 0;' : 'opacity: 1;';
});

var CircleButton = _styledComponents2.default.div.withConfig({
  componentId: 'al9vs4-1'
})(['height:2rem;width:2rem;display:flex;align-items:center;justify-content:center;margin:1px 4px;color:', ';border-radius:1rem;font-size:1.5rem;&:hover{color:', ';}&.delete{&:hover{color:', ';}}'], _openColor2.default.gray[6], _openColor2.default.indigo[6], _openColor2.default.pink[6]);

var Profile = _styledComponents2.default.div.withConfig({
  componentId: 'al9vs4-2'
})(['display:flex;flex-direction:row;flex:1;line-height:2.5rem;margin:0 2rem;.title{font-size:1.25rem;color:', ';width:320px;}.ambr{font-size:1.1rem;color:', ';width:240px;}.name{font-size:1.1rem;color:', ';width:120px;}'], _openColor2.default.gray[8], _openColor2.default.gray[6], _openColor2.default.gray[6]);

var SpinnerWrapper = _styledComponents2.default.div.withConfig({
  componentId: 'al9vs4-3'
})(['position:absolute;top:0;right:0;width:4rem;height:100%;display:flex;align-items:center;justify-content:center;']);

var propTypes = {
  profile: _propTypes2.default.shape({
    title: _propTypes2.default.string
  }),
  onView: _propTypes2.default.func,
  onEdit: _propTypes2.default.func,
  onDelete: _propTypes2.default.func
};

var Item = function (_Component) {
  (0, _inherits3.default)(Item, _Component);

  function Item() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Item);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Item.__proto__ || (0, _getPrototypeOf2.default)(Item)).call.apply(_ref, [this].concat(args))), _this), _this.handleEdit = function (e) {
      e.stopPropagation();

      var _this$props = _this.props,
          profile = _this$props.profile,
          onEdit = _this$props.onEdit;
      var _id = profile._id;

      onEdit(_id);
    }, _this.handleDelete = function (e) {
      e.stopPropagation();

      var _this$props2 = _this.props,
          profile = _this$props2.profile,
          onDelete = _this$props2.onDelete;
      var _id = profile._id;

      onDelete(_id);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Item, [{
    key: 'render',
    value: function render() {
      var handleEdit = this.handleEdit,
          handleDelete = this.handleDelete;
      var _props = this.props,
          disabled = _props.disabled,
          profile = _props.profile,
          onView = _props.onView,
          onEdit = _props.onEdit,
          onDelete = _props.onDelete;
      var _id = profile._id,
          title = profile.title,
          slice = profile.slice,
          ambr = profile.ambr;

      return _react2.default.createElement(Card, { disabled: disabled, onClick: function onClick() {
          return onView(_id);
        }, __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        }
      }, _react2.default.createElement(Profile, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 175
        }
      }, _react2.default.createElement('div', { className: 'title', __source: {
          fileName: _jsxFileName,
          lineNumber: 176
        }
      }, title), _react2.default.createElement('div', { className: 'ambr', __source: {
          fileName: _jsxFileName,
          lineNumber: 177
        }
      }, ambr['downlink'] === undefined ? "unlimited" : ambr.downlink['value'] === undefined ? "unlimited" : ambr.downlink.value, ' ', ambr['downlink'] === undefined ? "unlimited" : ambr.downlink['unit'] === undefined ? "bps" : ambr.downlink.unit === 0 ? "bps" : ambr.downlink.unit === 1 ? "Kbps" : ambr.downlink.unit === 2 ? "Mbps" : ambr.downlink.unit === 3 ? "Gbps" : ambr.downlink.unit === 4 ? "Tbps" : "Unknown Unit", ' / ', ambr['uplink'] === undefined ? "unlimited" : ambr.uplink['value'] === undefined ? "unlimited" : ambr.uplink.value, ' ', ambr['uplink'] === undefined ? "unlimited" : ambr.uplink['unit'] === undefined ? "bps" : ambr.uplink.unit === 0 ? "bps" : ambr.uplink.unit === 1 ? "Kbps" : ambr.uplink.unit === 2 ? "Mbps" : ambr.uplink.unit === 3 ? "Gbps" : ambr.uplink.unit === 4 ? "Tbps" : "Unknown Unit")), _react2.default.createElement('div', { className: 'actions', __source: {
          fileName: _jsxFileName,
          lineNumber: 202
        }
      }, _react2.default.createElement(_.Tooltip, { content: 'Edit', width: '60px', __source: {
          fileName: _jsxFileName,
          lineNumber: 203
        }
      }, _react2.default.createElement(CircleButton, { onClick: handleEdit, __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        }
      }, _react2.default.createElement(_edit2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 204
        }
      }))), _react2.default.createElement(_.Tooltip, { content: 'Delete', width: '60px', __source: {
          fileName: _jsxFileName,
          lineNumber: 206
        }
      }, _react2.default.createElement(CircleButton, { className: 'delete', onClick: handleDelete, __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        }
      }, _react2.default.createElement(_delete2.default, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 207
        }
      })))), disabled && _react2.default.createElement(SpinnerWrapper, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 210
        }
      }, _react2.default.createElement(_.Spinner, { sm: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 210
        }
      })));
    }
  }]);

  return Item;
}(_react.Component);

Item.propTypes = {
  profile: _propTypes2.default.shape({
    title: _propTypes2.default.string
  }),
  onView: _propTypes2.default.func,
  onEdit: _propTypes2.default.func,
  onDelete: _propTypes2.default.func
};

exports.default = Item;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL1Byb2ZpbGUvSXRlbS5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJzdHlsZWQiLCJvYyIsIm1lZGlhIiwiRWRpdEljb24iLCJEZWxldGVJY29uIiwiVG9vbHRpcCIsIlNwaW5uZXIiLCJDYXJkIiwiZGl2IiwicCIsImRpc2FibGVkIiwiZ3JheSIsIkNpcmNsZUJ1dHRvbiIsImluZGlnbyIsInBpbmsiLCJQcm9maWxlIiwiU3Bpbm5lcldyYXBwZXIiLCJwcm9wVHlwZXMiLCJwcm9maWxlIiwic2hhcGUiLCJ0aXRsZSIsInN0cmluZyIsIm9uVmlldyIsImZ1bmMiLCJvbkVkaXQiLCJvbkRlbGV0ZSIsIkl0ZW0iLCJoYW5kbGVFZGl0IiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsInByb3BzIiwiX2lkIiwiaGFuZGxlRGVsZXRlIiwic2xpY2UiLCJhbWJyIiwidW5kZWZpbmVkIiwiZG93bmxpbmsiLCJ2YWx1ZSIsInVuaXQiLCJ1cGxpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUzs7OztBQUNULEFBQU87Ozs7QUFFUCxBQUFPOzs7O0FBQ1AsQUFBTzs7OztBQUNQLEFBQVM7O0FBRVQsQUFBTzs7OztBQUNQLEFBQU87Ozs7QUFFUCxBQUFTLEFBQVM7Ozs7Ozs7QUFFbEIsSUFBTSxrQ0FBQSxBQUFjO2VBQWQ7QUFBQSxDQUFPLG9QQU9ULGFBQUE7U0FBSyxFQUFBLEFBQUUsWUFBUCxBQUFtQjtBQVBqQixHQXVCWSxvQkFBQSxBQUFHLEtBdkJmLEFBdUJZLEFBQVEsSUFHbEIsYUFBQTtTQUFLLEVBQUEsQUFBRSxXQUFGLEFBQWEsZ0JBQWxCLEFBQWtDO0FBMUIxQyxBQUFNOztBQStCTixJQUFNLDBDQUFBLEFBQXNCO2VBQXRCO0FBQUEsQ0FBZSxzTUFRVixvQkFBQSxBQUFHLEtBUlIsQUFRSyxBQUFRLElBTU4sb0JBQUEsQUFBRyxPQWRWLEFBY08sQUFBVSxJQUtSLG9C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LE9BQUwsQUFBWSxhQUFaLEFBQXlCLFlBQXpCLEFBQXFDLGNBQ25DLEtBQUEsQUFBSyxPQWRYLEFBY2tCLE9BQ2IsVUFBQSxBQUFLLGNBQUwsQUFBbUIsWUFBbkIsQUFBK0IsY0FDN0IsS0FBQSxBQUFLLE9BQUwsQUFBWSxZQUFaLEFBQXdCLFlBQXhCLEFBQW9DLFFBQ2pDLEtBQUEsQUFBSyxPQUFMLEFBQVksU0FBWixBQUFxQixJQUFyQixBQUF5QixRQUN6QixLQUFBLEFBQUssT0FBTCxBQUFZLFNBQVosQUFBcUIsSUFBckIsQUFBeUIsU0FDekIsS0FBQSxBQUFLLE9BQUwsQUFBWSxTQUFaLEFBQXFCLElBQXJCLEFBQXlCLFNBQ3pCLEtBQUEsQUFBSyxPQUFMLEFBQVksU0FBWixBQUFxQixJQUFyQixBQUF5QixTQUN6QixLQUFBLEFBQUssT0FBTCxBQUFZLFNBQVosQUFBcUIsSUFBckIsQUFBeUIsU0F4QnZDLEFBQ0UsQUFFRSxBQXNCWSxBQUdkLGtDQUFBLGNBQUEsU0FBSyxXQUFMLEFBQWU7b0JBQWY7c0JBQUEsQUFDRTtBQURGO3lCQUNFLEFBQUMsMkJBQVEsU0FBVCxBQUFpQixRQUFPLE9BQXhCLEFBQThCO29CQUE5QjtzQkFBQSxBQUNFO0FBREY7eUJBQ0csY0FBRCxnQkFBYyxTQUFkLEFBQXVCO29CQUF2QjtzQkFBQSxBQUFtQztBQUFuQzt5QkFBbUMsQUFBQzs7b0JBQUQ7c0JBRnZDLEFBQ0UsQUFDRSxBQUFtQyxBQUVyQztBQUZxQztBQUFBLDRCQUVyQyxBQUFDLDJCQUFRLFNBQVQsQUFBaUIsVUFBUyxPQUExQixBQUFnQztvQkFBaEM7c0JBQUEsQUFDRTtBQURGO3lCQUNHLGNBQUQsZ0JBQWMsV0FBZCxBQUF3QixVQUFTLFNBQWpDLEFBQTBDO29CQUExQztzQkFBQSxBQUF3RDtBQUF4RDt5QkFBd0QsQUFBQzs7b0JBQUQ7c0JBakM5RCxBQTRCRSxBQUlFLEFBQ0UsQUFBd0QsQUFHM0Q7QUFIMkQ7QUFBQSx5Q0FHOUMsY0FBRDs7b0JBQUE7c0JBQUEsQUFBZ0I7QUFBaEI7QUFBQSxPQUFBLGtCQUFnQixBQUFDLDJCQUFRLElBQVQ7b0JBQUE7c0JBckNqQyxBQUNFLEFBb0NlLEFBQWdCLEFBR2xDO0FBSGtDOzs7Ozs7QSxBQWxHbEI7O0EsQUFBYixLLEFBQ0c7K0JBQ0ksQUFBVTtXQUNWLG9CQUZRLEFBQ1IsQUFBZ0IsQUFDTixBQUVuQjtBQUh5QixBQUN2QixHQURPO1VBR0Qsb0JBSlMsQUFJQyxBQUNsQjtVQUFRLG9CQUxTLEFBS0MsQUFDbEI7WUFBVSxvQixBQU5PLEFBTUcsQUFpR3hCO0FBdkdxQixBQUNqQjs7a0JBc0dKLEFBQWUiLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9kZW1vL29wZW41Z3Mvd2VidWkifQ==