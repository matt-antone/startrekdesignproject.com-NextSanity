export * from './blockContent'
export * from './post'
export * from './category'
export * from './page'
export * from './fields/youtube'
export * from './settings'
export * from './fields/image-link'
export * from './navigation'
export * from './navigation/link'
export * from './navigation/navItem'
export * from './fields/vimeo'

import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import { PostSchema } from './post'
import category from './category'
import pages from './page'
import { youtube } from './fields/youtube'
import settings from './settings'
import { linkImage } from './fields/image-link'
import navigation from './navigation'
import navLink from './navigation/link'
import navItem from './navigation/navItem'
import { vimeo } from './fields/vimeo'
import home from './home'
import timePeriod from './timePeriod'
import quadrant from './quadrant'
import universe from './universe'
import affiliation from './affiliation'
import types from './type'
import franchise from './franchise'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    /* singletons */
    home,
    settings,

    /* post types */
    pages,
    PostSchema,

    /* Taxonomies */
    timePeriod,
    quadrant,
    universe,
    affiliation,
    types,
    franchise,

    /* object types */
    blockContent,
    category,
    youtube,
    linkImage,
    navigation,
    navLink,
    navItem,
    vimeo,

  ],
}
