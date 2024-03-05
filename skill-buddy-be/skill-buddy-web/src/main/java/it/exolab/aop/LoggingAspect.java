package it.exolab.aop;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

@Aspect
@Component
@Slf4j
public class LoggingAspect {
    @Pointcut("within(it.exolab.controller..*)")
    public void applicationPackagePointcut() {
    }

    @Around("applicationPackagePointcut()")
    public Object invoke(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        log.info("@LOGGING ASPECT -----> Inizio metodo: {}()", methodSignature.getName());
        Object[] args = proceedingJoinPoint.getArgs();
        if (args != null && args.length > 0) {
            Map<String, Object> params = this.getParametersAndArgs(args, methodSignature.getParameterNames());
            log.info("@LOGGING ASPECT ----->  Parametri:");
            params.forEach((k, v) -> log.info("\t\t{}={}", k, v));
        } else {
            log.info("@LOGGING ASPECT ----->  Parametri assenti");
        }

        Object result = proceedingJoinPoint.proceed();
        if (result instanceof ResponseEntity) {
            ResponseEntity<?> responseEntity = (ResponseEntity<?>) result;
            log.debug("@LOGGING ASPECT ----->  Response: Status {}", responseEntity.getStatusCode());
        }
        return result;
    }

    public Map<String, Object> getParametersAndArgs(Object[] args, String[] parameterNames) {
        Map<String, Object> map = new HashMap<>();
        IntStream.range(0, parameterNames.length).forEach(index -> map.put(parameterNames[index], args[index]));
        return map;
    }

}
