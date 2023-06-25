export type Nullable<T> = T | null | undefined;
export type Constructor<T = {}> = new (...args: any[]) => T;

export class Handler {
    public static VOID = new Handler(() => null, this);

    private _func: Function;
    private readonly _caller: any;
    private readonly _params: any[];

    private constructor(func: Function, caller: any, ...params: any[]) {
        this._func = func;
        this._caller = caller;
        this._params = params;
    }

    public static create<T, Args extends any[]>(
        func: (...args: Args) => T,
        caller?: any,
        ...params: Partial<Args>
    ): Handler {
        return new Handler(func, caller, params);
    }

    public call(): void {
        this._func.apply(this._caller, ...this._params);
    }
}