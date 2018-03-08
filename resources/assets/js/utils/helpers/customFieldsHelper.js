import React from 'react';
import Select from 'react-select';
import 'react-day-picker/lib/style.css';
import _ from 'lodash';

export const getCustomField = (customField, fields) => {
  let fieldIndex = _.findIndex(fields, (f) => f.custom_field_alias === customField);

  return fieldIndex >= 0 ? fields[fieldIndex] : {};
};

export const getCustomFieldValue = (customField, fields, defaultValue) => {
  const field = getCustomField(customField, fields);

  return field.value ? field.value : defaultValue;
};