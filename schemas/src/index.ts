/**
 * Exact型は、Tの構造をShapeの構造に厳密に一致させるためのユーティリティ型。
 * つまり、Shapeに存在するキーを持つことになる。
 */
export type Exact<T, Shape> = {
    [K in keyof T]: K extends keyof Shape ? T[K] : never;
};

// TとKが互いにShapeのサブセットであることをチェックする
// つまり、TとKが厳密に同じ型であることをチェックする
export type SameType<T,K> = Exact<T, K> & Exact<K,T >;
