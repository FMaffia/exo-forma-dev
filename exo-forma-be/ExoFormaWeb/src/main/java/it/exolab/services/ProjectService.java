package it.exolab.services;

import it.exolab.model.document.ProjectDocument;
import it.exolab.model.request.IdRequest;
import it.exolab.model.request.ProjectRequest;
import it.exolab.model.view.ProjectCard;
import it.exolab.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<ProjectCard> findAll() {
        return projectRepository.findAll();
    }

    public ProjectDocument getProjectById(IdRequest idRequest) {
        return this.projectRepository.getProjectById(idRequest);
    }


    public ProjectDocument save(ProjectRequest project, String idUser) {
        project.setAuthor(idUser);
        project.setCreationDate(LocalDateTime.now());
        project.setIdString(null);
        return projectRepository.save(project);
    }


    public ProjectDocument update(ProjectRequest project, String idUser) {
        project.setAuthor(idUser);
        project.setCreationDate(LocalDateTime.now());
        return projectRepository.update(project);
    }

}
