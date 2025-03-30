import { FaReact, FaNodeJs, FaWordpress, FaPython, FaDatabase, FaCss3Alt } from "react-icons/fa";

interface SkillsProps {
  heading?: string;
  subheading?: string;
}

const skillsData = [
  { name: "React / Next.js", icon: <FaReact className="text-blue-500" /> },
  { name: "Node.js / Express.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "WordPress Development", icon: <FaWordpress className="text-blue-700" /> },
  { name: "Python / Flask", icon: <FaPython className="text-yellow-500" /> },
  { name: "MongoDB / MySQL", icon: <FaDatabase className="text-gray-600" /> },
  { name: "Tailwind CSS / Bootstrap", icon: <FaCss3Alt className="text-blue-400" /> },
];

const Skills: React.FC<SkillsProps> = ({
  heading = "My Skills & Expertise",
  subheading = "Technologies I Work With",
}) => {
  return (
    <section className="flex flex-col items-center justify-center px-6 text-center bg-[#F7F7F7] " id="skills">
      {/* ✅ Heading & Subheading */}
      <div className="my-12 max-w-4xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{heading}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{subheading}</p>

        {/* ✅ Skills List with Icons */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md"
            >
              {skill.icon}
              {skill.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
