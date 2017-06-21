var worker = new Worker('doWork.js');

worker.addEventListener('message', function(e) {
    console.log('Worker said: ', e.data);
}, false);

worker.postMessage('Hello World'); // Send data to our worker.