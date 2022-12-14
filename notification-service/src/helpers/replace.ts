export type Replace<V, K> = Omit<V, keyof K> & K;
