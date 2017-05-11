import parse from 'parse-location'
import transition from './transition'

export default async ({
  location,
  ...options
}) => (
  transition({
    ...options,
    location: parse(location),
  })
)
