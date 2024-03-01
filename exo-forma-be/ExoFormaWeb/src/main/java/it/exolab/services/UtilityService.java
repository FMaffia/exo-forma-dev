package it.exolab.services;

import it.exolab.repository.UtilityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UtilityService {
    private final UtilityRepository utilityRepository;

    public String test() {
        return "Hello World";
    }

    public List<String> getAllProjectCategories() {
        return utilityRepository.getAllProjectCategories();
    }
}
