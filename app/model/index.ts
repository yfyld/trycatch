export interface IUserModel {
    mobile: string,
    password: string,
    name: string,
    id: number
}

export interface IProjectModel {
    id: number,
    name: string,
    language: string,
    frame: string,
    member: string

}

export interface IErrorModel {
    id: number,
    logId: string,
    status: string,
    count: number
}