import React from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';

const AddCompanyForm3 = (props) => {
    return (
        <div>
        <h1>File Upload</h1>
        <input type="file" onChange={(e) => props.handleFileChange(e)} />
        <Button type="submit" onClick={(e) => props.handleImageUpload(e)}><CloudUploadIcon/></Button>
      </div>
    );
}
export default AddCompanyForm3;