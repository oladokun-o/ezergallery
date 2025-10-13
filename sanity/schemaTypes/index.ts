import {album} from './album'
import {product} from './product'
import portrait from './portrait'
import {type SchemaTypeDefinition} from 'sanity'
import brand from './brand'
import art from './art'
import {contactSubmission} from './contactSubmission'
import testimonial from './testimonial'
import {latestPhotography} from './latestPhotography'
import { order } from './order'

export const schemaTypes: SchemaTypeDefinition[] = [
  album,
  product,
  portrait,
  brand,
  art,
  contactSubmission,
  testimonial,
  latestPhotography,
  order,
]
