'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _withWidth = require('../../helpers/with-width');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/demo/open5gs/webui/src/components/Profile/Edit.js';


var schema = {
  "title": "Profile Configuration",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "title": "Title*",
      "required": true,
      "maxLength": 24
    },
    "msisdn": {
      "type": "array",
      "title": "",
      "maxItems": 2,
      "messages": {
        "maxItems": "2 MSISDN are supported"
      },
      "items": {
        "type": "string",
        "title": "MSISDN",
        "maxLength": 15,
        "required": true,
        "pattern": "^\\d+$",
        "messages": {
          "pattern": "Only digits are allowed"
        }
      }
    },
    "security": {
      "title": "",
      "type": "object",
      "properties": {
        "k": {
          "type": "string",
          "title": "Profile Key (K)*",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        },
        "amf": {
          "type": "string",
          "title": "Authentication Management Field (AMF)*",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        },
        "op_type": {
          "type": "number",
          "title": "USIM Type",
          "enum": [0, 1],
          "enumNames": ["OPc", "OP"],
          "default": 0
        },
        "op_value": {
          "type": "string",
          "title": "Operator Key (OPc/OP)*",
          "required": true,
          "pattern": "^[0-9a-fA-F\\s]+$",
          "messages": {
            "pattern": "Only hexadecimal digits are allowed"
          }
        }
      }
    },
    "ambr": {
      "type": "object",
      "title": "",
      "properties": {
        "downlink": {
          "type": "object",
          "title": "",
          "properties": {
            "value": {
              "type": "number",
              "title": "UE-AMBR Downlink*",
              "required": true
            },
            "unit": {
              "type": "number",
              "title": "Unit",
              "enum": [0, 1, 2, 3, 4],
              "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
              "default": 3
            }
          }
        },
        "uplink": {
          "type": "object",
          "title": "",
          "properties": {
            "value": {
              "type": "number",
              "title": "UE-AMBR Uplink*",
              "required": true
            },
            "unit": {
              "type": "number",
              "title": "Unit",
              "enum": [0, 1, 2, 3, 4],
              "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
              "default": 3
            }
          }
        }
      }
    },
    "slice": {
      "type": "array",
      "title": "Slice Configurations",
      "minItems": 1,
      "maxItems": 8,
      "messages": {
        "minItems": "At least 1 Slice is required",
        "maxItems": "8 Slices are supported"
      },
      "items": {
        "type": "object",
        "properties": {
          "sst": {
            "type": "number",
            "title": "SST*",
            "enum": [1, 2, 3, 4],
            "required": true
          },
          "sd": {
            "type": "string",
            "title": "SD",
            "pattern": "^[0-9a-fA-F]+$",
            "minLength": 6,
            "maxLength": 6,
            "messages": {
              "pattern": "Only hexadecimal digits are allowed"
            }
          },
          "default_indicator": {
            "type": "boolean",
            "title": "Default S-NSSAI"
          },
          "session": {
            "type": "array",
            "title": "Session Configurations",
            "minItems": 1,
            "maxItems": 4,
            "messages": {
              "minItems": "At least 1 Session is required",
              "maxItems": "4 Sessions are supported"
            },
            "items": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string",
                  "title": "DNN/APN*",
                  "required": true
                },
                "type": {
                  "type": "number",
                  "title": "Type*",
                  "enum": [1, 2, 3],
                  "enumNames": ["IPv4", "IPv6", "IPv4v6"],
                  "default": 3
                },
                "qos": {
                  "type": "object",
                  "title": "",
                  "properties": {
                    "index": {
                      "type": "number",
                      "title": "5QI/QCI*",
                      "enum": [1, 2, 3, 4, 65, 66, 67, 75, 71, 72, 73, 74, 76, 5, 6, 7, 8, 9, 69, 70, 79, 80, 82, 83, 84, 85, 86],
                      "default": 5
                    },
                    "arp": {
                      "type": "object",
                      "title": "",
                      "properties": {
                        "priority_level": {
                          "type": "number",
                          "title": "ARP Priority Level (1-15)*",
                          "enum": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                          "default": 1
                        },
                        "pre_emption_capability": {
                          "type": "number",
                          "title": "Capability*",
                          "enum": [1, 2],
                          "enumNames": ["Disabled", "Enabled"],
                          "default": 1
                        },
                        "pre_emption_vulnerability": {
                          "type": "number",
                          "title": "Vulnerability*",
                          "enum": [1, 2],
                          "enumNames": ["Disabled", "Enabled"],
                          "default": 1
                        }
                      }
                    }
                  }
                },
                "ambr": {
                  "type": "object",
                  "title": "",
                  "properties": {
                    "downlink": {
                      "type": "object",
                      "title": "",
                      "properties": {
                        "value": {
                          "type": "number",
                          "title": "Session-AMBR Downlink*",
                          "default": 1,
                          "required": true
                        },
                        "unit": {
                          "type": "number",
                          "title": "Unit",
                          "enum": [0, 1, 2, 3, 4],
                          "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
                          "default": 3
                        }
                      }
                    },
                    "uplink": {
                      "type": "object",
                      "title": "",
                      "properties": {
                        "value": {
                          "type": "number",
                          "title": "Session-AMBR Uplink*",
                          "default": 1,
                          "required": true
                        },
                        "unit": {
                          "type": "number",
                          "title": "Unit",
                          "enum": [0, 1, 2, 3, 4],
                          "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
                          "default": 3
                        }
                      }
                    }
                  }
                },
                "ue": {
                  "type": "object",
                  "title": "",
                  "properties": {
                    "addr": {
                      "type": "string",
                      "title": "UE IPv4 Address",
                      "format": "ipv4"
                    },
                    "addr6": {
                      "type": "string",
                      "title": "UE IPv6 Address",
                      "format": "ipv6"
                    }
                  }
                },
                "smf": {
                  "type": "object",
                  "title": "",
                  "properties": {
                    "addr": {
                      "type": "string",
                      "title": "SMF IPv4 Address",
                      "format": "ipv4"
                    },
                    "addr6": {
                      "type": "string",
                      "title": "SMF IPv6 Address",
                      "format": "ipv6"
                    }
                  }
                },
                "pcc_rule": {
                  "type": "array",
                  "title": "PCC Rules",
                  "maxItems": 8,
                  "messages": {
                    "maxItems": "8 PCC Rules are supported"
                  },
                  "items": {
                    "type": "object",
                    "properties": {
                      "flow": {
                        "type": "array",
                        "title": "",
                        "maxItems": 8,
                        "messages": {
                          "maxItems": "8 Flows are supported"
                        },
                        "items": {
                          "type": "object",
                          "properties": {
                            "direction": {
                              "type": "number",
                              "title": "Flow Direction*",
                              "enum": [1, 2],
                              "enumNames": ["Downlink", "Uplink"],
                              "default": 1
                            },
                            "description": {
                              "type": "string",
                              "title": "Description*",
                              "default": "permit out udp from any 1-65535 to 45.45.45.45",
                              "required": true,
                              "pattern": "^permit\\s+out",
                              "messages": {
                                "pattern": "Begin with reserved keyword 'permit out'."
                              }
                            }
                          }
                        }
                      },
                      "qos": {
                        "type": "object",
                        "title": "",
                        "properties": {
                          "index": {
                            "type": "number",
                            "title": "5QI/QCI*",
                            "enum": [1, 2, 3, 4, 65, 66, 67, 75, 71, 72, 73, 74, 76, 5, 6, 7, 8, 9, 69, 70, 79, 80, 82, 83, 84, 85, 86],
                            "default": 1
                          },
                          "arp": {
                            "type": "object",
                            "title": "",
                            "properties": {
                              "priority_level": {
                                "type": "number",
                                "title": "ARP Priority Level (1-15)*",
                                "enum": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                                "default": 2
                              },
                              "pre_emption_capability": {
                                "type": "number",
                                "title": "Capability*",
                                "enum": [1, 2],
                                "enumNames": ["Disabled", "Enabled"],
                                "default": 2
                              },
                              "pre_emption_vulnerability": {
                                "type": "number",
                                "title": "Vulnerability*",
                                "enum": [1, 2],
                                "enumNames": ["Disabled", "Enabled"],
                                "default": 2
                              }
                            }
                          },
                          "mbr": {
                            "type": "object",
                            "title": "",
                            "properties": {
                              "downlink": {
                                "type": "object",
                                "title": "",
                                "properties": {
                                  "value": {
                                    "type": "number",
                                    "title": "MBR Downlink"
                                  },
                                  "unit": {
                                    "type": "number",
                                    "title": "Unit",
                                    "enum": [0, 1, 2, 3, 4],
                                    "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
                                    "default": 1
                                  }
                                }
                              },
                              "uplink": {
                                "type": "object",
                                "title": "",
                                "properties": {
                                  "value": {
                                    "type": "number",
                                    "title": "MBR Uplink"
                                  },
                                  "unit": {
                                    "type": "number",
                                    "title": "Unit",
                                    "enum": [0, 1, 2, 3, 4],
                                    "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
                                    "default": 1
                                  }
                                }
                              }
                            }
                          },
                          "gbr": {
                            "type": "object",
                            "title": "",
                            "properties": {
                              "downlink": {
                                "type": "object",
                                "title": "",
                                "properties": {
                                  "value": {
                                    "type": "number",
                                    "title": "GBR Downlink"
                                  },
                                  "unit": {
                                    "type": "number",
                                    "title": "Unit",
                                    "enum": [0, 1, 2, 3, 4],
                                    "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
                                    "default": 1
                                  }
                                }
                              },
                              "uplink": {
                                "type": "object",
                                "title": "",
                                "properties": {
                                  "value": {
                                    "type": "number",
                                    "title": "GBR Uplink"
                                  },
                                  "unit": {
                                    "type": "number",
                                    "title": "Unit",
                                    "enum": [0, 1, 2, 3, 4],
                                    "enumNames": ["bps", "Kbps", "Mbps", "Gbps", "Tbps"],
                                    "default": 1
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

var uiSchema = {
  "title": {
    classNames: "col-xs-12"
  },
  "msisdn": {
    classNames: "col-xs-7"
  },
  "security": {
    classNames: "col-xs-12",
    "k": {
      classNames: "col-xs-7"
    },
    "amf": {
      classNames: "col-xs-5"
    },
    "op_type": {
      classNames: "col-xs-4"
    },
    "op_value": {
      classNames: "col-xs-8"
    }
  },
  "ambr": {
    classNames: "col-xs-12",
    "downlink": {
      classNames: "col-xs-6",
      "value": {
        classNames: "col-xs-8"
      },
      "unit": {
        classNames: "col-xs-4"
      }
    },
    "uplink": {
      classNames: "col-xs-6",
      "value": {
        classNames: "col-xs-8"
      },
      "unit": {
        classNames: "col-xs-4"
      }
    }
  },
  "slice": {
    classNames: "col-xs-12",
    "items": {
      "sst": {
        classNames: "col-xs-3",
        "ui:widget": "radio",
        "ui:options": { "inline": true }
      },
      "sd": {
        classNames: "col-xs-6"
      },
      "default_indicator": {
        classNames: "col-xs-3"
      },
      "session": {
        classNames: "col-xs-12",
        "items": {
          "name": {
            classNames: "col-xs-8"
          },
          "type": {
            classNames: "col-xs-4"
          },
          "qos": {
            classNames: "col-xs-12",
            "index": {},
            "arp": {
              "priority_level": {},
              "pre_emption_capability": {
                classNames: "col-xs-6"
              },
              "pre_emption_vulnerability": {
                classNames: "col-xs-6"
              }
            }
          },
          "ambr": {
            classNames: "col-xs-12",
            "downlink": {
              "value": {
                classNames: "col-xs-8"
              },
              "unit": {
                classNames: "col-xs-4"
              }
            },
            "uplink": {
              "value": {
                classNames: "col-xs-8"
              },
              "unit": {
                classNames: "col-xs-4"
              }
            }
          },
          "ue": {
            classNames: "col-xs-12",
            "addr": {
              classNames: "col-xs-6"
            },
            "addr6": {
              classNames: "col-xs-6"
            }
          },
          "smf": {
            classNames: "col-xs-12",
            "addr": {
              classNames: "col-xs-6"
            },
            "addr6": {
              classNames: "col-xs-6"
            }
          },
          "pcc_rule": {
            classNames: "col-xs-12",
            "items": {
              "flow": {
                "items": {
                  "direction": {},
                  "description": {
                    "ui:help": "Hint: 5.4.2 Flow-Description in TS29.212"
                  }
                }
              },
              "qos": {
                "index": {},
                "arp": {
                  "priority_level": {
                    classNames: "col-xs-12"
                  },
                  "pre_emption_capability": {
                    classNames: "col-xs-6"
                  },
                  "pre_emption_vulnerability": {
                    classNames: "col-xs-6"
                  }
                },
                "mbr": {
                  "downlink": {
                    "value": {
                      classNames: "col-xs-8"
                    },
                    "unit": {
                      classNames: "col-xs-4"
                    }
                  },
                  "uplink": {
                    "value": {
                      classNames: "col-xs-8"
                    },
                    "unit": {
                      classNames: "col-xs-4"
                    }
                  }
                },
                "gbr": {
                  "downlink": {
                    "value": {
                      classNames: "col-xs-8"
                    },
                    "unit": {
                      classNames: "col-xs-4"
                    }
                  },
                  "uplink": {
                    "value": {
                      classNames: "col-xs-8"
                    },
                    "unit": {
                      classNames: "col-xs-4"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

var Edit = function (_Component) {
  (0, _inherits3.default)(Edit, _Component);

  function Edit(props) {
    (0, _classCallCheck3.default)(this, Edit);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Edit.__proto__ || (0, _getPrototypeOf2.default)(Edit)).call(this, props));

    _this.state = _this.getStateFromProps(props);
    return _this;
  }

  (0, _createClass3.default)(Edit, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(this.getStateFromProps(nextProps));
    }
  }, {
    key: 'getStateFromProps',
    value: function getStateFromProps(props) {
      var action = props.action,
          width = props.width;

      var state = {
        schema: schema,
        uiSchema: uiSchema
      };

      if (action === 'update') {
        state = (0, _extends3.default)({}, state, {
          uiSchema: (0, _extends3.default)({}, uiSchema, {
            "title": {
              "ui:disabled": true
            }
          })
        });
      } else if (width !== _withWidth.SMALL) {
        state = (0, _extends3.default)({}, state, {
          uiSchema: (0, _extends3.default)({}, uiSchema, {
            "title": {
              "ui:autofocus": true
            }
          })
        });
      }

      return state;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          visible = _props.visible,
          action = _props.action,
          formData = _props.formData,
          isLoading = _props.isLoading,
          validate = _props.validate,
          onHide = _props.onHide,
          onSubmit = _props.onSubmit,
          onError = _props.onError;

      return _react2.default.createElement(_.Form, {
        visible: visible,
        title: action === 'update' ? 'Edit Profile' : 'Create Profile',
        schema: this.state.schema,
        uiSchema: this.state.uiSchema,
        formData: formData,
        isLoading: isLoading,
        validate: validate,
        onHide: onHide,
        onSubmit: onSubmit,
        onError: onError, __source: {
          fileName: _jsxFileName,
          lineNumber: 717
        }
      });
    }
  }]);

  return Edit;
}(_react.Component);

Edit.propTypes = {
  visible: _propTypes2.default.bool,
  action: _propTypes2.default.string,
  formData: _propTypes2.default.object,
  isLoading: _propTypes2.default.bool,
  validate: _propTypes2.default.func,
  onHide: _propTypes2.default.func,
  onSubmit: _propTypes2.default.func,
  onError: _propTypes2.default.func
};

exports.default = (0, _withWidth2.default)()(Edit);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL1Byb2ZpbGUvRWRpdC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJ3aXRoV2lkdGgiLCJTTUFMTCIsIkZvcm0iLCJzY2hlbWEiLCJ1aVNjaGVtYSIsImNsYXNzTmFtZXMiLCJFZGl0IiwicHJvcHMiLCJzdGF0ZSIsImdldFN0YXRlRnJvbVByb3BzIiwibmV4dFByb3BzIiwic2V0U3RhdGUiLCJhY3Rpb24iLCJ3aWR0aCIsInZpc2libGUiLCJmb3JtRGF0YSIsImlzTG9hZGluZyIsInZhbGlkYXRlIiwib25IaWRlIiwib25TdWJtaXQiLCJvbkVycm9yIiwicHJvcFR5cGVzIiwiYm9vbCIsInN0cmluZyIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQVM7Ozs7QUFDVCxBQUFPOzs7O0FBRVAsQUFBTyxBQUFhOzs7O0FBQ3BCLEFBQVM7Ozs7Ozs7QUFFVCxJQUFNO1dBQVMsQUFDSixBQUNUO1VBRmEsQUFFTCxBQUNSOzs7Y0FDVyxBQUNDLEFBQ1I7ZUFGTyxBQUVFLEFBQ1Q7a0JBSE8sQUFHSyxBQUNaO21CQUxVLEFBQ0gsQUFJTSxBQUVmO0FBTlMsQUFDUDs7Y0FLUSxBQUNBLEFBQ1I7ZUFGUSxBQUVDLEFBQ1Q7a0JBSFEsQUFHSSxBQUNaOztvQkFKUSxBQUlJLEFBQ0UsQUFFZDtBQUhZLEFBQ1Y7O2dCQUVPLEFBQ0MsQUFDUjtpQkFGTyxBQUVFLEFBQ1Q7cUJBSE8sQUFHTSxBQUNiO29CQUpPLEFBSUssQUFDWjttQkFMTyxBQUtJLEFBQ1g7O3FCQXBCUSxBQU9GLEFBT0MsQUFNSyxBQUNDLEFBSWpCO0FBTGdCLEFBQ1Y7QUFQSyxBQUNQO0FBUk0sQUFDUjs7ZUFpQlUsQUFDRCxBQUNUO2NBRlUsQUFFRixBQUNSOzs7a0JBQ08sQUFDSyxBQUNSO21CQUZHLEFBRU0sQUFDVDtzQkFIRyxBQUdTLEFBQ1o7cUJBSkcsQUFJUSxBQUNYOzt1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