import Database from 'better-sqlite3';
import {IRadioStream} from "src/models/interfaces";

const DATABASE_NAME = 'pr0nview-db.db';

export class SnappicDatabase {

  private db: any;

  constructor(private databaseName: string = DATABASE_NAME) {
    this.db = new Database(databaseName);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('auto_vacuum = full');
    this.createTables();
  }

  createTables() {
    // SCHEMA
    this.db.prepare(`CREATE TABLE IF NOT EXISTS SchemaVersion (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    version NUMBER NOT NULL
    )`).run();

    // STREAMS
    this.db.prepare(`CREATE TABLE IF NOT EXISTS Streams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      color STRING NOT NULL,
      startTime STRING NOT NULL,
      endTime STRING NOT NULL,
      uuid STRING NOT NULL,
      name STRING NOT NULL
    )`).run();

  }

  getCurrentVersion() {
    const row = this.db.prepare('SELECT version FROM schema_version WHERE id = 1').get();
    return row ? row.version : 0;
  }

  updateVersion(version: number) {
    this.db.prepare(`INSERT INTO schema_version (id, version) VALUES (1, ?)
    ON CONFLICT(id) DO UPDATE SET version = ?`).run(version, version);
  }

  async getAllStreams() {
    const query = `SELECT * FROM Streams;`
    return this.db.prepare(query).all()
  }

  async insertStream(stream: IRadioStream) {
    const preppedQuery = this.unwrapConfig(stream);
    const statement = `INSERT INTO Streams (${preppedQuery.columns}) VALUES (${preppedQuery.placeholders})`;
    const insertStream = this.db.prepare(statement).run(preppedQuery.values);
    return insertStream.lastInsertRowid;
  }

  async updateStream(stream: IRadioStream) {
    const preppedQuery = this.unwrapConfig(stream);
    const statement = `UPDATE Streams SET (${preppedQuery.columns}) WHERE uuid = ${stream.uuid})`;
    const updateStream = this.db.prepare(statement).run(preppedQuery.values);
    return updateStream.changes;
  }

  async deleteStreamByUuid(uuid: string) {
    const statement = `DELETE FROM Streams WHERE uuid = ?`;
    const updateStream = this.db.prepare(statement).run(uuid);
    return updateStream.changes;
  }

  private unwrapConfig(configObject: IRadioStream): Record<string, any> {
    const flat: Record<string, any> = {};
    for (const key in configObject) {
      const value = configObject[key];
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        for (const nestedKey in value) {
          flat[nestedKey] = value[nestedKey];
        }
      } else {
        flat[key] = value;
      }
    }

    const columns = Object.keys(flat).join(", ");
    const placeholders = Object.keys(flat).map(() => "?").join(", ");
    const values = Object.values(flat);

    return {columns, placeholders, values};
  }

}
