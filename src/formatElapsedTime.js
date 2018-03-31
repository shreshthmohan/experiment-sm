
export const formatElapsedTime = (elapsedMilliSeconds) => {
    let parsedTime = parseInt(elapsedMilliSeconds, 10);
    if (isNaN(parsedTime)) {
      return '00:00.00';
    }
  
    // Format - Time less than an hour
    // '00:00.00'
    //  mm:ss.cc

    let formattedTime = '';
    const milliSeconds = parsedTime % 1000;
    const centiSeconds = Math.floor(milliSeconds / 10);
  
    // appending '0' at beginning if value smaller than 10
    // and adding centiseconds value
    formattedTime = (centiSeconds < 10 ? '0' + centiSeconds : centiSeconds) + formattedTime;
  
    // Time in seconds
    parsedTime = Math.floor(parsedTime / 1000);

    const seconds = parsedTime % 60;
    formattedTime = (seconds < 10 ? '0' + seconds : seconds) + '.' + formattedTime;
  
    // Time in minutes
    parsedTime = Math.floor(parsedTime / 60);

    const minutes = parsedTime % 60;
    formattedTime = (minutes < 10 ? '0' + minutes : minutes) + ':' + formattedTime;  
  
    // Format - Time more than 1 hour
    // '00:00:00.00'
    //  hh:mm:ss.cc

    // Time in hours
    parsedTime = Math.floor(parsedTime / 60);

    if (parsedTime ===  0) {
      return formattedTime;
    } else {
      const hours = parsedTime % 100;
      formattedTime = (hours < 10 ? '0' + hours : hours) + ':' + formattedTime;
      return formattedTime;
    }
  }
  