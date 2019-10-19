export class LocalItem<T> {

  get id(): string {
    return this._id;
  }

  get value(): T {
    return this._value;
  }

  set value(value: T) {
    this._value = value;
  }

  get defaultValue(): T {
    return this._defaultValue;
  }
  private readonly _id: string;
  private readonly _defaultValue: T;

  private _value!: T;

  constructor(id: string, defaultValue: T) {
    this._id = id;
    this._defaultValue = defaultValue;
    this.load();
  }

  public save() {
    localStorage.setItem(this._id, JSON.stringify({value: this._value}));
  }

  private load() {
    const value = localStorage.getItem(this._id);
    if (value) {
      const item = JSON.parse(value) as LocalItem<T>;
      this._value = item.value;
    } else {
      this._value = this._defaultValue;
    }
  }

}
