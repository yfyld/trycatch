export interface IStack{
  url: string;
    func: string;
    line: number;
    column: number;
    args: string[];
}


export interface ISourceCode{
    name: string;
    line: number;
    column: number;
    code: string;
    sourceUrl:string;
}
