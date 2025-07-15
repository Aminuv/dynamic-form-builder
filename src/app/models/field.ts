import { Type } from "@angular/core";
import test from "node:test";

export interface FieldTypesDefinition {
    type: string;
    label: string;
    icon?: string;
    defaultConfig?: any;
    settingsConfig: FieldSettingsDefinition[];
    component: Type<unknown>;
}

export interface FieldSettingsDefinition {
    type: 'text' | 'checkbox' | 'select';
    key: string;
    label: string;
    options?: OptionItem[];
}

export interface OptionItem {
    label: string;
    value: string;
}

export interface FormField {
    id: string;
    type: string;
    label: string;
    required: boolean;
    inputType?: string;
    placeholder?: string;
}
