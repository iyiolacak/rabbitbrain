export class ErrorBase<T extends string> extends Error {
  constructor(
    public type: T,
    public message: string,
    public code?: string,
    public meta?: Record<string, unknown>
  ) {
    super(message);
  }
}
