package it.exolab.services;

import it.exolab.model.document.StepDocument;
import it.exolab.model.dto.StepDto;
import it.exolab.repository.ProjectRepository;
import it.exolab.repository.StepRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class StepService {
    private final StepRepository stepRepository;
    private final ProjectRepository projectRepository;


    public List<StepDocument> getStepsByIdProject(String idString) {
        return this.stepRepository.getStepsByIdProject(idString);
    }

    public StepDto getStepById(String idString) {
        this.stepRepository.getStepById(idString);
        return (StepDto) this.stepRepository.getStepById(idString);
    }


    public StepDto updateStep(StepDto stepRequest) {
        return stepRepository.updateStep(stepRequest);
    }

    public StepDto insertStep(StepDto stepRequest) {
        return stepRepository.insertStep(stepRequest);

    }
}
