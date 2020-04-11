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

// #2. Using operators

console.log('#3. Using operators. filter()');

const observable1 = Rx.Observable.interval(1000);

const observer1 = {
  next: (value) => {
    console.log('#observer1 => ', value);
  },
  error: (error) => {
    console.error('#observer1 => ', error);
  },
};

observable1.filter((value) => value % 2 === 0).subscribe(observer1);

console.log('#2. Using operators. map()');

const observable0 = Rx.Observable.interval(1000);
const observer0 = {
  next: (value) => {
    console.log(value);
  },
};

observable0
  .map((value) => {
    return `Number: ${value}`;
  })
  .throttleTime(2000)
  .subscribe(observer0);

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
