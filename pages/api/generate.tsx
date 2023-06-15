export default function handler(req: any, res: any) {
  // Process the request and generate the JSON response
  const response = {
    experience_comments:
      'Based on your experience of 1.5 years, you have very little experience compared to the 10+ years needed for the job. Your score is 1 out of 10.',
    experience_match_score: 9,
    experience_points:
      'You need at least 8.5 more years of experience to improve your chances of being selected for this job.',
    skills_comments:
      'There is very little overlap between your skills and the required skills for the job. Your skills are more focused on technical areas such as Machine Learning, Data Engineering, Cloud Computing, and Search Engine Optimization, whereas the required skills are more focused on finance and data analysis tools. You may want to highlight any experience you have with SQL, Python, or financial reporting to show some familiarity with the required skills.',
    skills_match_score: 2,
    skills_points:
      'Consider learning some of the data analysis tools listed such as Tableau, SAS, and Alteryx. Additionally, highlighting any experience in corporate finance or loan/deposit pricing may also improve your chances.',
    summary_comments:
      "There is some overlap between your work experience and the job description, but there are significant differences as well. While you have experience in end-to-end machine learning solutions, the job is focused on financial analysis and requires skills in Excel, Tableau, and automation tools. Additionally, you should have knowledge in retail banking and products and at least one of the team's key treasury and corporate finance content areas. ",
    summary_match_score: 3,
    summary_points:
      'To better align your resume with this job description, you should highlight any experience you have with financial analysis and tools like Excel, Tableau, and Alteryx. It would also be helpful to emphasize your knowledge of retail banking and products. Consider adding specific examples of your experience in these areas.',
    title_comments:
      'Based on the information provided, your previous role as a Senior Data Scientist has some transferable skills to Treasury Analytics. However, the job titles are not an exact match and it seems that you may not have direct experience in this specific role.',
    title_match_score: 7,
    title_points: [
      'Emphasize transferable skills in your resume that are relevant to the Treasury Analytics role',
      'Highlight any experience you may have with financial data analysis',
      'Consider taking relevant courses or certifications to strengthen your qualifications for this role',
    ],
  };

  res.status(200).json(response);
}
