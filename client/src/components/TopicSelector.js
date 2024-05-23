import React from "react";

const topics = [
  "Topic 1",
  "Topic 2",
  "Topic 3",
  "Topic 4",
  "Topic 5",
  "Topic 6",
  "Topic 7",
];

const TopicSelector = () => (
  <div className="button-group-container">
    <div className="button-group">
      {topics.map((topic, index) => (
        <button className="button" key={index}>
          {topic}
        </button>
      ))}
    </div>
  </div>
);

export default TopicSelector;
