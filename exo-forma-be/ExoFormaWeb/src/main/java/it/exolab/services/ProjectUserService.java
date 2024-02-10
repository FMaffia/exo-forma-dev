package it.exolab.services;

import it.exolab.model.ProjectUser;
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


    public List<ProjectUser> getProjectsByUser(String idUser) {
        return projectUserRepository.getProjectsByUser(idUser);
    }

    public ProjectUser updateLastStep(ProjectUser requestBody, String idUser) {
        requestBody.setIdUser(idUser);
        return projectUserRepository.updateLastStep(requestBody);
    }
}
