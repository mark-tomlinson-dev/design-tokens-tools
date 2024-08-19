import type { JSONValuePath } from '../definitions/JSONDefinitions.js';
import { ALIAS_PATH_SEPARATOR } from '../definitions/AliasSignature.js';

/**
 * A path is a sequence of strings and numbers that represent a path to a value in a JSON object.
 */
export class JSONPath {
  #array: JSONValuePath;
  #string: string;
  #isRoot = false;
  constructor(path: JSONValuePath) {
    this.#array = path;
    this.#string = path.join(ALIAS_PATH_SEPARATOR);
    this.#isRoot = path.length === 0;
  }

  static fromJSONValuePath(path: JSONValuePath) {
    return new JSONPath(path);
  }

  get array() {
    return this.#array;
  }
  get string() {
    return this.#string;
  }
  get isRoot() {
    return this.#isRoot;
  }
  get parent(): JSONValuePath {
    return this.#array.slice(0, -1);
  }
  // set value(path: JSONValuePath) {
  //   this.#array = path;
  //   this.#string = path.join('__');
  //   this.#isRoot = path.length === 0;
  // }

  equals(path: JSONValuePath) {
    return this.#string === path.join(ALIAS_PATH_SEPARATOR);
  }

  append(value: string | number) {
    return new JSONPath([...this.#array, value]);
  }

  get length() {
    return this.#array.length;
  }

  toString() {
    return JSON.stringify({
      array: this.#array,
      string: this.#string,
    });
  }
  toJSON() {
    return {
      array: this.#array,
      string: this.#string,
    };
  }
  toDebugString() {
    return `[${this.#array.map((v) => `"${v}"`).join(', ')}]`;
  }

  // Override console.log in Node.js environment
  [Symbol.for('nodejs.util.inspect.custom')](_depth: unknown, _opts: unknown) {
    return `Path {[${this.#array.map((v) => `"${v}"`).join(', ')}]}`;
  }
}
