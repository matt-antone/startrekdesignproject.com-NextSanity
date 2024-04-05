import { ComponentType } from "react";
import { ConfigContext } from "sanity";
import { ListItemBuilder } from "sanity/structure";
import { Plugin as Plugin_2 } from "sanity";
import { StructureBuilder } from "sanity/structure";

export declare const filteredDocumentListItems: (
  config: SingletonPluginListItemsConfig,
) => ListItemBuilder[];

export declare const singletonDocumentListItem: (
  config: SingletonDocumentListItemConfig,
) => ListItemBuilder;

declare interface SingletonDocumentListItemConfig {
  S: StructureBuilder;
  context: ConfigContext;
  type: string;
  title?: string;
  id?: string;
  icon?: ComponentType;
}

export declare const singletonDocumentListItems: (
  config: SingletonPluginListItemsConfig,
) => ListItemBuilder[];

declare interface SingletonPluginListItemsConfig {
  S: StructureBuilder;
  context: ConfigContext;
}

export declare const singletonTools: Plugin_2<void>;

export {};
