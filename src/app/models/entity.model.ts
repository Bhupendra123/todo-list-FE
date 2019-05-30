export class Entity {
  constructor(
    public _id: string,
    public title: string,
    public description: string,
    public time: Date,
    public status: boolean
  ) {
    this._id = _id ? _id : null;
    this.title = title;
    this.description = description;
    this.time = new Date(time);
    this.status = status;
  }
}
