export interface CVData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  GitHub:string;
  skills: string[];
  experience: {
    job_title: string;
    company: string;
    years: string;
    startDate: string; 
    endDate: string; 
    description: string;
  }[];
  education: {
    degree: string;
    branch: string;
    university: string;
    startDate: string; 
    endDate: string; 
    years: string;
    city:string
  }[];
  projects: {
    title: string;
    description: string;
    tools: string;
    startDate:string;
    endDate:string;
  }[];
  languages : {
    name: string;
    level: string;
  }[];  
  softSkills :string[];
  
}