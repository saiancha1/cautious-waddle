import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Editor } from '@tinymce/tinymce-react';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const AddcompanyForm1 = (props) => {
  const classes = styles;
  return (
    <div className="row">
    <div className="row">
      <div className="col-md-5" />
      <div className="col-md-4">
        <TextField
          id="company-name"
          label="Company Name"
          className={classes.textField}
          value={props.company.companyName}
          onChange={e => props.handleChange(e, 'companyName')}
          margin="normal"
          required
        />
        <TextField
          id="company-size"
          label="Company Size"
          className={classes.textField}
          value={props.company.companySize}
          onChange={e => props.handleChange(e, 'companySize')}
          margin="normal"
          type="number"
        />
        <TextField
          id="business-type"
          label="Business Type"
          className={classes.textField}
          value={props.company.businessType}
          onChange={e => props.handleChange(e, 'businessType')}
          margin="normal"
        />
        <TextField
          id="specialist-area"
          label="Specialist Area"
          className={classes.textField}
          value={props.company.specialistArea}
          onChange={e => props.handleChange(e, 'specialistArea')}
          margin="normal"
        />
      </div>
      </div>
      <div className="row">
      <div className="col-md-2"></div>
      <div className="col-md-8">
        <Editor
          initialValue="<p>This is the initial content of the editor</p>"
          apiKey="5d7hzleu874zjwed4vnwvsh5d4hsnnrmkkb80nvrl7w0z6v1"
          
          init={{
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
          }}
          value={props.company.companyDesc}
          onEditorChange={e => props.handleEditorChange(e)}
        />
      </div>
      </div>

    </div>
  );
};

export default AddcompanyForm1;
