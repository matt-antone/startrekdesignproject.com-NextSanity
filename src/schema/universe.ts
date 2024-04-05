import { defineType } from 'sanity'
import * as fields from './fields'
import { TbUniverse } from "react-icons/tb";




export default defineType({
  name: 'universe',
  title: 'Universe',
  type: 'document',
  icon: TbUniverse,
  fields: [
    fields.title,
    fields.slug,
  ],
})