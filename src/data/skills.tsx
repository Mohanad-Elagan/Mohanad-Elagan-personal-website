import type { SkillCategory } from '@/types/portfolio';
import { Code2, Database, Smartphone, Cog, Palette, BarChart3, Microscope, Brain } from 'lucide-react';
import type { ReactNode } from 'react';

const createIcon = (icon: ReactNode): ReactNode => icon;

export const skillCategories: SkillCategory[] = [
  {
    name: "Clinical Research",
    skills: ["IRB/CITI", "behavioral experiments", "Qualtrics", "clinical interviews", "psychometrics & assessment"],
    icon: createIcon(<Brain className="h-6 w-6 text-primary" />)
  },
  {
    name: "Quantitative Methods",
    skills: ["regression", "mixed-effects models", "ANOVA", "power analysis", "data cleaning", "visualization"],
    icon: createIcon(<BarChart3 className="h-6 w-6 text-primary" />)
  },
  {
    name: "Research Tools",
    skills: ["Jupyter", "Git", "Linux", "Docker", "AWS", "LaTeX"],
    icon: createIcon(<Cog className="h-6 w-6 text-primary" />)
  },
  {
    name: "Laboratory",
    skills: ["cell culture", "ELISA", "confocal imaging", "ECM/rheology assays", "3D bioprinting"],
    icon: createIcon(<Microscope className="h-6 w-6 text-primary" />)
  },
  {
    name: "Programming Languages",
    skills: ["Python", "C/C++", "MATLAB", "JavaScript (ES6+)", "TypeScript", "SQL", "Bash"],
    icon: createIcon(<Code2 className="h-6 w-6 text-primary" />)
  },
  {
    name: "Frontend Development",
    skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"],
    icon: createIcon(<Smartphone className="h-6 w-6 text-primary" />)
  },
  {
    name: "Databases",
    skills: ["SQL (PostgreSQL, MySQL)", "Firebase Firestore"],
    icon: createIcon(<Database className="h-6 w-6 text-primary" />)
  },
  {
    name: "AI & Data Science",
    skills: ["Machine Learning", "Deep Learning (CNNs, Transformers)", "NLP", "Python (Pandas, NumPy, scikit-learn)", "TensorFlow", "PyTorch"],
    icon: createIcon(<BarChart3 className="h-6 w-6 text-primary" />)
  },
  {
    name: "Design & IT Skills",
    skills: ["Adobe Creative Suite (Adobe XD, Photoshop, Illustrator, InDesign, Premiere Pro)", "Figma", "IT Support", "Project Management"],
    icon: createIcon(<Palette className="h-6 w-6 text-primary" />)
  }
];