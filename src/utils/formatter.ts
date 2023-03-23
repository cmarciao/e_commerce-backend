export function errorListFormatter(errorsList: string[]): string {
    const messageErrorList = errorsList.reduce((accumulator, current) => (`${accumulator}${current}, `), '');
    const formattedMessage = messageErrorList.substring(0, messageErrorList.length - 2);
    const messageError = `These properties can not be null: ${formattedMessage}.`;

     return messageError;
    
}