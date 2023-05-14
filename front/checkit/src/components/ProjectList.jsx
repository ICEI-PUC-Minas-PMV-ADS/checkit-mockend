import { useEffect, useState } from 'react';
import { getAllProjects, getTaskbyProject } from "../services/Api.js";


function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const projectResponse = await getAllProjects();
        const projectsWithTasks = await Promise.all(projectResponse.map(async (project) => {
          const taskResponse = await getTaskbyProject(project.id);
          return { ...project, tasks: taskResponse };
        }));
        setProjects(projectsWithTasks);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return projects;
}

export default ProjectList;
