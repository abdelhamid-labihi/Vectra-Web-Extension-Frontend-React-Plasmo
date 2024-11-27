
# Vectra Resume Matcher

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/icon.png" alt="Vectra logo" style="max-width: 400px;"/>

> Vectra is a browser extension that leverages machine learning to analyze resumes and job descriptions, providing tailored suggestions to enhance resumes and improve job seekers' chances of landing interviews.

## Problem Context
<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/problem-context.png" alt="Problem Context" style="max-width: 400px;"/>
The job market is increasingly competitive. For job seekers, making a strong impression is crucial, and their resume is their first impression.
But crafting a resume that truly highlights their skills and experience, tailored to each job description, can be a daunting task. Imagine this scenario:

- The job seeker: They spend hours on online job boards, scrolling through countless postings. They find a position that aligns with their interests, but then face a wall – the application process. They feel overwhelmed by the need to re-write their resume for every application, ensuring they showcase the right skills for each specific role.
- The employer: They receive hundreds of applications for each position. They spend countless hours sifting through generic resumes, struggling to find the candidates who truly match their needs. This process is time-consuming and inefficient, often leading to missed opportunities.

This is the problem we're addressing with Vectra. It's a challenge that impacts both job seekers and employers. Job seekers struggle to personalize their resumes effectively, and employers are overwhelmed with generic applications. We believe that both parties deserve a more efficient and effective way to connect. "

## Diagrams
Use case diagram

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/use-case-diagram.png" alt="Use case diagram" style="max-width: 400px;"/>

Sequence diagram

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/sequence-diagram.png" alt="Sequence diagram" style="max-width: 400px;"/>

Project architecture

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/architecture.png" alt="Project architecture" style="max-width: 400px;"/>

## System Prompt

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/system-prompt.png" alt="System Prompt" style="max-width: 400px;"/>

 The system prompt aims to rewrite the experiences section to make it more impactful, clear, and aligned with professional standards. The goal is to highlight the candidate's achievements, skills, and responsibilities effectively, making the CV more appealing to potential employers.

The system prompt of Skills Suggestions is divided into several sections:

1. Objective
   - This subsection concisely states the overall goal of the task, which is to rewrite the experiences section of a CV to make it more impactful, clear, and aligned with professional standards.
   - It highlights the importance of enhancing the content to effectively showcase the candidate's achievements, skills, and responsibilities, ultimately making the CV more appealing to potential employers.

2. Instructions
The instructions emphasize understanding the context by retaining core details like job titles, company names, and employment dates, while tailoring the content to relevant job roles and highlighting applicable skills and achievements. Enhancing clarity and impact involves using action verbs, quantifying achievements when possible, and spotlighting key responsibilities and notable accomplishments.
3. Input Format
   - This subsection clearly defines the expected input format, which is a JSON structure containing an array of job experiences.
   - Each job experience includes the job title, company name, and an array of strings representing bullet points describing the user's responsibilities in that role.

4. Output Format
   - This subsection specifies the desired output format, which is a JSON structure with an array of strings.
   - Each string in the array represents multiple sentences separated by '\\n', where each sentence is an improved version of the original bullet point from the input.

5. Example
   - This subsection provides a concrete example to illustrate the expected input and output formats. It shows a sample input JSON with two job experiences and the corresponding desired output JSON with rewritten descriptions, following the specified formats.


## Interfaces
Authentication interface

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/Authentication-interface .png" alt="Authentication interface" style="max-width: 400px;"/>

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/Authentication-interface2.png" alt="Authentication interface" style="max-width: 400px;"/>

Upload Resume

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/Upload-CV.png" alt="Upload Resume" style="max-width: 400px;"/>

Fill Resume

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/Fill-resume.png" alt="Fill Resume" style="max-width: 400px;"/>

Job scoring

<img src="https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo/blob/main/assets/job-score.png" alt="Job scoring" style="max-width: 400px;"/>

> Run the project for full experience
The extension hasn't yet published on the chrome store. But you can follow this quick guide and install it manually.

### How to Generate and Add the Extension Manually to Your Browser
---
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/abdelhamid-labihi/Vectra-Web-Extension-Frontend-React-Plasmo.git
   cd Vectra-Web-Extension-Frontend-React-Plasmo
   ```

2. **Install Dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then, run:
   ```sh
   npm install
   ```

3. **Build the Extension:**
   To generate the desired files, run:
   ```sh
   npm run build
   ```

4. **Locate the Build Files:**
   After the build process completes, the generated files will be located in the `build/chrome-mv3-dev` directory.


5. **Add the Extension to Your Browser:**
   - **For Chrome:**
     1. Open Chrome and go to `chrome://extensions/`
     2. Enable "Developer mode" by toggling the switch in the top right corner.
     3. Click on "Load unpacked" and select the `chrome-mv3-dev` directory.

   - **For Firefox:**
     1. Open Firefox and go to `about:debugging#/runtime/this-firefox`.
     2. Click on "Load Temporary Add-on" and select any file from the `chrome-mv3-dev` directory.

6. **Verify the Extension:**
   The extension should now be added to your browser. You can verify it by checking the extensions list in your browser.

> **Note:** This tutorial assumes you are using a Unix-based system. For Windows, the commands might slightly differ.

Feel free to reach out if you encounter any issues during the setup process.

## Contributors

<table>
  <tr>
   <td align="center">
      <a href="https://github.com/abdelhamid-labihi">
        <img src="https://github.com/abdelhamid-labihi.png" width="100px;" alt="abdelhamid-labihi"/>
        <br />
        <sub><b>abdelhamid-labihi</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Issaminu">
        <img src="https://github.com/Issaminu.png" width="100px;" alt="Issaminu"/>
        <br />
        <sub><b>Issaminu</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/YassinMK">
        <img src="https://github.com/YassinMK.png" width="100px;" alt="YassinMK"/>
        <br />
        <sub><b>YassinMK</b></sub>
      </a>
    </td>
  </tr>
</table>
