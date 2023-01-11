package it.exolab.security;


import org.keycloak.adapters.KeycloakConfigResolver;
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration

public class GlobalConfiguration {

    @Bean
    public KeycloakConfigResolver KeycloakConfigResolver() {
        return new KeycloakSpringBootConfigResolver();
    }

//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http.
//                cors().and().csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/**").permitAll();
//             /*   .antMatchers("/login").hasRole("ADMIN")
//                .antMatchers("/Signup").hasRole("USER");*/
//    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        String FRONT_END_HOST = "http://localhost:3000";
//        configuration.setAllowedOrigins(Arrays.asList(FRONT_END_HOST));
///*
//        configuration.setAllowedOrigins(Arrays.asList("*")); //or add * to allow all origins
//*/
//        configuration.setAllowCredentials(true);
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); //to set allowed http methods
//        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
//        configuration.setExposedHeaders(Arrays.asList("custom-header1", "custom-header2"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
}
