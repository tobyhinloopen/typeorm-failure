# TypeORM's PG + HStore failure

This repository demonstrates a Postgresql + TypeORM + HStore failure.

To run this example, run `npm t` after installing dependencies.

## The problem

For an Entity column like this:

```typescript
class Thing {
  // ...
  @Column({ type: "hstore", hstoreType: "object" })
  public values: Record<string, string>;
}
```

The `values` property is not restored properly when saving & restoring the
entity: Empty strings in the map cause the object to "break".

## Example output

See `src/index.ts` & `src/Thing.ts` for relevant source.

```
$ npm t

> typeorm-hstore-demo@1.0.0 test /Users/hinloopen/Projects/Github/typeorm-hstore-demo
> npm run build && node dist/index.js


> typeorm-hstore-demo@1.0.0 build /Users/hinloopen/Projects/Github/typeorm-hstore-demo
> tsc

{ foundThing: Thing { id: 15, values: { bar: '", ', '=>"2", "foo': '1' } },
  thing: Thing { values: { foo: '1', bar: '', baz: '2' }, id: 15 },
  VALUES: { foo: '1', bar: '', baz: '2' } }
Input A expected to strictly deep-equal input B:
+ expected - actual

  {
-   '=>"2", "foo': '1',
-   bar: '", '
+   bar: '',
+   baz: '2',
+   foo: '1'
  }
AssertionError [ERR_ASSERTION]: Input A expected to strictly deep-equal input B:
+ expected - actual

  {
-   '=>"2", "foo': '1',
-   bar: '", '
+   bar: '',
+   baz: '2',
+   foo: '1'
  }
    at main (/Users/hinloopen/Projects/Github/typeorm-hstore-demo/dist/index.js:30:16)
    at process._tickCallback (internal/process/next_tick.js:68:7)
npm ERR! Test failed.  See above for more details.
```
