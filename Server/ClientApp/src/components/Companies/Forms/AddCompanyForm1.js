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
        <div classname="row">
        <form className={classes.container} noValidate autoComplete="off">
        <div>
        <TextField
          id="company-name"
          label="Company Name"
          className={classes.textField}
          value={props.company.CompanyName}
          onChange={(e) => props.handleChange(e,'CompanyName')}
          margin="normal"
          required
        />
        <TextField
          id="company-size"
          label="Company Size"
          className={classes.textField}
          value={props.company.CompanySize}
          onChange={(e) => props.handleChange(e,'CompanySize')}
          margin="normal"
        />
        <TextField
          id="business-type"
          label="Business Type"
          className={classes.textField}
          value={props.company.BusinessType}
          onChange={(e) => props.handleChange(e,'BusinessType')}
          margin="normal"
        />
        <TextField
          id="specialist-area"
          label="Specialist Area"
          className={classes.textField}
          value={props.company.SpecialistArea}
          onChange={(e) => props.handleChange(e,'SpecialistArea')}
          margin="normal"
        />
        </div>
        <div className='col-md-12'>
        <Editor
        initialValue="<p>This is the initial content of the editor</p>"
        apiKey='5d7hzleu874zjwed4vnwvsh5d4hsnnrmkkb80nvrl7w0z6v1' 
        init={{
          plugins: 'link image code',
          toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
        }}
        value={props.company.CompanyDesc}
        onEditorChange={(e) => props.handleEditorChange(e)}
      />
        </div>
        </form>
        </div>
    )
}

export default AddcompanyForm1;