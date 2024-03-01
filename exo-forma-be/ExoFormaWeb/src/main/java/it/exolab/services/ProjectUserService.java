package it.exolab.services;

import it.exolab.model.document.ProjectUserDocument;
import it.exolab.model.request.MyProjectRequest;
import it.exolab.model.view.MyProjectCard;
import it.exolab.repository.ProjectUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProjectUserService {
    private final ProjectUserRepository projectUserRepository;


    public List<MyProjectCard> getProjectsByUser(String idUser) {
        return projectUserRepository.getProjectsByUser(idUser);
    }

    public boolean updateLastStep(ProjectUserDocument requestBody) {
        return projectUserRepository.updateLastStep(requestBody) > 0;
    }

    public ProjectUserDocument startProject(MyProjectRequest requestBody) {
        return projectUserRepository.insertMyProject(requestBody);
    }
}
