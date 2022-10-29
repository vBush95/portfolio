import React from "react";

// const sections = ["home", "about", "work", "skills", "testimonial", "contact"];
const sections = ["start", "work", "skills", "contact"];

const NavigationDots = ({ active }: { active: string }) => {
  return (
    <div className="app__navigation">
      <div className="app__navigation-wrapper">
        {sections.map((item, index) => (
          <a
            key={item + index}
            className="app__navigation-dot"
            style={active === item ? { backgroundColor: "#1e65ff" } : {}}
            href={`#${item}`}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationDots;
