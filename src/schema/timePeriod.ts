import { defineType } from 'sanity'
import * as fields from './fields'
import { BsCalendarDateFill } from "react-icons/bs";



export default defineType({
  name: 'timePeriod',
  title: 'Time Periods',
  type: 'document',
  icon: BsCalendarDateFill,
  fields: [
    fields.title,
    fields.slug,
  ],
})