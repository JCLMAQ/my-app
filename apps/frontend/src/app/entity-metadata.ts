import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';

const appEntityMetadata: EntityMetadataMap = {
//  User: {},

};

const pluralNames = {
  // Hero: 'Heroes'
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata: appEntityMetadata,
  pluralNames
};
