package it.exolab.services;

public class ApiConstants {

    public static class Project {
        public final static String ALL_PROJECT = "/all";
        public final static String PROJECT_BY_ID = "/find";
        public final static String PROJECT_DETAILS = "/path/{path}";
        public final static String ALL_STEPS = "/steps/{projectId}";
        public final static String STEP_DETAILS = "steps/{projectId}/step/{stepIndex}";
        public final static String UPDATE = "/update";
        public final static String UPDATE_STEP = "/update/step";
        public final static String UPLOAD_IMAGE = "/uploadImage";
        public final static String GET_IMAGE = "/image/{id}";
    }

    public static class UserProject {
        public final static String UPDATE_LAST_STEP = "/updateLastStep";
    }

    public static class Utility {
        public final static String GET_ALL_CATEGORIES = "/categories";
    }

}
