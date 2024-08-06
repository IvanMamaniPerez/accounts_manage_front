import { ComponentTypesEnum } from "../enums/component_types_enum";

export type ComponentClassesBaseType = {
    [key in ComponentTypesEnum]: string[]; // Los valores son arreglos de strings
  };