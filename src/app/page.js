"use client";

import { useState } from 'react';

// The main App component that renders the entire application
export default function App() {
  // State variables to manage the form inputs and application state
  const [file, setFile] = useState(null);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Helper function to parse the markdown string and render it as JSX
  const parseAndRenderEvaluation = (text) => {
    // Split the content into sections based on the markdown horizontal rules
    const sections = text.split(/\n---\n/);
    let scoreValue = 'N/A';
    let scoreNumerator = 0;
    let scoreDenominator = 10;
    const structuredData = {};

    sections.forEach((section) => {
      const lines = section.trim().split('\n');
      const firstLine = lines.shift().trim();
      const content = lines.join('\n').trim();
      const titleMatch = firstLine.match(/#+ (.+)/);
      const title = titleMatch ? titleMatch[1].replace(/\*\*|\*/g, '') : 'Untitled Section';

      if (title.includes('Score')) {
        // Updated regex to correctly parse scores with decimal points
        const scoreMatch = content.match(/(\d+\.?\d*)\/(\d+)/);
        if (scoreMatch) {
          scoreNumerator = parseFloat(scoreMatch[1]);
          scoreDenominator = parseInt(scoreMatch[2], 10);
          scoreValue = `${scoreNumerator}/${scoreDenominator}`;
        }
      } else {
        structuredData[title] = content;
      }
    });

    const progressPercentage = (scoreNumerator / scoreDenominator) * 100;
    const conicGradientStyle = {
      background: `conic-gradient(#8e44ad ${progressPercentage * 3.6}deg, #444a6b 0deg)`
    };

    // New, more robust function to parse lists with bolded titles
    const parseListItems = (listContent) => {
      const items = listContent.split('*').filter(Boolean).map(item => item.trim());
      
      return items.map((item, i) => {
        // The regex is updated to handle optional bolding and consistent parsing
        const itemTitleMatch = item.match(/^(?:\*\*|)(.+?):\s*(?:\*\*|)(.*)/);
        if (itemTitleMatch) {
          return (
            <li key={i} className="flex items-start gap-2 text-gray-300">
              <div className="flex-grow">
                <strong className="text-white">{itemTitleMatch[1].trim()}:</strong>
                <span> {itemTitleMatch[2].trim()}</span>
              </div>
            </li>
          );
        }
        return (
          <li key={i} className="flex items-start gap-2 text-gray-300">
            <div className="flex-grow">
              <span>{item}</span>
            </div>
          </li>
        );
      });
    };

    // Extract subsections from the Strengths and Weaknesses section
    const strengthsWeaknessesContent = structuredData['Strengths and Weaknesses'] || '';
    const strengthsRegex = /\*\*Strengths:\*\*\s*(.*?)\s*\*\*Weaknesses:\*\*/s;
    const weaknessesRegex = /\*\*Weaknesses:\*\*\s*(.*)/s;

    const strengthsMatch = strengthsWeaknessesContent.match(strengthsRegex);
    const weaknessesMatch = strengthsWeaknessesContent.match(weaknessesRegex);

    const strengthsSection = strengthsMatch ? strengthsMatch[1].trim() : '';
    const weaknessesSection = weaknessesMatch ? weaknessesMatch[1].trim() : '';
    
    const recommendationsContent = structuredData['Recommendations'] || '';
    const profileSummaryContent = structuredData['Candidate Profile Summary'] || '';

    return (
      <div className="results-dashboard flex flex-col gap-6 text-left">
        {/* Overall Match Score Section */}
        <div className="bg-[#2a314b] p-8 rounded-lg border border-[#3a3f5a] flex flex-col items-center">
          <div className="report-score-container flex flex-col items-center mb-6">
            <h3 className="text-2xl font-semibold text-[#b0b9c6] mb-4">Overall Match Score</h3>
            <div className="w-40 h-40 rounded-full flex items-center justify-center shadow-inner-lg transition-all duration-700 ease-in-out" style={conicGradientStyle}>
              <div className="w-36 h-36 rounded-full bg-[#1f233a] flex items-center justify-center">
                <span className="text-4xl font-bold text-white">{scoreValue}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Section */}
        <div className="bg-[#2a314b] p-8 rounded-lg border border-[#3a3f5a] space-y-6">
          <h3 className="text-2xl font-semibold text-[#b0b9c6]">Strengths & Weaknesses</h3>
          <div className="flex flex-col gap-6">
            <div>
              <h4 className="text-xl font-medium text-green-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Strengths
              </h4>
              <ul className="space-y-3">
                {parseListItems(strengthsSection)}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-medium text-red-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Weaknesses
              </h4>
              <ul className="space-y-3">
                {parseListItems(weaknessesSection)}
              </ul>
            </div>
          </div>
        </div>

        {/* Profile Highlights Section */}
        <div className="bg-[#2a314b] p-8 rounded-lg border border-[#3a3f5a] space-y-6">
          <h3 className="text-2xl font-semibold text-[#b0b9c6]">Profile Highlights</h3>
          <p className="text-gray-300 leading-relaxed">
            {profileSummaryContent.split('-')[0].trim()}
          </p>
          <div className="space-y-6">
            {profileSummaryContent
              .split('-')
              .slice(1) // skip intro
              .map((section, i) => {
                const match = section.match(/\*\*(.+?):\*\*\s*(.*)/);
                if (match) {
                  const title = match[1].trim();
                  const content = match[2].trim();
                  const subItems = content
                    .split('*')
                    .map(item => item.trim())
                    .filter(item => item.length > 0);
                  return (
                    <div key={i}>
                      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
                      <ul className="list-disc list-inside text-gray-300 space-y-1 pl-2">
                        {subItems.map((item, j) => (
                          <li key={j}>{item.replace(/\*\*/g, '').trim()}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return null;
              })}
          </div>
        </div>
        
        {/* Recommendations Section */}
        <div className="bg-[#2a314b] p-8 rounded-lg border border-[#3a3f5a] space-y-6">
          <h3 className="text-2xl font-semibold text-[#b0b9c6]">Recommendations</h3>
          <p className="text-gray-300 leading-relaxed">
            {recommendationsContent.split(/\n/)[0].replace(/\*\*/g, '')}
          </p>
          <ul className="space-y-3 text-gray-300">
            {recommendationsContent
              .replace(/\*\*/g, '')
              .split(/\d+\.\s/)
              .slice(1)
              .filter(item => item.trim() !== '')
              .map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1 text-[#8e44ad] font-semibold">
                    {i + 1}.
                  </div>
                  <div className="flex-grow">{item.trim()}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  };

  // Handler for the file input change event
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setFile(files[0]);
      setErrorMessage(''); // Clear any previous error messages
    } else {
      setFile(null);
    }
  };

  // Handler for the form submission with a modern fetch call
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission (page reload)
    
    // Check if a file is selected before proceeding
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }

    setIsLoading(true); // Start loading state
    setReportData(null); // Clear previous results
    setErrorMessage(''); // Clear previous error messages

    // Create a FormData object to send the file and other form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('jobPosition', jobPosition);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await fetch('   https://2eb4133dd905.ngrok-free.app/webhook/file-upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}. This may be a CORS issue.`);
      }

      let resultText;
      let resultJson;

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        // If n8n sends JSON
        resultJson = await response.json();
        if (resultJson.output) {
          setReportData(resultJson.output);
        } else {
          setReportData(JSON.stringify(resultJson, null, 2)); // fallback: show raw JSON
        }
      } else {
        // If n8n sends plain text
        resultText = await response.text();
        setReportData(resultText);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setErrorMessage("Failed to submit. This might be a CORS issue or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1a1a2e] flex justify-center items-center min-h-screen p-5 sm:p-20 font-sans">
      <div className="card bg-[#1f233a] p-10 rounded-xl shadow-2xl w-full max-w-[900px] text-center border-t-4 border-[#8e44ad]">
        <h2 className="text-[#e0e6f7] mb-8 text-3xl font-semibold">Upload Your Resume</h2>
        <form onSubmit={handleSubmit}>
          <div className="main-form-container flex flex-col gap-6 sm:flex-row sm:gap-10 text-left">
            <div className="form-side flex-1 flex flex-col gap-6">
              <div className="space-y-2">
                <label htmlFor="file" className="input-label text-[#b0b9c6] font-medium block">Select or Drag & Drop File:</label>
                <label htmlFor="file" className="file-upload-box border-2 border-dashed border-[#6a5acb] rounded-lg p-10 text-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#2a314b] hover:border-[#8e44ad] h-full flex flex-col justify-center items-center">
                  <span className="upload-icon text-5xl text-[#9b59b6] mb-3">&#x1F4C4;</span>
                  <div id="file-name-display" className="text-[#c0ccda] text-base font-medium min-h-[25px] flex items-center justify-center text-center">
                    {file ? file.name : "Drag and drop your resume here, or click to browse."}
                  </div>
                </label>
                <input type="file" id="file" name="file" accept=".pdf,.docx" onChange={handleFileChange} className="hidden" />
              </div>
            </div>
            <div className="form-side flex-1 flex flex-col gap-6">
              <div>
                <label htmlFor="job_position" className="input-label text-[#b0b9c6] font-medium block">Job Position:</label>
                <input
                  type="text"
                  id="job_position"
                  name="job_position"
                  className="text-input w-full p-3 border border-solid border-[#3a3f5a] rounded-lg bg-[#2a314b] text-[#e0e6f7] text-base box-border transition-colors duration-300 ease-in-out focus:outline-none focus:border-[#8e44ad]"
                  placeholder="e.g., Senior Software Engineer"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="job_description" className="input-label text-[#b0b9c6] font-medium block">Job Description:</label>
                <textarea
                  id="job_description"
                  name="job_description"
                  className="text-input w-full p-3 border border-solid border-[#3a3f5a] rounded-lg bg-[#2a314b] text-[#e0e6f7] text-base box-border transition-colors duration-300 ease-in-out focus:outline-none focus:border-[#8e44ad]"
                  rows="5"
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <div className="button-group flex flex-col gap-4 mt-5 items-center">
            <button
              type="submit"
              className={`flex-1 w-full bg-[#3498db] text-white border-none p-4 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 ease-in-out ${isLoading || !file ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-[#2980b9] hover:-translate-y-0.5 active:translate-y-0'}`}
              disabled={isLoading || !file}
            >
              Submit Resume
            </button>
            {errorMessage && <p className="text-red-400 mt-2 text-sm">{errorMessage}</p>}
          </div>
        </form>
        {/* Conditional rendering for loading and results */}
        {(isLoading || reportData) && (
          <div className="mt-5 text-left bg-[#2a314b] text-[#e0e6f7] p-5 rounded-lg">
            {isLoading ? (
              <h3 id="loading-indicator" className="text-[#3498db] text-lg font-semibold text-center">Processing...</h3>
            ) : (
              <div id="results-content">
                {parseAndRenderEvaluation(reportData)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
