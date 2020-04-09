const button = document.querySelector('button');

Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .map((event) => event.clientX)
  .subscribe(
    (coord) => console.log(`The client X coordinate is ${coord}`),
    (error) => console.error(error.message),
  );
