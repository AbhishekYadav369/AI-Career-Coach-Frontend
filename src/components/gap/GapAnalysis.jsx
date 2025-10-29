// /**
//  * GapAnalysis Component
//  * Skills gap analysis and learning recommendations
//  */
// import React, { useState } from 'react';
// import { useUser } from '../../contexts/UserContext';
// import Navbar from '../common/Navbar';
// import SkillChart from './SkillChart';
// import LearningPlan from './LearningPlan';
// import { SKILL_GAPS } from '../../data/dummyData';
// import axios from 'axios';
// import '../../styles/components/gap.css';

// export default function GapAnalysis() {
//   const { selectedCareer } = useUser();

//   const [timeline, setTimeline] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [apiResponse, setApiResponse] = useState(null);

//   // Handle Generate button click
//   const handleGenerate = async () => {
//     if (!timeline.trim()) return; // Prevent API call if timeline empty
//     setLoading(true);
//     try {
//         const token = sessionStorage.getItem('token'); // if you store JWT
//       const userid = sessionStorage.getItem('userid');
//       const res = await axios.post(`http://localhost:8080/career/roadmap?userId=${userid}&timeline=${timeline}`, {},
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       ).then((res)=>{
//         axios.get(`http://localhost:8080/career/roadmap?userId=${userid}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       ).then((res1)=>{
//         console.log(res1.data);
//       })
//       })
//       setApiResponse(res.data);
//       console.log('Generated Response:', res.data);
//     } catch (error) {
//       console.error('Error generating analysis:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Ensure user selected a career first
//   if (!selectedCareer) {
//     return (
//       <div className="gap-analysis-container">
//         <Navbar />
//         <div className="gap-content">
//           <h1>Please select a career first</h1>
//           <p>You need to select a career path before analyzing skill gaps.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="gap-analysis-container">
//       <Navbar />

//       <div className="gap-content">
//         <div className="gap-header">
//           <h1>Skills Gap Analysis</h1>
//           <p>For: {selectedCareer.title}</p>
//         </div>

//         <div className="gap-layout">
//           <div className="timeline-input-section">
//             <label htmlFor="timeline">Timeline:</label>
//             <input
//               type="text"
//               id="timeline"
//               placeholder="e.g., 6 months"
//               value={timeline}
//               onChange={(e) => setTimeline(e.target.value)}
//             />
//             <button
//               className="btn-primary"
//               onClick={handleGenerate}
//               disabled={!timeline.trim() || loading}
//             >
//               {loading ? 'Generating...' : 'Generate'}
//             </button>
//           </div>

//           {apiResponse && (
//             <div className="api-response-box">
//               <h3>Generated Learning Plan:</h3>
//               <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
//             </div>
//           )}

//           <div className="skills-chart-section">
//             <SkillChart skills={SKILL_GAPS} />
//           </div>

//           {/* <div className="learning-plan-section">
//             <LearningPlan career={selectedCareer} skillGaps={SKILL_GAPS} />
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }
/**
 * GapAnalysis Component
 * Skills gap analysis and learning roadmap visualization
 */
import React, { useState } from "react";
import { useUser } from "../../contexts/UserContext";
// Navbar provided by ProtectedLayout
import SkillChart from "./SkillChart";
import axios from "axios";
import "../../styles/components/gap.css";
import { useNavigate } from "react-router-dom";

export default function GapAnalysis() {
  const { selectedCareer } = useUser();

  const [timeline, setTimeline] = useState("");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
const navigate=useNavigate();
  const handleGenerate = async () => {
    if (!timeline.trim()) return;

    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userid");

    setLoading(true);
    try {
      // Step 1: Trigger roadmap generation
      await axios.post(
        `http://localhost:8080/career/roadmap?userId=${userId}&timeline=${timeline}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Step 2: Fetch generated roadmap
      const res =  axios.get(
        `http://localhost:8080/career/roadmap?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res)=>{

      setRoadmap(res.data);
const storedProgress = localStorage.getItem('user_progress');
let userProgress = storedProgress ? JSON.parse(storedProgress) : {};
userProgress.resumeBuilt = true;
userProgress.quizCompleted = true;
localStorage.setItem('user_progress', JSON.stringify(userProgress));
console.log('Updated user_progress:', userProgress);


alert("ggg")
navigate('/resume');
      })

    

    } catch (error) {
      console.error("Error generating roadmap:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedCareer) {
    return (
      <div className="gap-analysis-container">
        <div className="gap-content">
          <h1>Please select a career first</h1>
          <p>You need to select a career path before analyzing skill gaps.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-analysis-container">
      <div className="gap-content">
        <div className="gap-header">
          <h1>Skills Gap Analysis</h1>
          <p>For: {selectedCareer.title}</p>
        </div>

        <div className="gap-layout">
          {/* Timeline input */}
          <div className="timeline-input-section">
            <label htmlFor="timeline">Timeline:</label>
            <input
              type="text"
              id="timeline"
              placeholder="e.g., 6 months"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
            />
            <button
              className="btn-primary"
              onClick={handleGenerate}
              disabled={!timeline.trim() || loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* Display roadmap if available */}
          {roadmap && (
            <div className="roadmap-section">
              <h2>Learning Roadmap for {roadmap.path}</h2>

              {/* Skills Gap Section */}
              <div className="skills-gap">
                <h3>Skills You Need to Learn:</h3>
                <ul className="skills-gap-list">
                  {roadmap.skillsGap.map((skill, i) => (
                    <li key={i} className="skill-tag">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Roadmap Cards */}
              <div className="roadmap-grid">
                {roadmap.roadmap.map((monthPlan, index) => (
                  <div key={index} className="roadmap-card">
                    <h3>{monthPlan.month}</h3>

                    <div className="focus-section">
                      <strong>Focus:</strong>
                      <ul>
                        {monthPlan.focus.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="time-distribution">
                      <strong>Time Distribution:</strong>
                      <ul>
                        {Object.entries(monthPlan.timeDistribution).map(
                          ([skill, percent], i) => (
                            <li key={i}>
                              {skill}: {percent}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="resources-section">
                      <strong>Learning Resources:</strong>
                      {monthPlan.resources.map((resItem, i) => (
                        <div key={i} className="resource-item">
                          <p className="resource-skill">
                            🔹 {resItem.skill}
                          </p>
                          <ul className="resource-links">
                            {resItem.links.map((link, j) => (
                              <li key={j}>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {link}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!roadmap && (
            <div className="skills-chart-section">
              <SkillChart
                skills={[
                  {
                    skill: "Loading sample skills...",
                    current: 2,
                    required: 8,
                    priority: "High",
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
