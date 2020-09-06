import { shape, string, arrayOf } from 'prop-types';

const countryType = shape({
  id: string.isRequired,
  full_name_english: string.isRequired,
  full_name_locale: string.isRequired,
  two_letter_abbreviation: string.isRequired,
  three_letter_abbreviation: string.isRequired,
  available_regions: arrayOf(shape({
    id: string.isRequired,
    code: string.isRequired,
    name: string.isRequired
  }))
});

export default countryType;
