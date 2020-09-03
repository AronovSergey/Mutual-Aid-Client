import React from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

const TagsAutoComplete = ({ categories, fixedOptions, value, handleChange,}) => {
    return (
      <Autocomplete
        multiple
        value={value}
        onChange={handleChange}
        options={categories}
        getOptionLabel={(option) => option.title}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.title}
              {...getTagProps({ index })}
              disabled={fixedOptions.indexOf(option) !== -1}
            />
          ))
        }
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            variant="outlined"
            placeholder="Categories"
          />
        )}
      />
    );
  };
  
  export default TagsAutoComplete;