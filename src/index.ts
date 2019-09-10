import assert = require("assert");
import { createConnection, Connection } from "typeorm";
import { Thing } from "./Thing";

const VALUES = { foo: "1", bar: "", baz: "2" };

async function main() {
  let connection: Connection|null = null;
  try {
    connection = await createConnection({
      type: "postgres",
      host: "127.0.0.1",
      username: "postgres",
      password: "postgres",
      database: "quagga",
      logging: true,
      logger: "file",
      synchronize: true,
      entities: [Thing],
    });
    const thingRepo = connection.getRepository(Thing);
    // if you run this repeatedly, ensure all existing things are deleted.
    await thingRepo.delete({});
    const thing = new Thing();
    thing.values = VALUES;
    await thingRepo.save(thing);
    const foundThing = await thingRepo.findOneOrFail();

    console.log({ foundThing, thing, VALUES });
    assert.deepStrictEqual(thing.values, VALUES);
    assert.deepStrictEqual(foundThing.values, VALUES);
  } catch (error) {
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

main();
