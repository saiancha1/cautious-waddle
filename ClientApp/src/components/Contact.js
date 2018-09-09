import React from 'react';

const Contact = () => {
  return <div>
    <h1>Contact</h1>
    {/* sends email with email editor */}
    <form method='post' action="mailto:kakahass@gmail.com" >
        
    <label>Name </label><br></br>
    <input name="name" placeholder="Type Here"></input>
    <br></br>
    <br></br>

    <label>Email</label>
    <br></br>
    <input name="email" type="email" placeholder="Type Here"></input>
    <br></br>
    <br></br>

            
    <label>Message</label>
    <br></br>
    <textarea name="message" placeholder="Type Here"></textarea>
    <br></br>
    <br></br>
            
    <input id="submit" name="submit" type="submit" value="Submit"></input>
    <br></br>
    <br></br>

    </form>
   
    </div>
};

export default Contact;
