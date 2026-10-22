// Shared plumbing for the components: the behaviour hook and the class props.
// Client scripts import a .client.ts directly, never this barrel (behaviour.ts imports react).
export * from './behaviour';
export * from './class-props';
