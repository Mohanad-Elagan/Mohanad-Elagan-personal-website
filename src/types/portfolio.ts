export type ProjectCategory = "Web Development" | "Mobile App" | "Data Science" | "AI/ML" | "Game Development" | "Research Papers";

export interface Project {
  id: string;
  title: string;
  shortDescription: string; // For card view and papers' abstract
  longDescription?: string; // For modal view, papers' detailed summary or key findings
  imageUrl: string; // Could be a generic icon for papers or a relevant visual
  tags: string[]; // e.g., ['Machine Learning', 'ACL 2023', 'PDF']
  category: ProjectCategory;
  projectUrl?: string; // Link to PDF, publication page, or live project
  repoUrl?: string; // Link to code repository, if applicable
  imageHint?: string;
  publication?: string; // For papers: e.g., "ACL 2023", "NeurIPS 2022"
  authors?: string[]; // For papers
  doiLink?: string; // For papers, link to DOI
  label?: string; // Honest status label, e.g., "Working manuscript", "Conference project"
  featured?: boolean; // Highlight as a selected (vs. archived) software project
}

export interface SkillCategory {
  name: string;
  skills: string[];
  icon?: React.ReactNode; // Optional: if you want icons for categories
}

export interface GraphicDesignItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  category: string; // e.g., Branding, Illustration, UI/UX
  tools?: string[];
  year?: number;
}

export interface CreativeWritingPiece {
  id: string;
  title: string;
  type: 'Poem' | 'Short Story' | 'Article' | 'Script';
  excerpt: string;
  content?: string; // Full content, optional
  publication?: string; // Where it was published, optional
  year?: number;
  imageUrl?: string; // Optional image associated with the piece
  imageHint?: string;
  tags?: string[];
}
