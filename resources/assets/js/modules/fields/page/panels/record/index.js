import React from "react";
import PropTypes from "prop-types";
import { getField, getFieldError } from "../../../store/selectors";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteField, fetchField, saveField } from "../../../service";
import Select from "react-select";
import { handleInputChange } from "../../../../../utils/helpers/fields";

class Record extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formState: props.field.originalProps
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;

    if (this.props.match.params.id === "new") {
      //dispatch(editingField())
    } else {
      dispatch(fetchField(this.props.match.params.id));
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.match.params.id !== "new") {
      this.setState({ formState: nextProps.field.originalProps });
    }
  }

  _submit = () => {
    this.props.dispatch(saveField(this.state.formState));
  };

  _handleInputChange = event => {
    this.setState({
      formState: handleInputChange(event, this.state.formState, {})
    });
  };

  _delete = () => {
    const { dispatch, field } = this.props;

    dispatch(deleteField(field.id));
    // this.context.router.history.push('/config/fields')
  };

  render() {
    const { field, error } = this.props;
    const { formState } = this.state;
    const hasError = error !== false;

    if (field.id === null && this.props.match.params.id !== "new") {
      return (
        <main className="col main-panel px-3 align-self-center">
          <h2 className="text-muted text-center">
            Select a field{" "}
            <span className="d-none d-lg-inline">on the left</span> to edit.
          </h2>
        </main>
      );
    }

    const objectOptions = [
      {
        value: "App\\Company",
        label: "Company"
      },
      {
        value: "App\\Contact",
        label: "Contact"
      },
      {
        value: "App\\Opportunity",
        label: "Opportunity"
      }
    ];

    const groupOptions = [
      {
        value: "core",
        label: "Core"
      },
      {
        value: "social",
        label: "Social"
      },
      {
        value: "personal",
        label: "Personal"
      },
      {
        value: "professional",
        label: "Professional"
      },
      {
        value: "additional",
        label: "Additional"
      }
    ];

    const typeOptions = [
      {
        value: "text",
        label: "Text"
      },
      {
        value: "textarea",
        label: "Textarea"
      },
      {
        value: "radio",
        label: "Radio"
      },
      {
        value: "checkbox",
        label: "Checkbox"
      },
      {
        value: "select",
        label: "Select"
      },
      {
        value: "number",
        label: "Number"
      },
      {
        value: "date",
        label: "Date"
      },
      {
        value: "email",
        label: "Email"
      },
      {
        value: "url",
        label: "URL"
      }
    ];

    return (
      <main className="col main-panel px-3">
        <div className="list-inline pt-3 float-right">
          <button
            className="btn btn-link mr-2 btn-sm list-inline-item"
            onClick={this._delete}
          >
            Delete
          </button>
          <button
            className="btn btn-primary list-inline-item"
            onClick={this._submit}
          >
            Save
          </button>
        </div>
        <h4 className="border-bottom py-3">{formState.label || "New Field"}</h4>

        <div className="h-scroll">
          <div className="card mb-1">
            <ul className={`list-group list-group-flush`}>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Core</div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("label")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="label">Name</label>
                  <div>
                    <input
                      type="text"
                      id="label"
                      name="label"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.label}
                    />
                    {hasError && error.hasOwnProperty("label") ? (
                      <div className="warning small">{error.label}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("alias")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="alias">Alias</label>
                  <div>
                    <input
                      type="text"
                      id="alias"
                      name="alias"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.alias}
                    />
                    {hasError && error.hasOwnProperty("alias") ? (
                      <div className="warning small">{error.alias}</div>
                    ) : null}
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="mini-text text-muted mb-2">Options</div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("model")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="model">Object</label>
                  <div>
                    <Select
                      options={objectOptions}
                      value={formState.model}
                      valueKey="value"
                      labelKey="label"
                      onChange={value => {
                        const event = {
                          target: {
                            name: "model",
                            value: value ? value.value : null
                          }
                        };

                        this._handleInputChange(event);
                      }}
                    />
                    {hasError && error.hasOwnProperty("model") ? (
                      <div className="warning small">{error.model}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("group")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="group">Group</label>
                  <div>
                    <Select
                      options={groupOptions}
                      value={formState.group}
                      valueKey="value"
                      labelKey="label"
                      onChange={value => {
                        const event = {
                          target: {
                            name: "group",
                            value: value ? value.value : null
                          }
                        };

                        this._handleInputChange(event);
                      }}
                    />
                    {hasError && error.hasOwnProperty("group") ? (
                      <div className="warning small">{error.group}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("ordering")
                      ? "hasError"
                      : null
                  }`}
                >
                  <label htmlFor="ordering">Order</label>
                  <div>
                    <input
                      type="text"
                      id="ordering"
                      name="ordering"
                      onChange={this._handleInputChange}
                      className="form-control"
                      value={formState.ordering}
                    />
                    {hasError && error.hasOwnProperty("ordering") ? (
                      <div className="warning small">{error.ordering}</div>
                    ) : null}
                  </div>
                </div>
                <div
                  className={`form-group mb-2 ${
                    hasError && error.hasOwnProperty("type") ? "hasError" : null
                  }`}
                >
                  <label htmlFor="type">Field type</label>
                  <div>
                    <Select
                      options={typeOptions}
                      value={formState.type}
                      valueKey="value"
                      labelKey="label"
                      onChange={value => {
                        const event = {
                          target: {
                            name: "type",
                            value: value ? value.value : null
                          }
                        };

                        this._handleInputChange(event);
                      }}
                    />
                    {hasError && error.hasOwnProperty("type") ? (
                      <div className="warning small">{error.type}</div>
                    ) : null}
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="hidden"
                        checked={formState.hidden}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Hidden</div>
                  </div>
                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="required"
                        checked={formState.required}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Required</div>
                  </div>

                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="searchable"
                        checked={formState.searchable}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Searchable</div>
                  </div>

                  <div className={`my-2 col`}>
                    <label className="switch float-left mr-2">
                      <input
                        type="checkbox"
                        name="summary"
                        checked={formState.summary}
                        onChange={this._handleInputChange}
                      />
                      <span className="toggle-slider round" />
                    </label>
                    <div className="pt-1">Summary</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}

Record.propTypes = {
  field: PropTypes.object.isRequired
};

Record.contextTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(
  connect((state, ownProps) => ({
    field: getField(state, ownProps.match.params.id),
    isDirty: state.fieldState.isFetching,
    error: getFieldError(state)
  }))(Record)
);
