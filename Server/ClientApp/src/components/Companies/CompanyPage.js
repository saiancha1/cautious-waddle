import React from 'react'
import Map from './Map';

const CompanyPage = (props) => {
    return (
        <div className="row">
        <div className="col-md-8 col-md-offset-1 col-xs-offset-1">
    
        <div className="row">
 
        <div className="col-md-8">
        <img className="media-object" src={props.company.logo} />
        <h2>{props.company.companyName}</h2>
        <div  dangerouslySetInnerHTML={props.generateDesc}>
        </div>
        </div>
        <div className = "col-md-3 col-md-offset-1">
        <h3>Company Details</h3>
        <div className="row">
        <b>Size: </b> {props.company.size}
        </div>
        <div className="row">
        <b>Business Type: </b> {props.company.businessType}
        </div>
        <div className="row">
        <b>Email: </b> {props.company.email}
        </div>

        </div>
       
        </div>
        <br/><br/>
        <div className="row">
        <Map company={props.company} />
        </div>
        </div>

        
        </div>

    );
}

export default CompanyPage;
