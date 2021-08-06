
export const ERROR_CODES_MESSAGES = {
  0: {
    heading: '',
    description: '',
    code: 0,
  },
  401: {
    heading: 'Błąd autoryzacji',
    description: 'Sprawdź dane i spróbuj ponownie',
    code: 401,
  },
  403: {
    heading: 'Błąd sesji',
    description: 'Zaloguj się ponownie',
    code: 403,
  },
  500: {
    heading: 'Błąd serwera',
    description: 'Spróbuj ponownie później',
    code: 500,
  },
  503: {
    heading: 'Serwer niedostępny',
    description: 'Spróbuj ponownie później',
  },
};

export default class AppError extends Error {
  constructor(code) {
    super(ERROR_CODES_MESSAGES[code].heading);
    this.code = code;
    this.description = ERROR_CODES_MESSAGES[code].description;
  }
}
