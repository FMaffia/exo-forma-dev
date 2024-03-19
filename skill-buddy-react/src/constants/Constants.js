import Keycloak from 'keycloak-js'

export const keyCloak = new Keycloak('/keycloak.json')

export const EDITOR_ROLE = "Editor"
export const READER_ROLE = "Reader"
export const ADMIN_ROLE = "Admin"
