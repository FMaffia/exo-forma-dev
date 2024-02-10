package it.exolab.utility;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;

import java.util.function.Supplier;

@Slf4j
public class ControlledRestResponse {
    public ResponseEntity<?> controlledResponse(Supplier<?> restFunc) {
        try {
            return ResponseEntity.ok(restFunc.get());
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }
}
