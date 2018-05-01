export interface Table {
    columns: Column[];
    readOnly: boolean;
}

export interface Column {
    title: string;
    nameData?: string;
    config?: Config;
    style?: {
      className?: string;
    };
}

export interface Config {
    mathValueToString?: {
        resultView: string[];
        nameDatas: any[];
        expected: any[];
        default: string;
        join?: boolean;
    };

    idToView?: {
        list: object[];
        idList: string;
        idObject: string ;
        nameData: string;
    };
}