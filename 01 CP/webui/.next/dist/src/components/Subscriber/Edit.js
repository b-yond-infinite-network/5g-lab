'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('next/node_modules/babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _assign = require('next/node_modules/babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _withWidth = require('../../helpers/with-width');

var _withWidth2 = _interopRequireDefault(_withWidth);

var _ = require('..');

var _traverse = require('traverse');

var _traverse2 = _interopRequireDefault(_traverse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/home/demo/open5gs/webui/src/components/Subscriber/Edit.js';


var schema = {
  "title": "Subscriber Configuration",
  "type": "object",
  "properties": {
    "imsi": {
      "type": "string",
      "title": "IMSI*",
      "required": true,
      "pattern": "^\\d+$",
      "maxLength": 15,
      "messages": {
        "pattern": "Only digits are allowed"
      }
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
          "title": "Subscriber Key (K)*",
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
  "imsi": {
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

    _this.handleChange = function (formData) {
      var _this$props = _this.props,
          action = _this$props.action,
          profiles = _this$props.profiles;

      if (action === 'create' && (0, _keys2.default)(profiles).length > 0) {
        if (_this.state.profile !== formData.profile) {
          var data = _this.getFormDataFromProfile(formData.profile);
          _this.setState({
            profile: formData.profile,
            formData: data
          });

          return data;
        }
      }

      return undefined;
    };

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
          profiles = props.profiles,
          width = props.width,
          formData = props.formData;

      var state = {
        schema: schema,
        uiSchema: uiSchema,
        formData: formData
      };

      if (action === 'create' && (0, _keys2.default)(profiles).length > 0) {
        if (this.state.profile === undefined) {
          state = (0, _assign2.default)(state, {
            profile: profiles[0]._id
          });
        } else {
          state = (0, _assign2.default)(state, {
            profile: this.state.profile
          });
        }

        state = (0, _extends3.default)({}, state, {
          "schema": (0, _extends3.default)({}, schema, {
            "properties": (0, _extends3.default)({
              profile: {
                type: "string",
                title: "Profile*",
                enum: profiles.map(function (profile) {
                  return profile._id;
                }),
                enumNames: profiles.map(function (profile) {
                  return profile.title;
                }),
                default: state.profile
              }
            }, schema.properties)
          })
        });

        state = (0, _assign2.default)(state, {
          formData: this.getFormDataFromProfile(state.profile)
        });

        delete state.uiSchema.profile;
      } else {
        delete state.schema.properties.profile;
      }

      if (action === 'update') {
        state.uiSchema = (0, _assign2.default)(state.uiSchema, {
          "imsi": {
            "ui:disabled": true
          }
        });
      } else if (width !== _withWidth.SMALL) {
        state.uiSchema = (0, _assign2.default)(state.uiSchema, {
          "imsi": {
            "ui:autofocus": true
          }
        });
      }

      return state;
    }
  }, {
    key: 'getFormDataFromProfile',
    value: function getFormDataFromProfile(profile) {
      var formData = void 0;

      formData = (0, _assign2.default)({}, this.props.profiles.filter(function (p) {
        return p._id === profile;
      })[0]);
      formData = (0, _assign2.default)(formData, { profile: profile });

      delete formData.title;
      delete formData._id;
      delete formData.__v;

      //traverse(formData).forEach(function(x) {
      //  if (this.key == 'downlink') this.update(Number(x));
      //  if (this.key == 'uplink') this.update(Number(x));
      //})
      if (formData.security) {
        if (formData.security.opc) {
          formData.security.op_type = 0;
          formData.security.op_value = formData.security.opc;
        } else {
          formData.security.op_type = 1;
          formData.security.op_value = formData.security.op;
        }
      }

      return formData;
    }
  }, {
    key: 'render',
    value: function render() {
      var handleChange = this.handleChange;
      var _props = this.props,
          visible = _props.visible,
          action = _props.action,
          isLoading = _props.isLoading,
          validate = _props.validate,
          onHide = _props.onHide,
          onSubmit = _props.onSubmit,
          onError = _props.onError;
      var formData = this.state.formData;

      return _react2.default.createElement(_.Form, {
        visible: visible,
        title: action === 'update' ? 'Edit Subscriber' : 'Create Subscriber',
        schema: this.state.schema,
        uiSchema: this.state.uiSchema,
        formData: formData,
        isLoading: isLoading,
        validate: validate,
        onHide: onHide,
        onChange: handleChange,
        onSubmit: onSubmit,
        onError: onError, __source: {
          fileName: _jsxFileName,
          lineNumber: 810
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9jb21wb25lbnRzL1N1YnNjcmliZXIvRWRpdC5qcyJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJ3aXRoV2lkdGgiLCJTTUFMTCIsIkZvcm0iLCJ0cmF2ZXJzZSIsInNjaGVtYSIsInVpU2NoZW1hIiwiY2xhc3NOYW1lcyIsIkVkaXQiLCJwcm9wcyIsImhhbmRsZUNoYW5nZSIsImZvcm1EYXRhIiwiYWN0aW9uIiwicHJvZmlsZXMiLCJsZW5ndGgiLCJzdGF0ZSIsInByb2ZpbGUiLCJkYXRhIiwiZ2V0Rm9ybURhdGFGcm9tUHJvZmlsZSIsInNldFN0YXRlIiwidW5kZWZpbmVkIiwiZ2V0U3RhdGVGcm9tUHJvcHMiLCJuZXh0UHJvcHMiLCJ3aWR0aCIsIl9pZCIsInR5cGUiLCJ0aXRsZSIsImVudW0iLCJtYXAiLCJlbnVtTmFtZXMiLCJkZWZhdWx0IiwicHJvcGVydGllcyIsImZpbHRlciIsInAiLCJfX3YiLCJzZWN1cml0eSIsIm9wYyIsIm9wX3R5cGUiLCJvcF92YWx1ZSIsIm9wIiwidmlzaWJsZSIsImlzTG9hZGluZyIsInZhbGlkYXRlIiwib25IaWRlIiwib25TdWJtaXQiLCJvbkVycm9yIiwicHJvcFR5cGVzIiwiYm9vbCIsInN0cmluZyIsIm9iamVjdCIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBUzs7OztBQUNULEFBQU87Ozs7QUFFUCxBQUFPLEFBQWE7Ozs7QUFDcEIsQUFBUzs7QUFFVCxBQUFPOzs7Ozs7Ozs7QUFFUCxJQUFNO1dBQVMsQUFDSixBQUNUO1VBRmEsQUFFTCxBQUNSOzs7Y0FDVSxBQUNFLEFBQ1I7ZUFGTSxBQUVHLEFBQ1Q7a0JBSE0sQUFHTSxBQUNaO2lCQUpNLEFBSUssQUFDWDttQkFMTSxBQUtPLEFBQ2I7O21CQVBVLEFBQ0osQUFNTSxBQUNDLEFBR2Y7QUFKYyxBQUNWO0FBUEksQUFDTjs7Y0FTUSxBQUNBLEFBQ1I7ZUFGUSxB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Q0E7QUFDQTtVQUFJLFNBQUosQUFBYSxVQUFVLEFBQ3JCO1lBQUksU0FBQSxBQUFTLFNBQWIsQUFBc0IsS0FBSyxBQUN6QjttQkFBQSxBQUFTLFNBQVQsQUFBa0IsVUFBbEIsQUFBNEIsQUFDNUI7bUJBQUEsQUFBUyxTQUFULEFBQWtCLFdBQVcsU0FBQSxBQUFTLFNBQXRDLEFBQStDLEFBQ2hEO0FBSEQsZUFHTyxBQUNMO21CQUFBLEFBQVMsU0FBVCxBQUFrQixVQUFsQixBQUE0QixBQUM1QjttQkFBQSxBQUFTLFNBQVQsQUFBa0IsV0FBVyxTQUFBLEFBQVMsU0FBdEMsQUFBK0MsQUFDaEQ7QUFDRjtBQUVEOzthQUFBLEFBQU8sQUFDUjs7Ozs2QkF1QlE7VUFBQSxBQUVMLGVBRkssQUFHSCxLQUhHLEFBRUw7bUJBV0UsS0FiRyxBQWFFO1VBYkYsQUFNTCxpQkFOSyxBQU1MO1VBTkssQUFPTCxnQkFQSyxBQU9MO1VBUEssQUFRTCxtQkFSSyxBQVFMO1VBUkssQUFTTCxrQkFUSyxBQVNMO1VBVEssQUFVTCxnQkFWSyxBQVVMO1VBVkssQUFXTCxrQkFYSyxBQVdMO1VBWEssQUFZTCxpQkFaSyxBQVlMO1VBWkssQUFnQkwsV0FDRSxLQWpCRyxBQWlCRSxNQWpCRixBQWdCTCxBQUdGOzs2QkFDRSxBQUFDO2lCQUFELEFBQ1csQUFDVDtlQUFRLFdBQUQsQUFBWSxXQUFaLEFBQXdCLG9CQUZqQyxBQUVxRCxBQUNuRDtnQkFBUSxLQUFBLEFBQUssTUFIZixBQUdxQixBQUNuQjtrQkFBVSxLQUFBLEFBQUssTUFKakIsQUFJdUIsQUFDckI7a0JBTEYsQUFLWSxBQUNWO21CQU5GLEFBTWEsQUFDWDtrQkFQRixBQU9ZLEFBQ1Y7Z0JBUkYsQUFRVSxBQUNSO2tCQVRGLEFBU1ksQUFDVjtrQkFWRixBQVVZLEFBQ1Y7aUJBWEYsQUFXVztvQkFYWDtzQkFERixBQUNFLEFBYUg7QUFiRztBQUNFLE9BREY7Ozs7O0EsQUE5SmE7O0EsQUFBYixLLEFBQ0c7V0FDSSxvQkFEUSxBQUNFLEFBQ25CO1VBQVEsb0JBRlMsQUFFQyxBQUNsQjtZQUFVLG9CQUhPLEFBR0csQUFDcEI7YUFBVyxvQkFKTSxBQUlJLEFBQ3JCO1lBQVUsb0JBTE8sQUFLRyxBQUNwQjtVQUFRLG9CQU5TLEFBTUMsQUFDbEI7WUFBVSxvQkFQTyxBQU9HLEFBQ3BCO1dBQVMsb0JBcUtiLEEsQUE3S3FCLEFBUUU7QUFSRixBQUNqQjs7a0JBNEtXLDJCQUFmLEFBQWUsQUFBWSIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2RlbW8vb3BlbjVncy93ZWJ1aSJ9