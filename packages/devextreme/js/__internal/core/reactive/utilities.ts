/* eslint-disable spellcheck/spell-checker */
import { interruptableComputed, Observable, toSubscribable } from './core';
import { type Subscription, SubscriptionBag } from './subscription';
import type {
  Gettable, MaybeSubscribable, Subscribable, Updatable,
} from './types';

export function state<T>(value: T): Subscribable<T> & Updatable<T> & Gettable<T> {
  return new Observable<T>(value);
}

export function computed<T1, TValue>(
  compute: (t1: T1) => TValue,
  deps: [Subscribable<T1>]
): Subscribable<TValue> & Gettable<TValue>;
export function computed<T1, T2, TValue>(
  compute: (t1: T1, t2: T2) => TValue,
  deps: [Subscribable<T1>, Subscribable<T2>]
): Subscribable<TValue> & Gettable<TValue>;
export function computed<T1, T2, T3, TValue>(
  compute: (t1: T1, t2: T2, t3: T3,) => TValue,
  deps: [Subscribable<T1>, Subscribable<T2>, Subscribable<T3>]
): Subscribable<TValue> & Gettable<TValue>;
export function computed<T1, T2, T3, T4, TValue>(
  compute: (t1: T1, t2: T2, t3: T3, t4: T4) => TValue,
  deps: [Subscribable<T1>, Subscribable<T2>, Subscribable<T3>, Subscribable<T4>]
): Subscribable<TValue> & Gettable<TValue>;
export function computed<TArgs extends readonly any[], TValue>(
  compute: (...args: TArgs) => TValue,
  deps: { [I in keyof TArgs]: Subscribable<TArgs[I]> },
): Subscribable<TValue> & Gettable<TValue> {
  return interruptableComputed(compute, deps);
}

export function effect<T1>(
  compute: (t1: T1) => ((() => void) | void),
  deps: [Subscribable<T1>]
): Subscription;
export function effect<T1, T2>(
  compute: (t1: T1, t2: T2) => ((() => void) | void),
  deps: [Subscribable<T1>, Subscribable<T2>]
): Subscription;
export function effect<T1, T2, T3>(
  compute: (t1: T1, t2: T2, t3: T3,) => ((() => void) | void),
  deps: [Subscribable<T1>, Subscribable<T2>, Subscribable<T3>]
): Subscription;
export function effect<T1, T2, T3, T4>(
  compute: (t1: T1, t2: T2, t3: T3, t4: T4) => ((() => void) | void),
  deps: [Subscribable<T1>, Subscribable<T2>, Subscribable<T3>, Subscribable<T4>]
): Subscription;
export function effect<TArgs extends readonly any[]>(
  compute: (...args: TArgs) => ((() => void) | void),
  deps: { [I in keyof TArgs]: Subscribable<TArgs[I]> },
): Subscription {
  const depValues: [...TArgs] = deps.map(() => undefined) as any;
  const depInitialized = deps.map(() => false);
  let isInitialized = false;

  const subscription = new SubscriptionBag();

  deps.forEach((dep, i) => {
    subscription.add(dep.subscribe((v) => {
      depValues[i] = v;

      if (!isInitialized) {
        depInitialized[i] = true;
        isInitialized = depInitialized.every((e) => e);
      }

      if (isInitialized) {
        compute(...depValues);
      }
    }));
  });

  return subscription;
}

export function iif<T>(
  cond: MaybeSubscribable<boolean>,
  ifTrue: MaybeSubscribable<T>,
  ifFalse: MaybeSubscribable<T>,
): Subscribable<T> {
  const obs = state<T>(undefined as any);
  let subscription: Subscription | undefined;

  toSubscribable(cond).subscribe((cond) => {
    subscription?.unsubscribe();
    const newSource = cond ? ifTrue : ifFalse;
    subscription = toSubscribable(newSource).subscribe(obs.update.bind(obs));
  });

  return obs;
}
