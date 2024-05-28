import { defineType } from 'sanity'
import * as fields from './fields'
import { GiAtom } from "react-icons/gi";



export default defineType({
  name: 'designer',
  title: 'Designer',
  type: 'document',
  icon: GiAtom,
  fields: [
    fields.title,
    fields.slug,
  ],
})