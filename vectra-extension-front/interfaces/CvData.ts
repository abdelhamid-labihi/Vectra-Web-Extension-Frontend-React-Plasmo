export interface CVData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  skills: {
    name: string;
    startDate: string;
    endDate: string;
  }[];
  experience: {
    title: string;
    company: string;
    years: string;
    startDate: string; 
    endDate: string; 
    description: string;
  }[];
  education: {
    degree: string;
    major: string;
    university: string;
    startDate: string; 
    endDate: string; 
    years: string;
  }[];
}