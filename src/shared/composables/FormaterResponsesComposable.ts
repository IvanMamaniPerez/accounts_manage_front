export const useFormaterResponsesComposable = () => {
  const { t } = useI18n();
  interface ResponseErrorInterface {
    data: {
      [key: string]: string[];
    };
    message: string;
  }

  type FormatErrorUForm = {
    path: string;
    message: string;
  }

  function formatErrorResponseForForms(responseError: ResponseErrorInterface): FormatErrorUForm[] {
    let errors: FormatErrorUForm[] = [];
    for (const [key, value] of Object.entries(responseError.data)) {

      const valueTranslated = value.map((error: string) => {
        
        const keyTranslation = error.replaceAll(' ', '_').replaceAll('.', '').toLowerCase();
        
        return t(`validations.${keyTranslation}`);
      });


      errors.push({
        path: key,
        message: valueTranslated.join('\n')
      });
    }
    return errors;
  }

  return {
    formatErrorResponseForForms
  }

}
