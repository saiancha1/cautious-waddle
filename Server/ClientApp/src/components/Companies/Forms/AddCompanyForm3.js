import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import DoneIcon from '@material-ui/icons/Done';
const AddCompanyForm3 = (props) => {
    return (
        <div className="row">       
        <div className="col-md-5 offset-md-4"></div>
        <div className="col-md-4 offset-md-4">
        <h1>File Upload</h1>
        <input type="file" onChange={(e) => props.handleFileChange(e)} />
        <Button type="submit" onClick={(e) => props.handleImageUpload(e)}><CloudUploadIcon/></Button>
        <Fade in={props.imageUploaded}><DoneIcon color='primary'/></Fade>
        </div>
      </div>
    );
}
export default AddCompanyForm3;