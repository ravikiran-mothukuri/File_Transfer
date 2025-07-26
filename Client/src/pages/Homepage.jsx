import React,{ useState } from 'react';

import '../styles/Homepage.css'
import Logo from '../components/Logo';
import { supabase } from '../supabaseClient';
import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import { Navigate, useNavigate } from "react-router-dom";

function Homepage(){
  
  const [fileList, setFileList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  let [receiverEmail, setReceiverEmail] = useState('');
  let [senderEmail, setSenderEmail] = useState('');
  const navigate= useNavigate();


  const handleFileUpload=(e)=>{
    const filesArray= Array.from(e.target.files);
    setFileList(prev=> [...prev, ...filesArray]);
  }
  const handleFolderUpload=(e)=>{
    const filesArray= Array.from(e.target.files);
    setFolderList(prev=> [...prev, ...filesArray]);
  }

  const deleteFile=(index)=>{
    setFileList(prev=> prev.filter((_,i)=> i!==index));
  }

  const deleteFolder=(index)=>{
    setFolderList(prev=> prev.filter((_,i)=> i!==index));
  }

  function handleLogout(){
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  }

  async function handlesubmit(){
    const allFiles= [...fileList, ...folderList];
    if(!allFiles)
    {
      alert('Please select files or folders.');
      return;
    }
      
    if(!receiverEmail)
    {
      alert('Mention your friend email.');
      return;
    }
      
    if(!senderEmail)
    {
      alert('mention your email');
      return;
    }

    try {
    const urls = [];

    for (const file of allFiles) {
      const filename = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from('uploads') 
        .upload(filename, file);
      console.log(data);
      if (error) throw error;

      const { data: publicUrlData } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(filename);

      urls.push(publicUrlData.publicUrl);
    }

    
    const mailgun = new Mailgun(FormData);
    const mg = mailgun.client({
      username: 'api',
      key: import.meta.env.VITE_MAILGUN_API_KEY,
    });

    const linkText = urls.map(link => `🔗 ${link}`).join('\n');

    await mg.messages.create("yoursandbox.mailgun.org", {
      from: "FileTransfer <postmaster@sandbox.mailgun.org>",
      to: [receiverEmail],
      subject: "You've received files from " + senderEmail,
      text: `Hello,\n\n${senderEmail} has shared the following files:\n\n${linkText}\n\nEnjoy!`,
    });

    alert("✅ Transfer Successful!");

    setFileList([]);
    setFolderList([]);
    setReceiverEmail('');
    setSenderEmail('');
    senderEmail= '';
    receiverEmail='';

  } catch (err) {
    console.error(err);
    alert("❌ Something went wrong: " + err.message);
  }

  }

  return(
    <div className="homepage-container">
      <div className='topbar'>
        <div className='logo-container'>
          <Logo />
        </div>
        <div className='username_container'>
          <div className='upgrade-field'>
            <button className='upgrade-btn'><span>Upgrade</span></button>
          </div>
          <div>
            <button className='username-field'><span>ravikiran_mothukuri</span></button>
          </div>
          <div>
            <button className='sub-btn' onClick={handleLogout}><span>Logout</span></button>
          </div>
        </div>
      </div>
      
      <div className='upload-form'>
        <div className='form-heading'>
          Upload Files
        </div>
        <hr />
        <div className='btns'>
          <label htmlFor="addfiles" className='addfile'>Add Files</label>
          <input 
            type="file" 
            className='addfiles' 
            id='addfiles'
            multiple
            onChange={handleFileUpload}/>
          
          <label htmlFor="addfolders" className='addfolder'>Add Folders</label>
          <input 
            type="file" 
            className='addfolders' 
            id='addfolders'
            multiple
            webkitdirectory="true" 
            directory=""
            onChange={handleFolderUpload}/>
        </div>

        {(folderList.length>0 || fileList.length>0) && <div className="uploaded-files-scroll">
          {folderList.length>0 && 
          (
            <div>
              <p><b>Uploaded Folders: </b></p>
              <ul>
                {folderList.map((file,index)=>(
                  <li key={index}>
                    📁 {file.webkitRelativePath}
                    <span className="delete-tooltip">
                      <button onClick={() => deleteFolder(index)} style={{marginLeft: '1rem'}}>❌</button>
                      <span className="tooltip-text">Remove</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {fileList.length > 0 && (
            <div>
              <p><b>Uploaded Files:</b></p>
              <ul>
                {fileList.map((file, index) => (
                  <li key={index}>
                    📄 {file.name}
                    <span className="delete-tooltip">
                      <button onClick={() => deleteFile(index)} style={{marginLeft: '1rem'}}>❌</button>
                      <span className="tooltip-text">Remove</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>}

        <div className='emails-container'>
          <div className='part-1'>
            <label htmlFor="emailto" className='email1'>Email to:</label>
            <input 
              type="email" 
              id='emailto' 
              className='inp-email1' 
              placeholder='your friend email'
              onChange={(e)=>setReceiverEmail(e.target.value)}/>
          </div>
          <div className='part-2'>
            <label htmlFor="youremail" className='email2'>Your Email:</label>
            <input 
              type="email" 
              id='youremail' 
              className='inp-email2' 
              placeholder='your email'
              onChange={(e)=>setSenderEmail(e.target.value)}/>
          </div>
        </div>

        <div className='sub-btn-homepage'>
          <button className='sub-btn-h' onClick={handlesubmit}>Send Files</button>
        </div>

      </div>

    </div>
  )
}

export default Homepage;