#!/usr/bin/env node
/** メタデータ型 */
export declare type Meta = {
    /** もともとのコマンドライン引数 */
    readonly arguments: string[];
    /** オプション指定されなかった引数 */
    readonly list: readonly string[];
    /** オプション */
    readonly options: {
        readonly [name: string]: string | true;
    };
    /** パス */
    readonly paths: {
        /** nodejsのパス */
        readonly nodejs: string;
        /** 実行されたソースコードのパス */
        readonly source: string;
        /** カレントディレクトリ */
        readonly current: string;
    };
};
/**
 * メタデータの取得
 */
export declare function getMeta(): Meta;
