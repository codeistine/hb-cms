const configFunction = (which) => {
    let config = '';
    const baseUrl = 'https://us-central1-cl-poc-bet.cloudfunctions.net';
    if (which === 'stg') {
      return config = {
        login: `${baseUrl}/hb-login-stg`,
        transactions: `${baseUrl}/hb-transactions-stg`,
        tupad: `${baseUrl}/hb-tupad-stg/form`,
        responder: `${baseUrl}/responderv2-stg`,
        exportTransaction: `${baseUrl}/hb-export-stg`,
        fraud: `${baseUrl}/fraud-stg/duplicate`,
      };
    } else {
      return config = {
        login: `${baseUrl}/hb-login`,
        transactions: `${baseUrl}/hb-transactions`,
        tupad: `${baseUrl}/hb-tupad/form`,
        responder: `${baseUrl}/responderv2`,
        exportTransaction: `${baseUrl}hb-export`,
        fraud: `${baseUrl}/fraud/duplicate`,
      };
    }
  };

  export const config = configFunction('prod');

