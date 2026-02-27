import type { Request } from "express";

// утилиты обертки для типизации Request
export type RequestWithParamsType<T> = Request<T>;
export type RequestWithBodyType<T> = Request<{}, {}, T>;
export type RequestWithQueryType<T> = Request<{}, {}, {}, T>;
export type RequestWithParamsAndBodyType<T1, T2> = Request<T1, {}, T2>;
