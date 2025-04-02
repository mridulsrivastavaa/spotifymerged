import React, { useState, useEffect } from "react";
import axios from "axios";

function Page1() {
  const [problemsByTag, setProblemsByTag] = useState({}); // Stores problems categorized by tag
  const [filteredProblems, setFilteredProblems] = useState([]); // Stores filtered problems
  const [selectedTag, setSelectedTag] = useState(""); // Stores selected tag
  const [tags, setTags] = useState([]); // Stores all available tags
  const [loading, setLoading] = useState(true); // Show loading while fetching data

  // Fetch problem set from Codeforces API on initial load
  useEffect(() => {
    fetchProblems();
  }, []);

  // Optimized function to fetch problems and categorize them by tags
  const fetchProblems = async () => {
    try {
      const response = await axios.get(
        "https://codeforces.com/api/problemset.problems"
      );

      const allProblems = response.data.result.problems;

      // Process problems asynchronously to prevent UI blocking
      setTimeout(() => {
        categorizeProblemsByTag(allProblems);
      }, 100);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  // Optimized categorization by tags
  const categorizeProblemsByTag = (problems) => {
    const tagMap = new Map(); // Faster tag map
    const uniqueTags = new Set();

    problems.forEach((problem) => {
      if (Array.isArray(problem.tags)) {
        problem.tags.forEach((tag) => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, []);
          }
          tagMap.get(tag).push(problem);
          uniqueTags.add(tag); // Collect unique tags
        });
      }
    });

    // Convert Map to Object for state
    setProblemsByTag(Object.fromEntries(tagMap));
    setTags(Array.from(uniqueTags)); // Convert Set to Array once
    setLoading(false); // Hide loading indicator
  };

  // Handle tag change and update filtered problems
  const handleTagChange = (event) => {
    const tag = event.target.value;
    setSelectedTag(tag);

    if (tag === "") {
      // If "All Tags" selected, reset to empty list
      setFilteredProblems([]);
    } else {
      // Set problems based on selected tag
      setFilteredProblems(problemsByTag[tag] || []);
    }
  };

  return (
    <>
      <h1>Codeforces Problems by Tag</h1>

      {/* Loading indicator while fetching data */}
      {loading ? (
        <p>Loading problems and tags... ⏳</p>
      ) : (
        <>
          {/* Dropdown to select tags */}
          <select value={selectedTag} onChange={handleTagChange}>
            <option value="">All Tags</option>
            {tags.map((tag, index) => (
              <option key={index} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Display filtered problems */}
          {selectedTag === "" ? (
            <p>Select a tag to view problems.</p>
          ) : filteredProblems.length > 0 ? (
            <ul>
              {filteredProblems.map((problem, index) => (
                <li key={index}>
                  <strong>
                    {problem.contestId}
                    {problem.index}: {problem.name}
                  </strong>
                  <br />
                  <small>Tags: {problem.tags.join(", ")}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No problems found for the selected tag.</p>
          )}
        </>
      )}
    </>
  );
}

export default Page1;
