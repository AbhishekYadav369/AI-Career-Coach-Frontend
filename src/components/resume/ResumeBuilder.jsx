// /**
//  * ResumeBuilder Component
//  * Professional resume builder with templates
//  */
// import React, { useState } from 'react';
// import { useUser } from '../../contexts/UserContext';
// import Navbar from '../common/Navbar';
// import ResumeTemplate from './ResumeTemplate';
// import ResumePreview from './ResumePreview';
// import { RESUME_TEMPLATES } from '../../data/dummyData';
// import '../../styles/components/resume.css';

// export default function ResumeBuilder() {
//   const { profile, updateProgress } = useUser();
//   const [selectedTemplate, setSelectedTemplate] = useState(RESUME_TEMPLATES[0]);
//   const [resumeData, setResumeData] = useState({
//     ...profile,
//     experience: [],
//     projects: [],
//     skills: []
//   });

//   const handleTemplateSelect = (template) => {
//     setSelectedTemplate(template);
//   };

//   const handleDataChange = (section, data) => {
//     setResumeData(prev => ({
//       ...prev,
//       [section]: data
//     }));
//   };

//   const handleExport = () => {
//     // Mock export functionality
//     updateProgress('resumeBuilt', true);
//     alert('Resume exported successfully!');
//   };

//   return (
//     <div className="resume-builder-container">
//       <Navbar />

//       <div className="resume-content">
//         <div className="resume-header">
//           <h1>Resume Builder</h1>
//           <p>Create a professional resume with our templates</p>
//         </div>

//         <div className="resume-layout">
//           <div className="resume-sidebar">
//             <div className="template-section">
//               <h3>Choose Template</h3>
//               <div className="template-grid">
//                 {RESUME_TEMPLATES.map((template) => (
//                   <ResumeTemplate
//                     key={template.id}
//                     template={template}
//                     isSelected={selectedTemplate.id === template.id}
//                     onSelect={handleTemplateSelect}
//                   />
//                 ))}
//               </div>
//             </div>

//             <div className="export-section">
//               <button className="btn-primary" onClick={handleExport}>
//                 Export as PDF
//               </button>
//             </div>
//           </div>

//           <div className="resume-main">
//             <ResumePreview
//               template={selectedTemplate}
//               data={resumeData}
//               onDataChange={handleDataChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


/**
 * FullResumeForm Component
 * Professional resume form with all sections, dynamic fields, and PDF generation
 */
import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { useUser } from '../../contexts/UserContext';
import '../../styles/components/resume.css';
import axios from 'axios';

const initialResumeData = {
  personalInformation: {
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    linkedIn: '',
    gitHub: '',
    portfolio: '',
    summary: ''
  },
  achievements: [],
  certifications: [],
  education: [],
  experience: [],
  interests: [],
  languages: [],
  projects: [],
  skills: []
};

export default function FullResumeForm() {
  const { updateProgress } = useUser();
  const [resumeData, setResumeData] = useState(initialResumeData);

  // Handle changes for object fields
  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      const updatedSection = [...resumeData[section]];
      updatedSection[index][field] = value;
      setResumeData(prev => ({ ...prev, [section]: updatedSection }));
    } else {
      setResumeData(prev => ({
        ...prev,
        [section]: { ...prev[section], [field]: value }
      }));
    }
  };

  // Add new item to array sections
  const handleAddItem = (section, fields) => {
    const newItem = fields.reduce((acc, f) => ({ ...acc, [f]: '' }), {});
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  // Remove item from array sections
  const handleRemoveItem = (section, index) => {
    const updatedSection = resumeData[section].filter((_, i) => i !== index);
    setResumeData(prev => ({ ...prev, [section]: updatedSection }));
  };

  // Submit form to API to generate PDF
  const handleSubmit = async () => {
    try {
        const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userid");
      updateProgress('resumeBuilt', true);
    
  axios.post(
        `http://localhost:8080/career/resume?userId=${userId}&careerPath=${'Software Engineer'}`,
        resumeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }, responseType: 'arraybuffer',
        }
      ).then((res)=>{
        console.log(res.data);
        const blob = new Blob(
    [res.data],
    { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'resume.docx';
  link.click();
  URL.revokeObjectURL(url);
  alert('Resume generated successfully!');
      }).catch((err)=>{
  alert('PDF generation failed');

      })


      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'resume.pdf');
      // document.body.appendChild(link);
      // link.click();
      // link.parentNode.removeChild(link);

    
    } catch (err) {
      console.error(err);
      alert('Failed to generate resume PDF');
    }
  };

  // Render dynamic array sections
  const renderArraySection = (title, section, fields) => (
    <div className="resume-section">
      <h3>{title}</h3>
      {resumeData[section].map((item, idx) => (
        <div key={idx} className="section-item">
          {fields.map(field => (
            <div className="form-group" key={field}>
              <label>{field}</label>
              <input
                type="text"
                value={item[field] || ''}
                onChange={(e) => {
                  const value =
                    field === 'technologiesUsed'
                      ? e.target.value.split(',').map(t => t.trim())
                      : e.target.value;
                  handleChange(section, field, value, idx);
                }}
                placeholder={field === 'technologiesUsed' ? 'Comma separated' : ''}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn-secondary"
            onClick={() => handleRemoveItem(section, idx)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" className="btn-primary" onClick={() => handleAddItem(section, fields)}>
        Add {title}
      </button>
    </div>
  );

  return (
    <div className="resume-form-container">
      <Navbar />
      <h1>Build Your Resume</h1>
      <div className="resume-form">
        {/* Personal Information */}
        <div className="resume-section">
          <h3>Personal Information</h3>
          {Object.keys(resumeData.personalInformation).map(field => (
            <div className="form-group" key={field}>
              <label>{field}</label>
              <input
                type="text"
                value={resumeData.personalInformation[field]}
                onChange={(e) => handleChange('personalInformation', field, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Dynamic Sections */}
        {renderArraySection('Achievements', 'achievements', ['title', 'year', 'extraInformation'])}
        {renderArraySection('Certifications', 'certifications', ['title', 'issuingOrganization', 'year'])}
        {renderArraySection('Education', 'education', ['degree', 'university', 'location', 'graduationYear'])}
        {renderArraySection('Experience', 'experience', ['jobTitle', 'company', 'location', 'duration', 'responsibility'])}
        {renderArraySection('Projects', 'projects', ['title', 'description', 'technologiesUsed', 'githubLink'])}
        {renderArraySection('Skills', 'skills', ['title', 'level'])}
        {renderArraySection('Interests', 'interests', ['name'])}
        {renderArraySection('Languages', 'languages', ['name'])}

        <button className="btn-primary" onClick={handleSubmit}>
          Generate PDF Resume
        </button>
      </div>
    </div>
  );
}
