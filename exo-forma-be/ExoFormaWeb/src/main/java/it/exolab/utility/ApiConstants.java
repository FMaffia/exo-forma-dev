package it.exolab.utility;

public class ApiConstants {

    private final static String BASE_REST = "/exo-forma-be/api/v1";

    public static class Project {
        public final static String BASE = BASE_REST + "/projects";
        public final static String ALL_PROJECT = "/all";
        public final static String PROJECT_BY_ID = "/findById";
        public final static String ALL_STEPS = "/steps";
        public final static String STEP_DETAILS = "steps/{stepIndex}";
        public final static String UPDATE = "/update";
        public final static String INSERT = "/insert";
        public final static String UPDATE_STEP = "/update/step";
    }

    public static class UserProject {
        public final static String BASE = BASE_REST + "/myProjects";

        public final static String UPDATE_LAST_STEP = "/updateLastStep";
    }

    public static class Utility {
        public final static String BASE = BASE_REST + "/utility";

        public final static String GET_ALL_CATEGORIES = "/categories";
    }

}