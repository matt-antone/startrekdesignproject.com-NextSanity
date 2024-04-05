import { defineType } from 'sanity'
import * as fields from './fields'
import { FaMapSigns } from "react-icons/fa";



export default defineType({
  name: 'quadrant',
  title: 'Quadrant',
  type: 'document',
  icon: FaMapSigns,
  fields: [
    fields.title,
    fields.slug,
  ],
})