import { defineType } from 'sanity'
import * as fields from './fields'
import { RiSparkling2Fill } from "react-icons/ri";



export default defineType({
  name: 'affiliation',
  title: 'Affiliation',
  type: 'document',
  icon: RiSparkling2Fill,
  fields: [
    fields.title,
    fields.slug,
  ],
})