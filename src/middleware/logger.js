const logger = (message) => {
    const logEntry = `${new Date().toISOString()} - ${message}`;
    document.body.insertAdjacentHTML('beforeend', `<div hidden>${logEntry}</div>`);
  };
  
  export default logger;