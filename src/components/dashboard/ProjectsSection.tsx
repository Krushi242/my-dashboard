import type { Project } from '../../types';
import './ProjectsSection.css';

interface ProjectsSectionProps {
  projects: Project[];
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <div className="project-card__header">
        <span className="project-card__name">{project.name}</span>
        <button className="project-card__view-btn">View Project</button>
      </div>
      <div className="project-card__client">
        <div className="project-card__client-avatar">
          {project.clientName.charAt(0)}
        </div>
        <div>
          <div className="project-card__client-name">{project.clientName}</div>
          <div className="project-card__client-role">{project.clientRole}</div>
        </div>
      </div>
      <p className="project-card__desc">{project.description}</p>
      <div className="project-card__footer">
        <span className="project-card__deadline-dot" />
        <span className="project-card__deadline-label">Deadline</span>
        <span className="project-card__deadline-date">{project.deadline}</span>
      </div>
    </div>
  );
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <div className="projects-section">
      <div className="projects-section__header">
        <h2 className="projects-section__title">Projects</h2>
        <select className="projects-section__filter">
          <option>All Projects</option>
          <option>Active</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>
      </div>
      <div className="projects-section__grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
