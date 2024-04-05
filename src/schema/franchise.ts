import { defineType } from 'sanity'
import * as fields from './fields'
import { PiTelevisionFill } from "react-icons/pi";



export default defineType({
  name: 'franchise',
  title: 'Franchise',
  type: 'document',
  icon: PiTelevisionFill,
  fields: [
    fields.title,
    fields.slug,
  ],
})