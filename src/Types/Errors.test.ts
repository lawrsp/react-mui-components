import { APIError, FormError } from './Errors';

test('test APIError types', () => {
  const err = new APIError();
  expect(err instanceof Error).toBeTruthy();
  expect(err instanceof APIError).toBeTruthy();
  expect(err.name).toBe('APIError');
  expect(err.code).toBe(-1);
  expect(err.status).toBeUndefined();
  expect(err.message).toBe('');
  expect(err.fields).toBeUndefined();

  const formError: FormError = new APIError('hello form');
  expect(formError.fields).toBeUndefined();
  expect(formError.message).toBe('hello form');

  const customFormError: FormError = {
    message: 'custom',
    fields: [{ field: 'field1', message: 'error' }],
  };

  expect(customFormError.fields?.length).toBe(1);
  expect(customFormError.message).toBe('custom');
});
