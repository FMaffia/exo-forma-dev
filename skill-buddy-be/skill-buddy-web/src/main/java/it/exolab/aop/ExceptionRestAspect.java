package it.exolab.aop;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExceptionRestAspect {
 /*   @Pointcut("within(it.exolab.controller..*)")
    public void applicationPackagePointcut() {
    }

    @Around("applicationPackagePointcut()")
    public Object exceptionRest(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        Object[] args = proceedingJoinPoint.getArgs();
        try {
            Object response = proceedingJoinPoint.proceed(args);
            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.internalServerError().build();
        }
    }*/
}
