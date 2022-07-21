export type MenuObject = {
    menuLabel: string,
    order: number,
    path: string,
    icon?: any
}
export type TabDetail = {
    title: string,
    label: string,
    index: number,
    icon: any,
    body?: any
}
export const emptyProject = {
    authors: '',
    carousel: [],
    categories: [],
    creationDate: '',
    desc: '',
    descBreve: '',
    difficult: 0,
    order: 0,
    path: '',
    published: false,
    steps: [],
    lastStep: 0,
    stepsCount: 0,
    title: ''
}

export type Project = {
    id?: string | undefined,
    title: string,
    order: number,
    descBreve: string,
    desc: string,
    categories: string[],
    carousel: string[],
    authors: string,
    creationDate: string,
    difficult: number,
    published?: boolean,
    path: string,
    steps: Steps[],
    lastStep: number,
    stepsCount: number
}
export type Steps = StepView & {
    id: string,
    desc: string,
    done: boolean,
    attachment: Attachments
}
export type StepView = {
    completed?: boolean,
    title: string,
    number: number,
    index: number
}

export type ProjectUser = {
    idProject: string,
    idUser: string,
    lastStep: number
}
export type Attachments = {
    idDoc: string,
    nameFile: string,
    extension: string,
    contents: Blob
}

export type SpringResponse =
    | {
          result: any,
          success: boolean
      }
    | { result: any, success: boolean, errorCode: any }
    | { success: boolean }
export type StepProject = {
    number: number,
    title: string,
    desc: string,
    completed: boolean,
    link: string,
    attachment: undefined | Attachment
}
export type Attachment = {
    idDoc: number,
    nameFile: string,
    extension: string,
    contents: Blob
}
export type User = {
    id?: string,
    username?: string,
    pass?: string,
    email?: string,
    permissions?: string[]
}

export type Message = {
    show: boolean,
    type?: string,
    body: string
}
export type Social = {
    link: string,
    src: string,
    title: any,
    subTitle: string
}
export type MenuDoc = {
    items: MenuObject[]
}

export interface UiState {
    loading: boolean;
    loaders: string[];
    message: Message;
    menu: MenuObject[];
}

export type Image = {
    img: string,
    title: string,
    author?: string,
    rows: number,
    cols: number
}

export interface ResponseGenerator {
    config?: any;
    data?: any;
    headers?: any;
    request?: any;
    status?: number;
    statusText?: string;
}

export interface FormProps {
    currentProject: Project;
    setField: any;
}
