import type { SkillCategory } from '@/types/portfolio';
import { Code2, Database, Server, Smartphone, Cog, Palette, Feather, BarChart3, Microscope } from 'lucide-react';
import type { ReactNode } from 'react'; // Import ReactNode if it's not globally available

// Helper to ensure icons are valid ReactNodes, satisfying the SkillCategory type more explicitly.
const createIcon = (icon: ReactNode): ReactNode => icon;

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming Languages",
    skills: ["Python", "C/C++", "MATLAB", "JavaScript (ES6+)", "TypeScript", "PHP", "Ruby", "SQL", "Bash"],
    icon: createIcon(<Code2 className="h-6 w-6 text-primary" />)
  },
  {
    name: "Frontend Development",
    skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
    icon: createIcon(<Smartphone className="h-6 w-6 text-primary" />)
  },
  {
    name: "Backend Development",
    skills: ["Node.js", "Python (Django/Flask)"],
    icon: createIcon(<Server className="h-6 w-6 text-primary" />)
  },
  {
    name: "Databases",
    skills: ["SQL (PostgreSQL, MySQL)", "Firebase Firestore"],
    icon: createIcon(<Database className="h-6 w-6 text-primary" />)
  },
  {
    name: "AI & Data Science",
    skills: ["Machine Learning", "Deep Learning", "NLP", "Python (Pandas, NumPy, scikit-learn)", "TensorFlow", "PyTorch"],
    icon: createIcon(<BarChart3 className="h-6 w-6 text-primary" />)
  },
  {
    name: "Design & IT Skills",
    skills: ["Adobe Creative Suite (Adobe XD, Photoshop, Illustrator, InDesign, Premiere Pro)", "Figma", "IT Support", "Project Management"],
    icon: createIcon(<Palette className="h-6 w-6 text-primary" />)
  },
  {
    name: "Laboratory Skills",
    skills: ["Cell Culture", "DNA Gel Electrophoresis", "ELISA", "Titration", "Microscopy", "Histology Slide Preparation"],
    icon: createIcon(<Microscope className="h-6 w-6 text-primary" />)
  },
  {
    name: "DevOps & Tools",
    skills: ["Git", "Docker", "CI/CD"],
    icon: createIcon(<Cog className="h-6 w-6 text-primary" />)
  },
  {
    name: "General Skills",
    skills: ["Problem Solving", "Communication", "Technical Writing", "Agile Methodologies"],
    icon: createIcon(<Feather className="h-6 w-6 text-primary" />)
  }
];