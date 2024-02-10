package it.exolab.services;

import it.exolab.model.Project;
import it.exolab.model.StepProject;
import it.exolab.model.request.IdRequest;
import it.exolab.model.request.StepRequest;
import it.exolab.model.view.ProjectCard;
import it.exolab.repository.ProjectRepository;
import it.exolab.repository.ProjectUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final ProjectUserRepository projectUserRepository;

    public List<ProjectCard> findAll(String idUser) {
        return projectRepository.findAll(idUser);
    }

    public Project getProjectById(IdRequest idRequest) {
        return this.projectRepository.getProjectById(idRequest);
    }

    public List<StepProject> getStepsByIdProject(String id, String idUser) {
        return this.projectRepository.getStepsByIdProject(id, idUser).getSteps();
    }

    public StepProject getStepByIndexAndIdProject(String id, int stepIndex, String idUser) {
        StepProject step = this.projectRepository.getStepByIndexAndIdProject(id, stepIndex);
        int lastStep = this.projectUserRepository.getLastStep(id, idUser).getLastStep();
        step.setCompleted(stepIndex < lastStep);
        return step;
    }

    public Project save(Project project, String name) {
        project.setAuthor(name);
        project.setPath(project.getTitle().replace(" ", ""));
        return projectRepository.updateProject(project);
    }

    public boolean saveStep(StepRequest stepRequest) {
        return projectRepository.saveStep(stepRequest) > 0;
    }
}
