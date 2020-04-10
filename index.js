const button = document.querySelector('button');

const observer = {
  next: function (value) {
    console.log(value);
  },
  error: function (error) {
    console.log(error);
  },
  complete: function () {
    console.log('Complete');
  },
};

Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .map((event) => event.clientX)
  .subscribe(observer);

// #1. Create own observer

console.log('#1. Create own observer, with error');

Rx.Observable.create(function (obs) {
  obs.next('A value');
  obs.error('Error! Nothing be executed after me at this observer');
  obs.next('A second value'); // Never be done, because of error occured early
}).subscribe(observer);

console.log('#1. Create own observer, with complete');

Rx.Observable.create(function (obs) {
  obs.next('A value');
  obs.complete(
    'Complete! Nothing be executed after me at this observer',
  );
  obs.next('A second value'); // Never be done, because of observer has completed
}).subscribe(observer);

console.log(
  '#1. Create own observer, with complete. All "next" calls will be done',
);

Rx.Observable.create(function (obs) {
  obs.next('A value');
  setTimeout(() => obs.complete('Complete'), 2000);
  obs.next('A second value');
}).subscribe(observer);

console.log(
  '#1. Create own observer. Recreates "fromEvent" observer. Unsubscribes after 8 seconds',
);

const subscription = Rx.Observable.create(function (obs) {
  button.onclick = (event) => {
    obs.next(event);
  };
}).subscribe(observer);

setTimeout(() => subscription.unsubscribe(), 8000);
