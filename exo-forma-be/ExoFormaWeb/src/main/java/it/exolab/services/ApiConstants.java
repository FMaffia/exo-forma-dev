package it.exolab.services;

public class ApiConstants {

    public static class Project {
        public final static String ALL_PROJECT = "/all";
        public final static String PROJECT_DETAILS = "/path/{path}";
        public final static String ALL_STEPS = "/steps/{projectId}";
        public final static String STEP_DETAILS = "/{projectId}/step/{stepIndex}";
        public final static String INSERT = "/insert";
    }

    public static class UserProject {
        public final static String UPDATE_LAST_STEP = "/updateLastStep";
    }

    public static class User {
        public final static String CHECK = "/check";
    }
}
