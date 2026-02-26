import type { Request } from "express";

// утилиты обертки для типизации Request
export type RequestWithParams<T> = Request<T>;
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
export type RequestWithParamsAndBody<T1, T2> = Request<T1, {}, T2>;
