export interface ErrorInterface<T> {
  error: T;
  reset: () => void;
}
