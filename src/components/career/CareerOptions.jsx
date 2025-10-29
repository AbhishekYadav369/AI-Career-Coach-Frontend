// /**
//  * CareerOptions Component
//  * Displays personalized career recommendations
//  */
// import React, { useState, useEffect } from 'react';
// import { useUser } from '../../contexts/UserContext';
// import Navbar from '../common/Navbar';
// import CareerCard from './CareerCard';
// import CareerFilter from './CareerFilter';
// import { CAREER_OPTIONS } from '../../data/dummyData';
// import '../../styles/components/career.css';
// import axios from 'axios';

// export default function CareerOptions() {
//   const { selectCareer, quizData } = useUser();

//   const [careers, setCareers] = useState(CAREER_OPTIONS);
//   const [filteredCareers, setFilteredCareers] = useState(CAREER_OPTIONS);
//   const [filters, setFilters] = useState({
//     industry: 'all',
//     salaryRange: 'all',
//     matchPercentage: 0
//   });


// useEffect(()=>{
// axios.get(`http://localhost:8080/career/paths?userId=68d777f0618edd1324eb71ed`)
// },[]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }));
//   };

//   const handleCareerSelect = (career) => {
//     selectCareer(career);
//   };

//   useEffect(() => {
//     let filtered = [...careers];

//     if (filters.industry !== 'all') {
//       filtered = filtered.filter(career => career.industry === filters.industry);
//     }

//     if (filters.matchPercentage > 0) {
//       filtered = filtered.filter(career => career.matchPercentage >= filters.matchPercentage);
//     }

//     setFilteredCareers(filtered);
//   }, [careers, filters]);

//   return (
//     <div className="career-options-container">
//       <Navbar />

//       <div className="career-content">
//         <div className="career-header">
//           <h1>Your Career Recommendations</h1>
//           <p>
//             Based on your quiz results, here are career paths that match your 
//             interests and skills.
//           </p>
//         </div>

//         <div className="career-layout">
//           <aside className="career-sidebar">
//             <CareerFilter
//               filters={filters}
//               onFilterChange={handleFilterChange}
//               careerData={careers}
//             />
//           </aside>

//           <main className="career-main">
//             <div className="career-results-header">
//               <h2>
//                 {filteredCareers.length} Career{filteredCareers.length !== 1 ? 's' : ''} Found
//               </h2>
//             </div>

//             {filteredCareers.length === 0 ? (
//               <div className="no-results">
//                 <h3>No careers match your current filters</h3>
//                 <p>Try adjusting your filters to see more options.</p>
//               </div>
//             ) : (
//               <div className="career-grid">
//                 {filteredCareers.map((career) => (
//                   <CareerCard
//                     key={career.id}
//                     career={career}
//                     onSelect={handleCareerSelect}
//                   />
//                 ))}
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

/**
 * CareerOptions Component
 * Displays personalized career recommendations
 */
import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import Navbar from '../common/Navbar';
import CareerCard from './CareerCard';
import CareerFilter from './CareerFilter';
import '../../styles/components/career.css';
import axios from 'axios';

export default function CareerOptions() {
  const { selectCareer, quizData } = useUser();

  const [careers, setCareers] = useState([]);
  const [filteredCareers, setFilteredCareers] = useState([]);
  const [filters, setFilters] = useState({
    industry: 'all',
    salaryRange: 'all',
    matchPercentage: 0
  });

  useEffect(() => {
    const fetchCareerPaths = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userid");

        if (!token || !userId) {
          console.error("Missing token or userId for API call");
          return;
        }

        const response = await axios.get(`http://localhost:8080/career/paths?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

         // Map backend data to frontend-friendly structure
        const mappedCareers = response.data.map((item, index) => ({
  id: index + 1,
  title: item.careerPath || "Unknown Career",
  description: item.futureScope || "No description available",
  salaryRange: item.financialFactors?.match(/₹[0-9\-–, ]+lakhs/)?.[0] || "N/A",
  growthProspect: item.futureScope?.includes("High") ? "High" : "Moderate",
  requiredSkills: item.prerequisites
    ? item.prerequisites.split(",").map(s => s.trim())
    : ["Not specified"],
  matchPercentage: Math.floor(Math.random() * 21) + 80, // random 80–100
  industry: item.careerPath?.includes("Engineering") || item.careerPath?.includes("Data")
    ? "Technology"
    : "General"
}));

        setCareers(mappedCareers);
        setFilteredCareers(mappedCareers);
      } catch (error) {
        console.error("Error fetching career paths:", error);
      }
    };

    fetchCareerPaths();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleCareerSelect = (career) => {
    selectCareer(career);
  };

  useEffect(() => {
    let filtered = [...careers];

    if (filters.industry !== 'all') {
      filtered = filtered.filter(career => career.industry === filters.industry);
    }

    if (filters.matchPercentage > 0) {
      filtered = filtered.filter(career => career.matchPercentage >= filters.matchPercentage);
    }

    setFilteredCareers(filtered);
  }, [careers, filters]);

  return (
    <div className="career-options-container">
      <Navbar />

      <div className="career-content">
        <div className="career-header">
          <h1>Your Career Recommendations</h1>
          <p>
            Based on your quiz results, here are career paths that match your 
            interests and skills.
          </p>
        </div>

        <div className="career-layout">
          <aside className="career-sidebar">
            <CareerFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              careerData={careers}
            />
          </aside>

          <main className="career-main">
            <div className="career-results-header">
              <h2>
                {filteredCareers.length} Career{filteredCareers.length !== 1 ? 's' : ''} Found
              </h2>
            </div>

            {filteredCareers.length === 0 ? (
              <div className="no-results">
                <h3>No careers match your current filters</h3>
                <p>Try adjusting your filters to see more options.</p>
              </div>
            ) : (
              <div className="career-grid">
                {filteredCareers.map((career) => (
                  <CareerCard
                    key={career.id}
                    career={career}
                    onSelect={handleCareerSelect}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
