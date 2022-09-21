#!/usr/bin/env node

import process from 'node:process';

/** メタデータ型 */
export type Meta = {
  /** もともとのコマンドライン引数 */
  readonly arguments: string[];
  
  /** オプション指定されなかった引数 */
  readonly list: readonly string[];

  /** オプション */
  readonly options: { readonly [name: string]: string | true };

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
export function getMeta(): Meta {
  const argv = process.argv as [string, string, ...string[]];
  const opts: { [name: string]: string | true } = Object.create(null);
  const list: string[] = [];
  let before: string | null = null;
  for(const [idx, arg] of argv.entries()) {
    if(idx < 2) continue; // [ nodejs path, source path, ...arguments ]
    if(/^--/.test(arg) && arg != '--') {
      if(before)
        opts[before] = true;
      before = arg.substring(2);
      continue;
    }
    if(/^-[a-zA-Z_:]+/.test(arg)) {
      const list = arg.substring(1).split('') as [string, ...string[]];
      if(list.length == 1) {
        if(before)
          opts[before] = true;
        before = list[0];
        continue;
      }
      for(const char of list)
        opts[char] = true;
      continue;
    }
    if(before) {
      opts[before] = arg;
      before = null;
      continue;
    }
    list.push(arg);
  }

  return {
    arguments: argv,
    list,
    options: opts,
    paths: {
      nodejs: argv[0],
      source: argv[1],
      current: process.cwd(),
    },
  };
}
