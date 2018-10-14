import React from 'react';
import PropTypes, { any } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCompanyForm1 from './Forms/AddCompanyForm1';
import AddCompanyForm2 from './Forms/AddCompanyForm2';
import AddCompanyForm3 from './Forms/AddCompanyForm3';

const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Company Details', 'Contact Details', 'Other'];
}


class AddCompany extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      company: {
        companyId:null,
        users:null,
        contactEmail:'',
        companyName:'',
        logo:'',
        size:0,
        businessType:'',
        specialistArea:'',
        companyDesc:'',
        email:'',
        address1:'',
        address2:'',
        suburb:'',
        postalCode:'',
        city:'',
        country:'',
        summerJobs:0
      },
      file: null,
      imageUploaded: false,
  
    };
  }
  
componentWillMount() {
  if(this.props.company)
  {
  this.setState({company:this.props.company});
  }
}
  handleForm1Change = (e, val) => {
    const company = this.state.company;
    company[val] = e.target.value;
    this.setState({ company });
  }

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] });
  }

  handleImageUpload = (e) => {
    const data = new FormData();
    const file = this.state.file;
    data.append('file', file);
    console.log(this.state.file);
    e.preventDefault();
    fetch('api/companies/addCompanyImage', { // Your POST endpoint
      method: 'POST',
      headers: {
        // 'Content-Type': 'multipart/formdata',
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      },
      body: data, // This is your file object
    }).then(
      response => response.json(), // if the response is a JSON object
    ).then((res) => {
      const company = this.state.company;
      company.logo = res.imageUrl;
      this.setState({ company });
      this.setState({ imageUploaded: true });
      // Handle the success response object
    },
    ).catch(
      error => console.log(error), // Handle the error response object
    );
  }

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <AddCompanyForm1 handleChange={this.handleForm1Change} company={this.state.company} handleEditorChange={this.handleEditorChange} />;
      case 1:
        return <AddCompanyForm2 handleChange={this.handleForm1Change} company={this.state.company} />;
      case 2:
        return <AddCompanyForm3 handleImageUpload={this.handleImageUpload} handleFileChange={this.handleFileChange} imageUploaded={this.state.imageUploaded} />;
      default:
        return 'Uknown stepIndex';
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleEditorChange = (content) => {
    const company = this.state.company;
    company.companyDesc = content;
    this.setState({ company });
  }

  handleAddCompanySubmit = () => {
    const company = this.state.company;
    const requiredFields = ['CompanyName', 'CompanyDescription', 'Company Email'];
    if(company.companyId !== null)
    {
      fetch('api/companies/editCompany', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('id_token')}`,
          'content-Type': 'application/json',
        },
        body: JSON.stringify(company),
  
      })
        .then((response) => { (response.status === 200) ? alert('CompanyAdded') : alert('fail1'); })
        .catch();
    }
    else{
    fetch('api/companies/addCompany', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        'content-Type': 'application/json',
      },
      body: JSON.stringify(company),

    })
      .then((response) => { (response.status === 200) ? alert('CompanyAdded') : alert('fail1'); })
      .catch();
  }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const company = {
      CompanyId: null,
      ContactEmail: null,
      CompanyName: null,
      Logo: null,
      Size: 0,
      BusinessType: null,
      SpecialistArea: null,
      CompanyDesc: null,
      Phone: null,
      Email: null,
      Address1: null,
      Address2: null,
      Suburb: null,
      PostalCode: null,
      City: null,
      Country: null,
      SummerJobs: 0,
    };
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed. Click Submit</Typography>
              <Button onClick={this.handleAddCompanySubmit}>Submit Company</Button>
            </div>
          ) : (
            <div>
                <div className="Row">
                  {this.getStepContent(activeStep)}
                </div>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
          )}
        </div>
      </div>
    );
  }
}

AddCompany.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(AddCompany);
