import {Dispatch, SetStateAction} from "react";

declare type Nullable<T> = T | null;
declare type StateSetter<T> = Dispatch<SetStateAction<T>>;
declare type RouterStateHook<T = string> = [T, Dispatch<T>];


declare type PatternResolver = (location: string) => string;
declare type ParamResolver = (param: string, defaultValue: string) => string;

declare type NavigationParams = Record<string, string | undefined>;

declare type Serializer<T> = (value: T) => string;
declare type Deserializer<T> = (value?: string) => Nullable<T>;
