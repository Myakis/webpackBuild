export class Post {
  constructor(title, img) {
    this.title = title;
    this.img = img;
    this.date = new Date();
  }
  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toJSON(),
      img: this.img,
    });
  }
}
export const asyncFn = async () => {
  const text = await 'asfsgs';
  console.log(text);
};
